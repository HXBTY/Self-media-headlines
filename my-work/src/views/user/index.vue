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
          <el-tab-pane label="关注">关注</el-tab-pane>
          <el-tab-pane label="收藏">收藏</el-tab-pane>
          <el-tab-pane label="我的文章">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="write()"
            ></el-button>
            <hr style="padding: 8px; border: none;" />
            <el-card class="box-card">
              <div v-for="o in 4" :key="o" class="text item">
                {{ "列表内容 " + o }}
              </div>
            </el-card>
          </el-tab-pane>
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
        parmas: { author: this.user_name }
      });
      pro
        .then(result => {
          console.log(result);
          // this.my_newlist = result.data
        })
        .catch(error => {
          return this.$message.error("请求数据失败：" + error);
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
  width: 670px;
}
</style>
