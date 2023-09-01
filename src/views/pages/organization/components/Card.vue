<template>
  <b-card class="p-0 org-card" :class="{
    deActive: !item.isActive,
    warningCard: months <= 2,
    dangerCard: 1 >= months > 0,
  }">
    <b-row class="justify-content-between mx-0 header p-3">
      <div class="d-flex">
        <span><i class="mdi mdi-domain"></i></span><span class="title ml-2"> {{ item.name }} </span>
      </div>
      <b-dropdown dropleft>
        <template v-slot:button-content>
          <i class="mdi mdi-dots-vertical"></i>
        </template>
        <b-dropdown-item @click="toEditOrg(item.id)" :disabled="!item.isActive">Edit</b-dropdown-item>
        <b-dropdown-item @click="toOrgDetails(item.id)" :disabled="!item.isActive">View</b-dropdown-item>
        <b-dropdown-item @click="activate(item)" v-if="!item.isActive">Activate</b-dropdown-item>
        <b-dropdown-item @click="deActivateModal(item)" v-else>Deactivate</b-dropdown-item>
      </b-dropdown>
    </b-row>
    <div class="p-3 details">
      Organization Id: <span class="text-muted">{{ item.customId }}</span>
      <br />
      DITA-OT: <span class="text-muted">{{ item.ditaotVersion }}</span>
    </div>
    <hr class="m-0" />
    <b-row class="justify-content-between mx-0 px-3 py-2 footer-details">
      <span>
        <span class="badge badge-soft-primary mr-2">Projects:</span><span class="badge badge-soft-primary">{{
          projectList.length }}</span>
      </span>
      <span>
        <span class="badge badge-soft-success mr-2">Users:</span><span class="badge badge-soft-success">{{ userList.length
        }}</span>
      </span>
    </b-row>
    <b-modal v-model="modalShow" centered title="Tell us the reason for deactivate" title-class="font-18" hide-footer>
      <div class="mt-lg-0">
        <h5 class="font-size-14 mb-4">Select option</h5>
        <b-form-radio-group v-model="reason" :options="options" class="mb-3 d-flex flex-column gap-y-3" value-field="id"
          text-field="title" required></b-form-radio-group>
        <div class="form-group" v-if="reason == 'Other'">
          <textarea type="text" class="form-control" name="reason" />
        </div>
      </div>
      <div class="text-right">
        <button type="button" class="btn btn-sm btn-primary" @click="deActivate()">
          Deactivate
        </button>
      </div>
    </b-modal>
  </b-card>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  data() {
    return {
      modalShow: false,
      projectList: [],
      userList: [],
      reason: null,
      selectedItem: null,
      months: null,
      options: [
        "Don't need this organization any more",
        "Created duplicate organization",
        "Other",
      ],
    };
  },
  mounted() {
    this.getProjectList();
    this.getUserList();
    this.CheckValidity();
  },
  methods: {
    toOrgDetails(item) {
      this.$router.push(`/organization/${item}`);
    },
    toEditOrg(item) {
      this.$router.push(`/edit-organization/${item}`);
    },
    activate(item) {
      let orgActiveObj = {};
      orgActiveObj.orgId = item.id;
      orgActiveObj.reason = "null";
      this.$store.getters.client
        .put(`/serveradmin/organization/active`, orgActiveObj)
        .then((response) => {
          item.isActive = true;
          this.$bvToast.toast(response.data.message, {
            title: `Activated`,
            variant: "success",
            solid: true,
          });
        });
    },
    deActivateModal(item) {
      this.modalShow = true;
      this.selectedItem = item;
    },
    deActivate() {
      if (this.reason !== null) {
        let orgObject = {};
        orgObject.orgId = this.selectedItem.id;
        orgObject.reason = this.reason;
        this.$store.getters.client
          .put(`/serveradmin/organization/deactive/`, orgObject)
          .then((response) => {
            this.selectedItem.isActive = false;
            this.$bvToast.toast(response.data.message, {
              title: `Deactivated`,
              variant: "success",
              solid: true,
            });
            this.modalShow = false;
          });
      }
    },
    async getUserList() {
      console.log(":item", this.item);
      await this.$store.getters.client
        .get(`/orguser/byorgid?orgId=${this.item.id}`, {
          headers: {
            orgId: this.item.id
          }
        })
        .then((response) => {
          this.userList = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getProjectList() {
      console.log(":item", this.item);
      await this.$store.getters.client
        .get(`/project/byorgid?orgId=${this.item.id}`, {
          headers: {
            orgId: this.item.id
          }
        }
        )
        .then((response) => {
          this.projectList = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    CheckValidity() {
      let b = new Date(this.item.createdAt);
      let a = b.setFullYear(b.getFullYear() + 1);
      let expiryDate = new Date(a);
      let now = new Date();
      this.months = (expiryDate.getFullYear() - now.getFullYear()) * 12;
      this.months += expiryDate.getMonth() - now.getMonth();
    },
  },
};
</script>

<style lang="scss">
.org-card {
  overflow: hidden;

  .card-body {
    padding: 0;
  }

  .header {
    background: rgba(23, 37, 146, 0.85);
    color: #fff;

    .title {
      font-weight: 700;
      font-size: 15px;
    }
  }

  .details {
    color: #000;
    font-weight: 700;
  }

  .b-dropdown {
    button {
      border: 0;
      padding: 0;
      background: transparent;
      box-shadow: none;

      &:active {
        background: transparent !important;
        box-shadow: none !important;
      }
    }
  }

  .b-dropdown.show {
    button {
      border: 0;
      padding: 0;
      background: transparent;
      box-shadow: none;

      &:active {
        background: transparent !important;
        box-shadow: none !important;
      }
    }
  }

  &.deActive {
    .header {
      background: rgba(23, 37, 146, 0.45);
    }

    .details,
    .footer-details {
      opacity: 0.4;
      background: #f1f1f1;
    }
  }

  &.warningCard {
    .header {
      background-color: rgba(#fcb92c, 1);
    }
  }

  &.dangerCard {
    .header {
      background-color: rgba(#ff3d60, 1);
    }
  }

  .gap-y-3 div {
    margin-bottom: 0.75rem !important;
  }
}
</style>
