const html = require('choo/html');
const widget = require('cache-element/widget');
const L = require('leaflet');
const Clusters = require('leaflet.markercluster');
const xhr = require('xhr');

module.exports = () => {

  let map;
  let currentCoords;
  let markerLayer;
  let defaultZoom = 8;

  return widget({
    onupdate: function (el, newCoords) {
      if (newCoords && (!currentCoords || !coordsMatch(newCoords, currentCoords))) {
        currentCoords = newCoords;
        if (map) map.setView(newCoords);
      }
    },

    render: function (coords) {
      currentCoords = coords;
      return html`<div style="height: 500px"></div>`
    },

    onload: function (el) {
      map = L.map(el).setView(currentCoords, defaultZoom);

      L.tileLayer('https://api.mapbox.com/styles/v1/asceall/ciw788b5t00032qleoi6zzl2k/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNjZWFsbCIsImEiOiJjaXZmaXVmY24wMWx1MnlwYjl2ODk0Y3A2In0.XcKjY5CsJmedvuzU6jnyWQ', {
        minZoom: 0,
        maxZoom: 20,
      }).addTo(map)

      xhr({
        uri: 'leaders.geojson',
        headers: {
          'Content-Type': 'application/json'
        }
      }, function (err, resp, body) {
        if (err) {
          throw new Error(err);
        }
        if (resp.statusCode >= 200 && resp.statusCode < 400) {
          const markers = JSON.parse(body);
          markerLayer = L.markerClusterGroup();
          var geojsonLayer = L.geoJson(markers, {
            pointToLayer: function (feature, latlng) {
              var marker = new L.CircleMarker(latlng, {radius: 10});
              marker.on({
                click: function (e) {
                  console.log('clicked: ', feature.properties)
                }
              })
              return marker;
            },

            onEachFeature: function (feature, layer) {
              layer.addTo(markerLayer);
            }
          });
          markerLayer.addTo(map);
          map.fitBounds(markerLayer.getBounds());
        } else {
          console.log(resp);
        }
      })
    },

    onunload: function (el) {
      if (map) {
        map.remove();
        map = null;
      }
    }
  });
}

function coordsMatch (a, b) { return a[0] === b[0] && a[1] === b[1]; }
