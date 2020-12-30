'use strict';

window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};



window.COLORS = [
	"#80deea", "#2979ff", "#f48fb1",
	"#ffea00", "#8e24aa", "#aed581",
	"#455a64", "#4db6ac", "#eeff41",
	"#ba68c8", "#1a237e", "#d50000",
	"#f50057", "#0277bd", "#5d4037",
	"#ad1457", "#7cb342", "#64dd17",
	"#3e2723", "#311b92", "#90a4ae",
	"#304ffe", "#ffd600", "#1a237e",
	"#ffcdd2", "#673ab7", "#388e3c",
	"#76ff03", "#cddc39", "#00796b",
	"#aa00ff", "#ffab00", "#ff8a80",
	"#90caf9", "#2196f3", "#ff5252",
	"#00b8d4", "#ffa000", "#ffd740",
	"#00bfa5", "#2e7d32", "#00c853",]

const OpenMenu = () => {
	var x = document.getElementById("Demo");
	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
	} else {
		x.className = x.className.replace(" w3-show", "");
	}
}

const ExportGraphToImage = () => {
	const a = document.createElement("a");
	a.href = window.ChartURI;
	a.download = "";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}