// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Account extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("soul", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Account entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Account entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Account", id.toString(), this);
    }
  }

  static load(id: string): Account | null {
    return changetype<Account | null>(store.get("Account", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get soul(): string {
    let value = this.get("soul");
    return value!.toString();
  }

  set soul(value: string) {
    this.set("soul", Value.fromString(value));
  }
}

export class Soul extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("owner", Value.fromString(""));
    this.set("type", Value.fromString(""));
    this.set("uriImage", Value.fromString(""));
    this.set("uriFirstName", Value.fromString(""));
    this.set("uriLastName", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Soul entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Soul entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Soul", id.toString(), this);
    }
  }

  static load(id: string): Soul | null {
    return changetype<Soul | null>(store.get("Soul", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value!.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get type(): string {
    let value = this.get("type");
    return value!.toString();
  }

  set type(value: string) {
    this.set("type", Value.fromString(value));
  }

  get uri(): string | null {
    let value = this.get("uri");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set uri(value: string | null) {
    if (!value) {
      this.unset("uri");
    } else {
      this.set("uri", Value.fromString(<string>value));
    }
  }

  get uriData(): Bytes | null {
    let value = this.get("uriData");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set uriData(value: Bytes | null) {
    if (!value) {
      this.unset("uriData");
    } else {
      this.set("uriData", Value.fromBytes(<Bytes>value));
    }
  }

  get uriImage(): string {
    let value = this.get("uriImage");
    return value!.toString();
  }

  set uriImage(value: string) {
    this.set("uriImage", Value.fromString(value));
  }

  get uriFirstName(): string {
    let value = this.get("uriFirstName");
    return value!.toString();
  }

  set uriFirstName(value: string) {
    this.set("uriFirstName", Value.fromString(value));
  }

  get uriLastName(): string {
    let value = this.get("uriLastName");
    return value!.toString();
  }

  set uriLastName(value: string) {
    this.set("uriLastName", Value.fromString(value));
  }

  get searchField(): string | null {
    let value = this.get("searchField");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set searchField(value: string | null) {
    if (!value) {
      this.unset("searchField");
    } else {
      this.set("searchField", Value.fromString(<string>value));
    }
  }

  get participantGame(): Array<string> {
    let value = this.get("participantGame");
    return value!.toStringArray();
  }

  set participantGame(value: Array<string>) {
    this.set("participantGame", Value.fromStringArray(value));
  }

  get participantProc(): Array<string> {
    let value = this.get("participantProc");
    return value!.toStringArray();
  }

  set participantProc(value: Array<string>) {
    this.set("participantProc", Value.fromStringArray(value));
  }
}

export class Game extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("hub", Value.fromString(""));
    this.set("name", Value.fromString(""));
    this.set("type", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Game entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Game entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Game", id.toString(), this);
    }
  }

  static load(id: string): Game | null {
    return changetype<Game | null>(store.get("Game", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get hub(): string {
    let value = this.get("hub");
    return value!.toString();
  }

  set hub(value: string) {
    this.set("hub", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get type(): string {
    let value = this.get("type");
    return value!.toString();
  }

  set type(value: string) {
    this.set("type", Value.fromString(value));
  }

  get uri(): string | null {
    let value = this.get("uri");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set uri(value: string | null) {
    if (!value) {
      this.unset("uri");
    } else {
      this.set("uri", Value.fromString(<string>value));
    }
  }

  get uriData(): Bytes | null {
    let value = this.get("uriData");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set uriData(value: Bytes | null) {
    if (!value) {
      this.unset("uriData");
    } else {
      this.set("uriData", Value.fromBytes(<Bytes>value));
    }
  }

  get roles(): Array<string> {
    let value = this.get("roles");
    return value!.toStringArray();
  }

  set roles(value: Array<string>) {
    this.set("roles", Value.fromStringArray(value));
  }

  get nominations(): Array<string> {
    let value = this.get("nominations");
    return value!.toStringArray();
  }

  set nominations(value: Array<string>) {
    this.set("nominations", Value.fromStringArray(value));
  }

  get posts(): Array<string> {
    let value = this.get("posts");
    return value!.toStringArray();
  }

  set posts(value: Array<string>) {
    this.set("posts", Value.fromStringArray(value));
  }

  get participants(): Array<string> {
    let value = this.get("participants");
    return value!.toStringArray();
  }

  set participants(value: Array<string>) {
    this.set("participants", Value.fromStringArray(value));
  }

  get assoc(): Array<string> {
    let value = this.get("assoc");
    return value!.toStringArray();
  }

  set assoc(value: Array<string>) {
    this.set("assoc", Value.fromStringArray(value));
  }
}

export class GameRole extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("game", Value.fromString(""));
    this.set("roleId", Value.fromBigInt(BigInt.zero()));
    this.set("name", Value.fromString(""));
    this.set("souls", Value.fromStringArray(new Array(0)));
    this.set("soulsCount", Value.fromI32(0));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save GameRole entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save GameRole entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("GameRole", id.toString(), this);
    }
  }

  static load(id: string): GameRole | null {
    return changetype<GameRole | null>(store.get("GameRole", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get game(): string {
    let value = this.get("game");
    return value!.toString();
  }

  set game(value: string) {
    this.set("game", Value.fromString(value));
  }

  get roleId(): BigInt {
    let value = this.get("roleId");
    return value!.toBigInt();
  }

  set roleId(value: BigInt) {
    this.set("roleId", Value.fromBigInt(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get souls(): Array<string> {
    let value = this.get("souls");
    return value!.toStringArray();
  }

  set souls(value: Array<string>) {
    this.set("souls", Value.fromStringArray(value));
  }

  get soulsCount(): i32 {
    let value = this.get("soulsCount");
    return value!.toI32();
  }

  set soulsCount(value: i32) {
    this.set("soulsCount", Value.fromI32(value));
  }
}

export class GameNomination extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("game", Value.fromString(""));
    this.set("createdDate", Value.fromBigInt(BigInt.zero()));
    this.set("nominator", Value.fromString(""));
    this.set("nominated", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save GameNomination entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save GameNomination entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("GameNomination", id.toString(), this);
    }
  }

  static load(id: string): GameNomination | null {
    return changetype<GameNomination | null>(store.get("GameNomination", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get game(): string {
    let value = this.get("game");
    return value!.toString();
  }

  set game(value: string) {
    this.set("game", Value.fromString(value));
  }

  get createdDate(): BigInt {
    let value = this.get("createdDate");
    return value!.toBigInt();
  }

  set createdDate(value: BigInt) {
    this.set("createdDate", Value.fromBigInt(value));
  }

  get nominator(): string {
    let value = this.get("nominator");
    return value!.toString();
  }

  set nominator(value: string) {
    this.set("nominator", Value.fromString(value));
  }

  get nominated(): string {
    let value = this.get("nominated");
    return value!.toString();
  }

  set nominated(value: string) {
    this.set("nominated", Value.fromString(value));
  }
}

export class GamePost extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("entity", Value.fromString(""));
    this.set("author", Value.fromString(""));
    this.set("entityRole", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save GamePost entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save GamePost entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("GamePost", id.toString(), this);
    }
  }

  static load(id: string): GamePost | null {
    return changetype<GamePost | null>(store.get("GamePost", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get entity(): string {
    let value = this.get("entity");
    return value!.toString();
  }

  set entity(value: string) {
    this.set("entity", Value.fromString(value));
  }

  get createdDate(): BigInt | null {
    let value = this.get("createdDate");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set createdDate(value: BigInt | null) {
    if (!value) {
      this.unset("createdDate");
    } else {
      this.set("createdDate", Value.fromBigInt(<BigInt>value));
    }
  }

  get author(): string {
    let value = this.get("author");
    return value!.toString();
  }

  set author(value: string) {
    this.set("author", Value.fromString(value));
  }

  get entityRole(): string {
    let value = this.get("entityRole");
    return value!.toString();
  }

  set entityRole(value: string) {
    this.set("entityRole", Value.fromString(value));
  }

  get uri(): string | null {
    let value = this.get("uri");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set uri(value: string | null) {
    if (!value) {
      this.unset("uri");
    } else {
      this.set("uri", Value.fromString(<string>value));
    }
  }

  get metadata(): Bytes | null {
    let value = this.get("metadata");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set metadata(value: Bytes | null) {
    if (!value) {
      this.unset("metadata");
    } else {
      this.set("metadata", Value.fromBytes(<Bytes>value));
    }
  }
}

export class Claim extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("name", Value.fromString(""));
    this.set("type", Value.fromString(""));
    this.set("stage", Value.fromI32(0));
    this.set("createdDate", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Claim entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Claim entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Claim", id.toString(), this);
    }
  }

  static load(id: string): Claim | null {
    return changetype<Claim | null>(store.get("Claim", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get hub(): string | null {
    let value = this.get("hub");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set hub(value: string | null) {
    if (!value) {
      this.unset("hub");
    } else {
      this.set("hub", Value.fromString(<string>value));
    }
  }

  get game(): string | null {
    let value = this.get("game");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set game(value: string | null) {
    if (!value) {
      this.unset("game");
    } else {
      this.set("game", Value.fromString(<string>value));
    }
  }

  get type(): string {
    let value = this.get("type");
    return value!.toString();
  }

  set type(value: string) {
    this.set("type", Value.fromString(value));
  }

  get stage(): i32 {
    let value = this.get("stage");
    return value!.toI32();
  }

  set stage(value: i32) {
    this.set("stage", Value.fromI32(value));
  }

  get uri(): string | null {
    let value = this.get("uri");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set uri(value: string | null) {
    if (!value) {
      this.unset("uri");
    } else {
      this.set("uri", Value.fromString(<string>value));
    }
  }

  get uriData(): Bytes | null {
    let value = this.get("uriData");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set uriData(value: Bytes | null) {
    if (!value) {
      this.unset("uriData");
    } else {
      this.set("uriData", Value.fromBytes(<Bytes>value));
    }
  }

  get createdDate(): BigInt {
    let value = this.get("createdDate");
    return value!.toBigInt();
  }

  set createdDate(value: BigInt) {
    this.set("createdDate", Value.fromBigInt(value));
  }

  get updatedDate(): BigInt | null {
    let value = this.get("updatedDate");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set updatedDate(value: BigInt | null) {
    if (!value) {
      this.unset("updatedDate");
    } else {
      this.set("updatedDate", Value.fromBigInt(<BigInt>value));
    }
  }

  get roles(): Array<string> {
    let value = this.get("roles");
    return value!.toStringArray();
  }

  set roles(value: Array<string>) {
    this.set("roles", Value.fromStringArray(value));
  }

  get nominations(): Array<string> {
    let value = this.get("nominations");
    return value!.toStringArray();
  }

  set nominations(value: Array<string>) {
    this.set("nominations", Value.fromStringArray(value));
  }

  get posts(): Array<string> {
    let value = this.get("posts");
    return value!.toStringArray();
  }

  set posts(value: Array<string>) {
    this.set("posts", Value.fromStringArray(value));
  }

  get participants(): Array<string> {
    let value = this.get("participants");
    return value!.toStringArray();
  }

  set participants(value: Array<string>) {
    this.set("participants", Value.fromStringArray(value));
  }

  get assoc(): Array<string> {
    let value = this.get("assoc");
    return value!.toStringArray();
  }

  set assoc(value: Array<string>) {
    this.set("assoc", Value.fromStringArray(value));
  }
}

export class ClaimRole extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("claim", Value.fromString(""));
    this.set("name", Value.fromString(""));
    this.set("roleId", Value.fromBigInt(BigInt.zero()));
    this.set("souls", Value.fromStringArray(new Array(0)));
    this.set("soulsCount", Value.fromI32(0));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ClaimRole entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save ClaimRole entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("ClaimRole", id.toString(), this);
    }
  }

  static load(id: string): ClaimRole | null {
    return changetype<ClaimRole | null>(store.get("ClaimRole", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get claim(): string {
    let value = this.get("claim");
    return value!.toString();
  }

  set claim(value: string) {
    this.set("claim", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get roleId(): BigInt {
    let value = this.get("roleId");
    return value!.toBigInt();
  }

  set roleId(value: BigInt) {
    this.set("roleId", Value.fromBigInt(value));
  }

  get souls(): Array<string> {
    let value = this.get("souls");
    return value!.toStringArray();
  }

  set souls(value: Array<string>) {
    this.set("souls", Value.fromStringArray(value));
  }

  get soulsCount(): i32 {
    let value = this.get("soulsCount");
    return value!.toI32();
  }

  set soulsCount(value: i32) {
    this.set("soulsCount", Value.fromI32(value));
  }
}

export class ClaimNomination extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("claim", Value.fromString(""));
    this.set("createdDate", Value.fromBigInt(BigInt.zero()));
    this.set("nominator", Value.fromString(""));
    this.set("nominated", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ClaimNomination entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save ClaimNomination entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("ClaimNomination", id.toString(), this);
    }
  }

  static load(id: string): ClaimNomination | null {
    return changetype<ClaimNomination | null>(store.get("ClaimNomination", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get claim(): string {
    let value = this.get("claim");
    return value!.toString();
  }

  set claim(value: string) {
    this.set("claim", Value.fromString(value));
  }

  get createdDate(): BigInt {
    let value = this.get("createdDate");
    return value!.toBigInt();
  }

  set createdDate(value: BigInt) {
    this.set("createdDate", Value.fromBigInt(value));
  }

  get nominator(): string {
    let value = this.get("nominator");
    return value!.toString();
  }

  set nominator(value: string) {
    this.set("nominator", Value.fromString(value));
  }

  get nominated(): string {
    let value = this.get("nominated");
    return value!.toString();
  }

  set nominated(value: string) {
    this.set("nominated", Value.fromString(value));
  }
}

export class ClaimPost extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("entity", Value.fromString(""));
    this.set("author", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ClaimPost entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save ClaimPost entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("ClaimPost", id.toString(), this);
    }
  }

  static load(id: string): ClaimPost | null {
    return changetype<ClaimPost | null>(store.get("ClaimPost", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get entity(): string {
    let value = this.get("entity");
    return value!.toString();
  }

  set entity(value: string) {
    this.set("entity", Value.fromString(value));
  }

  get createdDate(): BigInt | null {
    let value = this.get("createdDate");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set createdDate(value: BigInt | null) {
    if (!value) {
      this.unset("createdDate");
    } else {
      this.set("createdDate", Value.fromBigInt(<BigInt>value));
    }
  }

  get author(): string {
    let value = this.get("author");
    return value!.toString();
  }

  set author(value: string) {
    this.set("author", Value.fromString(value));
  }

  get entityRole(): string | null {
    let value = this.get("entityRole");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set entityRole(value: string | null) {
    if (!value) {
      this.unset("entityRole");
    } else {
      this.set("entityRole", Value.fromString(<string>value));
    }
  }

  get uri(): string | null {
    let value = this.get("uri");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set uri(value: string | null) {
    if (!value) {
      this.unset("uri");
    } else {
      this.set("uri", Value.fromString(<string>value));
    }
  }

  get metadata(): Bytes | null {
    let value = this.get("metadata");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set metadata(value: Bytes | null) {
    if (!value) {
      this.unset("metadata");
    } else {
      this.set("metadata", Value.fromBytes(<Bytes>value));
    }
  }
}

export class GameParticipant extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("entity", Value.fromString(""));
    this.set("sbt", Value.fromString(""));
    this.set("roles", Value.fromBigIntArray(new Array(0)));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save GameParticipant entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save GameParticipant entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("GameParticipant", id.toString(), this);
    }
  }

  static load(id: string): GameParticipant | null {
    return changetype<GameParticipant | null>(store.get("GameParticipant", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get entity(): string {
    let value = this.get("entity");
    return value!.toString();
  }

  set entity(value: string) {
    this.set("entity", Value.fromString(value));
  }

  get sbt(): string {
    let value = this.get("sbt");
    return value!.toString();
  }

  set sbt(value: string) {
    this.set("sbt", Value.fromString(value));
  }

  get roles(): Array<BigInt> {
    let value = this.get("roles");
    return value!.toBigIntArray();
  }

  set roles(value: Array<BigInt>) {
    this.set("roles", Value.fromBigIntArray(value));
  }
}

export class ProcParticipant extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("entity", Value.fromString(""));
    this.set("sbt", Value.fromString(""));
    this.set("roles", Value.fromBigIntArray(new Array(0)));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ProcParticipant entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save ProcParticipant entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("ProcParticipant", id.toString(), this);
    }
  }

  static load(id: string): ProcParticipant | null {
    return changetype<ProcParticipant | null>(store.get("ProcParticipant", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get entity(): string {
    let value = this.get("entity");
    return value!.toString();
  }

  set entity(value: string) {
    this.set("entity", Value.fromString(value));
  }

  get sbt(): string {
    let value = this.get("sbt");
    return value!.toString();
  }

  set sbt(value: string) {
    this.set("sbt", Value.fromString(value));
  }

  get roles(): Array<BigInt> {
    let value = this.get("roles");
    return value!.toBigIntArray();
  }

  set roles(value: Array<BigInt>) {
    this.set("roles", Value.fromBigIntArray(value));
  }
}

export class GameAssoc extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("bEnt", Value.fromString(""));
    this.set("sbt", Value.fromString(""));
    this.set("role", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save GameAssoc entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save GameAssoc entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("GameAssoc", id.toString(), this);
    }
  }

  static load(id: string): GameAssoc | null {
    return changetype<GameAssoc | null>(store.get("GameAssoc", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get bEnt(): string {
    let value = this.get("bEnt");
    return value!.toString();
  }

  set bEnt(value: string) {
    this.set("bEnt", Value.fromString(value));
  }

  get sbt(): string {
    let value = this.get("sbt");
    return value!.toString();
  }

  set sbt(value: string) {
    this.set("sbt", Value.fromString(value));
  }

  get role(): BigInt {
    let value = this.get("role");
    return value!.toBigInt();
  }

  set role(value: BigInt) {
    this.set("role", Value.fromBigInt(value));
  }
}

export class ProcAssoc extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("bEnt", Value.fromString(""));
    this.set("sbt", Value.fromString(""));
    this.set("role", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ProcAssoc entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save ProcAssoc entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("ProcAssoc", id.toString(), this);
    }
  }

  static load(id: string): ProcAssoc | null {
    return changetype<ProcAssoc | null>(store.get("ProcAssoc", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get bEnt(): string {
    let value = this.get("bEnt");
    return value!.toString();
  }

  set bEnt(value: string) {
    this.set("bEnt", Value.fromString(value));
  }

  get sbt(): string {
    let value = this.get("sbt");
    return value!.toString();
  }

  set sbt(value: string) {
    this.set("sbt", Value.fromString(value));
  }

  get role(): BigInt {
    let value = this.get("role");
    return value!.toBigInt();
  }

  set role(value: BigInt) {
    this.set("role", Value.fromBigInt(value));
  }
}
