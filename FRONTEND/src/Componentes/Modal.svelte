<script>
    import { onMount } from "svelte";
    import { Usuario } from "../stores/login_store";
    import rol from "../utils/roles"
    let creador = $Usuario;
    let nombre = "";
    let deporte = "";
    let finicio = "";
    let ftermino = "";
    let premio = "";
    let formato = "";

    let showModal;
    let dialog;
    $: if (dialog && showModal) dialog.showModal();

    let mostrar = false;
    let mensaje = ''

    onMount(async() => {
        await tieneTorneo();
        await getRol();
    });

    const getRol = async () => {
        let email = $Usuario;
        let rolusuario =await rol(email)
        if(rolusuario == "persona"){
            mostrar=false
            mensaje = "No estas logeado"
        }
        if(rolusuario != "creador"){
            mostrar=false
            mensaje = "No eres creador"
        }
        // const resp2 = await fetch("http://localhost:3000/getRol", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ email }),
        // });
        // const resp3 = await resp2.json();
        // console.log('rol = ', resp3[0].rol)
        // if(resp3.length <= 0){
        //     mostrar = false
        //     mensaje = "No estas loggeado o no eres creador"
        //     console.log("entra en no rol")
        //     return
        // }
        // if(resp3[0].rol != "creador"){
        //     mostrar = false
        //     mensaje = "No eres creador"
        //     console.log("entra en no creador")
        //     return
        // }
    
    };

    const tieneTorneo = async () => {
        let email = $Usuario;

        const resp2 = await fetch("http://localhost:3000/tieneTorneo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        const res = await resp2.json();
        console.log(res)
        if (res.length <= 0) {
            mostrar = true;
            console.log('si mostrar', res.length)
        } else {
            mostrar = false;
            console.log('no mostrar', res.length)
        }
    };
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/crearTorneo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre,
                    finicio,
                    ftermino,
                    formato,
                    premio,
                    deporte,
                    creador,
                }),
            });
            if (!response.ok) {
                throw new Error("Error al agregar torneo");
            }
            const data = await response.json();
            console.log("Torneo agregado:", data);
        } catch (error) {
            console.error("Error: " + error);
        }
    }
</script>

<!-- Botón para mostrar el Modal -->
{#if mostrar}
    <button
        on:click={() => {
            showModal = true;
        }}
        type="button"
        aria-label="toggle bases modal"
        class="w-auto px-4 py-2 font-medium text-dark-text trans bg-sportify rounded-lg hover:bg-sportifyhover"
    >
        Crear Torneo
    </button>
{:else}
    <p>{mensaje}</p>
{/if}

<!-- Modal -->
<dialog
    bind:this={dialog}
    on:close={() => (showModal = false)}
    class="w-full h-70 bg-transparent"
>
    <div class="flex justify-center items-center w-full h-full">
        <form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4 my-4 w-4/5 rounded-lg py-4 px-40 bg-light-background dark:bg-dark-background border rounded-lg border-light-border dark:border-dark-border">
            <div class="flex justify-center text-wrap">
                <h2 class="text-2xl font-bold text-center text-light-text dark:text-dark-text">Crear Torneo</h2>
            </div>

            <div class="mb-3">
                <label
                    for="nombre"
                    class="block text-sm font-medium text-light-text dark:text-dark-text"
                    >Nombre del Torneo:</label
                >
                <input
                    type="text"
                    id="nombre"
                    v-model="nombre"
                    required
                    class="block w-full px-4 py-4 mt-1 text-lg text-light-text dark:text-dark-text bg-light-input dark:bg-dark-input border border-sportify rounded-lg focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
                    bind:value={nombre}
                />
            </div>
            <div class="mb-3">
                <label
                    for="deporte"
                    class="block text-sm font-medium text-light-text dark:text-dark-text"
                    >Deporte:</label
                >
                <input
                    type="text"
                    id="deporte"
                    v-model="deporte"
                    required
                    class="block w-full px-4 py-4 mt-1 text-lg text-light-text dark:text-dark-text bg-light-input dark:bg-dark-input border border-sportify rounded-lg focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
                    bind:value={deporte}
                />
            </div>
            <div class="mb-3">
                <label
                    for="fechaInicio"
                    class="block text-sm font-medium text-light-text dark:text-dark-text"
                    >Fecha de Inicio:</label
                >
                <input
                    type="date"
                    id="fechaInicio"
                    v-model="fechaInicio"
                    required
                    class="block w-full px-4 py-4 mt-1 text-lg text-light-text dark:text-dark-text bg-light-input dark:bg-dark-input border border-sportify rounded-lg focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
                    bind:value={finicio}
                />
            </div>
            <div class="mb-3">
                <label
                    for="fechaFin"
                    class="block text-sm font-medium text-light-text dark:text-dark-text"
                    >Fecha de Término:</label
                >
                <input
                    type="date"
                    id="fechaFin"
                    v-model="fechaFin"
                    required
                    class="block w-full px-4 py-4 mt-1 text-lg text-light-text dark:text-dark-text bg-light-input dark:bg-dark-input border border-sportify rounded-lg focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
                    bind:value={ftermino}
                />
            </div>
            <div class="mb-3">
                <label
                    for="formato"
                    class="block text-sm font-medium text-light-text dark:text-dark-text"
                    >Formato del Torneo:</label
                >
                <select
                    id="formato"
                    v-model="formato"
                    class="block w-full px-4 py-4 mt-1 text-lg text-light-text dark:text-dark-text bg-light-input dark:bg-dark-input border border-sportify rounded-lg focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
                    bind:value={formato}
                >
                    <option value="bracket">Bracket</option>
                    <option value="tabla">Tabla</option>
                </select>
            </div>
            <div class="mb-3">
                <label
                    for="pricePool"
                    class="block text-sm font-medium text-light-text dark:text-dark-text"
                    >Premio:</label
                >
                <input
                    type="text"
                    id="pricePool"
                    v-model="pricePool"
                    class="block w-full px-4 py-4 mt-1 text-lg text-light-text dark:text-dark-text bg-light-input dark:bg-dark-input border border-sportify rounded-lg focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
                    bind:value={premio}
                />
            </div>
            <div
                class="w-6/5 flex justify-center md:justify-evenly flex-wrap gap-3"
            >
                <button
                    on:click={() => dialog.close()}
                    type="submit"
                    aria-label="save bases modal"
                    class="w-4/5 md:w-2/5 min-w-fit px-4 py-2 font-medium text-dark-text trans bg-sportify rounded-lg hover:bg-sportifyhover"
                >
                    Guardar
                </button>
                <button
                    on:click={() => dialog.close()}
                    type="button"
                    aria-label="close bases modal"
                    class="w-4/5 md:w-2/5 min-w-fit px-4 py-2 font-medium text-dark-text trans bg-sportify rounded-lg hover:bg-sportifyhover"
                >
                    Cancelar
                </button>
            </div>
        </form>
    </div>
</dialog>

<style>
    .field-content {
        field-sizing: content;
    }
    .trans {
        transition: 0.3s ease;
    }
</style>
