import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import CommonTypes "../types/common";
import KeyTypes "../types/keys";
import RequestTypes "../types/requests";

module {
  public type KeyId = CommonTypes.KeyId;
  public type RequestId = CommonTypes.RequestId;
  public type ReturnRequest = RequestTypes.ReturnRequest;
  public type Key = KeyTypes.Key;

  public func submitRequest(
    requests : Map.Map<RequestId, ReturnRequest>,
    keys : Map.Map<KeyId, Key>,
    nextId : Nat,
    keyId : KeyId,
    finderName : Text,
    finderContact : Text,
  ) : ?RequestId {
    // Key must exist to accept a return request
    switch (keys.get(keyId)) {
      case null { null };
      case (?_key) {
        let id = nextId;
        let req : ReturnRequest = {
          id;
          keyId;
          finderName;
          finderContact;
          createdAt = Time.now();
          dismissed = false;
        };
        requests.add(id, req);
        ?id;
      };
    };
  };

  public func listRequestsForKey(
    requests : Map.Map<RequestId, ReturnRequest>,
    keys : Map.Map<KeyId, Key>,
    owner : Principal,
    keyId : KeyId,
  ) : [ReturnRequest] {
    // Verify key exists and caller is owner
    switch (keys.get(keyId)) {
      case null { [] };
      case (?key) {
        if (key.owner != owner) { return [] };
        let results = List.empty<ReturnRequest>();
        for ((_, req) in requests.entries()) {
          if (req.keyId == keyId) {
            results.add(req);
          };
        };
        results.toArray();
      };
    };
  };

  public func dismissRequest(
    requests : Map.Map<RequestId, ReturnRequest>,
    keys : Map.Map<KeyId, Key>,
    owner : Principal,
    requestId : RequestId,
  ) : Bool {
    switch (requests.get(requestId)) {
      case null { false };
      case (?req) {
        // Verify that the caller owns the key this request belongs to
        switch (keys.get(req.keyId)) {
          case null { false };
          case (?key) {
            if (key.owner != owner) { return false };
            let updated : ReturnRequest = { req with dismissed = true };
            requests.add(requestId, updated);
            true;
          };
        };
      };
    };
  };

  public func countRequestsForKey(
    requests : Map.Map<RequestId, ReturnRequest>,
    keyId : KeyId,
  ) : Nat {
    var count = 0;
    for ((_, req) in requests.entries()) {
      if (req.keyId == keyId and not req.dismissed) {
        count += 1;
      };
    };
    count;
  };
};
