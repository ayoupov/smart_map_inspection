"use strict";
import * as turf from '@turf/turf'

import Tabulator from "tabulator-tables";



function sendToTable(geo_json) {

    const json = geo_json.features;

    const table = new Tabulator("#list-table", {
        height: 250, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
        data: json, //assign data to table
        layout: "fitColumns", //fit columns to width of table (optional)
        groupBy: ["properties.district"],
        //groupStartOpen:[true, true],
        responsiveLayout: "hide",  //hide columns that dont fit on the table
        tooltips: true,            //show tool tips on cells
        pagination: "local",       //paginate the data
        paginationSize: 5,
        movableColumns: true,      //allow column order to be changed
        resizableRows: true,       //allow row order to be changed
        langs: {
            "ru-ru": {
                "pagination": {
                    "first": "Первая",
                    "first_title": "Первая страница",
                    "last": "Последняя",
                    "last_title": "Последняя страница",
                    "prev": "Предыдущая",
                    "prev_title": "Предыдущая страница",
                    "next": "Следующая",
                    "next_title": "Следующая страница",
                    "all": "все",
                },
            }
        },
        columns: [ //Define Table Columns
            {
                formatter: "rowSelection",
                width: 30,
                titleFormatter: "rowSelection",
                hozAlign: "center",
                headerSort: false,
                cellClick: function (e, cell) {
                    cell.getRow().toggleSelect();
                }
            },
            {title: "Год", field: "properties.year", width: 50},
            {title: "Работы", field: "properties.cell_object", width: 400},
            {title: "Район", field: "properties.district"},
            {
                title: "Начало участка",
                field: "properties.cell_repair_start",
            },
            {
                title: "Конец участка",
                field: "properties.cell_repair_end",
            },
            {
                title: "Инспектор",
                field: ""
            },
            {
                title: "Оценка",
                field: ""
            }
        ],
        rowDblClick: function (e, row) {
            //e - the click event object
            //row - row component
            const geoJSON = row._row.data;
            console.log(JSON.stringify(geoJSON.geometry.coordinates));

            if (layer !== undefined) {
                map.removeLayer(layer);
            }

            feature1 = new ol.Feature(
                new ol.geom.MultiLineString(
                    geoJSON.geometry.coordinates
                ));

            feature1.setStyle(
                new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: '#00FF00',
                        width: 10
                    }),
                    fill: new ol.style.Fill({
                        color: '#00FF00',
                        weight: 1
                    })
                })
            )

            layer = egip.layers.createVectorLayer({
                id: 'point',
                type: 'random',
                source: egip.layers.createVectorSource({
                    features: [feature1]
                })
            });

            map.addLayer(layer);

            const centroid = turf.centroid(geoJSON).geometry.coordinates;

            console.log('centroid : ' + JSON.stringify(centroid));

            map.getView().setCenter(
                ol.proj.transform(centroid, 'EPSG:77', 'EPSG:77')
            );

            const bbox = turf.bbox(geoJSON);

            egip.layers.fitExtent(map, bbox);

        }
    });

    table.setLocale("ru-ru");

    return table;
}

let table = undefined;

fetch('./title_list.json')
    .then(response => response.json())
    .then(data => {
        table = sendToTable(data)
    })

$('.custom-file-input').on('change', function () {
    let fileName = $(this).val().split('\\').pop();
    $(this).next('.custom-file-label').addClass("selected").html(fileName);
});

$('#district a').on('click', function () {
    var txt = ($(this).text());
    table.setFilter('properties.district', '=', txt);
});

function generateReport(txt) {
    if(txt.indexOf('Общий отчет') !== -1){
        window.location.href = './assesment_report.html';
    }
    window.location.href = './report.html';
}

$('#report a').on('click', function () {
    var txt = ($(this).text());
    generateReport(txt);
});


$('#tsp a').on('click', function () {
    window.location.href = './assign.html';
});


