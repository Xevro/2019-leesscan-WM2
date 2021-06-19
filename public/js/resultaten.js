let dataScoresLijstSchool1 = [], dataScoresLijstSchool2 = [], dataScoresLijstSchool3 = [], dataScoresLijstSchool4 = [];
let dataScoresLijstSchool5 = [], dataScoresLijstKlas1 = [], dataScoresLijstKlas2 = [], dataScoresLijstKlas3 = [],
    dataScoresLijstKlas4 = [];
let dataScoresLijstAlg1 = [], dataScoresLijstAlg2 = [], dataScoresLijstAlg3 = [], dataScoresLijstAlg4 = [],
    dataScoresLijstAlg5 = [];
let lijst1Data = false, lijst2Data = false, lijst3Data = false, lijst4Data = false, lijst5Data = false;
let urlID = window.location.href.split("http://localhost:3000/resultaten/").toString().replace(",", "");
let aantalBeschikbaar = 0;
let grafiekTotaal;
let grafiekSubresults;
let afbeeldingenEnKleuren =[];

document.getElementById("deelLink").href = "mailto:?subject=Leesscan resultaten&body= Dit zijn de resultaten van mijn leesbeleid scantest: " + document.URL;

afbeeldingenEnKleuren = [{
    name: 'Leesmonitoring en feedback',
    flag: "2921/2921183",
    color: 'rgb(215, 0, 38)'
},{
    name: 'Breed leesnetwerk',
    flag: "2924/2924765",
    color: 'rgb(235, 126, 9)'
},{
    name: 'Krachtige en motiverende leesomgeving',
    flag: "2644/2644258",
    color: 'rgb(0, 82, 180)'
}, {
    name: 'Effectieve leesdidactiek doorheen curriculum',
    flag: "2436/2436645",
    color: 'rgb(51, 196, 37)'
}, {
    name: 'Visie, doelen en acties',
    flag: "1312/1312202",
    color: 'rgb(255, 217, 68)'
}];

