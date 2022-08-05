import { Address, ipfs, json, JSONValue } from "@graphprotocol/graph-ts";
import { Soul } from "../../generated/schema";
import { SoulType, Transfer, URI } from "../../generated/Soul/Soul";
import { addSoulToAccount, makeSearchField } from "../utils";
import { Soul as SoulContract } from "../../generated/Soul/Soul";


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
  if (!soul) return;
  
  //TODO: Extract 'tags' and save that as 'post.tags'
  
  // Load uri data
  let uriIpfsHash = event.params.value.split("/").at(-1);
  let uriData = ipfs.cat(uriIpfsHash); 
  // Parse uri json
  let uriJson = uriData ? json.fromBytes(uriData) : null;
  let uriJsonObject = uriJson ? uriJson.toObject() : null;
  
  // Get image from uri data
  let uriJsonImage = uriJsonObject ? uriJsonObject.get("image") : null;
  let uriJsonImageString = uriJsonImage ? uriJsonImage.toString() : "";

  // Get attributes from uri data
  let uriJsonAttributes = uriJsonObject
    ? uriJsonObject.get("attributes")
    : null;

  let uriJsonAttributesArray = uriJsonAttributes
    ? uriJsonAttributes.toArray()
    : new Array<JSONValue>(0);

  // Get uri first name and last name
  let uriFirstNameString: string = "";
  let uriLastNameString: string = "";
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
        : "";
    }
    // Check trait type for getting last name
    if (
      uriAttributeTraitType &&
      uriAttributeTraitType.toString() == "Last Name"
    ) {
      uriLastNameString = uriAttributeValue
        ? uriAttributeValue.toString()
        : "";
    }
  }

  // Update soul params
  soul.uri = event.params.value;
  soul.uriData = uriData;     //DEPRECATE - Shift to Metadata
  soul.metadata = uriData;
  soul.uriImage = uriJsonImageString;
  soul.uriFirstName = uriFirstNameString;
  soul.uriLastName = uriLastNameString;
  soul.name = uriFirstNameString + ' ' + uriFirstNameString;
  soul.searchField = makeSearchField(soul);
  soul.save();
}

/**
 * Handle a soul type event to update a soul.
 */
export function handleSoulType(event: SoulType): void {
  // Find entity and return if not found
  const tokenId = event.params.tokenId.toString();
  let soul = Soul.load(tokenId);
  if (!soul) return;
  // Update soul
  soul.type = event.params.soulType;
  if(soul.type!==''){ 
    /*
    let contract = SoulContract.bind(Address.fromString(soul.owner));
    let name = contract.name();
    // let name = getContractName(Address.fromString(soul.owner));
    //Contract - Fetch Name
    soul.uriFirstName = name;
    // soul.name = name;
    */
    soul.name = 'Owner:' + soul.owner
  }
  soul.save();
}

