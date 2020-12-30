let BarLineConfig = {
    type: 'bar',
    "options": {
        elements: {
            line: {
                borderColor: "#C9C9FC",
                "backgroundColor": "#C9C9FC",
                fill: false,
                "borderWidth": 1,

            }
        },
        title: {
            display: true,
            text: '',
            fontSize: 19,
        },
        "scales": {
            "yAxes": [{
                "ticks": {
                    "beginAtZero": true,
                    callback: function (label, index, labels) {
                        return currNumberFormatFunc(label);
                    }
                },
                gridLines: {
                    drawBorder: true,
                    display: true,
                },
            }],

        },
        chartArea: {
            backgroundColor: 'rgba(255, 255, 255, 0.5)'
        },
        legend: {
            display: false,
            position: 'bottom',
        },
        maintainAspectRatio: false,
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    if (tooltipItem.yLabel !== "")
                        return currNumberFormatFunc(tooltipItem.yLabel);

                    return data.labels[tooltipItem.index] + ": " + currNumberFormatFunc(data.datasets[0].data[tooltipItem.index]);
                },
                title: function (tooltipItem, data) {
                    if (tooltipItem[0].xLabel !== "")
                        return tooltipItem[0].xLabel;

                    return data.labels[tooltipItem.index];
                }
            }

        },
        animation: {
            "onProgress": function () {
                var chartInstance = this.chart,
                    ctx = chartInstance.ctx;

                ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize - 3, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';

                this.data.datasets.forEach(function (dataset, i) {
                    var meta = chartInstance.controller.getDatasetMeta(i);
                    meta.data.forEach(function (bar, index) {
                        var data = currNumberFormatFunc(dataset.data[index]);
                        var isHiddenMeta;
                        for (let i = 0; i < 10; i++)
                            if (dataset._meta[i] != null) {
                                isHiddenMeta = dataset._meta[i].hidden;
                                break;
                            }
                        if (!isHiddenMeta)
                            if (displayDataLabel) ctx.fillText(data, bar._model.x, bar._model.y - 5);
                    });
                });
            }
        },

    }
};

let PieConfig = {
    type: 'pie',
    "options": {
        elements: {
            line: {
                borderColor: "#C9C9FC",
                "backgroundColor": "#C9C9FC",
                fill: false,
                "borderWidth": 1,

            }
        },
        title: {
            display: true,
            text: '',
            fontSize: 19,
        },
        "scales": {
            "yAxes": [{
                "ticks": {
                    "beginAtZero": true,
                    callback: function (label, index, labels) {
                        return '';
                    }
                },
                gridLines: {
                    drawBorder: false,
                    display: false,
                },
            }],

        },
        legend: {
            display: true,
            position: 'bottom',
        },
        maintainAspectRatio: false,
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    if (tooltipItem.yLabel !== "")
                        return currNumberFormatFunc(tooltipItem.yLabel);

                    return data.labels[tooltipItem.index] + ": " + currNumberFormatFunc(data.datasets[0].data[tooltipItem.index]);
                },
                title: function (tooltipItem, data) {
                    if (tooltipItem[0].xLabel !== "")
                        return tooltipItem[0].xLabel;
                    return data.labels[tooltipItem.index];
                }
            }

        },
        chartArea: {
            backgroundColor: 'rgba(255, 255, 255, 0.5)'
        },
        animation: {
            "onProgress": function () {
                //  drawSegmentValues(this.chart)
            }
        },

    }
};


function drawSegmentValues(myPieChart) {
    for (var i = 0; i < myPieChart.segments.length; i++) {
        ctx.fillStyle = "white";
        var textSize = canvas.width / 10;
        ctx.font = textSize + "px Verdana";
        // Get needed variables
        var value = myPieChart.segments[i].value;
        var startAngle = myPieChart.segments[i].startAngle;
        var endAngle = myPieChart.segments[i].endAngle;
        var middleAngle = startAngle + ((endAngle - startAngle) / 2);

        // Compute text location
        var posX = (radius / 2) * Math.cos(middleAngle) + midX;
        var posY = (radius / 2) * Math.sin(middleAngle) + midY;

        // Text offside by middle
        var w_offset = ctx.measureText(value).width / 2;
        var h_offset = textSize / 4;
        if (displayDataLabel)
            ctx.fillText(value, posX - w_offset, posY + h_offset);
    }
}

