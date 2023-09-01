<template>
  <div>
    <PageHeader :icon="'ri-building-4-line h2'" :title="title" :items="items" />
    <b-container>
      <b-card>
        <form @submit.prevent="AddOrg()">
          <div class="form-group">
            <label for="name">Organization Name <span class="text-danger">*</span></label>
            <input v-validate="'required'" required v-model="formData.name" @keydown.space="preventLeadingSpace"
              name="name" type="text" class="form-control" id="name" placeholder="Enter organization name" :class="{
                'is-invalid': submitted && $v.name.$error,
              }" />
            <p class="text-danger text-sm" v-show="errors.has('name') &&
              _.find(errors.items, { field: 'name' }).rule == 'required'
              ">
              <span>Organization name field is required</span>
            </p>
          </div>
          <div class="form-group">
            <label for="email">Organization Email <span class="text-danger">*</span></label>
            <input v-validate="'required|email'" required v-model="formData.email" @keydown.space="preventLeadingSpace"
              name="email" type="email" class="form-control" id="email" placeholder="Enter organization email"
              :class="{ 'is-invalid': submitted && $v.email.$error }" />
            <p class="text-danger text-sm" v-show="errors.has('email') &&
              _.find(errors.items, { field: 'email' }).rule == 'required'
              ">
              <span>Organization email field is required</span>
            </p>
            <p class="text-danger text-sm" v-show="errors.has('email') &&
              _.find(errors.items, { field: 'email' }).rule == 'email'
              ">
              Organization email must be a valid email address (e.g.
              example@domain.com)
            </p>
          </div>
          <div class="form-group">
            <label for="contact">Organization Contact Number
              <span class="text-danger">*</span></label>
            <div class="input-group">
              <div class="input-group-prepend">
                <select v-model="orgCountryCode" required name="orgCountryCode" class="form-control">
                  <option value="+1">+1 (US)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+91">+91 (India)</option>
                  <!-- Add more options for other countries -->
                </select>
              </div>
              <input v-validate="'required|verify_contact_number'" v-model="formData.contact" required name="contact"
                type="number" class="form-control" id="contact" placeholder="Enter organization contact number" :class="{
                  'is-invalid': submitted && $v.contact.$error,
                }" />
            </div>
            <p class="text-danger text-sm" v-show="errors.has('contact') &&
              _.find(errors.items, { field: 'contact' }).rule == 'required'
              ">
              <span>Organization contact number is required</span>
            </p>
            <p class="text-danger text-sm" v-show="errors.has('contact') &&
              _.find(errors.items, { field: 'contact' }).rule ==
              'verify_contact_number'
              ">
              {{ errors.first("contact") }}
            </p>
          </div>
          <div class="form-group" v-if="!this.isEdit">
            <label for="adminName">Organization Admin Name <span class="text-danger">*</span></label>
            <input v-validate="'required'" v-model="formData.adminName" required @keydown.space="preventLeadingSpace"
              name="adminName" type="text" class="form-control" id="adminName" placeholder="Enter admin name" :class="{
                'is-invalid': submitted && $v.adminName.$error,
              }" />
            <p class="text-danger text-sm" v-show="errors.has('adminName') &&
              _.find(errors.items, { field: 'adminName' }).rule == 'required'
              ">
              <span>Organization Admin name field is required</span>
            </p>
          </div>
          <div class="form-group" v-if="!this.isEdit">
            <label for="adminEmail">
              Organization Admin Email <span class="text-danger">*</span>
            </label>
            <input v-validate="'required|email'" v-model="formData.adminEmail" @keydown.space="preventLeadingSpace"
              required name="adminEmail" type="email" class="form-control" id="adminEmail"
              placeholder="Enter organization admin email" :class="{ 'is-invalid': submitted && $v.adminEmail.$error }" />
            <p class="text-danger text-sm" v-show="errors.has('adminEmail') &&
              _.find(errors.items, { field: 'adminEmail' }).rule == 'required'
              ">
              <span>Organization admin email field is required</span>
            </p>
            <p class="text-danger text-sm" v-show="errors.has('adminEmail') &&
              _.find(errors.items, { field: 'adminEmail' }).rule == 'email'
              ">
              Organization admin email must be a valid email address (e.g.
              example@domain.com)
            </p>
          </div>

          <div class="form-group" v-if="!this.isEdit">
            <label for="password">Organization Admin Password
              <span class="text-danger">*</span></label>
            <input v-validate="'required|verify_password'" v-model="formData.adminPassword" required name="password"
              @keydown.space="preventLeadingSpace" type="password" class="form-control" id="password"
              placeholder="Enter organization Admin password" :class="{
                'is-invalid': submitted && $v.password.$error,
              }" ref="password" />
            <p class="text-danger text-sm" v-show="errors.has('password') &&
              _.find(errors.items, { field: 'password' }).rule == 'required'
              ">
              <span>Organization Admin password field is required</span>
            </p>
            <p class="text-danger text-sm" v-show="errors.has('password') &&
              _.find(errors.items, { field: 'password' }).rule ==
              'verify_password'
              ">
              {{ errors.first("password") }}
            </p>
          </div>
          <div class="form-group" v-if="!this.isEdit">
            <label for="adminContact">Organization Admin Contact Number
              <span class="text-danger">*</span></label>
            <div class="input-group">
              <div class="input-group-prepend">
                <select v-model="adminCountryCode" name="adminCountryCode" class="form-control" required>
                  <option value="+1">+1 (US)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+91">+91 (India)</option>
                  <!-- Add more options for other countries -->
                </select>
              </div>
              <input v-validate="'required|verify_contact_number'" v-model="formData.adminContact" required
                name="adminContact" type="number" class="form-control" id="adminContact"
                placeholder="Enter organization admin contact number" :class="{
                  'is-invalid': submitted && $v.adminContact.$error,
                }" />
            </div>
            <p class="text-danger text-sm" v-show="errors.has('adminContact') &&
              _.find(errors.items, { field: 'adminContact' }).rule ==
              'required'
              ">
              <span>Organization admin contact number is required</span>
            </p>
            <p class="text-danger text-sm" v-show="errors.has('adminContact') &&
              _.find(errors.items, { field: 'adminContact' }).rule ==
              'verify_contact_number'
              ">
              {{ errors.first("adminContact") }}
            </p>
          </div>
          <div class="form-group" v-if="!this.isEdit">
            <label for="githubUsername">Github Username </label>
            <input v-validate="'required|github_username'" required v-model="formData.githubUsername"
              name="githubUsername" type="text" @keydown.space="preventLeadingSpace" class="form-control"
              id="githubUsername" placeholder="Enter github username" :class="{
                'is-invalid': submitted && $v.githubUsername.$error,
              }" />
            <p class="text-danger text-sm" v-show="errors.has('githubUsername') &&
              _.find(errors.items, { field: 'githubUsername' }).rule ==
              'required'
              ">
              <span>The GitHub username must be a valid username</span>
            </p>
            <p class="text-danger text-sm" v-show="errors.has('githubUsername') &&
              _.find(errors.items, { field: 'githubUsername' }).rule ==
              'github_username'
              ">
              {{ errors.first("githubUsername") }}
            </p>
          </div>
          <div class="form-group" v-if="!this.isEdit">
            <label for="githubUrl">Organization Admin Github URL</label>
            <input v-validate="'required|verify_github_username_url'" @keydown.space="preventLeadingSpace"
              v-model="formData.orgGithubURL" required name="githubUrl" type="text" class="form-control" id="githubUrl"
              placeholder="Enter organization admin GitHub URL" :class="{
                'is-invalid': submitted && $v.githubUrl.$error,
              }" />
            <p class="text-danger text-sm" v-show="errors.has('githubUrl') &&
              _.find(errors.items, { field: 'githubUrl' }).rule == 'required'
              ">
              <span>Github URL must be a valid URL</span>
            </p>
            <p class="text-danger text-sm" v-show="errors.has('githubUrl') &&
              _.find(errors.items, { field: 'githubUrl' }).rule ==
              'verify_github_username_url'
              ">
              {{ errors.first("githubUrl") }}
            </p>
          </div>
          <div class="form-group">
            <label for="adminHostURL">Hosted Admin URL <span class="text-danger">*</span></label>
            <input v-validate="'required|url'" required v-model="formData.adminHostURL" name="adminHostURL" type="text"
              class="form-control" id="adminHostURL" placeholder="Enter hosted Admin URL"
              :class="{ 'is-invalid': submitted && $v.hostedUrl.$error }" />
            <p class="text-danger text-sm"
              v-show="errors.has('adminHostURL') && _.find(errors.items, { field: 'adminHostURL' }).rule == 'required'">
              <span>Hosted Admin URL field is required</span>
            </p>
            <p class="text-danger text-sm"
              v-show="errors.has('adminHostURL') && _.find(errors.items, { field: 'adminHostURL' }).rule == 'url'">
              Hosted Admin URL must be a valid URL
            </p>
          </div>
          <div class="form-group">
            <label for="userHostURL">Hosted User URL <span class="text-danger">*</span></label>
            <input v-validate="'required|url'" required v-model="formData.userHostURL" name="userHostURL" type="text"
              class="form-control" id="userHostURL" placeholder="Enter hosted User URL"
              :class="{ 'is-invalid': submitted && $v.userHostURL.$error }" />
            <p class="text-danger text-sm"
              v-show="errors.has('userHostURL') && _.find(errors.items, { field: 'userHostURL' }).rule == 'required'">
              <span>Hosted User URL field is required</span>
            </p>
            <p class="text-danger text-sm"
              v-show="errors.has('userHostURL') && _.find(errors.items, { field: 'userHostURL' }).rule == 'url'">
              Hosted User URL must be a valid URL
            </p>
          </div>
          <div class="form-group">
            <label for="domain_name">Domain Name <span class="text-danger">*</span></label>
            <input v-validate="'required|accessURL'" required v-model="formData.accessURL"
              @keydown.space="preventLeadingSpace" name="accessURL" type="text" class="form-control" id="accessURL"
              placeholder="Enter domain name" :class="{ 'is-invalid': submitted && $v.accessURL.$error }" />
            <p class="text-danger text-sm" v-show="errors.has('accessURL') &&
              _.find(errors.items, { field: 'accessURL' }).rule ==
              'required'
              ">
              Domain name field is required
            </p>
            <p class="text-danger text-sm" v-show="errors.has('accessURL') &&
              _.find(errors.items, { field: 'accessURL' }).rule ==
              'accessURL'
              ">
              Domain name must be a valid domain name (e.g. example.com)
            </p>
          </div>

          <div class="form-group row">
            <label class="col-md-2 col-form-label">DITA-OT <span class="text-danger">*</span></label>
            <div class="col-md-10">
              <select class="form-control" v-model="formData.ditaotVersion" required :value="formData.ditaotVersion"
                placeholder="Select DITA-OT version">
                <option value="" disabled selected>Select DITA-OT version</option>
                <option v-for="(version, index) in ditaotVersions" :key="index" :value="version.value">
                  {{ version.text }}
                </option>
              </select>
            </div>
          </div>

          <div class="d-flex mb-3">
            <span class="mr-5">Apps: <span class="text-danger">*</span> </span>
            <b-form-checkbox disabled id="docManager" v-model="formData.docManager" name="docManager" value="true"
              unchecked-value="false" class="mr-5">
              DocManager
            </b-form-checkbox>

            <b-form-checkbox id="editor" v-model="formData.editor" name="editor" value="true" unchecked-value="false"
              class="mr-5">
              DocEditor
            </b-form-checkbox>

            <b-form-checkbox id="publish" v-model="formData.publisher" name="publish" value="true" unchecked-value="false"
              class="mr-5">
              DocPublisher
            </b-form-checkbox>
            <b-form-checkbox id="Docmigration" v-model="formData.docMigration" name="docMigration" value="true"
              class="mr-5">
              DocMigration
            </b-form-checkbox>
          </div>
          <div v-if="showDocMigration" class="form-group row">
            <label class="col-md-2 col-form-label">Select Word to DITA</label>
            <div class="col-md-10">
              <select v-model="formData.docMigrationType" required class="form-control">
                <option value="" disabled selected>Select DITA-OT version</option>
                <option v-for="(option, index) in DocMigrationOptions" :value="formData.docMigrationType"
                  :key="'option_' + index">
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>
          <div class="d-flex">
            <div>
              <span class="mr-5">Subscribe: <span class="text-danger">*</span>
              </span>
            </div>
            <b-form-radio-group v-model="selectedPlan" :options="plans" class="mb-3" value-field="title"
              text-field="title" required></b-form-radio-group>
          </div>
          <div class="form-group" v-if="showEnterprise">
            <label>Admin <span class="text-danger">*</span></label>
            <input v-model="formData.numberofAdmin" type="number" class="form-control" required />
          </div>
          <div class="form-group" v-if="showEnterprise">
            <label>Users <span class="text-danger">*</span></label>
            <input v-model="formData.numberofUser" type="number" class="form-control" required />
          </div>
          <div class="form-group mb-0 d-flex justify-content-end">
            <div class="text-right d-flex justify-content-around ">
              <button type="submit" class="btn btn-primary">Submit</button>
              <button @click="resetForm" class="btn btn-secondary mx-2">
                Reset
              </button>
            </div>
          </div>
        </form>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import VeeValidate from "vee-validate";
