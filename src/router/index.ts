import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "firebase/auth";

import SignIn from "@/views/Signin/index.vue";
import Dashboard from "@/views/Dashboard/index.vue";
import Users from "@/views/Usertab/index.vue";
import Categories from "@/views/Categorytab/index.vue";
import Questionnaires from "@/views/Questionairetab/index.vue";

const routes = [
  { path: "/", redirect: "/signin" },
  { path: "/signin", component: SignIn },
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/users", component: Users, meta: { requiresAuth: true } },
  { path: "/categories", component: Categories, meta: { requiresAuth: true } },
  { path: "/questionnaires", component: Questionnaires, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const auth = getAuth();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  const user = auth.currentUser;
  if (requiresAuth && !user) {
    next("/signin");
  } else {
    next();
  }
});

export default router;
