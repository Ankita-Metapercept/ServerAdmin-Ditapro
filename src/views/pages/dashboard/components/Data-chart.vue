<script>
/**
 * Earning Reports component
 */
export default {
  data() {
    return {
      users: {
        series: [80],
        chartOptions: {
          chart: {
            type: "radialBar",
            wight: 60,
            height: 60,
            sparkline: {
              enabled: true
            }
          },
          dataLabels: {
            enabled: false
          },
          colors: ["#5664d2"],
          stroke: {
            lineCap: "round"
          },
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 0,
                size: "70%"
              },
              track: {
                margin: 0
              },
              dataLabels: {
                show: false
              }
            }
          }
        }
      },
      projects: {
        series: [50],
        chartOptions: {
          chart: {
            type: "radialBar",
            wight: 60,
            height: 60,
            sparkline: {
              enabled: true
            }
          },
          dataLabels: {
            enabled: false
          },
          colors: ["#ff4444"],
          stroke: {
            lineCap: "round"
          },
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 0,
                size: "70%"
              },
              track: {
                margin: 0
              },

              dataLabels: {
                show: false
              }
            }
          }
        }
      },
      vms: {
        series: [72],
        chartOptions: {
          chart: {
            type: "radialBar",
            wight: 60,
            height: 60,
            sparkline: {
              enabled: true
            }
          },
          dataLabels: {
            enabled: false
          },
          colors: ["#0066ff"],
          stroke: {
            lineCap: "round"
          },
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 0,
                size: "70%"
              },
              track: {
                margin: 0
              },
              dataLabels: {
                show: false
              }
            }
          }
        }
      },
      cpu: {
        series: [40],
        chartOptions: {
          chart: {
            type: "radialBar",
            wight: 60,
            height: 60,
            sparkline: {
              enabled: true
            }
          },
          dataLabels: {
            enabled: false
          },
          colors: ["#ffbb33"],
          stroke: {
            lineCap: "round"
          },
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 0,
                size: "70%"
              },
              track: {
                margin: 0
              },

              dataLabels: {
                show: false
              }
            }
          }
        }
      },
      memory: {
        series: [90],
        chartOptions: {
          chart: {
            type: "radialBar",
            wight: 60,
            height: 60,
            sparkline: {
              enabled: true
            }
          },
          dataLabels: {
            enabled: false
          },
          colors: ["#5664d2"],
          stroke: {
            lineCap: "round"
          },
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 0,
                size: "70%"
              },
              track: {
                margin: 0
              },
              dataLabels: {
                show: false
              }
            }
          }
        }
      },
      basicCharges: {
        series: [60],
        chartOptions: {
          chart: {
            type: "radialBar",
            wight: 60,
            height: 60,
            sparkline: {
              enabled: true
            }
          },
          dataLabels: {
            enabled: false
          },
          colors: ["#1cbb8c"],
          stroke: {
            lineCap: "round"
          },
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 0,
                size: "70%"
              },
              track: {
                margin: 0
              },

              dataLabels: {
                show: false
              }
            }
          }
        }
      }
    };
  }
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="text-center">
        <div class="row">
          <div class="col-sm-4 mb-4 py-2">
            <div>
              <div class="mb-3">
                <apexchart
                  class="apex-charts"
                  height="80"
                  wight="80"
                  dir="ltr"
                  :series="users.series"
                  :options="users.chartOptions"
                ></apexchart>
              </div>
              <p class="text-muted text-truncate justify-content-center mb-2">USERS</p>
              <h5 class="mb-0">2,523</h5>
            </div>
          </div>

          <div class="col-sm-4 mb-4 py-2">
            <div class="mt-5 mt-sm-0">
              <div class="mb-3">
                <apexchart
                  class="apex-charts"
                  height="80"
                  wight="80"
                  dir="ltr"
                  :series="projects.series"
                  :options="projects.chartOptions"
                ></apexchart>
              </div>

              <p class="text-muted text-truncate justify-content-center text-center mb-2">PROJECTS</p>
              <h5 class="mb-0">11,235</h5>
            </div>
          </div>

          <div class="col-sm-4 mb-4 py-2">
            <div>
              <div class="mb-3">
                <apexchart
                  class="apex-charts"
                  height="80"
                  wight="80"
                  dir="ltr"
                  :series="vms.series"
                  :options="vms.chartOptions"
                ></apexchart>
              </div>
              <p class="text-muted text-truncate justify-content-center text-center mb-2">VM's</p>
              <h5 class="mb-0">524</h5>
            </div>
          </div>

          <div class="col-sm-4 mb-4 py-2">
            <div class="mt-5 mt-sm-0">
              <div class="mb-3">
                <apexchart
                  class="apex-charts"
                  height="80"
                  wight="80"
                  dir="ltr"
                  :series="cpu.series"
                  :options="cpu.chartOptions"
                ></apexchart>
              </div>

              <p class="text-muted text-truncate justify-content-center mb-2">CPU</p>
              <h5 class="mb-0">1,024 MB</h5>
            </div>
          </div>

          <div class="col-sm-4 mb-4 py-2">
            <div>
              <div class="mb-3">
                <apexchart
                  class="apex-charts"
                  height="80"
                  wight="80"
                  dir="ltr"
                  :series="memory.series"
                  :options="memory.chartOptions"
                ></apexchart>
              </div>
              <p class="text-muted text-truncate justify-content-center mb-2">MEMORY</p>
              <h5 class="mb-0">2,923</h5>
            </div>
          </div>

          <div class="col-sm-4 mb-4 py-2">
            <div class="mt-5 mt-sm-0">
              <div class="mb-3">
                <apexchart
                  class="apex-charts"
                  height="80"
                  wight="80"
                  dir="ltr"
                  :series="basicCharges.series"
                  :options="basicCharges.chartOptions"
                ></apexchart>
              </div>

              <p class="text-muted text-truncate justify-content-center mb-2">BASIC CHARGES</p>
              <h5 class="mb-0">$11,235</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>