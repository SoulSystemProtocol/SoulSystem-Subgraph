import { Bytes, dataSource, json, log } from "@graphprotocol/graph-ts";
import { Soul } from "../generated/schema";

// Handler for processing IPFS metadata for Soul entities
export function handleSoulIpfsMetadata(data: Bytes): void {
  // The IPFS hash that triggered this handler can be used as an ID.
  // Assuming the dataSource name/param is set to the IPFS hash or contains it.
  // For a file data source, dataSource.stringParam() is often the IPFS hash.
  let ipfsHash = dataSource.stringParam();

  // Attempt to load the Soul entity.
  // This assumes that Soul.uri (or another designated field) has been set
  // to this exact IPFS hash by the on-chain event handler before this
  // IPFS handler was triggered.
  // If Soul entities use the tokenID as their primary ID, we need a way to map
  // ipfsHash back to the soulID. For now, let's assume Soul.id could be the ipfsHash
  // if we design it that way, or that Soul.uri is reliably the ipfsHash.
  // A more robust way would be to use context if the Soul.id (tokenId) was passed
  // when .createWithContext() was called.
  // For now, let's try to load by ipfsHash assuming it might be the ID of a related entity,
  // or we find a Soul entity that has this ipfsHash in its 'uri' field.
  // This part is tricky: The direct ID of the Soul is its tokenId.
  // We need to find the Soul whose `uri` matches `ipfsHash`.
  // This direct lookup isn't straightforward in handlers.

  // Alternative: Assume the IPFS content itself has the Soul's ID (tokenId).
  // This is not ideal as it requires a specific structure in the IPFS JSON.

  // Best Approach: The entity that *triggered* this IPFS fetch should have its ID
  // passed via context. dataSource.context()
  // For now, let's log the data and plan to refine the linking mechanism.

  let jsonData = json.try_fromBytes(data);
  if (jsonData.isError) {
    log.warning("[Soul IPFS] Failed to parse JSON data for IPFS hash: {}", [ipfsHash]);
    return;
  }
  let value = jsonData.value.toObject();

  // Log extracted data for now. Actual entity updates will require robust linking.
  log.info("[Soul IPFS] Processing metadata for IPFS hash: {}", [ipfsHash]);

  let name = value.get("name");
  if (name) {
    log.info("[Soul IPFS] Name: {}", [name.toString()]);
  }

  let image = value.get("image");
  if (image) {
    log.info("[Soul IPFS] Image: {}", [image.toString()]);
  }

  let description = value.get("description");
  if (description) {
    log.info("[Soul IPFS] Description: {}", [description.toString()]);
  }

  let tagsValue = value.get("tags");
  if (tagsValue && tagsValue.kind == json.JSONValueKind.ARRAY) {
    let tagsArray = tagsValue.toArray().map<string>((tag) => tag.toString());
    log.info("[Soul IPFS] Tags: {}", [tagsArray.join(", ")]);
  }

  // TODO: Implement robust loading and updating of the Soul entity.
  // This typically involves:
  // 1. The main event handler (e.g., handleURI for Soul) calls:
  //    `SoulIpfsMetadataTemplate.createWithContext(ipfsHash, contextEntityId)`
  // 2. In this IPFS handler, retrieve contextEntityId from `dataSource.context()`.
  // 3. Load Soul: `let soul = Soul.load(contextEntityId);`
  // 4. Populate fields: `soul.name = name.toString();` etc.
  // 5. `soul.metadata = data;` // Store the raw bytes
  // 6. `soul.save();`
}

// Add similar handlers for GamePost, GameRole, Action if their IPFS JSON structures differ
// export function handleGamePostIpfsMetadata(data: Bytes): void { ... }
// export function handleGameRoleIpfsMetadata(data: Bytes): void { ... }
// export function handleActionIpfsMetadata(data: Bytes): void { ... }

// Handler for processing IPFS metadata for GamePost entities
export function handleGamePostIpfsMetadata(data: Bytes): void {
  let ipfsHash = dataSource.stringParam(); // Assuming IPFS hash is the dataSource name/param
  log.info("[GamePost IPFS] Processing metadata for IPFS hash: {}", [ipfsHash]);
  let jsonData = json.try_fromBytes(data);
  if (jsonData.isError) {
    log.warning("[GamePost IPFS] Failed to parse JSON data for IPFS hash: {}", [ipfsHash]);
    return;
  }
  // TODO: Implement robust loading/updating of the GamePost entity using context.
  // For now, just log that it was called.
  // Example: GamePost.load(contextEntityId) and populate its 'metadata' field.
}

// Handler for processing IPFS metadata for GameRole entities
export function handleGameRoleIpfsMetadata(data: Bytes): void {
  let ipfsHash = dataSource.stringParam();
  log.info("[GameRole IPFS] Processing metadata for IPFS hash: {}", [ipfsHash]);
  let jsonData = json.try_fromBytes(data);
  if (jsonData.isError) {
    log.warning("[GameRole IPFS] Failed to parse JSON data for IPFS hash: {}", [ipfsHash]);
    return;
  }
  // TODO: Implement robust loading/updating of the GameRole entity using context.
  // Example: GameRole.load(contextEntityId) and populate its 'metadata' field.
}

// Handler for processing IPFS metadata for Action entities
export function handleActionIpfsMetadata(data: Bytes): void {
  let ipfsHash = dataSource.stringParam();
  log.info("[Action IPFS] Processing metadata for IPFS hash: {}", [ipfsHash]);
  let jsonData = json.try_fromBytes(data);
  if (jsonData.isError) {
    log.warning("[Action IPFS] Failed to parse JSON data for IPFS hash: {}", [ipfsHash]);
    return;
  }
  // TODO: Implement robust loading/updating of the Action entity using context.
  // Example: Action.load(contextEntityId) and populate its 'metadata' field.
}

// Handler for processing IPFS metadata for SoulPost entities
export function handleSoulPostIpfsMetadata(data: Bytes): void {
  let ipfsHash = dataSource.stringParam(); // Assuming IPFS hash is the dataSource name/param
  log.info("[SoulPost IPFS] Processing metadata for IPFS hash: {}", [ipfsHash]);
  let jsonData = json.try_fromBytes(data);
  if (jsonData.isError) {
    log.warning("[SoulPost IPFS] Failed to parse JSON data for IPFS hash: {}", [ipfsHash]);
    return;
  }
  // TODO: Implement robust loading/updating of the SoulPost entity using context.
  // For now, just log that it was called.
  // Example: SoulPost.load(contextEntityId) and populate its 'metadata' field.
}
