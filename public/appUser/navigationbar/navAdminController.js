// Responsabilidad : Permitir ver la ponderacion de los recorridos
(function () {
    'use strict';
    // Se llama al modulo "adminModule"(), seria una especie de get
    angular.module('navigationbar', [])
        .controller('navAdminController', [
            '$scope',
            navAdminController
        ]);

    function navAdminController(vm) {

        // ********************************** VARIABLES PUBLICAS ************************

        vm.user = {};

        vm.logout = logout;


        // ********************************** FUNCIONES ************************
        function logout() {
            dataServer.getTokenAuth(vm.user)
                .then(function (data) {
                    // vm.totalItems = vm.pruebaJson.length;
                    console.log("Datos recuperados con EXITO! = TOKEN AUTH");
                    // una vez obtenida la respuesta del servidor realizamos las sigientes acciones
                    console.log(data);
                    console.log(data.token);
                    store.set('jwt', data.token);
                    location.path('/adminHome');
                })
                .catch(function (err) {
                    alert("Los datos ingresados no son correctos!");
                    console.log("ERRRROOORR!!!!!!!!!! ---> Al cargar el TOKEN ");
                })
        }

    } // fin Constructor

})()