import { UserGenerator } from "./generator/generateUsers.js";
import { StoreGenerator } from "./generator/generateStores.js";
import { OrderGenerator } from "./generator/generateOrders.js";
import { ItemGenerator } from "./generator/generateProducts.js";
import { OrderItemGenerator } from "./generator/generateOrderItems.js";
import { DataPrinter } from "./utils.js";

//generate user
const userGenerator = new UserGenerator();
const users = userGenerator.generateData(1000);

const dataPrinter = new DataPrinter(users);
dataPrinter.writeUserToCSV("results/user.csv");

//generate store
const storeGenerator = new StoreGenerator();
const stores = storeGenerator.generateData(100);

const dataPrinter2 = new DataPrinter(stores);
dataPrinter2.writeStoreToCSV("results/store.csv");

//generate order
const order = new OrderGenerator();
const dataPrinter3 = new DataPrinter(order.generateData(10000));

dataPrinter3.writeOrderToCSV("results/order.csv");

//generate item
const item = new ItemGenerator();
const dataPrinter4 = new DataPrinter(item.generateData(20));

dataPrinter4.writeItemToCSV("results/item.csv");

//generate orderItem
const orderItem = new OrderItemGenerator();
const dataPrinter5 = new DataPrinter(orderItem.generateData(50000));

dataPrinter5.writeOrderItemToCSV("results/orderitem.csv");
