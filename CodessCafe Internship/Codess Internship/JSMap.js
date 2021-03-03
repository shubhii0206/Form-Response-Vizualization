
const LIST = "LIST";
const MCQ = "MCQ";
const CHECKBOX = "CHECKBOX";

// variables 
var data = [];
var titles;
const types = [LIST, CHECKBOX, MCQ];
const options = [
  ["Tea", "Coffee", "Soft drinks", "Water"],
  ["Dairy milk", "Five star", "Milky bar", "Munch", "KitKat"],
  ["England", "Australia", "UAE", "Malaysia"],
];



//Unregistering Chartjs-plugins-datalabels to remove unwanted labels
Chart.plugins.unregister(ChartDataLabels);



//Function to process list and render data to bar chart
function listProcessing(listData) {
  const map = new Map();

  const options = listData.Options;
  for (let i = 0; i < options.length; i++) {
    map.set(options[i], 0);
  }

  const responses = listData.Responses;
  for (let i = 0; i < responses.length; i++) {
    map.set(responses[i], map.get(responses[i]) + 1);
  }

  const data = [[], []];
  map.forEach((value, key) => {
    data[0].push(key);
    data[1].push(value);
  });

  const div = document.getElementById("1");
  div.style.width = "50%";
  div.style.borderRadius = "10px";
  div.style.backgroundColor = "#ffffff";
  div.style.padding = "20px";
  div.style.paddingTop = "10px";
  div.style.marginBottom = "40px";
  div.style.marginTop = "30px";
  div.style.marginLeft = "25%";

  const graph = document.getElementById("beverage");
  const ctx = graph.getContext("2d");
  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: data[0],
      datasets: [
        {
          label: "Graph for choices of Beverage",
          data: data[1],
          backgroundColor: [
            "#f25278",
            "#05dff4",
            "#a2f7bf",
            "#fff591",
            "rgba(55, 12, 80, 1)",
            "rgba(188, 143, 14, 1)",
          ],
          borderColor: [
            "#f15287",
            "#05dfd6",
            "#a3f7af",
            "#fff231",
            "rgba(25, 12, 80, 1)",
            "rgba(18, 14, 143, 1)",
          ],
          borderWidth: 1.5,
          hoverBorderColor: "#000000",
        },
      ],
    },
    options: {
      layout: {
        padding: {
          left: 5,
          right: 50,
          top: 0,
          bottom: 0,
        },
      },
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: listData.Title,
        position: "top",
        fontStyle: "bold",
        fontColor: "#000000",
        fontSize: 20,
        padding: 20,
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Count",
              fontSize: 15,
              fontColor: "#000000",
              padding: 15,
            },
            ticks: {
              stepSize: 1,
              max: Math.max(...data[1]) + 1,
              min: 0,
              fontColor: "#000000",
              fontSize: 12,
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Beverages",
              fontSize: 15,
              fontColor: "#000000",
              padding: 10,
            },
            ticks: {
              fontColor: "#000000",
              fontSize: 12,
            },
          },
        ],
      },
    },
  });

  console.log(map);
}

//Function to process list and render data to pie chart
function checkboxProcessing(checkboxData) {
  const map = new Map();

  const options = checkboxData.Options;

  for (let i = 0; i < options.length; i++) {
    map.set(options[i], 0);
  }

  const responses = checkboxData.Responses;
  for (let i = 0; i < responses.length; i++) {
    for (let j = 0; j < responses[i].length; j++) {
      map.set(responses[i][j], map.get(responses[i][j]) + 1);
    }
  }

  var total = 0;

  const data = [[], []];
  map.forEach((value, key) => {
    data[0].push(key);
    data[1].push(value);
    total += value;
  });

  const div = document.getElementById("1");
  

  const graph = document.getElementById("chocolate");
  const ctx = graph.getContext("2d");
  const chart = new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: "pie",
    data: {
      labels: data[0],
      datasets: [
        {
          label: "Graph for Chocolates choices",
          data: data[1],
          backgroundColor: [
            "#ff25a0",
            "#fce38a",
            "#12e1d3",
            "#eaffd0",
            "#ffb396",
            "#adce23",
          ],
          borderColor: [
            "#ff75a0",
            "#fce38a",
            "#95e1d3",
            "#eaffd0",
            "#ffb396",
            "#adce34",
          ],
          borderWidth: 1.5,
          borderAlign: "inner",
          hoverBorderColor: "#000000",
        },
      ],
    },
    options: {
      layout: {
        padding: {
          left: 25,
          right: 60,
          top: 0,
          bottom: 0,
        },
      },
      legend: {
        display: true,
        position: "right",
        labels: {
          boxWidth: 25,
          padding: 20,
          fontColor: "#000000",
          fontSize: 12,
        },
      },
      title: {
        display: true,
        text: checkboxData.Title,
        position: "top",
        fontSize: 20,
        fontColor: "#fffff",
        fontStyle: "bold",
        padding: 20,
      },
      tooltips: {
        enabled: true,
      },
      
      plugins: {
        datalabels: {
          color: "#000000",
          textAlign: "center",
          font: {
            lineHeight: 1.2,
          },
          formatter: function (value, ctx) {
            return (
              
              ((value / total) * 100).toPrecision(3) +
              "%"
            );
          },
        },
      },
    },
  });

  console.log(map);
}

