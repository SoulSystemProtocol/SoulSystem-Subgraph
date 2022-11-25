import { BigInt, ipfs } from "@graphprotocol/graph-ts";
import { store } from '@graphprotocol/graph-ts'
import {
  Account,
  Soul,
  ClaimNomination,
  ProcRole,
  ProcParticipant,
  ProcAssoc,
  ProcPost,
  SoulPart,
  // CTXPost,
} from "../../generated/schema";
import {
  ContractURI,
  Nominate,
  TransferByToken,
  Stage,
  RoleCreated,
  Post,
} from "../../generated/templates/Claim/Claim";
import { getSoulByAddr, loadOrCreateClaim } from "../utils";

/**
 * Handle a stage event to update claim stage.
 */
export function handleStage(event: Stage): void {
  // Get claim
  let claim = loadOrCreateClaim(event.address.toHexString());
  let stage = event.params.stage;
  // Update claim stage
  claim.stage = stage;
  //Update Timestamp on stage changes
  claim.updatedDate = event.block.timestamp;
  claim.save();
  //Update SBT
  let sbt = getSoulByAddr(claim.id);
  if (!!sbt) {
    //Cache Special Attributes
    let soul = Soul.load(sbt);
    if (soul) {
      soul.stage = stage;
      soul.save();
    }
  }
}

/** DEPRECATED
 * Handle a contract uri event to update claim uri.
 

export function handleContractUri(event: ContractURI): void {
  // Get claim
  let claim = loadOrCreateClaim(event.address.toHexString());
  // Load uri data
  let uriIpfsHash = event.params.param0.split("/").at(-1);
  let uriData = ipfs.cat(uriIpfsHash);
  // Update claim
  claim.uri = event.params.param0;
  claim.uriData = uriData; //DEPRECATE
  claim.metadata = uriData;
  claim.save();
}
*/

/**
 * Handle Role creation Event
 */
export function handleRoleCreated(event: RoleCreated): void {
  // Find role
  let roleId = `${event.address.toHexString()}_${event.params.id.toString()}`;
  let role = ProcRole.load(roleId);
  if (!role) {
    // Create Role
    role = new ProcRole(roleId);
    // Set claim
    let ctx = loadOrCreateClaim(event.address.toHexString());
    role.ctx = ctx.id;
    role.roleId = event.params.id;
    role.souls = [];
    role.soulsCount = 0;
  }
  // Add Name
  role.name = event.params.role;
  role.save();
}

/**
 * Handle a tranfer by token event to create or update claim roles.
 */
export function handleTransferByToken(event: TransferByToken): void {
  // Get claim
  let entity = loadOrCreateClaim(event.address.toHexString());
  let tokenId = event.params.id;
  let amount = event.params.value;

  //Relation Test 1
  if (!event.params.toOwnerToken.equals(BigInt.zero())) {
    let sbt = event.params.toOwnerToken.toString();
    
    
    //** Soul Part (Supports Amounts)
    const entSBT = getSoulByAddr(event.address.toHexString());
    const sbtPartId = `${entSBT}_${sbt}_${tokenId.toString()}`;
    let soulPart = SoulPart.load(sbtPartId);
    if (!soulPart) {
      soulPart = new SoulPart(sbtPartId);
      soulPart.aEnd = entSBT;
      soulPart.bEnd = sbt;
      soulPart.role = tokenId.toString();
      soulPart.qty = amount;
    }else{
      soulPart.qty = soulPart.qty.plus(amount);
    }
    soulPart.save();


    //Add to Recepient
    let participanId = `${event.address.toHexString()}_${sbt}`;
    let participant = ProcParticipant.load(participanId);
    if (!participant) {
      participant = new ProcParticipant(participanId);
      participant.entity = entity.id;
      participant.sbt = sbt.toString();
      participant.roles = [];
    }
    let procRoles = participant.roles;
    //Add Token ID to Roles List
    procRoles.push(tokenId.toString());
    participant.roles = procRoles;
    participant.save();

    /** DEPRECATED - These relations are to be 'SoulParts'
    //Relation Test 2
    let participanRoleId = `${event.address.toHexString()}_${sbt}_${tokenId.toString()}`;
    let assoc = ProcAssoc.load(participanRoleId);
    if (!assoc) {
      //New Association
      assoc = new ProcAssoc(participanRoleId);
      assoc.bEnt = entity.id;
      assoc.sbt = sbt;
      assoc.role = tokenId;
      //Set Amount
      assoc.qty = amount;
    } else {
      //Add Amount
      assoc.qty = assoc.qty.plus(amount);
    }
    assoc.save();
    */
  }

  if (!event.params.fromOwnerToken.equals(BigInt.zero())) {
    let sbt = event.params.fromOwnerToken.toString();
    
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


    //Remove From Origin
    let participanId = `${event.address.toHexString()}_${sbt}`;
    let participant = ProcParticipant.load(participanId);
    if (participant) {
      const accountIndex = participant.roles.indexOf(tokenId.toString());
      if (accountIndex > -1) {
        let procRoles = participant.roles;
        procRoles.splice(accountIndex, 1);
        participant.roles = procRoles;
        participant.save();
      }
    }

    /** DEPRECATED - These relations are to be 'SoulParts'
    //Relation Test 2
    let participanRoleId = `${event.address.toHexString()}_${sbt}_${tokenId.toString()}`;
    let assoc = ProcAssoc.load(participanRoleId);
    if (assoc) {
      //Subtract Amount
      assoc.qty = assoc.qty.minus(amount);
      assoc.save();
    }
    */
  }

  // ** DEPRECATE
  // Define transfer type
  let isTokenMinted = event.params.fromOwnerToken.equals(BigInt.zero());
  let isTokenBurned = event.params.toOwnerToken.equals(BigInt.zero());
  if (isTokenMinted || isTokenBurned) {
    // Find or create role
    let roleId = `${event.address.toHexString()}_${tokenId}`;
    let role = ProcRole.load(roleId);
    if (!role) {
      role = new ProcRole(roleId);
      role.ctx = entity.id;
      role.roleId = tokenId;
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
    } else if (isTokenBurned) {
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
 * Handle a nominate event to create or update claim nomination.
 */
export function handleNominate(event: Nominate): void {
  // Get claim
  let claim = loadOrCreateClaim(event.address.toHexString());
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
  let nomination = new ClaimNomination(nominationId);
  nomination.claim = claim.id;
  nomination.createdDate = event.block.timestamp;
  nomination.nominator = nominatorAccount.sbt;
  nomination.nominated = nominatedSoul.id;
  nomination.save();
}

/**
 * Handle a post event to add a post to claim.
 */
export function handlePost(event: Post): void {
  // Get claim
  let claim = loadOrCreateClaim(event.address.toHexString());
  // Skip if author soul is not exists
  let authorSoul = Soul.load(event.params.tokenId.toString());
  if (!authorSoul) {
    return;
  }
  // Create post entity
  // let postId = `${event.address.toHexString()}_${event.transaction.hash.toHexString()}`;
  const postId = `${event.address.toHexString()}_${event.transaction.hash.toHexString()}_${event.logIndex.toString()}`;
  let post = new ProcPost(postId);
  // let post = new CTXPost(postId);
  post.entity = claim.id;
  post.createdDate = event.block.timestamp;
  post.author = authorSoul.id;
  post.entityRole = event.params.entRole.toString();
  post.uri = event.params.uri;
  // Load uri data
  let ipfsHash = event.params.uri.split("/").at(-1);
  let metadata = ipfs.cat(ipfsHash);
  post.metadata = metadata;
  //Save
  post.save();
}
