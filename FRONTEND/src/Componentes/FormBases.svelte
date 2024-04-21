<script>
    let bases = '';
    let id = 1;

    let showModal;
    let dialog;
    $: if (dialog && showModal) dialog.showModal();

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
    on:click={()=>{showModal = true}} 
    type="button" aria-label="toggle bases modal"
    class="w-auto px-4 py-2 font-medium text-white trans bg-green-600 rounded-lg hover:scale-105"
>
    Modificar Bases
</button>

<!-- Modal -->
<dialog 
    bind:this={dialog}
    on:close={() => (showModal = false)}
    class="w-full h-full bg-transparent"
>
    <div class="flex justify-center items-center w-full h-full">
        <form on:submit|preventDefault={handleSubmit} class="flex flex-col items-center gap-4 my-4 w-3/4 md:w-3/5 bg-gray-200 dark:bg-stone-800 rounded-lg p-4">
            <div class="w-4/5 flex justify-center text-wrap">
                <h2 class="text-2xl font-bold text-center text-black dark:text-white">Bases y Condiciones</h2>
            </div>
            <div class="w-4/5 flex justify-center">
                <textarea
                    placeholder="Ingrese aquí las Bases y Condiciones de su Torneo"
                    class="field-content w-full min-h-52 max-h-96 px-4 py-2 text-black dark:text-white bg-white dark:bg-gray-800 border rounded-lg border-gray-400 dark:border-gray-600 focus:border-green-600 focus:ring-green-600 focus:outline-none focus:ring focus:ring-opacity-40"
                    bind:value={bases}
                />
            </div>
            <div class="w-4/5 flex justify-center md:justify-evenly flex-wrap gap-3">
                <button
                    on:click={() => dialog.close()}
                    type="submit" aria-label="save bases modal"
                    class="w-4/5 md:w-2/5 min-w-fit px-4 py-2 font-medium text-white trans bg-green-600 rounded-lg hover:scale-105"
                >
                    Guardar
                </button>
                <button 
                    on:click={() => dialog.close()}
                    type="button" aria-label="close bases modal"
                    class="w-4/5 md:w-2/5 min-w-fit px-4 py-2 font-medium text-white trans bg-green-600 rounded-lg hover:scale-105"
                >
                    Cancelar
                </button>
            </div>
        </form>
    </div>
</dialog>

<style>
    .field-content {
        field-sizing: content;
    }
    .trans {
        transition: 0.3s ease;
    }
</style>