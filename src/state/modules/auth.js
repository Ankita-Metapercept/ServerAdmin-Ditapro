import { unauthClient, apiDefaults, axios } from "@/api/index.js";
import store from "@/state/store";
import { URL } from "@/api/global.env";

const Auth = {
  state: () => ({
    token: localStorage.getItem("token") || null,
    refresh: localStorage.getItem("refresh") || null,
    email: localStorage.getItem("email") || null,
    username: localStorage.getItem("username")|| null,
    id: localStorage.getItem("id") || null,
    unauthClient: unauthClient,
    endpoints: {
      obtain: "/serveradmin/authenticate",
      // refresh: "/token/refresh/",
      // register: "/accounts/register/",
    },
  }),
  mutations: {
    updateTokens(state, tokens) {
      localStorage.setItem("token", tokens.token);
      localStorage.setItem("refresh", tokens.refresh);
      localStorage.setItem("email", tokens.email);
      localStorage.setItem("username", tokens.username);
      localStorage.setItem("id", tokens.id);
      state.token = tokens.token;
      state.refresh = tokens.refresh;
      state.email = tokens.email;
      state.username = tokens.username;
      state.id = tokens.id;
    },
    updateAccess(state, token) {
      localStorage.setItem("token", token);
      state.token = token;
    },
    removeToken(state) {
      localStorage.setItem("token", null);
      localStorage.setItem("refresh", null);
      localStorage.setItem("username", null);
      localStorage.setItem("email", null);
      localStorage.setItem("id", null);
      state.token = null;
      state.refresh = null;
      state.username = null;
      state.email = null;
      state.id = null;
    },
  },
  getters: {
    client: (state) => {
      const apiClient = axios.create({
        ...apiDefaults,
        headers: {
          Authorization: `Bearer ${state.token}`,
          
        },
      });
      apiClient.interceptors.response.use(
        (response) => {
          // Return a successful response back to the calling service
          return response;
        },
        (error) => {
          // Return any error which is not due to authentication back to the calling service
          if (error.response.status !== 401) {
            return new Promise((resolve, reject) => {
              reject(error);
            });
          }

          // console.log(error.config.url);
          // Logout user if token refresh didn't work or user is disabled
          if (
            error.config.url == `${URL}api/token/refresh/` ||
            error.response.message == "Account is disabled."
          ) {
            // window.location.href = "/";

            return new Promise((reject) => {
              reject(error);
            });
          }

          // Try request again with new token
          return apiClient
            .post(`${URL}accounts/token/refresh/`, {
              refresh: localStorage.getItem("refresh"),
            })
            .then((response) => {
              // New request with new token
              const config = error.config;
              store.commit("updateAccess", {
                token: response.data.token,
              });
              config.headers[
                "Authorization"
              ] = `Bearer ${response.data.token}`;

              return new Promise((resolve, reject) => {
                apiClient
                  .request(config)
                  .then((response) => {
                    resolve(response);
                  })
                  .catch((error) => {
                    reject(error);
                  });
              });
            })
            .catch((error) => {
              Promise.reject(error);
            });
        }
      );
      return apiClient;
    },
  },
  actions: {
    obtainToken(context, authDetails) {
      return context.state.unauthClient
        .post(context.state.endpoints.obtain, authDetails)
        .then((response) => {
          this.commit("updateTokens", {
            token: response.data.token,
            refresh: response.data.refresh,
            email: response.data.email,
            username: response.data.username,
            id: response.data.id,
          });
        });
    },
    refreshToken(context) {
      const payload = {
        refresh: context.state.refresh,
      };
      context.state.unauthClient
        .post(context.state.endpoints.refresh, payload)
        .then((response) => {
          this.commit("updateAccess", response.data.token);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    registerUser(context, authDetails) {
      return context.state.unauthClient
        .post(context.state.endpoints.register, authDetails)
        .then((response) => {
          console.log(response, "response");
        });
    },
  },
};
export default Auth;
