const express = require("express");
const router = express.Router();

router.route("/list").get((req, res) => {
  res.send("상품 목록 출력");
});

router.get("/details", (req, res) => {
  res.send("상품 상세 목록 출력");
});

router.get("/:id/details", (req, res) => {
  const id = req.params.id;
  res.send(`${id} 상품`);
});

module.exports = router;
