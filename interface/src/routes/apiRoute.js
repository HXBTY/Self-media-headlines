const express = require("express");
const multer = require("multer");
const path = require("path");

let route = express.Router();
const apiCtrl = require("../controllers/apiController.js");

// 创建新闻上传图片
let url_news = path.join(__dirname, "../public/news_img");
const storage_news = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, url_news);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload_news = multer({ storage: storage_news });

// 登录验证
route.post("/api/login", apiCtrl.login);

// 新闻列表
route.get("/api/newslist", apiCtrl.newslist);

// 新闻类型
route.get("/api/newsType", apiCtrl.newsType);

// 新增新闻
route.post("/api/newsadd", apiCtrl.newsadd);

// 新增新闻图片地址获取
route.post(
  "/api/newsadd_imgname",
  upload_news.single("file"),
  apiCtrl.newsadd_imgname
);

// 获取自己的新闻
route.get("/api/mynewslist", apiCtrl.mynewslist);

// 修改新闻
route.post("/api/newsedit", apiCtrl.newsedit);

// 删除新闻
route.get("/api/newsdel", apiCtrl.newsdel);

module.exports = route;
