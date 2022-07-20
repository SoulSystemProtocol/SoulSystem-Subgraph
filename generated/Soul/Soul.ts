// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AdminChanged extends ethereum.Event {
  get params(): AdminChanged__Params {
    return new AdminChanged__Params(this);
  }
}

export class AdminChanged__Params {
  _event: AdminChanged;

  constructor(event: AdminChanged) {
    this._event = event;
  }

  get previousAdmin(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newAdmin(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Approval extends ethereum.Event {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get approved(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ApprovalForAll extends ethereum.Event {
  get params(): ApprovalForAll__Params {
    return new ApprovalForAll__Params(this);
  }
}

export class ApprovalForAll__Params {
  _event: ApprovalForAll;

  constructor(event: ApprovalForAll) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get operator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get approved(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class BeaconUpgraded extends ethereum.Event {
  get params(): BeaconUpgraded__Params {
    return new BeaconUpgraded__Params(this);
  }
}

export class BeaconUpgraded__Params {
  _event: BeaconUpgraded;

  constructor(event: BeaconUpgraded) {
    this._event = event;
  }

  get beacon(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class ContractURI extends ethereum.Event {
  get params(): ContractURI__Params {
    return new ContractURI__Params(this);
  }
}

export class ContractURI__Params {
  _event: ContractURI;

  constructor(event: ContractURI) {
    this._event = event;
  }

  get param0(): string {
    return this._event.parameters[0].value.toString();
  }
}

export class Initialized extends ethereum.Event {
  get params(): Initialized__Params {
    return new Initialized__Params(this);
  }
}

export class Initialized__Params {
  _event: Initialized;

  constructor(event: Initialized) {
    this._event = event;
  }

  get version(): i32 {
    return this._event.parameters[0].value.toI32();
  }
}

export class OpinionChange extends ethereum.Event {
  get params(): OpinionChange__Params {
    return new OpinionChange__Params(this);
  }
}

export class OpinionChange__Params {
  _event: OpinionChange;

  constructor(event: OpinionChange) {
    this._event = event;
  }

  get chainId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get contractAddr(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get domain(): string {
    return this._event.parameters[3].value.toString();
  }

  get rating(): boolean {
    return this._event.parameters[4].value.toBoolean();
  }

  get score(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Post extends ethereum.Event {
  get params(): Post__Params {
    return new Post__Params(this);
  }
}

export class Post__Params {
  _event: Post;

  constructor(event: Post) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get uri(): string {
    return this._event.parameters[2].value.toString();
  }
}

export class ReputationChange extends ethereum.Event {
  get params(): ReputationChange__Params {
    return new ReputationChange__Params(this);
  }
}

export class ReputationChange__Params {
  _event: ReputationChange;

  constructor(event: ReputationChange) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get domain(): string {
    return this._event.parameters[1].value.toString();
  }

  get rating(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }

  get score(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class SoulType extends ethereum.Event {
  get params(): SoulType__Params {
    return new SoulType__Params(this);
  }
}

export class SoulType__Params {
  _event: SoulType;

  constructor(event: SoulType) {
    this._event = event;
  }

  get tokenId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get soulType(): string {
    return this._event.parameters[1].value.toString();
  }
}

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class URI extends ethereum.Event {
  get params(): URI__Params {
    return new URI__Params(this);
  }
}

export class URI__Params {
  _event: URI;

  constructor(event: URI) {
    this._event = event;
  }

  get value(): string {
    return this._event.parameters[0].value.toString();
  }

  get id(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Upgraded extends ethereum.Event {
  get params(): Upgraded__Params {
    return new Upgraded__Params(this);
  }
}

export class Upgraded__Params {
  _event: Upgraded;

  constructor(event: Upgraded) {
    this._event = event;
  }

  get implementation(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Soul extends ethereum.SmartContract {
  static bind(address: Address): Soul {
    return new Soul("Soul", address);
  }

  balanceOf(owner: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(owner: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  contractURI(): string {
    let result = super.call("contractURI", "contractURI():(string)", []);

    return result[0].toString();
  }

  try_contractURI(): ethereum.CallResult<string> {
    let result = super.tryCall("contractURI", "contractURI():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  getApproved(tokenId: BigInt): Address {
    let result = super.call("getApproved", "getApproved(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_getApproved(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getApproved",
      "getApproved(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getHub(): Address {
    let result = super.call("getHub", "getHub():(address)", []);

    return result[0].toAddress();
  }

  try_getHub(): ethereum.CallResult<Address> {
    let result = super.tryCall("getHub", "getHub():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getRepForDomain(
    contractAddr: Address,
    tokenId: BigInt,
    domain: string,
    rating: boolean
  ): BigInt {
    let result = super.call(
      "getRepForDomain",
      "getRepForDomain(address,uint256,string,bool):(uint256)",
      [
        ethereum.Value.fromAddress(contractAddr),
        ethereum.Value.fromUnsignedBigInt(tokenId),
        ethereum.Value.fromString(domain),
        ethereum.Value.fromBoolean(rating)
      ]
    );

    return result[0].toBigInt();
  }

  try_getRepForDomain(
    contractAddr: Address,
    tokenId: BigInt,
    domain: string,
    rating: boolean
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getRepForDomain",
      "getRepForDomain(address,uint256,string,bool):(uint256)",
      [
        ethereum.Value.fromAddress(contractAddr),
        ethereum.Value.fromUnsignedBigInt(tokenId),
        ethereum.Value.fromString(domain),
        ethereum.Value.fromBoolean(rating)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getRepForDomain1(
    chainId: BigInt,
    contractAddr: Address,
    tokenId: BigInt,
    domain: string,
    rating: boolean
  ): BigInt {
    let result = super.call(
      "getRepForDomain",
      "getRepForDomain(uint256,address,uint256,string,bool):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(chainId),
        ethereum.Value.fromAddress(contractAddr),
        ethereum.Value.fromUnsignedBigInt(tokenId),
        ethereum.Value.fromString(domain),
        ethereum.Value.fromBoolean(rating)
      ]
    );

    return result[0].toBigInt();
  }

  try_getRepForDomain1(
    chainId: BigInt,
    contractAddr: Address,
    tokenId: BigInt,
    domain: string,
    rating: boolean
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getRepForDomain",
      "getRepForDomain(uint256,address,uint256,string,bool):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(chainId),
        ethereum.Value.fromAddress(contractAddr),
        ethereum.Value.fromUnsignedBigInt(tokenId),
        ethereum.Value.fromString(domain),
        ethereum.Value.fromBoolean(rating)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getRepForDomain2(tokenId: BigInt, domain: string, rating: boolean): BigInt {
    let result = super.call(
      "getRepForDomain",
      "getRepForDomain(uint256,string,bool):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(tokenId),
        ethereum.Value.fromString(domain),
        ethereum.Value.fromBoolean(rating)
      ]
    );

    return result[0].toBigInt();
  }

  try_getRepForDomain2(
    tokenId: BigInt,
    domain: string,
    rating: boolean
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getRepForDomain",
      "getRepForDomain(uint256,string,bool):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(tokenId),
        ethereum.Value.fromString(domain),
        ethereum.Value.fromBoolean(rating)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  hasTokenControl(tokenId: BigInt): boolean {
    let result = super.call(
      "hasTokenControl",
      "hasTokenControl(uint256):(bool)",
      [ethereum.Value.fromUnsignedBigInt(tokenId)]
    );

    return result[0].toBoolean();
  }

  try_hasTokenControl(tokenId: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "hasTokenControl",
      "hasTokenControl(uint256):(bool)",
      [ethereum.Value.fromUnsignedBigInt(tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isApprovedForAll(owner: Address, operator: Address): boolean {
    let result = super.call(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );

    return result[0].toBoolean();
  }

  try_isApprovedForAll(
    owner: Address,
    operator: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  mint(tokenURI: string): BigInt {
    let result = super.call("mint", "mint(string):(uint256)", [
      ethereum.Value.fromString(tokenURI)
    ]);

    return result[0].toBigInt();
  }

  try_mint(tokenURI: string): ethereum.CallResult<BigInt> {
    let result = super.tryCall("mint", "mint(string):(uint256)", [
      ethereum.Value.fromString(tokenURI)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  mintFor(to: Address, tokenURI: string): BigInt {
    let result = super.call("mintFor", "mintFor(address,string):(uint256)", [
      ethereum.Value.fromAddress(to),
      ethereum.Value.fromString(tokenURI)
    ]);

    return result[0].toBigInt();
  }

  try_mintFor(to: Address, tokenURI: string): ethereum.CallResult<BigInt> {
    let result = super.tryCall("mintFor", "mintFor(address,string):(uint256)", [
      ethereum.Value.fromAddress(to),
      ethereum.Value.fromString(tokenURI)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  ownerOf(tokenId: BigInt): Address {
    let result = super.call("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_ownerOf(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  proxiableUUID(): Bytes {
    let result = super.call("proxiableUUID", "proxiableUUID():(bytes32)", []);

    return result[0].toBytes();
  }

  try_proxiableUUID(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "proxiableUUID",
      "proxiableUUID():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  repoAddr(): Address {
    let result = super.call("repoAddr", "repoAddr():(address)", []);

    return result[0].toAddress();
  }

  try_repoAddr(): ethereum.CallResult<Address> {
    let result = super.tryCall("repoAddr", "repoAddr():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  supportsInterface(interfaceId: Bytes): boolean {
    let result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  tokenByAddress(owner: Address): BigInt {
    let result = super.call(
      "tokenByAddress",
      "tokenByAddress(address):(uint256)",
      [ethereum.Value.fromAddress(owner)]
    );

    return result[0].toBigInt();
  }

  try_tokenByAddress(owner: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "tokenByAddress",
      "tokenByAddress(address):(uint256)",
      [ethereum.Value.fromAddress(owner)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tokenURI(tokenId: BigInt): string {
    let result = super.call("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toString();
  }

  try_tokenURI(tokenId: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  types(param0: BigInt): string {
    let result = super.call("types", "types(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return result[0].toString();
  }

  try_types(param0: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("types", "types(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  update(tokenId: BigInt, uri: string): BigInt {
    let result = super.call("update", "update(uint256,string):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(tokenId),
      ethereum.Value.fromString(uri)
    ]);

    return result[0].toBigInt();
  }

  try_update(tokenId: BigInt, uri: string): ethereum.CallResult<BigInt> {
    let result = super.tryCall("update", "update(uint256,string):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(tokenId),
      ethereum.Value.fromString(uri)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }
}

export class BurnCall extends ethereum.Call {
  get inputs(): BurnCall__Inputs {
    return new BurnCall__Inputs(this);
  }

  get outputs(): BurnCall__Outputs {
    return new BurnCall__Outputs(this);
  }
}

export class BurnCall__Inputs {
  _call: BurnCall;

  constructor(call: BurnCall) {
    this._call = call;
  }

  get tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class BurnCall__Outputs {
  _call: BurnCall;

  constructor(call: BurnCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get hub(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class MintCall extends ethereum.Call {
  get inputs(): MintCall__Inputs {
    return new MintCall__Inputs(this);
  }

  get outputs(): MintCall__Outputs {
    return new MintCall__Outputs(this);
  }
}

export class MintCall__Inputs {
  _call: MintCall;

  constructor(call: MintCall) {
    this._call = call;
  }

  get tokenURI(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class MintCall__Outputs {
  _call: MintCall;

  constructor(call: MintCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class MintForCall extends ethereum.Call {
  get inputs(): MintForCall__Inputs {
    return new MintForCall__Inputs(this);
  }

  get outputs(): MintForCall__Outputs {
    return new MintForCall__Outputs(this);
  }
}

export class MintForCall__Inputs {
  _call: MintForCall;

  constructor(call: MintForCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenURI(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class MintForCall__Outputs {
  _call: MintForCall;

  constructor(call: MintForCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class PostCall extends ethereum.Call {
  get inputs(): PostCall__Inputs {
    return new PostCall__Inputs(this);
  }

  get outputs(): PostCall__Outputs {
    return new PostCall__Outputs(this);
  }
}

export class PostCall__Inputs {
  _call: PostCall;

  constructor(call: PostCall) {
    this._call = call;
  }

  get tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get uri_(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class PostCall__Outputs {
  _call: PostCall;

  constructor(call: PostCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RepAddCall extends ethereum.Call {
  get inputs(): RepAddCall__Inputs {
    return new RepAddCall__Inputs(this);
  }

  get outputs(): RepAddCall__Outputs {
    return new RepAddCall__Outputs(this);
  }
}

export class RepAddCall__Inputs {
  _call: RepAddCall;

  constructor(call: RepAddCall) {
    this._call = call;
  }

  get tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get domain(): string {
    return this._call.inputValues[1].value.toString();
  }

  get rating(): boolean {
    return this._call.inputValues[2].value.toBoolean();
  }

  get amount(): i32 {
    return this._call.inputValues[3].value.toI32();
  }
}

export class RepAddCall__Outputs {
  _call: RepAddCall;

  constructor(call: RepAddCall) {
    this._call = call;
  }
}

export class SafeTransferFromCall extends ethereum.Call {
  get inputs(): SafeTransferFromCall__Inputs {
    return new SafeTransferFromCall__Inputs(this);
  }

  get outputs(): SafeTransferFromCall__Outputs {
    return new SafeTransferFromCall__Outputs(this);
  }
}

export class SafeTransferFromCall__Inputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SafeTransferFromCall__Outputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }
}

export class SafeTransferFrom1Call extends ethereum.Call {
  get inputs(): SafeTransferFrom1Call__Inputs {
    return new SafeTransferFrom1Call__Inputs(this);
  }

  get outputs(): SafeTransferFrom1Call__Outputs {
    return new SafeTransferFrom1Call__Outputs(this);
  }
}

export class SafeTransferFrom1Call__Inputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get data(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class SafeTransferFrom1Call__Outputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }
}

export class SetApprovalForAllCall extends ethereum.Call {
  get inputs(): SetApprovalForAllCall__Inputs {
    return new SetApprovalForAllCall__Inputs(this);
  }

  get outputs(): SetApprovalForAllCall__Outputs {
    return new SetApprovalForAllCall__Outputs(this);
  }
}

export class SetApprovalForAllCall__Inputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }

  get operator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get approved(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetApprovalForAllCall__Outputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }
}

export class SetHubCall extends ethereum.Call {
  get inputs(): SetHubCall__Inputs {
    return new SetHubCall__Inputs(this);
  }

  get outputs(): SetHubCall__Outputs {
    return new SetHubCall__Outputs(this);
  }
}

export class SetHubCall__Inputs {
  _call: SetHubCall;

  constructor(call: SetHubCall) {
    this._call = call;
  }

  get hubAddr(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetHubCall__Outputs {
  _call: SetHubCall;

  constructor(call: SetHubCall) {
    this._call = call;
  }
}

export class TokenOwnerAddCall extends ethereum.Call {
  get inputs(): TokenOwnerAddCall__Inputs {
    return new TokenOwnerAddCall__Inputs(this);
  }

  get outputs(): TokenOwnerAddCall__Outputs {
    return new TokenOwnerAddCall__Outputs(this);
  }
}

export class TokenOwnerAddCall__Inputs {
  _call: TokenOwnerAddCall;

  constructor(call: TokenOwnerAddCall) {
    this._call = call;
  }

  get owner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class TokenOwnerAddCall__Outputs {
  _call: TokenOwnerAddCall;

  constructor(call: TokenOwnerAddCall) {
    this._call = call;
  }
}

export class TokenOwnerRemoveCall extends ethereum.Call {
  get inputs(): TokenOwnerRemoveCall__Inputs {
    return new TokenOwnerRemoveCall__Inputs(this);
  }

  get outputs(): TokenOwnerRemoveCall__Outputs {
    return new TokenOwnerRemoveCall__Outputs(this);
  }
}

export class TokenOwnerRemoveCall__Inputs {
  _call: TokenOwnerRemoveCall;

  constructor(call: TokenOwnerRemoveCall) {
    this._call = call;
  }

  get owner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class TokenOwnerRemoveCall__Outputs {
  _call: TokenOwnerRemoveCall;

  constructor(call: TokenOwnerRemoveCall) {
    this._call = call;
  }
}

export class TransferFromCall extends ethereum.Call {
  get inputs(): TransferFromCall__Inputs {
    return new TransferFromCall__Inputs(this);
  }

  get outputs(): TransferFromCall__Outputs {
    return new TransferFromCall__Outputs(this);
  }
}

export class TransferFromCall__Inputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromCall__Outputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UpdateCall extends ethereum.Call {
  get inputs(): UpdateCall__Inputs {
    return new UpdateCall__Inputs(this);
  }

  get outputs(): UpdateCall__Outputs {
    return new UpdateCall__Outputs(this);
  }
}

export class UpdateCall__Inputs {
  _call: UpdateCall;

  constructor(call: UpdateCall) {
    this._call = call;
  }

  get tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get uri(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class UpdateCall__Outputs {
  _call: UpdateCall;

  constructor(call: UpdateCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class UpgradeToCall extends ethereum.Call {
  get inputs(): UpgradeToCall__Inputs {
    return new UpgradeToCall__Inputs(this);
  }

  get outputs(): UpgradeToCall__Outputs {
    return new UpgradeToCall__Outputs(this);
  }
}

export class UpgradeToCall__Inputs {
  _call: UpgradeToCall;

  constructor(call: UpgradeToCall) {
    this._call = call;
  }

  get newImplementation(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpgradeToCall__Outputs {
  _call: UpgradeToCall;

  constructor(call: UpgradeToCall) {
    this._call = call;
  }
}

export class UpgradeToAndCallCall extends ethereum.Call {
  get inputs(): UpgradeToAndCallCall__Inputs {
    return new UpgradeToAndCallCall__Inputs(this);
  }

  get outputs(): UpgradeToAndCallCall__Outputs {
    return new UpgradeToAndCallCall__Outputs(this);
  }
}

export class UpgradeToAndCallCall__Inputs {
  _call: UpgradeToAndCallCall;

  constructor(call: UpgradeToAndCallCall) {
    this._call = call;
  }

  get newImplementation(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get data(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class UpgradeToAndCallCall__Outputs {
  _call: UpgradeToAndCallCall;

  constructor(call: UpgradeToAndCallCall) {
    this._call = call;
  }
}
