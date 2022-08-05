import { Address } from "@graphprotocol/graph-ts";
import { BigInt, ipfs } from "@graphprotocol/graph-ts";
import {
  Account,
  Game,
  GameNomination,
  GameRole,
  Soul,
  GamePost,
  // CTXPost,
  GameParticipant,
  SoulSoulOpinion,
  GameAssoc,
} from "../../generated/schema";
import {
  ContractURI,
  Nominate,
  TransferByToken,
  RoleCreated,
  Post,
  OpinionChange,
} from "../../generated/templates/Game/Game";
import { Hub as HubContract } from "../../generated/Hub/Hub";
import { loadOrCreateGame } from "../utils";

/** DEPRECATE
 * Handle a contract uri event to update game uri.
 */ 
export function handleContractUri(event: ContractURI): void {
  // Get game
  let game = loadOrCreateGame(event.address.toHexString());
  // Load uri data
  let uriIpfsHash = event.params.param0.split("/").at(-1);
  let uriData = ipfs.cat(uriIpfsHash);
  // Update game
  game.uri = event.params.param0;
  game.uriData = uriData; //DEPRECATE
  game.metadata = uriData;
  game.save();
}

/**
 * Handle Role creation Event
 */
export function handleRoleCreated(event: RoleCreated): void {
  // Find role
  let roleId = `${event.address.toHexString()}_${event.params.id.toString()}`;
  let role = GameRole.load(roleId);
  if (!role) {
    // Create Role
    role = new GameRole(roleId);
    // Set claim
    let claim = loadOrCreateGame(event.address.toHexString());
    role.game = claim.id;
    role.roleId = event.params.id;
    role.souls = [];
    role.soulsCount = 0;
  }
  // Add Name
  role.name = event.params.role;
  role.save();
}

/**
 * Handle a tranfer by token event to create or update game roles.
 */
export function handleTransferByToken(event: TransferByToken): void {
  // Get game
  let entity = loadOrCreateGame(event.address.toHexString());
  let tokenId = event.params.id;
  let amount = event.params.value;
  

  //Relation Test 1
  if (!event.params.toOwnerToken.equals(BigInt.zero())) {
    //Add to Recepient
    let sbt = event.params.toOwnerToken.toString();
    let participanId = `${event.address.toHexString()}_${sbt}`;
    let participant = GameParticipant.load(participanId);
    if (!participant) {
      participant = new GameParticipant(participanId);
      participant.entity = entity.id;
      participant.sbt = sbt;
      participant.roles = [];
    }
    let procRoles = participant.roles;
    //Add Token ID to Roles List
    procRoles.push(tokenId.toString());
    participant.roles = procRoles;
    participant.save();

    
    //Relation Test 2
    let participanRoleId = `${event.address.toHexString()}_${sbt}_${tokenId.toString()}`;
    let assoc = GameAssoc.load(participanRoleId);
    if (!assoc) {
      //New Association
      assoc = new GameAssoc(participanRoleId);
      assoc.bEnt = entity.id;
      assoc.sbt = sbt;
      assoc.role = tokenId;
      //Set Amount
      assoc.qty = amount;
    } else{
      //Add Amount
      assoc.qty = assoc.qty.plus(amount);
    }
    assoc.save();

  }

  if (!event.params.fromOwnerToken.equals(BigInt.zero())) {
    //Remove From Origin
    let sbt = event.params.fromOwnerToken.toString();
    let participanId = `${event.address.toHexString()}_${sbt}`;
    let participant = GameParticipant.load(participanId);
    if (participant) {
      const accountIndex = participant.roles.indexOf(tokenId.toString());
      if (accountIndex > -1) {
        let procRoles = participant.roles;
        procRoles.splice(accountIndex, 1);
        participant.roles = procRoles;
        participant.save();
      }
    }

    //Relation Test 2
    let participanRoleId = `${event.address.toHexString()}_${sbt}_${tokenId.toString()}`;
    let assoc = GameAssoc.load(participanRoleId);
    if (assoc) {
      //Subtract Amount
      assoc.qty = assoc.qty.minus(amount);
      assoc.save();
    }

  }

  // ** DEPRECATE
  // Define transfer type
  let isTokenMinted = event.params.fromOwnerToken.equals(BigInt.zero());
  let isTokenBurned = event.params.toOwnerToken.equals(BigInt.zero());
  if (isTokenMinted || isTokenBurned) {
    // Find or create role
    const roleId = `${event.address.toHexString()}_${event.params.id.toString()}`;
    let role = GameRole.load(roleId);
    if (!role) {
      role = new GameRole(roleId);
      role.game = entity.id;
      role.roleId = event.params.id;
      role.souls = [];
      role.soulsCount = 0;
      role.name = "";
    }
    // Define role souls and souls count
    let souls = role.souls;
    let soulsCount = role.soulsCount;
    if (isTokenMinted) {
      souls.push(event.params.toOwnerToken.toString());
      soulsCount = soulsCount + 1;
    }
    if (isTokenBurned) {
      const accountIndex = souls.indexOf(
        event.params.fromOwnerToken.toString()
      );
      if (accountIndex > -1) {
        souls.splice(accountIndex, 1);
      }
      soulsCount = soulsCount - 1;
    }
    // Update role
    role.souls = souls;
    role.soulsCount = soulsCount;
    role.save();
  }
}

