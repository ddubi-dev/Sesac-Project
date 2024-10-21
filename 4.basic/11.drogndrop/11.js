const dragItems = document.querySelectorAll(".dragItems");
// == const dragItems = document.getElementsByClassName("dragItems");
const dropZone = document.getElementById("dropZone");

dragItems.forEach((dragItem) => {
  //아이템의 하나하나를 받아와서
  dragItem.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("target", e.target.id);
  });
});

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  console.log("드롭 발생");
  const data = e.dataTransfer.getData("target");
  const draggedElement = document.getElementById(data);
  dropZone.appendChild(draggedElement);
});
