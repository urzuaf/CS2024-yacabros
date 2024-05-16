<script>
    import { Usuario } from "../stores/login_store";
    let nombreEquipo = "";
    let descripcion = "";
    let deporte = "";
    let enviado = false;
    let userProfile = {
        emisor: $Usuario
    };
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/editDataTeam", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nombreEquipo, descripcion, deporte, emisor: userProfile.emisor}),
            });

            if (!response.ok){
                throw new Error("Error al editar equipo");
                correct.tried= true;
            } 
            enviado = true;
            const data = await response.json();
            console.log("Equipo editado:", data);
        } catch (error) {
            //console.error("Error:", error);
        }
    }
</script>

<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4 my-4">
    <div class="min-w-72">
        <input
            type="text"
            id="nombreEquipo"
            placeholder="Nuevo Nombre"
            class="w-full px-4 py-2 bg-light-input dark:bg-dark-input border rounded-lg border-light-border dark:border-dark-border focus:border-sportify focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
            bind:value={nombreEquipo}
        />
    </div>

    <div class="min-w-72">
        <input
            type="text"
            id="descripcion"
            placeholder="Nueva Descripción"
            class="w-full px-4 py-2 bg-light-input dark:bg-dark-input border rounded-lg border-light-border dark:border-dark-border focus:border-sportify focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
            bind:value={descripcion}
        />
    </div>

    <div class="min-w-72">
        <input
            type="text"
            placeholder="Nuevo Deporte"
            class="w-full px-4 py-2 bg-light-input dark:bg-dark-input border rounded-lg border-light-border dark:border-dark-border focus:border-sportify focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
            bind:value={deporte}
        />
    </div>

    <button
        class="w-full px-6 py-2 font-medium text-dark-text transition-all duration-300 transform bg-sportify rounded-lg hover:scale-105"
        type="submit"
    >
        Editar Equipo
    </button>
</form>

{#if enviado}
    <div class="bg-sportify absolute bottom-8 p-2 px-4 z-50 a">
        <p><b>Equipo editado con éxito</b></p>
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