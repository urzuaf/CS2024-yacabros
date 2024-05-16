<script>
    import { Usuario } from "../stores/login_store";
    import { onMount } from 'svelte';
    let isOpen = false;
    let userProfile = {
        name: "",
        descripcion: "",
        rol: "",
        email: $Usuario
    };

    onMount(async () =>{
        try{
            const resp = await fetch("http://localhost:3000/getUserByEmail", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userProfile.email }), // Envía el correo electrónico en el cuerpo de la solicitud
            });
            if (!resp.ok)
                throw new Error("Error al obtener los datos del servidor");

            const result = await resp.json();
            
            if (result.length > 0) {
                userProfile.name = result[0].username;
                userProfile.descripcion = result[0].descripcion;
                userProfile.rol = result[0].rol;
            }

        }catch(error){
            console.log("Error: ",error);
        }
    });
</script>

{#if userProfile.email != ''}
    <div class="flex flex-col w-full items-center">
        <div class="flex items-center my-5 w-4/5 justify-center gap-3">
            <!-- Foto de perfil del Usuario a la izquierda -->
            <img src="ruta/a/foto_de_perfil" alt="foto de perfil" class="w-20 h-20 rounded-full border-4 border-light-border dark:border-white shadow-md">
            <!-- Nombre del Usuario centrado -->
            <h1 class="text-3xl font-bold text-center border-b-2 pb-2 mb-4 flex-grow">
                Bienvenido {userProfile.name}
            </h1>
            <!-- Botón de Notificaciones a la derecha -->
            <button id="off" class="w-full px-6 py-2 font-medium text-dark-text transition-all duration-300 transform bg-sportify rounded-lg hover:bg-sportifyhover">
                <p>mensaje</p>
            </button>
        </div>
        <!-- Descripción del torneo -->
        <p class="text-lg text-center mb-4 text-black dark:text-white">
            Descripción {userProfile.descripcion}
        </p>
        <!-- Nombre del Staff en un rectángulo con foto pequeña a la izquierda -->
        <div class="flex items-center justify-end mb-4  ">
        
            <div class="text-black bg-white p-2 rounded-lg">
                <p class="text-lg font-semibold">
                    Rol: {userProfile.rol}
                </p>
            </div>
            
        </div>
    </div>
{/if}