(function () {
    'use strict';
    angular.module('servicesRestModule')
        .constant('path', {
            PRUEBA_USERS: 'http://localhost:8080/miruta/users',
            GET_TOKEN_AUTH: 'http://localhost:8080/login',
            ALL_UNIDADES: 'http://localhost:8080/miruta/unitransportes',
            ALL_NAMES_UNIDADES: 'http://localhost:8080/miruta/unidadlinea/names',
            ALL_RECORRIDOS: 'http://localhost:8080/miruta/recorridos',
            SAVE_RECORRIDO: 'http://localhost:8080/miruta/recorridos/create',
            ALL_EMPRESAS: 'http://localhost:8080/miruta/company',
            SAVE_UNIDAD: 'http://localhost:8080/miruta/unitransportes/create',
            UPDATE_UNIDAD: 'http://localhost:8080/miruta/unitransportes/update',
            DELETE_UNIDAD: 'http://localhost:8080/miruta/unitransportes/delete',
            SAVE_USUARIO: 'http://localhost:8080/miruta/users/create'
        });
})()