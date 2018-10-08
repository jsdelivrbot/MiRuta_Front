(function () {
    'use strict';
    // se hace referencia al modulo mapModule ya creado (esto esta determinado por la falta de [])
    angular.module('drawingModule')
        .service('srvStyles', [
            'pathIcons',
            SrvStyles
        ]);

    function SrvStyles(icon){

        // var estilos = {
        //     punto_carga_actual: new ol.style.Style({
        //         image: new ol.style.Icon({
        //             anchor: [0.5, 1],
        //             src: icon.PUNTO_CARGA_ACTUAL
        //         })
        //     }),
        //     punto_carga_nuevo: new ol.style.Style({
        //         image: new ol.style.Icon({
        //             anchor: [0.5, 1],
        //             src: icon.PUNTO_CARGA_NUEVA
        //         })
        //     }),
        //     punto_traslado_actual: new ol.style.Style({
        //         image: new ol.style.Icon({
        //             anchor: [0.5, 1],
        //             src: icon.PUNTO_TRASLADO_ACTUAL
        //         })
        //     }),
        //     punto_traslado_nuevo: new ol.style.Style({
        //         image: new ol.style.Icon({
        //             anchor: [0.5, 1],
        //             src: icon.PUNTO_TRASLADO_NUEVO
        //         })
        //     })
        // };
        
        var service = {
            // ************** pto interes ****************
            marcadorCargaActual: marcadorCargaActual,
            marcadorCargaNuevo: marcadorCargaNuevo,
            marcadorTrasladoActual: marcadorTrasladoActual,
            marcadorTrasladoNuevo: marcadorTrasladoNuevo
        };

        return service;

        // #############################################################################
        // ########################## FUNCIONES PUBLICAS ###############################

        function marcadorCargaActual(){
            // return estilos.punto_carga_actual;
            var estilo = createStyleByIcon(icon.PUNTO_CARGA_ACTUAL);
            return estilo;
        }

        function marcadorCargaNuevo(){
            // return estilos.punto_carga_nuevo;
            var estilo = createStyleByIcon(icon.PUNTO_CARGA_NUEVO);
            return estilo;
        }

        function marcadorTrasladoActual(){
            // return estilos.punto_traslado_actual;
            var estilo = createStyleByIcon(icon.PUNTO_TRASLADO_ACTUAL);
            return estilo;
        }
        function marcadorTrasladoNuevo(){
            // return estilos.punto_traslado_nuevo;
            var estilo = createStyleByIcon(icon.PUNTO_TRASLADO_NUEVO);
            return estilo;
        }

        // #############################################################################
        // ########################## FUNCIONES PRIVADAS ###############################

        function createStyleByIcon(icon){
            var estilo = new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    src: icon
                })
            });
            
            return estilo;
        }
    }

})()