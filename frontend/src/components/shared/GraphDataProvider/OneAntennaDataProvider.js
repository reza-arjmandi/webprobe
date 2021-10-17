export function get_ops_for_one_antenna({
    snapshot, height, title, y_min, y_max }) {
    var data = [];
    var dataSeries = { type: "line" };
    var dataPoints = [];

    snapshot.forEach((element, idx) => {
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
        axisY: {
            minimum: y_min,
            maximum: y_max,
        },
        data: data,
    }

    return options;
}