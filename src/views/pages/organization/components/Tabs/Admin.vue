<template>
  <b-card>
    <div class="row mb-2" v-if="adminDetails.numberofAdmin === admins.length">
      <div class="col-12">
        <div class="text-center">
          <div class="row">
            <div class="col-md-12">
              <div
                class="mt-1 maintenance-box"
                style="border: 1px solid #ff3d60; border-radius: 0px 0px 4px 4px;"
              >
                <div class="p-3">
                  <div class="avatar-sm mx-auto">
                    <span class="avatar-title bg-soft-danger rounded-circle">
                      <i
                        class="mdi mdi-account-off-outline mdi-36px font-size-24 text-danger"
                      ></i>
                    </span>
                  </div>
                  <h3 class="mt-4">Max Admin Limit Reached</h3>
                  <h5 class="font-size-15 text-uppercase mt-3">
                    Do you need Support?
                  </h5>
                  <p class="text-muted mb-0">
                    If you want to increase admin limit, you need to contact
                    administrator using this email..
                    <a
                      href="mailto:support@ditaxpresso.com"
                      class="text-decoration-underline"
                      >support@ditaxpresso.com</a
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- end row -->
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between admin-page">
      <h3 class="d-flex align-items-center">
        <i class="mdi mdi-account mr-3"></i> <span>ADMIN</span>
      </h3>
      <b-button
        :disabled="adminDetails.numberofAdmin === admins.length"
        id="show-btn"
        @click="showModal = true"
        class="btn"
        >Add Admin</b-button
      >
    </div>

    <div class="card">
      <div class="card-body">
        <div class="row mt-4">
          <div class="col-sm-12 col-md-6">
            <div id="tickets-table_length" class="dataTables_length">
              <label class="d-inline-flex align-items-center">
                Show&nbsp;
                <b-form-select
                  v-model="perPage"
                  size="sm"
                  :options="pageOptions"
                ></b-form-select
                >&nbsp;entries
              </label>
            </div>
          </div>
          <!-- Search -->
          <div class="col-sm-12 col-md-6">
            <div
              id="tickets-table_filter"
              class="dataTables_filter text-md-right"
            >
              <label class="d-inline-flex align-items-center">
                Search:
                <b-form-input
                  v-model="filter"
                  type="search"
                  placeholder="Search..."
                  class="form-control form-control-sm ml-2"
                ></b-form-input>
              </label>
            </div>
          </div>
          <!-- End search -->
        </div>
        <!-- Table -->
        <div class="table-responsive mb-0">
          <b-table
            :filter="filter"
            sticky-header
            :items="admins"
            :fields="fields"
            responsive="sm"
            :per-page="perPage"
            :current-page="currentPage"
          >
            <template v-slot:cell(action)="row" class="text-right">
              <a
                class="mr-3 text-primary"
                v-b-tooltip.hover
                data-toggle="tooltip"
                title="Edit"
                @click="edit(row)"
              >
                <i class="mdi mdi-pencil font-size-18"></i>
              </a>
              <a
                href="javascript:void(0);"
                class="text-danger"
                v-b-tooltip.hover
                title="Delete"
              >
                <i
                  @click="confirm(row)"
                  class="mdi mdi-trash-can font-size-18"
                ></i>
              </a>
            </template>
          </b-table>
        </div>
        <div class="row">
          <div class="col">
            <div class="dataTables_paginate paging_simple_numbers float-right">
              <ul class="pagination pagination-rounded mb-0">
                <!-- pagination -->
                <b-pagination
                  v-model="currentPage"
                  :total-rows="rows"
                  :per-page="4"
                ></b-pagination>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal id="bv-modal-example" v-model="showModal" hide-footer>
      <div class="org-details row mb-4">
        <div class="col-md-7">
          <h4 class="mb-2">ADD ORGANIZATION ADMIN</h4>
        </div>
        <div class="col-md-6 text">
          <div class="d-flex justify-content-between admin-page">
            <h3 class="d-flex align-items-center"></h3>
          </div>
        </div>
      </div>
      <form action="#" @submit.prevent="addAdmin()">
        <div class="form-group">
          <label>Organization ID <span class="text-danger">*</span></label>
          <input
            v-model="formData.orgId"
            type="text"
            class="form-control"
            readonly
          />
        </div>
        <div class="form-group">
          <label for="name"
            >Organization Admin Name <span class="text-danger">*</span></label
          >
          <input
            v-validate="'required'"
            required
            v-model="formData.name"
            @keydown.space="preventLeadingSpace"
            name="name"
            type="text"
            class="form-control"
            id="name"
            placeholder="Enter organization name"
            :class="{
              'is-invalid': submitted && $v.name.$error,
            }"
          />
          <p
            class="text-danger text-sm"
            v-show="
              errors.has('name') &&
                _.find(errors.items, { field: 'name' }).rule == 'required'
            "
          >
            <span>Organization name field is required</span>
          </p>
        </div>
        <div class="form-group">
          <label for="email">
            Organization Admin Email <span class="text-danger">*</span>
          </label>
          <input
            v-validate="'required|email'"
            v-model="formData.email"
            required
            @keydown.space="preventLeadingSpace"
            name="email"
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter organization admin email"
            :class="{ 'is-invalid': submitted && $v.email.$error }"
          />
          <p
            class="text-danger text-sm"
            v-show="
              errors.has('email') &&
                _.find(errors.items, { field: 'email' }).rule == 'required'
            "
          >
            <span>Organization Admin email field is required</span>
          </p>
          <p
            class="text-danger text-sm"
            v-show="
              errors.has('email') &&
                _.find(errors.items, { field: 'email' }).rule == 'email'
            "
          >
            Organization Admin email must be a valid email address (e.g.
            example@domain.com)
          </p>
        </div>
        <div class="form-group">
          <label for="password"
            >Organization Admin Password
            <span class="text-danger">*</span></label
          >
          <input
            v-validate="'required|verify_password'"
            v-model="formData.password"
            required
            name="password"
            @keydown.space="preventLeadingSpace"
            type="password"
            class="form-control"
            id="password"
            placeholder="Enter organization admin password"
            :class="{
              'is-invalid': submitted && $v.password.$error,
            }"
            ref="password"
          />
          <p
            class="text-danger text-sm"
            v-show="
              errors.has('password') &&
                _.find(errors.items, { field: 'password' }).rule == 'required'
            "
          >
            <span>Organization admin password field is required</span>
          </p>
          <p
            class="text-danger text-sm"
            v-show="
              errors.has('password') &&
                _.find(errors.items, { field: 'password' }).rule ==
                  'verify_password'
            "
          >
            {{ errors.first("password") }}
          </p>
        </div>
        <div class="form-group">
          <label for="adminContact"
            >Organization Admin Contact Number
            <span class="text-danger">*</span></label
          >
          <div class="input-group">
            <div class="input-group-prepend">
              <select
                v-model="adminCountryCode"
                name="adminCountryCode"
                class="form-control"
                required
              >
                <option value="+1">+1 (US)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+91">+91 (India)</option>
                <!-- Add more options for other countries -->
              </select>
            </div>
            <input
              v-validate="'required|verify_contact_number'"
              v-model="formData.contact"
              name="contact"
              type="number"
              required
              @keydown.space="preventLeadingSpace"
              class="form-control"
              id="contact"
              placeholder="Enter organization admin contact number"
              :class="{
                'is-invalid': submitted && $v.contact.$error,
              }"
            />
          </div>
          <p
            class="text-danger text-sm"
            v-show="
              errors.has('contact') &&
                _.find(errors.items, { field: 'contact' }).rule == 'required'
            "
          >
            <span>Organization Admin contact number is required</span>
          </p>
          <p
            class="text-danger text-sm"
            v-show="
              errors.has('contact') &&
                _.find(errors.items, { field: 'contact' }).rule ==
                  'verify_contact_number'
            "
          >
            {{ errors.first("contact") }}
          </p>
        </div>
        <div class="form-group">
          <label for="githubUsername">Github Username </label>
          <input
            v-validate="'required|verify_github_username'"
            required
            v-model="formData.githubUsername"
            name="githubUsername"
            type="text"
            @keydown.space="preventLeadingSpace"
            class="form-control"
            id="githubUsername"
            placeholder="Enter github username"
            :class="{
              'is-invalid': submitted && $v.githubUsername.$error,
            }"
          />
          <p
            class="text-danger text-sm"
            v-show="
              errors.has('githubUsername') &&
                _.find(errors.items, { field: 'githubUsername' }).rule ==
                  'required'
            "
          >
            <span>GitHub URL must be a valid URL</span>
          </p>
          <p
            class="text-danger text-sm"
            v-show="
              errors.has('githubUsername') &&
                _.find(errors.items, { field: 'githubUsername' }).rule ==
                  'verify_github_username'
            "
          >
            {{ errors.first("githubUsername") }}
          </p>
        </div>
        <div class="form-group mb-0">
          <div class="text-right">
            <b-button type="submit" variant="primary">Submit</b-button>
            <button @click="resetForm" class="btn btn-secondary m-l-5 ml-1">
              Reset
            </button>
          </div>
        </div>
      </form>
    </b-modal>
  </b-card>
