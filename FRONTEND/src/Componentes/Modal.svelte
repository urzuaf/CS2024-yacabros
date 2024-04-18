<script>
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
    <div class="sticky top-0 bottom-0 w-full h-screen bg-black opacity-70"></div>
    <div class="sticky top-0 bottom-0 w-full h-screen">
        <div class="flex justify-center items-center w-full h-full">
            <div class="w-1/2 bg-stone-800 rounded-lg">
                <div class="flex flex-col justify-between items-center w-auto h-auto my-auto py-8 px-16 bg-gray-100 dark:bg-stone-950 border rounded-lg border-gray-300 dark:border-black">
                    <div class="w-full max-w-sm p-6 m-auto mx-auto bg-gray-200 rounded-lg shadow-md dark:bg-black">
                        <div class="flex justify-center mx-auto">
                            <div class="flex justify-center mt-6">
                                 <h1 class="font-bold text-4xl bg-green-600 block w-full px-4 py-2 mt-2  rounded-lg ">Creación Torneo</h1>
                            </div>
                        </div>
                    </div>
                
                    <form  class="mt-z pb-6">
                        <div class="mb-1">
                            <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre del Torneo:</label>
                            <input type="text" id="nombre" v-model="nombre" required
                                class="block w-full px-4 py-2 mt-4 text-gray-700 bg-white border border-green-500 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"     >
                        </div>
                        <div class="mb-1">
                            <label for="deporte" class="block text-sm font-medium text-gray-700">Deporte:</label>
                            <input type="text" id="deporte" v-model="deporte" required
                                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-green-500 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"     >
                        </div>
                        <div class="mb-1">
                            <label for="fechaInicio" class="block text-sm font-medium text-gray-700">Fecha de Inicio:</label>
                            <input type="date" id="fechaInicio" v-model="fechaInicio" required
                                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-green-500 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"     >
                        </div>
                        <div class="mb-1">
                            <label for="fechaFin" class="block text-sm font-medium text-gray-700">Fecha de Término:</label>
                            <input type="date" id="fechaFin" v-model="fechaFin" required
                                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-green-500 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"     >
                        </div>
                        <div class="mb-1">
                            <label for="formato" class="block text-sm font-medium text-gray-700">Formato del Torneo:</label>
                            <select id="formato" v-model="formato"
                                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-green-500 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"     >
                                <option value="bracket">Bracket</option>
                                <option value="tabla">Tabla</option>
                            </select>
                        </div>
                        <div class="mb-1">
                            <label for="equipos" class="block text-sm font-medium text-gray-700">Cantidad de Equipos:</label>
                            <input type="number" id="equipos" v-model="equipos" required
                                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-green-500 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"     >
                        </div>
                        <div class="mb-1">
                            <label for="etiquetas" class="block text-sm font-medium text-gray-700">Etiquetas:</label>
                            <input type="text" id="etiquetas" v-model="etiquetas"
                                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-green-500 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"     >
                        </div>
                        <div class="mb-1">
                            <label for="pricePool" class="block text-sm font-medium text-gray-700">Price Pool:</label>
                            <input type="text" id="pricePool" v-model="pricePool"
                                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-green-500 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"     >
                        </div>
                        <div class="mt-2">
                            <button class="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-all duration-300 transform bg-green-600 rounded-lg hover:scale-105 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                Crear Torneo
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
{/if} 

<style>
    .field-content {
        field-sizing: content;
    }
</style>