let colorsTmp = [
    '#6D2594', '#4A6394', '#42C2BC', '#94564A', '#948E25', '#5D4A94', '#944A4A', '#4A4C94', '#3AC3CC', '#252894', '#259492', '#7F944A', '#6F9425', '#944A69', '#945A25', '#4A9469', '#704A94', '#BC42C2', '#4CC242', '#C2BE42', '#4A944B', '#25945B', '#4A9490', '#3ACC8B', '#94257D', '#947B4A', '#942525', '#269425', '#943525', '#946565', '#4265C2', '#255194'
]

function getRandomColor(i) {
    var bigint = parseInt(colorsTmp[i % 50].replace('#', '').replace(' ', ''), 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return 'rgba(' + r + "," + g + "," + b + ')';
}

function getRandomNum() {
    let o = Math.round,
        r = Math.random,
        s = 255;
    let int1 = o(r() * s);
    let int2 = o(r() * s);
    let int3 = o(r() * s);

    while (int1 > 100 && int2 > 100 && int3 > 100) {
        int1 = o(r() * s);
        int2 = o(r() * s);
        int3 = o(r() * s);
    }

    return int1 + '' + int2 + '' + int3;
}

function percantageFormat(x) {
    return x + '%';
}

function numberFormat(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function numberCurrFormat(x) {
    return " ₪ " + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function timeFormat(value) {
    let date = moment(value);
    return date.format('HH:mm');
}

function convertToSecond(valu) {
    var a = valu.split(':');
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    return seconds;

}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2);
}

let DataJson = {};
let labelsRaw;
let dataRaw = $("input[name*='hidGrapData']");
let dataList = [];
let colors = [];
let timeAxisY = false;
let numberFormatFunc = [];
let currNumberFormatFunc;
let GraphsIds = [];
let dataSetsObject = {};
let params = [];
let submitBtn = 0;
let displayDataLabel = false;

function callProc() {
    if ($("input[id='ctl00_PageContent_cbGraph']").is(":checked"))
        localStorage.setItem('submitBtn', '1')
    else
        localStorage.setItem('submitBtn', '0')
    return ShowMe('ctl00_PageContent_btSumbit');
}
$(document).ready(function () {
    if (!localStorage.getItem('submitBtn'))
        localStorage.setItem('submitBtn', '0')

    $("input[id='ctl00_PageContent_cbGraph']").change(function () {
        $("div[id*='graphMainDiv']").each(function () {
            this.remove();
        });
    });
    $("#btnDOIT").attr("onclick", "return 3e3efde()");

    if (!localStorage.getItem('AllInOneChecked') && localStorage.getItem('AllInOneChecked') != '')
        localStorage.setItem('AllInOneChecked', 'checked')
    Chart.pluginService.register({
        beforeDraw: function (chart, easing) {
            if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
                var helpers = Chart.helpers;
                var ctx = chart.chart.ctx;
                var chartArea = chart.chartArea;

                ctx.save();
                ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
                ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
                ctx.restore();
            }
        }
    });
    let graphBtn = $("input[id='ctl00_PageContent_cbGraph']");
    $(window).bind("load", function () {
        if ($("input[id='ctl00_PageContent_cbGraph']").is(":checked")) {
            graphBtn.after("<label for='minmizeGraphs' style='padding-right: 5px;'>איחוד גרפים</label> " +
                "<input type='checkbox' id='minmizeGraphs' " + localStorage.getItem('AllInOneChecked') + "/>");
            $("input[id*='minmizeGraphs']").click(function () {
                if (!$(this).is(':checked')) {
                    localStorage.removeItem('AllInOneChecked');
                    localStorage.setItem('AllInOneChecked', '')
                    createGraphs(false);
                    setCanvasOnClick();
                } else {

                    localStorage.removeItem('AllInOneChecked');
                    localStorage.setItem('AllInOneChecked', 'checked')
                    createGraphs(true);
                    setCanvasOnClick();
                }

            });
            let i = 0;
            $('#ctl00_PageContent_cbGraphColumns input:checked').each(function () {
                i = i + 1;
            });
            if (i == 1) {
                $('#minmizeGraphs,label[for=minmizeGraphs]').hide();
            } else
                $('#minmizeGraphs,label[for=minmizeGraphs]').show();

        }

    });

    let labelList = dataRaw.val().split('^');
    if (!$("input[id*='cbGraph']").is(':checked'))
        if (dataRaw.val() === "") return;
    if (dataRaw.val() === "") return;
    if (labelList.length < 1) return;
    for (let i = 0; i < labelList.length; i++) {

        let temp = labelList[i].split('$');
        dataList[i] = [];
        for (let j = 0; j < temp.length; j++) {
            if (j > 0 && i === 0) {
                GraphsIds[j - 1] = getRandomNum();
                colors[j - 1] = getRandomColor(j);
                numberFormatFunc[j - 1] = numberFormat;

                if (temp[j].includes('₪'))
                    numberFormatFunc[j - 1] = numberCurrFormat;
                else if (temp[j].includes('%'))
                    numberFormatFunc[j - 1] = percantageFormat;

            }
            while (temp[j].includes(','))
                temp[j] = temp[j].replace(',', '');
            while (temp[j].includes('₪'))
                temp[j] = temp[j].replace('₪', '');
            while (temp[j].includes('%'))
                temp[j] = temp[j].replace('%', '');

            dataList[i][j] = temp[j];

        }
    }

    $.each($("input[id*='cbGraphColumns']:checked"), function () {
        let label = $("label[for='" + $(this).attr('id') + "']");
        params.push(label.text());

    });
    if ($("input[id*='cbGraph']").is(':checked')) {
        if (localStorage.getItem('submitBtn') === '1') {
            if (localStorage.getItem('AllInOneChecked') === "checked")
                createGraphs(true);
            else
                createGraphs(false);
        }
        localStorage.setItem('submitBtn', '0');
    }
    setCanvasOnClick();
});

