import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Game as GameContract } from "../generated/Hub/Game";
// import { Claim as ClaimContract } from "../generated/Hub/Claim";
// import { Hub as HubContract } from "../generated/Hub/Hub";
// import { Soul as SoulContract } from "../generated/Hub/Soul";
import { Account, Game, Soul, Claim } from "../generated/schema";

/**
 * Get Contract's Name
 */
function getContractName(address: Address): string{
  // Load name from contract
  let gameContract = GameContract.bind(address);
  return gameContract.name();
}

/**
 * Get Soul ID by Owner
 */
export function getSoulByAddr(address: string): string {
  let account = Account.load(address);
  if(!account) return '';
  return account.sbt;
}

/**
 * Add soul to existing or new account.
 */
export function addSoulToAccount(accountAddress: Address, soul: Soul): void {
  let account = Account.load(accountAddress.toHexString());
  if (!account) {
    account = new Account(accountAddress.toHexString());
  }
  account.sbt = soul.id;
  account.save();
}

/**
 * Remove soul to account mapping
 */
 export function removeSoulFromAccount(accountAddress: Address): void {
  let account = Account.load(accountAddress.toHexString());
  if (account) {
    account.sbt = '';
    account.save();
  }
}


/**
 * Load soul or create new.
 */
 export function loadOrCreateSoul(id: string): Soul {
  let ent = Soul.load(id);
  if (!ent) ent = new Soul(id);
  return ent;
}


/**
 * Load game or create new.
 */
export function loadOrCreateGame(id: string): Game {
  let ent = Game.load(id);
  if (!ent) {
    // Create entity
    ent = new Game(id);
    /*
    // Load game name from contract
    let gameContract = GameContract.bind(Address.fromString(id));
    let gameContractName = gameContract.name();
    ent.name = gameContractName;
    */
    ent.name = getContractName(Address.fromString(id));
    ent.save();
  }
  return ent;
}

/**
 * Load claim or create new.
 */
export function loadOrCreateClaim(id: string): Claim {
  let ent = Claim.load(id);
  if (!ent) {
    // Create entity
    ent = new Claim(id);
    /*
    // Load claim name from contract
    let claimContract = ClaimContract.bind(Address.fromString(id));
    let claimContractName = claimContract.name();
    ent.name = claimContractName;
    */
    ent.name = getContractName(Address.fromString(id));
    ent.save();
  }
  return ent;
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


interface Relation {
  origin: any, key: string, value: any, save: Function
}
interface Params {
  originAddress: any, key: string, destinationAddress: any
}
/**
 * Update a Relation Entity
 */
export function setRelation(entity: any, params: Params): void {
  entity.origin = params.originAddress.toHexString();
  entity.key = params.key;
  entity.value.push(params.destinationAddress.toHexString());
  entity.save();
}