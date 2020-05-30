<template>
  <div class="write">
    <div class="write_content">
      <img
        src="../../assets/images/logo-home.gif"
        alt=""
        width="150"
        style="padding: 10px 10px;"
      />
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>发表文章</span>
        </div>
        <div class="text item">
          <el-form
            ref="addFormRef"
            :model="addForm"
            label-width="120px"
            :rules="addFormRules"
          >
            <el-form-item label="标题：" prop="title">
              <el-input v-model="addForm.title"></el-input>
            </el-form-item>
            <el-form-item label="内容：" prop="news">
              <quillEditor v-model="addForm.news"></quillEditor>
            </el-form-item>
            <el-form-item label="封面：">
              <el-radio-group v-model="radio">
                <!-- native:事件修饰符, 用于准确的绑定事件, 理解为该修饰符的作用就是把一个vue组件转化为一个普通的HTML标签. 因为使用的是ui框架, 因此实际上el-radio并不只是一个按钮标签, 内部包含了多个标签, 当没有使用native是, 只是将事件绑定在其父标签上, 因此会没有效果 -->
                <el-radio label="1" @click.native="flag = true">单图</el-radio>
                <el-radio label="0" @click.native="flag = false">无图</el-radio>
              </el-radio-group>
              <!-- action: 上传地址, 必填; show-file-list: 是否显示已上传文件列表;http-request: 覆盖默认的上传行为，可以自定义上传的实现
               -->
              <el-upload
                action
                :http-request="upLoadPhoto"
                :show-file-list="false"
                class="uploader"
                v-show="flag"
              >
                <ul>
                  <li class="uploadbox">
                    <span>点击图标选择图片</span>
                    <img v-if="addForm.image" :src="addForm.image" alt="" />
                    <div v-else class="el-icon-picture-outline"></div>
                  </li>
                </ul>
              </el-upload>
            </el-form-item>
            <el-form-item label="频道：" prop="type_id">
              <el-select
                v-model="addForm.type_id"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in channelList"
                  :key="item.type_id"
                  :label="item.type"
                  :value="item.type_id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addarticle()">发布</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
// 引入富文本编辑器样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
// 引入quillEditor模块
import { quillEditor } from "vue-quill-editor";
export default {
  name: "ArticleAdd",
  data() {
    return {
      radio: "0",
      flag: false,
      channelList: [], // 接收新闻列表数据
      addForm: {
        title: "", // 文章标题
        news: "", // 文章内容
        image: "", // 图片
        type_id: "" // 新闻类型id
      },
      // 表单校验规则
      addFormRules: {
        title: [
          { required: true, message: "标题必填" },
          // 后端要求title长度介于5-30个字符
          {
            min: 5,
            max: 30,
            message: "标题长度介于5-30个字符"
          }
        ],
        news: [{ required: true, message: "内容必填" }],
        type_id: [{ required: true, message: "频道必选" }]
      }
    };
  },
  // 初测组件
  components: {
    // 简易成员赋值 quillEditor: quillEditor
    // 组件使用两种方式：<quillEditor></quillEditor> 或 <quill-editor></quill-editor>
    quillEditor
  },
  created() {
    this.getChannelList();
  },
  methods: {
    // 获取新闻类型
    getChannelList() {
      const pro = this.$http.get("/newsType");
      pro
        .then(result => {
          if (result.data.status === 0) {
            this.channelList = result.data.data;
          }
        })
        .catch(err => {
          return this.$message.error("获得新闻类型错误：" + err);
        });
    },
    // 发布文章
    addarticle() {
      // 表单校验
      this.$refs.addFormRef.validate(valid => {
        if (valid) {
          // 把被添加的文章信息通过axios传递给服务器端存储
          // axios发起post请求的时候，不仅可以传递post数据还可以传递get请求字符串信息
          // this.$http.post(地址,post数据,get请求字符串信息)
          var pro = this.$http.post("/newsadd", this.addForm, {
            params: {
              pubdate: this.pubdate,
              author: this.author
            }
          });
          pro
            .then(result => {
              console.log(result);
              this.$message.success("文章发布成功");
              this.$router.push({ name: "home" });
            })
            .catch(err => {
              return this.$message.error("发布文章失败" + err);
            });
        }
      });
    },
    // 自定义上传图片方法
    upLoadPhoto(resource) {
      const fd = new FormData();
      // 将图片信息添加到表单数据对象
      fd.append("file", resource.file);
      const pro = this.$http.post("/newsadd_imgname", fd);
      pro
        .then(result => {
          if (result.data.status === 0) {
            this.addForm.image = result.data.photo;
          }
        })
        .catch(err => {
          return this.$message.error("图片上传失败：" + err);
        });
    }
  },
  // 计算属性
  computed: {
    pubdate() {
      const newDate = new Date();
      return newDate;
    },
    author() {
      return JSON.parse(window.localStorage.getItem("userinfo")).name;
    }
  }
};
</script>

<style lang="less" scoped>
.write {
  height: 100%;
  background-color: #eeeeee;
  padding-top: 15px;
}
.write_content {
  width: 1060px;
  height: 100%;
  margin: 0 auto;
}
// /deep/ 深度选择器
.el-form /deep/ .ql-editor {
  height: 200px;
}
.uploadbox {
  list-style: none;
  width: 200px;
  height: 200px;
  margin: 10px;
  float: left;
  cursor: pointer;
  border: 1px solid #eee;
  span {
    width: 200px;
    height: 50px;
    line-height: 50px;
    display: block;
    text-align: center;
  }
  div {
    width: 200px;
    height: 150px;
    font-size: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
  img {
    width: 200px;
    height: 150px;
  }
}
</style>
