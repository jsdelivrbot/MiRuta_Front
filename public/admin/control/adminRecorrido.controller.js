// Responsabilidad : Permitir ver la ponderacion de los recorridos
// TODO sin funcionalidad debido a que no se creo el servicio en el backend
(function () {
    'use strict';
    // Se llama al modulo "mapModule"(), seria una especie de get
    angular.module('mapModule')
        .controller('adminRecorridoController', [
            '$scope',
            'creatorMap',
            'dataServer',
            AdminRecorridoController
        ]);

    function AdminRecorridoController(vm, creatorMap, dataServer) {

        // ********************************** VARIABLES PUBLICAS ************************
        // generamos un mapa de entrada
        vm.map = creatorMap.getMap();

        vm.nombreUnidades = [];

        vm.recorridos = [];

        vm.tipoPunto = [
            "COMUN",
            "ESQUINA",
            "PARADA"
        ];

        vm.data = {
            model: null,
            availableOptions: [
                { id: '', name: 'Seleccione una unidad' },
                { id: '1', name: 'Unidad A' },
                { id: '2', name: 'Unidad B' },
                { id: '3', name: 'Unidad C' }
            ]
        };

        // ********************************** FLAGS PUBLICAS ****************************

        // ************************DECLARACION DE FUNCIONES PUBLICAS ********************


        // ********************************** VARIABLES PRIVADAS ************************


        // *************************** DECLARACION FUNCIONES PRIVADAS ********************



        // ****************************** FUNCIONES PRIVADAS ****************************

        function cargaNombreUnidades() {
            dataServer.getNombreUnidades()
                .then(function (data) {
                    // una vez obtenida la respuesta del servidor realizamos las sigientes acciones
                    vm.nombreUnidades = data;
                    console.log("Datos recuperados con EXITO! = UNIDADES");
                    console.log(vm.nombreUnidades);
                })
                .catch(function (err) {
                    console.log("ERRRROOORR!!!!!!!!!! ---> Al cargar las UNIDADES");
                })
        }

        function cargaRecorridos(){
            dataServer.getRecorridos()
                .then(function (data) {
                    // una vez obtenida la respuesta del servidor realizamos las sigientes acciones
                    vm.recorridos = data;
                    console.log("Datos recuperados con EXITO! = RECORRIDOS");
                    console.log(vm.recorridos);
                })
                .catch(function (err) {
                    console.log("ERRRROOORR!!!!!!!!!! ---> Al cargar las RECORRIDOS");
                })
        }
        // ************************ EVENTOS ****************************************

        // ************************ Inicializacion de datos *****************************
        // al crear el controlador ejecutamos esta funcion
        cargaNombreUnidades();
        cargaRecorridos();

    } // fin Constructor

})()