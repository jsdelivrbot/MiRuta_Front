// Responsabilidad : Permitir ver la ponderacion de los recorridos
// TODO sin funcionalidad debido a que no se creo el servicio en el backend
(function () {
    'use strict';
    // Se llama al modulo "mapModule"(), seria una especie de get
    angular.module('mapModule')
        .controller('adminPtoInteresController', [
            '$scope',
            'creatorMap',
            'dataServer',
            // 'srvComponents',
            'srvStyles',
            'srvDrawFeature',
            AdminPtoInteresController
        ]);

    // function AdminPtoInteresController(vm, creatorMap, dataServer, drawing, styles, drawFeature) {
    function AdminPtoInteresController(vm, creatorMap, dataServer, styles, drawFeature) {

        // ********************************** VARIABLES PUBLICAS ************************
        // generamos un mapa de entrada
        vm.map = creatorMap.getMap();

        var estilosActuales, estilosNuevos;

        estilosActuales = [];
        estilosNuevos = [];

        // ###########################################################################
        // ################################# CREACION ###############################

        vm.tiposInteres = [];
        vm.nombrePunto;
        vm.tipoSeleccionado;
        vm.nuevoPtoInteres = {
            "nombre": "",
            "lat": "",
            "lon": "",
            "idTipo": ""
        }
        var latPuntoCreacion, lonPuntoCreacion;

        // *************** Flags ******************

        var modoCreacion = false;
        vm.coordSeleccionada = false;
        // vm.datosOkCreate = false;
        vm.guardadoExitoso = false;

        // ******************* CAPAS *******************
        // array donde se almacenan los marcadores
        var vectorSourceCreacion = new ol.source.Vector();
        var capaCreacion = new ol.layer.Vector({
            source: vectorSourceCreacion
        });

        vm.guardarPunto = function(){
            if(datosVaciosCreacion()){
            // if(vm.datosVaciosCreacion()){
                alert("Faltan datos para realizar la operación.");
                return;
            }
            recuperarDatosPunto();
            guardarPuntoInteres();
        }

        function datosVaciosCreacion(){
        // vm.datosVaciosCreacion = function(){
            // controlamos que los datos no esten vacios
            if(vm.nombrePunto == null){
                console.log(" Falta el nombre del punto");
                return true;
            }
            if(vm.tipoSeleccionado == null){
                console.log(" Falta seleccionar el tipo de punto");
                return true;
            }
            if(!vm.coordSeleccionada){
                console.log(" Falta seleccionar un punto en el mapa");
                return true;
            }

            return false;
        }

        // recuperamos los datos ingresados por el usuario
        function recuperarDatosPunto(){
            vm.nuevoPtoInteres.nombre = vm.nombrePunto;
            vm.nuevoPtoInteres.lat = latPuntoCreacion;
            vm.nuevoPtoInteres.lon = lonPuntoCreacion;
            vm.nuevoPtoInteres.idTipo = vm.tipoSeleccionado.id;
            console.log(" Datos del nuevo punto de interes.");
            console.log(vm.nuevoPtoInteres);
        }

        vm.resetDatos = function(){
            vm.nombrePunto = null;
            vm.tipoSeleccionado = null;
            vm.nuevoPtoInteres = {
                "nombre": "",
                "lat": "",
                "lon": "",
                "idTipo": ""
            }
            latPuntoCreacion = null;
            lonPuntoCreacion = null;
            // reseteamos las banderas
            vm.coordSeleccionada = false;
            vm.guardadoExitoso = false;
            // limpiamos la capa
            vectorSourceCreacion.clear();
        }

        vm.hayTipoSeleccionadoCreate = function(){
            if(vm.tipoSeleccionado == null){
                return false;
            }
            return true;
        }

        // ###########################################################################
        // ################################# EDICION ###############################

        var modoEdicion = false;

        vm.nombresTipos = [];
        vm.namesTiposInteres = [];
        vm.nameTipoSeleccionado;
        
        vm.editUbicacionPunto = false;

        vm.dataPuntoUpdate = {
            id: null,
            nombre: null,
            lat: null,
            lon: null,
            idTipointeres: null
        }

        // ********** campos nuevos *************
        vm.nuevoNombre;
        vm.nuevoTipoPunto;
        var nuevasCoord;

        // ******************* CAPA *******************
        // array donde se almacenan los marcadores
        var vectorSourceEdicion = new ol.source.Vector();
        var capaEdicion = new ol.layer.Vector({
            source: vectorSourceEdicion
        });

        // ******************** paginacion ************************
        vm.ptoInteresEditSelec = false;
        vm.tipoSeleccionadoUpdate = false;

        vm.ptosInteresByTipo = [];
        vm.pagActual;
        vm.pagTotal;
        vm.cantForPage = 5;

        vm.datosPuntoSeleccionado;
        vm.idPuntoFilaSeleccionada;

        // recupera los puntos del tipo seleccionado
        vm.buscarPuntos = function(){
            if(vm.nameTipoSeleccionado == null){
                console.log("No hay tipo seleccionado");
                return;
            }
            vm.tipoSeleccionadoUpdate = true;
            resetDatosEdit();
            if(vm.datosPuntoSeleccionado != null){
                vm.datosPuntoSeleccionado.nombre = null;
            }
            // limpiamos el mapa
            vectorSourceEdicion.clear();
            getTipoPuntos();
        }

        function updateDatosTabla(){
            vm.pagActual = 1;
            vm.pagTotal = Math.trunc(vm.ptosInteresByTipo.length/vm.cantForPage) + 1;
        }

        // asigna los valores para administrar la tabla con los datos seleccionados
        function reasignarNommbresTipoInteres(){
            var newNombreTipo, nombreTipo;

            newNombreTipo = {
                "id": 0,
                "nombre": "todos"
            }
            vm.namesTiposInteres.push(newNombreTipo);

            for (let i = 0; i < vm.nombresTipos.length; i++) {
                nombreTipo = vm.nombresTipos[i];
                // creamos el dato para mandar al servidor
                newNombreTipo = {
                    "id": i+1,
                    "nombre": nombreTipo
                }
                // almacenamos el nuevo dato en el array nuevo modificado
                vm.namesTiposInteres.push(newNombreTipo);
                console.log("Lista de tipos de puntos:");
                console.log(vm.namesTiposInteres);
            }
        }

        vm.noHayTipoSeleccionado = function(){
            if(vm.nameTipoSeleccionado == null){
                return true;
            }
            return false;
        }

        vm.reubicarPunto = function(){
            vm.editUbicacionPunto = true;
        }

        vm.setPuntoSelected = function(puntoSeleccionado){
            if(hayCambios()){
                // alert("Perdera los datos ingresados");
                if (confirm("¿Esta seguro? :perderá los datos ingresados")) {
                    console.log("cambio de fila");
                }
                else{
                    return;
                }
                // $('#exampleModal').modal('show');
                // return;
            }
            // cada vez que seleccionamos otro punto reseteamos los valores de las variables
            // vm.nuevoNombre = null;
            // vm.nuevoTipoPunto = null;
            // vm.editUbicacionPunto = false;
            // nuevasCoord = null;
            // vm.ptoInteresEditSelec = true;
            resetDatosEdit();

            vm.idPuntoFilaSeleccionada = puntoSeleccionado.id;
            vm.datosPuntoSeleccionado = puntoSeleccionado;
            // // mostramos el punto en el mapa
            console.log("Punto seleccionado nuevo: ");
            console.log(puntoSeleccionado);
            // recupero el estilo de acuerdo al tipo de punto
            var estilo = getStyleMarker(vm.datosPuntoSeleccionado.tipointeres.nombre);
            dibujarMarcadorUnico(vm.datosPuntoSeleccionado.coordenada.coordinates, estilo, vectorSourceEdicion);
        }

        function resetDatosEdit(){
            vm.nuevoNombre = null;
            vm.nuevoTipoPunto = null;
            vm.editUbicacionPunto = false;
            nuevasCoord = null;
            vm.ptoInteresEditSelec = true;
        }

        // vm.actualizarDatosPuntoSeleccionado = function(){
        //     $('#exampleModal').modal('hide');
        //     console.log("Se cambio el punto a editar");
        //     // cada vez que seleccionamos otro punto reseteamos los valores de las variables
        //     vm.nuevoNombre = null;
        //     vm.nuevoTipoPunto = null;
        //     vm.editUbicacionPunto = false;
        //     nuevasCoord = null;
        //     vm.ptoInteresEditSelec = true;

        //     vm.idPuntoFilaSeleccionada = puntoSeleccionado.id;
        //     vm.datosPuntoSeleccionado = puntoSeleccionado;
        //     // // mostramos el punto en el mapa
        //     console.log("Punto seleccionado nuevo: ");
        //     console.log(puntoSeleccionado);
        //     // recupero el estilo de acuerdo al tipo de punto
        //     // var estilo = getStyleMarker(vm.datosPuntoSeleccionado);
        //     var estilo = getStyleMarker(vm.datosPuntoSeleccionado.tipointeres.nombre);
        //     dibujarMarcadorUnico(vm.datosPuntoSeleccionado.coordenada.coordinates, estilo, vectorSourceEdicion);
        // }

        vm.pagAnterior = function(){
            if(vm.pagActual > 1){
                vm.pagActual--;
                console.log('Pagina actual PREV: ' + vm.pagActual);
                return;
            }
            console.log("No hay paginas para retroceder");
        }

        vm.pagSiguiente = function(){
            if(vm.pagActual < vm.pagTotal){
                vm.pagActual++;
                console.log('Pagina actual NEXT: ' + vm.pagActual);
                return;
            }
            console.log("No hay paginas para avanzar");
        }

        vm.guardarCambios = function(){
            if(hayCambios()){
                recuperarDatosNuevos();
                actualizarPuntoInteres();
            }
            else{
                alert("No se realizaron modificaciones en el punto.");
            }
        }

        function hayCambios(){
            if(vm.nuevoNombre != null){
                return true;
            }
            if(vm.editUbicacionPunto){
                return true;
            }
            if(vm.nuevoTipoPunto != null){
                return true;
            }
            return false;
        }

        function recuperarDatosNuevos(){
            vm.dataPuntoUpdate.id = vm.datosPuntoSeleccionado.id;

            if(vm.nuevoNombre != null){
                vm.dataPuntoUpdate.nombre = vm.nuevoNombre;
            }
            else{
                vm.dataPuntoUpdate.nombre = vm.datosPuntoSeleccionado.nombre;
            }

            if(vm.editUbicacionPunto){
                vm.dataPuntoUpdate.lat = nuevasCoord[0];
                vm.dataPuntoUpdate.lon = nuevasCoord[1];
            }
            else{
                vm.dataPuntoUpdate.lat = vm.datosPuntoSeleccionado.coordenada.coordinates[0];
                vm.dataPuntoUpdate.lon = vm.datosPuntoSeleccionado.coordenada.coordinates[1];
            }

            if(vm.nuevoTipoPunto != null){
                vm.dataPuntoUpdate.idTipointeres = vm.nuevoTipoPunto.id;
            }
            else{
                vm.dataPuntoUpdate.idTipointeres = vm.datosPuntoSeleccionado.tipointeres.id;
            }
            console.log("Datos nuevos recuperados:");
            console.log(vm.dataPuntoUpdate);
        }

        function actualizarCamposPuntoEditado(datosNuevos){
            // volvemos a dibujar el punto con los nuevos datos
            var tipoPunto, estilo;
            console.log("El nuevo tipo de punto SELEC es:");
            console.log(vm.nuevoTipoPunto);
            if(vm.nuevoTipoPunto != null){
                tipoPunto = vm.nuevoTipoPunto.nombre;
            }
            else{
                tipoPunto = vm.datosPuntoSeleccionado.tipointeres.nombre;
            }
            console.log("El nuevo tipo de punto es: "+tipoPunto);
            estilo = getStyleMarker(tipoPunto);
            dibujarMarcadorUnico(datosNuevos.coordenada.coordinates, estilo, vectorSourceEdicion);
            vm.datosPuntoSeleccionado.nombre = datosNuevos.nombre;
            vm.nuevoNombre = null;
            vm.nuevoTipoPunto = null;
            vm.editUbicacionPunto = false;
        }

        // cargamos de entrada los iconos que vamos a usar en la vista
        function cargarIconos(){
            
            // iconos para mostrar puntos
            estilosActuales["carga"] = styles.marcadorCargaActual();
            estilosActuales["traslado"] = styles.marcadorTrasladoActual();

            // iconos para edicion de puntos
            estilosNuevos["carga"] = styles.marcadorCargaNuevo();
            estilosNuevos["traslado"] = styles.marcadorTrasladoNuevo();
        }

        // ###########################################################################
        // ################################# Serv REST ###############################

        function cargaTiposPuntosInteres() {
            dataServer.getTipoInteres()
                .then(function (data) {
                    // una vez obtenida la respuesta del servidor realizamos las sigientes acciones
                    vm.tiposInteres = data;
                    console.log("Datos recuperados con EXITO! = TIPOS_INTERES");
                    console.log(vm.tiposInteres);
                })
                .catch(function (err) {
                    console.log("ERRRROOORR!!!!!!!!!! ---> Al cargar las TIPOS_INTERES");
                })
        }

        function guardarPuntoInteres(){
            dataServer.savePtoInteres(vm.nuevoPtoInteres)
                .then(function (data) {
                    vm.guardadoExitoso = true;
                    console.log("Creacion con EXITO! = PUNTOS_INTERES");
                    console.log(data);
                    alert("La operacion fue realizada con exito");
                })
                .catch(function (err) {
                    console.log("ERRRROOORR!!!!!!!!!! ---> Al cargar las PUNTO_INTERES");
                })
        }

        function actualizarPuntoInteres(){
            dataServer.updatePtoInteres(vm.dataPuntoUpdate)
                .then(function (data) {
                    // vm.guardadoExitoso = true;
                    console.log("Actualizacion con EXITO! = PUNTOS_INTERES");
                    console.log(data);
                    // se vuelven a traer los datos para actualizarlos en la vista
                    actualizarCamposPuntoEditado(data);
                    alert("La operacion fue realizada con exito");
                })
                .catch(function (err) {
                    console.log("ERRRROOORR!!!!!!!!!! ---> Al actualizar las PUNTO_INTERES");
                })
        }

        function cargaNombreTiposPuntosInteres() {
            dataServer.getNamesTipoInteres()
                .then(function (data) {
                    // una vez obtenida la respuesta del servidor realizamos las sigientes acciones
                    vm.nombresTipos = data;
                    reasignarNommbresTipoInteres();
                    console.log("Datos recuperados con EXITO! = NAMES_TIPOS_INTERES");
                    console.log(vm.nombresTipos);
                })
                .catch(function (err) {
                    console.log("ERRRROOORR!!!!!!!!!! ---> Al cargar las NAMES_TIPOS_INTERES");
                })
        }

        function getTipoPuntos(){
            // vm.nameTipoSeleccionado;
            // console.log(" Tipo seleccionado: "+vm.nameTipoSeleccionado.nombre+" - id:"+vm.nameTipoSeleccionado.id);
            
            dataServer.getPtoInteresByType(vm.nameTipoSeleccionado.nombre)
                .then(function (data) {
                    // una vez obtenida la respuesta del servidor realizamos las sigientes acciones
                    vm.ptosInteresByTipo = data;
                    updateDatosTabla();
                    // reasignarNommbresTipoInteres();
                    console.log("Datos recuperados con EXITO! = TIPOS_INTERES");
                    console.log(vm.ptosInteresByTipo);
                })
                .catch(function (err) {
                    console.log("ERRRROOORR!!!!!!!!!! ---> Al cargar las TIPOS_INTERES");
                })
        }

        // ###########################################################################
        // ################################### EVENTOS ###############################
        
        vm.map.on('click', function (evt) {
            console.log(evt.coordinate);

            if((!modoCreacion)&&(!modoEdicion)){
                console.log("Seleccione un menu");
                return;
            }

            // console.log("Modos: "+modoCreacion+" - "+modoEdicion);

            if(modoCreacion){
                if(!vm.coordSeleccionada){
                    vm.coordSeleccionada = true;
                }

                if(vm.hayTipoSeleccionadoCreate()){
                    latPuntoCreacion = evt.coordinate[0];
                    lonPuntoCreacion = evt.coordinate[1];

                    console.log("Tipo CREACION = ");
                    console.log(vm.tipoSeleccionado);
        
                    var estilo = getStyleMarker(vm.tipoSeleccionado.nombre);
                    // arreglar la recuperacion del estilo
                    dibujarMarcadorUnico(evt.coordinate, estilo, vectorSourceCreacion);
                }
                else{
                    alert("Seleccione un tipo de punto para poder crear un nuevo punto.");
                }
            }

            if(modoEdicion){
                if(vm.editUbicacionPunto){
                    nuevasCoord = evt.coordinate;
                    // el punto actual se dibuja cuando se selecciona el punto
                    var estiloNuevo = getStyleMarkerNuevo(vm.datosPuntoSeleccionado.tipointeres.nombre);
                    dibujarNuevoPunto(nuevasCoord, estiloNuevo ,vectorSourceEdicion);
                }
                else{
                    // nos aseguramos que haya un punto seleccionado
                    if(vm.datosPuntoSeleccionado != null){
                        alert(" Seleccione [Nueva ubicacion] para reubicar el punto en el mapa.");
                    }
                }
            }
            
        });

        // ###########################################################################
        // ################################# DIBUJO ##################################
        
        // limpia el mapa y dibuja el marcador correspondiente a las coord dadas
        function dibujarMarcadorUnico(coordenadas, estilo, sourceCapa) {
            sourceCapa.clear();
            var marcadorPtoInteres = drawFeature.getMarcadorByStyle(coordenadas, estilo);
            // le asignamos un id para poder recuperarlo mas facil
            marcadorPtoInteres.setId(0);
            sourceCapa.addFeature(marcadorPtoInteres);
        }

        function dibujarNuevoPunto(coordenadas, estilo, sourceCapa) {
            var feature_punto = sourceCapa.getFeatureById(1);
            if(feature_punto != null){
                sourceCapa.removeFeature(feature_punto);
            }
            
            var marcadorPtoInteres = drawFeature.getMarcadorByStyle(coordenadas, estilo);
            marcadorPtoInteres.setId(1);
            sourceCapa.addFeature(marcadorPtoInteres);
        }

        function getStyleMarker(nombreTipoPunto){
            // console.log("Busca el estilo de:");
            var estilo = estilosActuales[nombreTipoPunto];

            return estilo;
        }

        function getStyleMarkerNuevo(nombreTipoPunto){
            // el tipo de punto debe star seleccionado previamente
            var estilo = estilosNuevos[nombreTipoPunto];

            return estilo;
        }

        function selectModoCreate(){
            console.log("Se selecciono el panel de CREACION");
            capaEdicion.setVisible(false);
            capaCreacion.setVisible(true);
        }

        function selectModoEdit(){
            console.log("Se selecciono el panel de EDICION");
            capaCreacion.setVisible(false);
            capaEdicion.setVisible(true);
        }

        function deselectModoCreate(){
            console.log("Se cerro el panel de CREACION");
            capaCreacion.setVisible(false);
        }

        function deselectModoEdit(){
            console.log("Se selecciono el panel de EDICION");
            capaEdicion.setVisible(false);
        }

        // ###########################################################################
        // ######################### CONTROL DE HTML ###########################

        $('#menuCreacion').on('shown.bs.collapse', function () {
            console.log("Se abrio el menu de creacion");
            modoCreacion = true;
            modoEdicion = false;
            selectModoCreate();
            $('#menuEdit').collapse('hide');
        })

        $('#menuEdit').on('shown.bs.collapse', function () {
            console.log("Se abrio el menu de edicion");
            modoEdicion = true;
            modoCreacion = false;
            selectModoEdit();
            $('#menuCreacion').collapse('hide');
        })

        $('#menuCreacion').on('hidden.bs.collapse', function () {
            console.log("Se cerro el menu de creacion");
            modoCreacion = false;
            // modoEdicion = false;
            deselectModoCreate();
            $('#menuEdit').collapse('hide');
        })

        $('#menuEdit').on('hidden.bs.collapse', function () {
            console.log("Se cerro el menu de edicion");
            modoEdicion = false;
            // modoCreacion = false;
            deselectModoEdit();
            $('#menuCreacion').collapse('hide');
        })

        // ###########################################################################
        // ############################## INICIALIZACION #############################

        // al crear el controlador ejecutamos esta funcion
        cargaTiposPuntosInteres();
        // cargamos los nombres de los tipos de punto de interes
        cargaNombreTiposPuntosInteres();
        cargarIconos();

        // agregamos las capas de trabajo al mapa
        vm.map.addLayer(capaCreacion);
        vm.map.addLayer(capaEdicion);

        // #############################################################
        // #################### PRUEBA PAGINACION ######################
        // cant datos : 13x2 = 26;
        // vm.data = [
        //     {"name":"Bell","id":"K0H 2V5"},{"name":"Octavius","id":"X1E 6J0"},
        //     {"name":"Alexis","id":"N6E 1L6"},{"name":"Colton","id":"U4O 1H4"},
        //     {"name":"Abdul","id":"O9Z 2Q8"},{"name":"Ian","id":"Q7W 8M4"},
        //     {"name":"Eden","id":"H8X 5E0"},{"name":"Britanney","id":"I1Q 1O1"},
        //     {"name":"Ulric","id":"K5J 1T0"},{"name":"Geraldine","id":"O9K 2M3"},
        //     {"name":"Hamilton","id":"S1D 3O0"},{"name":"Melissa","id":"H9L 1B7"},
        //     {"name":"Remedios","id":"Z3C 8P4"},{"name":"Ignacia","id":"K3B 1Q4"},
        //     {"name":"Jaime","id":"V6O 7C9"},{"name":"Savannah","id":"L8B 8T1"},
        //     {"name":"Declan","id":"D5Q 3I9"},{"name":"Skyler","id":"I0O 4O8"},
        //     {"name":"Lawrence","id":"V4K 0L2"},{"name":"Yael","id":"R5E 9D9"},
        //     {"name":"Herrod","id":"V5W 6L3"},{"name":"Lydia","id":"G0E 2K3"},
        //     {"name":"Tobias","id":"N9P 2V5"},{"name":"Wing","id":"T5M 0E2"},
        //     {"name":"Callum","id":"L9P 3W5"},{"name":"Wing","id":"T5M 0E2"}
        // ];

        // // vm.totalItems = vm.data.length;
        // vm.filaSeleccionada;
        // vm.currentPage = 1;
        // vm.itemsPerPage = 5;
        // vm.totalPages = Math.trunc(vm.data.length/vm.itemsPerPage) + 1; //cant total de paginas

        // // controlar q no se pasen de los bordes
        // vm.nextPage = function() {
        //     if(vm.currentPage < vm.totalPages){
        //         vm.currentPage++;
        //         console.log('Pagina actual NEXT: ' + vm.currentPage);
        //         return;
        //     }
        //     console.log("No hay paginas para avanzar");
        // };

        // vm.prevPage = function(){
        //     if(vm.currentPage > 1){
        //         vm.currentPage--;
        //         console.log('Pagina actual PREV: ' + vm.currentPage);
        //         return;
        //     }
        //     console.log("No hay paginas para retroceder");
        // }

        // vm.setSelected = function(id){
        //     console.log("Se selecciono una fila: "+vm.filaSeleccionada+" - id:"+id);
        // }

    } // fin Constructor

})()