<template>
  <div id="home">
    <div class="left">
      <a href="###">
        <img src="./images/logo-home.gif" alt="" style="width: 110px;" />
      </a>
      <ul>
        <li>
          <a href="###" class="active">推荐</a>
        </li>
        <li>
          <a href="###">热点</a>
        </li>
        <li>
          <a href="###">直播</a>
        </li>
        <li>
          <a href="###">图片</a>
        </li>
        <li>
          <a href="###">科技</a>
        </li>
        <li>
          <a href="###">娱乐</a>
        </li>
        <li>
          <a href="###">体育</a>
        </li>
        <li>
          <a href="###">懂车帝</a>
        </li>
        <li>
          <a href="###">财经</a>
        </li>
        <li>
          <a href="###">搞笑</a>
        </li>
        <li>
          <a href="###">更多</a>
        </li>
      </ul>
    </div>
    <div class="content"></div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
#home {
  padding-top: 15px;
  height: 100%;
  width: 1170px;
  margin: 0 auto;
}
.left {
  height: 100%;
  background: chartreuse;
}
.content {
  background: green;
  height: 100%;
}
.right {
  background: blue;
  height: 100%;
}
a {
  display: block;
  width: 110px;
  line-height: 40px;
  text-align: center;
}
.active {
  background-color: #ed4040;
  color: #fff;
}
</style>
