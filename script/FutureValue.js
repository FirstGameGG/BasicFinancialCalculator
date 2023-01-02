///© BasicFinancialCalculator Copyright 2022 | All rights reserved.

let chart1;
let chart2;

window.onload = function() {
  var ctx1 = document.getElementById('myChart').getContext('2d');
  Chart.defaults.font.family = 'Prompt' , 'sans-serif';
  Chart.defaults.font.size = 14;
  chart1 = new Chart(ctx1, {
type: 'line',
data: {
  labels: [],
  datasets: [
    {
      label: 'มูลค่า',
      data: [],
      borderColor: 'rgb(204, 141, 122)',
      backgroundColor: 'rgb(204, 141, 122)',
    },
  ],
},
options: {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'แผนภูมิมูลค่าในอนาคต'
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'จำนวนปี'
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'มูลค่า'
      },
    },
    },
  backgroundColor: 'white'
},
});

  var ctx2 = document.getElementById('myChartX').getContext('2d');
  Chart.defaults.font.family = 'Prompt', 'sans-serif';
  Chart.defaults.font.size = 14;
  chart2 = new Chart(ctx2, {
    type: 'bar',

    data: {
        labels: ['มูลค่าในอนาคต', 'มูลค่าปัจจุบัน'],
        datasets: [{
            label: 'มูลค่าในอนาคต',
            borderColor: ['rgb(204, 141, 122)','rgb(250, 161, 109)'],
            backgroundColor: ['rgb(204, 141, 122)','rgb(250, 161, 109)'],
            data: []
        },
      ],
    },
    options: {
      responsive: true,
       plugins: {
         title: {
            display: true,
              text: 'แผนภูมิเปรียบเทียบมูลค่าในอนาคตกับมูลค่าปัจจุบัน'
               },
               },
    },
});
};

function answer(event) {
  event.preventDefault()
  var pv = parseFloat(document.getElementById('amount').value);
  var r = parseFloat(document.getElementById('rate').value);
  var n = parseFloat(document.getElementById('n').value);

  var data = [];
  for (var year = 1; year <= n; year++) {
  var fv = pv * (Math.pow((1 + (r / 100)), year)) - pv;
  var total = pv + fv;

  data.push({ year: year, future_value: total });
  }

  document.getElementById("outputFV").innerHTML = (fv).toFixed(2);
  document.getElementById("outputTotal").innerHTML = (total).toFixed(2);
    

  chart1.data.labels = data.map(d => d.year);
  chart1.data.datasets[0].data = data.map(d => (d.future_value).toFixed(2));

  chart2.data.datasets[0].data = [total.toFixed(2) , pv.toFixed(2)];

  chart1.update();
  chart2.update();
}
