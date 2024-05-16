<script>
    import { onMount } from "svelte";
  import { Usuario } from "../stores/login_store";
  import { Torneo } from "../stores/torneo_store";
  let creador = $Usuario;

  let id = 1
  let nombre = "";
  let deporte = "";
  let finicio = "";
  let ftermino = "";
  let premio = "";
  let formato = "";

  let showModal;
  let dialog;
  $: if (dialog && showModal) dialog.showModal();


  onMount(async()=>{
    await init()
  })

  async function init() {
    let ntorneo = $Torneo;
    const resp1 = await fetch("http://localhost:3000/getTorneo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ntorneo }),
    });
    const res = await resp1.json();
    if (res.length > 0) {
      id = res[0].id;
      nombre = res[0].nombre;
      deporte = res[0].deporte;
      finicio = res[0].finicio;
      ftermino = res[0].ftermino;
      premio = res[0].premio;
      formato = res[0].formato;
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/cambiarDatos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          finicio,
          ftermino,
          formato,
          premio,
          deporte,
          id,
        }),
      });
      if (!response.ok) {
        throw new Error("Error al cambiar datos");
      }
      const data = await response.json();
      console.log("Datos actualizados:", data);
      window.location.href = "/torneos";
    } catch (error) {
      console.error("Error: " + error);
    }
  }
</script>

<button
  type="button"
  class="px-4 py-2 font-medium text-dark-text transition-all duration-300 transform bg-sportify rounded-lg hover:bg-sportifyhover"
  on:click={() => {
    showModal = true;
  }}
>
  Cambiar Datos
</button>

<dialog
  bind:this={dialog}
  on:close={() => (showModal = false)}
  class="w-full h-full bg-transparent"
>
  <div class="flex justify-center items-center w-full h-full">
    <form
      on:submit|preventDefault={handleSubmit}
      class="flex flex-col items-center gap-4 p-4 my-4 w-3/4 md:w-3/5 bg-light-background dark:bg-dark-background border rounded-lg border-light-border dark:border-dark-border"
    >
      <div class="w-4/5 flex justify-center text-wrap">
        <h2
          class="text-2xl font-bold text-center text-light-text dark:text-dark-text"
        >
          Cambiar Datos del Torneo
        </h2>
      </div>

      <div class="w-4/5 flex justify-center items-center flex-col gap-3">
        <div class="w-full">
          <label
            for="nombre"
            class="block text-sm font-medium text-light-text dark:text-dark-text"
            >Nuevo Nombre:</label
          >
          <input
            type="text"
            v-model="nombre"
            required
            placeholder="Ingrese nuevo nombre"
            class="block w-full px-4 py-4 mt-1 text-lg text-light-text dark:text-dark-text bg-light-input dark:bg-dark-input border border-sportify rounded-lg focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
            bind:value={nombre}
          />
        </div>

        <div class="w-full">
          <label
            for="nombre"
            class="block text-sm font-medium text-light-text dark:text-dark-text"
            >Nueva Fecha de Inicio:</label
          >
          <input
            type="text"
            v-model="nombre"
            required
            placeholder="Ingrese una nueva fecha de inicio"
            class="block w-full px-4 py-4 mt-1 text-lg text-light-text dark:text-dark-text bg-light-input dark:bg-dark-input border border-sportify rounded-lg focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
            bind:value={finicio}
          />
        </div>

        <div class="w-full">
          <label
            for="nombre"
            class="block text-sm font-medium text-light-text dark:text-dark-text"
            >Nueva Fecha de Término:</label
          >
          <input
            type="text"
            v-model="nombre"
            required
            placeholder="Ingrese una nueva fecha de término"
            class="block w-full px-4 py-4 mt-1 text-lg text-light-text dark:text-dark-text bg-light-input dark:bg-dark-input border border-sportify rounded-lg focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
            bind:value={ftermino}
          />
        </div>

        <div class="w-full">
          <label
            for="nombre"
            class="block text-sm font-medium text-light-text dark:text-dark-text"
            >Nuevo Formato:</label
          >
          <input
            type="text"
            v-model="nombre"
            required
            placeholder="Ingrese un nuevo formato"
            class="block w-full px-4 py-4 mt-1 text-lg text-light-text dark:text-dark-text bg-light-input dark:bg-dark-input border border-sportify rounded-lg focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
            bind:value={formato}
          />
        </div>

        <div class="w-full">
          <label
            for="nombre"
            class="block text-sm font-medium text-light-text dark:text-dark-text"
            >Nuevo Premio:</label
          >
          <input
            type="text"
            v-model="nombre"
            required
            placeholder="Ingrese un nuevo premio"
            class="block w-full px-4 py-4 mt-1 text-lg text-light-text dark:text-dark-text bg-light-input dark:bg-dark-input border border-sportify rounded-lg focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
            bind:value={premio}
          />
        </div>

        <div class="w-full">
          <label
            for="nombre"
            class="block text-sm font-medium text-light-text dark:text-dark-text"
            >Nuevo Deporte:</label
          >
          <input
            type="text"
            v-model="nombre"
            required
            placeholder="Ingrese el nuevo deporte"
            class="block w-full px-4 py-4 mt-1 text-lg text-light-text dark:text-dark-text bg-light-input dark:bg-dark-input border border-sportify rounded-lg focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
            bind:value={deporte}
          />
        </div>
      </div>

      <div class="w-4/5 flex justify-center md:justify-evenly flex-wrap gap-3">
        <button
          on:click={() => dialog.close()}
          type="submit"
          aria-label="save bases modal"
          class="w-4/5 md:w-2/5 min-w-fit px-4 py-2 font-medium text-dark-text trans bg-sportify rounded-lg hover:bg-sportifyhover"
        >
          Guardar
        </button>
        <button
          on:click={() => dialog.close()}
          type="button"
          aria-label="close bases modal"
          class="w-4/5 md:w-2/5 min-w-fit px-4 py-2 font-medium text-dark-text trans bg-sportify rounded-lg hover:bg-sportifyhover"
        >
          Cancelar
        </button>
      </div>
    </form>
  </div>
</dialog>
