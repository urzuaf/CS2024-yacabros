<script>
    import { onMount } from 'svelte';

    let showModal = false;
    let rows = [];
    let editingEnabled = false;//Variable para habilitar o deshabilitar la edición de los campos dentro de la columna

    onMount(async () => {
        try {
            const resp = await fetch("http://localhost:3000/equiposludopatasentorneo");
            if (!resp.ok)
                throw new Error("Error al obtener los datos del servidor");
            rows = await resp.json();
            console.log("\n\nJOIN\n");
            console.log(rows);
        } catch (error) {
            console.log("Error: ", error);
        }
    });

    function agregarCol() {
        var col = document.getElementById("cabecera");
        const th = document.createElement("th");
        th.style.border = "1px solid";
        th.style.textAlign = "center";
        th.style.background = "sportify";
        th.innerHTML = ""; 
        const input = document.createElement("input");
        input.type = "text";
        input.style.width = "100%";
        input.style.height = "35px";
        input.style.textAlign = "center";
        input.style.color = "white";
        input.style.border = "none";
        input.style.background = "none";
        th.appendChild(input);
        col.appendChild(th);

        var rows = document.querySelectorAll("#data tr");
        rows.forEach(row => {
            const td = document.createElement("td");
            td.classList.add("editable-cell");
            td.style.border = "1px solid white";
            td.style.textAlign = "center";
            const input = document.createElement("input");
            input.type = "text";
            input.style.width = "100%";
            input.style.height = "35px";
            input.style.textAlign = "center";
            input.style.color = "black";
            input.style.border = "none";
            input.style.background = "none";
            input.disabled = !editingEnabled; 
            td.appendChild(input);
            row.appendChild(td);
        });
    }

    function habilitarEdicion() {//Función para habilitar la edición de los campos dentro de la columna
        editingEnabled = true;
        document.querySelectorAll(".editable-cell input").forEach(input => {
            input.disabled = false;
        });
    }

    function deshabilitarEdicion() {//Función para deshabilitar la edición de los campos dentro de la columna
        editingEnabled = false;
        document.querySelectorAll(".editable-cell input").forEach(input => {
            input.disabled = true;
        });
    }

    function borraColumna() {//Función para eliminar la última columna de la tabla
        const lastColumnIndex = document.querySelectorAll("#cabecera th").length - 1;

        document.querySelectorAll("#cabecera th")[lastColumnIndex].remove();

        document.querySelectorAll("#data tr").forEach(row => {
            row.children[lastColumnIndex].remove();
        });
    }

    function opcionesEdicion() {//Función para habilitar o deshabilitar la edición de los campos dentro de la columna
        editingEnabled = !editingEnabled;
        if (editingEnabled) {
            document.getElementById('editButton').innerText = "Guardar Datos";
        } else {
            document.getElementById('editButton').innerText = "Editar Datos";
        }
        editingEnabled ? habilitarEdicion() : deshabilitarEdicion();
    }
</script>

<div class="justify-center items-center mb-32 mt-12 w-full h-128">
    <h1 class="font-semibold text-4xl align-center flex justify-center">Clasificatoria</h1>
    <div class="flex justify-center">
        <table class="table-auto bg-gray-300 text-dark-text font-bold mx-auto mt-10 max-h-64 w-3/4 overflow-y-auto rounded-lg">
            <thead class="bg-sportify">
                <tr id="cabecera">
                    <th class="px-4 py-2 border-solid border-2">Id</th>
                    <th class="px-4 py-2 border-solid border-2">Nombre Equipo</th>
                    <th class="px-4 py-2 border-solid border-2">Staff</th>
                    <th class="px-4 py-2 border-solid border-2">Torneo</th>
                </tr>
            </thead>
            <tbody id=data class="border px-4 py-2">
                {#each rows as row}
                <tr id="row" class="text-center text-black border-solid border-2">
                    <td class="border-solid border-2">
                        <input type="text" style="width: 100%; height: 35px; text-align: center; color: black; border: none; background: none;" bind:value={row.id} disabled={!editingEnabled}>
                    </td>
                    <td class="border-solid border-2">
                        <input type="text" style="width: 100%; height: 35px; text-align: center; color: black; border: none; background: none;" bind:value={row.nombre} disabled={!editingEnabled}>
                    </td>
                    <td class="border-solid border-2">
                        <input type="text" style="width: 100%; height: 35px; text-align: center; color: black; border: none; background: none;" bind:value={row.staff} disabled={!editingEnabled}>
                    </td>
                    <td class="border-solid border-2">
                        <input type="text" style="width: 100%; height: 35px; text-align: center; color: black; border: none; background: none;" bind:value={row.torneo} disabled={!editingEnabled}>
                    </td>
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
    <div class="flex justify-center">
        <button class="ml-4 mt-4 bg-sportify h-10 w-32 text-white rounded-lg hover:text-gray-200" on:click={agregarCol}>
            Agregar Datos
        </button> 

        <button id="editButton" class="ml-4 mt-4 bg-sportify h-10 w-32 text-white rounded-lg hover:text-gray-200" on:click={opcionesEdicion}>
            Editar Datos
        </button>
        
        <button class="px-3 ml-4 mt-4 bg-sportify h-10 w-auto text-white rounded-lg hover:text-gray-200" on:click={borraColumna}>
            Borrar Última Columna
        </button>
    </div>
</div>
