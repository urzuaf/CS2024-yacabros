<script>
  let bases = '';
  let id = 1;

  let showModal;
  let dialog;
  $: if (dialog && showModal) dialog.showModal();

  async function handleSubmit(event) {
      event.preventDefault();
      try {
          const response = await fetch("http://localhost:3000/Creartorneo", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ id, bases })
          });
          if (!response.ok){
              throw new Error("Error al agregar torneo");
          }
          const data = await response.json();
          console.log("Torneo agregado:", data);
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
  class="w-auto h-70  bg-gray-100 border-green-500 rounded-lg ">
  <div class="flex justify-center items-center w-full h-full">
      <form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4 my-4 w-3/4 md:w-3/5  rounded-lg p-4">
          <div class="mb-3">
            <label for="nombre" class="block text-sm font-medium text-zinc-400">Nombre del Torneo:</label>
            <input type="text" id="nombre" v-model="nombre" required
                class="block w-full px-4 py-4 mt-1 text-lg text-gray-700 bg-white border border-green-500 rounded-lg focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
        </div>
        <div class="mb-3">
            <label for="deporte" class="block text-sm font-medium text-gray-700">Deporte:</label>
            <input type="text" id="deporte" v-model="deporte" required
                class="block w-full px-4 py-4 mt-1 text-sm text-gray-700 bg-white border border-green-500 rounded-lg focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
        </div>
        <div class="mb-3">
            <label for="fechaInicio" class="block text-sm font-medium text-gray-700">Fecha de Inicio:</label>
            <input type="date" id="fechaInicio" v-model="fechaInicio" required
                class="block w-full px-4 py-4 mt-1 text-sm text-gray-700 bg-white border border-green-500 rounded-lg focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
        </div>
        <div class="mb-3">
            <label for="fechaFin" class="block text-sm font-medium text-gray-700">Fecha de Término:</label>
            <input type="date" id="fechaFin" v-model="fechaFin" required
                class="block w-full px-4 py-4 mt-1 text-sm text-gray-700 bg-white border border-green-500 rounded-lg focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
        </div>
        <div class="mb-3">
            <label for="formato" class="block text-sm font-medium text-gray-700">Formato del Torneo:</label>
            <select id="formato" v-model="formato"
                class="block w-full px-4 py-4 mt-1 text-sm text-gray-700 bg-white border border-green-500 rounded-lg focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
                <option value="bracket">Bracket</option>
                <option value="tabla">Tabla</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="equipos" class="block text-sm font-medium text-gray-700">Cantidad de Equipos:</label>
            <input type="number" id="equipos" v-model="equipos" required
                class="block w-full px-4 py-4 mt-1 text-sm text-gray-700 bg-white border border-green-500 rounded-lg focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
        </div>
        <div class="mb-3">
            <label for="etiquetas" class="block text-sm font-medium text-gray-700">Etiquetas:</label>
            <input type="text" id="etiquetas" v-model="etiquetas"
                class="block w-full px-4 py-4 mt-1 text-sm text-gray-700 bg-white border border-green-500 rounded-lg focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
        </div>
        <div class="mb-3">
            <label for="pricePool" class="block text-sm font-medium text-gray-700">Price Pool:</label>
            <input type="text" id="pricePool" v-model="pricePool"
                class="block w-full px-4 py-4 mt-1 text-sm text-gray-700 bg-white border border-green-500 rounded-lg focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
        </div>
        <div class="mt-2">
            <button class="w-auto px-8 py-4 text-sm font-medium tracking-wide text-white capitalize transition-all duration-300 transform bg-green-600 rounded-lg hover:scale-105 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                Crear Torneo
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