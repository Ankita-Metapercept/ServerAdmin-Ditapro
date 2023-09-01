<template>
  <b-card>
    <div class="d-flex justify-content-between admin-page">
      <h3 class="d-flex align-items-center">
        <i class="mdi mdi-account mr-3"></i> <span>Users</span>
      </h3>
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
            <template v-slot:cell(projects)="row" class="text-right">
              <div>
                <ol>
                  <template v-if="row.item && row.item.projectName && row.item.projectName.length > 0">
                    <li v-for="project in row.item.projectName" :key="project">
                    {{project}}
                    </li>
                  </template>
                  <template v-else>
                    <div>Project not Added</div>
                  </template>
                </ol>
              </div>
            </template>
            <template v-slot:cell(userRole)="row" class="text-right">
              <div>
                {{ row.item.userRole.join(", ") }}
              </div>
            </template>
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
          <label
            >Organization Admin Name <span class="text-danger">*</span></label
          >
          <input
            v-model="formData.name"
            type="text"
            class="form-control"
            name="admin"
            required
          />
        </div>
        <div class="form-group">
          <label
            >Organization Admin Email <span class="text-danger">*</span></label
          >
          <input
            v-model="formData.email"
            type="email"
            class="form-control"
            name="email"
            required
          />
        </div>
        <div class="form-group">
          <label
            >Organization Admin Password
            <span class="text-danger">*</span></label
          >
          <input
            v-model="formData.password"
            type="password"
            class="form-control"
            name="password"
            required
          />
        </div>
        <div class="form-group">
          <label
            >Organization Admin Contact Number
            <span class="text-danger">*</span></label
          >
          <input
            v-model="formData.contact"
            type="number"
            class="form-control"
            name="adminPhone"
            required
          />
        </div>

        <div class="form-group mb-0">
          <div class="text-right">
            <b-button type="submit" variant="primary">Submit</b-button>
            <button type="reset" class="btn btn-secondary m-l-5 ml-1">
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
export default {
  data() {
    return {
      IdForProjects: [],
      filter: "",
      pageOptions: [5, 10, 25, 50, 100],
      fields: [
        { key: "email", sortable: true },
        { key: "githubEmail", sortable: true },
        { key: "username", sortable: true },
        { key: "projects", sortable: true },
        { key: "userRole", sortable: true },
      ],
      currentPage: 1,
      perPage: 5,
      admins: [],
      projectsList: [],
      mergedData: [],
      showModal: false,
      formData: {
        orgId: "",
        email: "",
        password: "",
        name: "",
        isActive: false,
        contact: "",
        isChangePassword: false,
      },
    };
  },
  mounted() {
    this.getOrganizationAdmin();
    this.getUserProjects();
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
      git: { required },
      appId: { required, url },
    },
  },
  methods: {
    async getOrganizationAdmin() {
      let loader = this.$loading.show({
        loader: "dots",
      });

      await this.$store.getters.client
        .get(`/orguser/byorgid?orgId=${this.$route.params.id}`,{
          headers :{
            orgId:this.$route.params.id
          }
        })
        .then((response) => {
          console.log(response);
          this.admins = response.data;
          response.data.forEach((element) => {
            this.IdForProjects.push({ id: element.id });
          });
          this.IdForProjects.forEach((element, index) => {
            this.getUserProjects(element.id, index);
          });
          console.log( this.IdForProjects);
          loader.hide();
        })
        .catch((err) => {
          console.log(err);
          loader.hide();
        });
    },
    async getUserProjects(id, index) {
      await this.$store.getters.client
        .get(`/project/byuserId?userId=${id}`)
        .then((response) => {
          this.projectsList = response.data;

          //merge data from both APIs into a single array
          this.mergedData = this.admins.map((admin, i) => {
            if (i === index) {
              return {
                ...admin,
                projectName: response.data.map((ele) => ele.projectName),
              };
            } else {
              return {
                ...admin,
              };
            }
          });
          this.admins = this.mergedData;
        })
        .catch((err) => {
          console.log(err);
        });
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
  },

  created() {
    if ("id" in this.$route.params) {
      this.formData.orgId = this.$route.params.id;
    }
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
