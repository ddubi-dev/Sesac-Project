import fs from "fs";
import Papa from "papaparse";
import { MyUtility } from "../utils.js";
import { UUIDGenerator } from "../utils.js";
import { BirthGenerator } from "../generator/1.generateUsers.js";

class TimeStampGenerator {
  constructor(year1, month1, year2, month2) {
    // 기간 설정
    this.year1 = year1;
    this.year2 = year2;
    this.month1 = month1;
    this.month2 = month2;
  }

  generateDate() {
    let year = MyUtility.getRandomInRange(this.year1, this.year2);
    let month = MyUtility.toTwoDigits(
      MyUtility.getRandomInRange(this.month1, this.month2)
    );
    let date = MyUtility.toTwoDigits(BirthGenerator.getRandomDate(month));

    return `${year}-${month}-${date}`;
  }

  generateTime() {
    let hour = MyUtility.toTwoDigits(MyUtility.getRandomNumber(24));
    let min = MyUtility.toTwoDigits(MyUtility.getRandomNumber(60));
    let second = MyUtility.toTwoDigits(MyUtility.getRandomNumber(60));

    return `${hour}:${min}:${second}`;
  }

  generateTimeStamp() {
    return `${this.generateDate()} ${this.generateTime()}`;
  }
}

export class SelectID {
  constructor(file) {
    this.file = fs.readFileSync(file, "utf-8");
  }

  selectID() {
    let columnData;

    Papa.parse(this.file, {
      header: true,
      complete: (result) => {
        const columnName = "Id";
        columnData = result.data.map((row) => row[columnName]);
      },
    });

    return `${columnData[MyUtility.getRandomNumber(columnData.length)]}`;
  }
}

export class OrderGenerator {
  constructor() {
    this.orderAtGen = new TimeStampGenerator(2024, 9, 2024, 10);
    this.storeIdGen = new SelectID("results/store.csv");
    this.userIdGen = new SelectID("results/user.csv");
  }

  generateData(count) {
    let data = [];
    for (let i = 0; i < count; i++) {
      this.uuid = UUIDGenerator.generateUUID();
      let orderAt = this.orderAtGen.generateTimeStamp();
      let storeId = this.storeIdGen.selectID();
      let userId = this.userIdGen.selectID();

      data.push([this.uuid, orderAt, storeId, userId]);
    }
    return data;
  }
}
