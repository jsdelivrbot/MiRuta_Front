// Responsabilidad : Permitir ver la ponderacion de los recorridos
// TODO sin funcionalidad debido a que no se creo el servicio en el backend
(function () {
    'use strict';
    // Se llama al modulo "mapModule"(), seria una especie de get
    angular.module('mapModule')
        .controller('ptoInteresController', [
            '$scope',
            'creatorMap',
            PtoInteresController
        ]);

    function PtoInteresController(vm, creatorMap) {

        // ********************************** VARIABLES PUBLICAS ************************
        // generamos un mapa de entrada
        vm.map = creatorMap.getMap();

        // ********************************** FLAGS PUBLICAS ****************************

        // ************************DECLARACION DE FUNCIONES PUBLICAS ********************


        // ********************************** VARIABLES PRIVADAS ************************


        // *************************** DECLARACION FUNCIONES PRIVADAS ********************

        // ****************************** FUNCIONES PUBLICAS ****************************


        // ****************************** FUNCIONES PRIVADAS ****************************


        // ************************ EVENTOS ****************************************

        // ************************ Inicializacion de datos *****************************
        // al crear el controlador ejecutamos esta funcion

    } // fin Constructor

})()