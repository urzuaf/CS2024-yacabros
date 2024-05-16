<script>
  import { onMount } from "svelte";
  import { Torneo } from "../stores/torneo_store";

  let showModal = false;
  let rows = [];
  let editingEnabled = false; //Variable para habilitar o deshabilitar la edición de los campos dentro de la columna
  let showColumnIndexInput = false;

  onMount(async () => {
    let id = 1;
    let ntorneo = $Torneo;
    try {
      //obtenemos el torneo
      const resp1 = await fetch("http://localhost:3000/getTorneo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ntorneo }),
      });
      const resp2 = await resp1.json();

      id = resp2[0].id;
      const resp = await fetch(
        "http://localhost:3000/equiposludopatasentorneo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );
      if (!resp.ok) throw new Error("Error al obtener los datos del servidor");
      rows = await resp.json();
      console.log("\n\nJOIN\n");
      console.log(rows);
    } catch (error) {
      console.log("Error: ", error);
    }
  });
  let agregarcol=true;
  function agregarCol() {
    if(!agregarcol) return;
    agregarcol=false
    var col = document.getElementById("cabecera");
    const th = document.createElement("th");
    th.classList.add("editable-cell");
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
    input.disabled = !editingEnabled;
    th.appendChild(input);
    col.appendChild(th);

    var rows = document.querySelectorAll("#data tr");
    rows.forEach((row) => {
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

  function habilitarEdicion() {
    //Función para habilitar la edición de los campos dentro de la columna
    editingEnabled = true;
    document.querySelectorAll(".editable-cell input").forEach((input) => {
      input.disabled = false;
    });
  }

  async function deshabilitarEdicion() {
    //Función para deshabilitar la edición de los campos dentro de la columna
    editingEnabled = false;
    document.querySelectorAll(".editable-cell input").forEach((input) => {
      input.disabled = true;
    });

    const cabecera = document.getElementById("cabecera");
    const ths = cabecera.getElementsByTagName("th");
    const inputs = cabecera.getElementsByTagName("input");
    let info
    // Verificar si hay elementos en inputs y si el último elemento tiene un valor definido
    if (inputs.length > 0 && inputs[inputs.length - 1].value !== undefined) {
      info = inputs[inputs.length - 1].value;

      try {
        const resp = await fetch("http://localhost:3000/addColClasificatoria", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ info }), // Ajusta la clave del objeto JSON según la expectativa del servidor
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No se encontró un valor válido en el último input");
    }

    let data=[];
    obtenerValoresTabla().forEach((row)=>
    {
      console.log(row)
      console.log("Datos a pet: "+row[0]+row[row.length-1]+info+row[row.length-2]);
      data.push([row[0],row[row.length-1],info,row[3]]
  )})
    
    console.log("info " +data[0])
    
    try {
        const resp = await fetch("http://localhost:3000/addInfoColClasificatoria", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }), // Ajusta la clave del objeto JSON según la expectativa del servidor
        });
      } catch (error) {
        console.log(error);
      }
    
    
    
  }

  function obtenerValoresTabla() {
    
  const filas = document.querySelectorAll("#data tr"); // Selecciona todas las filas en el tbody
  const valores = [];

  filas.forEach((fila) => {
    const filaValores = [];
    fila.querySelectorAll("input").forEach((input) => {
      filaValores.push(input.value); // Obtiene el valor del input en cada celda
    });
    valores.push(filaValores); // Agrega los valores de la fila a la matriz de valores
  });

  return valores;
}

  async function borraColumna(columnIndex) {

    const cabecera = document.getElementById("cabecera");
    const ths = cabecera.getElementsByTagName("th");
    const inputs = cabecera.getElementsByTagName("input");
    let indexborrar=inputs.length - 1;
    indexborrar=columnIndex+1;
    // Verificar si hay elementos en inputs y si el último elemento tiene un valor definido
    if (inputs.length > 0 && inputs[indexborrar].value !== undefined) {
      let info = inputs[indexborrar].value; //<-----ese index indica el num a borrar verificar arriba tmabien
        console.log(info)
      try {
        const resp = await fetch("http://localhost:3000/delColClasificatoria", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ info }), // Ajusta la clave del objeto JSON según la expectativa del servidor
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No se encontró un valor válido en el último input");
    }


    //Función para eliminar la última columna de la tabla
    const lastColumnIndex =columnIndex;
      //document.querySelectorAll("#cabecera th").length - 1;
    
      if(lastColumnIndex>3){
    document.querySelectorAll("#cabecera th")[lastColumnIndex].remove();

    document.querySelectorAll("#data tr").forEach((row) => {
      row.children[lastColumnIndex].remove();
    });
    }
    


  }

  function toggleColumnIndexInput() {
        showColumnIndexInput = !showColumnIndexInput;
    }
  
  function opcionesEdicion() {
    //Función para habilitar o deshabilitar la edición de los campos dentro de la columna
    editingEnabled = !editingEnabled;
    if (editingEnabled) {
      document.getElementById("editButton").innerText = "Guardar Datos";
      agregarcol=false;
    } else {
      document.getElementById("editButton").innerText = "Editar Datos";
      agregarcol=true;
    }
    editingEnabled ? habilitarEdicion() : deshabilitarEdicion();
  }

  function getColumnNames(obj) {
    console.log(obj)
    return obj ? Object.keys(obj) : [];
  }
</script>