fetch('http://localhost:3000/leesscan/' + urlID, {method: 'GET', headers: {'Content-Type': 'application/json'}})
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].Niveau === "SCHOOL" && data[i].idgebruiker === Number(urlID)) {
                if (data[i].vragenlijst === 1) {
                    dataScoresLijstSchool1.push(data[i].totaalscore);
                    dataScoresLijstAlg1 = dataScoresLijstSchool1;
                    lijst1Data = true;
                } else if (data[i].vragenlijst === 2) {
                    dataScoresLijstSchool2.push(data[i].totaalscore);
                    dataScoresLijstAlg2 = dataScoresLijstSchool2;
                    lijst2Data = true;
                } else if (data[i].vragenlijst === 3) {
                    dataScoresLijstSchool3.push(data[i].totaalscore);
                    dataScoresLijstAlg3 = dataScoresLijstSchool3;
                    lijst3Data = true;
                } else if (data[i].vragenlijst === 4) {
                    dataScoresLijstSchool4.push(data[i].totaalscore);
                    dataScoresLijstAlg4 = dataScoresLijstSchool4;
                    lijst4Data = true;
                } else if (data[i].vragenlijst === 5) {
                    dataScoresLijstSchool5.push(data[i].totaalscore);
                    dataScoresLijstAlg5 = dataScoresLijstSchool5;
                    lijst5Data = true;
                }
            } else if (data[i].Niveau === "KLAS" && data[i].idgebruiker === Number(urlID)) {
                lijst5Data = false;
                if (data[i].vragenlijst === 1) {
                    dataScoresLijstKlas1.push(data[i].totaalscore);
                    dataScoresLijstAlg1 = dataScoresLijstKlas1;
                    lijst1Data = true;
                } else if (data[i].vragenlijst === 2) {
                    dataScoresLijstKlas2.push(data[i].totaalscore);
                    dataScoresLijstAlg2 = dataScoresLijstKlas2;
                    lijst2Data = true;
                } else if (data[i].vragenlijst === 3) {
                    dataScoresLijstKlas3.push(data[i].totaalscore);
                    dataScoresLijstAlg3 = dataScoresLijstKlas3;
                    lijst3Data = true;
                } else if (data[i].vragenlijst === 4) {
                    dataScoresLijstKlas4.push(data[i].totaalscore);
                    dataScoresLijstAlg4 = dataScoresLijstKlas4;
                    lijst4Data = true;
                }
            }

            if (data[i].Niveau === "SCHOOL") {
                afbeeldingenEnKleuren = [{
                    name: 'Effectieve leesdidactiek doorheen curriculum',
                    flag: "2436/2436645",
                    color: 'rgb(255, 217, 68)'
                }, {
                    name: 'Visie, doelen en acties',
                    flag: "1312/1312202",
                    color: 'rgb(51, 196, 37)'
                },{
                    name: 'Breed leesnetwerk',
                    flag: "2924/2924765",
                    color: 'rgb(235, 126, 9)'
                },{
                    name: 'Krachtige en motiverende leesomgeving',
                    flag: "2644/2644258",
                    color: 'rgb(0, 82, 180)'
                },{
                    name: 'Leesmonitoring en feedback',
                    flag: "2921/2921183",
                    color: 'rgb(215, 0, 38)'
                }];

                grafiekSubresults = Highcharts.chart('grafiekSubresultaten', {
                    title: {
                        text: 'Subresultaten per vragenlijst voor het schoolniveau'
                    },
                    colors: ['rgb(255, 217, 68)','rgb(51, 196, 37)', 'rgb(235, 126, 9)', 'rgb(0, 82, 180)','rgb(215, 0, 38)'],
                    yAxis: {
                        title: {
                            text: 'Gemiddelde cijfers (0-5)'
                        }
                    },
                    xAxis: {
                        title: {
                            text: 'Vraag nummer'
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true
                            },
                            enableMouseTracking: true
                        }
                    },
                    series: [{
                        name: 'Lijst 1: Begrijpend lezen',
                        data: dataScoresLijstSchool1,
                        visible: lijst1Data,
                    }, {
                        name: 'Lijst 2: Leesbeleidplan',
                        data: dataScoresLijstSchool2,
                        visible: lijst2Data,
                    }, {
                        name: 'Lijst 3: Leesomgeving',
                        data: dataScoresLijstSchool3,
                        visible: lijst3Data,
                    }, {
                        name: 'Lijst 4: Leesmonitoring',
                        data: dataScoresLijstSchool4,
                        visible: lijst4Data,
                    }, {
                        name: 'Lijst 5: Leesnetwerk',
                        data: dataScoresLijstSchool5,
                        visible: lijst5Data,
                    }],
                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 450
                            },
                            chartOptions: {
                                legend: {
                                    layout: 'horizontal',
                                    align: 'center',
                                    verticalAlign: 'bottom'
                                }
                            }, tooltip: {
                                backgroundColor: '#FCFFC5',
                                borderColor: 'black',
                                borderRadius: 10,
                                borderWidth: 3
                            }
                        }]
                    },
                    exporting: {
                        scale: 1,
                        sourceWidth: 1500,
                        allowHTML: true
                    }
                });
            } else if (data[i].Niveau === "KLAS") {
                Highcharts.chart('grafiekSubresultaten', {
                    title: {
                        text: 'Subresultaten per vragenlijst voor het klasniveau'
                    },
                    yAxis: {
                        title: {
                            text: 'Gemiddelde cijfers (0-5)'
                        }
                    },
                    xAxis: {
                        title: {
                            text: 'Vraag nummer'
                        },
                    },
                    colors: ['rgb(215, 0, 38)', 'rgb(235, 126, 9)', 'rgb(0, 82, 180)', 'rgb(51, 196, 37)', 'rgb(255, 217, 68)'],
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true
                            },
                            enableMouseTracking: true
                        }
                    },
                    series: [{
                        name: 'Lijst 1: Begrijpend lezen',
                        data: dataScoresLijstKlas1,
                        visible: lijst1Data,
                    }, {
                        name: 'Lijst 2: Leesbeleidplan',
                        data: dataScoresLijstKlas2,
                        visible: lijst2Data,
                    }, {
                        name: 'Lijst 3: Leesomgeving',
                        data: dataScoresLijstKlas3,
                        visible: lijst3Data,
                    }, {
                        name: 'Lijst 4: Leesmonitoring',
                        data: dataScoresLijstKlas4,
                        visible: lijst4Data,
                    }, {
                        name: 'Lijst 5: Leesnetwerk - Niet actief',
                        data: dataScoresLijstSchool5,
                        visible: lijst5Data,
                    }],
                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 450
                            },
                            chartOptions: {
                                legend: {
                                    layout: 'horizontal',
                                    align: 'center',
                                    verticalAlign: 'bottom'
                                }
                            }
                        }]
                    },
                    exporting: {
                        scale: 1,
                        sourceWidth: 1500,
                        allowHTML: true
                    }
                });
            }
        }

        function totaalScoreLijst(dataLijst) {
            let totaalVanLijst = 0;
            for (let i = 0; i < dataLijst.length; i++) {
                totaalVanLijst += dataLijst[i];
            }
            if (totaalVanLijst === 0) {
            } else {
                aantalBeschikbaar++;
                return (totaalVanLijst / dataLijst.length);
            }
        }

        var dataTotaalLijsten = {
            1: [['Effectieve leesdidactiek doorheen curriculum', Math.round(totaalScoreLijst(dataScoresLijstAlg1) * 10) / 10.0],
                ['Visie, doelen en acties', Math.round(totaalScoreLijst(dataScoresLijstAlg2) * 10) / 10.0],
                ['Krachtige en motiverende leesomgeving', Math.round(totaalScoreLijst(dataScoresLijstAlg3) * 10) / 10.0],
                ['Leesmonitoring en feedback', Math.round(totaalScoreLijst(dataScoresLijstAlg4) * 10) / 10.0],
                ['Breed leesnetwerk', Math.round(totaalScoreLijst(dataScoresLijstAlg5) * 10) / 10.0]]
        };

        function getData(dataTotaalLijsten) {
            return dataTotaalLijsten.map(function (country, i) {
                return {
                    name: country[0],
                    y: country[1],
                    color: afbeeldingenEnKleuren[i].color
                };
            });
        }

        grafiekTotaal = Highcharts.chart('grafiekTotaalLijsten', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Totaal resultaat voor de vragenlijsten'
            },
            plotOptions: {
                series: {
                    grouping: false,
                    borderWidth: 0
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                shared: true,
                headerFormat: '<span style="font-size: 15px">{point.point.name}</span><br/>',
                pointFormat: '<span style="color:{point.color}">\u25CF</span> {point.point.name} <b>{point.y}/5</b><br/>'
            },
            xAxis: {
                type: 'category',
                max: aantalBeschikbaar - 1,
                labels: {
                    useHTML: true,
                    animate: true,
                    formatter: function () {
                        var value = this.value,
                            output;
                        afbeeldingenEnKleuren.forEach(function (gegevens) {
                            if (gegevens.name === value) {
                                output = gegevens.flag;
                            }
                        });
                        return '<span><img src="https://image.flaticon.com/icons/svg/' + output + '.svg" style="width: 40px; height: 40px;"/><br></span>';
                    }
                }
            },
            yAxis: [{
                title: {
                    text: 'Score op 5'
                },
                showFirstLabel: false
            }],
            series: [{
                dataSorting: {
                    enabled: true,
                    matchByName: true
                },
                dataLabels: [{
                    enabled: true,
                    inside: true,
                    style: {
                        fontSize: '15px'
                    }
                }],
                data: getData(dataTotaalLijsten[1]).slice()
            }],
            exporting: {
                scale: 1,
                sourceWidth: 1500
            }
        });
    });


