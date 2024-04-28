
<script>


    import { Usuario } from "../stores/login_store";
    let creador=$Usuario;
  let nombre= '';
  let deporte = '';
  let finicio = '';
  let ftermino = '';
  let premio = '';
  let formato = '';


  let showModal;
  let dialog;
  $: if (dialog && showModal) dialog.showModal();

  async function handleSubmit(event) {
      event.preventDefault();
      try {
          const response = await fetch("http://localhost:3000/crearTorneo", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ nombre, finicio, ftermino, formato, premio, deporte,creador })
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

<!-- Botón para mostrar el Modal -->
<button 
  on:click={()=>{showModal = true}} 
  type="button" aria-label="toggle bases modal"
  class="w-auto px-4 py-2 font-medium text-dark-text trans bg-sportify rounded-lg hover:scale-105"
>
  Crear Torneo
</button>

<!-- Modal -->
<dialog 
  bind:this={dialog}
  on:close={() => (showModal = false)}
  class="w-auto h-70 bg-light-background dark:bg-dark-background border-sportify rounded-lg ">
  <div class="flex justify-center items-center w-full h-full">
      <form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4 my-4 w-3/4 md:w-3/5  rounded-lg p-4">
          <div class="mb-3">
            <label for="nombre" class="block text-sm font-medium text-light-text dark:text-dark-text">Nombre del Torneo:</label>
            <input type="text" id="nombre" v-model="nombre" required
                class="block w-full px-4 py-4 mt-1 text-lg text-light-text dark:text-dark-text bg-light-input dark:bg-dark-input border border-sportify rounded-lg focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
                bind:value={nombre}
            />
               
            
                
            </div>
        <div class="mb-3">
            <label for="deporte" class="block text-sm font-medium text-light-text dark:text-dark-text">Deporte:</label>
            <input type="text" id="deporte" v-model="deporte" required
                class="block w-full px-4 py-4 mt-1 text-lg text-light-text dark:text-dark-text bg-light-input dark:bg-dark-input border border-sportify rounded-lg focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
                bind:value={deporte}
            />
        </div>
        <div class="mb-3">
            <label for="fechaInicio" class="block text-sm font-medium text-light-text dark:text-dark-text">Fecha de Inicio:</label>
            <input type="date" id="fechaInicio" v-model="fechaInicio" required
                class="block w-full px-4 py-4 mt-1 text-lg text-light-text dark:text-dark-text bg-light-input dark:bg-dark-input border border-sportify rounded-lg focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
                bind:value={finicio}
            />
        </div>
        <div class="mb-3">
            <label for="fechaFin" class="block text-sm font-medium text-light-text dark:text-dark-text">Fecha de Término:</label>
            <input type="date" id="fechaFin" v-model="fechaFin" required
                class="block w-full px-4 py-4 mt-1 text-lg text-light-text dark:text-dark-text bg-light-input dark:bg-dark-input border border-sportify rounded-lg focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
                bind:value={ftermino}
            />
        </div>
        <div class="mb-3">
            <label for="formato" class="block text-sm font-medium text-light-text dark:text-dark-text">Formato del Torneo:</label>
            <select id="formato" v-model="formato"
                class="block w-full px-4 py-4 mt-1 text-lg text-light-text dark:text-dark-text bg-light-input dark:bg-dark-input border border-sportify rounded-lg focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
                bind:value={formato}>
                <option value="bracket">Bracket</option>
                <option value="tabla">Tabla</option>
                
            </select>
                
            
                
                
            
                
            
        </div>
        
        
        <div class="mb-3">
            <label for="pricePool" class="block text-sm font-medium text-light-text dark:text-dark-text">Premio:</label>
            <input type="text" id="pricePool" v-model="pricePool"
                class="block w-full px-4 py-4 mt-1 text-lg text-light-text dark:text-dark-text bg-light-input dark:bg-dark-input border border-sportify rounded-lg focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
                bind:value={premio}
            />
        </div>
        <div class="w-6/5 flex justify-center md:justify-evenly flex-wrap gap-3">
            <button
                on:click={() => dialog.close()}
                type="submit" aria-label="save bases modal"
                class="w-4/5 md:w-2/5 min-w-fit px-4 py-2 font-medium text-dark-text trans bg-sportify rounded-lg hover:scale-105"
            >
                Guardar
            </button>
            <button 
                on:click={() => dialog.close()}
                type="button" aria-label="close bases modal"
                class="w-4/5 md:w-2/5 min-w-fit px-4 py-2 font-medium text-dark-text trans bg-sportify rounded-lg hover:scale-105"
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

