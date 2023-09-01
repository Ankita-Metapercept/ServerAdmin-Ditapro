<script>
export default {
  data() {
    return {};
  }
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <b-dropdown right toggle-class="arrow-none card-drop" class="float-right" variant="white">
        <template v-slot:button-content>
          <i class="mdi mdi-dots-vertical"></i>
        </template>
        <!-- item-->
        <b-dropdown-item>Sales Report</b-dropdown-item>
        <!-- item-->
        <b-dropdown-item>Export Report</b-dropdown-item>
        <!-- item-->
        <b-dropdown-item>Profit</b-dropdown-item>
        <!-- item-->
        <b-dropdown-item>Action</b-dropdown-item>
      </b-dropdown>

      <h4 class="card-title mb-3">USERS</h4>

      <div>

        <div class="table-responsive mt-4">
          <table class="table table-hover mb-0 table-centered table-nowrap">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <h5 class="font-size-14 mb-0">USER 1</h5>
                </td>

                <td>
                  <p class="text-muted mb-0">$ 2478</p>
                </td>
              </tr>
              <tr>
                <td>
                  <h5 class="font-size-14 mb-0">USER 2</h5>
                </td>
                <td>
                  <p class="text-muted mb-0">$ 2625</p>
                </td>
              </tr>
              <tr>
                <td>
                  <h5 class="font-size-14 mb-0">USER 3</h5>
                </td>
                <td>
                  <p class="text-muted mb-0">$ 2856</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="text-center mt-4">
          <a href="javascript:void(0)" class="btn btn-primary btn-sm">View more</a>
        </div>
      </div>
    </div>
  </div>
</template>