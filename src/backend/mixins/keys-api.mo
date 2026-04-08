import Map "mo:core/Map";
import CommonTypes "../types/common";
import KeyTypes "../types/keys";
import KeysLib "../lib/keys";

mixin (
  keys : Map.Map<CommonTypes.KeyId, KeyTypes.Key>,
  nextKeyId : { var value : Nat },
) {
  /// Create a new key tag for the caller. Returns the new key ID.
  public shared ({ caller }) func createKey(tag : Text, description : ?Text) : async CommonTypes.KeyId {
    let id = nextKeyId.value;
    nextKeyId.value += 1;
    let (keyId, _) = KeysLib.createKey(keys, id, caller, tag, description);
    keyId;
  };

  /// List all keys belonging to the caller.
  public shared query ({ caller }) func listKeys() : async [KeyTypes.Key] {
    KeysLib.listOwnerKeys(keys, caller);
  };

  /// Get key details by ID — public, no auth required (for finder page).
  public query func getKey(keyId : CommonTypes.KeyId) : async ?KeyTypes.Key {
    KeysLib.getKey(keys, keyId);
  };

  /// Mark a key as returned. Caller must be the owner.
  public shared ({ caller }) func markKeyReturned(keyId : CommonTypes.KeyId) : async Bool {
    KeysLib.markReturned(keys, caller, keyId);
  };

  /// Delete a key. Caller must be the owner.
  public shared ({ caller }) func deleteKey(keyId : CommonTypes.KeyId) : async Bool {
    KeysLib.deleteKey(keys, caller, keyId);
  };
};
