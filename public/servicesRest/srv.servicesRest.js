// Responsabilidad : Realizar las peticiones HTTP al servidor y brindar los resultados a los controladores
(function () {
    'use strict';
    angular.module('servicesRestModule')
        .factory('dataServer', ['$http', '$q', 'path', DataServer]);

    function DataServer($http, $q, path) {
        var service = {
            // prueba
            getPrueba: getPrueba,
            getTokenAuth: getTokenAuth,
            // UNIDADES TRANSPORTES
            getNombreUnidades: getNombreUnidades,
            getUnidades: getUnidades,
            // RECORRIDOS
            getRecorridos: getRecorridos,
            // EMPRESAS
            getEmpresas: getEmpresas
        };
        return service;

        // se buscan los datos del servidor
        function getPrueba() {
            var defered = $q.defer();
            var promise = defered.promise;

            $http({
                method: 'GET',
                url: path.PRUEBA_USERS
            }).then(function successCallback(res) {
                defered.resolve(res.data);
                console.log('Cant de USUARIOS creados: ' + res.data.length);
                console.log('Datos de los USUARIOS: ' + (res.data)[0]);
            },
                function errorCallback(err) {
                    defered.reject(err)
                }
            );

            return promise;
        };

        // vamos en busca del token de autentificacion
        function getTokenAuth(dataUser) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http({
                method: 'POST',
                url: path.GET_TOKEN_AUTH,
                data: dataUser
            }).then(function successCallback(res) {
                defered.resolve(res.data);
            },
                function errorCallback(err) {
                    defered.reject(err)
                }
            );

            return promise;
        };


        // ******************** UNIDADES DE TRANSPORTE *************************
        // *********************************************************************
        function getNombreUnidades() {
            var defered = $q.defer();
            var promise = defered.promise;

            $http({
                method: 'GET',
                url: path.ALL_NAMES_UNIDADES
            }).then(function successCallback(res) {
                defered.resolve(res.data);
            },
                function errorCallback(err) {
                    defered.reject(err)
                }
            );
            
            return promise;
        }

        function getUnidades(){
            var defered = $q.defer();
            var promise = defered.promise;

            $http({
                method: 'GET',
                url: path.ALL_UNIDADES
            }).then(function successCallback(res) {
                defered.resolve(res.data);
            },
                function errorCallback(err) {
                    defered.reject(err)
                }
            );

            return promise;
        }

        // **************************** RECORRIDOS *****************************
        // *********************************************************************
        function getRecorridos() {
            var defered = $q.defer();
            var promise = defered.promise;

            $http({
                method: 'GET',
                url: path.ALL_RECORRIDOS
            }).then(function successCallback(res) {
                defered.resolve(res.data);
            },
                function errorCallback(err) {
                    defered.reject(err)
                }
            );

            return promise;
        }

        // ****************************** EMPRESAS *****************************
        // *********************************************************************
        
        function getEmpresas() {
            var defered = $q.defer();
            var promise = defered.promise;

            $http({
                method: 'GET',
                url: path.ALL_EMPRESAS
            }).then(function successCallback(res) {
                defered.resolve(res.data);
            },
                function errorCallback(err) {
                    defered.reject(err)
                }
            );

            return promise;
        }
    }
})()
