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
            '$timeout',
            AdminTransportesController
        ]);

    function AdminTransportesController(vm, creatorMap, dataServer, tm) {

        // ********************************** VARIABLES PUBLICAS ************************
        // generamos un mapa de entrada
        vm.map = creatorMap.getMap();

        // #################### VAR GOLBALES ####################

        vm.unidades = [];
        vm.empresas = [];

        vm.empresaSeleccionada;

        //#######################################################

        // #################### VAR CREACION ####################

        vm.nombreEmpresaSeleccionada = "";
        vm.dataUnidadCreate = {
            "nombre": "",
            "horaInicio": "",
            "minInicio": "",
            "horaFin": "",
            "minFin": "",
            "frecuencia": "",
            "precioBoleto": "",
            "idEmpresa": ""
        };
        vm.intPrecioCreate = "";
        vm.decPrecioCreate = "";
        vm.empresaSeleccionadaCreate = "";

        //#######################################################

        // ##################### VAR EDICION ####################

        vm.unidadSeleccionada;
        vm.nombreUnidadSel = "";
        vm.nombreUnidadSeleccionada = null;
        vm.dataUnidadUpdate = {
            "id": "",
            "nombre": "",
            "horaInicio": "",
            "minInicio": "",
            "horaFin": "",
            "minFin": "",
            "frecuencia": "",
            "precioBoleto": "",
            "idEmpresa": ""
        };
        vm.intPrecioUpdate = "";
        vm.decPrecioUpdate = "";
        vm.empresaNuevaSeleccionadaUpdate;
        vm.nombreEmpresaActual = "";

        //#######################################################

        //###################### FLAGS ##########################

        vm.horarioOk = true;
        vm.datosCorrectos = true;
        vm.guardadoExitoso = false;
        vm.unidadSel = false;
        vm.actualizacionCorrecta = false;
        var empresaSelected = false;
        var nuevaEmpresaUpdate = false;

        //#######################################################

     

        // ****************************** FUNCIONES PUBLICAS ****************************

        vm.crearUnidad = function(){
            if(recuperarDatosUnidadCreate()){
                // guardamos en la DB
                saveUnidad();
            }
        }

        vm.actualizarUnidad = function(){
            if (recuperarDatosUnidadUpdate()){
                console.log("Se recuperaron los datos correctamente!!!!!!!...");
                console.log(vm.dataUnidadUpdate);
                // vm.actualizando = true;
                updateUnidad();
            }
            else{
                console.log("Error al recuperar los datos!!!!!!!...");
            }
            
        }

        vm.eliminarunidad = function(){
            deleteUnidad();
        }

        vm.limpiarDatos = function(){
            vm.dataUnidadCreate.nombre = "";
            vm.dataUnidadCreate.horaInicio = "";
            vm.dataUnidadCreate.minInicio = "";
            vm.dataUnidadCreate.horaFin = "";
            vm.dataUnidadCreate.minFin = "";
            vm.dataUnidadCreate.frecuencia = "";
            vm.dataUnidadCreate.precioBoleto = "";
            vm.dataUnidadCreate.idEmpresa = "";
            vm.intPrecioCreate = "";
            vm.decPrecioCreate = "";
            vm.nombreEmpresaSeleccionada = "";
        }

        // cada vez q cambiamos de opcion vamos a recuperar los datos 
        // de la misma para mostrarlos en la vista
        vm.changeUnidad = function () {
            if (vm.unidadSeleccionada != null){
                // le asignamos la empresa a una variable que se refleja en la lista de empresas
                // vm.empresaNuevaSeleccionadaUpdate = vm.unidadSeleccionada.empresa;
                vm.nombreEmpresaActual = vm.unidadSeleccionada.empresa.nombre;
                // para poder editarla sin problemas
                vm.nombreUnidadSelUpdate = "" + vm.unidadSeleccionada.nombre;
                // se pasa el nombre de la unidad seleccionada a una variable temporal
                separarPrecioBoleto();
            }
            else{
                vm.nombreEmpresaActual = "";
                vm.nombreUnidadSelUpdate = "";
                vm.intPrecioUpdate = "";
                vm.decPrecioUpdate = "";
            }
            // console.log("Unidad seleccionada: ");
            // console.log(vm.unidadSeleccionada);
            // console.log(vm.empresaSeleccionadaUpdate);
            vm.unidadSel = true;
        }

        vm.changeEmpresa = function(){
            vm.nombreEmpresaActual = vm.empresaNuevaSeleccionadaUpdate.nombre;
        }
        
        vm.selectedEmpresaCreate = function(){
            empresaSelected = true;
            console.log(vm.empresaSeleccionadaCreate);
        }

        vm.resetFlags = function(){
            vm.horarioOk = true;
            vm.datosCorrectos = true;
            vm.guardadoExitoso = false;
            vm.actualizacionCorrecta = false;
        }

        // ****************************** FUNCIONES PRIVADAS ****************************

        // ###########################################################################
        // ################################# Serv REST ###############################

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

        function saveUnidad() {
            dataServer.saveUnidad(vm.dataUnidadCreate)
                .then(function (data) {
                    // una vez obtenida la respuesta del servidor realizamos las sigientes acciones
                    console.log("Datos guardados con EXITO! = UNIDAD CREADA");
                    console.log(data);
                    cargaUnidades();
                })
                .catch(function (err) {
                    console.log("ERRRROOORR!!!!!!!!!! ---> Al guardar la NUEVA UNIDAD");
                })
        }

        function updateUnidad() {
            dataServer.updateUnidad(vm.dataUnidadUpdate)
                .then(function (data) {
                    // una vez obtenida la respuesta del servidor realizamos las sigientes acciones
                    console.log("Datos actualizados con EXITO! = UNIDAD ACTUALIZADA");
                    console.log(data);
                    // recuperamos los datos actualizados del servidor
                    cargaUnidades();
                    vm.nombreUnidadSeleccionada = data.nombre;
                    vm.actualizacionCorrecta = true;
                })
                .catch(function (err) {
                    vm.actualizacionCorrecta = false;
                    console.log("ERRRROOORR!!!!!!!!!! ---> Al actualizar la UNIDAD");
                    console.log(err);
                })
        }

        function deleteUnidad() {
            dataServer.deleteUnidad(vm.unidadSeleccionada.id)
                .then(function () {
                    // una vez obtenida la respuesta del servidor realizamos las sigientes acciones
                    console.log("Datos eliminados con EXITO! = UNIDAD ELIMINADA");
                    cargaUnidades();
                    // vaciamos el campo de empresa
                    vm.empresaSeleccionadaUpdate = "";
                    // resetear tmb el precio de boleto
                })
                .catch(function (err) {
                    console.log("ERRRROOORR!!!!!!!!!! ---> Al eliminar la UNIDAD");
                })
        }


        // ###########################################################################
        // ###########################################################################


        // ###########################################################################
        // ####################### Captura de datos ##################################

        // recupera todos los datos ingresados en la vista y los asigna a
        // un objeto con el formato correcto para ser procesado en el servidor
        function recuperarDatosUnidadCreate() {
            if (horarioCorrecto(vm.dataUnidadCreate.horaInicio,
                vm.dataUnidadCreate.minInicio, vm.dataUnidadCreate.horaFin,
                vm.dataUnidadCreate.minFin) && empresaSelected)
            {
                vm.dataUnidadCreate.idEmpresa = vm.empresaSeleccionadaCreate.id;
                vm.dataUnidadCreate.precioBoleto = getPrecioBoleto(vm.intPrecioCreate, vm.decPrecioCreate);
                console.log("Se recuperaron los datos de la nueva unidad.");
                console.log(vm.dataUnidadCreate);
                vm.horarioOk = true;
                vm.datosCorrectos = true;
                vm.guardadoExitoso = true;
                return true;
            }
            else {
                vm.horarioOk = false;
                vm.datosCorrectos = false;
                return false;
            }
        }

        // recupera todos los datos ingresados en la vista y los asigna a
        // un objeto con el formato correcto para ser procesado en el servidor
        function recuperarDatosUnidadUpdate() {
            if (horarioCorrecto(vm.unidadSeleccionada.horaInicio.hour,
                vm.unidadSeleccionada.horaInicio.minute,
                vm.unidadSeleccionada.horaFin.hour,
                vm.unidadSeleccionada.horaFin.minute)) {
                // asiganamos los datos al objeto a ser actualizado
                vm.dataUnidadUpdate.id = vm.unidadSeleccionada.id;
                vm.dataUnidadUpdate.horaInicio = vm.unidadSeleccionada.horaInicio.hour;
                vm.dataUnidadUpdate.minInicio = vm.unidadSeleccionada.horaInicio.minute;
                vm.dataUnidadUpdate.horaFin = vm.unidadSeleccionada.horaFin.hour;
                vm.dataUnidadUpdate.minFin = vm.unidadSeleccionada.horaFin.minute;
                // vm.dataUnidadUpdate.idEmpresa = vm.empresaSeleccionadaUpdate.id;
                if(vm.empresaNuevaSeleccionadaUpdate != null){
                    vm.dataUnidadUpdate.idEmpresa = vm.empresaNuevaSeleccionadaUpdate.id;
                }
                else{
                    vm.dataUnidadUpdate.idEmpresa = vm.unidadSeleccionada.empresa.id;
                }
                vm.dataUnidadUpdate.precioBoleto = getPrecioBoleto(vm.intPrecioUpdate, vm.decPrecioUpdate);
                vm.dataUnidadUpdate.nombre = vm.nombreUnidadSelUpdate;
                vm.dataUnidadUpdate.frecuencia = vm.unidadSeleccionada.frecuencia;

                vm.horarioOk = true;
                vm.datosCorrectos = true;
                vm.guardadoExitoso = true;
                return true;
            }
            else {
                vm.datosCorrectos = false;
                vm.horarioOk = false;
                return false;
            }
        }

        // paso los datos ingresados en la vista y los unifica en el formato
        // correcto para ser enviado al servidor
        function getPrecioBoleto(parteInt, parteDec) {
            var precioBoletoString = parteInt + "." + parteDec;
            var precioBoletoFloat = parseFloat(precioBoletoString);
            console.log("Precio de boleto FLOAT: " + precioBoletoFloat);
            return precioBoletoFloat;
        }

        // ###########################################################################
        // ###########################################################################


        // ###########################################################################
        // ########################### Validacion ####################################

        // verifica que el horario de finalizacion del recorrido sea mayor
        // al de inicio
        function horarioCorrecto(hIni, mIni, hFin, mFin) {
            if (hFin < hIni) {
                return false;
            }
            if (hFin == hIni) {
                if (mFin <= mIni) {
                    return false;
                }
            }
            return true;
        }

        // ###########################################################################
        // ###########################################################################

        // ###########################################################################
        // ############################## SOPORTE ####################################

        // pasa los datos recuperados del servidor a 2 variables para q puedan
        // ser visualizados de manera correcta en la vista a la hora de la edicion
        function separarPrecioBoleto() {
            vm.intPrecioUpdate = Math.trunc(vm.unidadSeleccionada.precioBoleto);
            vm.decPrecioUpdate = Number(((vm.unidadSeleccionada.precioBoleto - vm.intPrecioUpdate).toFixed(2)) * 100);
        }

        // ###########################################################################
        // ###########################################################################


        // ###################################################################
        // ##################### INICIALIZACION DE DATOS #####################
        
        cargaUnidades();
        cargaEmpresas();

    } // fin Constructor

})()