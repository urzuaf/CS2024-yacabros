<script>
    import { onMount } from "svelte";
    import {
        bracketData8,
        bracketData4,
        bracketData2,
        bracketData16,
    } from "../stores/bracketsmockdata.js";
    import { generarBracket } from "../utils/logicaBrackets.js";
    import { Torneo } from "../stores/torneo_store.js";
    import { Usuario } from "../stores/login_store.js";

    let cualquierName = ["prueba", "prueba"];
    let bracketData = [];
    let guardado = false;
    // Comprobamos si el torneo ya tiene un bracket, si lo tiene lo cargamos, si no lo tiene cargamos uno vacio
    //bracketData = bracketData8;
    let rol = "nocreador"; //
    onMount(async () => {
        await equiposEnTorneo();
        await comprobarBracket();
        await getRol();
    });

    const getRol = async () => {
        let email = $Usuario;
        const resp1 = await fetch("http://localhost:3000/getRol", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        const res = await resp1.json();
        if (res.length <= 0) {
            console.log("no tiene rol creador");
            rol = "nocreador";
            return;
        }
        if (res[0].rol != "creador") {
            rol = "nocreador";
            return;
        }
        rol = "creador";
    };

    const equiposEnTorneo = async () => {
        let id = 1;
        let ntorneo = $Torneo;
        const resp1 = await fetch("http://localhost:3000/getTorneo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ntorneo }),
        });
        const resp2 = await resp1.json();

        id = resp2[0].id;
        const resp = await fetch(
            "http://localhost:3000/equiposludopatasentorneo",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            },
        );
        if (!resp.ok)
            throw new Error("Error al obtener los datos del servidor");
        let rows = await resp.json();
        let arr = rows.map((equipo) => {
            return equipo.nombre;
        });
        cualquierName = [...arr];
        console.log("aqui", cualquierName);
    };

    const comprobarBracket = async () => {
        let ntorneo = $Torneo;
        const response = await fetch("http://localhost:3000/getTorneo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ntorneo }),
        });
        const res = await response.json();
        if (
            res[0].bracketplaceholder == "" ||
            res[0].bracketplaceholder == null
        ) {
            console.log("creando nuevo brack", cualquierName);
            bracketData = [...generarBracket(cualquierName)];
            /*  bracketData = [...bracketData8] */
        } else {
            console.log("usando un bracket antiguo");
            let aux = JSON.parse(res[0].bracketplaceholder);
            bracketData = [...aux];
        }
    };

    const handleClick = (indexParent, index) => {
        if (indexParent == bracketData.length) {
            return;
        }

        //obtenemos el indice a agregar en el siguiente
        let indice_a_agregar = 0;
        if (index % 2 == 0) {
            indice_a_agregar = index / 2;
        } else {
            indice_a_agregar = (index - 1) / 2;
        }

        // agregamos al siguiente bracket
        let newBracketData = bracketData;

        newBracketData[indexParent + 1][indice_a_agregar].name =
            bracketData[indexParent][index].name;
        newBracketData[indexParent + 1][indice_a_agregar].result = 0;
        bracketData = [...newBracketData];
    };
    const handleResult = (parentIndex, index, e) => {
        let newBracketData = bracketData;
        newBracketData[parentIndex][index].result = Number(e.target.value);
        bracketData = [...newBracketData];
        console.log(bracketData);
    };
    //De momento guardar solo lo imprime por pantalla, pero ese json habria que guardarlo en bd
    // Para poder cargarlo desde ahí despues
    const handleButon = async () => {
        let bracket = JSON.stringify(bracketData);
        //hardcodeado deberia ser dependiendo del torneo activo
        let torneo = $Torneo;
        const response = await fetch("http://localhost:3000/updateBracket", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ bracket, torneo }),
        });
        if (response.ok) {
            console.log("ok");
            guardado = true;
            setTimeout(() => {
                guardado = false;
            }, 4000);
        }
    };

    const handleReset = async () => {
        //hardcodeado deberia ser dependiendo del torneo activo
        let torneo = $Torneo;
        let bracket = "";
        const response = await fetch("http://localhost:3000/updateBracket", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ bracket, torneo }),
        });
        comprobarBracket();
    };
