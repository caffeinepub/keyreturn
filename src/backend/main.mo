import Map "mo:core/Map";
import CommonTypes "types/common";
import KeyTypes "types/keys";
import RequestTypes "types/requests";
import KeysApi "mixins/keys-api";
import RequestsApi "mixins/requests-api";

actor {
  let keys = Map.empty<CommonTypes.KeyId, KeyTypes.Key>();
  let requests = Map.empty<CommonTypes.RequestId, RequestTypes.ReturnRequest>();

  let nextKeyId = { var value : Nat = 0 };
  let nextRequestId = { var value : Nat = 0 };

  include KeysApi(keys, nextKeyId);
  include RequestsApi(requests, keys, nextRequestId);
};
