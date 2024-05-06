<script>
 import {bracketData8, bracketData4, bracketData2, bracketData16} from '../stores/bracketsmockdata.js'

 let bracketData = bracketData16

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

</script>

<h1 class="text-center font-semibold">Bracket de torneo</h1>
<p class="text-center mb-10">Haz click sobre el equipo ganador</p>
<div class="w-screen pb-8">
    <div class="flex w-9/12 m-auto gap-20 justify-around">
        {#each bracketData as etapa, parentIndex}
            <div class="flex flex-col gap-4 justify-around">
                {#each etapa as equipo, index}
                    <div class=" flex items-center gap-4">
                        <div class:impar = {index %2 !=0 }
                        class="flex flex-col gap-2">
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
    .impar{
        margin: 0px 0px 24px 0px;
    }
</style>
