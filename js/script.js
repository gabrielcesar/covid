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

var historical = []

fetch("https://corona.lmao.ninja/v2/historical")
    .then(response => response.json())
    .then(function(data)
    {
        historical = data
    })

chart_evolution_label = (date, confirmed, death) => {
    document.getElementById('arwen_chart_evolution_label').innerHTML = date + ' &bull; Cases <span class=\'arwen_color_orange arwen_font_size_10\'>' + confirmed + '</span> &bull; Deaths <span class=\'arwen_color_red arwen_font_size_10\'>' + death + '</span>'
}

function chart_evolution_plot (country) 
{
    country_name = country
    data = historical

    console.log(country_name)

    if (country_name == 'US')
        country_name = 'USA'
    else if (country_name == 'United Kingdom')
        country_name = 'uk'

    for (let country in data)
    {
        let country_data = []

        if(country_name == data[country]['country'])
        {
            for (let day in data[country]['timeline']['cases']) 
                country_data.push({date: day, confirmed: data[country]['timeline']['cases'][day], death: data[country]['timeline']['deaths'][day]})

            document.getElementById('arwen_chart_evolution').innerHTML = chart_evolution_svg 

            let chart_width = 256
            let chart_height = 140
            let path_d_confirmed = 'M 0 0 ' 
            let path_d_death = 'M 0 0 ' 
            let chart = document.getElementById('chart')

            chart.style.width = chart_width 
            chart.style.height = chart_height

            for (let day in country_data) 
            {
                let path_d_confirmed_x = (parseInt(day) + 1) * (chart_width / country_data.length)
                let path_d_confirmed_y = country_data[day]['confirmed'] * (chart_height / country_data[country_data.length - 1]['confirmed'])
                path_d_confirmed += path_d_confirmed_x + ' ' + path_d_confirmed_y + ' '

                let path_d_death_x = (parseInt(day) + 1) * (chart_width / country_data.length)
                let path_d_death_y = country_data[day]['death'] * (chart_height / country_data[country_data.length - 1]['confirmed'])
                path_d_death += path_d_death_x + ' ' + path_d_death_y + ' '

                let line_x = '<path style="fill: none; stroke-width: 1;" stroke="#2b2c26" d="M ' + path_d_confirmed_x + ' 0 ' + path_d_confirmed_x + ' ' + chart_height + '" />'
                document.getElementById('lines').innerHTML += line_x

                let line_y = '<path style="fill: none; stroke-width: 1;" stroke="#2b2c26" d="M 0 ' + (chart_height / country_data.length) * day + ' ' + chart_width + ' ' + (chart_height / country_data.length) * day + '"/>'
                document.getElementById('lines').innerHTML += line_y

                let rect = '<rect style="width: ' + (chart_width / country_data.length) + 'px; height: 100%; fill: #00ffff; x: ' + parseInt(day) * (chart_width / country_data.length) + 'px; y: 0px; opacity: 0;" onmouseover="this.style.opacity = 0.3; chart_evolution_label(\'' + country_data[day]['date'] + '\', ' + country_data[day]['confirmed'] + ', ' + country_data[day]['death'] + ')" onmouseout="this.style.opacity = 0"/>'
                document.getElementById('rects').innerHTML += rect
            }

            document.getElementById('chart_path_confirmed').setAttribute("transform", 'scale(1, -1) translate(0, -' + chart_height + ')')
            document.getElementById('chart_path_confirmed').setAttribute('d', path_d_confirmed)
            document.getElementById('chart_path_death').setAttribute("transform", 'scale(1, -1) translate(0, -' + chart_height + ')')
            document.getElementById('chart_path_death').setAttribute('d', path_d_death)
            document.getElementById('arwen_chart_evolution_label').innerHTML = country_name
        }
    }
}

function drawRegionsMap  () 
{
    var data = google.visualization.arrayToDataTable(google_chart_data);
    var options = {
        colorAxis: {colors: ['#bfe488', 'yellow', '#ff9595']},
        backgroundColor: 'transparent',
        fontFamily: 'Roboto Condensed',
        datalessRegionColor: '#777',
        defaultColor: '#f5f5f5',
        tooltip: {isHtml: true}
    };
    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    function chart_google()
    {
        var selection = chart.getSelection()[0];

        if (selection)
            chart_evolution_plot(data.getValue(selection.row, 0))
    }

    google.visualization.events.addListener(chart, 'select', chart_google);
    chart.draw(data, options);
}

var google_chart_data  = [
    ['Country', 'Confirmed', 'Deaths'],
]

var total_confirmed = 0
var total_death = 0

fetch("https://corona.lmao.ninja/v2/countries")
    .then(response => response.json())
    .then(function(data)
    {
        data.sort((a, b) => parseInt(a.cases) < parseInt(b.cases) ? 1 : -1);

        for (let country in data)
        {
            if (data[country]['country'] == 'USA')
                google_chart_data.push([ 'US', data[country]['cases'], data[country]['deaths'] ])
            else if (data[country]['country'] == 'UK')
                google_chart_data.push([ 'United Kingdom', data[country]['cases'], data[country]['deaths'] ])
            else
                google_chart_data.push([ data[country]['country'], data[country]['cases'], data[country]['deaths'] ])

            document.getElementById('arwen_menu').innerHTML += '<div class=\'arwen_item\' onclick="chart_evolution_plot(\'' + data[country]['country'] + '\')"><div class=\'arwen_icon\' style=\'background-image: url("' + data[country]['countryInfo']['flag'] + '");\'></div><div class=\'arwen_item_label\'>' + data[country]['country'] + '</div><div class=\'arwen_amount arwen_death\'>' + data[country]['deaths'] + '</div><div class=\'arwen_amount arwen_confirmed\'>' + data[country]['cases'] + '</div></div>'

            total_confirmed += data[country]['cases']
            total_death += data[country]['deaths']
        }

        document.getElementById('box_total_confirmed').innerHTML = total_confirmed
        document.getElementById('box_total_death').innerHTML = total_death

        google.charts.setOnLoadCallback(drawRegionsMap);
    })