import _ from "lodash";
import PageHeader from "@/components/page-header";
export default {
  components: {
    PageHeader,
  },
  data() {
    return {
      // pageOptions: ["3.2", "3.6"],
      title: "Add organization",
      items: [
        {
          text: "Dashboard",
          href: "/"
        },

        {
          text: "Add organization",
          active: true
        }
      ],
      orgCountryCode: "+91",
      adminCountryCode: "+91",
      ditaotVersions: [],
      selectedPlan: null,
      isEdit: false,
      id: null,
      formData: {
        customId: "",
        email: "",
        name: "",
        orgGithubURL: "",
        ditaotVersion: "",
        isDomainVerified: false,
        isEmailVerified: true,
        isActive: true,
        accessURL: "",
        docManager: true,
        editor: false,
        publisher: false,
        docMigration: false,
        docMigrationType: [],
        contact: "",
        planId: "",
        adminEmail: "",
        githubUsername: "",
        adminPassword: "",
        adminName: "",
        isActiveAdmin: true,
        adminContact: "",
        numberofAdmin: null,
        numberofUser: null,
        adminHostURL: "",
        userHostURL:"" 
      },
      organizationData: [],
      DocMigrationOptions: [
        { value: "Word to DITA", label: "Word to DITA", },
      ],
      selectedMigrationOption: null,
      plans: [],
      typesubmit: false,
      showEnterprise: false,
      showDocMigration: false,
      submitted: false,
    };
  },
  watch: {
    selectedPlan(newValue) {
      if (newValue === "Enterprise") {
        this.showEnterprise = true;
      } else {
        this.showEnterprise = false;
      }
    },
    "formData.docMigration": function (newVal) {
      if (!newVal) {
        this.showDocMigration = false;
      } else {
        this.showDocMigration = true;
      }
    },
  },
  mounted() {
    this.getSubscriptionPlans();
    if (this.isEdit === true) {
      this.getOrganizationData();
      this.getSubscriptionPlans();
    }
    this.getditaotVersions();
  },
  computed: {
    _() {
      return _;
    },
  },
  methods: {
    preventLeadingSpace(e) {
      // only prevent the keypress if the value is blank
      if (!e.target.value) e.preventDefault();
      // otherwise, if the leading character is a space, remove all leading white-space
      else if (e.target.value[0] == " ")
        e.target.value = e.target.value.replace(/^\s*/, "");
    },
    messageToast(messageToastTitle, messageToastVariant, messageToastContent) {
      this.$bvToast.toast(messageToastContent, {
        title: messageToastTitle,
        variant: messageToastVariant,
        solid: true,
      });
    },
    resetForm() {
      (this.formData.customId = ""),
        (this.formData.email = ""),
        (this.formData.adminHostURL= ""),
        (this.formData.userHostURL= ""),
        (this.formData.name = ""),
        (this.formData.orgGithubURL = ""),
        (this.formData.ditaotVersion = ""),
        (this.formData.isDomainVerified = false),
        (this.formData.isEmailVerified = true),
        (this.formData.isActive = true),
        (this.formData.accessURL = ""),
        (this.formData.docManager = true),
        (this.formData.editor = false),
        (this.formData.publisher = false),
        (this.formData.docMigration = false),
        (this.formData.contact = ""),
        (this.formData.planId = ""),
        (this.formData.adminEmail = ""),
        (this.formData.githubUsername = ""),
        (this.formData.adminPassword = ""),
        (this.formData.adminName = ""),
        (this.formData.isActiveAdmin = true),
        (this.formData.adminContact = ""),
        (this.formData.numberofAdmin = null),
        (this.formData.numberofUser = null);
      (this.selectedPlan = null);
    },
    async getOrganizationData() {
      let loader = this.$loading.show({
        loader: "dots",
      });
      await this.$store.getters.client
        .get("/serveradmin/organization/")
        .then((response) => {
          console.log("getOrganizationData", response.data);
          this.organizationData = response.data;
          this.formData.docMigrationType = this.organizationData.map((ele) => {
            return ele.docMigrationType
          })[0].toString()
          let org = this.organizationData.find((item) => {
            return item.id === this.id;
          });
          this.formData = org;
          if (org.planId === "63f32654b34267220801f2e3") {
            this.selectedPlan = "Basic"
          } else if (org.planId === "63f32674b34267220801f2e4") {
            this.selectedPlan = "Silver"
          } else if (org.planId === "63f32691b34267220801f2e5") {
            this.selectedPlan = "Gold"
          } else {
            this.selectedPlan = "Enterprise"
          }
          console.log("el.planId", this.selectedPlan);
          console.log("org", org.planId);
          loader.hide();
        })
        .catch((err) => {
          console.log(err);
          loader.hide();
        });
    },
    async getSubscriptionPlans() {
      await this.$store.getters.client
        .get("/serveradmin/subscriptionplan/")
        .then((response) => {
          this.plans = response.data;
          if (this.isEdit === true) {
            this.plans = response.data
          }
         
        });
    },
    // eslint-disable-next-line no-dupe-keys
    async AddOrg() {
      var planID = this.selectedPlan;
      var newArray = this.plans.filter(function (el) {
        return el.title === planID;
      });
      this.formData.planId = newArray[0].id;
      console.log(newArray, "newArray");
      if (newArray.length > 0) {
        if (planID !== "Enterprise") {
          this.formData.numberofAdmin = newArray[0].adminCount;
          this.formData.numberofUser = newArray[0].userCount;
        }
        this.formData.planId = newArray[0].id;
        var setPlanData = {
          orgId: "",
          planId: newArray[0].id,
          numberofUser: newArray[0].userCount,
          numberofAdmin: newArray[0].adminCount,
        };
      }
      let loader = this.$loading.show({
        loader: "dots",
      });
      if (this.isEdit === false) {
        let idText = this.formData.name.substring(0, 3);
        let idNumber = Math.floor(Math.random() * (999 - 100 + 1) + 100);
        this.formData.customId = idText + idNumber + "dita";
        loader.hide();
        await this.$validator.validateAll().then((result) => {
          if (result) {
            let loader = this.$loading.show({
              loader: "dots",
            });
            console.log("this.formData", this.formData);
            this.$store.getters.client
              .post("/serveradmin/organization/", this.formData)
              .then((response) => {
                if (planID === "Enterprise") {
                  setPlanData.numberofAdmin = parseInt(
                    this.formData.numberofAdmin
                  );
                  setPlanData.numberofUser = parseInt(
                    this.formData.numberofUser
                  );
                }
                console.log("resss", response.data.id);
                setPlanData.orgId = response.data.id;
                this.$store.getters.client
                  .post("/orguser/register", setPlanData)
                  .then((response) => {
                    loader.hide();
                    this.messageToast(
                      "Success",
                      "success",
                      `Organization has been added successfully.`
                    );
                    console.log(response);
                    setTimeout(() => {
                      this.$router.push("/organization");
                    }, 1000);
                  })
                  .catch((error) => {
                    console.log(error);
                    loader.hide();
                    this.messageToast(
                      "Error",
                      "danger",
                      "Unable to add the organization. Please check the input fields and try again."
                    );
                  });
              })
              .catch((error) => {
                console.log(error);
                this.messageToast(
                  "Error",
                  "danger",
                  error.response.data.message
                );
                loader.hide();
                this.messageToast(
                  "Error",
                  "danger",
                  "Unable to add the organization. Please check the input fields and try again."
                );
              });
          } else {
            loader.hide();
          }
        });
      } else {
        loader.hide();
        console.log("EDIT FORM ", this.formData);
        this.$validator.validateAll().then((result) => {
          if (result) {
            let loader = this.$loading.show({
              loader: "dots",
            });
            this.$store.getters.client
              .put(`/serveradmin/organization?orgId=${this.id}`, this.formData)
              .then((response) => {
                console.log(response);
                loader.hide();
                this.messageToast(
                  "Success",
                  "success",
                  `Organization details have been edited successfully.`
                );
                setTimeout(() => {
                  this.$router.push("/organization");
                }, 1000);
              })
              .catch((error) => {
                loader.hide();
                console.log(error);
                this.messageToast(
                  "Error",
                  "danger",
                  error.response.data.message
                );
              });
          } else {
            loader.hide();
          }
        });
      }
    },
    async getditaotVersions() {
      this.$store.getters.client
        .get("/serveradmin/ditaotversion")
        .then((res) => {
          res.data.forEach((element) => {
            this.ditaotVersions.push({
              value: element.versionLabel,
              text: element.versionLabel,
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  created() {
    if ("id" in this.$route.params) {
      this.isEdit = true;
      this.id = this.$route.params.id;
      this.title = "Update organization";
    } else {
      this.isEdit = false;
      this.title = "Add a new organization";
    }

    VeeValidate.Validator.extend("verify_password", {
      getMessage: () =>
        `Password must contain at least: minimum 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)`,
      validate: (value) => {
        var strongRegex = new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})"
        );
        return strongRegex.test(value);
      },
    });
    VeeValidate.Validator.extend("verify_contact_number", {
      getMessage: () =>
        "Contact number must be a 10-digit phone number (e.g. 555-555-5555)",
      validate: (value) => {
        const contactNumberRegex = new RegExp(/^\d{10}$/);
        return contactNumberRegex.test(value);
      },
    });
    /*This custom validation rule will ensure that the URL provided matches the format of a GitHub repository URL.The regular expression in the validate function matches URLs in the format https://github.com/user/repo or https://github.com/user/repo.git. */
    VeeValidate.Validator.extend("github_username", {
      getMessage: () =>
        `Github username field must be a valid GitHub username (consisting of alphanumeric characters, hyphens, and/or underscores, and between 1 and 39 characters in length)`,
      validate: (value) => {
        const githubUsernameRegex = /^[a-zA-Z0-9_-]{1,39}$/;
        return githubUsernameRegex.test(value);
      },
    });
    VeeValidate.Validator.extend("verify_github_username_url", {
      getMessage: () =>
        "URL must be a valid GitHub username URL (e.g. https://github.com/username)",
      validate: (value) => {
        const gitHubUsernameUrlRegex = new RegExp(
          "^(https://github.com/)([a-zA-Z0-9-_]+)(/[a-zA-Z0-9-_]+)*$"
        );
        return gitHubUsernameUrlRegex.test(value);
      },
    });
    VeeValidate.Validator.extend("url", {
      getMessage: () => "The field must be a valid URL",
      validate: (value) => {
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlRegex.test(value);
      },
    });

    VeeValidate.Validator.extend("accessURL", {
      getMessage: () =>
        `Domain name field must be a valid domain name (consisting of alphanumeric characters, hyphens, and/or periods, and between 2 and 63 characters in length, and not starting or ending with a hyphen or period)`,
      validate: (value) => {
        const domainNameRegex = /^[a-zA-Z0-9]+([-.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,63}$/;
        return domainNameRegex.test(value);
      },
    });
  },
};
</script>
<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}
</style>
