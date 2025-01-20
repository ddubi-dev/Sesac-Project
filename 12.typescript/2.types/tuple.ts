let person: [string, number] = ["alice", 30];
console.log(`사람: 이름 - ${person[0]}, 나이 - ${person[1]}`);

const [username, age] = person;
console.log(`사람: 이름 - ${username}, 나이 - ${age}`);
