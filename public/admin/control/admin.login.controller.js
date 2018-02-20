// Responsabilidad : Permitir ver la ponderacion de los recorridos
(function () {
    'use strict';
    // Se llama al modulo "adminModule"(), seria una especie de get
    // angular.module('adminModule')
    angular.module('adminModule', ['servicesRestModule'])
        .controller('adminInitController', [
            '$scope',
            // '$state',
            '$location',
            'dataServer',
            'store',
            AdminInitController
        ]);

    function AdminInitController(vm, location, dataServer, store) {

        // ********************************** VARIABLES PUBLICAS ************************
        
        vm.user = {};

        vm.loginPrueba = loginPrueba;
        vm.login = login;


        // ********************************** FUNCIONES ************************
        function loginPrueba(){
            console.log("Usuario: " + vm.user.nombre);
            console.log("Password: " + vm.user.pass);
            dataServer.getPrueba()
                .then(function (data) {
                    // vm.totalItems = vm.pruebaJson.length;
                    console.log("Datos recuperados con EXITO! = USUARIOS");
                    // una vez obtenida la respuesta del servidor realizamos las sigientes acciones
                    console.log(data);
                })
                .catch(function (err) {
                    console.log("ERRRROOORR!!!!!!!!!! ---> Al cargar los USUARIOS");
                })
        }

        function login() {
            dataServer.getTokenAuth(vm.user)
                .then(function (data) {
                    // vm.totalItems = vm.pruebaJson.length;
                    console.log("Datos recuperados con EXITO! = TOKEN AUTH");
                    store.set('jwt',data.token);
                    location.path('/adminHome');
                })
                .catch(function (err) {
                    alert("Los datos ingresados no son correctos!");
                    console.log("ERRRROOORR!!!!!!!!!! ---> Al cargar el TOKEN ");
                })
        }

    } // fin Constructor

})()