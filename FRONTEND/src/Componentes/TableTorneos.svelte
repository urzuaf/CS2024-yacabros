<script>
    import { onMount } from 'svelte';

    let rows = [];

    onMount(async () =>{
        try{
            const resp = await fetch("http://localhost:3000/getTorneos");
            if (!resp.ok)
                throw new Error("Error al obtener los datos del servidor");

            rows = await resp.json();
            console.log("Datos recibidos:", rows);
            console.log(rows[0].id);

            addRow();

        }catch(error){
            console.log("Error: ",error);
        }
    });


    let table="";
    function addRow(){
        let data= document.getElementById("data");
        

        rows.forEach(e => {
        
            table += '<tr>';
                table+='<td class="border px-4 py-2">'+e.id+'</td>';
                table+='<td class="border px-4 py-2">'+e.creador+'</td>';
                table+='<td class="border px-4 py-2">'+e.nombre+'</td>';
                table+='<td class="border px-4 py-2">'+e.deporte+'</td>';
                table+='<td class="border px-4 py-2">'+e.formato+'</td>';
                table+='<td class="border px-4 py-2">'+e.finicio+'</td>';
                table+='<td class="border px-4 py-2">'+e.ftermino+'</td>';
            table+='</tr>';
        });
        
    }
    
    
</script>

  

    <table class="table-auto">
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

        <tbody id=data>
            {#each table as item}
                {item}
            {/each}
          <tr>
            <td class="border px-4 py-2">Intro to CSS</td>
            <td class="border px-4 py-2">Adam</td>
            <td class="border px-4 py-2">858</td>
          </tr>

        </tbody>
      </table>
    
