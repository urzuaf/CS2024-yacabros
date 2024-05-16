<script>
  import { Usuario } from "../stores/login_store";
  import { onMount } from 'svelte';
  let email = $Usuario;
  let titulo = '';
  let comentario = '';
  let etiquetaSeleccionada = '';
  let etiquetaPersonalizada = '';
  let mensaje = '';
  let mensajeVisible = false;
  const etiquetasPredefinidas = ['Futbol', 'Basquetbol', 'Voleibol', 'Rugby']; // Lista de etiquetas predefinidas de 4 valores

  async function onCreateForo(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    titulo = formData.get('titulo');
    comentario = formData.get('comentario');
    etiquetaSeleccionada = formData.get('etiquetas'); // Obtener la etiqueta seleccionada
    etiquetaPersonalizada = formData.get('otraEtiqueta'); // Obtener la etiqueta personalizada

    const etiqueta = etiquetaSeleccionada === 'otro' ? etiquetaPersonalizada : etiquetaSeleccionada; // Utilizar la etiqueta seleccionada o la personalizada

    try {
      const response = await fetch("http://localhost:3000/crearForo", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, comentario, etiqueta }) // Enviar la etiqueta seleccionada o personalizada al servidor
      });

      if (response.ok) {
        const data = await response.json();
        mensaje = `Foro creado exitosamente. ID del nuevo foro: ${data.id}`;
        mensajeVisible = true;
      } else {
        const errorData = await response.json();
        mensaje = 'Error al crear el foro: ' + errorData.error;
        mensajeVisible = true;
      }

      setTimeout(() => {
        mensajeVisible = false;
      }, 8000); // Ocultar el mensaje después de 8 segundos
    } catch (error) {
      console.error('Error al crear el foro:', error);
      mensaje = 'Error al crear el foro. Por favor, inténtalo de nuevo más tarde.';
      mensajeVisible = true;
    }
  }

  onMount(() => {
    titulo = '';
    comentario = '';
    etiquetaSeleccionada = '';
    etiquetaPersonalizada = '';
  });
</script>

{#if email != ""}
  <div class=" p-5 my-0 mx-auto max-w-96">
    <form on:submit={onCreateForo}>
      <label for="titulo" class="block mb-1">
        Título:
      </label>
      <input type="text" id="titulo" name="titulo" bind:value={titulo} class="w-full p-2 mb-2 bg-light-input dark:bg-dark-input border border-light-border dark:border-dark-border rounded outline-none hover:border-sportify focus:border-sportify">

      <label for="comentario" class="block mb-1">
        Comentario Inicial:
      </label>
      <textarea id="comentario" name="comentario" bind:value={comentario} class="w-full p-2 mb-2 bg-light-input dark:bg-dark-input border border-light-border dark:border-dark-border rounded outline-none hover:border-sportify focus:border-sportify"></textarea>

      <label for="etiquetas" class="block mb-1">
        Etiquetas:
      </label>
      <select id="etiquetas" name="etiquetas" bind:value={etiquetaSeleccionada} class="w-full p-2 mb-2 bg-light-input dark:bg-dark-input border border-light-border dark:border-dark-border rounded outline-none hover:border-sportify focus:border-sportify">
        <option value="">Seleccione una etiqueta</option>
        {#each etiquetasPredefinidas as etiqueta}
          <option value={etiqueta}>{etiqueta}</option>
        {/each}
        <option value="otro">Otro</option>
      </select>
      {#if etiquetaSeleccionada === 'otro'}
        <input type="text" id="otraEtiqueta" name="otraEtiqueta" placeholder="Ingrese otra etiqueta" bind:value={etiquetaPersonalizada} class="w-full p-2 mb-2 bg-light-input dark:bg-dark-input border border-light-border dark:border-dark-border rounded outline-none hover:border-sportify focus:border-sportify">
      {/if}

      <button type="submit" class="w-full px-6 py-2 font-medium text-dark-text transition-all duration-300 transform bg-sportify rounded-lg hover:bg-sportifyhover">
        Crear Foro
      </button>
    </form>

    {#if mensajeVisible}
      <div class="bg-sportify text-dark-text absolute bottom-8 p-2 px-4 z-50 a">
        <p>{mensaje}</p>
      </div>
    {/if}
  </div>
{/if}

<style>
  .a {
    right: -2000px;
    animation: appear 6s;
  }

  @keyframes appear {
    0% {
      right: -500px;
    }
    10% {
      right: 10px;
    }
    80% {
      right: 10px;
    }
    100% {
      right: -500px;
    }
  }
</style>
