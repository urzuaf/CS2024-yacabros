<script>
    import {
        bracketData8,
        bracketData4,
        bracketData2,
        bracketData16,
    } from "../stores/bracketsmockdata.js";

    let bracketData = bracketData8;

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
    const handleButon = () => {
        let data = JSON.stringify(bracketData);
        console.log(data);
    };
</script>

<header class="flex justify-center items-center my-6 py-4 border-y border-light-border dark:border-dark-border">
    <div>
        <h1 class="text-center font-semibold text-2xl">Bracket de Torneo</h1>
        <p class="text-center">Haz click sobre el equipo ganador!</p>
    </div>
    <div class="absolute right-10">
        <button
            class="px-4 py-2 font-medium text-dark-text transition-all duration-300 transform bg-sportify rounded-lg hover:bg-sportifyhover"
            on:click={handleButon}
        >
            Guardar Bracket
        </button>
    </div>
</header>

<div class="w-full py-8">
    <div class="flex w-9/12 m-auto gap-20 justify-around">
        {#each bracketData as etapa, parentIndex}
            <div class="flex flex-col gap-4 justify-around">
                {#each etapa as equipo, index}
                    <div
                        class:impar={index % 2 != 0}
                        class=" flex items-center gap-4"
                    >
                        <!-- Resultado del equipo -->
                        {#if equipo.name != "--------" && parentIndex != bracketData.length - 1}
                            <input
                                placeholder="0"
                                type="number"
                                on:change={(e) =>
                                    handleResult(parentIndex, index, e)}
                                class="bg-light-background dark:bg-dark-input font-bold text-xl w-12 text-center border border-gray-300 dark:border-dark-border rounded"
                            />
                        {/if}
                        <!-- Nombre del equipo -->
                        <div class="flex flex-col gap-2">
                            <button
                                class:winner={parentIndex ==
                                    bracketData.length - 1}
                                title="seleccionar como ganador"
                                on:click={() => handleClick(parentIndex, index)}
                                class=" bg-light-background dark:bg-dark-input border border-gray-300 dark:border-dark-border p-2 shadow-md rounded"
                            >
                                {equipo.name}
                            </button>
                        </div>
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
        color: #1A1A1A;
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
