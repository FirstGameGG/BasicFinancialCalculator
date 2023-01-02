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
      borderColor: 'rgb(250, 161, 109)',
      backgroundColor: 'rgb(250, 161, 109)',
    },
  ],
},
options: {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'แผนภูมิมูลค่าปัจจุบัน'
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
        labels: ['มูลค่าปัจจุบัน','มูลค่าในอนาคต'],
        datasets: [{
            label: 'มูลค่าปัจจุบัน',
            borderColor: ['rgb(250, 161, 109)', 'rgb(204, 141, 122)'],
            backgroundColor: ['rgb(250, 161, 109)', 'rgb(204, 141, 122)'],
            data: []
        },
      ],
    },
    options: {
      responsive: true,
       plugins: {
         title: {
            display: true,
              text: 'แผนภูมิเปรียบเทียบมูลค่าปัจจุบันกับมูลค่าในอนาคต'
               },
               },
    },
});
};

function answer(event){
  event.preventDefault();

  var fv = parseFloat(document.getElementById('fv').value);
  var t = parseFloat(document.getElementById('t').value);
  var n = parseFloat(document.getElementById('n').value);
  var i = parseFloat(document.getElementById('i').value);

  var data = [];
  for (var year = 1; year <= t; year++) {
    var pv = fv / Math.pow(1 + ((i/100) / n) ,n*year);
    data.push({ year: year, present_value: pv });
  }

  document.getElementById("output").innerHTML = (pv).toFixed(2);
    

  chart1.data.labels = data.map(d => d.year);
  chart1.data.datasets[0].data = data.map(d => (d.present_value).toFixed(2));

  chart2.data.datasets[0].data = [fv.toFixed(2) , pv.toFixed(2)];

  chart1.update();
  chart2.update();
}