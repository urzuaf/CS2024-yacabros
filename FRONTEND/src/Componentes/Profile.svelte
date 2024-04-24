<script>
    import { Usuario } from "../stores/login_store";
    let isOpen = false;
    let userProfile = {
        name: "Daniel Moreno",
        email: $Usuario
    };
</script>

<button on:click={() => {isOpen = !isOpen}} type="button" class="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
    <div class="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
        <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" class="object-cover w-full h-full" alt="avatar">
    </div>
    <h3 class="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">{userProfile.name}</h3>
</button>

{#if isOpen}
    {#if $Usuario != ''}
        <div class="absolute right-0 top-10 bg-white p-2 rounded shadow">
            <!-- Nombre de usuario y correo -->
            <p class="text-ray-800 font-bold">{userProfile.name}</p>
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

        </div>
    {/if}
{/if}