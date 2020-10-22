import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Dashboard from "./views/Dashboard.vue";
import Forms from "./views/Forms.vue";
import Tables from "./views/Tables.vue";
import UIElements from "./views/UIElements.vue";
import Login from "./views/Login.vue";
import Modal from "./views/Modal.vue";
import Teams from "./views/Teams.vue";
import Profile from "./views/Profile.vue";
import Profile2 from "./views/Profile2.vue";
import Member from "./views/Member.vue";
import Test from "./views/test.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { layout: "empty" },
  },
  {
    path: "/member",
    name: "Member",
    component: Member,
    meta: { layout: "empty" },
  },
  {
    path: "/profile2",
    name: "Profile2",
    component: Profile2,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/forms",
    name: "Forms",
    component: Forms,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/ui-elements",
    name: "UIElements",
    component: UIElements,
  },
  {
    path: "/modal",
    name: "Modal",
    component: Modal,
  },
  {
    path: "/teams",
    name: "Teams",
    component: Teams,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
