import { Address } from "@graphprotocol/graph-ts";
import { Game as GameContract } from "../generated/Hub/Game";
import { Account, Game, Soul } from "../generated/schema";

/**
 * Add soul to existing or new account.
 */
export function addSoulToAccount(accountAddress: Address, soul: Soul): void {
  let account = Account.load(accountAddress.toHexString());
  if (!account) {
    account = new Account(accountAddress.toHexString());
  }
  account.soul = soul.id;
  account.save();
}

/**
 * Load game or create new.
 */
export function getGame(id: string): Game {
  let game = Game.load(id);
  if (!game) {
    // Load game name from contract
    let gameContract = GameContract.bind(Address.fromString(id));
    let gameContractName = gameContract.name();
    // Create game
    game = new Game(id);
    game.name = gameContractName;
    game.save();
  }
  return game;
}
