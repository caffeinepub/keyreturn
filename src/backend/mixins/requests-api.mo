import Map "mo:core/Map";
import CommonTypes "../types/common";
import KeyTypes "../types/keys";
import RequestTypes "../types/requests";
import RequestsLib "../lib/requests";

mixin (
  requests : Map.Map<CommonTypes.RequestId, RequestTypes.ReturnRequest>,
  keys : Map.Map<CommonTypes.KeyId, KeyTypes.Key>,
  nextRequestId : { var value : Nat },
) {
  /// Submit a return request for a found key — public, no auth required.
  public func submitReturnRequest(
    keyId : CommonTypes.KeyId,
    finderName : Text,
    finderContact : Text,
  ) : async ?CommonTypes.RequestId {
    let id = nextRequestId.value;
    let result = RequestsLib.submitRequest(requests, keys, id, keyId, finderName, finderContact);
    switch (result) {
      case null { null };
      case (?reqId) {
        nextRequestId.value += 1;
        ?reqId;
      };
    };
  };

  /// List all return requests for a key. Caller must be the key owner.
  public shared ({ caller }) func listReturnRequests(keyId : CommonTypes.KeyId) : async [RequestTypes.ReturnRequest] {
    RequestsLib.listRequestsForKey(requests, keys, caller, keyId);
  };

  /// Dismiss/archive a return request. Caller must be the key owner.
  public shared ({ caller }) func dismissReturnRequest(requestId : CommonTypes.RequestId) : async Bool {
    RequestsLib.dismissRequest(requests, keys, caller, requestId);
  };

  /// Get the count of active (non-dismissed) return requests for a key. Caller must be the key owner.
  public shared ({ caller }) func getReturnRequestCount(keyId : CommonTypes.KeyId) : async Nat {
    RequestsLib.countRequestsForKey(requests, keyId);
  };
};
