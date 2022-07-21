import { ContractCreated } from "../../generated/Hub/Hub";
import { Game as GameTemplate } from "../../generated/templates";
import { HUB_CONTRACT_TYPE_GAME } from "../constants";

/**
 * Handle a contract created event to create a contract.
 */
export function handleContractCreated(event: ContractCreated): void {
  // If created game contract
  if (event.params.name == HUB_CONTRACT_TYPE_GAME) {
    // Save contract using subgraph template
    GameTemplate.create(event.params.contractAddress);
  }
}
