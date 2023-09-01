<template>
  <div>
    <b-container>
        <div class="card">
          <div class="card-body">
            <b-tabs pills vertical content-class="p-3 text-muted">
              <b-tab active class="border-0">
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="fas fa-home"></i>
                  </span>
                  <span class="d-none d-sm-inline-block">USERS</span>
                </template>
                <Users/>
              </b-tab>
              <b-tab>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="far fa-user"></i>
                  </span>
                  <span class="d-none d-sm-inline-block">COMMIT HISTORY</span>
                </template>
                <Commits/>
              </b-tab>
              <b-tab>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="far fa-envelope"></i>
                  </span>
                  <span class="d-none d-sm-inline-block">RELEASE</span>
                </template>
                <Release/>
              </b-tab>
            </b-tabs>
          </div>
        </div>
    </b-container>
  </div>
</template>

<script>
import Users from './components/Users.vue'
import Commits from './components/Commits.vue'
import Release from './components/Release.vue'
export default {
  components:{
    Users,
    Commits,
    Release,
  }
}
</script>

<style>

</style>