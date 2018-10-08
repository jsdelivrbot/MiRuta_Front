(function () {
    'use strict';
    // se hace referencia al modulo mapModule ya creado (esto esta determinado por la falta de [])
    angular.module('drawingModule')
        .service('srvDrawFeature', [
            SrvDrawFeature
        ]);

        function SrvDrawFeature(){
            var service = {
                // un marcador generico al q solo se le cambia el estilo
                getMarcadorByStyle: getMarcadorByStyle
            };
    
            return service;

            // ##############################################################
            // ################## FUNCIONES PRIVADAS #######################
            
            function getMarcadorByStyle(coord, estilo) {
                var marcador = new ol.Feature({
                    geometry: new ol.geom.Point([coord[0], coord[1]])
                });
                marcador.setStyle(estilo);

                return marcador;
            }
        }

})()