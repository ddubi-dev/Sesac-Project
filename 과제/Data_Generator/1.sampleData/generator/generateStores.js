import { MyUtility, UUIDGenerator } from "../utils.js";
import { AddressGenerator } from "./generateUsers.js";

class StoreNameGenerator {
  constructor() {
    this.type = "";
  }
  generateName() {
    let cafes = ["스타벅스", "이디야", "커피빈", "던킨도너츠", "카페베네", "투썸플레이스", "할리스커피", "폴바셋", "블루보틀"];
    let places = ["홍대", "송파", "강서", "잠실", "강남", "이태원", "명동", "건대", "신촌", "여의도", "광화문", "압구정", "성수", "천호"];

    this.type = cafes[MyUtility.getRandomNumber(cafes.length)];

    let storeName = `${this.type} ${places[MyUtility.getRandomNumber(places.length)]}${MyUtility.getRandomInRange(1, 10)}호점`;

    return storeName;
  }
}

export class TypeGenerator {
  constructor(data) {
    this.data = data;
  }
  generateType() {
    return `${this.data.type}`;
  }
}

export class StoreGenerator {
  constructor() {
    this.nameGen = new StoreNameGenerator();
    this.typeGen = new TypeGenerator(this.nameGen);
    this.addressGen = new AddressGenerator();
  }

  generateData(count) {
    const data = [];
    for (let i = 0; i < count; i++) {
      this.uuid = UUIDGenerator.generateUUID();
      const name = this.nameGen.generateName();
      const type = this.typeGen.generateType();
      const address = this.addressGen.generateAddress();

      data.push([this.uuid, name, type, address]);
    }
    return data;
  }
}
