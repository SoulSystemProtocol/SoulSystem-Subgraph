import { Address, ipfs, json, JSONValue, JSONValueKind, log, DataSourceContext } from "@graphprotocol/graph-ts"; // Added DataSourceContext
import { Soul, SoulPost, SoulOpinionChange, SoulOpinion } from "../../generated/schema";
import { SoulType, SoulHandle, Transfer, Approval, ApprovalForAll, URI, Announcement, OpinionChange } from "../../generated/Soul/Soul";
import { addSoulToAccount, loadOrCreateSoul, makeSearchField, removeSoulFromAccount } from "../utils";
import { store } from '@graphprotocol/graph-ts';
import { SoulIpfsMetadataTemplate, SoulPostIpfsMetadataTemplate } from "../../generated/templates";
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
  } else {
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
  soul.uri = event.params.value; // Set URI first

  // Extract IPFS hash from URI
  let ipfsHash = "";
  // Ensure soul.uri is not null before calling split
  if (soul.uri && (soul.uri as string).length > 0) {
    let parts = (soul.uri as string).split("/");
    if (parts.length > 0) {
      ipfsHash = parts[parts.length - 1];
    }
  }

  // If IPFS hash is found, call the template
  if (ipfsHash != "") {
    let context = new DataSourceContext();
    context.setString("entityId", soul.id);
    SoulIpfsMetadataTemplate.createWithContext(ipfsHash, context);
  }

  // Reset fields before async IPFS population
  soul.tags = [];
  soul.image = "";
  soul.name = "";
  soul.metadata = null;

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

  // Extract IPFS hash from URI
  let ipfsHash = "";
  // Ensure post.uri is not null before calling split
  if (post.uri && (post.uri as string).length > 0) {
    let parts = (post.uri as string).split("/");
    if (parts.length > 0) {
      ipfsHash = parts[parts.length - 1];
    }
  }

  // If IPFS hash is found, call the template
  if (ipfsHash != "") {
    let context = new DataSourceContext();
    context.setString("entityId", post.id);
    SoulPostIpfsMetadataTemplate.createWithContext(ipfsHash, context);
  }

  post.metadata = null; //Set to null (will be populated by IPFS handler)

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


/** [WIP] 
 * Handle a opinion change event.
 */
export function handleOpinionChange(event: OpinionChange): void {
  /* Opinion (Relationships?)
  Subject - uint256 sbt, 
  Object: 
    address indexed contractAddr, 
    uint256 indexed tokenId, 
  What: string domain, 
  Value:
    int256 oldValue, 
    int256 newValue
  */
  const sbt = event.params.sbt.toString();
  const role = event.params.domain;
  const contractAddr = event.params.contractAddr.toHexString();
  const tokenId = event.params.tokenId.toString();
  const value = event.params.newValue;

  // Fetch Opinionated Soul
  const soul = Soul.load(sbt);
  if (!soul) {
    log.error('OpinionChange Event - Soul ID:{} Missing', [sbt]);
    return;
  }

  //** Register Opinion about token of any contract
  const opinionId = `${sbt}_${contractAddr}_${tokenId}_${role}`;
  let opinion = SoulOpinion.load(opinionId);
  if (!opinion) {
    opinion = new SoulOpinion(opinionId);
    opinion.aEnd = sbt;
    opinion.bContract = contractAddr;
    opinion.bEnd = tokenId;
    opinion.role = role;
  } else {
    //Validate
    if (event.params.oldValue != opinion.value) {
      log.error('Opinion Change Mismatch expected:{} got:{}', [event.params.oldValue.toString(), opinion.value.toString()]);
    }
  }

  //Set New Value
  opinion.value = value;


  //** Handle opinions about another soul (Soul-to-Soul)
  if (contractAddr == event.address.toHexString()) {
    // Find The Object of the Opinion
    const aboutEnt = Soul.load(tokenId);
    if (!aboutEnt) {
      log.error('OpinionChange Event - Target Soul:{} Missing', [tokenId]);
      // return;
    } else {
      opinion.bSoul = tokenId;
    }

    //** Opinion Change Event
    const opChangeId = `${event.transaction.hash.toHex()}_${event.logIndex.toString()}`;
    const opinionChange = new SoulOpinionChange(opChangeId);
    opinionChange.subject = sbt;
    opinionChange.object = tokenId;
    opinionChange.role = role;
    opinionChange.valueBefore = event.params.oldValue;
    opinionChange.valueAfter = event.params.newValue;
    opinionChange.save();


    /* DEPRECATED
    // Separate positive & Negative Opinions (rating=true)
    if (event.params.rating === true) {
      // aboutEnt.totalPositiveRating = aboutEnt.totalPositiveRating.plus(
      //   event.params.score
      // );
      opinion.positiveRating = opinion.positiveRating.plus(
        event.params.score
      );
      opinion.value.plus(event.params.score);
    }
    // Update negative rating (rating=false)
    else {
      // aboutEnt.totalNegativeRating = aboutEnt.totalNegativeRating.plus(
      //   event.params.score
      // );
      opinion.negativeRating = opinion.negativeRating.plus(
        event.params.score
      );
      opinion.value.minus(event.params.score);
    }
     // Save entities
    // aboutEnt.save();
    */

  }//soul-to-soul

  //Save
  opinion.save();
}