Highcharts.getSVG = function (charts) {
    var svgArr = [], top = 0, width = 0;

    Highcharts.each(charts, function (chart) {
        var svg = chart.getSVG(),
            svgWidth = +svg.match(/^<svg[^>]*width\s*=\s*\"?(\d+)\"?[^>]*>/)[1],
            svgHeight = +svg.match(/^<svg[^>]*height\s*=\s*\"?(\d+)\"?[^>]*>/)[1];

        svg = svg.replace(
            '<svg',
            '<g transform="translate(0,' + top + ')" '
        );
        svg = svg.replace('</svg>', '</g>');
        top += svgHeight;
        width = Math.max(width, svgWidth);

        svgArr.push(svg);
    });

    return '<svg height="' + top + '" width="' + width +
        '" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
        svgArr.join('') + '</svg>';
};

Highcharts.exportCharts = function (charts, options) {
    options = Highcharts.merge(Highcharts.getOptions().exporting, options);

    Highcharts.post(options.url, {
        filename: options.filename || 'Leesscan resultaten',
        type: options.type,
        width: options.width,
        svg: Highcharts.getSVG(charts)
    });
};

$('#export-png').click(function () {
    Highcharts.exportCharts([grafiekSubresults, grafiekTotaal]);
});

$('#export-pdf').click(function () {
    Highcharts.exportCharts([grafiekSubresults, grafiekTotaal], {
        type: 'application/pdf'
    });
});