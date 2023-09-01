<template>
  <b-row>
    <b-col cols="12">
      <b-card title="Commits">
        <b-form-group id="branch" label="Select Branch:" label-for="branch">
          <b-form-select
            id="branch"
            v-model="branch"
            :options="branches"
            required
          ></b-form-select>
        </b-form-group>

        <div class="table-responsive mb-0">
          <b-table
            sticky-header
            :items="tableData"
            :fields="fields"
            responsive="sm"
          >
          </b-table>
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data() {
    return {
      branch: "master",
      branches: ["Main", "master", "dev", "develop", "design"],
      tableData: [
        { commit_message: "User one", committed_by:'lorem', Date_and_time: new Date().toLocaleDateString(new Date()) },
        { commit_message: "User one", committed_by:'lorem', Date_and_time: new Date().toLocaleDateString(new Date()) },
        { commit_message: "User one", committed_by:'lorem', Date_and_time: new Date().toLocaleDateString(new Date()) },
        { commit_message: "User one", committed_by:'lorem', Date_and_time: new Date().toLocaleDateString(new Date()) },
        { commit_message: "User one", committed_by:'lorem', Date_and_time: new Date().toLocaleDateString(new Date()) },
      ],
      fields: [
        { key: "commit_message", title:'Commit Message' },
        { key: "committed_by", title:'commited By' },
        { key: "Date_and_time", title:'Date and Time' },
      ],
    };
  },
};
</script>

<style>
</style>