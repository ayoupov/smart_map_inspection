"use strict";

import * as turf from '@turf/turf'

import Tabulator from "tabulator-tables";



function sendToTable(json) {

    const table = new Tabulator("#list-table", {
        height: 600, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
        data: json, //assign data to table
        layout: "fitColumns", //fit columns to width of table (optional)
        responsiveLayout: "hide",  //hide columns that dont fit on the table
        tooltips: true,            //show tool tips on cells
        pagination: "local",       //paginate the data
        paginationSize: 20,
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
                field: "inspector"
            },
            {
                title: "Оценка",
                field: "assesmentList.carriageway",
                hozAlign:"left",
                formatter:"progress"
            }
        ],
        rowDblClick: function (e, row) {
            //e - the click event object
            //row - row component
            const geoJSON = row._row.data;
            //console.log(JSON.stringify(geoJSON.geometry.coordinates));

            if (layer !== undefined) {
                map.removeLayer(layer);
            }
            /*
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
            */
            //geoJSON.intersects.features.push(geoJSON.line1);
            //geoJSON.intersects.features.push(geoJSON.line2);

            const features = new ol.format.GeoJSON().readFeatures(geoJSON.intersects);

            const feature1 = new ol.Feature(
                new ol.geom.MultiLineString(
                    geoJSON.line1.geometry.coordinates
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

            const feature2 = new ol.Feature(
                new ol.geom.MultiLineString(
                    geoJSON.line2.geometry.coordinates
                ));

            feature2.setStyle(
                new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: '#FF0000',
                        width: 10
                    }),
                    fill: new ol.style.Fill({
                        color: '#00FF00',
                        weight: 1
                    })
                })
            )

            features.push(feature1);
            features.push(feature2);

            layer = egip.layers.createVectorLayer({
                id: 'point',
                type: 'random',
                source: egip.layers.createVectorSource({
                    features: features
                })
            });

            map.addLayer(layer);

            const centroid = turf.centroid(geoJSON.intersects).geometry.coordinates;

            console.log('centroid : ' + JSON.stringify(centroid));

            map.getView().setCenter(
                ol.proj.transform(centroid, 'EPSG:77', 'EPSG:77')
            );

            const bbox = turf.bbox(geoJSON.intersects);

            egip.layers.fitExtent(map, bbox);

        }
    });

    table.setLocale("ru-ru");

    return table;
}

let table = undefined;

fetch('./assesment_list.json')
    .then(response => response.json())
    .then(data => {
        table = sendToTable(data)
    })


//trigger download of data.csv file
document.getElementById("download-csv").addEventListener("click", function(){
    table.download("csv", "data.csv");
});

//trigger download of data.json file
document.getElementById("download-json").addEventListener("click", function(){
    table.download("json", "data.json");
});

//trigger download of data.xlsx file
document.getElementById("download-xlsx").addEventListener("click", function(){
    table.download("xlsx", "data.xlsx", {sheetName:"Отчет 20202"});
});

document.getElementById("print-table").addEventListener("click", function(){
    table.print(false, true);
});