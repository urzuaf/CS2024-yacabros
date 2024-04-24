
<script>
    import { Usuario } from "../stores/login_store";
    let destinatario = ""
    let desc = ""

    let enviado = {
        exito:false,
        tried: false
    }

    async function handleSubmit (){
        let emisor = $Usuario
        
        const res = await fetch("http://localhost:3000/sendn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ desc, destinatario, emisor }),
        });
        if (!res.ok) {
            console.log("error");
            console.log(res);
            enviado.exito = false
            return;
        }
        console.log("enviada correctamente")
        enviado.exito = true
        setTimeout(()=>{
            enviado.exito = false
        }, 8000)
    }

</script>

{#if $Usuario != ''}
<div class=" flex flex-col justify-center items-center p-2 gap-2"> 
<h2 class="font-bold text-lg">Enviar Notificacion</h2>
    <form on:submit|preventDefault={handleSubmit} class="flex-col flex w-80 gap-2 ">
        <span class="font-semibold">Destinatario </span>
        <input required type="email" bind:value={destinatario} placeholder="destinatario@mail.com" class="border p-2 rounded" />
        <span class="font-semibold">Mensaje </span>
        <textarea required bind:value={desc} placeholder="Ingresa el mensaje que quieres enviar" class="border p-2 rounded"></textarea>
        <button disabled={enviado.exito} type="submit" class=" px-2 py-2 bg-emerald-600 rounded disabled:opacity-90 disabled:bg-gray-100 disabled:cursor-wait">
            Enviar</button>
         
    </form>
    {#if enviado.exito}
    <div class="bg-emerald-500 absolute bottom-8 p-2 px-4 z-50 a">
        <p>Tu mensaje ha sido enviado con exito</p>
    </div>
    {/if}
</div>
{/if}

<style>
    .a{
        right: -2000px;
        animation: appear 6s ;
    }
    @keyframes appear{
        0%{
            right: -500px;
        }
        10%{
            right: 10px;
        }
 80%{
            right: 10px;
        }
        100%{
            right: -500px;
        }
    }
    
</style>