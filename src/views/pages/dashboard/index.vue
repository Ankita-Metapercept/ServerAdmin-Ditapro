<template>
  <div>
    <PageHeader :icon="'ri-dashboard-line h3'" :title="title" :items="items" />
    <b-row>
      <b-col cols="12" lg="8" md="6">
        <DataChart />
      </b-col>
      <b-col cols="12" lg="4" md="6">
        <Logs />
      </b-col>
      <b-col cols="12" lg="4" md="6">
        <Publication />
      </b-col>
      <b-col cols="12" lg="4" md="6">
        <Projects />
      </b-col>
      <b-col cols="12" lg="4" md="6">
        <Users />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import PageHeader from "@/components/page-header";
import DataChart from './components/Data-chart.vue'
import Logs from './components/Recent-logs.vue'
import Users from './components/Users.vue'
import Projects from './components/Projects.vue'
import Publication from './components/Publications.vue'

export default {
  components: {
    DataChart,
    Logs,
    Users,
    Projects,
    Publication,
    PageHeader
  },
  data() {
    return {
      title: "Dashboard",
      items: [
        {
          text: "Dashboard",
          active: true,
        },
      ],
    };
  },
}
</script>