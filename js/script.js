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
google.charts.setOnLoadCallback(drawRegionsMap);

var fetched_data  = [
    ['Country', 'Confirmed', 'Deaths'],
]

fetch("https://corona.lmao.ninja/countries")
    .then(response => response.json())
    .then(data => {
        for (var country = 0; country < data.length; country ++)
        {
            if (data[country]['country'] == 'USA')
                fetched_data.push([ 'US', data[country]['cases'], data[country]['deaths'] ])
            else if (data[country]['country'] == 'UK')
                fetched_data.push([ 'United Kingdom', data[country]['cases'], data[country]['deaths'] ])
            else
                fetched_data.push([ data[country]['country'], data[country]['cases'], data[country]['deaths'] ])
        }
    })

function drawRegionsMap() 
{
    var data = google.visualization.arrayToDataTable(fetched_data);

    var options = {
        colorAxis: {colors: ['lightskyblue', 'yellow', '#ff9595']},
        backgroundColor: 'transparent',
        datalessRegionColor: '#777',
        defaultColor: '#f5f5f5',
        tooltip: {isHtml: true}
    };

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
    chart.draw(data, options);
}

function open_modal(status)
{
    if (status == true)
    {
        document.getElementById('arwen_modal_set').style.display = 'block'
        document.getElementById('arwen_modal').style.display = 'block'
    }
    else
    {
        document.getElementById('arwen_modal_set').style.display = 'none'
        document.getElementById('arwen_modal').style.display = 'none'
    }
}

