(function () {
    'use strict';
    // se hace referencia al modulo mapModule ya creado (esto esta determinado por la falta de [])
    angular.module('drawingModule')
        .service('srvComponents', [
            '$http',
            '$q',
            SrvComponents
        ]);

    function SrvComponents($http, $q){

        // ############################## VARIABLES PRIVADAS ##############################
        // ################################################################################

        var url = {
            OSRM_POINT_NEREAST: 'http://localhost:8080/miruta/routing/nearestPoint',
            OSRM_ADDRESs_POINT: 'http://localhost:8080/miruta/routing/addressPoint',
            OSRM_ROUTE: 'http://localhost:8080/miruta/routing/route',
            ICON: '../MiRuta_2017/public/src/img/punto-recorrido.png'
        }

        var estilos = {
            route: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    width: 3, color: [40, 40, 40, 0.8]
                })
            }),
            icon: new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    src: url.ICON
                    // src: 'http://cdn.rawgit.com/openlayers/ol3/master/examples/data/icon.png'
                })
            })
        };

        var service = {
            getMarkerPoint: getMarkerPoint,
            getFeatureRoute: getFeatureRoute,
            getPointNearest: getPointNearest,
            getAddressPoint: getAddressPoint,
            getRoute: getRoute
        };

        return service;

        

        // #############################################################################

        // #############################################################################
        // ########################## FUNCIONES PRIVADAS ###############################

        function convertTo4326(coord) {
            return ol.proj.transform([
                parseFloat(coord[0]), parseFloat(coord[1])
            ], 'EPSG:3857', 'EPSG:4326');
        }

        // #############################################################################

        // #############################################################################
        // ########################## FUNCIONES PUBLICAS ###############################

        function getMarkerPoint(coord){
            // console.log("Dibujando el marcador - lon=" + coord[0] + " , lat=" + coord[1]);
            // console.log(coord);
            var marcador = new ol.Feature({
                geometry: new ol.geom.Point([coord[0], coord[1]])
            });

            marcador.setStyle(estilos.icon);

            return marcador;
        }

        function getFeatureRoute(coordinates) {
            var finalRoute = new ol.Feature({
                geometry: new ol.geom.LineString(coordinates)
            });
            finalRoute.setStyle(estilos.route);

            return finalRoute;

        }

        // obtiene las coordenadas del punto mas cercano al recibido q se encuentre en la calle
        // esto para no visualizar puntos sobre edificios y lugares publicos (plazas,
        // bancos, escuelas, etc..)
        function getPointNearest(coord) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http({
                method: 'GET',
                url: url.OSRM_POINT_NEREAST +"?lon="+ coord[0] +"&lat=" + coord[1]
            }).then(function successCallback(res) {
                defered.resolve(res.data);
                console.log("Promesa");
                console.log(res.data);
            },
                function errorCallback(err) {
                    defered.reject(err)
                }
            );

            return promise;
        }

        function getAddressPoint(coord){
            var defered = $q.defer();
            var promise = defered.promise;

            $http({
                method: 'GET',
                url: url.OSRM_ADDRESs_POINT + "?lon=" + coord[0] + "&lat=" + coord[1]
            }).then(function successCallback(res) {
                defered.resolve(res.data);
                console.log("Promesa Address");
            },
                function errorCallback(err) {
                    defered.reject(err)
                }
            );

            return promise;
        }

        function getRoute(puntos) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http({
                method: 'POST',
                url: url.OSRM_ROUTE,
                data: puntos
            }).then(function successCallback(res) {
                defered.resolve(res.data);
                console.log("Promesa ruta");
                console.log(res.data);
            },
                function errorCallback(err) {
                    defered.reject(err);
                    console.log("error en la promesa");
                    console.log(err);
                }
            );

            return promise;
        }

        
        // #############################################################################

    }

})()