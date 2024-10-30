const fs = require("fs");
const Papa = require("papaparse");

// class 별 파일 분리
class MyUtility {
  static randomNumber(arg) {
    return Math.floor(Math.random() * arg);
  }

  static getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

class DataPrinter {
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

class UUIDGenerator {
  generateHex(num) {
    let hex = "";
    for (let i = 0; i < num; i++) {
      hex += MyUtility.getRandomInRange(0, 15).toString(16);
    }
    return hex;
  }

  generateUUID() {
    let fourth = ["8", "9", "a", "b"];
    return `${this.generateHex(8)}-${this.generateHex(4)}-4${this.generateHex(
      3
    )}-${fourth[MyUtility.getRandomInRange(0, 3)]}${this.generateHex(
      3
    )}-${this.generateHex(12)}`;
  }
}

class NameGenerator {
  constructor() {
    // name.txt 파일로부터 이름을 가지고 오도록.
    this.firstNames = [
      "지민",
      "서연",
      "민준",
      "수빈",
      "하준",
      "지유",
      "현우",
      "예린",
      "도윤",
      "소율",
      "유진",
      "지호",
      "윤서",
      "서준",
      "수아",
      "민서",
      "주원",
      "가은",
      "서현",
      "지안",
      "하린",
      "예준",
      "상우",
      "은지",
      "다은",
      "찬희",
      "가영",
      "나윤",
      "경민",
      "진우",
      "윤아",
      "정우",
      "유빈",
      "은호",
      "민규",
      "희원",
      "서윤",
      "보민",
      "재원",
      "수정",
      "하영",
      "보람",
      "서진",
      "선우",
      "지혜",
    ];

    this.lastNames = [
      "김",
      "이",
      "박",
      "최",
      "정",
      "강",
      "조",
      "윤",
      "임",
      "장",
      "한",
      "오",
      "서",
      "신",
      "황",
      "안",
      "전",
      "민",
      "류",
      "채",
      "송",
      "배",
      "추",
      "방",
      "노",
      "염",
      "유",
      "구",
      "진",
      "변",
      "기",
      "함",
      "오",
      "진",
      "우",
      "설",
      "여",
      "차",
      "목",
      "성",
      "탁",
      "길",
      "소",
      "표",
      "엄",
    ];
  }

  generateName() {
    return (
      this.lastNames[MyUtility.randomNumber(this.lastNames.length)] +
      this.firstNames[MyUtility.randomNumber(this.firstNames.length)]
    );
  }
}

class GenderGenerator {
  generateGender() {
    return Math.random() < 0.5 ? "Male" : "Female";
  }
}

class BirthGenerator {
  constructor() {
    this.year;
    this.month;
    this.date;
  }
  generateBirthday() {
    this.year = MyUtility.getRandomInRange(1960, 2010);
    this.month = MyUtility.getRandomInRange(1, 12);

    if (this.month == 2) {
      this.date = MyUtility.getRandomInRange(1, 28);
    } else if (
      this.month == 1 ||
      this.month == 3 ||
      this.month == 5 ||
      this.month == 7 ||
      this.month == 8 ||
      this.month == 10 ||
      this.month == 12
    ) {
      this.date = MyUtility.getRandomInRange(1, 31);
    } else {
      this.date = MyUtility.getRandomInRange(1, 30);
    }

    if (`${this.month}`.length == 1) {
      this.month = `0${this.month}`;
    }

    return `${this.year}-${this.month}-${this.date}`;
  }
}

class AgeGenerator {
  constructor() {
    this.age;
  }
  generateAge(birthDate) {
    let today = new Date();

    let thisYear = parseInt(today.getFullYear());
    let thisMonth = parseInt(today.getMonth()) + 1;
    let thisDate = parseInt(today.getDate());

    if (
      (thisMonth == birthDate.month && thisDate <= birthDate.date) ||
      thisMonth > birthDate.month
    ) {
      this.age = thisYear - birthDate.year;
    } else {
      this.age = thisYear - birthDate.year - 1;
    }

    return this.age;
  }
}

class AddressGenerator {
  constructor() {
    this.cities = [
      "서울",
      "부산",
      "인천",
      "대구",
      "대전",
      "광주",
      "울산",
      "수원",
      "성남",
      "천안",
      "용인",
      "고양",
      "창원",
      "남양주",
      "전주",
      "계룡",
      "안산",
      "안양",
      "김해",
      "포항",
      "구미",
      "시흥",
      "전주",
      "양주",
      "문산",
      "광명",
      "이천",
      "여수",
      "강릉",
      "춘천",
      "속초",
      "홍천",
      "제주",
      "양양",
      "사천",
      "구리",
      "하남",
      "김포",
      "여주",
      "평택",
      "성주",
      "거제",
      "창녕",
      "상주",
      "진주",
    ];

    this.districts = [
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구", // 서울특별시 구
      "해운대구",
      "수영구",
      "사하구",
      "동래구",
      "금정구",
      "부산진구",
      "연제구",
      "북구",
      "남구",
      "사상구", // 부산광역시 구
      "달서구",
      "북구",
      "서구",
      "중구",
      "수성구",
      "남구",
      "동구", // 대구광역시 구
      "남구",
      "북구",
      "동구",
      "광산구",
      "서구", // 광주광역시 구
      "유성구",
      "대덕구",
      "서구",
      "중구",
      "동구", // 대전광역시 구
      "남구",
      "동구",
      "중구",
      "북구", // 울산광역시 구
    ];
  }

