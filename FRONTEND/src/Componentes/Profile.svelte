<script>
    import Notificacion from "./Notificacion.svelte";
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

{#if $Usuario == ''}
    <div>
        <a href="/login">
            <button type="button" class="px-4 py-2 font-medium text-light-text dark:text-dark-text transition-all duration-300 transform rounded-md hover:bg-light-input dark:hover:bg-dark-input">Iniciar Sesión</button>
        </a>

        <a href="/register">
            <button type="button" class="px-4 py-2 font-medium text-dark-text transition-all duration-300 transform bg-sportify rounded-lg hover:bg-sportifyhover">Registrar</button>
        </a>
    </div>
{/if}

{#if $Usuario != ''}
    <Notificacion /> 
    <button on:click={() => {isOpen = !isOpen}} type="button" class="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
        <div class="trans w-8 h-8 overflow-hidden border-2 border-light-border hover:border-light-text dark:border-dark-border hover:dark:border-dark-text rounded-full">
            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" class="object-cover w-full h-full" alt="avatar">
        </div>
        <h3 class="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">{userProfile.name}</h3>
    </button>

    {#if isOpen}
        <div class="absolute right-0 top-16 p-2 rounded shadow bg-light-gradient dark:bg-dark-background2 text-light-text border dark:text-dark-text border-light-border dark:border-dark-border">
            <!-- Nombre de usuario y correo -->
            <p class="px-4 font-bold">{userProfile.name}</p>
            <p class=" text-light-border dark:text-dark-border px-4">{userProfile.email}</p>

            <!-- Botón para editar perfil -->
            <a href="/editData" class="block w-full text-left py-2 px-4 rounded-md hover:bg-light-input dark:hover:bg-dark-input focus:outline-none">
                Editar Perfil
            </a>
            <a href="/creacionTorneo" class="block w-full text-left py-2 px-4 rounded-md hover:bg-light-input dark:hover:bg-dark-input focus:outline-none">
                Crear Torneo
            </a>
            <a href="/perfilEquipo" class="block w-full text-left py-2 px-4 rounded-md hover:bg-light-input dark:hover:bg-dark-input focus:outline-none">
                Ver Perfil de Equipo
            </a>
            <a href="/user" class="block w-full text-left py-2 px-4 rounded-md hover:bg-light-input dark:hover:bg-dark-input focus:outline-none">
                Ver Perfil de Usuario
            </a>
            <a href="/integrante" class="block w-full text-left py-2 px-4 rounded-md hover:bg-light-input dark:hover:bg-dark-input focus:outline-none">
                Agregar Jugador a Equipo
            </a>

            <a href="/agregarequipo" class="block w-full text-left py-2 px-4 text-gray-800 hover:bg-gray-100 focus:outline-none">
                Agrega un Equipo
            </a>

        </div>
        <!--
        {:else}
        <div class="absolute right-0 top-10 bg-white p-2 rounded shadow">
            
            
            <a href="/login" class="block w-full text-left py-2 px-4 text-gray-800 hover:bg-gray-100 focus:outline-none">
                Iniciar sesión
            </a>
            <a href="/register" class="block w-full text-left py-2 px-4 text-gray-800 hover:bg-gray-100 focus:outline-none">
                Registrarse
            </a>
        
        </div>
        -->
    {/if}
{/if}

<style>
    .trans {
        transition: 0.3s ease;
    }
</style>