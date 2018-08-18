// Responsabilidad : Permitir ver la ponderacion de los recorridos
// TODO sin funcionalidad debido a que no se creo el servicio en el backend
(function () {
    'use strict';
    // Se llama al modulo "mapModule"(), seria una especie de get
    // angular.module('mapModule', ['drawModule'])
    angular.module('mapModule')
        .controller('adminRecorridoController', [
            '$scope',
            'creatorMap',
            'dataServer',
            // 'drawController',
            'srvComponents',
            AdminRecorridoController
        ]);

    function AdminRecorridoController(vm, creatorMap, dataServer, drawing) {

        // #############################################################################
        // ########################## VARIABLES PUBLICAS ###############################

        // generamos un mapa de entrada
        vm.map = creatorMap.getMap();

        vm.nombreUnidades = [];

        vm.indice = 0;

        vm.direccionParada = "";

        vm.nombreUnidadSeleccionada = "";
        // vm.unidadTrsnspSelec = [];
        // vm.transporteSeleccionado = false;

        // marcadores y rutas de la capa dibujados
        vm.cantFeaturesActual = 0;
        // solo la cantidad de paradas
        vm.cantParadas = 0;

        // #############################################################################
        // #############################################################################


        // #############################################################################
        // ######################### VARIABLES PRIVADAS ################################

        // constantes para la creacion de los recorridos
        const COLOR_RECORRIDO = 'green';
        // array con las coordenadas del recorrido
        var COORD_RECORRIDO = [];
        // variable con los datos que se enviaran al servidor para crear un nuevo recorrido
        var puntosRecorridoCreate = [];
        // datso completos del recorrido nuevo
        var nuevoRecorrido;
        // array con las direcciones de las paradas
        var direcciones = [];
        const MIN_TAMANIO_RECORRIDO = 2;

        // para controlar el acceso alas funcionalidades de cada seccion
        var modo_creacion = false;
        var modo_eliminacion = false;

        // array donde se almacenan los marcadores
        var vectorSource = new ol.source.Vector();
        var vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });

        // #############################################################################
        // #############################################################################


        // #############################################################################
        // ######################### FUNCIONES PRIVADAS ################################


        // ####################################################################
        // ######################### SERVICIOS REST ###########################
        function cargaNombreUnidades() {
            dataServer.getNombreUnidades()
                .then(function (data) {
                    // una vez obtenida la respuesta del servidor realizamos las sigientes acciones
                    vm.nombreUnidades = data;
                    console.log("Datos recuperados con EXITO! = UNIDADES");
                    console.log(vm.nombreUnidades);
                })
                .catch(function (err) {
                    console.log("ERRRROOORR!!!!!!!!!! ---> Al cargar las UNIDADES");
                })
        }

        function cargaRecorridos(){
            dataServer.getRecorridos()
                .then(function (data) {
                    // una vez obtenida la respuesta del servidor realizamos las sigientes acciones
                    vm.recorridos = data;
                    console.log("Datos recuperados con EXITO! = RECORRIDOS");
                    console.log(vm.recorridos);
                })
                .catch(function (err) {
                    console.log("ERRRROOORR!!!!!!!!!! ---> Al cargar las RECORRIDOS");
                })
        }

        function guardarRecorridoServ(){
            console.log("Datos del nuevo recorrido");
            console.log(nuevoRecorrido);
            dataServer.saveRecorrido(nuevoRecorrido)
                .then(function (data) {
                    // una vez obtenida la respuesta del servidor realizamos las sigientes acciones
                    // vm.recorridos = data;
                    console.log("NUEVO RECORRIDO creado con EXITO!");
                    console.log(data);
                })
                .catch(function (err) {
                    console.log("ERRRROOORR!!!!!!!!!! ---> Al crear NUEVO RECORRIDO");
                })
        }

        function didujarPuntoCercano(coordMapa){
            drawing.getPointNearest(coordMapa)
                .then(function (data) {
                    // una vez obtenida la respuesta del servidor realizamos las sigientes acciones
                    var coord = data;
                    console.log("Datos recuperados con EXITO! = PUNTO CERCANO");
                    var marcadorPtoCercano = drawing.getMarkerPoint(coord);
                    marcadorPtoCercano.setId(vm.cantFeaturesActual + 1);
                    vectorSource.addFeature(marcadorPtoCercano);

                    // actualizamos la cantidad de elementos dibujados en la capa
                    vm.cantFeaturesActual = vectorSource.getFeatures().length;
                    // console.log(" Cant de features de la capa MARCADOR: " + vm.cantFeaturesActual);
                    // console.log(vectorSource.getFeatureById(vm.cantFeaturesActual));
                })
                .catch(function (err) {
                    console.log("ERRRROOORR!!!!!!!!!! ---> Al recuperar coord PUNTO CERCANO");
                })
        }

        function recuperarDireccion(coordMapa){
            drawing.getAddressPoint(coordMapa)
                 .then(function (data) {
                     // una vez obtenida la respuesta del servidor realizamos las sigientes acciones
                     vm.direccionParada = data[0];
                     // guardamos la direccion en el array con su id
                     direcciones[vm.cantParadas] = data[0];
                     console.log("Datos recuperados con EXITO! = DIRECCION");
                     console.log(vm.direccionParada);
                 })
                 .catch(function (err) {
                     console.log("ERRRROOORR!!!!!!!!!! ---> Al recuperar DIRECCION");
                     console.log(err);
                 })
        }

        function dibujarRutaPtos(puntos) {

            drawing.getRoute(puntos)
                .then(function (data) {
                    // una vez obtenida la respuesta del servidor realizamos las sigientes acciones
                    var coordGeomRuta = data.coordinates;
                    console.log("Datos recuperados con EXITO! = RUTA_PTOS");
                    
                    // creamos el componente a mostrar en la capa y le asignamos un identificador
                    var ruta = drawing.getFeatureRoute(coordGeomRuta);
                    ruta.setId(vm.cantFeaturesActual + 1);
                    vectorSource.addFeature(ruta);
                    
                    // actualizamos la cantidad de elementos dibujados en la capa
                    vm.cantFeaturesActual = vectorSource.getFeatures().length;
                    // console.log(" Cant de features de la capa RUTA: " + vm.cantFeaturesActual);
                    // console.log(vectorSource.getFeatureById(vm.cantFeaturesActual));
                })
                .catch(function (err) {
                    console.log("ERRRROOORR!!!!!!!!!! ---> Al recuperar RUTA_PTOS");
                    console.log(err);
                })
        }

        // ####################################################################
        // ####################################################################

        // ####################################################################
        // ######################### SOPORTE SERVICIOS REST ###########################

        // soporte para vm.borrarUltimo()
        function borrarFeature(){
            var ultimoFeature = vectorSource.getFeatureById(vm.cantFeaturesActual);
            vectorSource.removeFeature(ultimoFeature);
            vm.cantFeaturesActual--;
        }

        // preparamos los datos para enviarlos al servidor y guardarlos
        function recuperarDatosRecorrido(){
            // recuperamos los datos del recorrido
            COORD_RECORRIDO.forEach(crearDatoRecorrido);
            nuevoRecorrido = {
                "color": COLOR_RECORRIDO,
                "puntos": puntosRecorridoCreate,
                "nombreUnidadTransporte": vm.nombreUnidadSeleccionada
            }
        }

        // reasignamos los datos de los puntos cargados
        function crearDatoRecorrido(value, index, ar){
            var nuevoPuntoRecorrido = {
                "lat": value[1],
                "lon": value[0],
                "descripcion": "algoDesc",
                "tipoPunto": 1
            }
            
            puntosRecorridoCreate.push(nuevoPuntoRecorrido);
        }

        function crearLineString(coordenadas){
            return new ol.geom.LineString(coordenadas);
        }

        function verLineString(){
            var coordRecorrido = [
                                    [-42.75792890613414,-65.0456220045391],
                                    [-42.75792890613414, -65.0456220045391],
                                    [-42.75792890613414, -65.0456220045391],
                                    [-42.75792890613414, -65.0456220045391],
                                    [-42.75792890613414, -65.0456220045391]
            ];
            var recorridoLS = new ol.geom.LineString(coordRecorrido);

            console.log(recorridoLS);
        }

        // ####################################################################
        // ####################################################################

        // #############################################################################
        // ##################### ELIMINACION DE RECORRIDOS #############################

        vm.nombreUnidadSeleccionadaElim = "";
        vm.unidadConRecorrido = true;

        function cargaRecorridoUnidades() {
            // dataServer.getNombreUnidades()
            //     .then(function (data) {
            //         // una vez obtenida la respuesta del servidor realizamos las sigientes acciones
            //         vm.nombreUnidades = data;
            //         console.log("Datos recuperados con EXITO! = UNIDADES");
            //         console.log(vm.nombreUnidades);
            //     })
            //     .catch(function (err) {
            //         console.log("ERRRROOORR!!!!!!!!!! ---> Al cargar las UNIDADES");
            //     })
        }
        

        // #############################################################################
        // #############################################################################
        
        // #############################################################################
        // ################################ EVENTOS #####################################

        vm.map.on('click', function (evt) {
            console.log(evt.coordinate);
            if(vm.nombreUnidadSeleccionada == ""){
                alert("Debe seleccionar una UNIDAD DE TRANSPORTE antes de crear un recorrido");
            }
            else{
                // agregamos el marcador al mapa
                COORD_RECORRIDO.push(evt.coordinate);
                vm.cantParadas = COORD_RECORRIDO.length;

                // console.log("Cantidad de puntos: " + cantPuntos);
                if (vm.cantParadas > 1) {
                    var puntos = {
                        coordIni: COORD_RECORRIDO[vm.cantParadas - 2],
                        coordFin: evt.coordinate
                    };
                    dibujarRutaPtos(puntos);
                }
                
                // buscamos el punto mas cercano que sea calle
                didujarPuntoCercano(evt.coordinate);

                // mostrar la direccion
                recuperarDireccion(evt.coordinate);
            }
        });

        vm.guardarRecorrido = function(){
            if (vm.cantParadas < MIN_TAMANIO_RECORRIDO) {
                alert(" Un recorrido debe contener al menos " + MIN_TAMANIO_RECORRIDO + " paradas.")
            }
            else{
                recuperarDatosRecorrido();
                guardarRecorridoServ();
                alert("El recorrido se guardo correctamente!!");
            }
        }

        vm.borrarUltimo = function(){
            if(vm.cantFeaturesActual == 0){
                alert("No hay elementos para borrar");
                return;
            }
            console.log(" ANTES --> Cant de features de la capa: " + vm.cantFeaturesActual);
            // con esto se saca el ultimo punto del array auxiliar q se usa para los puntos
            COORD_RECORRIDO.pop();
            vm.cantParadas--;
            // volvemos a la direccion del ultimo punto
            vm.direccionParada = direcciones[vm.cantParadas];
            // si solo hay un marcador en la capa, lo borramos
            if(vm.cantFeaturesActual == 1){
                borrarFeature();
                return;
            }
            // sino, si hay mas de un marcador entonces tambien hay una ruta entre estos
            // por lo que se deben borrar el ultimo marcador y la ruta
            borrarFeature();
            borrarFeature();

            // Tambien se debe borrar la direccion y mantenerla actualizada
            // con la ultima que quedo --> Sol: agregar un array con las calles
            // de cada punto y su indice que seria el id (array[n°id] --> calle)

            console.log(" DESPUES --> Cant de features de la capa: " + vm.cantFeaturesActual);
        }

        vm.resetDatosRecorrido = function(){
            COORD_RECORRIDO = [];
            vm.cantParadas = "";
            vm.direccionParada = "";
            vectorSource.clear();
        }

        // ****************************************************************
        // ********** administracion de la apertura de los paneles ********

        $('#collapseCreate').on('shown.bs.collapse', function () {
            console.log("Se abrio el panel de creacion");
        });
        $('#collapseCreate').on('hide.bs.collapse', function () {
            console.log("Se oculto el panel de creacion");
        });

        $('#collapseRemove').on('shown.bs.collapse', function () {
            console.log("Se abrio el panel de eliminacion");
        });
        $('#collapseRemove').on('hide.bs.collapse', function () {
            console.log("Se oculto el panel de eliminacion");
        });

        // ****************************************************************

        // vm.unidadTranspChanged = function(){
        //     if (!vm.transporteSeleccionado){
        //         vm.transporteSeleccionado = true;
        //     }
        // }

        // #############################################################################
        // #############################################################################

        // ************************ Inicializacion de datos *****************************
        // al crear el controlador ejecutamos esta funcion
        cargaNombreUnidades();
        cargaRecorridos();
        // recuperarDatosRecorrido();
        // agregamos una capa de dibujo al mapa
        vm.map.addLayer(vectorLayer);

        // **************************************************************
        // ******************* pa probar funcionalidad ******************
        verLineString();

    } // fin Constructor

})()