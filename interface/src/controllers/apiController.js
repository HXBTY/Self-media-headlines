const mysql = require("mysql");

// 链接数据库
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: "3306",
  database: "news",
});
con.connect();

let successStatus = 0; //表示成功
let failStatus = 1; // 表示失败

// 登录验证
exports.login = (req, res) => {
  let { phone, yz_code } = req.body;
  let resObj = { status: successStatus, message: "" };
  let sql = "select * from login where phone = ? and yz_code = ?";
  // 操作数据库
  con.query(sql, [phone, yz_code], (err, data) => {
    if (err) {
      resObj.status = failStatus;
      resObj.message = err.message;
      res.end(JSON.stringify(resObj));
      return;
    }
    if (data.length > 0) {
      resObj.message = "登录成功!";
      Object.assign(resObj, {
        data: {
          id: Math.floor(Math.random() * 1000),
          name: phone,
          identity: data[0].identity,
          photo: data[0].photo,
        },
      });
      res.end(JSON.stringify(resObj));
    } else {
      resObj.status = failStatus;
      resObj.message = "用户名或密码错误!";
      res.end(JSON.stringify(resObj));
    }
  });
};

// 获取新闻列表
exports.newslist = (req, res) => {
  let { type, total } = req.query;
  function search(sqlStr) {
    let resObj = { status: successStatus, message: "" };
    let sql = sqlStr;
    con.query(sql, (err, data) => {
      if (err) {
        resObj.status = failStatus;
        resObj.message = err.message;
        res.end(JSON.stringify(resObj));
        return;
      } else {
        if (data.length > total) {
          data = data.slice(0, total);
        }
        let total_count = data.length;
        resObj.message = "获取新闻列表成功!";
        Object.assign(resObj, { data, total_count });
        res.end(JSON.stringify(resObj));
      }
    });
  }
  if (type == 0) {
    let sql = `select * from news_list`;
    search(sql);
  }
};

// 获取新闻类型
exports.newsType = (req, res) => {
  let sql = `select * from news_type`;
  let resObj = { status: successStatus, message: "" };
  con.query(sql, (err, data) => {
    if (err) {
      resObj.status = failStatus;
      resObj.message = err.message;
      res.end(JSON.stringify(resObj));
      return;
    } else {
      resObj.message = "获取新闻列表成功!";
      Object.assign(resObj, { data });
      res.end(JSON.stringify(resObj));
    }
  });
};

var img_url_name = "";
// 新增新闻图片地址获取
exports.newsadd_imgname = (req, res) => {
  let resObj = { status: successStatus, message: "" };
  let url = "http://localhost:8888/news_img/" + req.file.filename;
  url = `'${url}'`;
  img_url_name = url;
  resObj.message = "图片上传成功";
  let photo = url.replace(/'/g, "");
  Object.assign(resObj, { photo });
  res.end(JSON.stringify(resObj));
};

// 新增新闻
exports.newsadd = (req, res) => {
  // 获取表的长度
  let length = `select * from news_list`;
  let id = "";
  let resObj = { status: successStatus, message: "" };
  let { title, news, type_id, image } = req.body;
  let { pubdate, author } = req.query;
  con.query(length, (err, data) => {
    if (err) {
      resObj.status = failStatus;
      resObj.message = err.message;
      res.end(JSON.stringify(resObj));
    } else {
      id = data.length + 2;

      // 之所以添加引号是因为数据
      title = `'${title}'`;
      news = news.replace(/<.*?>/gi, "");
      news = `'${news}'`;
      pubdate = `'${pubdate}'`;
      type_id = `'${type_id}'`;
      author = `'${author}'`;
      id = `'${id}'`;
      image = `'${image}'`;
      if (image === "") {
        var sql = `insert into news_list (title,news,type_id,pubdate,author,id) values(${title},${news},${type_id},${pubdate},${author},${id})`;
      } else {
        var sql = `insert into news_list (title,news,type_id,pubdate,image,author,id) values(${title},${news},${type_id},${pubdate},${image},${author},${id})`;
      }
      con.query(sql, (err, data) => {
        if (err) {
          resObj.status = failStatus;
          resObj.message = err.message;
          res.end(JSON.stringify(resObj));
        } else {
          resObj.message = "新闻新增成功！";
          res.end(JSON.stringify(resObj));
        }
      });
    }
  });
};

// 获取自己的新闻信息
exports.mynewslist = (req, res) => {
  let { author, total } = req.query;
  let resObj = { status: successStatus, message: "" };
  author = `'${author}'`;
  let sql = `select * from news_list where author=${author}`;
  function search(sqlStr) {
    let sql = sqlStr;
    con.query(sql, (err, data) => {
      if (err) {
        resObj.status = failStatus;
        resObj.message = err.message;
        res.end(JSON.stringify(resObj));
        return;
      } else {
        if (data.length > total) {
          data = data.slice(0, total);
        }
        let total_count = data.length;
        resObj.message = "获取新闻列表成功!";
        Object.assign(resObj, { data, total_count });
        res.end(JSON.stringify(resObj));
      }
    });
  }
  search(sql);
};

// 修改新闻
exports.newsedit = (req, res) => {
  let resObj = { status: successStatus, message: "" };
  let { title, news, type_id, author, image, id } = req.body;
  let { pubdate } = req.query.pubdate;
  title = `'${title}'`;
  news = news.replace(/<.*?>/gi, "");
  news = `'${news}'`;
  pubdate = `'${pubdate}'`;
  type_id = `'${type_id}'`;
  author = `'${author}'`;
  id = `'${id}'`;
  image = `'${image}'`;
  if (image === "") {
    var sql = `update news_list set title=${title},news=${news},type_id=${type_id},pubdate=${pubdate},image=${image} where id =${id}`;
  } else {
    var sql = `update news_list set title=${title},news=${news},type_id=${type_id},pubdate=${pubdate},image=${image} where id =${id}`;
  }
  con.query(sql, (err, data) => {
    if (err) {
      resObj.status = failStatus;
      resObj.message = err.message;
      res.end(JSON.stringify(resObj));
    } else {
      resObj.message = "新闻修改成功！";
      res.end(JSON.stringify(resObj));
    }
  });
};

// 删除新闻
exports.newsdel = (req, res) => {
  let resObj = { status: successStatus, message: "" };
  let id = req.query.id;
  id = `'${id}'`;
  let sql = `delete from news_list where id = ${id}`;
  con.query(sql, (err, data) => {
    if (err) {
      resObj.status = failStatus;
      resObj.message = err.message;
      res.end(JSON.stringify(resObj));
    } else {
      resObj.message = "删除数据成功";
      res.end(JSON.stringify(resObj));
    }
  });
};
