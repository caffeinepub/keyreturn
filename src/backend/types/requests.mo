import Common "common";

module {
  public type ReturnRequest = {
    id : Common.RequestId;
    keyId : Common.KeyId;
    finderName : Text;
    finderContact : Text;
    createdAt : Common.Timestamp;
    dismissed : Bool;
  };
};
