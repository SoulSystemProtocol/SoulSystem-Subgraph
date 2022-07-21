import { ipfs } from "@graphprotocol/graph-ts";
import { Game } from "../../generated/schema";
import { ContractURI } from "../../generated/templates/Game/Game";

/**
 * Handle a contract uri event to update game uri.
 */
export function handleContractUri(event: ContractURI): void {
  // Get game
  let game = Game.load(event.address.toHexString());
  if (!game) {
    return;
  }
  // Load uri data
  let uriIpfsHash = event.params.param0.split("/").at(-1);
  let uriData = ipfs.cat(uriIpfsHash);
  // Update game
  game.uri = event.params.param0;
  game.uriData = uriData;
  game.save();
}
