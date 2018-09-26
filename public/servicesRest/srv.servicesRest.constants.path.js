(function () {
    'use strict';
    angular.module('servicesRestModule')
        .constant('path', {
            PRUEBA_USERS: 'http://localhost:8080/miruta/users',
            GET_TOKEN_AUTH: 'http://localhost:8080/login',
            ALL_UNIDADES: 'http://localhost:8080/miruta/unidadlinea',
            ALL_NAMES_UNIDADES: 'http://localhost:8080/miruta/unidadlinea/names',
            // ALL_RECORRIDOS: 'http://localhost:8080/miruta/recorridos',
            // SAVE_RECORRIDO: 'http://localhost:8080/miruta/recorridos/create',
            SET_RECORRIDO: 'http://localhost:8080/miruta/unidadlinea/setRecorrido',
            DELETE_RECORRIDO: 'http://localhost:8080/miruta/unidadlinea/deleteRecorrido',
            ALL_RECORRIDOS: 'http://localhost:8080/miruta/unidadlinea/recorrido',
            ALL_EMPRESAS: 'http://localhost:8080/miruta/company',
            // SAVE_UNIDAD: 'http://localhost:8080/miruta/unitransportes/create',
            SAVE_UNIDAD: 'http://localhost:8080/miruta/unidadlinea/create',
            // UPDATE_UNIDAD: 'http://localhost:8080/miruta/unitransportes/update',
            UPDATE_UNIDAD: 'http://localhost:8080/miruta/unidadlinea/update',
            // DELETE_UNIDAD: 'http://localhost:8080/miruta/unitransportes/delete',
            DELETE_UNIDAD: 'http://localhost:8080/miruta/unidadlinea/delete',
            SAVE_USUARIO: 'http://localhost:8080/miruta/users/create'
        });
})()