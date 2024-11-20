import { MyUtility, UUIDGenerator } from "../utils.js";

class NameGenerator {
  constructor() {
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
    return this.lastNames[MyUtility.getRandomNumber(this.lastNames.length)] + this.firstNames[MyUtility.getRandomNumber(this.firstNames.length)];
  }
}

class GenderGenerator {
  generateGender() {
    return Math.random() < 0.5 ? "Male" : "Female";
  }
}

export class BirthGenerator {
  constructor() {
    this.year;
    this.month;
    this.date;
  }

  static getRandomDate(num) {
    let date;
    if (num == 2) {
      date = MyUtility.getRandomInRange(1, 28);
    } else if (num == 1 || num == 3 || num == 5 || num == 7 || num == 8 || num == 10 || num == 12) {
      date = MyUtility.getRandomInRange(1, 31);
    } else {
      date = MyUtility.getRandomInRange(1, 30);
    }

    return date;
  }

  generateBirthday() {
    this.year = MyUtility.getRandomInRange(1960, 2010);
    this.month = MyUtility.toTwoDigits(MyUtility.getRandomInRange(1, 12));
    this.date = MyUtility.toTwoDigits(BirthGenerator.getRandomDate(this.month));

    return `${this.year}-${this.month}-${this.date}`;
  }
}

class AgeGenerator {
  constructor() {
    this.age;
  }
  generateAge(birthDate) {
    // 만나이 구하기
    let today = new Date();
    let thisYear = parseInt(today.getFullYear());
    let thisMonth = parseInt(today.getMonth()) + 1;
    let thisDate = parseInt(today.getDate());

    if ((thisMonth == birthDate.month && thisDate <= birthDate.date) || thisMonth > birthDate.month) {
      this.age = thisYear - birthDate.year;
    } else {
      this.age = thisYear - birthDate.year - 1;
    }

    return this.age;
  }
}

export class AddressGenerator {
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
    ];
  }

  generateAddress() {
    let city = this.cities[MyUtility.getRandomNumber(this.cities.length)];
    let district = this.districts[MyUtility.getRandomNumber(this.districts.length)];
    let address = `${city} ${district} ${MyUtility.getRandomInRange(1, 200)}길 ${MyUtility.getRandomInRange(1, 200)}`;
    return address;
  }
}

export class UserGenerator {
  constructor() {
    this.nameGen = new NameGenerator();
    this.birthGen = new BirthGenerator();
    this.ageGen = new AgeGenerator();
    this.genderGen = new GenderGenerator();
    this.addressGen = new AddressGenerator();
  }

  generateData(count) {
    const data = [];
    for (let i = 0; i < count; i++) {
      this.uuid = UUIDGenerator.generateUUID();
      const name = this.nameGen.generateName();
      const birthDate = this.birthGen.generateBirthday();
      const age = this.ageGen.generateAge(this.birthGen);
      const gender = this.genderGen.generateGender();
      const address = this.addressGen.generateAddress();

      data.push([this.uuid, name, gender, age, birthDate, address]);
    }
    return data;
  }
}
