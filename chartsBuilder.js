Chart.plugins.register({
    beforeDraw: function (chartInstance, easing) {
        var ctx = chartInstance.chart.ctx;
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
});

function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    for (let i = 0; i < arr.length; i++)
        if (val.indexOf(arr[i].toLowerCase()) != -1)
            indexes.push(i);

    return indexes;
}


const getAxisesTypesIndexs = (types) => {
    const colTypesIndexs = {}
    colTypesIndexs.numbers = getAllIndexes(types, ["int32", "int64", "decimal"])
    colTypesIndexs.timespans = getAllIndexes(types, ["timespan"])
    colTypesIndexs.percentage = getAllIndexes(types, ["percentage"])
    return colTypesIndexs;

}
const convertTypeToAxisId = (typeName) => {
    switch (typeName) {
        case 'int32':
        case 'int64':
        case 'decimal':
            return 'numberAxis'
        case 'timespan':
            return 'timeSpanAxis'
        case 'perentage':
            return 'percentageAxis'
        default: return 'numberAxis'

    }
}
const buildDataSets = (data, axisesDef) => {
    const indexs = data.dataSetsColumns ? data.dataSetsColumns : [...Array(data.columns.length).keys()].map(i => i + 1);
    return indexs.map(index => {
        return {
            label: data.columns[index],
            backgroundColor: window.COLORS[index % 43],
            borderColor: window.COLORS[index % 43],
            data: data.rows.map(row => row[index]),
            fill: false,
            yAxisID: convertTypeToAxisId(data.types[index])
        }
    })


}

function convertDate(date) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    return [pad(date.getDate()), pad(date.getMonth() + 1), date.getFullYear()].join('/')
}


const convertToTypeLabel = (data, type) => {
    switch (type.toLowerCase()) {
        case 'string':
            return data
        case 'boolean':
            return data.toLowerCase() === 'true' ? "True" : "False"
        case 'decimal':
            return Number(data).toFixed(2).toString()
        case 'int64':
        case 'int32':
            return Number(data).toString()
        case 'percentage':
            return Number(data).toFixed(2).toString() + '%'
        case 'datetime':
            return convertDate(new Date(Number(data) * 1000))
        case 'timespan':
            return (data.toString()).toHHMMSS();
        default:
            return data
    }
}
const axisesDef = (numbers, percentages, timespans) => {
    const axises = []
    if (!!numbers)
        axises.push({
            id: 'numberAxis',
            type: 'linear',
            position: 'left',
        })
    if (!!percentages)
        axises.push({
            id: 'percentageAxis',
            type: 'linear',
            position: 'right',
            ticks: {
                // Include a dollar sign in the ticks
                callback: function (value, index, values) {
                    return (Number(value) / 100).toFixed(2).toString() + "%";
                }
            }
        })
    if (!!timespans)
        axises.push({
            id: 'timeSpanAxis',
            type: 'linear',
            position: 'right',
            ticks: {
                // Include a dollar sign in the ticks
                callback: function (value, index, values) {
                    return value.toString().toHHMMSS();
                }
            }
        })
    console.log(axises)
    return axises
}
const buildLineOrBarChart = (graphData, chartType) => {
    const axisesTypesIndexes = getAxisesTypesIndexs(graphData.types)
    const dataSets = buildDataSets(graphData)

    const config = {
        type: chartType,
        data: {
            labels: graphData.rows.map(row => convertToTypeLabel(row[0], graphData.types[0])),
            datasets: dataSets
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: graphData.reportName
            },
            animation: {
                onComplete: function () {
                    window.ChartURI = window.LineBarChartObj.toBase64Image();
                }
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem, data) {
                        // get label value
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        // get type value
                        var typeIndex = graphData.dataSets ? graphData.dataSets[tooltipItem.datasetIndex] : tooltipItem.datasetIndex
                        var type = graphData.types[typeIndex]
                        if (label) {
                            label += ': ';
                        }
                        label += convertToTypeLabel(tooltipItem.yLabel, type);
                        return label;
                    }
                }
            },
            hover: {
                mode: 'nearest',

            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: graphData.columns[0]
                    }
                }],
                yAxes: axisesDef(axisesTypesIndexes.numbers?.length,
                    axisesTypesIndexes.percentage?.length,
                    axisesTypesIndexes.timespans?.length)
            }
        }
    };
    var ctx = document.getElementById('canvas').getContext('2d');

    window.LineBarChartConfig = config;

    window.LineBarChartObj = new Chart(ctx, config);
}

const switchBarOrLineType = (type, ele) => {
    const config = window.LineBarChartConfig
    config.type = type;
    window.LineBarChartObj.update();
    if (ele)
        ele.parentElement.className = ele.parentElement.className.replace(" w3-show", "");
}

