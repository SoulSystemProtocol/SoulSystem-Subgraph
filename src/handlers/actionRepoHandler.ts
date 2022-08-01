import { ipfs } from "@graphprotocol/graph-ts";
import { Action } from "../../generated/schema";
import {
  ActionAdded,
  ActionURI
} from "../../generated/ActionRepo/ActionRepo";
// import { loadOrCreateClaim } from "../utils";

/**
 * Handle a action added event to create an action entity.
 */
export function handleActionAdded(event: ActionAdded): void {
  // Skip if entity exists
  if (Action.load(event.params.id.toString())) return;
  // Create entity
  let entity = new Action(event.params.guid.toHexString());
  entity.subject = event.params.subject;
  entity.verb = event.params.verb;
  entity.object = event.params.object;
  entity.tool = event.params.tool;
  entity.save();
}

/**
 * Handle a action uri event to update an action entity.
 */
export function handleActionURI(event: ActionURI): void {
  // Find entity and return if not found
  let entity = Action.load(event.params.guid.toHexString());
  if (!entity) return;
  // Load uri data
  let uriIpfsHash = event.params.uri.split("/").at(-1);
  let uriData = ipfs.cat(uriIpfsHash);
  // Update entity's params
  entity.uri = event.params.uri;
  entity.uriData = uriData;
  entity.save();
}