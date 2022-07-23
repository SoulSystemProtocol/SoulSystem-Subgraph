import { ipfs } from "@graphprotocol/graph-ts";
import { ContractURI } from "../../generated/templates/Claim/Claim";
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
