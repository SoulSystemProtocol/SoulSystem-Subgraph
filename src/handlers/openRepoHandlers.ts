import { StringSet } from "../../generated/OpenRepo/OpenRepo";
import { OPEN_REPO_KEY_TYPE } from "../constants";
import { getGame } from "../utils";

/**
 * Handle a string set event to update a game.
 */
export function handleStringSet(event: StringSet): void {
  // If type is set
  if (event.params.key == OPEN_REPO_KEY_TYPE) {
    // Get game
    let game = getGame(event.params.originAddress.toHexString());
    // Update game
    game.type = event.params.value;
    game.save();
  }
}
