
<script>
    import { onMount } from 'svelte';

    var showModal=false;
    let rows = [];

    onMount(async () =>{
        try{
            const resp = await fetch("http://localhost:3000/equiposludopatasentorneo");
            if (!resp.ok)
                throw new Error("Error al obtener los datos del servidor");
            rows = await resp.json();
            console.log("\n\nJOIN\n");
            console.log(rows);

        }catch(error){
            console.log("Error: ",error);
        }
    });//esto entrega en row el join de equipo y torneos para los datos 




</script>


<div>
<button 
    on:click={()=>{showModal=!showModal}} 
    type="button" aria-label="toggle bases modal"
    class="w-auto px-4 py-2 font-medium text-dark-text trans bg-sportify rounded-lg hover:scale-105"
    >
    Añadir Clasificación
</button>
</div>


{#if showModal}
<div class="absolute justify-center items-center w-3/4 h-3/4 mt-12 bg-red-400">
    <div class="flex justify-center items-center w-full h-full  bg-blue-400"> 
      <!--<form  form class="flex flex-col items-center gap-4 my-4 w-full md:w-full bg-light-background dark:bg-dark-background rounded-lg p-4">-->
            
            <table class="table-auto bg-sportify text-dark-text font-bold mx-auto">
                <thead>
                    <tr>
                        <th class="px-4 py-2">Id</th>
                        <th class="px-4 py-2">Nombre Equipo</th>
                        <th class="px-4 py-2">Staff</th>

                    </tr>
                </thead>

                <tbody id=data class="border px-4 py-2"> 
                
                {#each rows as row} <!-- aqui va el contenido de la tabla habrá que añadir columnas para datos a agregar-->
                    <tr>
                        <td>{row.id}</td>
                        <td>{row.nombre}</td>
                        <td>{row.staff}</td>
                    </tr>
                {/each}
                
                </tbody>
            
            </table>
       
        <!--</form>-->
    </div>
</div>
{/if}

