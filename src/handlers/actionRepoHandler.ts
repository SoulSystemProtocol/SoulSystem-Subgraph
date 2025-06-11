import { Action } from "../../generated/schema";
import {
  ActionAdded,
  ActionURI
} from "../../generated/ActionRepo/ActionRepo";
import { ActionIpfsMetadataTemplate } from "../../../generated/templates";
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
  const entity = Action.load(event.params.guid.toHexString());
  if (!entity) return;
  // Update entity's params
  entity.uri = event.params.uri;

  // Extract IPFS hash from URI
  let ipfsHash = "";
  if (entity.uri) {
    let parts = entity.uri.split("/");
    if (parts.length > 0) {
      ipfsHash = parts[parts.length - 1];
    }
  }

  // If IPFS hash is found, call the template
  if (ipfsHash != "") {
    ActionIpfsMetadataTemplate.createWithContext(ipfsHash, entity.id);
  }

  entity.metadata = null; //Set to null (will be populated by IPFS handler)
  entity.save();
}