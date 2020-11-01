import * as turf from '@turf/turf'

import TSPSolver from "@nikbelikov/tsp-solver";
import Tabulator from "tabulator-tables";

const distance_matrix = [];
const points = [];

let json2020 = [];

let table = undefined;

function setupData(geo_json) {

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
        ]
    });

}

function fillPoints(geo_json) {

    const json = geo_json.features;

    const json2020 = [];

    let id = 0;

    for (const element of json) {

        const properties = element.properties;

        if (properties.year !== 2020) {
            continue;
        }

        if (properties.district !== 'ВАО') {
            continue;
        }

        element.properties.id = id++;

        element.inspector = 'Не назначен';

        json2020.push(element);

    }


    for (let idx = 0; idx < json2020.length; idx++) {

        const element = json2020[idx];

        const properties = element.properties;

        const id1 = properties.id;

        const point = {
            id: id1,
            name: properties.cell_object,
            object_idx: idx
        }

        const centroid = element.geometry.coordinates[0][0];////turf.centroid(element).geometry.coordinates;

        point.centroid = centroid;

        points.push(point);

        for (const element2 of json2020) {

            if (element2.properties.year !== 2020) {
                continue;
            }

            const id2 = element2.properties.id;

            if (id2 === id1) {
                continue;
            }

            const centroid2 = element.geometry.coordinates[0][0];

            const distance = {set: [id1, id2], value: turf.distance(centroid, centroid2)}

            distance_matrix.push(distance);
        }

    }

    return json2020;
}

function solveTSP(points, distance_matrix) {
    const solved = TSPSolver(points, distance_matrix);

    //console.log(solved);

    if (layer !== undefined) {
        map.removeLayer(layer);
    }

    const distance_elements = [];

    let geometry_distance_element = [];

    let inspector = 1;

    for (const solvedElement of solved.result) {
        geometry_distance_element.push(solvedElement.centroid);
        if (geometry_distance_element.length < 4) {
            json2020[solvedElement.object_idx].inspector = 'Инспектор ' + inspector;
            distance_elements.push(geometry_distance_element);
        } else {
            geometry_distance_element = [];
            inspector++;
        }
    }

    const features = [];

    //console.log(distance_elements);

    for (const distanceElement of distance_elements) {

        console.log(distanceElement);

        const feature = new ol.Feature(
            new ol.geom.MultiLineString(
                [distanceElement]
            ));

        feature.setStyle(
            new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: egip.layers.mock.getRandomColor(),
                    width: 3
                }),
                fill: new ol.style.Fill({
                    color: '#00FF00',
                    weight: 1
                })
            })
        );

        features.push(feature);
    }

    layer = egip.layers.createVectorLayer({
        id: 'point',
        type: 'random',
        source: egip.layers.createVectorSource({
            features: features
        })
    });

    map.addLayer(layer);

    console.log(JSON.stringify(json2020));

    table.setData(json2020);

}

fetch('./title_list.json')
    .then(response => response.json())
    .then(data => {
        json2020 = fillPoints(data);
        setupData(json2020);
    });

$('#tspSolve').on('click', function (event) {
    event.preventDefault();
    solveTSP(points, distance_matrix);
});

$('#manualAssign').on('click', function (event) {
    //event.preventDefault();
    let selectedData = table.getSelectedData();

    console.log(selectedData);

    var items = document.getElementsByClassName("list-group-item active");

    const inspectorName = items[0].outerText;

    for (const selectedDatum of selectedData) {
        json2020[selectedDatum.properties.id].inspector = inspectorName;
    }

    table.setData(json2020);
});

$('#saveChanges').on('click', function (event) {
    fetch('http://localhost:3001/savetask', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(table.getData())
    })
});