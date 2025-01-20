interface BasicInfo {
  name: string;
  age: number;
}

interface ContactInfo {
  email: string;
  phone: string;
}

interface Employee extends BasicInfo, ContactInfo {
  employeeId: number;
}

// 두 부모(?) + 자신신의 속성을 다 넣어야 함
const employee1: Employee = {
  name: "bob",
  age: 25,
  email: "1@gmail.com",
  phone: "010-0000-0000",
  employeeId: 123,
};

console.log(`직원의 정보: ${employee1.employeeId} - ${employee1.name}, ${employee1.age}, ${employee1.email}, ${employee1.phone}`);
