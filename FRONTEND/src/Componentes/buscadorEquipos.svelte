<script>
    import { onMount } from 'svelte';

    let rows = [];
    let mostrar;

    onMount(async () =>{
        try{
            const resp = await fetch("http://localhost:3000/equipos");
            if (!resp.ok)
                throw new Error("Error al obtener los datos del servidor");

            rows = await resp.json();
            console.log(rows);
        }catch(error){
            console.log("Error: ",error);
        }
    });
    
    let campo="";
    let filtrado="";

    function search(){

        if(campo.length>0){mostrar=true;}
        else{mostrar=false;}

    }
    
   
    
</script>


<input id="searchbox" on:input={search} type="text" placeholder="Invitar un equipo al torneo" class="w-60 px-4 py-2 border-2 border rounded-lg text-black hover:border-green-500 p-4" bind:value={campo}>

<div class="absolute bg-green-600 my-10 inline-block">
{#if mostrar && campo.length!=0}
    <ul>
        {#each rows as row}
            <li class="w-full hover:bg-white hover:text-black border-2">
                <label>
                    <input class="form-checkbox h-0 w-0" type="checkbox" bind:checked={row.selected} on:click={() => {campo=row.nombre;mostrar=false}} >
                    {row.nombre}
                </label>
            </li>
        {/each}
    </ul>
{/if}

</div>