function createGraphs(minmizeAll) {
    let labels = [];

    DataJson.graph = [];
    $("div[id*='graphMainDiv']").remove();
    for (let i = 0; i < dataList.length; i++) {
        labels[i] = dataList[i][0];
    }

    dataSetsObject.dataSets = [];
    for (let i = 0; i < GraphsIds.length; i++) {
        let labelsData = [];
        for (let j = 0; j < dataList.length; j++) {
            labelsData[j] = dataList[j][i + 1];
        }

        let graphId = "chartjs-" + GraphsIds[i];
        DataJson.graph[graphId] = {};
        DataJson.graph[graphId].data = [];
        DataJson.graph[graphId].labels = [];
        DataJson.graph[graphId].data.push(labelsData);
        DataJson.graph[graphId].labels.push(labels);

        dataSetsObject.labels = labels;

        let temp = {};
        temp.label = params[i];
        temp.fill = false;
        temp.data = [];
        temp.fillColor = colors[i];
        temp.backgroundColor = colors[i];
        temp.data = labelsData;
        temp.borderColor = colors[i];
        if (numberFormatFunc[i] === percantageFormat)
            temp.yAxisID = "y-axis-2";
        else
            temp.yAxisID = "y-axis-1";
        dataSetsObject.dataSets.push(temp);

        if (!minmizeAll)
            createChart('bar', labels, DataJson.graph[graphId].data, colors[i], numberFormatFunc[i], GraphsIds[i], params[i], DataJson.graph[graphId].data[0][0].toString().includes(':'));
    }
    if (minmizeAll) {
        createChartMini('bar', numberFormatFunc[0], GraphsIds[0], labels);
    }

}

let reportHeader;
let graphId;
let chartsTmp = [];

