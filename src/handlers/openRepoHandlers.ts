import { StringSet, AddressAdd } from "../../generated/OpenRepo/OpenRepo";
import { Game, 
  Claim, 
  Account, 
  AccountRelAddress, 
  GameRelAddress, 
  ClaimRelAddress, 
  SoulAssoc, 
  SoulAttr 
} from "../../generated/schema";
import {
  OPEN_REPO_ADDRESS_KEY_CLAIM,
  OPEN_REPO_STRING_KEY_ROLE,
  OPEN_REPO_STRING_KEY_TYPE,
} from "../constants";
import { loadOrCreateClaim, loadOrCreateGame, getSoulByAddr } from "../utils";
import { log } from '@graphprotocol/graph-ts'

/**
 * Add Asociation Between Souls
 * @param address Origin Address
 * @param key Association's Role
 * @param value Destenation Address
 */
 const assocAdd = (address: string, key: string, value: string): void => {
  //Relate by SBT
  let sbtOrigin = getSoulByAddr(address);  //Origin SBT
  let sbtDest = getSoulByAddr(value); //Destination SBT
  if(sbtOrigin && sbtDest){
  // if(!!sbtOrigin && !!sbtDest){   //Probably shouls use this instead
    const relId = `ASSOC_${sbtOrigin}_${key}_${sbtDest}`;
    let assoc = new SoulAssoc(relId);
    assoc.aEnd = sbtOrigin;
    assoc.bEnd = sbtDest;
    assoc.role = key;
    // assoc.qty = ;
    assoc.save();
  }
}

/**
 * Add Attributes to a Souls
 * @param address Origin Address
 * @param key Association's Role
 * @param value Destenation Address
 */
 const attrAdd = (address: string, key: string, value: string): void => {
  //Relate by SBT
  let sbt = getSoulByAddr(address);  //Origin SBT
  if(sbt){
  // if(!!sbt){   //Probably shouls use this instead
    const relId = `ATTR_${sbt}_${key}_${value}`;
    let attr = new SoulAttr(relId);
    attr.aEnd = sbt;
    attr.bEnd = value;
    attr.role = key;
    attr.save();
  }
}

/**
 * Handle a string set event to update a game type.
 */
export function handleStringSet(event: StringSet): void {
  const originAddr = event.params.originAddress.toHexString();
  const key = event.params.key;
  const value = event.params.value;

  //** Generic Attributes
  attrAdd(originAddr, key, value);

  //Entity's 'role'
  if (event.params.key == OPEN_REPO_STRING_KEY_ROLE){
    const id = event.params.originAddress.toHexString();
    // Get Entity
    // let game = loadOrCreateGame(event.params.originAddress.toHexString());
    let game = Game.load(id);  //This actually runs before the entity created event
    if (game) {
      // Update game role
      game.role = event.params.value;
      game.save();
    } else {
      // let claim = loadOrCreateClaim(event.params.originAddress.toHexString());
      let claim = Claim.load(id);  //This actually runs before the entity created event
      if (claim) {
        // Update claim role
        claim.role = event.params.value;
        claim.save();
      }
    }
  }
  //Entity's 'type'
  else if (event.params.key == OPEN_REPO_STRING_KEY_TYPE) {
    const id = event.params.originAddress.toHexString();
    // Get Entity
    // let game = loadOrCreateGame(event.params.originAddress.toHexString());
    let game = Game.load(id);  //This actually runs before the entity created event
    if (game) {
      // Update game type
      game.type = event.params.value;
      game.save();
    } else {
      // let claim = loadOrCreateClaim(event.params.originAddress.toHexString());
      let claim = Claim.load(id);  //This actually runs before the entity created event
      if (claim) {
        // Update claim type
        claim.type = event.params.value;
        claim.save();
      }
      else log.warning('No Game nor Claim for Address: {} key: {} value: {}', [id, key, value]);
    }
  }
}

/**
 * Handle a address add event to update a game of claim.
 */
export function handleAddressAdd(event: AddressAdd): void {
  const originAddr = event.params.originAddress.toHexString();
  const key = event.params.key;
  const value = event.params.destinationAddress.toHexString();
  const relId = `${originAddr}_${key}_${value}`;

  //** Generic Associations   //[TEST] Should work on next contract deployment
  assocAdd(originAddr, key, value);


  /* DEPRECATE - These should be between the souls */
  // For Game
  let entity = Game.load(originAddr);
  if (entity) {
    let relAddress = new GameRelAddress(relId);
    relAddress.origin = originAddr;
    relAddress.key = key;
    relAddress.value.push(value);
    relAddress.save();
  }
  else {
    // For Claim
    let entity = Claim.load(originAddr);
    if (entity) {
      let relAddress = new ClaimRelAddress(relId);
      relAddress.origin = originAddr;
      relAddress.key = key;
      relAddress.value.push(value);
      relAddress.save();
    }
    else {
      // For Account
      let entity = Account.load(originAddr);
      if (entity) {
        let relAddress = new AccountRelAddress(relId);
        relAddress.origin = originAddr;
        relAddress.key = key;
        relAddress.value.push(value);
        relAddress.save();
      }
    }
  }
  /* */

  

  // If claim value is set
  if (event.params.key == OPEN_REPO_ADDRESS_KEY_CLAIM) {
    // Get game
    let game = Game.load(originAddr);
    if (game) {
      // Get claim
      let claim = loadOrCreateClaim(value);
      // Update claim
      claim.game = game.id;
      claim.save();
    }
  }


}
