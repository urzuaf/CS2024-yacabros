
<script>
    import { onMount } from "svelte";

    import { Usuario } from "../stores/login_store.js";

  
    let rol = ""; 

    onMount(async () => {
        await getRol();
    });
    const getRol = async () => {
        let email = $Usuario;
        const resp1 = await fetch("http://localhost:3000/getRol", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        const res = await resp1.json();
        if (res.length <= 0) {
            console.log("no existe usuario o no esta logeado");
            rol = "indefinido";
            return;
        }
        if (res[0].rol ) {
            rol = res[0].rol;
            return;
        }
     
    };
</script>


  
{#if rol === 'usuario'}
    <div class="flex h-screen">
        <!-- Primer fondo blanco -->
        <a href="http://localhost:4321/perfilequipo" class="w-1/3 bg-white flex flex-col items-center justify-start border-1.5 border-r border-black  relative overflow-hidden group">
            <img src="equipo.jpg" class="w-full h-full object-cover transition duration-300 transform hover:scale-105" alt="Imagen 1">
            <div class="absolute top-0 left-0 w-full py-2 bg-black bg-opacity-50 text-white  opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">Perfil Equipo</div>
        </a>
        <!-- Segundo fondo blanco -->
        <a href="http://localhost:4321/creacionTorneo" class="w-1/3 bg-white flex flex-col items-center justify-start border-1.5 border-r border-black  relative overflow-hidden group">
            <img src="torneo.jpg" class="w-full h-full object-cover transition duration-300 transform hover:scale-105" alt="Imagen 2">
            <div class="absolute top-0 left-0 w-full py-2 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">Crear Torneo</div>
        </a>
        <!-- Tercer fondo blanco -->
        <a href="URL_3" class="w-1/3 bg-white flex flex-col items-center justify-start border-1.5 border-r border-black  relative overflow-hidden group">
            <img src="deportes.jpg" class="w-full h-full object-cover transition duration-300 transform hover:scale-105" alt="Imagen 3">
            <div class="absolute top-0 left-0 w-full py-2 bg-black bg-opacity-50 text-white  opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">Noticias</div>
        </a>
    </div>
{:else if rol === 'admin'}
    <div class="flex h-screen">
        <!-- Primer fondo blanco -->
        <a href="http://localhost:4321/perfilequipo" class="w-1/3 bg-white flex flex-col items-center justify-start border-1.5 border-r border-black  relative overflow-hidden group">
            <img src="equipo.jpg" class="w-full h-full object-cover transition duration-300 transform hover:scale-105" alt="Imagen 1">
            <div class="absolute top-0 left-0 w-full py-2 bg-black bg-opacity-50 text-white  opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">Perfil Equipo</div>
        </a>
        <!-- Segundo fondo blanco -->
        <a href="http://localhost:4321/creacionTorneo" class="w-1/3 bg-white flex flex-col items-center justify-start border-1.5 border-r border-black  relative overflow-hidden group">
            <img src="torneo.jpg" class="w-full h-full object-cover transition duration-300 transform hover:scale-105" alt="Imagen 2">
            <div class="absolute top-0 left-0 w-full py-2 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">Crear Torneo</div>
        </a>
        <!-- Tercer fondo blanco -->
        <a href="URL_3" class="w-1/3 bg-white flex flex-col items-center justify-start border-1.5 border-r border-black  relative overflow-hidden group">
            <img src="deportes.jpg" class="w-full h-full object-cover transition duration-300 transform hover:scale-105" alt="Imagen 3">
            <div class="absolute top-0 left-0 w-full py-2 bg-black bg-opacity-50 text-white  opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">Noticias</div>
        </a>
    </div>
{:else if rol === 'staff'}
    <div class="flex h-screen">
        <!-- Primer fondo blanco -->
        <a href="http://localhost:4321/perfilequipo" class="w-1/3 bg-white flex flex-col items-center justify-start border-1.5 border-r border-black  relative overflow-hidden group">
            <img src="equipo.jpg" class="w-full h-full object-cover transition duration-300 transform hover:scale-105" alt="Imagen 1">
            <div class="absolute top-0 left-0 w-full py-2 bg-black bg-opacity-50 text-white  opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">Perfil Equipo</div>
        </a>
        <!-- Segundo fondo blanco -->
        <a href="http://localhost:4321/creacionTorneo" class="w-1/3 bg-white flex flex-col items-center justify-start border-1.5 border-r border-black  relative overflow-hidden group">
            <img src="torneo.jpg" class="w-full h-full object-cover transition duration-300 transform hover:scale-105" alt="Imagen 2">
            <div class="absolute top-0 left-0 w-full py-2 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">Crear Torneo</div>
        </a>
        <!-- Tercer fondo blanco -->
        <a href="URL_3" class="w-1/3 bg-white flex flex-col items-center justify-start border-1.5 border-r border-black  relative overflow-hidden group">
            <img src="deportes.jpg" class="w-full h-full object-cover transition duration-300 transform hover:scale-105" alt="Imagen 3">
            <div class="absolute top-0 left-0 w-full py-2 bg-black bg-opacity-50 text-white  opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">Noticias</div>
        </a>
    </div>
{:else}
    <div>
      No se reconoce el rol del usuario.
      
    </div>
{/if}
  