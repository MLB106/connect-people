// src/types/ip-cidr.d.ts
declare module 'ip-cidr' {
  export default class IPCIDR {
    constructor(cidr: string);
    contains(ip: string): boolean;
    // tu peux ajouter d'autres signatures si tu t’en sers :
    toArray(): string[];
    toString(): string;
  }
}