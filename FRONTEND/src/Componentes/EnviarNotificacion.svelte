
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
            return;
        }
        console.log("enviada correctamente")
        enviado.exito = true
    }

</script>

<div>
 
    <form on:submit|preventDefault={handleSubmit} class="border flex-col flex w-fit">
        <input bind:value={destinatario} placeholder="destinatario@mail.com" class="border p-2" />
        <textarea bind:value={desc} placeholder="Ingresa el mensaje que quieres enviar" class="border p-2"></textarea>
        <button type="submit" class=" px-2 py-1">Enviar</button>
         
    </form>
    {#if enviado.exito}
        <p>Tu mensaje ha sido enviado con exito</p>
    {/if}
</div>