<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  mounted() {
    this.renderChart(
      {
        labels: [
          "Organization 01",
          "Organization 02",
          "Organization 03",
          "Organization 04",
          "Organization 05",
          "Organization 06",
          "Organization 07",
          "Organization 08",
          "Organization 09"
        ],
        datasets: [
          {
            barPercentage: 0.4,
            label: "Sales Analytics",
            backgroundColor: "rgba(28, 187, 140, 0.8)",
            borderColor: "rgba(28, 187, 140, 0.8)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(28, 187, 140, 0.9)",
            hoverBorderColor: "rgba(28, 187, 140, 0.9)",
            data: [65, 59, 81, 45, 56, 80, 50, 60, 72]
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                color: "rgba(166, 176, 207, 0.1)"
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                color: "rgba(166, 176, 207, 0.1)"
              }
            }
          ]
        }
      }
    );
  }
};
</script>