// Responsabilidad : Permitir ver la ponderacion de los recorridos
(function () {
    'use strict';
    // Se llama al modulo "adminModule"(), seria una especie de get
    // angular.module('adminModule')
    angular.module('adminModule', [])
        .factory('authInterceptor', [
            '$q',
            '$window',
            'store',
            AuthInterceptor
        ]);

    function AuthInterceptor(q, window, store) {

        // ********************************** VARIABLES PUBLICAS ************************

        vm.loginPrueba = loginPrueba;
        vm.login = login;


        // ********************************** FUNCIONES ************************

        function login() {
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

distorAdmin.factory('authInterceptor', [
    '$rootScope', '$q', '$window', '$location',
    function ($rootScope, $q, $window, $location) {
        return {
            request: function (config) {
                //console.log("se ejecuto request, authInterceptor");
                config.headers = config.headers || {};
                if ($window.sessionStorage.api_token) {
                    //console.log("token que voy a agregar a la request: ", $window.sessionStorage.api_token);
                    config.headers['Authorization'] = 'Bearer ' + $window.sessionStorage.api_token;
                }
                return config;
            },
            responseError: function (response) {
                //console.log("authInterceptor vino error: ", response);
                if (response.status == 401) {
          //$rootScope.status = 401;
                    //$location.path('/login');
                    //return;
                }
                return $q.reject(response);
            }
        };
    }
]);

distorAdmin.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});