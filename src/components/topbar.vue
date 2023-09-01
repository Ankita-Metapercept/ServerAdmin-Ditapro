<script>
import i18n from "../i18n";
// import { mapGetters } from "vuex";
import logoPng from "../assets/ditaxpresso.png"
export default {
  data() {
    return {
      username: null,
      languages: [
        {
          flag: require("@/assets/images/flags/us.jpg"),
          language: "en",
          title: "English",
        },
        {
          flag: require("@/assets/images/flags/french.jpg"),
          language: "fr",
          title: "French",
        },
        {
          flag: require("@/assets/images/flags/spain.jpg"),
          language: "es",
          title: "spanish",
        },
        {
          flag: require("@/assets/images/flags/chaina.png"),
          language: "zh",
          title: "Chinese",
        },
        {
          flag: require("@/assets/images/flags/arabic.png"),
          language: "ar",
          title: "Arabic",
        },
      ],
      logoPng: logoPng,
      current_language: "en",
    };
  },
  methods: {
    logOut() {
      this.$store.commit("removeToken");
      // Inside your logout method or button click handler
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      localStorage.removeItem('token');
      this.$router.push('/');
      console.log("logout");
      this.$router.push({ name: "Login" });
    },
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */ !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    setLanguage(locale) {
      i18n.locale = locale;
      this.current_language = i18n.locale;
    },
  },
};
</script>

<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex ">
        <!-- LOGO -->
        <div class="navbar-brand-box" style="background-color: #252b3b;">
          <a class="logo logo-dark">
            <span class="logo-sm">
              <img src="@/assets/images/logo-sm-dark.png" alt height="22" style="width:30px; height: auto;" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/logo-dark.png" alt height="20" style="width:auto; height: auto;" />
            </span>
          </a>

          <a class="logo logo-light  ">
            <span class="logo-sm ">
              <img src="@/assets/images/logo-sm-light.png" alt height="22" style="width:30px; height: auto;" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/logo-light.png" alt height="20" style="width:auto; height: auto;" />
            </span>
          </a>
        </div>
        <button @click="toggleMenu" type="button" class="btn btn-sm px-3 font-size-24 header-item waves-effect"
          id="vertical-menu-btn">
          <i class="ri-menu-2-line align-middle"></i>
        </button>


        <form class="app-search d-none d-lg-block">
          <div class="position-relative">
            <input type="text" class="form-control" :placeholder="$t('navbar.search.text')" />
            <span class="ri-search-line"></span>
          </div>
        </form>
      </div>

      <div class="d-flex">
        <div class="dropdown d-none d-lg-inline-block ml-1">
          <button type="button" class="btn header-item noti-icon waves-effect" @click="initFullScreen">
            <i class="ri-fullscreen-line"></i>
          </button>
        </div>
        <b-dropdown right variant="black" toggle-class="header-item" class="d-inline-block user-dropdown">
          <template v-slot:button-content>
            <span class="d-xl-inline-block ml-1">
              <b> {{ $store.state.Auth.username }}</b></span>
            <i class="mdi mdi-chevron-down d-xl-inline-block"></i>
          </template>
          <router-link class="dropdown-item" to="/profile">
            <i class="ri-user-line align-middle mr-2"></i>
            <span>{{ $t("navbar.dropdown.kevin.list.profile") }}</span>
          </router-link>
          <a class="dropdown-item text-danger" @click="logOut">
            <i class="ri-shut-down-line align-middle mr-1 text-danger"></i>
            {{ $t("navbar.dropdown.kevin.list.logout") }}
          </a>
        </b-dropdown>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.notify-item {
  .active {
    color: #16181b;
    background-color: #f8f9fa;
  }
}

.logo-text {
  font-size: 13px;
  color: white;
}

a {
  cursor: pointer;
}
</style>
