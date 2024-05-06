<script>
 import {bracketData8, bracketData4, bracketData2} from '../stores/bracketsmockdata.js'

 let bracketData = bracketData2

    console.log(bracketData)
</script>

<h1 class="text-center font-semibold p-4 mb-10">Bracket de torneos</h1>
<div class="w-screen pb-8">
    <div class="flex w-9/12 m-auto gap-20 justify-around">
        {#each bracketData as etapa, parentIndex}
            <div class="flex flex-col gap-8 justify-around">
                {#each etapa as equipo, index}
                    <div class=" flex items-center gap-4">
                        <div class="flex flex-col gap-2">
                            <div
                            >
                                {equipo.name}
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</div>
