import { ContractCreated } from "../../generated/Hub/Hub";
import {
  Game as GameTemplate,
  Claim as ClaimTemplate,
} from "../../generated/templates";
import { HUB_CONTRACT_TYPE_GAME, HUB_CONTRACT_TYPE_TASK, HUB_CONTRACT_TYPE_CLAIM } from "../constants";
import { loadOrCreateClaim, loadOrCreateGame } from "../utils";

/**
 * Handle a contract created event to create a contract.
 */
export function handleContractCreated(event: ContractCreated): void {
  // If created game contract
  if (event.params.name == HUB_CONTRACT_TYPE_GAME) {
    // Save contract using subgraph template
    GameTemplate.create(event.params.contractAddress);
    // Get game
    let game = loadOrCreateGame(event.params.contractAddress.toHexString());
    // Update game
    game.hub = event.address.toHexString();
    game.createdDate = event.block.timestamp;
    game.save();
  }
  // If created task or claim contract
  if (event.params.name == HUB_CONTRACT_TYPE_TASK || event.params.name == HUB_CONTRACT_TYPE_CLAIM) {
    // Save contract using subgraph template
    ClaimTemplate.create(event.params.contractAddress);
    // Get claim
    let claim = loadOrCreateClaim(event.params.contractAddress.toHexString());
    // Update claim
    claim.type = event.params.name;
    claim.hub = event.address.toHexString();
    claim.stage = 0;
    claim.createdDate = event.block.timestamp;
    claim.updatedDate = event.block.timestamp;
    claim.save();
  }
}
