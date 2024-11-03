// 유틸리티 함수
import fs from "fs";

export class MyUtility {
  static getRandomNumber(arg) {
    return Math.floor(Math.random() * arg);
  }

  static getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static toTwoDigits(num) {
    return `${num}`.length == 1 ? `0${num}` : num;
  }
}

export class UUIDGenerator {
  static generateHex(num) {
    let hex = "";
    for (let i = 0; i < num; i++) {
      hex += MyUtility.getRandomInRange(0, 15).toString(16);
    }
    return hex;
  }

  static generateUUID() {
    let fourth = ["8", "9", "a", "b"]; // 4th
    return `${UUIDGenerator.generateHex(8)}-${UUIDGenerator.generateHex(
      4
    )}-4${UUIDGenerator.generateHex(3)}-${
      fourth[MyUtility.getRandomInRange(0, 3)]
    }${UUIDGenerator.generateHex(3)}-${UUIDGenerator.generateHex(12)}`;
  }
}

export class DataPrinter {
  constructor(data) {
    // 의존성 삽입
    this.data = data;
  }

  printConsole() {
    for (const [uuid, name, gender, age, birthDate, address] of this.data) {
      console.log(`${uuid} ${name} ${gender} ${age} ${birthDate} ${address}`);
    }
  }

  printHTML() {}

  writeUserToCSV(filePath) {
    const header = ["Id", "Name", "Gender", "Age", "Birthdate", "Address"];
    const rows = this.data.map((row) => row.join(",")); // ,으로 join 된 str을 반환
    const csvContent = [header, ...rows].join("\n");

    fs.writeFileSync(filePath, csvContent, "utf-8");
  }

  writeStoreToCSV(filePath) {
    const header = ["Id", "Name", "Type", "Address"];
    const rows = this.data.map((row) => row.join(","));
    const csvContent = [header, ...rows].join("\n");

    fs.writeFileSync(filePath, csvContent, "utf-8");
  }

  writeOrderToCSV(filePath) {
    const header = ["Id", "OrderAt", "StoreId", "UserId"];
    const rows = this.data.map((row) => row.join(","));
    const csvContent = [header, ...rows].join("\n");

    fs.writeFileSync(filePath, csvContent, "utf-8");
  }

  writeItemToCSV(filePath) {
    const header = ["Id", "Name", "Type", "UnitPrice"];
    const rows = this.data.map((row) => row.join(","));
    const csvContent = [header, ...rows].join("\n");

    fs.writeFileSync(filePath, csvContent, "utf-8");
  }

  writeOrderItemToCSV(filePath) {
    const header = ["Id", "OrderId", "ItemId"];
    const rows = this.data.map((row) => row.join(","));
    const csvContent = [header, ...rows].join("\n");

    fs.writeFileSync(filePath, csvContent, "utf-8");
  }
}
