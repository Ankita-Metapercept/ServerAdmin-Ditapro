<template>
  <div>
    <b-container fluid="xl" class="project-page">
      <b-row class="mt-4">
        <b-col cols="12" md="6" lg="4">
          <b-card class="p-0 repo-card">
            <b-row class="mx-0 header p-3">
              <div class="d-flex">
                <span><i class="mdi mdi-domain"></i></span
                ><span class="title ml-2"> Project 1 </span>
              </div>
            </b-row>
            <div class="p-3 details">
              <!-- Organization Id <br /> -->
              USERS : <span class="text-muted">12</span>
            </div>
            <hr class="m-0" />
            <b-row class="justify-content-end mx-0 px-3 py-2">
              <b-button size="sm" variant="success" @click="toDetails">View Details</b-button>
            </b-row>
          </b-card>
        </b-col>
        <b-col cols="12" md="6" lg="4">
          <b-card class="p-0 repo-card">
            <b-row class="mx-0 header p-3">
              <div class="d-flex">
                <span><i class="mdi mdi-domain"></i></span
                ><span class="title ml-2"> Project 2 </span>
              </div>
            </b-row>
            <div class="p-3 details">
              <!-- Organization Id <br /> -->
              USERS : <span class="text-muted">2</span>
            </div>
            <hr class="m-0" />
            <b-row class="justify-content-end mx-0 px-3 py-2">
              <b-button size="sm" variant="success" @click="toDetails">View Details</b-button>
            </b-row>
          </b-card>
        </b-col>
        <b-col cols="12" md="6" lg="4">
          <b-card class="p-0 repo-card">
            <b-row class="mx-0 header p-3">
              <div class="d-flex">
                <span><i class="mdi mdi-domain"></i></span
                ><span class="title ml-2"> Project 3 </span>
              </div>
            </b-row>
            <div class="p-3 details">
              <!-- Organization Id <br /> -->
              USERS : <span class="text-muted">12</span>
            </div>
            <hr class="m-0" />
            <b-row class="justify-content-end mx-0 px-3 py-2">
              <b-button size="sm" variant="success" @click="toDetails">View Details</b-button>
            </b-row>
          </b-card>
        </b-col>
        <b-col cols="12" md="6" lg="4">
          <b-card class="p-0 repo-card">
            <b-row class="mx-0 header p-3">
              <div class="d-flex">
                <span><i class="mdi mdi-domain"></i></span
                ><span class="title ml-2"> Project 4 </span>
              </div>
            </b-row>
            <div class="p-3 details">
              <!-- Organization Id <br /> -->
              USERS : <span class="text-muted">12</span>
            </div>
            <hr class="m-0" />
            <b-row class="justify-content-end mx-0 px-3 py-2">
              <b-button size="sm" variant="success" @click="toDetails">View Details</b-button>
            </b-row>
          </b-card>
        </b-col>
        <b-col cols="12" md="6" lg="4">
          <b-card class="p-0 repo-card">
            <b-row class="mx-0 header p-3">
              <div class="d-flex">
                <span><i class="mdi mdi-domain"></i></span
                ><span class="title ml-2"> Project 5 </span>
              </div>
            </b-row>
            <div class="p-3 details">
              <!-- Organization Id <br /> -->
              USERS : <span class="text-muted">12</span>
            </div>
            <hr class="m-0" />
            <b-row class="justify-content-end mx-0 px-3 py-2">
              <b-button size="sm" variant="success" @click="toDetails">View Details</b-button>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <hr class="mt-0">
      <b-row class="mt-4">
        <b-col cols="4">
            <b-card role="button">
                <h4 class="mb-0"><i class="mdi mdi-book-outline"></i> <span class="ml-3">DocManager</span></h4>
            </b-card>
        </b-col>
        <b-col cols="4">
            <b-card role="button">
                <h4 class="mb-0"><i class="mdi mdi-lead-pencil"></i> <span class="ml-3">Editor</span></h4>
            </b-card>
        </b-col>
        <b-col cols="4">
            <b-card role="button">
                <h4 class="mb-0"><i class="mdi mdi-book-open-variant"></i> <span class="ml-3">Publisher</span></h4>
            </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Projects-list",
  methods:{
    toDetails(){
        this.$router.push('/project/1')
    }
  }
};
</script>
<style lang="scss">
.repo-card {
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
}
</style>