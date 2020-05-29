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
      // console.log(data)
      let str = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz23456789";
      let token = "";
      let refresh_token = "";
      //以长度单位进行循环
      for (let i = 0; i < 100; i++) {
        token += str.charAt(Math.floor(Math.random() * str.length));
        refresh_token += str.charAt(Math.floor(Math.random() * str.length));
      }
      resObj.message = "登录成功!";
      Object.assign(resObj, {
        data: {
          id: Math.floor(Math.random() * 1000),
          name: phone,
          identity: data[0].identity,
          photo: data[0].photo,
          token,
          refresh_token,
        },
      });
      // console.log(resObj)
      res.end(JSON.stringify(resObj));
    } else {
      resObj.status = failStatus;
      resObj.message = "用户名或密码错误!";
      res.end(JSON.stringify(resObj));
    }
  });
};

// 获取新闻列表页
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

var img_url_name = "";
// 新增新闻图片地址获取
exports.newsadd_imgname = (req, res) => {
  let url = "http://localhost:8888/news_img/" + req.file.filename;
  url = `'${url}'`;
  img_url_name = url;
};

// 新增新闻
exports.newsadd = (req, res) => {
  // console.log(img_url_name)
  let resObj = { status: successStatus, message: "" };
  let { title, news, type, pubdate } = req.body;
  title = `'${title}'`;
  news = `'${news}'`;
  // news = news.replace('<p>', '')
  // news = news.replace('</p>', '')
  // console.log(title)
  if (img_url_name === "") {
    var sql = `insert into news_list (title,news,type,pubdate,status) values(${title},${news},${type},${pubdate},'0')`;
  } else {
    var sql = `insert into news_list (title,news,type,pubdate,status,image) values(${title},${news},${type},${pubdate},'0',${img_url_name})`;
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
};

// 删除新闻
exports.newsdel = (req, res) => {
  let resObj = { status: successStatus, message: "" };
  let Id = req.query.id;
  // console.log(Id)
  let sql = `delete from news_list where Id = ${Id}`;
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

// 获取新闻根据id
exports.newsbyid = (req, res) => {
  let resObj = { status: successStatus, message: "" };
  let Id = req.query.id;
  // console.log(Id)
  let sql = `select * from news_list where Id = ${Id}`;
  con.query(sql, (err, data) => {
    if (err) {
      resObj.status = failStatus;
      resObj.message = err.message;
      res.end(JSON.stringify(resObj));
    } else {
      resObj.message = "根据新闻id获取成功!";
      Object.assign(resObj, { data });
      res.end(JSON.stringify(resObj));
    }
  });
};

// 修改新闻
exports.newsedit = (req, res) => {
  let resObj = { status: successStatus, message: "" };
  let Id = req.query.id;
  let { title, news, type, pubdate } = req.body;
  title = `'${title}'`;
  news = `'${news}'`;
  // news = news.replace('<p>', '')
  // news = news.replace('</p>', '')
  if (img_url_name === "") {
    var sql = `update news_list set title=${title},news=${news},type=${type},pubdate=${pubdate} where Id =${Id}`;
  } else {
    var sql = `update news_list set title=${title},news=${news},type=${type},pubdate=${pubdate},image=${img_url_name} where Id =${Id}`;
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

// 获取个人信息
exports.account = (req, res) => {
  let resObj = { status: successStatus, message: "" };
  // console.log(req.query.zhanghao)
  let zhanghao = req.query.zhanghao;
  let sql = `select * from login where zhanghao = ${zhanghao}`;
  con.query(sql, (err, data) => {
    if (err) {
      resObj.status = failStatus;
      resObj.status.message = err.message;
      res.end(JSON.stringify(resObj));
    } else {
      resObj.message = "获取个人信息成功";
      Object.assign(resObj, { data });
      res.end(JSON.stringify(resObj));
    }
  });
};

// 获取新闻类型数量
exports.pie_type = (req, res) => {
  let resObj = { status: successStatus, message: "" };
  let sql = "select type from news_list";
  con.query(sql, (err, data) => {
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      arr.push(data[i].type);
    }
    var map = {};
    for (var j = 0; j < arr.length; j++) {
      var v = arr[j];
      var counts = map[v];
      if (counts) {
        map[v] += 1;
      } else {
        map[v] = 1;
      }
    }
    let list = [];
    for (var key in map) {
      var temp = {};
      temp.value = map[key];
      switch (key) {
        case "1":
          key = "要闻";
          break;
        case "2":
          key = "抗肺炎";
          break;
        case "3":
          key = "娱乐";
          break;
        case "4":
          key = "体育";
          break;
        case "5":
          key = "美食";
          break;
        case "6":
          key = "动漫";
          break;
        case "7":
          key = "游戏";
          break;
        case "8":
          key = "历史";
          break;
      }
      temp.name = key;
      list.push(temp);
    }
    // console.log(list)
    if (err) {
      resObj.status = failStatus;
      resObj.message = err.message;
      res.end(JSON.stringify(resObj));
    } else {
      resObj.message = "获取新闻类型成功!";
      Object.assign(resObj, { list });
      res.end(JSON.stringify(resObj));
    }
  });
};

// 获取新闻状态数量
exports.pie_status = (req, res) => {
  let resObj = { status: successStatus, message: "" };
  let sql = "select status from news_list";
  con.query(sql, (err, data) => {
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      arr.push(data[i].status);
    }
    var map = {};
    for (var j = 0; j < arr.length; j++) {
      var v = arr[j];
      var counts = map[v];
      if (counts) {
        map[v] += 1;
      } else {
        map[v] = 1;
      }
    }
    let list = [];
    for (var key in map) {
      var temp = {};
      temp.value = map[key];
      switch (key) {
        case "0":
          key = "待审核";
          break;
        case "1":
          key = "审核通过";
          break;
        case "2":
          key = "审核失败";
          break;
      }
      temp.name = key;
      list.push(temp);
    }
    // console.log(list)
    if (err) {
      resObj.status = failStatus;
      resObj.message = err.message;
      res.end(JSON.stringify(resObj));
    } else {
      resObj.message = "获取新闻状态数量成功!";
      Object.assign(resObj, { list });
      res.end(JSON.stringify(resObj));
    }
  });
};
