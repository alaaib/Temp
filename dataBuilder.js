
const buildValidJsonObject = (data) => {
    const obj = {};
    obj.columns = data.columns;
    obj.types = data.types
    obj.rows = data.rows.map(row => {
        return row.map((cell, index) => {
            switch (data.types[index].toLowerCase()) {
                case 'string':
                    return cell
                case 'boolean':
                    return cell.toLowerCase() === 'true'
                case 'int32':
                case 'decimal':
                case 'int64':
                    return Number(cell)
                case 'percentage':
                    return Number(cell)*100
                case 'datetime':
                    return new Date(Number(cell) * 1000)
                case 'timespan':
                    return cell
                default:
                    return cell
            }

        })
    })

    return obj

}

const convertTableToJson = () => {
    var t = document.querySelector("table");

    var j = [].reduce.call(t.rows, function (res, row) {
        res[row.cells[0].textContent.slice(0, -1)] = row.cells[1].textContent;
        return res
    }, {});
    return JSON.stringify(j, null, 2);
}

$.getJSON("https://raw.githack.com/alaaib/Temp/master/data.json", function (json) {
    const data = buildValidJsonObject(json)
    json.reportName = 'דוח יומי'
    buildLineOrBarChart(json, 'line');

});