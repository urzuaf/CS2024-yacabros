<script>
    import { onMount } from 'svelte';

    let rows = [];

    onMount( async () => {
        console.log("holaA");
        try{
            console.log("hola");
            const resp = await fetch("http://localhost:3000/getTorneos");
            if (!resp.ok)
                throw new Error("Error al obtener los datos del servidor");

            rows = await resp.json();
            console.log("Datos recibidos:", rows);

        }catch(error){
            console.log("Error: ",error);
        }
    });
    
    
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
          <tr>
            <td class="border px-4 py-2">Intro to CSS</td>
            <td class="border px-4 py-2">Adam</td>
            <td class="border px-4 py-2">858</td>
          </tr>

        </tbody>
      </table>
    
