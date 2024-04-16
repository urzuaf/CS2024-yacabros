<script>
    let bases = '';
</script>

<form on:submit|preventDefault={handleSubmit} class="flex flex-col items-center gap-4 my-4">
    <h2 class="text-2xl font-semibold text-center text-white">Bases y Condiciones</h2>
    <div class="min-w-72">
        <input
            type="text"
            placeholder="Ingrese aquí las Bases y Condiciones de su Torneo"
            class="w-full px-4 py-2 bg-white dark:bg-gray-800 border rounded-lg border-gray-400 dark:border-gray-600 focus:border-green-600 focus:ring-green-600 focus:outline-none focus:ring focus:ring-opacity-40"
            bind:value={bases}
        />
    </div>

    <button
        class="w-4/5 px-6 py-2 font-medium text-white transition-all duration-300 transform bg-green-600 rounded-lg hover:scale-105"
        type="submit"
    >
        Guardar
    </button>
</form>