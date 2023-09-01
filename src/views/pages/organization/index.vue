<template>
  <div>
    <PageHeader :icon="'ri-building-4-line h3'" :title="title" :items="items" />
    <b-container fluid="xl" class="orglist-page">
      <div class="d-flex align-items-center justify-content-between">
        <b-form-input class="w-25" v-model="search" placeholder="Search Organizations" @input="searchOrg"></b-form-input>
        <button class="costum-btn" @click="toAddOrg">Add Organization</button>
      </div>
      <b-row class="mt-4">
        <b-col cols="12" md="6" lg="4" v-for="item in paginatedCards" :key="item.id">
          <Card :item="item" />
        </b-col>
      </b-row>
      <div class="row">
        <div class="col" v-if="organizationData.length > 6">
          <div class="dataTables_paginate paging_simple_numbers float-right">
            <ul class="pagination pagination-rounded mb-0">
              <!-- pagination -->
              <b-pagination prev-class="light" v-model="currentPage" :total-rows="organizationData.length"
                :per-page="perPage"></b-pagination>
            </ul>
          </div>
        </div>
        <b-col cols="12" class="mt-5">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title mb-4">Resources Utilization</h4>
              <BarChart :height="400" />
            </div>
          </div>
        </b-col>
      </div>
    </b-container>
  </div>
</template>

<script>
import Card from "./components/Card.vue";
import BarChart from "./components/BarChart.vue";
import PageHeader from "@/components/page-header";

export default {
  name: "orgList",
  components: {
    Card,
    BarChart,
    PageHeader
  },
  data() {
    return {
      title: "Organizations",
      items: [
        {
          text: "Dashboard",
          href: "/"
        },
        {
          
          text: "Organization",
          active: true,
        },
      ],
      organizationData: [],
      organizationDataSearch: [],
      currentPage: 1,
      perPage: 6,
      search: "",
    };
  },
  computed: {
    paginatedCards() {
      const { currentPage, perPage } = this;
      const start = (currentPage - 1) * perPage;
      const end = currentPage * perPage;

      return this.organizationData.slice(start, end);
    },
  },
  mounted() {
    this.getOrganizationData();
    this.totalRows = this.organizationData.length;
  },

  methods: {
    toAddOrg() {
      this.$router.push("/add-organization");
    },
    async getOrganizationData() {
      let loader = this.$loading.show({
        loader: "dots",
      });

      await this.$store.getters.client
        .get("/serveradmin/organization/")
        .then((response) => {
          console.log(response.data);
          this.organizationData = response.data;
          this.organizationDataSearch = response.data;
          loader.hide();
        });
    },
    searchOrg() {
      if (this.search) {
        this.organizationData = this.organizationDataSearch.filter((org) => {
          return org.name.toLowerCase().includes(this.search);
        });
      } else {
        this.organizationData = this.organizationDataSearch;
      }
    },
  },

  /**
   * Search the table data with search input
   */
  // onFiltered(filteredItems) {
  //   // Trigger pagination to update the number of buttons/pages due to filtering
  //   this.totalRows = filteredItems.length;
  //   this.currentPage = 1;
  // },
};
</script>

<style lang="scss">
.orglist-page .costum-btn {
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

.page-item.active .page-link {
  background: #006d5b;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.page-item .page-link {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
