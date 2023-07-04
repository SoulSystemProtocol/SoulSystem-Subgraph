import { Address, log, BigInt, ipfs } from "@graphprotocol/graph-ts";
import { store } from '@graphprotocol/graph-ts'
import {
  Account,
  Game,
  GameNomination,
  GameRole,
  Soul,
  GamePost,
  SoulPart,
  GameParticipant,
  // SoulSoulOpinion,
  // SoulSoulOpinionChange,
  GameAssoc,
} from "../../generated/schema";
import {
  Nominate,
  TransferByToken,
  RoleCreated,
  Post,
  URI,
  // OpinionChange,
} from "../../generated/templates/Game/Game";
// import { OpinionChange } from "../../generated/templates/Soul/Soul";

// import { Hub as HubContract } from "../../generated/Hub/Hub";
import { getSoulByAddr, loadOrCreateGame } from "../utils";

/**
 * 
 * @param address 
 * @param id 
 * @returns 
 */
const getRoleName = (address: Address, id: BigInt): string | null => {
  let roleId = `${address.toHexString()}_${id.toString()}`;
  let role = GameRole.load(roleId);
  if(!role) return null;
  return role.name;
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
    let ctx = loadOrCreateGame(event.address.toHexString());
    role.ctx = ctx.id;
    role.roleId = event.params.id;
    role.souls = [];
    role.soulsCount = 0;
    role.uri = "";
  }
  // Add Name
  role.name = event.params.role;
  role.save();
}

/**
 * Handle Token URI Change
 */
export function handleUriChange(event: URI): void {
  const gameId = event.address.toHexString();
  const tokenId = event.params.id;
  const value = event.params.value;
  const roleId = `${gameId}_${tokenId}`;
  const entity = GameRole.load(roleId);
  //Validate
  if(!entity){ 
    log.error('handleUriChange() Expected Role Missing ID:{}', [roleId]);
    return;
  }
  // Update entity's params
  entity.uri = value;
  // Load uri data
  const uriIpfsHash = value.split("/").at(-1);
  const metadata = ipfs.cat(uriIpfsHash);
  if(!!metadata) entity.metadata = metadata;
  else log.error('handleUriChange() Failed to fetch metadata for {} value:{}', [roleId, value]);
  entity.save();
}

/**
 * Handle a tranfer by token event to create or update game roles.
 */
export function handleTransferByToken(event: TransferByToken): void {
  // Get game
  const entity = loadOrCreateGame(event.address.toHexString());
  const tokenId = event.params.id;
  const amount = event.params.value;
  
  if (!event.params.toOwnerToken.equals(BigInt.zero())) { //Not Burn 

    //** Relation Test 1 - Parts

    //Add to Recepient
    const sbt = event.params.toOwnerToken.toString();
    
    //** Soul Part (Supports Amounts)
    const entSBT = getSoulByAddr(event.address.toHexString());
    const sbtPartId = `${entSBT}_${sbt}_${tokenId.toString()}`;
    let soulPart = SoulPart.load(sbtPartId);
    if (!soulPart) {
      let role = getRoleName(event.address, tokenId);
      soulPart = new SoulPart(sbtPartId);
      soulPart.aEnd = entSBT;
      soulPart.bEnd = sbt;
      soulPart.role = role!==null ? role : tokenId.toString();
      soulPart.roleId = tokenId.toString();
      soulPart.qty = amount;
    }else{
      soulPart.qty = soulPart.qty.plus(amount);
    }
    soulPart.save();

    //** Game Participants (Easy Roles, !no amounts)
    const participanId = `${event.address.toHexString()}_${sbt}`;
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

    
    //** Relation Test 2 - as Association (Older, !Inaccurate)
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

  }//Add

  if (!event.params.fromOwnerToken.equals(BigInt.zero())) { //Not Mint (Remove)
    const sbt = event.params.fromOwnerToken.toString();

    //** Soul Part
    const entSBT = getSoulByAddr(event.address.toHexString());
    const sbtPartId = `${entSBT}_${sbt}_${tokenId.toString()}`;
    let soulPart = SoulPart.load(sbtPartId);
    if (!!soulPart) {
      if(soulPart.qty.equals(amount)){
        //Delete
        store.remove('SoulPart', sbtPartId);
      }else{
        //Remove
        soulPart.qty = soulPart.qty.minus(amount);
        soulPart.save();
      }
    }

    //** Game Participants - Remove From Origin
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

    //Relation Test 2 - Association
    let participanRoleId = `${event.address.toHexString()}_${sbt}_${tokenId.toString()}`;
    let assoc = GameAssoc.load(participanRoleId);
    if (assoc) {
      //Subtract Amount
      assoc.qty = assoc.qty.minus(amount);
      assoc.save();
    }

  }//Remove

  // ** Currently Used for fetching Game's Roles .. & members
  // Define transfer type
  let isTokenMinted = event.params.fromOwnerToken.equals(BigInt.zero());
  let isTokenBurned = event.params.toOwnerToken.equals(BigInt.zero());
  if (isTokenMinted || isTokenBurned) {
    // Find or create role
    const roleId = `${event.address.toHexString()}_${tokenId.toString()}`;
    let role = GameRole.load(roleId);
    if (!role) {
      role = new GameRole(roleId);
      role.ctx = entity.id;
      role.roleId = event.params.id;
      role.souls = [];
      role.soulsCount = 0;
      role.name = "";
      role.uri = "";
    } 
    
    // Define role souls and souls count
    let souls = role.souls;
    let soulsCount = role.soulsCount;
    //Add 'to'
    if (!isTokenBurned && !souls.includes(event.params.toOwnerToken.toString())) {
      souls.push(event.params.toOwnerToken.toString());
      soulsCount = soulsCount + 1;
    }
    //Remove 'from'
    if (!isTokenMinted) {
      const accountIndex = souls.indexOf(
        event.params.fromOwnerToken.toString()
      );
      if (accountIndex > -1) {
        souls.splice(accountIndex, 1);
        soulsCount = soulsCount - 1;
      }
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
  // const postId = `${event.address.toHexString()}_${event.transaction.hash.toHexString()}`;
  const postId = `${event.address.toHexString()}_${event.transaction.hash.toHexString()}_${event.logIndex.toString()}`;
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

/** [TEST] MOVED -- Soul Contract
 * Handle a opinion change event.
 
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

    //** Opinion Change Events  //TODO: Move this to new Rep Events
    const opChangeId = `${event.transaction.hash.toHex()}_${event.logIndex.toString()}`;
    let opinionChange = new SoulSoulOpinionChange(opChangeId);
    opinionChange.subject = gameSBT;
    opinionChange.object = aboutEnt.id;
    opinionChange.domain = event.params.domain;
    opinionChange.rating = event.params.rating;
    opinionChange.value = event.params.score;
    opinionChange.save();

    //** Opinion Accumelation
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
      opinion.value.plus(event.params.score);
    }
    // Update negative rating (rating=false)
    else {
      // aboutEnt.totalNegativeRating = aboutEnt.totalNegativeRating.plus(
      //   event.params.score
      // );
      opinion.negativeRating = opinion.negativeRating.plus(
        event.params.score
      );
      opinion.value.minus(event.params.score);
    }
    // Save entities
    // aboutEnt.save();

    opinion.save();
  }
}
*/