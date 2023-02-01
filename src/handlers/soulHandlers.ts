import { Address, ipfs, json, JSONValue, JSONValueKind  } from "@graphprotocol/graph-ts";
import { Soul, SoulPost } from "../../generated/schema"; //[TBD]
import { SoulType, SoulHandle, Transfer, Approval, ApprovalForAll, URI, Announcement } from "../../generated/Soul/Soul";
import { addSoulToAccount, loadOrCreateSoul, makeSearchField, removeSoulFromAccount } from "../utils";
import { store } from '@graphprotocol/graph-ts'
// import { Soul as SoulContract } from "../../generated/Soul/Soul";
// import { log } from '@graphprotocol/graph-ts'

/**
 * Handle a tranfer event to create or update a soul.
 * (address from,address to, uint256 tokenId)
 */
export function handleTransfer(event: Transfer): void {
  const soulId = event.params.tokenId.toString();
  if (event.params.to == Address.zero()) {
    //Delete Soul
    store.remove('Soul', soulId);
  }else{
    // Find or create soul
    let soul = loadOrCreateSoul(soulId);
    //Reset Type & Role
    soul.type = "";
    soul.role = "";
    soul.stage = 0;
    if (event.params.from != Address.zero()) {
      //Remove Soul From Previous Account
      removeSoulFromAccount(event.params.from);
    }
    if (event.params.to != Address.zero()) {
      // Add soul to account
      addSoulToAccount(event.params.to, soul);
    }
    // Update soul params
    soul.owner = event.params.to.toHexString();
    soul.save();
  }
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
  let metadata = ipfs.cat(uriIpfsHash);
  // Parse metadata json
  let uriJson = metadata ? json.fromBytes(metadata) : null;
  let uriJsonObject = uriJson ? uriJson.toObject() : null;
  //Extract Tags
  if(uriJsonObject){
    const metadataTags = uriJsonObject
      ? uriJsonObject.get("tags")
      : null;
    if(metadataTags && Array.isArray(metadataTags)){
      let metadataTagsArray = metadataTags.toArray();
      let tagsArray = new Array<string>(0);
      for(let i=0; i<metadataTagsArray.length; i++){
        if(typeof metadataTagsArray[i].toString() == 'string'){
          tagsArray.push(metadataTagsArray[i].toString());
        }
      }
      soul.tags = tagsArray;
    }
  }

  // Cached Soul Data
  soul.uri = event.params.value;
  soul.metadata = metadata;

  // Get image from metadata
  const uriJsonImage = uriJsonObject ? uriJsonObject.get("image") : null;
  const uriJsonImageString: string = uriJsonImage ? uriJsonImage.toString() : "";
  soul.uriImage = uriJsonImageString; //DEPRECATE
  soul.image = uriJsonImageString;

  // Get name from metadata
  const uriJsonName = uriJsonObject ? uriJsonObject.get("name") : null;
  const uriJsonNameString: string = uriJsonName ? uriJsonName.toString() : "";
  if(!!uriJsonNameString){
    soul.name = uriJsonNameString;
  } else {
    /**
     * Extract Name From JSON
     * *** This is a rather silly backward compatibility thing we should get rid of!
     */
    // Get attributes from uri data
    const uriJsonAttributes = uriJsonObject
    ? uriJsonObject.get("attributes")
    : null;
    if(uriJsonAttributes){
      const uriJsonAttributesArray: JSONValue[] = uriJsonAttributes.toArray();
      // Get uri first name and last name
      let uriFirstNameString: string = "";
      let uriLastNameString: string = "";
      let fullName: string = "";
      for (let i = 0; i < uriJsonAttributesArray.length; i++) {
        //Validate Type
        if(uriJsonAttributesArray[i].kind == JSONValueKind.OBJECT){
          // Get trait type and value
          let uriAttributeTraitType = uriJsonAttributesArray[i].toObject().get("trait_type");
          let uriAttributeValue = uriJsonAttributesArray[i].toObject().get("value");
          // first name
          if (
            uriAttributeTraitType &&
            uriAttributeTraitType.toString().toLowerCase() == "first name"
          ) {
            uriFirstNameString = uriAttributeValue
              ? uriAttributeValue.toString()
              : "";
          }
          // last name
          if (
            uriAttributeTraitType &&
            uriAttributeTraitType.toString().toLowerCase() == "last name"
          ) {
            uriLastNameString = uriAttributeValue
              ? uriAttributeValue.toString()
              : "";
          }
          // name
          if (
            uriAttributeTraitType &&
            uriAttributeTraitType.toString().toLowerCase() == "name"
          ) {
            fullName = uriAttributeValue
              ? uriAttributeValue.toString()
              : "";
          }
        }
      }
      if(fullName) soul.name = fullName;
      else{
        //Backward Compatibility
        soul.uriFirstName = uriFirstNameString;
        soul.uriLastName = uriLastNameString;
        let name = uriFirstNameString;
        if (!!uriLastNameString) name += ' ' + uriLastNameString;
        soul.name = name
      }
    }
  }
  soul.searchField = makeSearchField(soul);
  soul.save();
}

/**
 * Handle a soul type event to update a soul.
 * @dev after the transfer of a Soul the contract will calssify the owner and emit this event
 */
export function handleSoulType(event: SoulType): void {
  // Find entity and return if not found
  const tokenId = event.params.tokenId.toString();
  let soul = Soul.load(tokenId);
  if (!soul) return;
  // Update soul
  soul.type = event.params.soulType;
  soul.save();
}

/**
 * Handle a soul handle change event
 */
export function handleHandleSet(event: SoulHandle): void {
  let soul = Soul.load(event.params.tokenId.toString());
  if (!soul) return;
  //Set
  soul.handle = event.params.handle;
  //Save
  soul.save();
}

/**
 * Handle a soul post event
 * # event Post(address indexed account, uint256 tokenId, string uri, string context);
 */
export function handleAnnouncement(event: Announcement): void {
  // Skip if author soul is not exists
  let authorSoul = Soul.load(event.params.tokenId.toString());
  if (!authorSoul) return;

  // Create Soul Announcement Entity
  const postId = `${event.transaction.hash.toHexString()}_${event.logIndex.toString()}`;
  let post = new SoulPost(postId);
  post.createdDate = event.block.timestamp;
  post.author = authorSoul.id;
  post.uri = event.params.uri;
  post.context = event.params.context;

  // Load uri data
  const ipfsHash = event.params.uri.split("/").at(-1);
  const metadata = ipfs.cat(ipfsHash);
  post.metadata = metadata;
  /*
  if(!!metadata){
    // Parse metadata json
    let uriJson = json.fromBytes(metadata);
    let uriJsonObject: any = uriJson.toObject();
    // post.entityRole = event.params.entRole.toString();
    post.entityRole = uriJsonObject?.entRole; //Maybe get from metadata ?
  }
  */
  //Save
  post.save();
}

/**
 * Handle 
 */
export function handleApproval(event: Approval): void {

}

/**
 * Handle 
 */
export function handleApprovalForAll(event: ApprovalForAll): void {

}
