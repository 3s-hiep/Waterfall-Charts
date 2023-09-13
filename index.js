// Import stylesheets
import './style.css';
import 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js';

// Write Javascript code!

let baseData = [
  { label: 'A', value: 3 },
  { label: 'B', value: 5 },
  { label: 'C', value: 4 },
  { label: 'D', value: 2 },
  { label: 'E', value: 6 },
];

const labels = baseData.map((o) => o.label).concat('Total');
const data = [];
let total = 0;
for (let i = 0; i < baseData.length; i++) {
  const vStart = total;
  total += baseData[i].value;
  data.push([vStart, total]);
}
data.push(total);
const backgroundColors = data.map(
  (o, i) => 'rgba(255, 99, 132, ' + (i + (11 - data.length)) * 0.1 + ')'
);

new Chart('waterfall', {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColors,
        barPercentage: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const v = data.datasets[0].data[tooltipItem.index];
          return Array.isArray(v) ? v[1] - v[0] : v;
        },
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});
