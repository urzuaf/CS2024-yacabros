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
        throw new Error("Error al comunicarse con el servidor");

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      // Mostrar el mensaje de feedback
      const feedbackElement = document.getElementById("feedbackMessage");
      feedbackElement.textContent = data.message;
      feedbackElement.classList.remove("hidden");
      feedbackElement.classList.add("show");

      // Ocultar el mensaje después de 3 segundos (3000 milisegundos)
      setTimeout(() => {
        feedbackElement.classList.remove("show");
        feedbackElement.classList.add("hidden");
      }, 3000);

    } catch (error) {
      console.error("Error:", error);
      const feedbackElement = document.getElementById("feedbackMessage");
      feedbackElement.textContent = "Error: " + error.message;
      feedbackElement.classList.remove("hidden");
      feedbackElement.classList.add("show");
      // Ocultar el mensaje después de 3 segundos (3000 milisegundos)
      setTimeout(() => {
        feedbackElement.classList.remove("show");
        feedbackElement.classList.add("hidden");
      }, 3000);
    }
  }
</script>

<div class="flex justify-center">
  <div class="w-auto max-h-64">
    <form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4 my-4">
      <!-- Nombre y equipo -->
      {#if opcion === "agregar"}
      <div class="min-w-72">
        <input
          type="text"
          id="nombre"
          placeholder="Nombre"
          class="w-full px-4 py-2 bg-light-input dark:bg-dark-input border rounded-lg border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:border-sportify focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
          bind:value={nombre}
        />
      </div>

      <div class="min-w-72">
        <input
          type="text"
          id="equipo"
          placeholder="Nombre del Equipo"
          class="w-full px-4 py-2 bg-light-input dark:bg-dark-input border rounded-lg border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:border-sportify focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
          bind:value={equipo}
        />
      </div>
      {/if}

      <!-- Menú desplegable para seleccionar opción -->
      <select bind:value={opcion} class="w-full px-4 py-2 bg-light-input dark:bg-dark-input border rounded-lg border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:border-sportify focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40">
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
          class="w-full px-4 py-2 bg-light-input dark:bg-dark-input border rounded-lg border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:border-sportify focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
          bind:value={newNombre}
        />
      </div>
      <div class="min-w-72">
        <input
          type="text"
          id="idIntegrante"
          placeholder="ID del Integrante"
          class="w-full px-4 py-2 bg-light-input dark:bg-dark-input border rounded-lg border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:border-sportify focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
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
          class="w-full px-4 py-2 bg-light-input dark:bg-dark-input border rounded-lg border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:border-sportify focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
          bind:value={idIntegrante2}
        />
      </div>
      {/if}

      <!-- Botón de acción -->
      <button
        class="w-full px-6 py-2 font-medium text-dark-text transition-all duration-300 transform bg-sportify rounded-lg hover:scale-105"
        type="submit"
      >
        {opcion === "agregar" ? "Agregar integrante" : opcion === "cambiar" ? "Cambiar nombre" : "Borrar integrante"}
      </button>
    </form>

    <!-- Mensaje de feedback -->
    <div id="feedbackMessage" class="hidden bg-sportify text-dark-text absolute bottom-8 p-2 px-4 z-50">
      <!-- Aquí se mostrará el mensaje de feedback -->
    </div>
  </div>
</div>

<style>
  #feedbackMessage {
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