  generateAddress() {
    let city = this.cities[MyUtility.randomNumber(this.cities.length)];
    let district =
      this.districts[MyUtility.randomNumber(this.districts.length)];
    return `${city} ${district} ${MyUtility.getRandomInRange(
      1,
      200
    )}길 ${MyUtility.getRandomInRange(1, 200)}`;
  }
}

class UserGenerator {
  constructor() {
    this.uuidGen = new UUIDGenerator();
    this.nameGen = new NameGenerator();
    this.birthGen = new BirthGenerator();
    this.ageGen = new AgeGenerator();
    this.genderGen = new GenderGenerator();
    this.addressGen = new AddressGenerator();
  }

  generateData(count) {
    const data = [];
    for (let i = 0; i < count; i++) {
      const uuid = this.uuidGen.generateUUID();
      const name = this.nameGen.generateName();
      const birthDate = this.birthGen.generateBirthday();
      const age = this.ageGen.generateAge(this.birthGen);
      const gender = this.genderGen.generateGender();
      const address = this.addressGen.generateAddress();

      data.push([uuid, name, gender, age, birthDate, address]);
    }

    return data;
  }
}

const userGenerator = new UserGenerator();
const users = userGenerator.generateData(20);

const dataPrinter = new DataPrinter(users);
// dataPrinter.printConsole();
const filePath = "user.csv";
dataPrinter.writeUserToCSV(filePath);

//----------------generate store--------------------

class CafeNameGenerator {
  constructor() {
    this.type = "";
  }
  generateName() {
    let cafes = [
      "스타벅스",
      "이디야",
      "커피빈",
      "던킨도너츠",
      "카페베네",
      "투썸플레이스",
      "할리스커피",
      "폴바셋",
      "블루보틀",
    ];

    let places = [
      "홍대",
      "송파",
      "강서",
      "잠실",
      "강남",
      "이태원",
      "명동",
      "건대",
      "신촌",
      "여의도",
      "광화문",
      "압구정",
      "성수",
      "천호",
    ];

    this.type = cafes[MyUtility.randomNumber(cafes.length)];

    return `${this.type} ${
      places[MyUtility.randomNumber(places.length)]
    }${MyUtility.getRandomInRange(1, 10)}호점`;
  }
}

class TypeGenerator {
  constructor(data) {
    this.data = data;
  }
  generateType() {
    return `${this.data.type}`;
  }
}

class StoreGenerator {
  constructor() {
    this.idGen = new UUIDGenerator();
    this.nameGen = new CafeNameGenerator();
    this.typeGen = new TypeGenerator(this.nameGen);
    this.addressGen = new AddressGenerator();
  }

  generateData(count) {
    const data = [];
    for (let i = 0; i < count; i++) {
      const uuid = this.idGen.generateUUID();
      const name = this.nameGen.generateName();
      const type = this.typeGen.generateType();
      const address = this.addressGen.generateAddress();

      data.push([uuid, name, type, address]);
    }

    return data;
  }
}

const storeGenerator = new StoreGenerator();
const cafes = storeGenerator.generateData(20);

const dataPrinter2 = new DataPrinter(cafes);
const filePath2 = "store.csv";
dataPrinter2.writeStoreToCSV(filePath2);

//----------------generate order--------------------
class OrderGenerator {
  constructor() {
    this.idGen = new UUIDGenerator();
    this.orderAtGen = new TimeStampGenerator(2024, 9, 2024, 10);
    this.storeIdGen = new SelectID("store.csv");
    this.userIdGen = new SelectID("user.csv");
  }

