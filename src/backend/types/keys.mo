import Common "common";

module {
  public type KeyStatus = { #active; #returned };

  public type Key = {
    id : Common.KeyId;
    owner : Principal;
    tag : Text;
    description : ?Text;
    status : KeyStatus;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };
};