function createChart(chartType, labels, labelsData, colorName, numberFormat, chartid, header, timeFormat) {
    reportHeader = header; 
    let graphId = "chartjs-" + chartid;
    let displayLegend = false;
    if ((chartType !== "bar" && chartType !== "line"))
        displayLegend = true;
    if (labels.length < 20)
        GraphWidth = "50%";
    else if (labels.length < 30)
        GraphWidth = "75%";
    else {
        GraphWidth = "100%";
        displayLegend = false;
    }

    GraphWidth = "100%";
    if (chartType !== "bar" && chartType !== "line")
        GraphWidth = "50%";

    $("div[id*='thetbl']").append('<div id="graphMainDiv' + chartid + '" style="float:right; padding-right:15px;min-height:370px;min-width:45%">' +
        '<label style="font-family:Helvetica, Arial, Sans-Serif;">סוג גרף:</label>' +
        '<select style="width:110px;font-family:Helvetica, Arial, Sans-Serif;" name="charType-' + chartid + '" class="soflow" onchange="changeType(this.value,\'' + chartid + '\')" id="charType-' + chartid + '" > ' +
        '<option value="bar">עמדות</option>  <option value="line">לינארי</option>  <option value="pie">עוגה</option>' +
        '   <option value="doughnut">דונאט</option>  <option value="polarArea">פולאר</option></select> <input style="width:80px;font-family:Helvetica, Arial, Sans-Serif;" class="soflow" type="button" value="שמור גרף" onclick="downloadImage(\'' + chartid + '\')"/> </div>');

    $("div[id*='graphMainDiv" + chartid + "']").append('<div  id="graphDiv' + chartid + '" style="backgroundColor:#fff;padding:5px;width: ' +
        GraphWidth + '; height: 80%;min-height:270px;;margin:0 auto;"><canvas style="backgroundColor:#fff" id="' + graphId + '" style="display: block;"></canvas></div>');

    $("select[id='charType-" + chartid + "']").after("<label  style='font-family:Helvetica, Arial, Sans-Serif;' for='displayDataLabels-" + chartid + "' style='padding-right: 5px;'>תוויות נתונים</label> " +
        "<input type='checkbox'  style='font-family:Helvetica, Arial, Sans-Serif;padding-top: 5px;' id='displayDataLabels-" + chartid + "' />");
    $("input[id*='displayDataLabels-" + chartid + "']").click(function () {
        displayDataLabel = false;
        if ($(this).is(':checked'))
            displayDataLabel = true;
        let chartidnumber = "chartjs-" + $(this).attr('id').split('-')[1];
        Chart.helpers.each(Chart.instances, function (instance) {
            let mychart = instance;
            if (mychart.ctx.canvas.id === chartidnumber)
                // changeType(mychart.config.type,mychart.ctx.canvas.id.split("-")[1]);
                mychart.update();

        });
    });

    let ctx = document.getElementById(graphId).getContext("2d");

    if (!timeFormat) {
        myChart = new Chart(ctx, {
            "type": chartType,
            "data": {
                "labels": labels,
                "datasets": [{
                    "data": labelsData[0],
                    "backgroundColor": colorName,
                }]
            },
            "options": {
                responsive: true,
                elements: {
                    line: {
                        borderColor: "#C9C9FC",
                        "backgroundColor": "#C9C9FC",
                        fill: false,
                        "borderWidth": 1,

                    }
                },
                title: {
                    display: true,
                    text: reportHeader,
                    fontSize: 19,
                },
                "scales": {
                    "yAxes": [{
                        "ticks": {
                            "beginAtZero": true,
                            callback: function (label, index, labels) {
                                if (!displayLegend)
                                    return numberFormat(label);
                                else
                                    return '';
                            }
                        },
                        gridLines: {
                            drawBorder: !displayLegend,
                            display: !displayLegend,
                        },
                    }],

                },
                legend: {
                    display: displayLegend,
                    position: 'bottom',
                },
                maintainAspectRatio: false,
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            if (tooltipItem.yLabel !== "")
                                return numberFormat(tooltipItem.yLabel);

                            return data.labels[tooltipItem.index] + ": " + numberFormat(data.datasets[0].data[tooltipItem.index]);
                        },
                        title: function (tooltipItem, data) {
                            if (tooltipItem[0].xLabel !== "")
                                return tooltipItem[0].xLabel;
                            return data.labels[tooltipItem.index];
                        }
                    }

                },
                animation: {
                    "onProgress": function () {
                        var chartInstance = this.chart,
                            ctx = chartInstance.ctx;

                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize - 3, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';

                        this.data.datasets.forEach(function (dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function (bar, index) {
                                var data = numberFormat(dataset.data[index]);
                                if ($("input[id='minmizeGraphs']").checked) {
                                    var isHiddenMeta;
                                    for (let i = 0; i < 10; i++)
                                        if (dataset._meta[i] != null) {
                                            isHiddenMeta = dataset._meta[i].hidden;
                                            break;
                                        }
                                    if (!isHiddenMeta)
                                        if (displayDataLabel) ctx.fillText(data, bar._model.x, bar._model.y - 5);
                                } else
                                    if (displayDataLabel) ctx.fillText(data, bar._model.x, bar._model.y - 5);
                            });
                        });
                    }
                },
                chartArea: {
                    backgroundColor: 'rgba(255, 255, 255, 0.5)'
                }
            }
        });
    } else {
        let ii = 0;
        for (ii = 0; ii < labelsData[0].length; ii++)
            labelsData[0][ii] = convertToSecond(labelsData[0][ii]);
        myChart = new Chart(ctx, {
            "type": chartType,
            "data": {
                "labels": labels,
                "datasets": [{
                    "data": labelsData[0],
                    "backgroundColor": colorName,
                }]
            },
            "options": {
                responsive: true,
                title: {
                    display: true,
                    text: reportHeader,
                    fontSize: 19,
                },
                "scales": {
                    yAxes: [{
                        type: 'linear',
                        position: 'left',
                        ticks: {

                            stepSize: 360,
                            beginAtZero: true,
                            callback: value => {
                                return secondsToHms(value);
                            }
                        }
                    }]
                },
                legend: {
                    display: displayLegend
                },
                maintainAspectRatio: false,
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            if (tooltipItem.yLabel !== "")
                                return secondsToHms(tooltipItem.yLabel);

                            return data.labels[tooltipItem.index] + ": " + numberFormat(data.datasets[0].data[tooltipItem.index]);
                        },
                        title: function (tooltipItem, data) {
                            if (tooltipItem[0].xLabel !== "")
                                return tooltipItem[0].xLabel;

                            return data.labels[tooltipItem.index];
                        }
                    }

                }
            }
        });
    }
}

