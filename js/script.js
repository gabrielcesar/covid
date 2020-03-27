/*
 * 20200317
 * Gabriel Cesar
 * gabrielcesar2@gmail.com
 */

google.charts.load('current', {
    'packages':['geochart'],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
});

function drawRegionsMap  () 
{
    var data = google.visualization.arrayToDataTable(fetched_data);
    var options = {
        colorAxis: {colors: ['#bfe488', 'yellow', '#ff9595']},
        backgroundColor: 'transparent',
        fontFamily: 'Roboto Condensed',
        datalessRegionColor: '#777',
        defaultColor: '#f5f5f5',
        tooltip: {isHtml: true}
    };
    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);
}

var fetched_data  = [
    ['Country', 'Confirmed', 'Deaths'],
    ['', 0, 0],
]

fetch("https://corona.lmao.ninja/countries")
    .then(response => response.json())
    .then(function(data)
    {
        console.log(data)

        /*
        for (let country = 0; country < data.length; country ++)
        {
            if (data[country]['country'] == 'USA')
                fetched_data.push([ 'US', data[country]['cases'], data[country]['deaths'] ])
            else if (data[country]['country'] == 'UK')
                fetched_data.push([ 'United Kingdom', data[country]['cases'], data[country]['deaths'] ])
            else
                fetched_data.push([ data[country]['country'], data[country]['cases'], data[country]['deaths'] ])
        }
        */

        for (let country in data)
        {
            if (data[country]['country'] == 'USA')
                fetched_data.push([ 'US', data[country]['cases'], data[country]['deaths'] ])
            else if (data[country]['country'] == 'UK')
                fetched_data.push([ 'United Kingdom', data[country]['cases'], data[country]['deaths'] ])
            else
                fetched_data.push([ data[country]['country'], data[country]['cases'], data[country]['deaths'] ])
        }

        google.charts.setOnLoadCallback(drawRegionsMap);
    })

