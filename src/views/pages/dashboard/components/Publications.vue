<script>
/**
 * Sources Component
 */
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

      <h4 class="card-title mb-3">RECENT PUBLICATION</h4>

      <div>
        <!-- <div class="text-center">
          <p class="mb-2">Total Publications</p>
          <h4>$ 7652</h4>
          <div class="text-success">
            <i class="mdi mdi-menu-up font-size-14"></i>2.2 %
          </div>
        </div> -->

        <div class="table-responsive mt-4">
          <table class="table table-hover mb-0 table-centered table-nowrap">
            <tbody>
              <tr>
                <td style="width: 60px;">
                  <div class="avatar-xs">
                    <div class="avatar-title rounded-circle bg-light">
                      <img src="@/assets/images/companies/img-1.png" alt height="20" />
                    </div>
                  </div>
                </td>

                <td>
                  <h5 class="font-size-14 mb-0">Source 1</h5>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="avatar-xs">
                    <div class="avatar-title rounded-circle bg-light">
                      <img src="@/assets/images/companies/img-2.png" alt height="20" />
                    </div>
                  </div>
                </td>
                <td>
                  <h5 class="font-size-14 mb-0">Source 2</h5>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="avatar-xs">
                    <div class="avatar-title rounded-circle bg-light">
                      <img src="@/assets/images/companies/img-3.png" alt height="20" />
                    </div>
                  </div>
                </td>
                <td>
                  <h5 class="font-size-14 mb-0">Source 3</h5>
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