<script>
    import { Usuario } from "../stores/login_store";
    import { onMount } from 'svelte';
    let isOpen = false;
    let isEditing = false;
    let userProfile = {
        name: "",
        descripcion: "",
        password: "",
        email: $Usuario
    };

    onMount(async () =>{
        try{
            const resp = await fetch("http://localhost:3000/getUsername", {
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

            console.log("Datos editados correctamente");
            toggleEdit(); // Cambiar al modo de visualización normal después de editar
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

