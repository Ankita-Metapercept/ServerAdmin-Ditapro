<template>
  <div>
    <b-row class="justify-content-end mx-0 mb-4">
      <b-button variant="success" class="mr-3" @click="modalShow=true">Add User</b-button>
      <b-button variant="outline-primary" ><i class="ri-notification-3-line"></i></b-button>
    </b-row>
      
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Users List</h4>
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
            sticky-header
            :items="tableData"
            :fields="fields"
            responsive="sm"
            :per-page="perPage"
            :current-page="currentPage"
            :filter="filter"
            :filter-included-fields="filterOn"
            @filtered="onFiltered"
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
                  :per-page="perPage"
                ></b-pagination>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal
      id="add-user"
      v-model="modalShow"
      centered
      scrollable
      size="md"
      hide-footer
      title="Add a new user"
    >
      <form action="#" @submit.prevent="typeForm">
        <div class="form-group">
          <label
            >Project name <span class="text-danger">*</span></label
          >
          <input
            v-model="typeform.id"
            type="text"
            class="form-control"
            name="id"
            :class="{ 'is-invalid': typesubmit && $v.typeform.id.$error }"
          />
          <div
            v-if="typesubmit && $v.typeform.id.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.typeform.id.required">This value is required.</span>
          </div>
        </div>
        <div class="form-group">
          <label
            >Project Id <span class="text-danger">*</span></label
          >
          <input
            v-model="typeform.admin"
            type="text"
            class="form-control"
            name="admin"
            :class="{ 'is-invalid': typesubmit && $v.typeform.admin.$error }"
          />
          <div
            v-if="typesubmit && $v.typeform.admin.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.typeform.admin.required"
              >This value is required.</span
            >
          </div>
        </div>
        <div class="form-group">
          <label
            >Username <span class="text-danger">*</span></label
          >
          <input
            v-model="typeform.adminEmail"
            type="text"
            class="form-control"
            name="adminEmail"
            :class="{
              'is-invalid': typesubmit && $v.typeform.adminEmail.$error,
            }"
          />
          <div
            v-if="typesubmit && $v.typeform.adminEmail.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.typeform.adminEmail.required"
              >This value is required.</span
            >
          </div>
        </div>
        <div class="form-group">
          <label
            >User email Id
            <span class="text-danger">*</span></label
          >
          <input
            v-model="typeform.password"
            type="text"
            class="form-control"
            name="password"
            :class="{ 'is-invalid': typesubmit && $v.typeform.password.$error }"
          />
          <div
            v-if="typesubmit && $v.typeform.password.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.typeform.password.required"
              >This value is required.</span
            >
          </div>
        </div>
        <div class="form-group">
          <label
            >Github Username
            <span class="text-danger">*</span></label
          >
          <input
            v-model="typeform.adminPhone"
            type="text"
            class="form-control"
            name="adminPhone"
            :class="{
              'is-invalid': typesubmit && $v.typeform.adminPhone.$error,
            }"
          />
          <div
            v-if="typesubmit && $v.typeform.adminPhone.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.typeform.adminPhone.required"
              >This value is required.</span
            >
          </div>
        </div>
        <div class="form-group">
          <label
            >Role
            <span class="text-danger">*</span></label
          >
          <input
            v-model="typeform.github"
            type="text"
            class="form-control"
            name="github"
            :class="{ 'is-invalid': typesubmit && $v.typeform.github.$error }"
          />
          <div
            v-if="typesubmit && $v.typeform.github.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.typeform.github.required"
              >This value is required.</span
            >
          </div>
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
  </div>
</template>

<script>
import Swal from "sweetalert2";
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
      tableData: [
        { name: "User one" },
        { name: "User two" },
        { name: "User three" },
        { name: "User four" },
        { name: "User five" },
        { name: "User six" },
        { name: "User seven" },
        { name: "User eight" },
        { name: "User nine" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 25, 50, 100],
      filter: null,
      filterOn: [],
      fields: [
        { key: "name", sortable: true },
        { key: "action", align: "center" },
      ],
      modalShow: false,
      typeform: {
        id: null,
        name: "",
        email: "",
        phone: "",
        admin: "",
        adminEmail: "",
        password: "",
        adminPhone: "",
        git: "",
        appId: "AppId",
      },
      typesubmit: false,
    };
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
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.tableData?.length;
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.tableData.length;
  },
  methods: {
    async confirm() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(() => {
        console.log("deleted");
        // if (result.value) {
        //   console.log("wait");
        //   let loader = this.$loading.show({
        //     loader: "dots",
        //   });
        //   this.$store.getters.client
        //     .delete(`/event/${event.item.id}`)
        //     .then((response) => {
        //       console.log(response);
        //       if (result.isConfirmed) {
        //         Swal.fire("Deleted!", "Your file has been deleted.", "success");
        //       }
        //       loader.hide();
        //       this.getEventData();
        //     });
        // }
      });
    },
    // eslint-disable-next-line no-unused-vars
    typeForm(e) {
      this.typesubmit = true;
      // stop here if form is invalid
      this.$v.$touch();
    },
    edit(event) {
      console.log(event);
      this.modalShow = true;
    },
    
    // toAddNew(){this.$router.push('/add-project')},
 
    /**
     * Search the table data with search input
     */
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>