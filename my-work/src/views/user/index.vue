<template>
  <div class="user">
    <div class="top">
      <img
        src="../../assets/images/bg_profile.png"
        alt=""
        width="1060"
        @click="go_home()"
      />
      <div class="user_information">
        <img src="../../assets/images/one_punch_r2.png" class="user_photo" />
        <span class="user_name">{{ user_name }}</span>
      </div>
    </div>
    <div class="body">
      <div class="left">
        <el-tabs type="border-card" class="newl_list">
          <el-tab-pane label="我的文章">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="write()"
            ></el-button>
            <hr style="padding: 8px; border: none;" />
            <el-card class="box-card" v-for="item in my_newlist" :key="item.id">
              <div class="text item">
                <img
                  :src="item.image"
                  alt=""
                  width="100"
                  style="display: inline-block; vertical-align: middle;"
                />
                <div class="mylist">
                  <span class="mylist_title">{{ item.title }}</span>
                  <p class="mylist_conten">{{ item.news }}</p>
                </div>
              </div>
              <div class="edit_delate">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  v-model="item.id"
                  circle
                  @click.native="editNews(item.id)"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  v-model="item.id"
                  circle
                  @click.native="deleteNews(item.id)"
                ></el-button>
              </div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="关注">关注</el-tab-pane>
          <el-tab-pane label="收藏">收藏</el-tab-pane>
        </el-tabs>
      </div>
      <div class="right">
        <ul
          style="margin-bottom: 10px; text-align: center; padding-top: 16px; box-sizing: border-box; position: relative;"
        >
          <li style="display: inline-block; width: 49%;">
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
          <li
            style="position: absolute; height: 48px; border: 1px solid #eee; top: 19px; left: 167px;"
          ></li>
          <li style="display: inline-block; width: 49%;">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      my_newlist: []
    };
  },
  methods: {
    // 返回主页面
    go_home() {
      this.$router.push({ name: "home" });
    },
    // 跳转发布新闻页面
    write() {
      this.$router.push({ name: "write" });
    },
    // 展示my_newlist
    myNewList() {
      const pro = this.$http.get("/mynewslist", {
        params: { author: this.user_name, total: 20 }
      });
      pro
        .then(result => {
          this.my_newlist = result.data.data;
        })
        .catch(error => {
          return this.$message.error("请求数据失败：" + error);
        });
    },
    editNews(data) {
      // 因为直接输出的this.my_newlist是一个带有'__ob__: Observer'的数据, '__ob__: Observer'的产生是由于vue数据监控自动产生的, 因此有该属性是数据无法遍历, 因此需要通过JSON.parse(JSON.stringify())方法将其转变为原始数据对象
      // console.log(JSON.parse(JSON.stringify(this.my_newlist)));
      const myList = [];
      JSON.parse(JSON.stringify(this.my_newlist)).forEach((ele, i) => {
        if (ele.id === data) {
          myList.push(ele);
        }
      });
      this.$router.push({
        name: "write",
        params: { edit_list: myList }
      });
    },
    deleteNews(data) {
      const pro = this.$http.get("/newsdel", {
        params: {
          id: data
        }
      });
      pro
        .then(result => {
          this.$message.success("删除成功");
          this.myNewList();
        })
        .catch(error => {
          return this.$message.error("删除失败" + error);
        });
    }
  },
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
    this.myNewList();
  }
};
</script>

<style lang="less" scoped>
.user {
  width: 1060px;
  height: 100%;
  margin: 0 auto;
  margin-top: 15px;
}
.top {
  height: 220px;
  margin-bottom: 15px;
  overflow: hidden;
  .user_information {
    height: 84px;
    position: relative;
    box-sizing: border-box;
    padding: 10px 0px 0px 130px;
    .user_photo {
      position: absolute;
      width: 100px;
      height: 100px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 100px;
      top: -50px;
      left: 21px;
    }
    .user_name {
      font-size: 24px;
      line-height: 24px;
    }
  }
}
.body {
  height: 100%;
  .left {
    width: 700px;
    margin-right: 0px;
  }
  .right {
    width: 340px;
    height: 84px;
    margin-right: 0;
    border: 1px solid #eeeeee;
  }
}

// 新闻列表格式
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  position: relative;
  width: 670px;
  .mylist {
    width: 400px;
    display: inline-block;
    vertical-align: middle;
    .mylist_title {
      display: inline-block;
      font-size: 20px;
      font-weight: 700;
      padding-left: 40px;
      margin-bottom: 20px;
    }
    .mylist_conten {
      text-indent: 2em; // 首行缩进
      padding: 0 30px;
      // 当文字超出当前部分, 显示省略号
      display: -webkit-box; // 将块元素转变为弹性盒子
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; // 控制行数
      overflow: hidden;
    }
  }
  .edit_delate {
    position: absolute;
    right: 15px;
    bottom: 15px;
  }
}
</style>
