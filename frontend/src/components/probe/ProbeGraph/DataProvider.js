export function get_1d_chart_options({
    snapshot, height, title, y_min, y_max
})
{
    var data = [];
	var dataSeries = { type: "line" };
	var dataPoints = [];
		
    snapshot.forEach((element, idx) => 
    {
      dataPoints.push({
				x: idx,
				y: element
			});
    });

	dataSeries.dataPoints = dataPoints;
	data.push(dataSeries);

	const options = {
        height: height,
        zoomEnabled: true,
        animationEnabled: false,
        title: {
            text: title
        },
        axisY:{
            minimum: y_min,
            maximum: y_max,
        },
        data: data,
	}

    return options;
}

export function get_2d_chart_options({
    snapshot, height, title, y_min, y_max, x_min, x_max
})
{
    var data = [];
	var dataSeries = { type: "scatter" };
	var dataPoints = [];
		
    for(var idx=0; idx < snapshot.length; idx+=2) {
        dataPoints.push({
            x: snapshot[idx],
            y: snapshot[idx+1]
        });
    }

	dataSeries.dataPoints = dataPoints;
	data.push(dataSeries);

	const options = {
        height: height,
        zoomEnabled: true,
        animationEnabled: false,
        title: {
            text: title
        },
        axisX: {
            gridThickness: 1,
            minimum: x_min,
            maximum: x_max,
        },
        axisY:{
            minimum: y_min,
            maximum: y_max,
        },
        data: data,
	}

    return options;
}