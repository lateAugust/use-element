import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/el-tree",
    name: "elTree",
    component: () =>
      import(/* webpackChunkName: "el-tree" */ "../views/el-tree"),
  },
  {
    path: "/el-scrollbar",
    name: "elScrollbar",
    component: () =>
      import(/* webpackChunkName: "el-tree" */ "../views/scroll"),
  },
  {
    path: "/thumbnail-slide",
    name: "thumbnail-slide",
    component: () =>
      import(/* webpackChunkName: "el-tree" */ "../views/thumbnail-slide"),
  },
  {
    path: "/jsx",
    name: "jsx-router",
    component: () =>
      import(/* webpackChunkName: "el-tree" */ "../views/jsx.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
