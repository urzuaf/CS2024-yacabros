<script>   
    import { onMount } from "svelte";
    import { Usuario } from "../stores/login_store";
    let staff=$Usuario;
    let equipos = []
    onMount(async () => {
        try {
            const response = await fetch("http://localhost:3000/equipos", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ staff })
            });
            if (!response.ok){
                throw new Error("Error al obtener equipo");
            }
            const data = await response.json();
            equipos = [...data];
            console.log("Equipo obtenido:", data);
        }
        catch (error) {
            console.error("Error: "+error);
        }
    });
    
</script>



<div>
    {#if equipos.length >0}
        
        
    {/if}
</div>


