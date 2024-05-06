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

<h1 class="text-center font-semibold">Bracket de torneo</h1>
<p class="text-center">Haz click sobre el equipo ganador</p>
<div class="flex justify-end p-4">
    <button
        class="text-white w-fit text-center border bg-sportify p-2 rounded hover:bg-sportifyhover"
        on:click={handleButon}
    >
        Guardar bracket
    </button>
</div>

<div class="w-screen pb-8">
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
                                class="font-bold text-xl w-12"
                            />
                        {/if}
                        <!-- Nombre del equipo -->
                        <div class="flex flex-col gap-2">
                            <button
                                class:winner={parentIndex ==
                                    bracketData.length - 1}
                                title="seleccionar como ganador"
                                on:click={() => handleClick(parentIndex, index)}
                                class="border p-2 shadow-md rounded"
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
        color: white;
        background-color: #0c0a09;
        font-weight: bold;
        --webkit-box-shadow: 0px 0px 51px -8px rgb(70, 222, 0);
        -moz-box-shadow: 0px 0px 51px -8px rgb(70, 222, 0);
        box-shadow: 0px 0px 51px -8px rgb(70, 222, 0);
        border: 3px solid #1dc458;
        position: relative;
    }
</style>
