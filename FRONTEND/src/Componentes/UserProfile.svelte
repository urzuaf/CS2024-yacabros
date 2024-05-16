<script>
    import { Usuario } from "../stores/login_store";
    import { onMount } from 'svelte';
    import EnviarNotificacion from './EnviarNotificacion.svelte';

    let isEditing = false;

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

    let showEditing;
    let dialogEditing;
    $: if (dialogEditing && showEditing) dialogEditing.showModal();

    let showSending;
    let dialogSending;
    $: if (dialogSending && showSending) dialogSending.showModal();

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
            <EnviarNotificacion />
            <!-- Botón de edición -->
            <button on:click={()=>{showEditing = true}} class="w-auto px-6 py-2 font-medium text-dark-text transition-all duration-300 transform bg-sportify rounded-lg hover:bg-sportifyhover">
                Editar datos
            </button>
        </div>
    </div>
{/if}

<!-- Modal Editar Datos -->
<dialog 
    bind:this={dialogEditing}
    on:close={() => (showEditing = false)}
    class="w-full h-70 bg-transparent"
>
    <div class="flex justify-center items-center w-full h-full text-light-text dark:text-dark-text">
        <form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-2 my-4 w-3/5 py-4 px-40 bg-light-background dark:bg-dark-background border rounded-lg border-light-border dark:border-dark-border">
            <div class="flex justify-center text-wrap">
                <h2 class="text-2xl font-bold text-center">Editar Datos</h2>
            </div>

            <span class="flex justify-start font-semibold">Nombre</span>
            <input
                type="text"
                id="nombre"
                placeholder="Nombre"
                class="w-full px-4 py-2 bg-light-input dark:bg-dark-input border rounded-lg border-light-border dark:border-dark-border focus:border-sportify focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
                bind:value={userProfile.name}
            />
            
            <span class="flex justify-start font-semibold">Descripción</span>
            <input
                type="descripcion"
                placeholder="Descripción"
                class="w-full px-4 py-2 bg-light-input dark:bg-dark-input border rounded-lg border-light-border dark:border-dark-border focus:border-sportify focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
                bind:value={userProfile.descripcion}
            />
            
            <span class="flex justify-start font-semibold">Contraseña</span>
            <input
                type="password"
                placeholder="Contraseña"
                class="w-full px-4 py-2 bg-light-input dark:bg-dark-input border rounded-lg border-light-border dark:border-dark-border focus:border-sportify focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
                bind:value={userProfile.password}
            />

            <div class="w-full flex justify-center md:justify-between flex-wrap gap-3 mt-2">
                <button
                    on:click={() => dialogEditing.close()}
                    type="submit" aria-label="save bases modal"
                    class="w-2/5 min-w-fit px-4 py-2 font-medium text-dark-text trans bg-sportify rounded-lg hover:bg-sportifyhover"
                >
                    Confirmar
                </button>
                <button 
                    on:click={() => dialogEditing.close()}
                    type="button" aria-label="close bases modal"
                    class="w-2/5 min-w-fit px-4 py-2 font-medium text-dark-text trans bg-sportify rounded-lg hover:bg-sportifyhover"
                >
                    Cancelar
                </button>
            </div>
        </form>
    </div>
</dialog>

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