function downloadImage(myChart) {

    let canvas = document.getElementById("chartjs-" + myChart);
    //set new title
    Chart.helpers.each(Chart.instances, function (instance) {
        if (instance.chart.canvas.id === "chartjs-" + myChart)
            myChart = instance;
    });

    let context = canvas.getContext('2d');

    //cache height and width
    let w = canvas.width;
    let h = canvas.height;

    let data = context.getImageData(0, 0, w, h);

    let compositeOperation = context.globalCompositeOperation;

    context.globalCompositeOperation = "destination-over";
    context.fillStyle = "#fff";
    context.fillRect(0, 0, w, h);

    let imageData = canvas.toDataURL("image/png");

    context.clearRect(0, 0, w, h);
    context.putImageData(data, 0, 0);
    context.globalCompositeOperation = compositeOperation;

    let a = document.createElement('a');
    a.href = imageData;
    a.download = myChart.options.title.text + '.png';
    a.click();

}

let GraphWidth = "100%";

function createChartMini(chartType, numberFormat, chartid, labels) {

    reportHeader = ''; 

    let graphId = "chartjs-" + chartid;
    let displayLegend = false;
    if ((chartType !== "bar" && chartType !== "line"))
        displayLegend = true;
    if (labels.length < 20)
        GraphWidth = "50%";
    else if (labels.length < 30)
        GraphWidth = "75%";
    else {
        GraphWidth = "100%";
        displayLegend = false;
    }
    GraphWidth = "90%";
    if (chartType !== "bar" && chartType !== "line")
        GraphWidth = "50%";
    if ($("input[id*='cbGraphColumns']:checked").length > 1)
        $("div[id*='thetbl']").append('<div id="graphMainDiv' + chartid + '" style="float:right; padding-right:15px;min-height:410px;min-width:45%">' +
            '<label style="font-family:Helvetica, Arial, Sans-Serif;">סוג גרף:</label>' +
            '<select style="width:110px;font-family:Helvetica, Arial, Sans-Serif;" name="charType" class="soflow" onchange="changeType(this.value,\'' + chartid + '\')" id="charType" >' +
            '<option value="bar">עמדות</option>  <option value="line">לינארי</option> ' +
            '</select> ' +
            '<input style="width:80px;font-family:Helvetica, Arial, Sans-Serif;" class="soflow" type="button" value="שמור גרף" onclick="downloadImage(\'' + chartid + '\')"/> ' +
            '</div>');
    else
        $("div[id*='thetbl']").append('<div id="graphMainDiv' + chartid + '" style="float:right; padding-right:15px;min-height:370px;min-width:45%">' +
            '<label style="font-family:Helvetica, Arial, Sans-Serif;">סוג גרף:</label>' +
            '<select style="width:110px;font-family:Helvetica, Arial, Sans-Serif;" name="charType-' + chartid + '" class="soflow" onchange="changeType(this.value,\'' + chartid + '\')" id="charType-' + chartid + '" > ' +
            '<option value="bar">עמדות</option>  <option value="line">לינארי</option>  <option value="pie">עוגה</option>' +
            '   <option value="doughnut">דונאט</option>  <option value="polarArea">פולאר</option></select> <input style="width:80px;font-family:Helvetica, Arial, Sans-Serif;" class="soflow" type="button" value="שמור גרף" onclick="downloadImage(\'' + chartid + '\')"/> </div>');

    $("select[id=charType]").after("<label  style='font-family:Helvetica, Arial, Sans-Serif;' for='displayDataLabels-" + chartid + "' style='padding-right: 5px;'>תוויות נתונים</label> " +
        "<input type='checkbox'  style='font-family:Helvetica, Arial, Sans-Serif;padding-top: 5px;' id='displayDataLabels-" + chartid + "' />");
    $("input[id*='displayDataLabels']").click(function () {
        displayDataLabel = false;
        if ($(this).is(':checked'))
            displayDataLabel = true;
        let chartidnumber = "chartjs-" + $(this).attr('id').split('-')[1];
        Chart.helpers.each(Chart.instances, function (instance) {
            let mychart = instance;
            if (mychart.ctx.canvas.id === chartidnumber)

                mychart.update();

        });
    });
    createMinimal(chartType, numberFormat, chartid, labels);
    setCanvasOnClick();
}

