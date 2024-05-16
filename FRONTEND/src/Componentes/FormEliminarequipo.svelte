<script>
    import { Usuario } from "../stores/login_store";
    let enviado = false;
    let userProfile = {
        emisor: $Usuario
    };
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/deleteTeam", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({emisor: userProfile.emisor}),
            });

            if (!response.ok){
                throw new Error("Error al eliminar equipo");
            } 
            enviado = true; // Asegúrate de que esta línea se ejecute después de una respuesta exitosa
            const data = await response.json();
            console.log("Equipo eliminado:", data);
        } catch (error) {
            //console.error("Error:", error);
        }
    }
</script>

<div class="opciones">
    <div>
        <a href="/user">
            <button 
            class="w-full px-20 py-2 font-medium text-dark-text transition-all duration-300 transform bg-sportify rounded-lg hover:bg-sportifyhover">
                No
            </button>
        </a>        
    </div>
    <div>
        <button 
        class="w-full px-20 py-2 font-medium text-dark-text transition-all duration-300 transform bg-sportify rounded-lg hover:bg-red-500"
        type="submit"
        on:click={handleSubmit}>
            Si
        </button>
    </div>
</div>

{#if enviado}
    <div class="bg-sportify absolute bottom-8 p-2 px-4 z-50 a">
        <p><b>Equipo eliminado satisfactoriamente</b></p>
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