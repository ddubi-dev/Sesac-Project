import { SelectID } from "./3.generateOrders.js";
import { UUIDGenerator } from "../utils.js";

export class OrderItemGenerator {
  constructor() {
    this.orderIdGen = new SelectID("results/order.csv");
    this.itemIdGen = new SelectID("results/item.csv");
  }

  generateData(count) {
    let data = [];
    for (let i = 0; i < count; i++) {
      this.uuid = UUIDGenerator.generateUUID();
      let orderId = this.orderIdGen.selectID("Id");
      let itemId = this.itemIdGen.selectID("Id");

      data.push([this.uuid, orderId, itemId]);
    }
    return data;
  }
}
