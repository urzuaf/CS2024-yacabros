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
                td.style.border = "1px solid black";
                td.style.textAlign="center"
                tr.appendChild(td);
            });
            
            data.appendChild(tr);
        });
    }
    
    
</script>

  
<div class="flex justify-center ">
<table class="table-auto fixed flex-row bg-green-600 text-white max-h-80 font-bold overscroll-contain mx-auto">
    <thead>
        <tr>
            <th class="px-4 py-2">Id</th>
            <th class="px-4 py-2">Creador</th>
            <th class="px-4 py-2">Nombre</th>
            <th class="px-4 py-2">Deporte</th>
            <th class="px-4 py-2">Formato</th>
            <th class="px-4 py-2">Fecha de Inicio</th>
            <th class="px-4 py-2">Fecha de Cierre</th>
        </tr>
    </thead>

    <tbody id=data class="border px-4 py-2">
    </tbody>

</table>
</div>
