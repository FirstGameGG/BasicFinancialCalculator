///© BasicFinancialCalculator Copyright 2022 | All rights reserved.

let chart;

window.onload = function() {
  var ctx = document.getElementById('myChart').getContext('2d');
  Chart.defaults.font.family = 'Prompt' , 'sans-serif';
  Chart.defaults.font.size = 14;
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["จำนวนดอกเบี้ย", "จำนวนเงินที่ต้องจ่ายทั้งหมด"],
      datasets: [
        {
          label: 'จำนวนเงินรายเดือน',
          backgroundColor: 'rgb(250,161,109)',
          borderColor: 'rgb(255, 255, 255)',
          data: [],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'แผนภูมิแสดงดอกเบี้ยรายเดือน',
        },
      },
    },
  });
};

function answer(event){
  event.preventDefault();
  var p=parseFloat(document.getElementById('p').value);
  var r=parseFloat(document.getElementById('r').value);
  var t=parseFloat(document.getElementById('t').value); 

  var data = [];
  for (var i = 1; i <= t; i++) {
    var monthlyInterest = p * ((r/100)/ 12);
    var monthlyTotal = monthlyInterest + ( p / (12* t) );
    data.push({ monthlyInterest, monthlyTotal });
  }

  document.getElementById("outputmonthlyInterest").innerHTML = (monthlyInterest).toFixed(2);
  document.getElementById("outputmonthlyTotal").innerHTML = (monthlyTotal).toFixed(2);
  
  chart.data.datasets[0].data = [monthlyInterest.toFixed(2), monthlyTotal.toFixed(2)];
  chart.update();
}