<template>
 <b-container>
    <b-card :title="title">
      <form @submit.prevent="Form()">
        <div class="form-group">
          <label>Organization Name <span class="text-danger">*</span></label>
          <input
            v-model="formData.name"
            type="text"
            class="form-control"
            name="name"
            required
          />
        </div>
        <div class="form-group">
          <label>Organization Email <span class="text-danger">*</span></label>
          <input
            v-model="formData.email"
            type="text"
            class="form-control"
            name="email"
            required
          />
        </div>
        <div class="form-group">
          <label
            >Organization Contact Number
            <span class="text-danger">*</span></label
          >
          <input
            v-model="formData.contact"
            type="text"
            class="form-control"
            name="phone"
            required
          />
        </div>
        <div class="form-group">
          <label
            >Organization Github URL <span class="text-danger">*</span></label
          >
          <input
            v-model="formData.orgGithubURL"
            type="text"
            class="form-control"
            name="admin"
            required
          />
        </div>
        <div class="form-group">
          <label
            >Organization DITA Version <span class="text-danger">*</span></label
          >
          <input
            v-model="formData.ditaotVersion"
            type="text"
            class="form-control"
            name="adminEmail"
            required
          />
        </div>
        <div class="form-group">
          <label
            >Organization access URL <span class="text-danger">*</span></label
          >
          <input
            v-model="formData.accessURL"
            type="text"
            class="form-control"
            name="password"
            required
          />
        </div>
        <div class="form-group">
          <label>DITAxPresso AppId<span class="text-danger">*</span></label>
          <input
            v-model="formData.customId"
            type="text"
            class="form-control"
            name="appId"
            required
          />
        </div>

        <div class="d-flex mb-3">
          <b-form-checkbox
            id="docManager"
            v-model="formData.docManager"
            name="docManager"
            value="true"
            unchecked-value="false"
            class="mr-5"
          >
            DocManager
          </b-form-checkbox>

          <b-form-checkbox
            id="editor"
            v-model="formData.editor"
            name="editor"
            value="true"
            unchecked-value="false"
            class="mr-5"
          >
            Editor
          </b-form-checkbox>

          <b-form-checkbox
            id="publish"
            v-model="formData.publisher"
            name="publish"
            value="true"
            unchecked-value="false"
          >
            Publisher
          </b-form-checkbox>
        </div>

        <div>
          <b-form-radio-group
            v-model="formData.planId"
            :options="plans"
            class="mb-3"
            value-field="id"
            text-field="title"
            required
          ></b-form-radio-group>
        </div><div class="form-group mb-0">
          <div class="text-center">
            <button
              type="submit"
              class="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      isEdit: false,
      id: null,
      title:'',
      formData: {
        customId: "",
        email: "",
        name: "",
        orgGithubURL: "",
        ditaotVersion: "",
        accessURL: "",
        docManager: "false",
        editor: "false",
        publisher: "false",
        contact: "",
        planId: "",
        isActive:"true",
        isEmailVerified: "false",
        isDomainVerified:'false'
      },
      organizationData:[],
      plans: [],
      typesubmit: false,
    };
  },
  mounted() {
    this.getSubscriptionPlans();
    if(this.isEdit === true){
      this.getOrganizationData();
    }
  },
  methods: {
    async getOrganizationData() {
      let loader = this.$loading.show({
        loader: "dots",
      });

      await this.$store.getters.client
        .get("/orgadmin/register")
        .then((response) => {
          this.organizationData = response.data;
          let org = this.organizationData.find((item)=>{
            return item.id === this.id
          })
          this.formData = org
          loader.hide();
        })
        .catch((err)=>{
          console.log(err)
          loader.hide();
        });
    },
    async getSubscriptionPlans() {
      await this.$store.getters.client
        .get("/serveradmin/subscriptionplan/")
        .then((response) => {
          console.log(response.data);
          this.plans = response.data;
        })
        
    },
    // eslint-disable-next-line no-dupe-keys
    async AddOrg() {
      console.log(this.formData);
      let loader = this.$loading.show({
        loader: "dots",
      });
      if(this.isEdit === false){
        this.$store.getters.client
          .post("/orgadmin/register", this.formData)
          .then(() => {
            this.$router.push('/organization')
            loader.hide();
          })
          .catch((err)=>{
            console.log(err)
            loader.hide();
          });
      }else{
        this.$store.getters.client
          .put(`/orgadmin/register`, this.formData)
          .then(() => {
            this.$router.push('/organization')
            loader.hide();
          })
          .catch((err)=>{
            console.log(err)
            loader.hide();
          });
      }
    },
  },

  created() {
    if ("id" in this.$route.params) {
      this.isEdit = true;
      this.id = this.$route.params.id;
      this.title = 'Update organization'
    } else {
      this.isEdit = false;
      this.title = 'Add a new organization'
    }
  },
};
</script>