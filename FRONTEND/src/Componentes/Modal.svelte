

<script>
    
    import { Formulario } from "../Componentes/Formulario.astro";

    let bases = '';
    let isOpen = false;

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/gestiontorneo", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ bases })
            });
            if (!response.ok){
                throw new Error("Error al editar bases");
            }
            const data = await response.json();
            console.log("Bases editadas:", data);
        }
        catch (error) {
            console.error("Error: "+error);
        }
    }
</script>

<!-- 
    Añadir a página como:
    <FormBases client:load/> 
-->

<!-- Botón para mostrar el Modal -->
<button 
    on:click={()=>{isOpen=!isOpen}} 
    type="button" aria-label="toggle bases modal"
    class="w-auto px-4 py-2 font-medium text-white transition-all duration-300 transform bg-green-600 rounded-lg hover:scale-105"
>
    Crear Torneo
</button>

<!-- Modal -->
{#if isOpen}
    
        <div class="flex justify-center items-center w-full h-full">
            <div class="w-1/2 bg-stone-800 rounded-lg">
                <form on:submit|preventDefault={handleSubmit} class="flex flex-col items-center gap-4 my-4">
                    
                </form>
            </div>
        </div>
    
{/if} 

<style>
    .field-content {
        field-sizing: content;
    }
</style>

