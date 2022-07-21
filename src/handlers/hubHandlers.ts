import { Game as GameContract } from "../../generated/Hub/Game";
import { ContractCreated } from "../../generated/Hub/Hub";
import { Game } from "../../generated/schema";
import { Game as GameTemplate } from "../../generated/templates";
import { GAME_CONTRACT_TYPE_NAME } from "../constants";

/**
 * Handle a contract created event to create a contract.
 */
export function handleContractCreated(event: ContractCreated): void {
  // If created game contract
  if (event.params.name == GAME_CONTRACT_TYPE_NAME) {
    // Load game name from contract
    let gameContract = GameContract.bind(event.params.contractAddress);
    let gameContractName = gameContract.name();
    // Create game
    let game = new Game(event.params.contractAddress.toHexString());
    game.name = gameContractName;
    game.save();
    // Save contract using subgraph template
    GameTemplate.create(event.params.contractAddress);
  }
}
