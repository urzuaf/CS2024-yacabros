
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

    function agregarCol(){ //esto añade una columna a la tabla //que pasa con las columnas ya creadas
        var row=document.getElementById("row");
        var col=document.getElementById("cabecera")
        //COL
        const th=document.createElement("th")
        th.style.border="1px solid"
        th.style.textAlign="center"
        th.style.background="sportify"
        th.innerHTML="Datos" // var que se debe pasar
        col.appendChild(th)


        //INFO
        const td = document.createElement("td");
        td.style.border = "1px solid black";
        td.style.textAlign="center"
        td.innerHTML="infoo" //var que se debe pasar
        row.appendChild(td);
    }


</script>


<div>
    <button 
        on:click={()=>{showModal=!showModal}} 
        type="button" aria-label="toggle bases modal"
        class="w-auto px-4 py-2 font-medium text-dark-text trans bg-sportify rounded-lg hover:bg-sportifyhover"
        >
        Añadir Clasificación
    </button>
</div>


{#if showModal}

<div class="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
    <div class="absolute w-full h-full bg-black opacity-15"></div>
    <div class="absolute justify-center items-center w-3/4 h-3/4 mt-12 bg-red-400 rounded-xl">
        <button class="absolute m-2 right-0 bg-sportify h-10 w-24 text-white rounded-lg hover:text-gray-200" on:click={()=>showModal=!showModal}>
            Cerrar
        </button>
        <div class="w-full h-full bg-blue-400 border-sportify border-2 bg-light-background dark:bg-dark-background rounded-xl  overflow-x-auto"> 
            <h1 class="font-semibold text-4xl align-center flex justify-center">Clasificatoria</h1>
            <table class="table-auto bg-gray-300 text-dark-text font-bold mx-auto mt-10 max-h-64 w-3/4 overflow-y-auto rounded-lg">
                <thead class="bg-sportify">
                    <tr id="cabecera">
                        <th class="px-4 py-2  border-solid border-2">Id</th>
                        <th class="px-4 py-2  border-solid border-2">Nombre Equipo</th>
                        <th class="px-4 py-2  border-solid border-2">Staff</th>
                        <th class="px-4 py-2  border-solid border-2">Torneo</th>
                    </tr>
                </thead>

                <tbody id=data class="border px-4 py-2 "> 
                    {#each rows as row} <!-- aqui va el contenido de la tabla habrá que añadir columnas para datos a agregar-->
                    <tr id="row" class="text-center text-black border-solid border-2">
                        <td class="border-solid border-2">{row.id}</td>
                        <td class="border-solid border-2">{row.nombre}</td>
                        <td class="border-solid border-2">{row.staff}</td>
                        <td class="border-solid border-2">{row.torneo}</td>
                    </tr>
                    {/each}
                </tbody>

                <button class="absolute ml-0 mt-4 bg-sportify h-10 w-32 text-white rounded-lg hover:text-gray-200" on:click={agregarCol}>
                    Agregar Datos
                </button>

            </table>

            
        
        </div>
    </div>
</div>
{/if}