//Function to process list and render data to bar chart
function mcqProcessing(mcqData) {
  const map = new Map();

  const others = "Others";
  const options = mcqData.Options;

  for (let i = 0; i < options.length; i++) {
    map.set(options[i], 0);
  }
  map.set(others, 0);

  const responses = mcqData.Responses;
  for (let i = 0; i < responses.length; i++) {
    if (map.has(responses[i])) {
      map.set(responses[i], map.get(responses[i]) + 1);
    } else if (typeof responses[i] == "string") {
     
      map.set(others, map.get(others) + 1);        
    } else {
     
      map.set(others, map.get(others) + responses[i].length);
    }
  }

  const data = [[], []];
  map.forEach((value, key) => {
    data[0].push(key);
    data[1].push(value);
  });

  


  const graph = document.getElementById("vacation");
  const ctx = graph.getContext("2d");
  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: data[0],
      datasets: [
        {
          label: "Graph for vacation country choices",
          data: data[1],
          backgroundColor: [
            "#addbda",
            "#ade498",
            "#ffaec0",
            "#ffab13",
            "#a1cae2",
            "rgba(18, 14, 143, 1)",
          ],
          borderColor: [
            "#2fdbda",
            "#ade128",
            "#ffaec0",
            "#ffab13",
            "#a8cae2",
            "rgba(188, 13, 143, 1)",
          ],
          borderWidth: 1.5,
          hoverBorderColor: "#000000",
        },
      ],
    },
    options: {
      layout: {
        padding: {
          left: 5,
          right: 60,
          top: 0,
          bottom: 0,
        },
      },
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: mcqData.Title,
        position: "top",
        fontSize: 25,
        fontStyle: "bold",
        fontColor: "#000000",
        padding: 20,
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Count",
              fontSize: 20,
              fontColor: "#000000",
              padding: 20,
            },
            ticks: {
              stepSize: 1,
              max: Math.max(...data[1]) + 1,
              min: 0,
              fontColor: "#000000",
              fontSize: 12,
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Vacation Countries",
              fontSize: 15,
              fontColor: "#000000",
              padding: 10,
            },
            ticks: {
              fontColor: "#000000",
              fontSize: 12,
            },
          },
        ],
      },
    },
  });

  console.log(map);
}



function makeChart(data1) {
  var i, j;

  titles = data1.columns;
  titles.shift();       // Since we dont need the 'timestamp' column
  
  for (i = 0; i < titles.length; i++) {
    var data_obj = {};
    data_obj.Title = titles[i];
    data_obj.Type = types[i];
    data_obj.Options = options[i];
    data_obj.Responses = [];
    // console.log(data_obj);
    data.push(data_obj);
  }

  
  for (i = 0; i < data1.length; i++) {
    for (j = 0; j < data.length; j++) {
      var res = [];
      // console.log(data1[i][titles[j]].split(", "));
      res.push(data1[i][titles[j]].split(", "));
       res.push(data1[i][titles[j]].split("; "));

      
      if (j == 1) {
        data[j].Responses.push(res[0]); // Always push the response array for CHECKBOX type
      } else {
        if (res[0].length == 1) {
          // If there is only 1 response, just push the string, no the array
          data[j].Responses.push(res[0][0]); 
        } else {
          data[j].Responses.push(res[0]); // If there are multiple responses, push the array
        }
      }
    }
  }

  console.log(data);

  
    data.forEach((item) => {
      switch (item.Type) {
        case LIST:
          listProcessing(item);
          break;
        case MCQ:
          mcqProcessing(item);
          break;
        case CHECKBOX:
          checkboxProcessing(item);
          break;
      }
    });
  //};
}


d3.csv("Responses.csv", (d) => {
  makeChart(d);
});