function createMinimal(chartType, numberFormat, chartid, labels) {
    let ii = 0;
    for (ii = 0; ii < dataSetsObject.dataSets.length; ii++) {
        if (dataSetsObject.dataSets[ii].data[0].toString().includes(':')) {
            dataSetsObject.dataSets[ii].yAxisID = "y-axis-3";
            let j = 0;
            for (j = 0; j < dataSetsObject.dataSets[ii].data.length; j++) {
                dataSetsObject.dataSets[ii].data[j] = convertToSecond(dataSetsObject.dataSets[ii].data[j]);
            }
        }
    }

    $("div[id*='graphDiv']").remove();
    $("div[id*='graphMainDiv" + chartid + "']").append('<div  id="graphDiv' + chartid + '" style="backgroundColor:#fff;padding:5px;width: ' +
        GraphWidth + '; height: 90%;min-height:390px;min-width:980px;margin:0 auto;"><canvas style="backgroundColor:#fff" id="chartjs-' + chartid + '" style="display: block;"></canvas><div>');
    if (chartType === "line") {
        let options1 = {
            responsive: true,
            bezierCurve: false,
            scaleOverride: true,
            scaleSteps: 10,
            scaleStepWidth: 100,
            scaleStartValue: 0,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: "left",
                    id: "y-axis-1",
                    "ticks": {
                        "beginAtZero": true,
                        callback: function (label, index, labels) {

                            return numberFormat(label).replace("₪", "");

                        }
                    },
                }, {
                    type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: "right",
                    id: "y-axis-2",
                    "ticks": {
                        "beginAtZero": true,
                        callback: function (label, index, labels) {

                            return percantageFormat(label);

                        }
                    },
                    // grid line settings
                    gridLines: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                }, {
                    type: 'linear',
                    position: 'left',
                    display: true,
                    id: "y-axis-3",
                    ticks: {

                        stepSize: 360,
                        beginAtZero: true,
                        callback: value => {
                            return secondsToHms(value);
                        }
                    }
                }],
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        if (tooltipItem.yLabel !== "")
                            if (data.datasets[tooltipItem.datasetIndex].yAxisID === "y-axis-2")
                                return percantageFormat(tooltipItem.yLabel.toString());
                            else if (data.datasets[tooltipItem.datasetIndex].yAxisID === "y-axis-3")
                                return secondsToHms(tooltipItem.yLabel.toString());
                            else
                                return numberFormat(tooltipItem.yLabel).replace("₪", "");

                        return data.labels[tooltipItem.index] + ": " + numberFormat(data.datasets[0].data[tooltipItem.index]);
                    },
                    title: function (tooltipItem, data) {
                        if (tooltipItem[0].xLabel !== "")
                            return tooltipItem[0].xLabel;
                        return data.labels[tooltipItem.index];
                    }
                }

            },
            animation: {
                "onProgress": function () {
                    let chartInstance = this.chart,
                        ctx = chartInstance.ctx;

                    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize - 3, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';

                    this.data.datasets.forEach(function (dataset, i) {
                        let meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function (bar, index) {
                            let data;
                            if (dataset.yAxisID === "y-axis-2")
                                data = percantageFormat(dataset.data[index]);
                            else
                                data = numberFormat(dataset.data[index]).replace("₪", "");
                            var isHiddenMeta;
                            for (let i = 0; i < 10; i++)
                                if (dataset._meta[i] != null) {
                                    isHiddenMeta = dataset._meta[i].hidden;
                                    break;
                                }
                            if (!isHiddenMeta)
                                if (displayDataLabel) ctx.fillText(data, bar._model.x, bar._model.y - 5);
                        });
                    });
                }
            },
            chartArea: {
                backgroundColor: 'rgba(255, 255, 255, 0.5)'
            }
        };
        let data1 = {
            labels: dataSetsObject.labels,
            datasets: dataSetsObject.dataSets
        };
        let ctx2 = document.getElementById('chartjs-' + chartid).getContext("2d");

        new Chart(ctx2, {
            type: 'line',
            data: data1,
            options: options1
        });

    } else {

        let data1 = {
            labels: dataSetsObject.labels,
            datasets: dataSetsObject.dataSets
        };

        let ctx2 = document.getElementById('chartjs-' + chartid).getContext("2d");
        new Chart(ctx2, {
            type: 'bar',
            data: data1,
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: true,
                    text: params.join(' - '),
                },
                scales: {
                    yAxes: [{
                        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: true,
                        position: 'left',
                        id: 'y-axis-1',
                        "ticks": {
                            "beginAtZero": true,
                            callback: function (label, index, labels) {

                                return numberFormat(label).replace("₪", "");

                            }
                        },
                    }, {
                        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: true,
                        position: 'right',
                        id: 'y-axis-2',
                        gridLines: {
                            drawOnChartArea: false
                        },
                        "ticks": {
                            "beginAtZero": true,
                            callback: function (label, index, labels) {

                                return percantageFormat(label);

                            }
                        },
                    }, {
                        type: 'linear',
                        position: 'left',
                        display: true,
                        id: "y-axis-3",
                        ticks: {

                            stepSize: 360,
                            beginAtZero: true,
                            callback: value => {
                                return secondsToHms(value);
                            }
                        }
                    }],
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            if (tooltipItem.yLabel !== "")
                                if (data.datasets[tooltipItem.datasetIndex].yAxisID === "y-axis-2")
                                    return percantageFormat(tooltipItem.yLabel.toString());
                                else if (data.datasets[tooltipItem.datasetIndex].yAxisID === "y-axis-3")
                                    return secondsToHms(tooltipItem.yLabel.toString());
                                else
                                    return numberFormat(tooltipItem.yLabel).replace("₪", "");

                            return data.labels[tooltipItem.index] + ": " + numberFormat(data.datasets[0].data[tooltipItem.index]);
                        },
                        title: function (tooltipItem, data) {
                            if (tooltipItem[0].xLabel !== "")
                                return tooltipItem[0].xLabel;
                            return data.labels[tooltipItem.index];
                        }
                    }

                },
                animation: {
                    "onProgress": function () {
                        let chartInstance = this.chart,
                            ctx = chartInstance.ctx;

                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize - 3, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';

                        this.data.datasets.forEach(function (dataset, i) {
                            let meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function (bar, index) {
                                let data;
                                if (dataset.yAxisID === "y-axis-2")
                                    data = percantageFormat(dataset.data[index]);
                                else if (dataset.yAxisID === "y-axis-3")
                                    data = secondsToHms(dataset.data[index]);
                                else
                                    data = numberFormat(dataset.data[index]).replace("₪", "");
                                var isHiddenMeta;
                                for (let i = 0; i < 10; i++)
                                    if (dataset._meta[i] != null) {
                                        isHiddenMeta = dataset._meta[i].hidden;
                                        break;
                                    }
                                if (!isHiddenMeta)
                                    if (displayDataLabel) ctx.fillText(data, bar._model.x, bar._model.y - 5);
                            });
                        });
                    }
                },
                chartArea: {
                    backgroundColor: 'rgba(255, 255, 255, 0.5)'
                }
            }
        });
    }
    setCanvasOnClick();
}

