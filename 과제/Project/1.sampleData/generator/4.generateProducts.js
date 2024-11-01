import { TypeGenerator } from "./2.generateStores.js";
import { UUIDGenerator } from "../utils.js";
import { MyUtility } from "../utils.js";

class MenuGenerator {
  constructor() {
    this.type;
  }

  generateMenu() {
    let coffee = [
      "Americano Coffee",
      "Latte Coffee",
      "Cappuccino Coffee",
      "Espresso Coffee",
      "Mocha Coffee",
    ];

    let juice = [
      "Watermelon Juice",
      "Orange Juice",
      "Apple Juice",
      "Pineapple Juice",
      "Grape Juice",
    ];

    let cake = [
      "Strawberry Cake",
      "Chocolate Cake",
      "Cheese Cake",
      "Red Velvet Cake",
      "Lemon Cake",
    ];

    let menu = [coffee, juice, cake];

    let num1 = MyUtility.getRandomNumber(3); // 타입
    let num2 = MyUtility.getRandomNumber(menu[num1].length); // 메뉴명

    if (num1 == 0) {
      this.type = `Coffee`;
    } else if (num1 == 1) {
      this.type = `Juice`;
    } else {
      this.type = `Cake`;
    }

    return `${menu[num1][num2]}`;
  }
}

export class ItemGenerator {
  constructor() {
    this.nameGen = new MenuGenerator();
    this.typeGen = new TypeGenerator(this.nameGen);
  }

  generateData(count) {
    let data = [];

    for (let i = 0; i < count; i++) {
      this.uuid = UUIDGenerator.generateUUID();
      let name = this.nameGen.generateMenu();
      let type = this.typeGen.generateType();
      let price = MyUtility.getRandomInRange(30, 80) * 100;

      data.push([this.uuid, name, type, price]);
    }

    return data;
  }
}
