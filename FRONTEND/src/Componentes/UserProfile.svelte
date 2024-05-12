<script>
    import { Usuario } from "../stores/login_store";
    import { onMount } from 'svelte';
    let isOpen = false;
    let userProfile = {
        name: "",
        email: $Usuario
    };

    onMount(async () =>{
        try{
            const resp = await fetch("http://localhost:3000/getUsername", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userProfile.email }), // Envía el correo electrónico en el cuerpo de la solicitud
            });
            if (!resp.ok)
                throw new Error("Error al obtener los datos del servidor");

            const result = await resp.json();
            
            if (result.length > 0) {
                userProfile.name = result[0].username; 
            }

        }catch(error){
            console.log("Error: ",error);
        }
    });
</script>

{#if userProfile.email != ''}
    <h1 class="mt-2 ml-3 text-2xl font-bold" style="margin-left: 5vw; text-size:15px; margin-top:3vh"><b>Bienvenido {userProfile.name}</b></h1>
{/if}