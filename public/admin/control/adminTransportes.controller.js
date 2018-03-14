// Responsabilidad : Permitir ver la ponderacion de los recorridos
// TODO sin funcionalidad debido a que no se creo el servicio en el backend
(function () {
    'use strict';
    // Se llama al modulo "mapModule"(), seria una especie de get
    angular.module('mapModule')
        .controller('adminTransportesController', [
            '$scope',
            'creatorMap',
            'dataServer',
            AdminTransportesController
        ]);

    function AdminTransportesController(vm, creatorMap, dataServer) {

        // ********************************** VARIABLES PUBLICAS ************************
        // generamos un mapa de entrada
        vm.map = creatorMap.getMap();

        vm.unidades = [];
        vm.nombreUnidadSeleccionada = null;
        vm.unidadSeleccionada;
        vm.empresas = [];
        vm.empresaSeleccionada;
        vm.intPrecio = 0;
        vm.decPrecio = 0;

        vm.dataUnidadCreate = {
            "nombre": "",
            "horaInicio": 0,
            "minInicio": 0,
            "horaFin": 0,
            "minFin": 0,
            "frecuencia": 0,
            "precioBoleto": 0.0,
            "idEmpresa": 0
        }
        vm.nombreEmpresaSeleccionada;

        // ********************************** FLAGS PUBLICAS ****************************

        // ************************DECLARACION DE FUNCIONES PUBLICAS ********************


        // ********************************** VARIABLES PRIVADAS ************************


        // *************************** DECLARACION FUNCIONES PRIVADAS ********************

        // ****************************** FUNCIONES PUBLICAS ****************************

        vm.isSelectedUnidad = function () {
            if (vm.nombreUnidadSeleccionada != null) {
                console.log("nombre unidad: " + vm.nombreUnidadSeleccionada);
                getUnidadSeleccionada();
                separarPrecioBoleto();
                return true;
            }
            return false;
        }

        vm.crearUnidad = function(){
            if (horarioCorrecto()){
                getPrecioBoletoCreate();
                getIdEmpresaSeleccionada();
                console.log("Se recuperaron los datos de la nueva unidad.");
                console.log(vm.dataUnidadCreate);
            }
            else{
                alert("Los horarios de recorrido no son correctos.");
            }
            // console.log("Horarios OK??: " + horarioCorrecto());
        }

        vm.actualizarUnidad = function(){
            console.log(vm.unidadSeleccionada);
        }

        // ****************************** FUNCIONES PRIVADAS ****************************

        function cargaUnidades() {
            dataServer.getUnidades()
                .then(function (data) {
                    // una vez obtenida la respuesta del servidor realizamos las sigientes acciones
                    vm.unidades = data;
                    console.log("Datos recuperados con EXITO! = UNIDADES");
                    console.log(vm.unidades);
                })
                .catch(function (err) {
                    console.log("ERRRROOORR!!!!!!!!!! ---> Al cargar las UNIDADES");
                })
        }

        function cargaEmpresas() {
            dataServer.getEmpresas()
                .then(function (data) {
                    // una vez obtenida la respuesta del servidor realizamos las sigientes acciones
                    vm.empresas = data;
                    console.log("Datos recuperados con EXITO! = EMPRESAS");
                    console.log(vm.empresas);
                })
                .catch(function (err) {
                    console.log("ERRRROOORR!!!!!!!!!! ---> Al cargar las EMPRESAS");
                })
        }

        function getUnidadSeleccionada(){
            angular.forEach(vm.unidades, function (value, key) {
                if (value.nombre == vm.nombreUnidadSeleccionada) {
                    console.log(value);
                    vm.unidadSeleccionada = value;
                    console.log(vm.unidadSeleccionada.horaInicio.hour + ":" + vm.unidadSeleccionada.horaInicio.minute + "frec: " + vm.unidadSeleccionada.frecuencia);
                }
            });
        }

        function getIdEmpresaSeleccionada() {
            angular.forEach(vm.empresas, function (value, key) {
                if (value.nombre == vm.nombreEmpresaSeleccionada) {
                    console.log(value);
                    vm.dataUnidadCreate.idEmpresa = value.id;
                    console.log("id empresa unidad seleccionada: "+vm.dataUnidadCreate.idEmpresa);
                }
            });
        }

        function separarPrecioBoleto(){
            vm.intPrecio = Math.trunc(vm.unidadSeleccionada.precioBoleto);
            vm.decPrecio = Number(((vm.unidadSeleccionada.precioBoleto - vm.intPrecio).toFixed(2))*100);
            console.log("PrecioBoleto: " + vm.intPrecio + "," + vm.decPrecio);
        }

        function getPrecioBoletoCreate(){
            var precioBoletoString = vm.intPrecio +"."+ vm.decPrecio;
            vm.dataUnidadCreate.precioBoleto = parseFloat(precioBoletoString);
            console.log("Precio de boleto FLOAT: " + vm.dataUnidadCreate.precioBoleto);
        }

        function horarioCorrecto(){
            if (vm.dataUnidadCreate.horaFin < vm.dataUnidadCreate.horaInicio){
                return false;
            }
            if (vm.dataUnidadCreate.horaFin == vm.dataUnidadCreate.horaInicio){
                if (vm.dataUnidadCreate.minFin <= vm.dataUnidadCreate.minInicio){
                    
                    return false;
                }
            }
            return true;
        }

        // ************************ EVENTOS ****************************************

        // ************************ Inicializacion de datos *****************************
        cargaUnidades();
        cargaEmpresas();

    } // fin Constructor

})()