<script>
    import { onMount } from 'svelte';

    let rows = [];

    onMount(async () =>{
        try{
            const resp = await fetch("http://localhost:3000/getTorneos");
            if (!resp.ok)
                throw new Error("Error al obtener los datos del servidor");

            rows = await resp.json();
            //console.log("Datos recibidos:", rows);
            //console.log(rows[0].id);

            addRow();

        }catch(error){
            console.log("Error: ",error);
        }
    });


    let table="";
    function addRow(){
        let data= document.getElementById("data");
        

        rows.forEach(row => {
            let tr = document.createElement("tr");
            const cells = ["id", "creador", "nombre", "deporte", "formato", "finicio", "ftermino"];
            cells.forEach(cell => {
                const td = document.createElement("td");
                td.textContent = row[cell];
                td.style.border = "2px solid white";
                td.style.textAlign="center";
                td.style.height="35px";
                tr.appendChild(td);
            });
            //class="text-center text-black border-solid border-2"
            tr.style.color="black";
            tr.style.textAlign="center";
            tr.style.border="solid";
            tr.style.borderWidth="1px";

            data.appendChild(tr);
        });
    }
    
    
</script>

  
<div class="flex justify-center h-64  mt-10">
    <div class="w-auto">
        <h1 class="font-semibold text-4xl align-center flex justify-center">Torneos Creados</h1>
        <div class="max-h-44 overflow-y-auto mt-10 custom-scrollbar">
            <table class="table-auto bg-gray-300 text-dark-text font-bold mx-auto max-h-64 overflow-y-auto rounded-lg">
                <thead class="bg-sportify">
                    <tr>
                        <th class="px-4 py-2 border-solid border-2">Id</th>
                        <th class="px-4 py-2 border-solid border-2">Creador</th>
                        <th class="px-4 py-2 border-solid border-2">Nombre</th>
                        <th class="px-4 py-2 border-solid border-2">Deporte</th>
                        <th class="px-4 py-2 border-solid border-2">Formato</th>
                        <th class="px-4 py-2 border-solid border-2">Fecha de Inicio</th>
                        <th class="px-4 py-2 border-solid border-2">Fecha de Cierre</th>
                    </tr>
                </thead>
            
                <tbody id=data class="px-4 py-2 border-solid border-2">
                    
                </tbody>
            
            </table>
        </div>
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