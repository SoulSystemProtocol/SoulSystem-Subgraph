import { BigInt, ipfs } from "@graphprotocol/graph-ts";
import {
  Account,
  ClaimNomination,
  ClaimPost,
  ClaimRole,
  Soul,
} from "../../generated/schema";
import {
  ContractURI,
  Nominate,
  TransferByToken,
  Post,
} from "../../generated/templates/Claim/Claim";
import { loadOrCreateClaim } from "../utils";

/**
 * Handle a contract uri event to update claim uri.
 */
export function handleContractUri(event: ContractURI): void {
  // Get claim
  let claim = loadOrCreateClaim(event.address.toHexString());
  // Load uri data
  let uriIpfsHash = event.params.param0.split("/").at(-1);
  let uriData = ipfs.cat(uriIpfsHash);
  // Update claim
  claim.uri = event.params.param0;
  claim.uriData = uriData;
  claim.save();
}

/**
 * Handle a tranfer by token event to create or update claim roles.
 */
export function handleTransferByToken(event: TransferByToken): void {
  // Get claim
  let claim = loadOrCreateClaim(event.address.toHexString());
  // Define transfer type
  let isTokenMinted = event.params.fromOwnerToken.equals(BigInt.zero());
  let isTokenBurned = event.params.toOwnerToken.equals(BigInt.zero());
  if (isTokenMinted || isTokenBurned) {
    // Find or create role
    let roleId = `${event.address.toHexString()}_${event.params.id.toString()}`;
    let role = ClaimRole.load(roleId);
    if (!role) {
      role = new ClaimRole(roleId);
      role.claim = claim.id;
      role.roleId = event.params.id;
      role.souls = [];
      role.soulsCount = 0;
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
  nomination.nominator = nominatorAccount.soul;
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
  let postId = `${event.address.toHexString()}_${event.transaction.hash.toHexString()}`;
  let post = new ClaimPost(postId);
  post.claim = claim.id;
  post.createdDate = event.block.timestamp;
  post.author = authorSoul.id;
  post.entityRole = event.params.entRole.toString();
  post.uri = event.params.uri;
  post.save();
}
