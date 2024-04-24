<script>
    import { Usuario } from "../stores/login_store";
    import { onMount } from 'svelte';
    let isOpen = false;
    let userProfile = {
        name: "",
        email: $Usuario
    };

    onMount(async () =>{
        try{
            const resp = await fetch("http://localhost:3000/getUsername", {
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
            }

        }catch(error){
            console.log("Error: ",error);
        }
    });
</script>


<a href="/login">
    <button type="button" class="px-4 py-2 font-medium text-black transition-all duration-300 transformrounded-lg hover:scale-105">Iniciar Sesión</button>
</a>

<a href="/register">
    <button type="button" class="px-4 py-2 font-medium text-white transition-all duration-300 transform bg-green-600 rounded-lg hover:scale-105">Registrar</button>
</a>



<!-- <button on:click={() => {isOpen = !isOpen}} type="button" class="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
    <div class="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
        <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" class="object-cover w-full h-full" alt="avatar">
    </div>
    <h3 class="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">{userProfile.name}</h3>
</button>


{#if isOpen}
    {#if $Usuario != ''}
        <div class="absolute right-0 top-10 bg-white p-2 rounded shadow">
            <!-- Nombre de usuario y correo -->
            <p class="text-gray-800 font-bold">{userProfile.name}</p>
            <p class="text-gray-300">{userProfile.email}</p>

            <!-- Botón para editar perfil -->
            <a href="/editData" class="block w-full text-left py-2 px-4 text-gray-800 hover:bg-gray-100 focus:outline-none">
                Editar Perfil
            </a>


        </div>
    {:else}
        <div class="absolute right-0 top-10 bg-white p-2 rounded shadow">
            
            <!-- Botón para editar perfil -->
            <a href="/login" class="block w-full text-left py-2 px-4 text-gray-800 hover:bg-gray-100 focus:outline-none">
                Iniciar sesión
            </a>
            <a href="/register" class="block w-full text-left py-2 px-4 text-gray-800 hover:bg-gray-100 focus:outline-none">
                Registrarse
            </a>

{/if}