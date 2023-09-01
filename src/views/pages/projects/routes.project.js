import Projects from "./index";
import ProjectsDetails from "./details.vue";

// import middlewares
export default [
  {
    path: "/projects",
    component: Projects,
    name: "Projects",
  },
  {
    path: "/project/:id",
    component: ProjectsDetails,
    name: "Project-Details",
  },
  
];