<div class="justify-center items-center mb-32 mt-12 w-full h-128">
  <h1 class="font-semibold text-4xl align-center flex justify-center">
    Clasificatoria
  </h1>
  <div class="flex justify-center">
    <div class="overflow-y-auto max-h-80 mt-10 custom-scrollbar">
      <table
        class="table-auto bg-gray-300 text-dark-text font-bold mx-auto max-h-64 overflow-y-auto rounded-lg"
      >
        <thead class="bg-sportify">
          <tr id="cabecera">
            <th class="px-4 py-2 border-solid border-2">
              <input
                type="text"
                style="width: 100%; height: 35px; text-align: center; color: white; border: none; background: none;"
                value={"Id"}
                disabled={!editingEnabled}
              />
            </th>
            <th class="px-4 py-2 border-solid border-2">
              <input
                type="text"
                style="width: 100%; height: 35px; text-align: center; color: white; border: none; background: none;"
                value={"Nombre Equipo"}
                disabled={!editingEnabled}
              />
            </th>
            <th class="px-4 py-2 border-solid border-2">
              <input
                type="text"
                style="width: 100%; height: 35px; text-align: center; color: white; border: none; background: none;"
                value={"Staff"}
                disabled={!editingEnabled}
              />
            </th>
            <th class="px-4 py-2 border-solid border-2">
              <input
                type="text"
                style="width: 100%; height: 35px; text-align: center; color: white; border: none; background: none;"
                value={"Torneo"}
                disabled={!editingEnabled}
              />
            </th>
            <!-- Columnas dinámicas basadas en rows -->
            {#each getColumnNames(rows[0]) as column}
              {#if column !== "id" && column !== "nombre" && column !== "staff" && column !== "torneo" && column !== "descripcion" && column !== "deporte" && column !== "equipo"}
                <th class="px-4 py-2 border-solid border-2">
                  <input
                    type="text"
                    style="width: 100%; height: 35px; text-align: center; color: white; border: none; background: none;"
                    value={column}
                    disabled={!editingEnabled}
                  />
                </th>
              {/if}
            {/each}
          </tr>
        </thead>



        <tbody id="data" class="border px-4 py-2">
          {#each rows as row}
            <tr id="row" class="text-center text-black border-solid border-2">
              <td class="border-solid border-2">
                <input
                  type="text"
                  style="width: 100%; height: 35px; text-align: center; color: black; border: none; background: none;"
                  bind:value={row.id}
                  disabled={!editingEnabled}
                />
              </td>
              <td class="border-solid border-2">
                <input
                  type="text"
                  style="width: 100%; height: 35px; text-align: center; color: black; border: none; background: none;"
                  bind:value={row.nombre}
                  disabled={!editingEnabled}
                />
              </td>
              <td class="border-solid border-2">
                <input
                  type="text"
                  style="width: 100%; height: 35px; text-align: center; color: black; border: none; background: none;"
                  bind:value={row.staff}
                  disabled={!editingEnabled}
                />
              </td>
              <td class="border-solid border-2">
                <input
                  type="text"
                  style="width: 100%; height: 35px; text-align: center; color: black; border: none; background: none;"
                  bind:value={row.torneo}
                  disabled={!editingEnabled}
                />
              </td>
              {#each getColumnNames(row) as column}
                {#if column !== "id" && column !== "nombre" && column !== "staff" && column !== "torneo" && column !== "descripcion" && column !== "deporte" && column !== "equipo"}
                  <td class="border-solid border-2">
                    <input
                      type="text"
                      style="width: 100%; height: 35px; text-align: center; color: black; border: none; background: none;"
                      bind:value={row[column]}
                      disabled={!editingEnabled}
                    />
                  </td>
                {/if}
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  <div class="flex justify-center">
    <button
      class="ml-4 mt-4 bg-sportify h-10 w-32 text-white rounded-lg hover:text-gray-200"
      on:click={agregarCol}
    >
      Agregar Datos
    </button>

    <button
      id="editButton"
      class="ml-4 mt-4 bg-sportify h-10 w-32 text-white rounded-lg hover:text-gray-200"
      on:click={opcionesEdicion}
    >
      Editar Datos
    </button>

    <button
      class="px-3 ml-4 mt-4 bg-sportify h-10 w-auto text-white rounded-lg hover:text-gray-200"
      on:click={() => {
                toggleColumnIndexInput();
                borraColumna
            }}
    >
      Borrar Última Columna
    </button>

    {#if showColumnIndexInput}
    <div class="mt-2">
        <input id="columnIndex" type="number" min="1" placeholder="Índice de la columna" class="px-2 ml-2 mt-2 bg-sportify h-10 w-16 text-white rounded-lg hover:text-gray-200">
        <button
            class="px-3 ml-2 bg-red-500 text-white rounded-lg hover:text-gray-200"
            on:click={() => {
                const colIndexInput = document.getElementById("columnIndex");
                const colIndex = parseInt(colIndexInput.value, 10);
                if (!isNaN(colIndex) && colIndex > 0 && colIndex <= document.querySelectorAll("#cabecera th").length) {
                    borraColumna(colIndex - 1);
                    toggleColumnIndexInput(); // Oculta el input después de borrar la columna
                } else {
                    alert("Ingrese un índice válido");
                }
                colIndexInput.value = "";
            }}
        >
            Borrar
        </button>
    </div>
{/if}


  </div>
</div>

<style>
  /* Estilo del scrollbar */
  /* Ancho del scrollbar */
  .custom-scrollbar::-webkit-scrollbar {
    width: 10px;
  }

  /* Fondo del scrollbar */
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Thumb o barra de desplazamiento */
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }

  /* Thumb en estado hover */
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
</style>
