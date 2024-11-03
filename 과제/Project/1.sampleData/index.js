// 메인 실행 파일
import { UserGenerator } from "./generator/1.generateUsers.js";
import { StoreGenerator } from "./generator/2.generateStores.js";
import { OrderGenerator } from "./generator/3.generateOrders.js";
import { ItemGenerator } from "./generator/4.generateProducts.js";
import { OrderItemGenerator } from "./generator/5.generateOrderItems.js";
import { DataPrinter } from "./utils.js";

//----------------generate users--------------------
const userGenerator = new UserGenerator();
const users = userGenerator.generateData(10); // 1000

const dataPrinter = new DataPrinter(users);
dataPrinter.writeUserToCSV("results/user.csv");

//----------------generate stores--------------------

const storeGenerator = new StoreGenerator();
const stores = storeGenerator.generateData(10); // 100

const dataPrinter2 = new DataPrinter(stores);
dataPrinter2.writeStoreToCSV("results/store.csv");

//----------------generate order--------------------
const order = new OrderGenerator();
const dataPrinter3 = new DataPrinter(order.generateData(10)); // 100000

dataPrinter3.writeOrderToCSV("results/order.csv");

// //----------------generate item--------------------

// const item = new ItemGenerator();
// const dataPrinter4 = new DataPrinter(item.generateData(20)); // 20

// dataPrinter4.writeItemToCSV("results/item.csv");

// //----------------generate orderItem--------------------

// const orderItem = new OrderItemGenerator();
// const dataPrinter5 = new DataPrinter(orderItem.generateData(10)); // 50000

// dataPrinter5.writeOrderItemToCSV("results/orderitem.csv");
