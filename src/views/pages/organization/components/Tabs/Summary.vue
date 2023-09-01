<template>
  <b-card>
    <h3 class="d-flex align-items-center">
      <i class="mdi mdi-laptop mr-3"></i> <span>RESOURCE SUMMARY</span>
    </h3>
    <p class="mt-4">DITA-OT VERSION: <span class="text-muted">3.3.2</span></p>
    <p>MACHINE-TYPE:</p>
    <ul class="resource-list">
      <li>CPU: <span class="text-muted">1 vCPU</span></li>
      <li>MEMORY: <span class="text-muted">614 MB</span></li>
      <li>BASIC CHARGES: : <span class="text-muted">US$4.88 (Monthly)</span></li>
    </ul>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      rows: 16,
      currentPage: 1,
      perPage: 6,
    };
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
.resource-list {
  li {
    font-weight: 800 !important;
    color: #000;
    margin-bottom: 0.5rem;
  }
}
p{
    font-weight: 800 !important;
    color: #000;
    margin-bottom: 0.5rem;
}
</style>