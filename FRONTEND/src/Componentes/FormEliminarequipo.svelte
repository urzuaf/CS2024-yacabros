<script>
    import { Usuario } from "../stores/login_store";
    let enviado = false;
    let eleccion = true;
    let contrasenabox = "";
    let userProfile = {
        emisor: $Usuario,
        contrasenaUs: ""
    };

    async function contrasena(event) {
        event.preventDefault();
        eleccion = false;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if(enviado){
            return;
        }

        const resp2 = await fetch("http://localhost:3000/getContrasena", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ emisor: userProfile.emisor }), // Envía el correo electrónico en el cuerpo de la solicitud
        });
        
        if (!resp2.ok)
            throw new Error("Error al obtener los datos del servidor");
        
        const result2 = await resp2.json();

        if (result2.length > 0){
            userProfile.contrasenaUs = result2[0].password; //la estructura es result2[0]."nombre de la columna en la base de datos"
        }

        if (contrasenabox == userProfile.contrasenaUs){
            try {
                const resp = await fetch("http://localhost:3000/deleteTeam", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({emisor: userProfile.emisor}),
                });

                if (!resp.ok){
                    throw new Error("Error al eliminar equipo");
                }

                enviado = true; // Asegúrate de que esta línea se ejecute después de una respuesta exitosa
                const data = await resp.json();
                console.log("Equipo eliminado:", data);
            } catch (error) {
                //console.error("Error:", error);
            }
        }
        else{
            console.log("Contraseña incorrecta");
            return;
        }
    }
</script>

{#if eleccion}
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
            on:click={contrasena}>
                Si
            </button>
        </div>
    </div>

{/if}

{#if eleccion == false}
    <div class="textbox">
        <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingrese contraseña</label>
        <input type="password" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        bind:value={contrasenabox}>
    </div>
    <div class="btneliminar">
        <div>
            <button 
            class="w-full px-20 py-2 font-medium text-dark-text transition-all duration-300 transform bg-sportify rounded-lg hover:scale-105 hover:bg-red-500"
            type="submit"
            on:click={handleSubmit}>
                Eliminar
            </button>
        </div>  
    </div>
{/if}

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

    .opciones{
        display: flex;
        justify-content: center;
        gap: 20px;
        align-items: center;
    }

    .textbox{
        display: flex;
        justify-content: center;
        gap: 10px;
        align-items: center;
        max-width: 40vw;
        margin-left: 30vw;
        margin-bottom: 3vh;
    }

    .btneliminar{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 5vh;
    }
  </style>