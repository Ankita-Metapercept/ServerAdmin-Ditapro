<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h4 class="card-title mb-0">ORGANIZATION DETAILS</h4>
          <button type="submit" class="btn btn-primary" @click="getexcel">
            <i class="ri-file-excel-line"></i> <span> Export to XLS</span>
          </button>
        </div>
        <hr />
        <!-- <p class="card-title-desc">Extend the default collapse behavior to create an accordion.</p> -->
        <div role="tablist">
          <b-card no-body class="mb-1 shadow-none">
            <b-card-header header-tag="header" role="tab">
              <h6 class="m-0">
                <a v-b-toggle.accordion-1 class="text-dark" href="javascript: void(0);">General Details</a>
              </h6>
            </b-card-header>
            <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text><b>Org ID:</b> {{ organization_details.id }}</b-card-text>
                <b-card-text><b>Name:</b> {{ organization_details.name }}</b-card-text>
                <b-card-text><b>Email:</b> {{ organization_details.email }}</b-card-text>
                <b-card-text><b>Contact:</b>
                  {{ organization_details.contact }}</b-card-text>
                <b-card-text><b>Plan ID:</b>
                  {{ organization_details.planId }}</b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" role="tab">
              <h6 class="m-0">
                <a v-b-toggle.accordion-2 class="text-dark" href="javascript: void(0);">Access Details</a>
              </h6>
            </b-card-header>
            <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text><b>Access URL:</b>
                  {{ organization_details.accessURL }}</b-card-text>
                <b-card-text><b>Org Github URL:</b>
                  {{ organization_details.orgGithubURL }}</b-card-text>
                <b-card-text><b>Custom Id:</b>
                  {{ organization_details.customId }}</b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" role="tab">
              <h6 class="m-0">
                <a v-b-toggle.accordion-3 class="text-dark" href="javascript: void(0);">Other Details</a>
              </h6>
            </b-card-header>
            <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
              <div class="row justify-content-center">
                <div class="col-md-8">
                  <div class="card-body">
                    <ul class="list-group">
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <strong>DITA-OT Version</strong>
                        <span>{{ organization_details.ditaotVersion }}</span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <strong>DocManager</strong>
                        <span>{{
                          organization_details.docManager ? "Yes" : "No"
                        }}</span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <strong>DocEditor</strong>
                        <span>{{
                          organization_details.editor ? "Yes" : "No"
                        }}</span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <strong>DocPublisher</strong>
                        <span>{{
                          organization_details.publisher ? "Yes" : "No"
                        }}</span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <strong>Active</strong>
                        <span>{{
                          organization_details.isActive ? "Yes" : "No"
                        }}</span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <strong>Domain Verified</strong>
                        <span>{{
                          organization_details.isDomainVerified ? "Yes" : "No"
                        }}</span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <strong>Email Verified</strong>
                        <span>{{
                          organization_details.isEmailVerified ? "Yes" : "No"
                        }}</span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <strong>Project Count</strong>
                        <span>{{ orgFullDetails.projectCount }}</span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <strong>Collaborators Count</strong>
                        <span>{{ orgFullDetails.collaboratorsCount }}</span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <strong>File Count</strong>
                        <span>{{ orgFullDetails.fileCount }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" role="tab">
              <h6 class="m-0">
                <a v-b-toggle.accordion-4 class="text-dark" href="javascript: void(0);">Plan Details</a>
              </h6>
            </b-card-header>
            <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text><b>Plan:</b> {{ plan_details.title }}</b-card-text>
                <b-card-text><b>Admin:</b> {{ plan_details.adminCount }}</b-card-text>
                <b-card-text><b>Users:</b> {{ plan_details.userCount }}</b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    orgFullDetails: {
      type: Object,
    },
    organization_details: {
      type: Object,
    },
    plan_details: {
      type: Object,
    },
  },
  methods: {
    messageToast(messageToastTitle, messageToastVariant, messageToastContent) {
      this.$bvToast.toast(messageToastContent, {
        title: messageToastTitle,
        variant: messageToastVariant,
        solid: true,
      });
    },
    async getexcel() {
      let loader = this.$loading.show({
        loader: "dots",
      });
      await this.$store.getters.client
        .get(
          `/serveradmin/organization/downloadxls/byorgid
?orgId=${this.$route.params.id}`,
          {
            responseType: "blob",
          }
        )
        .then((response) => {
          console.log(response);
          this.messageToast(
            "Success",
            "success",
            "Organization details Xls downloaded successfully."
          );
          console.log(response);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "OrgDetails.xlsx");
          document.body.appendChild(link);
          link.click();
          loader.hide();
        })
        .catch((error) => {
          console.log(error);
          loader.hide();
          this.messageToast(
            "Error",
            "danger",
            "Unable to download Organization details xls . Please try again later."
          );
        });
    },
  },
};
</script>
