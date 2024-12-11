let selectedProduct = null;
let selectedPaymentMethod = null;

const clientKey = `test_ck_ex6BJGQOVDKZ9mz65OlO3W4w2zNb`;
const customerKey = generateRandomString(); // 랜덤 고객

const tossPayments = TossPayments(clientKey); // 토스 객체 초기화
const payment = tossPayments.payment({ customerKey });
// 토스의 함수 호출, 결제를 위한 변수 초기화(토스 객체에 고객정보 삽입)

function selectProduct(event, name, price) {
  selectedProduct = { name, price };
  document.querySelectorAll(".product-button").forEach((button) => {
    button.style.backgroundColor = "#ffffff";
  });
  event.target.style.backgroundColor = "rgb(229 239 255)";
}

function selectPaymentMethod(method) {
  if (selectedPaymentMethod) {
    document.getElementById(selectedPaymentMethod).style.backgroundColor = "#ffffff";
  }
  selectedPaymentMethod = method;
  document.getElementById(selectedPaymentMethod).style.backgroundColor = "rgb(229 239 255)";
}

async function requestPayment() {
  if (!selectedProduct) {
    alert(`상품을 선택해주세요`);
    return;
  }

  if (!selectedPaymentMethod) {
    alert(`결제 수단을 선택해주세요`);
    return;
  }

  const { name, price } = selectedProduct;
  const orderId = generateRandomString(); // 주문 ID 생성

  try {
    await payment.requestPayment({
      method: selectedPaymentMethod,
      amount: { currency: "KRW", value: price },
      orderId: orderId,
      orderName: name,
      successUrl: `${window.location.origin}/success.html`, // 반쪽짜리 성공(카드사에서 성공. 서버(백엔드)에서 마저 처리해야함)
      failUrl: `${(window.location, origin)}/fail.html`, // 100퍼 실패(문법적으로 failure가 맞음.)
    });
  } catch (error) {
    alert(`결제 요청 중 오류가 발생했습니다. ${error.message}`);
  }
}

function generateRandomString() {
  return Math.random().toString(36).slice(2, 10);
  // 8자리 문자... 6~64 사이를 충족하는 조건으로 생성
}
