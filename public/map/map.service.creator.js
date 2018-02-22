
// Responsabilidad :  Creacion de mapa  (implementando un Singleton para ser instanciado una sola vez desde
// los distintos controladores )
(function () {
    'use strict';
    // se hace referencia al modulo mapModule ya creado (esto esta determinado por la falta de [])
    angular.module('mapModule')
        .service('creatorMap', ['propiertiesMap', creatorMap]);

    function creatorMap(propiertiesMap) {

        // instancia de mapa
        var map = null;

        var service = {
            getMap: getMap
            // clearMap: clearMap
        };
        return service;

        // Retorna un mapa
        function getMap() {
            // if (map == null) {
            //     map = createMap();
            //     console.log("inicializa el mapa");
            //     // if (map == null){
            //     //     console.log("el mapa sige en null!!!");
            //     // }
            // }
            // return map;
            return createMap();
        };

        // Constructor de mapa
        function createMap() {
            var OSMLayer = new ol.layer.Tile({
                source: new ol.source.OSM()
            });

            map = new ol.Map({
                layers: [OSMLayer],
                target: 'map',
                view: new ol.View({
                    projection: propiertiesMap.PROJECTION,
                    center: [propiertiesMap.LONG_CENTER, propiertiesMap.LAT_CENTER],
                    zoom: propiertiesMap.ZOOM
                })
            });
            return map;
        }

        // // Se limpia el mapa al cambiar de vista
        // function clearMap() {
        //     map = null;
        // }
    }

})()
