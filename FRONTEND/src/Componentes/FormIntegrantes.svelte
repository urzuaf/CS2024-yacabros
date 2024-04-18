<script>
  let nombre = "";
  let equipo = "";
  let newNombre = "";
  let idIntegrante = "";
  let idIntegrante2 = "";
  let opcion = "agregar"; // Opción por defecto

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      let url = "";
      let method = "";
      let bodyData = {};

      if (opcion === "agregar") {
        url = "http://localhost:3000/integrante";
        method = 'POST';
        bodyData = { nombre, equipo };
      } else if (opcion === "cambiar") {
        url = "http://localhost:3000/integrante";
        method = 'PUT';
        bodyData = { newNombre, idIntegrante};
      } else if (opcion === "borrar") {
        url = "http://localhost:3000/integrante";
        method = 'DELETE';
        bodyData = { idIntegrante2 };
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      });

      if (!response.ok)
        throw new Error("Error al guardar los datos en el servidor");

      const data = await response.json();
      console.log("Datos guardados:", data);

      // Puedes realizar alguna acción adicional después de guardar los datos, como redirigir a otra página
    } catch (error) {
      console.error("Error:", error);
    }
  }
</script>

<div class="flex justify-center">
  <div class="w-auto max-h-64 overflow-y-auto">
    <form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4 my-4">
      <!-- Nombre y equipo -->
      {#if opcion === "agregar"}
      <div class="min-w-72">
        <input
          type="text"
          id="nombre"
          placeholder="Nombre"
          class="w-full px-4 py-2 bg-white border rounded-lg border-gray-400 text-black focus:border-green-600 focus:ring-green-600 focus:outline-none focus:ring focus:ring-opacity-40"
          bind:value={nombre}
        />
      </div>

      <div class="min-w-72">
        <input
          type="text"
          id="equipo"
          placeholder="Nombre del Equipo"
          class="w-full px-4 py-2 bg-white border rounded-lg border-gray-400 text-black focus:border-green-600 focus:ring-green-600 focus:outline-none focus:ring focus:ring-opacity-40"
          bind:value={equipo}
        />
      </div>
      {/if}

      <!-- Menú desplegable para seleccionar opción -->
      <select bind:value={opcion} class="w-full px-4 py-2 bg-white border rounded-lg border-gray-400 text-black focus:border-green-600 focus:ring-green-600 focus:outline-none focus:ring focus:ring-opacity-40">
        <option value="agregar">Agregar integrante</option>
        <option value="cambiar">Cambiar nombre de integrante</option>
        <option value="borrar">Borrar integrante</option>
      </select>

      <!-- Campos adicionales para cambiar nombre -->
      {#if opcion === "cambiar"}
      <div class="min-w-72">
        <input
          type="text"
          id="newNombre"
          placeholder="Nuevo Nombre"
          class="w-full px-4 py-2 bg-white border rounded-lg border-gray-400 text-black focus:border-green-600 focus:ring-green-600 focus:outline-none focus:ring focus:ring-opacity-40"
          bind:value={newNombre}
        />
      </div>
      <div class="min-w-72">
        <input
          type="text"
          id="idIntegrante"
          placeholder="ID del Integrante"
          class="w-full px-4 py-2 bg-white border rounded-lg border-gray-400 text-black focus:border-green-600 focus:ring-green-600 focus:outline-none focus:ring focus:ring-opacity-40"
          bind:value={idIntegrante}
        />
      </div>
      {/if}

      <!-- Campo para introducir ID del participante a borrar -->
      {#if opcion === "borrar"}
      <div class="min-w-72">
        <input
          type="text"
          id="idIntegrante"
          placeholder="ID del Integrante a Borrar"
          class="w-full px-4 py-2 bg-white border rounded-lg border-gray-400 text-black focus:border-green-600 focus:ring-green-600 focus:outline-none focus:ring focus:ring-opacity-40"
          bind:value={idIntegrante2}
        />
      </div>
      {/if}

      <!-- Botón de acción -->
      <button
        class="w-full px-6 py-2 font-medium text-white transition-all duration-300 transform bg-green-600 rounded-lg hover:scale-105"
        type="submit"
      >
        {opcion === "agregar" ? "Agregar integrante" : opcion === "cambiar" ? "Cambiar nombre" : "Borrar integrante"}
      </button>
    </form>
  </div>
</div>