</script>

<header
    class="flex justify-center items-center my-6 py-4 border-y border-light-border dark:border-dark-border"
>
    <div>
        <h1 class="text-center font-semibold text-2xl">Bracket de Torneo</h1>
        {#if rol == "creador"}
            <p class="text-center">Haz click sobre el equipo ganador!</p>
        {/if}
    </div>
    {#if rol == "creador"}
        <div class="absolute right-10">
            <button
                class="px-4 py-2 font-medium text-dark-text transition-all duration-300 transform bg-sportify rounded-lg hover:bg-sportifyhover"
                on:click={handleButon}
            >
                Guardar Bracket
            </button>
            <button
                class="px-4 py-2 font-medium text-dark-text transition-all duration-300 transform rounded-lg bg-sportify hover:bg-sportifyhover"
                on:click={handleReset}
            >
                Reset Bracket
            </button>
            {#if guardado}
                <p>Bracket guardado</p>
            {/if}
        </div>
    {/if}
</header>

<div class="w-full py-8">
    <div class="flex w-9/12 m-auto gap-10 justify-around">
        {#each bracketData as etapa, parentIndex}
            <div class="flex flex-col gap-4 justify-around">
                {#each etapa as equipo, index}
                    <div
                        class:impar={index % 2 != 0}
                        class=" flex items-center gap-4 border border-light-border dark:border-dark-border rounded shadow-md bg-light-background dark:bg-dark-background"
                    >
                        <!-- Resultado del equipo -->
                        {#if rol == "creador"}
                            {#if equipo.name != "--------" && parentIndex != bracketData.length - 1}
                                <input
                                    placeholder="0"
                                    value={equipo.result}
                                    type="number"
                                    on:change={(e) =>
                                        handleResult(parentIndex, index, e)}
                                    class="bg-light-background dark:bg-dark-input font-bold text-xl text-center w-12"
                                />
                            {/if}
                        {:else if equipo.name != "--------" && parentIndex != bracketData.length - 1}
                            <p
                                class="bg-light-background dark:bg-dark-input font-bold text-xl text-center w-12"
                            >
                                {equipo.result}
                            </p>
                        {/if}
                        <!-- Nombre del equipo -->
                        <div class="flex flex-col gap-2">
                            {#if rol == "creador"}
                                <button
                                    class:winner={parentIndex ==
                                        bracketData.length - 1}
                                    title="seleccionar como ganador"
                                    on:click={() =>
                                        handleClick(parentIndex, index)}
                                    class=" bg-light-background dark:bg-dark-input border p-2 w-40"
                                >
                                    {equipo.name}
                                </button>
                            {:else}
                                <p
                                    class=" bg-light-background dark:bg-dark-input border p-2 w-40 text-center"
                                >
                                    {equipo.name}
                                </p>
                            {/if}
                        </div>

                        {#if equipo.name != "--------" && parentIndex != bracketData.length - 1}
                            <div class="w-6">
                                {#if parentIndex == bracketData.length - 1}
                                    <!-- <img src="." alt="." /> -->
                                    <p></p>
                                {:else if index % 2 != 0}
                                    <img
                                        width="14"
                                        height="14"
                                        src="/rightup.png"
                                        alt="flechaarriba"
                                    />
                                {:else if index % 2 == 0}
                                    <img
                                        width="14"
                                        height="14"
                                        src="/rightdown.png"
                                        alt="flechaabajo"
                                    />
                                {/if}
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</div>

<style>
    .impar {
        margin: 0px 0px 24px 0px;
    }
    .winner {
        color: #1a1a1a;
        background-color: #fafafa;
        font-weight: bold;
        --webkit-box-shadow: 0px 0px 51px -8px rgb(70, 222, 0);
        -moz-box-shadow: 0px 0px 51px -8px rgb(70, 222, 0);
        box-shadow: 0px 0px 51px -8px rgb(70, 222, 0);
        border: 3px solid #1dc458;
        position: relative;
    }
    @media (prefers-color-scheme: dark) {
        .winner {
            color: white;
            background-color: #374151;
        }
    }
</style>
