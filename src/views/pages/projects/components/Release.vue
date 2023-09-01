<template>
  <b-row>
    <b-col cols="12">
      <b-card title="Release">
        <div class="text-right">
          <b-button variant="success" class="mb-3" @click="showModal = true"
            >Create Release</b-button
          >
        </div>

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
    <b-modal
      id="add-user"
      v-model="showModal"
      centered
      scrollable
      size="md"
      hide-footer
      title="CREATE NEW RELEASE"
    >
      <b-form>
        <b-form-group
          id="input-group-1"
          label="Release title"
          label-for="input-1"
        >
          <b-form-input id="input-1" type="text" required></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Tag Name:" label-for="input-2">
          <b-form-input id="input-2" required></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Select Branch:"
          label-for="input-3"
        >
          <b-form-select
            id="input-3"
            v-model="branch"
            :options="branches"
            required
          ></b-form-select>
        </b-form-group>
        <div class="form-group mb-0">
          <div class="text-right">
            <b-button type="submit" variant="primary">Submit</b-button>
            <button type="reset" class="btn btn-secondary m-l-5 ml-1">
              Reset
            </button>
          </div>
        </div>
      </b-form>
    </b-modal>
  </b-row>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      branch: "master",
      branches: ["Main", "master", "dev", "develop", "design"],
      tableData: [
        { release_name: "User one", tag_name: "lorem", branch_name: "main" },
        { release_name: "User one", tag_name: "lorem", branch_name: "main" },
        { release_name: "User one", tag_name: "lorem", branch_name: "main" },
        { release_name: "User one", tag_name: "lorem", branch_name: "main" },
        { release_name: "User one", tag_name: "lorem", branch_name: "main" },
        { release_name: "User one", tag_name: "lorem", branch_name: "main" },
      ],
    };
  },
};
</script>

<style>
</style>