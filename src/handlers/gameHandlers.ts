import { BigInt, ipfs } from "@graphprotocol/graph-ts";
import {
  Account,
  GameNomination,
  GameRole,
  Soul,
} from "../../generated/schema";
import {
  ContractURI,
  Nominate,
  TransferByToken,
} from "../../generated/templates/Game/Game";
import { getGame } from "../utils";

/**
 * Handle a contract uri event to update game uri.
 */
export function handleContractUri(event: ContractURI): void {
  // Get game
  let game = getGame(event.address.toHexString());
  // Load uri data
  let uriIpfsHash = event.params.param0.split("/").at(-1);
  let uriData = ipfs.cat(uriIpfsHash);
  // Update game
  game.uri = event.params.param0;
  game.uriData = uriData;
  game.save();
}

/**
 * Handle a tranfer by token event to create or update game roles.
 */
export function handleTransferByToken(event: TransferByToken): void {
  // Get game
  let game = getGame(event.address.toHexString());
  // Define transfer type
  let isTokenMinted = event.params.fromOwnerToken.equals(BigInt.zero());
  let isTokenBurned = event.params.toOwnerToken.equals(BigInt.zero());
  if (isTokenMinted || isTokenBurned) {
    // Find or create role
    let roleId = `${event.address.toHexString()}_${event.params.id.toString()}`;
    let role = GameRole.load(roleId);
    if (!role) {
      role = new GameRole(roleId);
      role.game = game.id;
      role.roleId = event.params.id;
      role.souls = [];
      role.soulsCount = 0;
    }
    // Define role souls and souls count
    let souls = role.souls;
    let soulsCount = role.soulsCount;
    if (isTokenMinted) {
      souls.push(event.params.toOwnerToken.toString());
      soulsCount = soulsCount + 1;
    }
    if (isTokenBurned) {
      const accountIndex = souls.indexOf(
        event.params.fromOwnerToken.toString()
      );
      if (accountIndex > -1) {
        souls.splice(accountIndex, 1);
      }
      soulsCount = soulsCount - 1;
    }
    // Update role
    role.souls = souls;
    role.soulsCount = soulsCount;
    role.save();
  }
}

/**
 * Handle a nominate event to create or update game nomination.
 */
export function handleNominate(event: Nominate): void {
  // Get game
  let game = getGame(event.address.toHexString());
  // Skip if nominator account not exists
  let nominatorAccount = Account.load(event.params.account.toHexString());
  if (!nominatorAccount) {
    return;
  }
  // Skip if nominated sou; not exists
  let nominatedSoul = Soul.load(event.params.id.toString());
  if (!nominatedSoul) {
    return;
  }
  // Create nomination
  let nominationId = `${event.address.toHexString()}_${event.transaction.hash.toHexString()}`;
  let nomination = new GameNomination(nominationId);
  nomination.game = game.id;
  nomination.createdDate = event.block.timestamp;
  nomination.nominator = nominatorAccount.soul;
  nomination.nominated = nominatedSoul.id;
  nomination.save();
}
