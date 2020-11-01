"use strict";

require("core-js/modules/web.dom.iterable");

var turf = _interopRequireWildcard(require("@turf/turf"));

var _tabulatorTables = _interopRequireDefault(require("tabulator-tables"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function sendToTable(json) {
  const table = new _tabulatorTables.default("#list-table", {
    height: 250,
    // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    data: json,
    //assign data to table
    layout: "fitColumns",
    //fit columns to width of table (optional)
    responsiveLayout: "hide",
    //hide columns that dont fit on the table
    tooltips: true,
    //show tool tips on cells
    pagination: "local",
    //paginate the data
    paginationSize: 5,
    movableColumns: true,
    //allow column order to be changed
    resizableRows: true,
    //allow row order to be changed
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
          "all": "все"
        }
      }
    },
    columns: [//Define Table Columns
    {
      formatter: "rowSelection",
      width: 30,
      titleFormatter: "rowSelection",
      hozAlign: "center",
      headerSort: false,
      cellClick: function (e, cell) {
        cell.getRow().toggleSelect();
      }
    }, {
      title: "Работы 2020",
      field: "line1.properties.cell_object",
      width: 400
    }, {
      title: "Работы 2019",
      field: "line2.properties.cell_object",
      width: 400
    }, {
      title: "Район",
      field: "line1.properties.district"
    }],
    rowDblClick: function (e, row) {
      //e - the click event object
      //row - row component
      const geoJSON = row._row.data; //console.log(JSON.stringify(geoJSON.geometry.coordinates));

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
      const feature1 = new ol.Feature(new ol.geom.MultiLineString(geoJSON.line1.geometry.coordinates));
      feature1.setStyle(new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#00FF00',
          width: 10
        }),
        fill: new ol.style.Fill({
          color: '#00FF00',
          weight: 1
        })
      }));
      const feature2 = new ol.Feature(new ol.geom.MultiLineString(geoJSON.line2.geometry.coordinates));
      feature2.setStyle(new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#FF0000',
          width: 10
        }),
        fill: new ol.style.Fill({
          color: '#00FF00',
          weight: 1
        })
      }));
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
      map.getView().setCenter(ol.proj.transform(centroid, 'EPSG:77', 'EPSG:77'));
      const bbox = turf.bbox(geoJSON.intersects);
      egip.layers.fitExtent(map, bbox);
    }
  });
  table.setLocale("ru-ru");
  return table;
}

let table = undefined;
fetch('./report_2019_2020.json').then(response => response.json()).then(data => {
  table = sendToTable(data);
});
//# sourceMappingURL=report.js.map