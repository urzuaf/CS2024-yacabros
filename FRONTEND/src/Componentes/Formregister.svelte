<script>
    let nombre = "";
    let email = "";
    let password = "";
    let correct = {tried: false, success: false}
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nombre, email, password }),
            });

            if (!response.ok){
                throw new Error("Error al registrar usuario");
                correct.tried= true;
            } 
            else redirect()
            const data = await response.json();
            console.log("Usuario registrado:", data);
        } catch (error) {
            //console.error("Error:", error);
        }
    }

    function redirect() {
        //movi la redirección aqui
        window.location.href = "/login";
    }
</script>

<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4 my-4">
    <div class="min-w-72">
        <input
            required
            type="text"
            id="nombre"
            placeholder="Nombre"
            class="w-full px-4 py-2 bg-light-input dark:bg-dark-input border rounded-lg border-light-border dark:border-dark-border focus:border-sportify focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
            bind:value={nombre}
        />
    </div>

    <div class="min-w-72">
        <input
            required
            type="email"
            id="email"
            placeholder="Correo electrónico"
            class="w-full px-4 py-2 bg-light-input dark:bg-dark-input border rounded-lg border-light-border dark:border-dark-border focus:border-sportify focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
            bind:value={email}
        />
    </div>

    <div class="min-w-72">
        <input
            required
            type="password"
            placeholder="Contraseña"
            class="w-full px-4 py-2 bg-light-input dark:bg-dark-input border rounded-lg border-light-border dark:border-dark-border focus:border-sportify focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
            bind:value={password}
        />
    </div>

    <button
        class="w-full px-6 py-2 font-medium text-dark-text transition-all duration-300 transform bg-sportify rounded-lg hover:bg-sportifyhover"
        type="submit"
    >
        Registrarse
    </button>
    {#if correct.tried && !correct.success}
    <div >El registro ha fallado intenta otra vez</div>

    {/if}
</form>
