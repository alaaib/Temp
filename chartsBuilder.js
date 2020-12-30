var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const buildDataSets = (data) => {

    return data.dataSetsColumns.map(index => {
        return {
            label: data.columns[index],
            backgroundColor: window.COLORS[index],
            borderColor: window.COLORS[index],
            data: data.rows.map(row => row[1] % (index+3) * 213),
            fill: false
        }
    })

    
}
const buildChart = (data) => {
    const dataSets = buildDataSets(data)
    var config = {
        type: 'line',
        data: {
            labels: data.rows.map(row => row[0]),
            datasets: dataSets
        },
        options: {
            responsive: true,
             title: {
                display: true,
                text: data.reportName
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            }
        }
    };
    var ctx = document.getElementById('canvas').getContext('2d');
    window.LineChartObj = new Chart(ctx, config);
}
