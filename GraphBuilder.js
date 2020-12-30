
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
                    return Number(cell)
                case 'datetime':
                    return new Date(Number(cell)*1000)
                case 'timespan':
                    return cell
                default:
                    return cell
            }

        })
    })

    console.log(obj)

}



$.getJSON("./data.json", function(json) {
    const data = json;
    console.log(json); 
    buildValidJsonObject(data)
});