  generateData(count) {
    let data = [];
    for (let i = 0; i < count; i++) {
      let id = this.idGen.generateUUID();
      let orderAt = this.orderAtGen.generateTimeStamp();
      let storeId = this.storeIdGen.selectID();
      let userId = this.userIdGen.selectID();

      data.push([id, orderAt, storeId, userId]);
    }
    return data;
  }
}

class TimeStampGenerator {
  //birth 랑 연관?

  constructor(year1, month1, year2, month2) {
    this.year1 = year1;
    this.year2 = year2;
    this.month1 = month1;
    this.month2 = month2;
  }

  generateDate() {
    let year = MyUtility.getRandomInRange(this.year1, this.year2);
    let month = MyUtility.getRandomInRange(this.month1, this.month2);
    let date;
    if (month == 2) {
      date = MyUtility.getRandomInRange(1, 28);
    } else if (
      month == 1 ||
      month == 3 ||
      month == 5 ||
      month == 7 ||
      month == 8 ||
      month == 10 ||
      month == 12
    ) {
      date = MyUtility.getRandomInRange(1, 31);
    } else {
      date = MyUtility.getRandomInRange(1, 30);
    }

    if (`${month}`.length == 1) {
      month = `0${month}`;
    }

    return `${year}-${month}-${date}`;
  }

  generateTime() {
    let hour = MyUtility.getRandomInRange(0, 23);
    let min = MyUtility.getRandomInRange(0, 59);
    let second = MyUtility.getRandomInRange(0, 59);

    if (`${hour}`.length == 1) {
      hour = `0${hour}`;
    }
    if (`${min}`.length == 1) {
      min = `0${min}`;
    }
    if (`${second}`.length == 1) {
      second = `0${second}`;
    }

    return `${hour}:${min}:${second}`;
  }

  generateTimeStamp() {
    return `${this.generateDate()} ${this.generateTime()}`;
  }
}

class SelectID {
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

    return `${columnData[MyUtility.randomNumber(columnData.length)]}`;
  }
}

const order = new OrderGenerator();

const dataPrinter3 = new DataPrinter(order.generateData(10));

dataPrinter3.writeOrderToCSV("order.csv");

//----------------generate item--------------------

class ItemGenerator {
  constructor() {
    this.idGen = new UUIDGenerator();
    this.nameGen = new MenuGenerator();
    this.typeGen = new TypeGenerator(this.nameGen);
  }

  generateData(count) {
    let data = [];

    for (let i = 0; i < count; i++) {
      let id = this.idGen.generateUUID();
      let name = this.nameGen.generateMenu();
      let type = this.typeGen.generateType();
      let price = MyUtility.getRandomInRange(30, 80) * 100;

      data.push([id, name, type, price]);
    }
    return data;
  }
}

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

    let num1 = MyUtility.randomNumber(3);
    let num2 = MyUtility.randomNumber(menu[num1].length);

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

const item = new ItemGenerator();
const dataPrinter4 = new DataPrinter(item.generateData(20));

dataPrinter4.writeItemToCSV("item.csv");

//----------------generate orderItem--------------------

class OrderItemGenerator {
  constructor() {
    this.idGen = new UUIDGenerator();
    this.orderIdGen = new SelectID("order.csv");
    this.itemIdGen = new SelectID("item.csv");
  }

  generateData(count) {
    let data = [];
    for (let i = 0; i < count; i++) {
      let id = this.idGen.generateUUID();
      let orderId = this.orderIdGen.selectID("Id");
      let itemId = this.itemIdGen.selectID("Id");

      data.push([id, orderId, itemId]);

      console.log(`id: ${id}, orderId: ${orderId}, itemId: ${itemId}`);
    }
    return data;
  }
}

const orderItem = new OrderItemGenerator();
const dataPrinter5 = new DataPrinter(orderItem.generateData(10));

dataPrinter5.writeOrderItemToCSV("orderitem.csv");
