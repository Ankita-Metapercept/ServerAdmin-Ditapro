<template>
  <b-card>
    <h3 class="d-flex align-items-center">
      <i class="mdi mdi-arrange-send-backward mr-3"></i> <span>PROJECTS</span>
    </h3>
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
            :items="projects"
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
            <template v-slot:cell(createdAt)="row" class="text-right">
              <div>{{ new Date(row.item.createdAt).toLocaleString() }}</div>
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
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      filter: '',
      fields: [
        { key: "projectName", sortable: true },
        { key: "projectNodeId", sortable: true },
        { key: "projectRepoId", sortable: true },
        { key: "createdAt", sortable: true }
      ],
      id: null,
      currentPage: 1,
      totalRows: 1,
      perPage: 5,
      projects: [],
      pageOptions: [5, 10, 25, 50, 100],
    };
  },
  mounted() {
    this.totalRows = this.projects.length;
    this.getOrganizationProject();
  },
  methods: {
    async getOrganizationProject() {
      let loader = this.$loading.show({
        loader: "dots",
      });

      await this.$store.getters.client
        .get(`/project/byorgid/?orgId=${this.id}`,{
          headers: {
            orgId: this.id
          }
        })
        .then((response) => {
          console.log("project" , response);
          this.projects = response.data;
          loader.hide();
        })
        .catch((err) => {
          console.log(err);
          loader.hide();
        });
    },
  },

  computed: {
    rows() {
      return this.projects?.length;
    },
    paginatedCards() {
      const { currentPage, perPage } = this;
      const start = (currentPage - 1) * perPage;
      const end = currentPage * perPage;

      return this.projects.slice(start, end);
    },
  },

  created() {
    if ("id" in this.$route.params) {
      this.id = this.$route.params.id;
    }
  },
};
</script>

<style lang="scss">
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
