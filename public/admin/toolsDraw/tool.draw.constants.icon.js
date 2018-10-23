(function () {
    'use strict';
    angular.module('drawingModule')
        .constant('pathIcons', {
            // ###################### PTO INTERES(cliente web) ######################
            PUNTO_CARGA_ACTUAL: '../MiRuta_2017/public/src/img/carga_actual.png',
            PUNTO_CARGA_NUEVO: '../MiRuta_2017/public/src/img/carga_nuevo.png',
            PUNTO_TRASLADO_ACTUAL: '../MiRuta_2017/public/src/img/traslado_actual.png',
            PUNTO_TRASLADO_NUEVO: '../MiRuta_2017/public/src/img/traslado_nuevo.png',
            // ###################### RECORRIDO(cliente web) ######################
            PUNTO_INICIO_RECORRIDO: '../MiRuta_2017/public/src/img/inicio-recorrido.png',
            PUNTO_FIN_RECORRIDO: '../MiRuta_2017/public/src/img/fin-recorrido.png',
            // ###################### PARADAS(cliente web) ######################
            PARADA_IDA: '../MiRuta_2017/public/src/img/parada-ida.png',
            PARADA_VUELTA: '../MiRuta_2017/public/src/img/parada-vuelta.png'
        });
})()