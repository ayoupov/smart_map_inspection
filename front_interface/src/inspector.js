"use strict"

import * as turf from '@turf/turf'

import Tabulator from "tabulator-tables";

let table = undefined;


function setupData(geo_json) {

    console.log(geo_json);

    const json = geo_json;

    table = new Tabulator("#list-table", {
        height: 400, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
        data: json, //assign data to table
        layout: "fitColumns", //fit columns to width of table (optional)
        responsiveLayout: "hide",  //hide columns that dont fit on the table
        tooltips: true,            //show tool tips on cells
        groupBy: ["inspector"],
        pagination: "local",       //paginate the data
        paginationSize: 20,
        movableColumns: true,      //allow column order to be changed
        resizableRows: true,       //allow row order to be changed
        movableRows: true,
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
            {title: "Инспектор", field: "inspector"},
            {title: "Работы", field: "properties.cell_object", width: 400},
            {title: "Район", field: "properties.district"},
            {
                title: "Начало участка",
                field: "properties.cell_repair_start",
            },
            {
                title: "Конец участка",
                field: "properties.cell_repair_end",
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
}


const queryString = window.location.search;

console.log(queryString);

const urlParams = new URLSearchParams(queryString);

const inspector_id = urlParams.get('id');

fetch('./task_list_' + inspector_id + '.json')
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        setupData(data)
    });

$('#saveAssesment').on('click', function (event) {
    fetch('http://localhost:3001/saveAssesment', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(table.getData())
    })
});


function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

document.getElementById("p1").innerHTML = "Гарантия до : " + moment(randomDate(new Date(2012, 0, 1), new Date())).format("YYYY-MM-DD");
document.getElementById("p2").innerHTML = "Гарантия до : " + moment(randomDate(new Date(2012, 0, 1), new Date())).format("YYYY-MM-DD");
document.getElementById("p3").innerHTML = "Гарантия до : " + moment(randomDate(new Date(2012, 0, 1), new Date())).format("YYYY-MM-DD");
document.getElementById("p4").innerHTML = "Гарантия до : " + moment(randomDate(new Date(2012, 0, 1), new Date())).format("YYYY-MM-DD");

