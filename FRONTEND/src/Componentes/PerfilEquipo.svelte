<script>   
    import { onMount } from "svelte";
    import { Usuario } from "../stores/login_store";
    
    let staff=$Usuario;
    let equipos=[];
    onMount(async () => {
        try {
            const response = await fetch("http://localhost:3000/equipos", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ staff })
            });
            if (!response.ok){
                throw new Error("Error al obtener equipo");
            }
            const data = await response.json();
            equipos = [...data];
            console.log("Equipo obtenido:", data);
        }
        catch (error) {
            console.error("Error: "+error);
        }
    });
    
</script>


{#if equipos.length > 0}
    {#each equipos as equipo}
       
    <div class="flex flex-col items-center p-6 w-full mb-12">
        <div class="flex items-center w-4/5 mb-6 justify-center">
            <!-- Foto de perfil del equipo a la izquierda -->
            <img src="../40770.svg" alt="foto" class="w-20 h-20 p-1 rounded-full border-4 border-light-border dark:border-white shadow-md mr-12 justify-center">
            <!-- Nombre del Equipo centrado con marco -->
            <h2 class="text-3xl font-bold text-center border-b-2 border-light-border dark:border-white text-light-text dark:text-white pb-2 mb-1 flex-grow">{equipo.nombre}</h2>
            <!-- Deporte a la derecha -->
            <p class="text-lg text-rigth flex-shrink-0 ml-12 text-light-text dark:text-white">{equipo.deporte}</p>
        </div>
        <!-- Descripción del torneo -->
        <p class="text-lg text-center mb-6 text-light-text dark:text-white">{equipo.descripcion}</p>
        <!-- Nombre del Staff en un rectángulo con foto pequeña a la izquierda -->
        <div class="flex items-center justify-end mb-8 w-full">
            <div class="flex-shrink-0 ml-4">
                <img src="../2098873.svg" alt="staff"class="w-20 h-20 p-1 rounded-full border-4 border-light-border dark:border-white mr-4 shadow-md">
            </div>
            <div class="text-light-text bg-white p-2 rounded-lg">
                <p class="text-lg font-semibold">{equipo.staff}</p>
                <p class="text-base">Staff</p>
            </div>
        </div>
    </div>
    {/each}
{/if}


