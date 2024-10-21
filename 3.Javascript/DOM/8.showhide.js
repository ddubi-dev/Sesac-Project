function showHide() {
  const divElement = document.getElementById("hiddenDiv");
  const divElementStyle = window.getComputedStyle(divElement).display;

  if (divElementStyle === "none") {
    divElement.style.display = "block";
  } else {
    divElement.style.display = "none";
  }

  // const divElement = document.getElementById("hiddenDiv");

  // if (divElement.style.display === "none") {
  //   divElement.style.display = "block";
  // } else {
  //   divElement.style.display = "none";
  // }
  //모든 CSS는 style 안에 있는데
  //위 코드는 div라인의 처리를 함 -> <div style="">
}
