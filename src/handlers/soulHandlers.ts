import { ipfs, json, JSONValue } from "@graphprotocol/graph-ts";
import { Soul } from "../../generated/schema";
import { SoulType, Transfer, URI } from "../../generated/Soul/Soul";
import { addSoulToAccount, makeSearchField } from "../utils";


/**
 * Handle a tranfer event to create or update a soul.
 */
export function handleTransfer(event: Transfer): void {
  // Find or create soul
  let soul = Soul.load(event.params.tokenId.toString());
  if (!soul) {
    soul = new Soul(event.params.tokenId.toString());
    soul.type = "";
  }
  // Update soul params
  soul.owner = event.params.to.toHexString();
  soul.save();
  // Add soul to account
  addSoulToAccount(event.params.to, soul);
}

/**
 * Handle a URI event to update a soul.
 */
export function handleURI(event: URI): void {
  // Find soul and return if not found
  let soul = Soul.load(event.params.id.toString());
  if (!soul) {
    return;
  }
  // Load uri data
  let uriIpfsHash = event.params.value.split("/").at(-1);
  let uriData = ipfs.cat(uriIpfsHash);
  // Parse uri json
  let uriJson = uriData ? json.fromBytes(uriData) : null;
  let uriJsonObject = uriJson ? uriJson.toObject() : null;
  // Get image from uri data
  let uriJsonImage = uriJsonObject ? uriJsonObject.get("image") : null;
  let uriJsonImageString = uriJsonImage ? uriJsonImage.toString() : null;
  // Get attributes from uri data
  let uriJsonAttributes = uriJsonObject
    ? uriJsonObject.get("attributes")
    : null;
  let uriJsonAttributesArray = uriJsonAttributes
    ? uriJsonAttributes.toArray()
    : new Array<JSONValue>(0);
  // Get uri first name and last name
  let uriFirstNameString: string | null = null;
  let uriLastNameString: string | null = null;
  for (let i = 0; i < uriJsonAttributesArray.length; i++) {
    // Get trait type and value
    let uriAttributeTraitType = uriJsonAttributesArray[i]
      .toObject()
      .get("trait_type");
    let uriAttributeValue = uriJsonAttributesArray[i].toObject().get("value");
    // Check trait type for getting first name
    if (
      uriAttributeTraitType &&
      uriAttributeTraitType.toString() == "First Name"
    ) {
      uriFirstNameString = uriAttributeValue
        ? uriAttributeValue.toString()
        : null;
    }
    // Check trait type for getting last name
    if (
      uriAttributeTraitType &&
      uriAttributeTraitType.toString() == "Last Name"
    ) {
      uriLastNameString = uriAttributeValue
        ? uriAttributeValue.toString()
        : null;
    }
  }
  // Update soul params
  soul.uri = event.params.value;
  soul.uriData = uriData;
  soul.uriImage = uriJsonImageString;
  soul.uriFirstName = uriFirstNameString;
  soul.uriLastName = uriLastNameString;
  soul.searchField = makeSearchField(soul);
  soul.save();
}

/**
 * Handle a soul type event to update a soul.
 */
export function handleSoulType(event: SoulType): void {
  // Find entity and return if not found
  let soul = Soul.load(event.params.tokenId.toString());
  if (!soul) {
    return;
  }
  // Update soul
  soul.type = event.params.soulType;
  soul.save();
}
