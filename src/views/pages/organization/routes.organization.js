import Organization from "./index";

import OrganizationDetail from "./details.vue";
import AddOrg from "./addOrg.vue";


// import middlewares
export default [
  {
    path: "/organization",
    component: Organization,
    name: "Organization",
  },
  {
    path: "/organization/:id",
    component: OrganizationDetail,
    name: "Organization Details",
  },
  {
    path: "/add-organization",
    component: AddOrg,
    name: "Add Organization ",
  },
  {
    path: "/edit-organization/:id",
    component: AddOrg,
    name: "Update Organization ",
  },
 
  
  
];
