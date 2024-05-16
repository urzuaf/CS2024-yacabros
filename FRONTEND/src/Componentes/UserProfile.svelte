<script>
    import { Usuario } from "../stores/login_store";
    import { onMount } from 'svelte';

    let isEditing = false;
    let isSending = false;

    let userData = {
        name: "",
        descripcion: "",
        rol: "",
        email: $Usuario
    };

    let userProfile = {
        name: "",
        descripcion: "",
        password: "",
        email: $Usuario
    };

    let mensajeEditar = '';
    let mensajeVisibleEditar = false;

    onMount(async () =>{
        try{
            const resp = await fetch("http://localhost:3000/getUserByEmail", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userData.email }),
            });
            if (!resp.ok)
                throw new Error("Error al obtener los datos del servidor");

            const result = await resp.json();
            
            if (result.length > 0) {
                userData.name = result[0].username;
                userData.descripcion = result[0].descripcion;
                userData.rol = result[0].rol;
            }

        }catch(error){
            console.log("Error: ",error);
        }
    });

    async function handleSubmit(event) {
        event.preventDefault();
        let emisor = $Usuario;
        let { name, descripcion, password } = userProfile;
        try {
            const response = await fetch("http://localhost:3000/editData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre: name, descripcion, emisor, password })
            });
            if (!response.ok)
                throw new Error("Error al editar datos");
            mensajeEditar = "Datos editados correctamente";
            mensajeVisibleEditar = true;
            toggleEdit(); // Cambiar al modo de visualización normal después de editar
            setTimeout(() => {
                mensajeVisibleEditar = false;
            }, 6000); // 5 segundos
        } catch (error) {
            console.error("Error al editar datos:", error);
        }
    }

    function toggleEdit() {
        isEditing = !isEditing;
    }

    function toggleSending() {
        isSending = !isSending;
    }
</script>

{#if userData.email != ''}
    <div class="flex flex-col w-full items-center">
        <div class="flex items-center my-5 w-4/5 justify-start gap-3">
            <!-- Foto de perfil del Usuario a la izquierda -->
            <img src="../2098873.svg" alt="foto de perfil" class="w-20 h-20 p-1 rounded-full border-4 border-light-border dark:border-white mr-4 shadow-md">
            <!-- Nombre del Usuario centrado -->
            <h1 class="text-3xl font-bold text-center flex-grow">
                Bienvenido {userData.name}
            </h1>
            <!-- Rol del Usuario en un rectángulo a la izquierda -->
            <div class="text-black bg-white p-2 rounded-lg">
                <p class="text-lg font-semibold">
                    Rol: {userData.rol}
                </p>
            </div>
        </div>
        <!-- Descripción del torneo -->
        <p class="text-lg text-center mb-4 text-black dark:text-white">
            {userData.descripcion}
        </p>
        <div class="flex w-full items-center justify-center gap-3 py-4 px-4">
            <!-- Botón de Notificaciones -->
            <button on:click={toggleSending} class="w-auto px-6 py-2 font-medium text-dark-text transition-all duration-300 transform bg-sportify rounded-lg hover:bg-sportifyhover">
                <p>Enviar Mensaje</p>
            </button>
            <!-- Botón de edición -->
            <button on:click={toggleEdit} class="w-auto px-6 py-2 font-medium text-dark-text transition-all duration-300 transform bg-sportify rounded-lg hover:bg-sportifyhover">
                Editar datos
            </button>
        </div>
    </div>
{/if}

{#if isEditing}
    <form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4 my-5">
        <div class="min-w-72">
            <input
                type="text"
                id="nombre"
                placeholder="Nombre"
                class="w-full px-4 py-2 bg-light-input dark:bg-dark-input border rounded-lg border-light-border dark:border-dark-border focus:border-sportify focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
                bind:value={userProfile.name}
            />
        </div>

        <div class="min-w-72">
            <input
                type="descripcion"
                placeholder="Descripción"
                class="w-full px-4 py-2 bg-light-input dark:bg-dark-input border rounded-lg border-light-border dark:border-dark-border focus:border-sportify focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
                bind:value={userProfile.descripcion}
            />
        </div>

        <div class="min-w-72">
            <input
                type="password"
                placeholder="Contraseña"
                class="w-full px-4 py-2 bg-light-input dark:bg-dark-input border rounded-lg border-light-border dark:border-dark-border focus:border-sportify focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
                bind:value={userProfile.password}
            />
        </div>

        <button
            class="w-min px-3 py-auto font-medium text-dark-text transition-all duration-300 transform bg-sportify rounded-lg hover:bg-sportifyhover"    
            type="submit">
            Confirmar
        </button>
    </form>
{/if}

{#if mensajeVisibleEditar}
    <div class="bg-sportify text-dark-text absolute bottom-8 p-2 px-4 z-50 a" style="width: 300px;">
        <p style="font-size: 16px;">{mensajeEditar}</p>
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
