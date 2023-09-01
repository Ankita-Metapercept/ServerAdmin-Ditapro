<template>
  <div>
    <PageHeader :icon="'ri-vip-crown-line h2'" :title="title" :items="items" />
    <b-container class="col-md-10 mx-auto row justify-content-around">
      <b-card class="col-lg-3 col-md-4">
        <span>
          <i class="ri-stack-fill"> </i>
        </span>
        <h6>{{ subscriptionPlanData[0].title }}</h6>

        <b-col>
          <p>{{ subscriptionPlanData[0].adminCount }} Admin</p>
          <p>{{ subscriptionPlanData[0].userCount }} User</p>
        </b-col>
        <button class="costum-btn" @click="editPlan(subscriptionPlanData[0])">
          EDIT
        </button>
      </b-card>
      <b-card class="col-lg-3 col-md-4">
        <span>
          <i class="ri-loader-line"> </i>
        </span>
        <h6>{{ subscriptionPlanData[1].title }}</h6>

        <b-col>
          <p>{{ subscriptionPlanData[1].adminCount }} Admin</p>
          <p>{{ subscriptionPlanData[1].userCount }} User</p>
        </b-col>
        <button class="costum-btn" @click="editPlan(subscriptionPlanData[1])">
          EDIT
        </button>
      </b-card>
      <b-card class="col-lg-3 col-md-4">
        <span>
          <i class="ri-star-line"> </i>
        </span>
        <h6>{{ subscriptionPlanData[2].title }}</h6>

        <b-col>
          <p>{{ subscriptionPlanData[2].adminCount }} Admin</p>
          <p>{{ subscriptionPlanData[2].userCount }} User</p>
        </b-col>
        <button class="costum-btn" @click="editPlan(subscriptionPlanData[2])">
          EDIT
        </button>
      </b-card>
      <b-card class="col-lg-3 col-md-4">
        <span>
          <i class="ri-star-line"> </i>
        </span>
        <h6>{{ subscriptionPlanData[3].title }}</h6>

        <b-col>
          <p>Admin</p>
          <p>User</p>
        </b-col>
        <!-- <button class="costum-btn" @click="editPlan(subscriptionPlanData[2])">
        EDIT
      </button> -->
      </b-card>
      <b-modal id="editSubscription" v-model="modalShow" centered scrollable size="sm" hide-footer
        title="Edit Subscription plan">
        <form action="#" @submit.prevent="updatePlan()">
          <div class="form-group">
            <label>Admin <span class="text-danger">*</span></label>
            <input v-model="formData.adminCount" type="number" class="form-control" name="admin" required />
          </div>
          <div class="form-group">
            <label>Users <span class="text-danger">*</span></label>
            <input v-model="formData.userCount" type="number" class="form-control" name="user" required />
          </div>

          <div class="form-group mb-0">
            <div class="text-center">
              <button type="submit" class="btn btn-primary">Submit</button>
              <button type="reset" class="btn btn-secondary m-l-5 ml-1">
                Reset
              </button>
            </div>
          </div>
        </form>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import PageHeader from "@/components/page-header";
export default {
  components: {
    PageHeader,
  },
  data() {
    return {
      title: "Subscription",
      items: [
        {
          text: "Dashboard",
          href: "/"
        },
        {
          text: "Subscription",
          active: true
        }
      ],
      subscriptionPlanData: [],
      modalShow: false,
      id: null,

      formData: {
        title: "",
        adminCount: null,
        userCount: null,
      },
    };
  },
  mounted() {
    this.getSubscriptionPlans();
  },
  methods: {
    async getSubscriptionPlans() {
      let loader = this.$loading.show({
        loader: "dots",
      });

      await this.$store.getters.client
        .get("/serveradmin/subscriptionplan/")
        .then((response) => {
          this.subscriptionPlanData = response.data;
          loader.hide();
        });
    },

    messageToast(messageToastTitle, messageToastVariant, messageToastContent) {
      this.$bvToast.toast(messageToastContent, {
        title: messageToastTitle,
        variant: messageToastVariant,
        solid: true,
      });
    },
    editPlan(item) {
      console.log(item);
      this.modalShow = true;
      this.formData = item;
      this.id = item.id;
    },
    updatePlan() {
      let loader = this.$loading.show({
        loader: "dots",
      });
      this.$store.getters.client
        .put(`/serveradmin/subscriptionplan?planId=${this.id}`, this.formData)
        .then(() => {
          this.modalShow = false;
          this.messageToast("Success", "success", `Subscription plan has been changed successfully`);
          this.getSubscriptionPlans();
          loader.hide();
        });
    },
  },
};
</script>

<style scoped>
.col-lg-12 {
  justify-content: center;
  display: flex;
  align-items: center;
}

.col-lg-3 {
  text-align: center;
}

.ri-stack-fill:before,
.ri-loader-line,
.ri-star-line {
  color: #212190;
  content: "";
  font-size: 90px;
}

.costum-btn {
  background: #021559;
  border: 1px solid #5664d2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  color: #fff;
  font-weight: 600;
  padding: 8px 15px;
  transition: all 0.3s ease;
}
</style>