</template>

<script>
import {
  required,
  email,
  minLength,
  numeric,
  url,
} from "vuelidate/lib/validators";
import VeeValidate from "vee-validate";
import _ from "lodash";
export default {
  props: {
    adminDetails: {
      type: Object,
    },
  },
  data() {
    return {
      filter: "",
      pageOptions: [5, 10, 25, 50, 100],
      submitted:false,
      adminCountryCode: "+91",
      fields: [
        { key: "name", sortable: true },
        { key: "email", sortable: true },
        { key: "contact", sortable: true },
        { key: "isActive", sortable: true },
      ],
      currentPage: 1,
      perPage: 5,
      admins: [],
      showModal: false,
      formData: {
        orgId: "",
        email: "",
        password: "",
        name: "",
        isActive: false,
        contact: "",
        isChangePassword: false,
        formData: "",
      },
    };
  },
  mounted() {
    console.log("adminDetailsadminDetails", this.adminDetails);
    this.getOrganizationAdmin();
  },
  validations: {
    typeform: {
      id: { required, numeric },
      name: { required, minLength: minLength(3) },
      email: { required, email },
      phone: { required, numeric },
      admin: { required, minLength: minLength(3) },
      adminEmail: { required, email },
      password: { required, minLength: minLength(8) },
      adminPhone: { required, numeric },
      githubUsername: { required },
      git: { required },
      appId: { required, url },
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
    resetForm(){
      this.formData.name = "";
          this.formData.email = "";
          this.formData.password = "";
          this.formData.contact = "";
          this.formData.githubUsername = "";
    },
    async getOrganizationAdmin() {
      let loader = this.$loading.show({
        loader: "dots",
      });

      await this.$store.getters.client
        .get(`/orgadmin/byorgid?orgId=${this.$route.params.id}`,{
          headers: {
            orgId: this.$route.params.id
          }
        })
        .then((response) => {
          console.log(response);
          this.admins = response.data;
          loader.hide();
        })
        .catch((err) => {
          console.log(err);
          loader.hide();
        });
    },
    addAdmin() {
      this.$validator.validateAll().then((result)=>{
        if(result){
          let loader = this.$loading.show({
            loader:"dots",
          });
          this.$store.getters.client
        .post(`/orgadmin/register`, this.formData)
        .then((response) => {
          console.log(response);
          this.getOrganizationAdmin();
          this.showModal = false;
          loader.hide();
          this.messageToast(
            "Success",
            "success",
            `Admin has been added successfully`
          );
          this.resetForm();
        })
        .catch((err) => {
          console.log(err);
          this.messageToast("Error", "danger", `Email Has Already Been Taken`);
          loader.hide();
        });
        }
      })
    },
  },

  computed: {
    rows() {
      return this.admins.length;
    },
    paginatedCards() {
      const { currentPage, perPage } = this;
      const start = (currentPage - 1) * perPage;
      const end = currentPage * perPage;

      return this.admins.slice(start, end);
    },
    _() {
      return _;
    },
  },

  created() {
    if ("id" in this.$route.params) {
      this.formData.orgId = this.$route.params.id;
    }
    VeeValidate.Validator.extend("verify_contact_number", {
      getMessage: () =>
        "Contact number must be a 10-digit phone number (e.g. 555-555-5555)",
      validate: (value) => {
        const contactNumberRegex = new RegExp(/^\d{10}$/);
        return contactNumberRegex.test(value);
      },
    });
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
    VeeValidate.Validator.extend("verify_github_username", {
      getMessage: () =>
        "Username must be a valid GitHub username (consisting of alphanumeric characters, hyphens, and/or underscores, and between 1 and 39 characters in length)",
      validate: (value) => {
        const gitHubUsernameRegex = /^[a-zA-Z0-9-_]{1,39}$/;
        return gitHubUsernameRegex.test(value);
      },
    });
  },
};
</script>

<style lang="scss">
h3 i,
h3 span,
h4 {
  color: #021559 !important;
  text-transform: uppercase;
  line-height: 1.25;
  margin-bottom: 0;
  font-weight: 600;
}
h4.mb-2 {
  font-weight: bold;
}
.project-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  li {
    font-size: 1.25rem;
    font-weight: 600;
    color: #505d69;
    padding: 1rem 0;
    border-bottom: 1px solid #74788d;
  }
}
.page-item.active .page-link {
  background: #006d5b;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.page-item .page-link {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
button#show-btn {
  background-color: #0e0e87;
}
</style>
