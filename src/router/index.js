import Vue from "vue";
import Router from "vue-router";

// routes
import Login from "@/views/pages/account/routes.account/";
import Dashboard from "@/views/pages/dashboard/routes.dashboard/";
import Organization from "@/views/pages/organization/routes.organization/";
import Projects from "@/views/pages/projects/routes.project/";
import Subscription from "@/views/pages/subscription/routes.subscription/";
import Profile from "@/views/pages/profile/routes.profile/";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,

  scrollBehavior() {
    return { x: 0, y: 0 };
  },

  routes: [
    ...Login,
    {
      path: "/dashboard",
      component: () => import("@/views/layouts/main/"),
      children: [
        ...Dashboard,
        ...Organization,
        ...Projects,
        ...Subscription,
        ...Profile
      ],
    },

    // Redirect to 404 page, if no match found
    {
      path: "/not-found",
      component: () => import(/* webpackChunkName: "404" */ "@/views/Error404"),
    },
    { path: "*", redirect: "/not-found" },
  ],
});

router.afterEach(() => {
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;
