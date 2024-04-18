<script>
    let bases = '';
    let id = 1;
    let isOpen = false;

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/torneo", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, bases })
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
    Modificar Bases
</button>

<!-- Modal -->
{#if isOpen}
    <div class="sticky top-0 bottom-0 w-full h-screen bg-black opacity-70"></div>
    <div class="sticky top-0 bottom-0 w-full h-screen">
        <div class="flex justify-center items-center w-full h-full">
            <div class="w-1/2 bg-stone-800 rounded-lg">
                <form on:submit|preventDefault={handleSubmit} class="flex flex-col items-center gap-4 my-4">
                    <h2 class="text-2xl font-semibold text-center text-white">Bases y Condiciones</h2>
                    <div class="w-full flex justify-center">
                        <textarea
                            placeholder="Ingrese aquí las Bases y Condiciones de su Torneo"
                            class="field-content w-4/5 min-h-52 max-h-96 px-4 py-2 text-black dark:text-white bg-white dark:bg-gray-800 border rounded-lg border-gray-400 dark:border-gray-600 focus:border-green-600 focus:ring-green-600 focus:outline-none focus:ring focus:ring-opacity-40"
                            bind:value={bases}
                        />
                    </div>
                    <button
                        class="w-4/5 px-4 py-2 font-medium text-white transition-all duration-300 transform bg-green-600 rounded-lg hover:scale-105"
                        type="submit"
                    >
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    </div>
{/if} 

<style>
    .field-content {
        field-sizing: content;
    }
</style>