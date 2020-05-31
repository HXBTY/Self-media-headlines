import Vue from "vue";
import VueRouter from "vue-router";

// 用于重写push方法, 解决两次路由跳转同一个路由的问题(没有用到)
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err);
};

Vue.use(VueRouter);

const routes = [
  // @别名, 代表src目录的绝对路径名地址
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login")
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home")
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/user")
  },
  {
    path: "/write",
    name: "write",
    component: () => import("@/views/write")
  }
];

const router = new VueRouter({
  routes
});

export default router;
