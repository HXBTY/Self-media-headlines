<template>
  <div id="home">
    <div class="left">
      <a>
        <img src="../../assets/images/logo-home.gif" alt="" style="width: 110px;" />
      </a>
      <ul>
        <li>
          <a class="tab active">推荐</a>
        </li>
        <li>
          <a class="tab">热点</a>
        </li>
        <li>
          <a class="tab">图片</a>
        </li>
        <li>
          <a class="tab">科技</a>
        </li>
        <li>
          <a class="tab">娱乐</a>
        </li>
        <li>
          <a class="tab">体育</a>
        </li>
        <li>
          <a class="tab">财经</a>
        </li>
        <li>
          <a class="tab">搞笑</a>
        </li>
      </ul>
    </div>
    <div class="content">
      <el-collapse v-for="(item, i) in newsList" :key="i" disabled="true">
        <el-collapse-item>
          <template slot="title">
            <span class="news_title">{{ item.title }}</span>
          </template>
          <div class="news_img">
            <img :src="item.image" width="100" alt="" />
          </div>
          <div class="news_state">
            <span style="padding: 0 30px; font-weight: 700;">{{
              item.author
            }}</span>
            <span>发布时间: {{ item.pubdate }}</span>
          </div>
          <p class="news_content">{{ item.news }}</p>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="right">
      <el-input
        placeholder="搜索站内资源、视频或用户"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div class="login_car">
        <p class="login_input">
          登录后可以保存您的浏览喜好、评论、收藏，更可以发布微头条
        </p>
        <el-button type="danger" class="login_btn" @click="login()"
          >登录</el-button
        >
      </div>
      <div class="login_out_car un_show">
        <p class="login_out">
          <el-button type="text" @click="login_out()">退出登录</el-button>
        </p>
        <div class="user">
          <a>
            <img
              src="../../assets/images/one_punch_r2.png"
              class="head"
              @click="userPage()"
            />
          </a>
          <p>
            <el-button type="text" @click="userPage()">{{
              user_name
            }}</el-button>
          </p>
        </div>
        <ul style="margin-bottom: 10px;">
          <li style="display: inline-block; width: 50%;">
            <p
              style="width: auto; margin-bottom: 2px; font-size: 20px; font-weight: 600; line-height: 28px; color: #222;"
            >
              0
            </p>
            <p
              style="display: inline-block; font-size: 14px; line-height: 20px;"
            >
              关注
            </p>
          </li>
          <li style="display: inline-block; width: 50%;">
            <p
              style="width: auto; margin-bottom: 2px; font-size: 20px; font-weight: 600; line-height: 28px; color: #222;"
            >
              0
            </p>
            <p
              style="display: inline-block; font-size: 14px; line-height: 20px;"
            >
              粉丝
            </p>
          </li>
        </ul>
      </div>
      <div class="hot_news">
        <div class="new_title">24小时热点新闻</div>
        <ul>
          <li class="new_item">
            <a class="hot_new">
              <img
                src="../../assets/images/hot_new01.jpg"
                width="60"
                style="vertical-align: top;"
              />
              <p class="new_content">
                #国是看两会#【发改委：2020年全球赤字率升至9.9%，中国赤字率并不高】国家发改委秘书长丛亮24日在发布会上表示，从全球范围看，2020年赤字率将从2019年的平均3.7%上升到9.9%。发达国家从3%升至10.7%，其中，美国至15.4%，法国至19.2%，英国至8.3%，日本至7.9%，新兴
              </p>
            </a>
          </li>
          <li class="new_item">
            <a class="hot_new">
              <img
                src="../../assets/images/hot_new02.jpg"
                width="60"
                style="vertical-align: top;"
              />
              <p class="new_content">
                #秦昊曾要求伊能静退赛#
                真.#披荆斩棘的姐夫#原来传说中要求节目组让姐姐退赛的姐夫就是秦昊呀！他不仅要求退赛还“教唆”@伊能静
                跳烂一点，让节目组不得不退掉她[允悲]最后伊能静说退赛要赔很多，秦昊云淡风轻地说“赔呗”。这么兴风作浪的么？哈哈哈哈姐夫，真有你的[赞]
              </p>
            </a>
          </li>
          <li class="new_item">
            <a class="hot_new">
              <img
                src="../../assets/images/hot_new03.jpg"
                width="60"
                style="vertical-align: top;"
              />
              <p class="new_content">
                刘诗诗倪妮新剧拍摄现场曝光，两人近照少女感十足，手牵手似姐妹
              </p>
            </a>
          </li>
          <li class="new_item no_bottom">
            <a class="hot_new">
              <img
                src="../../assets/images/hot_new04.jpg"
                width="60"
                style="vertical-align: top;"
              />
              <p class="new_content">
                国家卫健委：昨日新增确诊境外输入病例2例（上海1例，广东1例），本土病例1例（在吉林）
              </p>
            </a>
          </li>
        </ul>
      </div>
      <div class="link_more">
        <div class="more">更多</div>
        <ul>
          <li class="item">
            <a>关于头条</a>
          </li>
          <li class="item">
            <a>加入头条</a>
          </li>
          <li class="item">
            <a>媒体报道</a>
          </li>
          <li class="item">
            <a>媒体合作</a>
          </li>
          <li class="item">
            <a>产品合作</a>
          </li>
          <li class="item">
            <a>合作说明</a>
          </li>
          <li class="item">
            <a>广告投放</a>
          </li>
          <li class="item">
            <a>联系我们</a>
          </li>
          <li class="item">
            <a>用户协议</a>
          </li>
          <li class="item">
            <a>隐私策略</a>
          </li>
          <li class="item">
            <a>侵权投诉</a>
          </li>
          <li class="item">
            <a>廉洁举报</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 刷新页面与回到顶部 -->
    <div class="refresh">
      <el-button
        type="danger"
        icon="el-icon-refresh"
        @click="refresh()"
        circle
      ></el-button>
      <!-- visibility-height: 当滚动值达到时出现 -->
      <el-backtop :bottom="40" :right="265" :visibility-height="200">
        <div style="">
          <el-button type="danger" icon="el-icon-arrow-up" circle></el-button>
        </div>
      </el-backtop>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsList: [] // 文章列表
    };
  },
  methods: {
    // 跳转用户页面
    userPage() {
      this.$router.push({ name: "user" });
    },
    // 用户是否登录判断
    onLine() {
      if (JSON.parse(window.localStorage.getItem("userinfo"))) {
        document
          .getElementsByClassName("login_car")[0]
          .classList.add("un_show");
        document
          .getElementsByClassName("login_out_car")[0]
          .classList.remove("un_show");
      }
    },
    // 登录方法
    login() {
      this.$router.push({ name: "login" });
    },
    // 退出登录
    login_out() {
      this.$confirm("确定要提出系统?", "退出", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.localStorage.clear();
          location.reload();
        })
        .catch(() => {});
    },
    // 刷新页面
    refresh() {
      location.reload();
    },
    // 请求列表数据
    getNewsList() {
      var params = {
        type: 0,
        total: 20
      };
      const pro = this.$http.get("/newslist", { params });
      pro
        .then(result => {
          this.newsList = result.data.data;
        })
        .catch(err => {
          return this.$message({
            type: "error",
            message: "请求列表数据失败" + err,
            duration: 3000
          });
        });
    }
  },
  // 计算属性
  computed: {
    user_name() {
      let name = "";
      if (window.localStorage.getItem("userinfo")) {
        name = JSON.parse(window.localStorage.getItem("userinfo")).name;
      }
      return name;
    }
  },
  created() {
    this.getNewsList();
  },
  mounted() {
    this.onLine();
  }
};
</script>

