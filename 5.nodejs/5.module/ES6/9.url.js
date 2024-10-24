const url = require("node:url");

const myURL = "https://www.example.com/path?query=value";
console.log(typeof myURL);

// URL 파싱 - url을 세부요소로 나눌 수 있도록, 객체 안에 담아서 형 변환을 함
const myURL_p = new URL(myURL);
console.log(typeof myURL_p);

// 1. 호스트명 출력
console.log(myURL_p.hostname);

// 2. 경로 출력
console.log(myURL_p.pathname);

// 3. 쿼리 파라미터 출력
console.log(myURL_p.search);
console.log(myURL_p.searchParams);

// URL파싱 #2
const parsedURL = url.parse(myURL);
console.log(parsedURL);
console.log("protocol: ", parsedURL.protocol);
console.log("host: ", parsedURL.host);
console.log("hostname: ", parsedURL.hostname);
console.log("search: ", parsedURL.search);
console.log("query: ", parsedURL.query);

// 거꾸로 주소 만들기

const myURL2 = {
  protocol: "https",
  hostname: "sesac.com",
  pathname: "myservice/mypath/dir1",
  query: {
    product: "hello",
  },
};

const assembledURL = url.format(myURL2);
console.log(assembledURL);
