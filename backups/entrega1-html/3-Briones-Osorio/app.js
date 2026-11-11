/* =====================================================
    BANDEJA DEL ORIENTADOR
    APP.JS
===================================================== */

/* =====================================================
    CONFIGURACIÓN
===================================================== */

const STORAGE_KEY = "orientador_dashboard";

/* =====================================================
    VARIABLES GLOBALES
===================================================== */

let paginaActual = 1;
let registrosPorPagina = 10;

let solicitudes = [];
let datosFiltrados = [];

let solicitudSeleccionada = null;

/* =====================================================
    ELEMENTOS DEL DOM
===================================================== */

const buscador =
    document.getElementById("searchInput");

const filtroTipo =
    document.getElementById("filterType");

const filtroEstado =
    document.getElementById("filterEstado");

const filtroUrgencia =
    document.getElementById("sortUrgencia");

const selectorRegistros =
    document.getElementById("recordsPerPage");

const tablaBody =
    document.querySelector(
        "#solicitudesTable tbody"
    );

const pageInfo =
    document.getElementById("pageInfo");

const paginationPages =
    document.getElementById("paginationPages");

const recordsInfo =
    document.getElementById("recordsInfo");

/* =====================================================
    DATOS DEMO
===================================================== */

solicitudes = [

    {
        id:"SOL-001",
        estudiante:"Juan Pérez",
        tipo:"emocional",
        estado:"pendiente",
        urgencia:"alta"
    },

    {
        id:"SOL-002",
        estudiante:"María López",
        tipo:"academico",
        estado:"asignada",
        urgencia:"media"
    },

    {
        id:"SOL-003",
        estudiante:"Carlos Gómez",
        tipo:"social",
        estado:"resuelta",
        urgencia:"baja"
    },

    {
        id:"SOL-004",
        estudiante:"Ana Díaz",
        tipo:"económico",
        estado:"pendiente",
        urgencia:"alta"
    },

    {
        id:"SOL-005",
        estudiante:"Pedro Silva",
        tipo:"social",
        estado:"asignada",
        urgencia:"media"
    }

];

/* =====================================================
    LOCAL STORAGE
===================================================== */

function guardarEstado(){

    const estado = {

        paginaActual,
        registrosPorPagina,

        busqueda:
            buscador.value,

        tipo:
            filtroTipo.value,

        estadoFiltro:
            filtroEstado.value,

        urgencia:
            filtroUrgencia.value

    };

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(estado)
    );
}

function restaurarEstado(){

    const estado = JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    );

    if(!estado) return;

    paginaActual =
        estado.paginaActual || 1;

    registrosPorPagina =
        estado.registrosPorPagina || 10;

    buscador.value =
        estado.busqueda || "";

    filtroTipo.value =
        estado.tipo || "";

    filtroEstado.value =
        estado.estadoFiltro || "";

    filtroUrgencia.value =
        estado.urgencia || "";

    selectorRegistros.value =
        registrosPorPagina;
}

/* =====================================================
    FILTROS
===================================================== */

function aplicarFiltros(){

    const texto =
        buscador.value
        .toLowerCase()
        .trim();

    const tipo =
        filtroTipo.value;

    const estado =
        filtroEstado.value;

    datosFiltrados = solicitudes.filter(item => {

        const coincideTexto =
            item.estudiante
            .toLowerCase()
            .includes(texto);

        const coincideTipo =
            tipo === "" ||
            item.tipo === tipo;

        const coincideEstado =
            estado === "" ||
            item.estado === estado;

        return (
            coincideTexto &&
            coincideTipo &&
            coincideEstado
        );

    });

    ordenarPorUrgencia();

    paginaActual = 1;

    renderizarTabla();

    guardarEstado();
}

/* =====================================================
    ORDENAMIENTO
===================================================== */

function ordenarPorUrgencia(){

    const orden =
        filtroUrgencia.value;

    if(!orden) return;

    const prioridad = {

        alta : 3,
        media : 2,
        baja : 1

    };

    datosFiltrados.sort((a,b)=>{

        if(orden === "desc"){

            return prioridad[b.urgencia]
                - prioridad[a.urgencia];

        }

        return prioridad[a.urgencia]
            - prioridad[b.urgencia];

    });
}

/* =====================================================
    PAGINACIÓN
===================================================== */

function obtenerTotalPaginas(){

    return Math.ceil(
        datosFiltrados.length /
        registrosPorPagina
    ) || 1;
}

function obtenerDatosPagina(){

    const inicio =
        (paginaActual - 1)
        * registrosPorPagina;

    const fin =
        inicio + registrosPorPagina;

    return datosFiltrados.slice(
        inicio,
        fin
    );
}

function siguientePagina(){

    if(
        paginaActual <
        obtenerTotalPaginas()
    ){

        paginaActual++;

        renderizarTabla();

        guardarEstado();
    }
}

function paginaAnterior(){

    if(paginaActual > 1){

        paginaActual--;

        renderizarTabla();

        guardarEstado();
    }
}

