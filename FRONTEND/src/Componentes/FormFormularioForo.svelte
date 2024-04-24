<script>
  import { onMount } from 'svelte';
  let titulo = '';
  let comentario = '';
  let etiquetaSeleccionada = '';
  let etiquetaPersonalizada = '';
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
        alert(`Foro creado exitosamente. ID del nuevo foro: ${data.id}`);
      } else {
        const errorData = await response.json();
        alert('Error al crear el foro: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error al crear el foro:', error);
      alert('Error al crear el foro. Por favor, inténtalo de nuevo más tarde.');
    }
  }

  onMount(() => {
    titulo = '';
    comentario = '';
    etiquetaSeleccionada = '';
    etiquetaPersonalizada = '';
  });
</script>

<div class="crear-foro" style="
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
">
  <h2 style="text-align: center; margin-bottom: 20px; color: #007bff;">Crear Nuevo Foro</h2>
  <form on:submit={onCreateForo}>
    <label for="titulo" style="display: block; margin-bottom: 5px; color: #000;">Título:</label>
    <input type="text" id="titulo" name="titulo" bind:value={titulo} style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 3px; box-sizing: border-box; color: #000;">

    <label for="comentario" style="display: block; margin-bottom: 5px; color: #000;">Comentario Inicial:</label>
    <textarea id="comentario" name="comentario" bind:value={comentario} style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 3px; box-sizing: border-box; color: #000;"></textarea>

    <label for="etiquetas" style="display: block; margin-bottom: 5px; color: #000;">Etiquetas:</label>
    <select id="etiquetas" name="etiquetas" bind:value={etiquetaSeleccionada} style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 3px; box-sizing: border-box; color: #000;">
      <option value="">Seleccione una etiqueta</option>
      {#each etiquetasPredefinidas as etiqueta}
        <option value={etiqueta}>{etiqueta}</option>
      {/each}
      <option value="otro">Otro</option>
    </select>
    {#if etiquetaSeleccionada === 'otro'}
      <input type="text" id="otraEtiqueta" name="otraEtiqueta" placeholder="Ingrese otra etiqueta" bind:value={etiquetaPersonalizada} style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 3px; box-sizing: border-box; color: #000;">
    {/if}

    <button type="submit" style="width: 100%; padding: 10px; background-color: #007bff; color: #fff; border: none; border-radius: 3px; cursor: pointer; transition: background-color 0.3s;">Crear Foro</button>
  </form>
</div>
