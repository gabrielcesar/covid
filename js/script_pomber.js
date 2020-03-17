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

countries = [
    "Thailand", "Japan", "Singapore", "Nepal", "Malaysia", "Canada", "Australia", "Cambodia", "Sri Lanka", "Germany", "Finland", 
    "United Arab Emirates", "Philippines", "India", "Italy", "Sweden", "Spain", "Belgium", "Egypt", "Lebanon", "Iraq", "Oman", 
    "Afghanistan", "Bahrain", "Kuwait", "Algeria", "Croatia", "Switzerland", "Austria", "Israel", "Pakistan", "Brazil", "Georgia", 
    "Greece", "North Macedonia", "Norway", "Romania", "Estonia", "Netherlands", "San Marino", "Belarus", "Iceland", "Lithuania", 
    "Mexico", "New Zealand", "Nigeria", "Ireland", "Luxembourg", "Monaco", "Qatar", "Ecuador", "Azerbaijan", "Armenia", 
    "Dominican Republic", "Indonesia", "Portugal", "Andorra", "Latvia", "Morocco", "Saudi Arabia", "Senegal", "Argentina", "Chile", 
    "Jordan", "Ukraine", "Hungary", "Liechtenstein", "Poland", "Tunisia", "Bosnia and Herzegovina", "Slovenia", "South Africa", 
    "Bhutan", "Cameroon", "Colombia", "Costa Rica", "Peru", "Serbia", "Slovakia", "Togo", "Malta", "Martinique", "Bulgaria", 
    "Maldives", "Bangladesh", "Paraguay", "Albania", "Cyprus", "Brunei", "US", "Burkina Faso", "Holy See", "Mongolia", "Panama", 
    "China", "Iran", "Korea, South", "France", "Cruise Ship", "Denmark", "Czechia", "Taiwan*", "Vietnam", "Russia", "Moldova", 
    "Bolivia", "Honduras", "United Kingdom", "Congo (Kinshasa)", "Cote d'Ivoire", "Jamaica", "Reunion", "Turkey", "Cuba", "Guyana", 
    "Kazakhstan", "Cayman Islands", "Guadeloupe", "Ethiopia", "Sudan", "Guinea", "Aruba", "Kenya", "Antigua and Barbuda", "Uruguay", 
    "Ghana", "Jersey", "Namibia", "Seychelles", "Trinidad and Tobago", "Venezuela", "Curacao", "Eswatini", "Gabon", "Guatemala", 
    "Guernsey", "Mauritania", "Rwanda", "Saint Lucia", "Saint Vincent and the Grenadines", "Suriname", "occupied Palestinian territory", 
    "Kosovo", "Central African Republic", "Congo (Brazzaville)", "Equatorial Guinea", "Uzbekistan", 
]

var fetched_data  = [
    ['Country', 'Confirmed', 'Deaths'],
]

fetch("https://pomber.github.io/covid19/timeseries.json")
    .then(response => response.json())
    .then(data => {
        for (var country = 0; country < countries.length; country ++)
        {
            fetched_data.push([
                countries[country], 
                data[countries[country]][data[countries[country]].length - 1]['confirmed'], 
                data[countries[country]][data[countries[country]].length - 1]['deaths'], 
            ])
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

