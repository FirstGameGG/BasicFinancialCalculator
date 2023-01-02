///© BasicFinancialCalculator Copyright 2022 | All rights reserved.

let chart;

window.onload = function() {
  var ctx = document.getElementById('myChart').getContext('2d');
  Chart.defaults.font.family = 'Prompt', 'sans-serif';
  Chart.defaults.font.size = 14;
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'จำนวนดอกเบี้ยเชิงเดียว',
          data: [],
          borderColor: 'rgb(250, 161, 109)',
          backgroundColor: 'rgb(250, 161, 109)',
        },
        {
          label: 'จำนวนเงินรวม',
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
          text: 'แผนภูมิจำนวนเงินดอกเบี้ยเชิงเดียวต่อปี',
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'ระยะเวลา',
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'จำนวนเงิน',
          },
        },
      },
      backgroundColor: 'white',
    },
  });
};
  
function answer(event) {  
  event.preventDefault();

  var principal = parseFloat(document.getElementById('amount').value);
  var rate = parseFloat(document.getElementById('rate').value) / 100;
  var time = parseFloat(document.getElementById('time').value);
  
  var data = [];
  var interest_data = [];
  var total_data = [];
  for (var i = 1; i <= time; i++) {
    var interest = principal * rate * i;
    var total = principal + interest;
    
    data.push({ year: i, interest: interest, total: total });
    interest_data.push(interest);
    total_data.push(total);
  }
  document.getElementById("outputInterest").innerHTML = (interest).toFixed(2);
  document.getElementById("outputTotal").innerHTML = (total).toFixed(2);

  chart.data.labels = data.map(d => d.year);
  chart.data.datasets[0].data = interest_data;
  chart.data.datasets[1].data = total_data;
  
  chart.update();
}