function changeType(newType, elemID) {
    let currchart, data;
    if ($("input[id*='minmizeGraphs']").is(":checked")) {
        createMinimal(newType, numberFormat, elemID, dataSetsObject.labels);
        return;
    }
    currNumberFormatFunc = numberFormatFunc[GraphsIds.indexOf(elemID)];
    Chart.helpers.each(Chart.instances, function (instance) {
        if (instance.chart.canvas.id === "chartjs-" + elemID)
            currchart = instance;
    });
    $("div[id*='graphDiv" + elemID + "'").remove();
    $("div[id*='graphMainDiv" + elemID + "']").append('<div  id="graphDiv' + elemID + '" style="backgroundColor:#fff;padding:5px;width: ' +
        GraphWidth + '; height: 80%;min-height:270px;;margin:0 auto;"><canvas style="backgroundColor:#fff" id="chartjs-' + elemID + '" class="chartjs" style="display: block;"></canvas></div>');

    let ctx = document.getElementById("chartjs-" + elemID).getContext("2d");
    let title = {
        display: true,
        text: currchart.config.options.title.text,
        fontSize: 19,
    };
    // Remove the old chart and all its event handles
    if (currchart) {
        config = currchart.config;
        data = currchart.data;
        currchart.destroy();
    }
    if (newType === "line" || newType === "bar") {
        config = BarLineConfig;
        config.data = data;

    } else if (newType === "pie" || newType === "doughnut") {
        config = PieConfig;
        config.data = data;
        //config.data.datasets[0].backgroundColor = colorsTmp;

    } 
    config.options.title = title;
    // Chart.js modifies the object you pass in. Pass a copy of the object so we can use the original object later
    let temp = jQuery.extend(true, {}, config);
    temp.type = newType;

    currchart = new Chart(ctx, temp);
    setCanvasOnClick();
}

