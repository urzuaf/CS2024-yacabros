<script>
    import { Usuario } from "../stores/login_store";
    let nombre = '';
    let descripcion = '';
    let password = '';
    let enviado = false;

    async function handleSubmit(event) {
        let emisor = $Usuario;
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/editData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre,descripcion,emisor,password})
            });

            if (!response.ok)
                throw new Error("Error al editar datos");

            enviado = true;
            resultadoEdicion = 'Datos editados correctamente';
            const data = await response.json();
            console.log("Usuario editado:", data);
        } catch (error) {
            //console.error("Error:", error);
        }
    }
</script>

<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4 my-5">
    <div class="min-w-72">
        <input
            type="text"
            id="nombre"
            placeholder="Nombre"
            class="w-full px-4 py-2 bg-light-input dark:bg-dark-input border rounded-lg border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:border-sportify focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
            bind:value={nombre}
        />
    </div>

    <div class="min-w-72">
        <input
            type="descripcion"
            placeholder="Descripción"
            class="w-full px-4 py-2 bg-light-input dark:bg-dark-input border rounded-lg border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:border-sportify focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
            bind:value={descripcion}
        />
    </div>

    <div class="min-w-72">
        <input
            type="password"
            placeholder="Contraseña"
            class="w-full px-4 py-2 bg-light-input dark:bg-dark-input border rounded-lg border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:border-sportify focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
            bind:value={password}
        />
    </div>

    <button
        class="w-full px-6 py-2 font-medium text-dark-text transition-all duration-300 transform bg-sportify rounded-lg hover:scale-105"
        type="submit"
    >
        Editar Datos
    </button>
</form>

{#if enviado}
    <div class="bg-sportify absolute bottom-8 p-2 px-4 z-50 a">
        <p><b>Datos editados con éxito</b></p>
    </div>
{/if}

<style>
    .a{
        right: -2000px;
        top: 100px;
        bottom: 500px;
        animation: appear 6s ;
    }
    @keyframes appear{
        0%{
            top: 100px;
            bottom: 500px;
            right: -500px;
        }
        10%{
            top: 100px;
            bottom: 500px;
            right: 10px;
        }
        80%{
            top: 100px;
            bottom: 500px;
            right: 10px;
        }
        100%{
            top: 100px;
            bottom: 500px;
            right: -500px;
        }
    }
    
</style>