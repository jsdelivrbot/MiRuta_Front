// Responsabilidad : Permitir ver la ponderacion de los recorridos
// TODO sin funcionalidad debido a que no se creo el servicio en el backend
(function () {
    'use strict';
    // Se llama al modulo "mapModule"(), seria una especie de get
    angular.module('mapModule')
        .controller('registroController', [
            '$scope',
            'dataServer',
            RegistroController
        ]);

    function RegistroController(vm, dataServer) {

        vm.usuario = {
            "nombre": "",
            "pass": "",
            "mail": ""
        };

        vm.passConfirmacion = "";
        vm.errorRegistro = "";

        //###################### FLAGS ##########################

        // vm.confirmacionCorrecta = false;
        vm.usuarioCreado = false;
        vm.datosCorrectos = true;

        //#######################################################

        // ####################################################################
        // ######################## FUNCIONES ##########################

        // *************************************************
        // ***************** PUBLICAS **********************
        vm.registrarUsuario = function(){
            if (!datosVacios()){
                if (confirmacionCorrecta(vm.usuario.pass, vm.passConfirmacion)) {
                    vm.datosCorrectos = true;
                    saveUsuario();
                }
            }
            else{
                vm.datosCorrectos = false;
            }
        }

        // *************************************************
        // ***************** PRIVADAS **********************
        function saveUsuario() {
            console.log("info usuario:");
            console.log(vm.usuario);
            dataServer.saveUsuario(vm.usuario)
                .then(function (data) {
                    // una vez obtenida la respuesta del servidor realizamos las sigientes acciones
                    console.log("Datos guardados con EXITO! = USUARIO CREADO");
                    console.log(data);
                    vm.usuarioCreado = true;
                })
                .catch(function (err) {
                    console.log("ERRRROOORR!!!!!!!!!! ---> Al guardar el NUEVO USUARIO");
                })
        }

        // **********************************************************************
        // ************************** VALIDACION ********************************

        function confirmacionCorrecta(pass, confirmacionPass){
            if(pass == confirmacionPass){
                return true;
            }
            vm.errorRegistro = "ERROR EN CONTRASEÑA!!";
            console.log("ERROR EN CONTRASEÑA!!");
            return false;
        }

        function datosVacios(){
            console.log(" usuario: " + vm.usuario.nombre + " - pass: " + vm.usuario.pass + " - mail: " + vm.usuario.mail + " confir: " +vm.passConfirmacion);
            console.log(" Entro a DATOS VACIOS!");
            if (vm.usuario.nombre == "" || vm.usuario.pass == "" || vm.usuario.mail == "" || vm.passConfirmacion == ""){
                vm.errorRegistro = "CAMPOS VACIOS!!";
                return true;
            }
            if (vm.usuario.nombre == null || vm.usuario.pass == null || vm.usuario.mail == null || vm.passConfirmacion == null){
                vm.errorRegistro = "CAMPOS INCORRECTOS!!";
                return true;
            }
            
            return false;
        }

    } // fin Constructor

}) ()