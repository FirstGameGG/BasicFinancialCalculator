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
          label: 'จำนวนดอกเบี้ยทบต้น',
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
          text: 'แผนภูมิจำนวนเงินดอกเบี้ยทบต้นต่อปี',
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'จำนวนปี',
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
    
    var amount_input = parseFloat(document.getElementById('amount').value);
    var rate_input = parseFloat(document.getElementById('rate').value);
    var time_input = parseFloat(document.getElementById('time').value);
    var n_input = parseFloat(document.getElementById('n').value);

    var data = [];
    for (var i = 1; i <= time_input; i++) {
      var year_interest = amount_input * (Math.pow((1 + (rate_input / 100)), (i * n_input))) - amount_input;
      var year_total = amount_input + year_interest;

      data.push({ year: i, interest: year_interest, total: year_total });
    }

    document.getElementById("outputInterest").innerHTML = (year_interest).toFixed(2);
    document.getElementById("outputTotal").innerHTML = (year_total).toFixed(2);
    
  chart.data.labels = data.map(d => d.year);
  chart.data.datasets[0].data = data.map(d => (d.interest).toFixed(2));
  chart.data.datasets[1].data = data.map(d => (d.total).toFixed(2));

  chart.update();
}