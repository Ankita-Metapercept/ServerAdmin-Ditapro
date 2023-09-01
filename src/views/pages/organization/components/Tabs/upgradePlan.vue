<template>
  <b-row>
    <b-col v-for="plans in subscriptionPlanData" :key="plans.id">
      <div class="card position-relative">
        <div
          class="card-body"
          role="button"
          @click="confirm(plans)"
          :class="{
            disableCard: plans.level < activeplan.level,
            noEvent: plans.level <= activeplan.level,
          }"
        >
          <div
            class="activeIcon text-success"
            v-if="plans.level === activeplan.level"
          >
            <i class="ri-checkbox-circle-fill"></i>
          </div>
          <div class="text-center">
            <i class="ri-stack-fill"> </i>
            <div class="media-body">
              <h5 class="text-truncate">
                <a href="#" class="text-dark w-100">{{ plans.title }}</a>
              </h5>
            </div>
          </div>
          <hr class="my-4" />
          <div class="row text-center">
            <div class="col-12" v-if="plans.level === 4">
              <button class="btn btn-outline-success mb-3">
                UPGRADE TO ENTERPRISE
              </button>
            </div>
            <div class="col-6" v-if="plans.level !== 4">
              <p class="text-muted mb-2">ADMIN</p>
              <h5>{{ plans.adminCount }} Admins</h5>
            </div>
            <div class="col-6" v-if="plans.level !== 4">
              <p class="text-muted mb-2">USER</p>
              <h5>{{ plans.userCount }} Users</h5>
            </div>
          </div>
        </div>
      </div>
    </b-col>
    <b-modal
      id="editSubscription"
      v-model="modalShow"
      centered
      scrollable
      size="sm"
      hide-footer
      title="Number of Users"
    >
      <div>
        <div class="form-group">
          <label>Admin <span class="text-danger">*</span></label>
          <input
            v-model="adminCountVal"
            type="number"
            class="form-control"
            name="admin"
            min="9"
            max="20"
            required
          />
          <div class="form-text text-danger" v-if="adminCountVal < 9">
            Min value is 9
          </div>
          <div class="form-text text-danger" v-if="adminCountVal > 20">
            Max value is 20
          </div>
        </div>
        <div class="form-group">
          <label>Users <span class="text-danger">*</span></label>
          <input
            v-model="userCountVal"
            type="number"
            class="form-control"
            name="user"
            min="26"
            max="150"
            required
          />
          <div class="form-text text-danger" v-if="userCountVal < 26">
            Min value is 26
          </div>
          <div class="form-text text-danger" v-if="userCountVal > 150">
            Max value is 150
          </div>
        </div>

        <div class="form-group mb-0">
          <div class="text-center">
            <button
              @click="updatePlan()"
              type="submit"
              :disabled="
                userCountVal < 26 ||
                  userCountVal > 150 ||
                  adminCountVal < 9 ||
                  adminCountVal > 20
              "
              class="btn btn-primary"
            >
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </b-modal>
  </b-row>
</template>

<script>
import Swal from "sweetalert2";

export default {
  props: ["organization", "activeplan"],
  data() {
    return {
      subscriptionPlanData: [],
      modalShow: false,
      id: null,
      adminCountVal: 9,
      userCountVal: 26,
      formData: {},
    };
  },
  mounted() {
    console.log("this.active", this.activeplan);
    console.log("organization.id", this.organization);
    this.getSubscriptionPlans();
  },
  methods: {
    messageToast(messageToastTitle, messageToastVariant, messageToastContent) {
      this.$bvToast.toast(messageToastContent, {
        title: messageToastTitle,
        variant: messageToastVariant,
        solid: true,
      });
    },
    async confirm(item) {
      if (item.level !== 4) {
        Swal.fire({
          title: "Are you sure?",
          text: "You want to upgrade plan!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, upgrade!",
        }).then(() => {
          this.upgradePlan(item);
        });
      } else {
        this.formData.orgId = this.organization.id;
        this.formData.planId = item.id;
        console.log(item);
        this.modalShow = true;
        this.id = item.id;
      }
    },
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
    upgradePlan(item) {
      console.log("item", item);
      this.formData.orgId = this.organization.id;
      this.formData.planId = item.id;
      this.formData.numberofUser = item.userCount;
      this.formData.numberofAdmin = item.adminCount;

      let loader = this.$loading.show({
        loader: "dots",
      });

      this.$store.getters.client
        .put(`/serveradmin/updatesubscriptionplan`, this.formData)
        .then(() => {
          this.modalShow = false;
          loader.hide();
          this.getSubscriptionPlans();
          this.messageToast(
              "Success",
              "success",
              ` Subscription Plan upgraded successfully`
            );
          setTimeout(()=>{
              location.reload();
            },1000)
        })
        .catch((error)=>{
          console.log(error);
          this.messageToast(
        "Error",
        "danger",
        "An error occurred while upgrading the plan. Please try again later."
      );
        })
      console.log(item);
    },
    updatePlan() {
      console.log(this.userCountVal);

      this.formData.numberofUser = parseInt(this.userCountVal);
      this.formData.numberofAdmin = parseInt(this.adminCountVal);

      console.log(this.formData);
      Swal.fire({
        title: "Are you sure?",
        text: "You want to upgrade plan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, upgrade!",
      }).then(() => {
        let loader = this.$loading.show({
          loader: "dots",
        });
        this.$store.getters.client
          .put(`/serveradmin/updatesubscriptionplan`, this.formData)
          .then(() => {
            this.modalShow = false;
            loader.hide();
            this.messageToast(
              "Success",
              "success",
              `Plan upgraded successfully`
            );
            setTimeout(()=>{
              location.reload();
            },1000)
            this.getSubscriptionPlans();
          });
      });
    },
  },
};
</script>

<style scoped>
.disableCard {
  opacity: 0.5;
}
.noEvent {
  pointer-events: none;
}
.activeIcon {
  position: absolute;
  top: 4px;
  right: 8px;
  font-size: 1.5rem;
}
.ri-stack-fill:before,
.ri-loader-line,
.ri-star-line {
  color: #212190;
  content: "";
  font-size: 50px;
}
</style>
