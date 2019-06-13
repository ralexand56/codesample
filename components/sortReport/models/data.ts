interface BucketList {
  productname: string;
  bucket: Bucket[];
  bucketavg: {};
}

export interface Bucket {
  id?: number;
  InstName?: string;
  Rate?: number;
  APY?: number;
  Chg?: string;
  Ref: boolean;
}

interface PromoList {
  left: Left[];
  right?: Right[];
}

// I need to add ID for each row for Key attribute as react needs a unique identifier to render that row.
interface Left {
  InstName?: string;
  Ad?: string;
  MinTerm?: number;
  MinAmount?: string;
  Rate?: number;
  APY?: number;
}

// I need to add ID for each row for Key attribute as react needs a unique identifier to render that row.
interface Right {
  InstName?: string;
  Ad?: string;
  MinTerm?: number;
  MinAmount?: string;
  Rate?: number;
  APY?: number;
}

export default interface Data {
  bucketlist: BucketList[];
  promolist: PromoList[];
}
