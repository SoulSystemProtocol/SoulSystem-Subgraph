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
        `Entities of type Account must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
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
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Soul entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Soul must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
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

  get uriImage(): string | null {
    let value = this.get("uriImage");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set uriImage(value: string | null) {
    if (!value) {
      this.unset("uriImage");
    } else {
      this.set("uriImage", Value.fromString(<string>value));
    }
  }

  get uriFirstName(): string | null {
    let value = this.get("uriFirstName");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set uriFirstName(value: string | null) {
    if (!value) {
      this.unset("uriFirstName");
    } else {
      this.set("uriFirstName", Value.fromString(<string>value));
    }
  }

  get uriLastName(): string | null {
    let value = this.get("uriLastName");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set uriLastName(value: string | null) {
    if (!value) {
      this.unset("uriLastName");
    } else {
      this.set("uriLastName", Value.fromString(<string>value));
    }
  }
}

export class Game extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("hub", Value.fromString(""));
    this.set("name", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Game entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Game must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
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

  get type(): string | null {
    let value = this.get("type");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set type(value: string | null) {
    if (!value) {
      this.unset("type");
    } else {
      this.set("type", Value.fromString(<string>value));
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
}

export class GameRole extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("game", Value.fromString(""));
    this.set("roleId", Value.fromBigInt(BigInt.zero()));
    this.set("souls", Value.fromStringArray(new Array(0)));
    this.set("soulsCount", Value.fromI32(0));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save GameRole entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type GameRole must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
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
        `Entities of type GameNomination must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
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

export class Claim extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("name", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Claim entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Claim must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
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

  get type(): string | null {
    let value = this.get("type");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set type(value: string | null) {
    if (!value) {
      this.unset("type");
    } else {
      this.set("type", Value.fromString(<string>value));
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
}

export class ClaimRole extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("claim", Value.fromString(""));
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
        `Entities of type ClaimRole must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
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
        `Entities of type ClaimNomination must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
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
