<template>
  <b-card>
    <form action="#" @submit.prevent="typeForm">
      <div class="form-group">
        <label>Organization Admin ID <span class="text-danger">*</span></label>
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
          >Organization Admin Name <span class="text-danger">*</span></label
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
          >Organization Admin Email <span class="text-danger">*</span></label
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
          >Organization Admin Password <span class="text-danger">*</span></label
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
          >Organization Admin Contact Number
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
          >Organization Admin Github Url
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
      rows: 16,
      currentPage: 1,
      perPage: 6,
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
  methods: {
    // eslint-disable-next-line no-unused-vars

    toAddAdmin() {
      this.$router.push("/add-admin");
    },
  },
};
</script>

<style lang="scss">
.admin-page .costum-btn {
  background: #021559;
  border: 1px solid #5664d2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  color: #fff;
  font-weight: 600;
  padding: 8px 15px;
  transition: all 0.3s ease;
  &:hover {
    background: rgba($color: #021559, $alpha: 0.8);
  }
}
h3 i,
h3 span {
  color: #021559 !important;
  text-transform: uppercase;
  line-height: 1.25;
  margin-bottom: 0;
  font-weight: 600;
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
</style>
