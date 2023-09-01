<template>
  <div>
    <PageHeader :icon="'ri-building-4-line h2'" :title="title" :items="items" />
    <b-container fluid="xl">
      <div class="org-details row mb-4">
        <div class="col-md-6">
          <h1>{{ org.name }}</h1>
          <b-badge variant="success">Created Date : {{ org.createdAt | moment("DD MMM YYYY") }}</b-badge>
          <b-badge variant="danger" class="ml-3">Expiry Date :
            {{
              org.createdAt
              | moment("add", "1 year", "subtract", "1 day", "DD MMM YYYY")
            }}</b-badge>
          <p class="mb-2 mt-3">Organization ID: {{ org.customId }}</p>
          <p>Users: {{ userList.length }}</p>
        </div>
        <div class="col-md-6 text">
          <h5>SUBSCRIPTION PLAN : {{ activePlan.title }}</h5>
          <b-badge v-b-modal.modal-xl variant="success" role="button" class="mb-2 plan">Upgrade Plan</b-badge>
          <div class="item" v-if="activePlan.title === 'Enterprise'">
            <div class="subscription-btn">
              <span class="admin">ADMIN: {{ org.numberofAdmin }}</span>
              <span class="user">USER: {{ org.numberofUser }}</span>
            </div>
          </div>
          <div class="item" v-else>
            <div class="subscription-btn">
              <span class="admin">ADMIN: {{ activePlan.adminCount }}</span>
              <span class="user">USER: {{ activePlan.userCount }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col">
          <b-card class="tab-card text-white-50" @click="activeTab = 'project'"
            :class="{ active: activeTab === 'project' }">
            <h6 class="my-0 text-white d-flex align-items-center">
              <i class="mdi mdi-arrange-send-backward mr-2"></i>
              <span>PROJECTS</span>
            </h6>
          </b-card>
        </div>
        <div class="col">
          <b-card class="tab-card text-white-50" @click="activeTab = 'admin'" :class="{ active: activeTab === 'admin' }">
            <h6 class="my-0 text-white d-flex align-items-center">
              <i class="mdi mdi-account mr-2"></i> <span>ADMIN</span>
            </h6>
          </b-card>
        </div>
        <div class="col">
          <b-card class="tab-card text-white-50" @click="activeTab = 'users'" :class="{ active: activeTab === 'users' }">
            <h6 class="my-0 text-white d-flex align-items-center">
              <i class="mdi mdi-account-group mr-2"></i> <span>USERS</span>
            </h6>
          </b-card>
        </div>
        <div class="col">
          <b-card class="tab-card text-white-50" @click="activeTab = 'resource'"
            :class="{ active: activeTab === 'resource' }">
            <h6 class="my-0 text-white d-flex align-items-center">
              <i class="mdi mdi-laptop mr-2"></i> <span>RESOURCE</span>
            </h6>
          </b-card>
        </div>
        <div class="col">
          <b-card class="tab-card text-white-50" @click="activeTab = 'details'"
            :class="{ active: activeTab === 'details' }">
            <h6 class="my-0 text-white d-flex align-items-center">
              <i class="mdi mdi-format-list-bulleted mr-2"></i>
              <span>DETAILS</span>
            </h6>
          </b-card>
        </div>
      </div>

      <div class="mt-3">
        <Users v-if="activeTab === 'users'" :tableData="userList" />
        <Admin v-if="activeTab === 'admin'" :adminDetails="org" />
        <Projects v-if="activeTab === 'project'" />
        <Summary v-if="activeTab === 'resource'" />
        <Details :organization_details="org" :plan_details="activePlan" v-if="activeTab === 'details'"
          :orgFullDetails="orgFullDetails" />
      </div>
    </b-container>
    <!-- </Layout> -->
    <b-modal id="modal-xl" size="xl" title="Upgrade Plan" title-class="font-18" centered hide-footer>
      <upgradePlan :activeplan="activePlan" :organization="org" />
    </b-modal>
  </div>
</template>

<script>
// import Layout from "../../layouts/admin/mainadmin.vue";
import Users from "./components/Tabs/Users.vue";
import Admin from "./components/Tabs/Admin.vue";
import Summary from "./components/Tabs/Summary.vue";
import Projects from "./components/Tabs/Projects.vue";
import Details from "./components/Tabs/Details.vue";
import upgradePlan from "./components/Tabs/upgradePlan.vue";
import PageHeader from "@/components/page-header";
export default {
  name: "orgDetails",
  components: {
    Details,
    Users,
    Admin,
    Projects,
    Summary,
    upgradePlan,
    PageHeader
  },
  data() {
    return {
      title: "",
      items: [
        {
          text: "Dashboard",
          href: "/"
        },
      ],
      id: null,
      org: {},
      startDate: null,
      endDate: null,
      variant: "success",
      plans: [],
      activePlan: {},
      userList: [],
      activeTab: "project",
      orgFullDetails: {}
    };
  },
  mounted() {
    this.getOrganizationData();
    this.getFullDetails();
  },
  methods: {
    async getFullDetails() {
      let loader = this.$loading.show({
        loader: "dots",
      });

      await this.$store.getters.client
        .get(`/serveradmin/organization/details?orgId=${this.id}`)
        .then((response) => {
          console.log("__+++__", response);
          this.orgFullDetails = response.data;
          console.log("this.orgFullDetails", this.orgFullDetails)

          loader.hide();
        })
        .catch((err) => {
          console.log(err);
          loader.hide();
        });
    },
    async getOrganizationData() {
      let loader = this.$loading.show({
        loader: "dots",
      });

      await this.$store.getters.client
        .get(`/serveradmin/organization/byorgid?orgId=${this.id}`, {
          headers: {
            orgId: this.id
          }
        })
        .then((response) => {
          console.log(response);
          this.org = response.data[0];
          this.items.push({
            text: this.org.name.charAt(0).toUpperCase() + this.org.name.slice(1),
            active: true
          })
          this.title = this.org.name.charAt(0).toUpperCase() + this.org.name.slice(1);
          this.$store.getters.client
            .get("/serveradmin/subscriptionplan/")
            .then((response) => {
              this.plans = response.data;
              let plan = this.plans.find((item) => {
                return item.id === this.org.planId;
              });
              this.activePlan = plan;
            });
          // this.getValidity();
          this.$store.getters.client.get(`/orguser/byorgid?orgId=${this.id}`, {
            headers: {
              orgId: this.id
            }
          }).then((response) => {
            this.userList = response.data;
          });
          loader.hide();
        })
        .catch((err) => {
          console.log(err);
          loader.hide();
        });
    },
    // getValidity(){
    //   let now = moment(new Date())
    //   let expire = moment(this.org.createdAt + '1 year').format("DD MMM YYYY")

    //   console.log(now, expire)
    // }
  },

  created() {
    if ("id" in this.$route.params) {
      this.id = this.$route.params.id;
    }
  },
};
</script>

<style lang="scss">
.plan {
  &:hover {
    opacity: 0.8;
  }
}

.org-details {

  h1,
  h5,
  p {
    color: #021559;
    text-transform: uppercase;
    line-height: 1.25;
    margin-bottom: 0;
  }

  h1 {
    font-weight: 600;
  }

  p {
    font-weight: 900;
  }
}

.tab-card {
  background: rgba(23, 37, 146, 0.85) !important;
  color: #fff;
  text-align: center;
  cursor: pointer;

  i {
    font-size: 20px;
  }

  .card-body {
    padding: 0.75rem;
  }

  h6 {
    justify-content: center;
  }
}

.tab-card.active {
  background-color: #1cbb8c !important;
}

.col-md-6.text {
  text-align: right;
}

.subscription-btn {
  width: 247px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: auto;
}

span.admin,
.user {
  background-color: #a5ace2;
  padding: 3px 24px;
  color: #000;
  font-weight: 600;
}
</style>
