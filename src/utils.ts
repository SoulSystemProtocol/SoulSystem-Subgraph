import { Address } from "@graphprotocol/graph-ts";
import { Account, Soul } from "../generated/schema";

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
