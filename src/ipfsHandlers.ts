import { Bytes, dataSource, json, log, JSONValueKind } from "@graphprotocol/graph-ts"; // Added JSONValueKind
import { Soul, SoulPost, GamePost, GameRole, Action } from "../generated/schema";

// Handler for processing IPFS metadata for Soul entities
export function handleSoulIpfsMetadata(data: Bytes): void {
  let ipfsHash = dataSource.stringParam(); // This is the IPFS hash the template was created with
  log.info("[Soul IPFS] Processing metadata for IPFS hash: {}", [ipfsHash]);

  let context = dataSource.context();
  let soulId = context.getString("entityId"); // Get the Soul ID passed in context

  if (soulId == null || soulId == "") {
    log.error("[Soul IPFS] Soul ID not found in context for IPFS hash: {}. Cannot link metadata.", [ipfsHash]);
    return;
  }

  let soul = Soul.load(soulId);
  if (!soul) {
    log.warning("[Soul IPFS] Soul entity with ID {} not found for IPFS hash: {}. Cannot link metadata.", [soulId, ipfsHash]);
    return;
  }

  let jsonData = json.try_fromBytes(data);
  if (jsonData.isError) {
    log.warning("[Soul IPFS] Failed to parse JSON data for IPFS hash: {}", [ipfsHash]);
    // Optionally, still save the raw metadata if parsing fails but soul is found
    // soul.metadata = data;
    // soul.save();
    return;
  }
  let value = jsonData.value.toObject();

  // Populate Soul fields from JSON
  let nameValue = value.get("name");
  if (nameValue && !nameValue.isNull()) {
    soul.name = nameValue.toString();
  } else {
    soul.name = null; // Or "" if your schema expects non-null after all and you made a mistake
  }

  let imageValue = value.get("image");
  if (imageValue && !imageValue.isNull()) {
    soul.image = imageValue.toString();
  } else {
    soul.image = null; // Or ""
  }

  let descriptionValue = value.get("description"); // Assuming 'description' might be a field
  if (descriptionValue && !descriptionValue.isNull()) {
    // Assuming Soul entity has a 'description' field (add to schema if needed)
    // soul.description = descriptionValue.toString();
  }

  let tagsValue = value.get("tags");
  if (tagsValue && !tagsValue.isNull() && tagsValue.kind == JSONValueKind.ARRAY) { // Used JSONValueKind directly and added isNull check
    soul.tags = tagsValue.toArray().map<string>((tag) => tag.toString());
  } else {
    soul.tags = []; // Reset or leave as is if not provided / wrong type
  }

  // Store the raw metadata
  soul.metadata = data;

  soul.save();
  log.info("[Soul IPFS] Successfully processed and linked metadata for Soul ID {} from IPFS hash: {}", [soulId, ipfsHash]);
}

// Add similar handlers for GamePost, GameRole, Action if their IPFS JSON structures differ
// export function handleGamePostIpfsMetadata(data: Bytes): void { ... }
// export function handleGameRoleIpfsMetadata(data: Bytes): void { ... }
// export function handleActionIpfsMetadata(data: Bytes): void { ... }

// Handler for processing IPFS metadata for GamePost entities
export function handleGamePostIpfsMetadata(data: Bytes): void {
  let ipfsHash = dataSource.stringParam();
  log.info("[GamePost IPFS] Processing metadata for IPFS hash: {}", [ipfsHash]);

  let context = dataSource.context();
  let entityId = context.getString("entityId");

  if (entityId == null || entityId == "") {
    log.error("[GamePost IPFS] Entity ID not found in context for IPFS hash: {}. Cannot link metadata.", [ipfsHash]);
    return;
  }

  let entity = GamePost.load(entityId);
  if (!entity) {
    log.warning("[GamePost IPFS] Entity with ID {} not found for IPFS hash: {}. Cannot link metadata.", [entityId, ipfsHash]);
    return;
  }

  entity.metadata = data; // Store the raw bytes
  entity.save();
  log.info("[GamePost IPFS] Successfully processed and linked metadata for Entity ID {} from IPFS hash: {}", [entityId, ipfsHash]);
}

// Handler for processing IPFS metadata for GameRole entities
export function handleGameRoleIpfsMetadata(data: Bytes): void {
  let ipfsHash = dataSource.stringParam();
  log.info("[GameRole IPFS] Processing metadata for IPFS hash: {}", [ipfsHash]);

  let context = dataSource.context();
  let entityId = context.getString("entityId");

  if (entityId == null || entityId == "") {
    log.error("[GameRole IPFS] Entity ID not found in context for IPFS hash: {}. Cannot link metadata.", [ipfsHash]);
    return;
  }

  let entity = GameRole.load(entityId);
  if (!entity) {
    log.warning("[GameRole IPFS] Entity with ID {} not found for IPFS hash: {}. Cannot link metadata.", [entityId, ipfsHash]);
    return;
  }

  entity.metadata = data; // Store the raw bytes
  entity.save();
  log.info("[GameRole IPFS] Successfully processed and linked metadata for Entity ID {} from IPFS hash: {}", [entityId, ipfsHash]);
}

// Handler for processing IPFS metadata for Action entities
export function handleActionIpfsMetadata(data: Bytes): void {
  let ipfsHash = dataSource.stringParam();
  log.info("[Action IPFS] Processing metadata for IPFS hash: {}", [ipfsHash]);

  let context = dataSource.context();
  let entityId = context.getString("entityId");

  if (entityId == null || entityId == "") {
    log.error("[Action IPFS] Entity ID not found in context for IPFS hash: {}. Cannot link metadata.", [ipfsHash]);
    return;
  }

  let entity = Action.load(entityId);
  if (!entity) {
    log.warning("[Action IPFS] Entity with ID {} not found for IPFS hash: {}. Cannot link metadata.", [entityId, ipfsHash]);
    return;
  }

  entity.metadata = data; // Store the raw bytes
  entity.save();
  log.info("[Action IPFS] Successfully processed and linked metadata for Entity ID {} from IPFS hash: {}", [entityId, ipfsHash]);
}

// Handler for processing IPFS metadata for SoulPost entities
export function handleSoulPostIpfsMetadata(data: Bytes): void {
  let ipfsHash = dataSource.stringParam();
  log.info("[SoulPost IPFS] Processing metadata for IPFS hash: {}", [ipfsHash]);

  let context = dataSource.context();
  let entityId = context.getString("entityId");

  if (entityId == null || entityId == "") {
    log.error("[SoulPost IPFS] Entity ID not found in context for IPFS hash: {}. Cannot link metadata.", [ipfsHash]);
    return;
  }

  let entity = SoulPost.load(entityId);
  if (!entity) {
    log.warning("[SoulPost IPFS] Entity with ID {} not found for IPFS hash: {}. Cannot link metadata.", [entityId, ipfsHash]);
    return;
  }

  entity.metadata = data; // Store the raw bytes
  entity.save();
  log.info("[SoulPost IPFS] Successfully processed and linked metadata for Entity ID {} from IPFS hash: {}", [entityId, ipfsHash]);
}