let Last_Div_css = "";
let last_canvas_css = "";
let overlay_canvas_css = 'display: block;' +
    'width: 100%;' +
    'height: 100%;' +
    'background: #ffffff;';
let overLayDivCss = '  position: fixed;' +
    'display: block;' +
    'width: 100%;' +
    'height: 100%;' +
    'top: 0;' +
    'left: 0;' +
    'right: 0;' +
    'bottom: 0;padding:25px;' +
    'background-color: rgba(255,255,255);' +
    'z-index: 2;' +
    'cursor: pointer;';

function setCanvasOnClick() {
    $("canvas").each(function (index, element) {
        element.onclick = function (e) {

            let elem = e.currentTarget;
            let elemID = elem.id.split('-')[1];
            let divEle = $('#graphMainDiv' + elemID);
            if (overLayDivCss.replace(' ', '') === divEle.attr("style").replace(' ', ''))
                return;
            Last_Div_css = divEle.attr("style");
            elem = $('#chartjs-' + elemID);
            last_canvas_css = elem.attr("style");
            divEle.attr("style", overLayDivCss);
            elem.attr("style", overlay_canvas_css);

            let chartidnumber = "chartjs-" + elemID;
            try {
                Chart.helpers.each(Chart.instances, function (instance) {
                    let mychart = instance;

                    if (mychart.ctx.canvas.id === chartidnumber) {

                        changeType(mychart.config.type, elemID);

                    }
                });
            } catch (error) {

            }

            divEle.append('<a id="btn' + elemID + '" href="javascript:void(0)" class="closebtn" style="' +
                'padding: 8px;' +
                'text-decoration: none;' +
                'font-size: 36px;' +
                'color: #818181;position: absolute;top: 20px;left: 80px;font-size: 60px;"' +
                ' onclick="closeNav(' + elemID + ')">&times;</a>');

        }

    });
}

function closeNav(elemID) {
    let elem;
    let divEle = $('#graphMainDiv' + elemID);
    elem = $('#chartjs-' + elemID);
    divEle.attr("style", Last_Div_css);
    elem.attr("style", last_canvas_css);
    $("#btn" + elemID).remove();
    setCanvasOnClick();

}

function openCanvasinNewWindow(myChart) {
    let canvas = document.getElementById("chartjs-" + myChart);
    //set new title
    Chart.helpers.each(Chart.instances, function (instance) {
        if (instance.chart.canvas.id === "chartjs-" + myChart)
            myChart = instance;
    });

    let context = canvas.getContext('2d');

    //cache height and width
    let w = canvas.width;
    let h = canvas.height;

    let data = context.getImageData(0, 0, w, h);

    let compositeOperation = context.globalCompositeOperation;

    context.globalCompositeOperation = "destination-over";
    context.fillStyle = "#fff";
    context.fillRect(0, 0, w, h);

    let imageData = canvas.toDataURL("image/png");
    var win = window.open();
    win.document.write('<iframe src="' + imageData + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
}