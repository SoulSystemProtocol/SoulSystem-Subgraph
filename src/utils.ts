import { Address } from "@graphprotocol/graph-ts";
import { Game as GameContract } from "../generated/Hub/Game";
import { Claim as ClaimContract } from "../generated/Hub/Claim";
import { Account, Game, Soul, Claim } from "../generated/schema";

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
export function loadOrCreateGame(id: string): Game {
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

/**
 * Load claim or create new.
 */
export function loadOrCreateClaim(id: string): Claim {
  let claim = Claim.load(id);
  if (!claim) {
    // Load claim name from contract
    let claimContract = ClaimContract.bind(Address.fromString(id));
    let claimContractName = claimContract.name();
    // Create claim
    claim = new Claim(id);
    claim.name = claimContractName;
    claim.save();
  }
  return claim;
}

/**
 * Searchable Fields as a single string.
 */
export function makeSearchField(entity: Soul): string {
  let fields: string[] = [];
  if (entity.uriFirstName) fields.push(entity.uriFirstName);
  if (entity.uriLastName) fields.push(entity.uriLastName);
  return fields.join('').toLowerCase();
}