/**
 * Handle a nominate event to create or update game nomination.
 */
export function handleNominate(event: Nominate): void {
  // Get game
  let game = loadOrCreateGame(event.address.toHexString());
  // Skip if nominator account not exists
  let nominatorAccount = Account.load(event.params.account.toHexString());
  if (!nominatorAccount) {
    return;
  }
  // Skip if nominated soul not exists
  let nominatedSoul = Soul.load(event.params.id.toString());
  if (!nominatedSoul) {
    return;
  }
  // Create nomination
  let nominationId = `${event.address.toHexString()}_${event.transaction.hash.toHexString()}`;
  let nomination = new GameNomination(nominationId);
  nomination.game = game.id;
  nomination.createdDate = event.block.timestamp;
  nomination.nominator = nominatorAccount.sbt;
  nomination.nominated = nominatedSoul.id;
  nomination.save();
}

/**
 * Handle a post event to add a post to game.
 */
export function handlePost(event: Post): void {
  // Get game
  let game = loadOrCreateGame(event.address.toHexString());
  // Skip if author soul is not exists
  let authorSoul = Soul.load(event.params.tokenId.toString());
  if (!authorSoul) {
    return;
  }
  // Create post entity
  const postId = `${event.address.toHexString()}_${event.transaction.hash.toHexString()}`;
  let post = new GamePost(postId);
  // let post = new CTXPost(postId);
  post.entity = game.id;
  post.createdDate = event.block.timestamp;
  post.author = authorSoul.id;
  post.entityRole = event.params.entRole.toString();
  post.uri = event.params.uri;
  // Load uri data
  const ipfsHash = event.params.uri.split("/").at(-1);
  const metadata = ipfs.cat(ipfsHash);
  post.metadata = metadata;
  //Save
  post.save();
}

/** [TEST]
 * Handle a opinion change event.
 */
export function handleOpinionChange(event: OpinionChange): void {
  // Get Entity
  const game = Game.load(event.address.toHexString());
  if (!game) return;
  // Hub Address
  const hubAddress = game.hub;
  // Load claim name from contract
  const hubContract = HubContract.bind(Address.fromString(hubAddress));
  // Fetch Soul Contract Address
  const soulContractAddr = hubContract.assocGet("SBT");
  //Check if Game's Opinion is About a Soul
  if (event.params.contractAddr.toString() == soulContractAddr.toString()) {
    const gameAccount = Account.load(game.id);
    if (!gameAccount) return;
    // Fetch Game's Soul
    const gameSBT = gameAccount.sbt;
    // Find Opinion's Object
    const aboutId = event.params.tokenId.toString();
    const aboutEnt = Soul.load(aboutId);
    if (!aboutEnt) return;
    // Load/Make Opinion
    const opId = `${gameSBT}_${aboutEnt.id}_${event.params.domain.toString()}`;
    // Find or create Opinion
    let opinion = SoulSoulOpinion.load(opId);
    if (!opinion) {
      // Create opinion
      opinion = new SoulSoulOpinion(opId);
      opinion.subject = gameSBT;
      opinion.object = aboutEnt.id;
      opinion.domain = event.params.domain;
      opinion.negativeRating = BigInt.zero();
      opinion.positiveRating = BigInt.zero();
    }

    // Update positive rating (rating=true)
    if (event.params.rating === true) {
      // aboutEnt.totalPositiveRating = aboutEnt.totalPositiveRating.plus(
      //   event.params.score
      // );
      opinion.positiveRating = opinion.positiveRating.plus(
        event.params.score
      );
    }
    // Update negative rating (rating=false)
    else {
      // aboutEnt.totalNegativeRating = aboutEnt.totalNegativeRating.plus(
      //   event.params.score
      // );
      opinion.negativeRating = opinion.negativeRating.plus(
        event.params.score
      );
    }
    // Save entities
    // aboutEnt.save();

    opinion.save();
  }
}
