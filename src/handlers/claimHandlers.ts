import { ipfs } from "@graphprotocol/graph-ts";
import { ClaimNomination, Game } from "../../generated/schema";
import { ContractURI, Nominate } from "../../generated/templates/Claim/Claim";
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
 * Handle a nominate event to create or update claim nomination.
 */
export function handleNominate(event: Nominate): void {
  // Get claim
  let claim = loadOrCreateClaim(event.address.toHexString());
  // Skip if nominated game is not exists
  let nominatedGame = Game.load(event.params.account.toHexString());
  if (!nominatedGame) {
    return;
  }
  // Create nomination
  let nominationId = `${event.address.toHexString()}_${event.transaction.hash.toHexString()}`;
  let nomination = new ClaimNomination(nominationId);
  nomination.claim = claim.id;
  nomination.createdDate = event.block.timestamp;
  nomination.nominated = nominatedGame.id;
  nomination.save();
}
