import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import CommonTypes "../types/common";
import KeyTypes "../types/keys";

module {
  public type KeyId = CommonTypes.KeyId;
  public type Key = KeyTypes.Key;
  public type KeyStatus = KeyTypes.KeyStatus;

  public func createKey(
    keys : Map.Map<KeyId, Key>,
    nextId : Nat,
    owner : Principal,
    tag : Text,
    description : ?Text,
  ) : (KeyId, Key) {
    let id = nextId;
    let now = Time.now();
    let key : Key = {
      id;
      owner;
      tag;
      description;
      status = #active;
      createdAt = now;
      updatedAt = now;
    };
    keys.add(id, key);
    (id, key);
  };

  public func listOwnerKeys(
    keys : Map.Map<KeyId, Key>,
    owner : Principal,
  ) : [Key] {
    let results = List.empty<Key>();
    for ((_, key) in keys.entries()) {
      if (key.owner == owner) {
        results.add(key);
      };
    };
    results.toArray();
  };

  public func getKey(
    keys : Map.Map<KeyId, Key>,
    keyId : KeyId,
  ) : ?Key {
    keys.get(keyId);
  };

  public func markReturned(
    keys : Map.Map<KeyId, Key>,
    owner : Principal,
    keyId : KeyId,
  ) : Bool {
    switch (keys.get(keyId)) {
      case null { false };
      case (?key) {
        if (key.owner != owner) { return false };
        let updated : Key = { key with status = #returned; updatedAt = Time.now() };
        keys.add(keyId, updated);
        true;
      };
    };
  };

  public func deleteKey(
    keys : Map.Map<KeyId, Key>,
    owner : Principal,
    keyId : KeyId,
  ) : Bool {
    switch (keys.get(keyId)) {
      case null { false };
      case (?key) {
        if (key.owner != owner) { return false };
        keys.remove(keyId);
        true;
      };
    };
  };
};
