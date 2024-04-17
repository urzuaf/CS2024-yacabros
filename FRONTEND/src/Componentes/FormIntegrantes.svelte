<script>
    let nombre = "";
    let equipo = "";
  
    async function handleSubmit(event) {
        event.preventDefault();
      try {
        const response = await fetch("http://localhost:3000/integrante", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nombre, equipo })
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
  
        <!-- Boton de agregarintegrante -->
        <button
          class="w-full px-6 py-2 font-medium text-white transition-all duration-300 transform bg-green-600 rounded-lg hover:scale-105"
          type="submit"
        >
          Agregar integrante
        </button>
      </form>
    </div>
  </div>
  