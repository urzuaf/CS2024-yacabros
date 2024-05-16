<script>
    import { Usuario } from "../stores/login_store";
    import { onMount } from 'svelte';
    let isOpen = false;
    let isEditing = false;
    let userProfile = {
        name: "",
        descripcion: "",
        password: "",
        rol: "",
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
                body: JSON.stringify({ email: userProfile.email }),
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
</script>

<!-- Botón de edición -->
<h1 class="mt-2 ml-3 text-2xl font-bold" style="margin-left: 5vw; text-size:15px; margin-top:3vh">
    <b>Bienvenido {userProfile.name}</b>
    <button on:click={toggleEdit} class="w-auto px-3 py-auto font-medium text-dark-text transition-all duration-300 transform bg-sportify rounded-lg hover:bg-sportifyhover"
    >Editar datos</button>
</h1>

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
