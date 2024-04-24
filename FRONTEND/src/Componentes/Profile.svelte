<script>
    let isOpen = false;
    let userProfile = {
        name: "Daniel Moreno",
        email: "danmoreno@utalca.cl"
    };
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
    <div class="absolute right-0 top-10 bg-white p-2 rounded shadow">
       
        <p class="text-ray-800 font-bold">{userProfile.name}</p>
        <p class="text-gray-300">{userProfile.email}</p>
       
        <a href="/editData" class="block w-full text-left py-2 px-4 text-gray-800 hover:bg-gray-100 focus:outline-none">
            Editar Perfil
        </a>
        
    </div>
{/if}
 -->









 
<!--POSIBLE LÓGICA PARA TRAER DATOS AL INICIAR SESIÓN

    <script>
    let isOpen = false;
    let userProfile = {
        name: "", // Nombre por defecto
        email: "" // Correo por defecto
    };

    // Función para iniciar sesión y establecer el perfil del usuario
    function iniciarSesion() {
        // Lógica para iniciar sesión
        // Por ejemplo, podrías obtener el nombre y el correo del usuario de una base de datos o de un sistema de autenticación
        userProfile.name = "Nombre de usuario"; // Asignar el nombre del usuario obtenido después del inicio de sesión
        userProfile.email = "correo@example.com"; // Asignar el correo del usuario obtenido después del inicio de sesión
    }

    // Llamar a la función iniciarSesion al cargar la página (esto es solo un ejemplo, deberías llamar a esta función en respuesta a la acción del usuario)
    window.onload = iniciarSesion;
</script>

-->
