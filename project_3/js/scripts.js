// table.json
// chart.json
// let co2Parse = [];
let sourceParse = [];
let sectorParse = [];
let bioCO = [];
let bioCount = 0;
let fossilCO = [];
let fossilCount = 0;
let totalCO = 0;
let methane = [];
let methCount = 0;
let no = [];
let noCount = 0;
let hydro = [];
let hydroCount = 0;
let perf = [];
let perfCount = 0;
let sulfur = [];
let sulfurCount = 0;
let other = [];
let otherCount = 0;
let sector = [];
let sectorCount = 0;
let total = [];
let totalCount = 0;

$(document).ready(function () {
    loadData("data/all-data.json");
});


function loadData(dataURL) {
    //ajax request
    //on success, parse the data

    $.ajax({
        method: "GET",
        url: dataURL,
        dataType: "json",
        success: parseData
    });
}

function parseData(data) {

    for (let a = 0; a < data.length; a++) {
        totalCO += data[a]["Biogenic CO2"];
        totalCO += data[a]["Fossil CO2"];
        bioCount += data[a]["Biogenic CO2"];
        fossilCount += data[a]["Fossil CO2"];
        methCount += data[a]["Methane"];
        noCount += data[a]["Nitrous Oxide"];
        hydroCount += data[a]["Hydrofluorocarbons"];
        perfCount += data[a]["Perfluorocarbons"];
        sulfurCount += data[a]["Sulfur Hexafluoride"];
        otherCount += data[a]["Other"];

        if (sector[data[a]["Sector"]] == null) {
            sector.push[data[a]["Sector"], 0];
        }
        sector[data[a]["Sector"]] += data[a]["Total Emissions"];
        totalCount += data[a]["Total Emissions"];


        // let bioCO = [];
        // let fossilCO = [];
        // let methane = [];
        // let no = [];
        // let hydro = [];
        // let perf = [];
        // let sulfur = [];
        // let other = [];
        // let total = [];

    }

    sourceParse = [
        ['CO2', totalCount],
        ['Methane', methCount],
        ['Nitrous Oxide', noCount],
        ['Hydroflourocarbons', hydroCount],
        ['Perfluorocarbons', perfCount],
        ['Sulfur Hexafluoride', sulfurCount],
        ['Other', otherCount]
    ];

    buildChart(sourceParse);

    for (let a = 0; a < sector.length; a++) {
        console.log("hey");
        sectorParse[keys.next] = sector[a];
    }

    buildPie(sectorParse);

}

function buildChart(data) {
    console.log("here");
    Highcharts.chart('chart1', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Greenhouse Gas Emissions by Source'
        },
        subtitle: {
            text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">data.gov</a>'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Population (millions)'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Population in 2017: <b>{point.y:.1f} millions</b>'
        },
        series: [{
            name: 'Population',
            data: data,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });


}

function buildPie(data) {
    console.log("in pie");
    // Build the chart
    Highcharts.chart('chart2', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Greenhouse Gas Contribution by Sector'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Sectors',
            colorByPoint: true,
            data: data
        }]
    });
}

function buildTable() {

}