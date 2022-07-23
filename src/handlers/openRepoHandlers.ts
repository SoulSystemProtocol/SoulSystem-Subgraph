import { StringSet, AddressAdd } from "../../generated/OpenRepo/OpenRepo";
import { Game } from "../../generated/schema";
import {
  OPEN_REPO_ADDRESS_KEY_CLAIM,
  OPEN_REPO_STRING_KEY_TYPE,
} from "../constants";
import { loadOrCreateClaim, loadOrCreateGame } from "../utils";

/**
 * Handle a string set event to update a game type.
 */
export function handleStringSet(event: StringSet): void {
  // If type value is set
  if (event.params.key == OPEN_REPO_STRING_KEY_TYPE) {
    // Get game
    let game = loadOrCreateGame(event.params.originAddress.toHexString());
    // Update game
    game.type = event.params.value;
    game.save();
  }
}

/**
 * Handle a address add event to update a game of claim.
 */
export function handleAddressAdd(event: AddressAdd): void {
  // If claim value is set
  if (event.params.key == OPEN_REPO_ADDRESS_KEY_CLAIM) {
    // Get game
    let game = Game.load(event.params.originAddress.toHexString());
    if (!game) {
      return;
    }
    // Get claim
    let claim = loadOrCreateClaim(
      event.params.destinationAddress.toHexString()
    );
    // Update claim
    claim.game = game.id;
    claim.save();
  }
}