function primeraPagina(){

    paginaActual = 1;

    renderizarTabla();

    guardarEstado();
}

function ultimaPagina(){

    paginaActual =
        obtenerTotalPaginas();

    renderizarTabla();

    guardarEstado();
}

/* =====================================================
    PAGINACIÓN VISUAL
===================================================== */

function crearNumerosPagina(){

    paginationPages.innerHTML = "";

    const total =
        obtenerTotalPaginas();

    for(let i=1;i<=total;i++){

        const boton =
            document.createElement("button");

        boton.textContent = i;

        boton.classList.add(
            "page-btn"
        );

        if(i === paginaActual){

            boton.classList.add(
                "active"
            );
        }

        boton.addEventListener(
            "click",
            ()=>{

                paginaActual = i;

                renderizarTabla();

                guardarEstado();
            }
        );

        paginationPages.appendChild(
            boton
        );
    }
}

function actualizarResumen(){

    const inicio =
        ((paginaActual - 1)
        * registrosPorPagina)
        + 1;

    const fin = Math.min(

        paginaActual *
        registrosPorPagina,

        datosFiltrados.length
    );

    recordsInfo.textContent =

        `Mostrando ${inicio}
         - ${fin}
         de ${datosFiltrados.length}
         registros`;

    pageInfo.textContent =

        `Página ${paginaActual}
         de ${obtenerTotalPaginas()}`;
}

/* =====================================================
    RENDER TABLA
===================================================== */

function renderizarTabla(){

    tablaBody.innerHTML = "";

    const registros =
        obtenerDatosPagina();

    registros.forEach(item => {

        tablaBody.innerHTML += `

        <tr>

            <td>${item.id}</td>

            <td>${item.estudiante}</td>

            <td>${item.tipo}</td>

            <td>

                <span
                class="estado ${item.estado}">

                ${item.estado}

                </span>

            </td>

            <td>

                <span
                class="badge ${item.urgencia}">

                ${item.urgencia}

                </span>

            </td>

            <td>

                <button
                class="btn-action btn-asignar"
                onclick="abrirModal('${item.id}')">

                Asignar

                </button>

            </td>

        </tr>

        `;

    });

    crearNumerosPagina();

    actualizarResumen();

    actualizarKPIs();
}

/* =====================================================
    KPI
===================================================== */

function actualizarKPIs(){

    document.getElementById(
        "kpiTotal"
    ).textContent =
        solicitudes.length;

    document.getElementById(
        "kpiUrgentes"
    ).textContent =
        solicitudes.filter(
            x => x.urgencia === "alta"
        ).length;

    document.getElementById(
        "kpiAsignadas"
    ).textContent =
        solicitudes.filter(
            x => x.estado === "asignada"
        ).length;

    document.getElementById(
        "kpiPendientes"
    ).textContent =
        solicitudes.filter(
            x => x.estado === "pendiente"
        ).length;
}

/* =====================================================
    MODAL ASIGNACIÓN
===================================================== */

function abrirModal(id){

    solicitudSeleccionada = id;

    console.log(
        "Asignar solicitud:",
        id
    );
}

function cerrarModal(){

    solicitudSeleccionada = null;
}

function asignarProfesional(){

    console.log(
        "Profesional asignado"
    );
}

/* =====================================================
    LIMPIAR FILTROS
===================================================== */

function limpiarFiltros(){

    buscador.value = "";

    filtroTipo.value = "";

    filtroEstado.value = "";

    filtroUrgencia.value = "";

    paginaActual = 1;

    registrosPorPagina = 10;

    selectorRegistros.value = 10;

    localStorage.removeItem(
        STORAGE_KEY
    );

    aplicarFiltros();
}

/* =====================================================
    EVENTOS
===================================================== */

buscador.addEventListener(
    "input",
    aplicarFiltros
);

filtroTipo.addEventListener(
    "change",
    aplicarFiltros
);

filtroEstado.addEventListener(
    "change",
    aplicarFiltros
);

filtroUrgencia.addEventListener(
    "change",
    aplicarFiltros
);

selectorRegistros.addEventListener(
    "change",
    function(){

        registrosPorPagina =
            parseInt(this.value);

        paginaActual = 1;

        renderizarTabla();

        guardarEstado();
    }
);

document
.getElementById("prevPage")
.addEventListener(
    "click",
    paginaAnterior
);

document
.getElementById("nextPage")
.addEventListener(
    "click",
    siguientePagina
);

document
.getElementById("firstPage")
.addEventListener(
    "click",
    primeraPagina
);

document
.getElementById("lastPage")
.addEventListener(
    "click",
    ultimaPagina
);

document
.getElementById("btnLimpiar")
.addEventListener(
    "click",
    limpiarFiltros
);

/* =====================================================
    INICIALIZACIÓN
===================================================== */

function init(){

    restaurarEstado();

    datosFiltrados = [
        ...solicitudes
    ];

    aplicarFiltros();
}

document.addEventListener(
    "DOMContentLoaded",
    init
);