<style lang="less">
#home {
  padding-top: 15px;
  height: 100%;
  width: 1170px;
  margin: 0 auto;
}
// 左边
.left {
  height: 100%;
  .tab {
    display: block;
    width: 110px;
    line-height: 40px;
    text-align: center;
  }
}
// 选中的项显示背景色
.active {
  background-color: #ed4040;
  color: #fff;
}
// 中间区域
.content {
  height: 100%;
  background-color: pink;
  .news_title {
    display: inline-block;
    font-size: 20px;
    font-weight: 700;
  }
  .news_img {
    display: inline-block;
    vertical-align: middle;
    padding: 30px;
  }
  .news_content {
    text-indent: 2em; // 首行缩进
    padding: 0 30px;
    // 当文字超出当前部分, 显示省略号
    display: -webkit-box; // 将块元素转变为弹性盒子
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; // 控制行数
    overflow: hidden;
  }
  .news_state {
    display: inline-block;
  }
}
// 右边区域
.right {
  height: 100%;
}

.login_car {
  text-align: center;
  background: #fff;
  border: 20px solid #e8e8e8;
  width: 340px;
  height: 180;
  margin-top: 15px;
  padding: 40px;
  box-sizing: border-box;
  margin-bottom: 15px;
  .login_input {
    font-size: 14px;
    line-height: 17px;
    color: #777;
    margin-bottom: 20px;
  }
  .login_btn {
    width: 200px;
  }
}
.login_out_car {
  text-align: center;
  background: #fff;
  border: 20px solid #e8e8e8;
  width: 340px;
  height: 180;
  margin-top: 15px;
  box-sizing: border-box;
  margin-bottom: 15px;
  .login_out {
    font-size: 12px;
    line-height: 17px;
    text-align: right;
    padding: 8px 8px 0 0;
  }
  .user {
    margin-bottom: 10px;
    .head {
      width: 56px;
      height: 56px;
      margin-top: -5px;
      border-radius: 50%;
      border: 1px solid #fff;
    }
  }
}

.hot_news {
  width: 340px;
  height: 376px;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f4f5f6;
  margin-bottom: 20px;
  .new_title {
    color: #222;
    padding: 0;
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: 700;
  }
  .new_item {
    padding: 8px 0;
    border-bottom: 1px solid #e8e8e8;
    .hot_new {
      display: block;
      height: 60px;
      .new_content {
        display: inline-block;
        font-size: 14px;
        line-height: 20px;
        height: 40px;
        width: 220px;
        overflow: hidden;
        text-align: center;
        margin: 10px;
        box-sizing: border-box;
      }
    }
  }
  // 最后一个li没有底边框
  .no_bottom {
    border: none;
  }
}

.link_more {
  width: 340px;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f4f5f6;
  height: 180px;
  .more {
    color: #222;
    padding: 0;
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: 700;
  }
  .item {
    float: left;
    margin: 0 9px 20px;
    a {
      color: #777;
      line-height: 1.4;
      font-size: 14px;
    }
  }
}

.refresh {
  width: 40;
  height: 100px;
  position: fixed;
  bottom: -20px;
  right: 313px;
}
</style>
