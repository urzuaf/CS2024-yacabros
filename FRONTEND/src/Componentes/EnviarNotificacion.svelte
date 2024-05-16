
<script>
    import { Usuario } from "../stores/login_store";
    import { onMount } from "svelte";
    let destinatario = ""
    let desc = ""
    let email = "";
    let data = [];
    let notify = false;

    let showSending;
    let dialogSending;
    $: if (dialogSending && showSending) dialogSending.showModal();

    onMount(() => {
        email = $Usuario;
        request();
        setInterval(() => {
            request();
        }, 5000);
    });
    

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
    const request = async () => {
        const res = await fetch("http://localhost:3000/notificacion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        if (!res.ok) {
            console.log("error");
            console.log(res);
            return;
        }
        data = await res.json();
        data = [...data];
        notify =
            data.filter((element) => {
                return element.estado == 'pendiente';
            }).length > 0;
    };
    

    
</script>

<!-- Botón de Notificaciones -->
<button on:click={()=>{showSending = true}} class="w-auto px-6 py-2 font-medium text-dark-text transition-all duration-300 transform bg-sportify rounded-lg hover:bg-sportifyhover">
    <p>Enviar Mensaje</p>
</button>

<!-- Modal Enviar Mensaje -->
{#if $Usuario != ''}
<dialog 
    bind:this={dialogSending}
    on:close={() => (showSending = false)}
    class="w-full h-70 bg-transparent"
>
    <div class="flex justify-center items-center w-full h-full">
        <form on:submit|preventDefault={handleSubmit} class="flex flex-col items-center gap-4 my-4 w-3/5 py-4 px-40 bg-light-background dark:bg-dark-background border rounded-lg border-light-border dark:border-dark-border">
            <div class="flex flex-col w-full justify-center items-center gap-2 text-light-text dark:text-dark-text"> 
                <form on:submit|preventDefault={handleSubmit} class="flex-col flex w-full gap-2 ">
                    <div class="flex justify-center text-wrap">
                        <h2 class="text-2xl font-bold text-center text-light-text dark:text-dark-text">Enviar Mensaje</h2>
                    </div>
                    <span class="font-semibold">Destinatario</span>
                    <input required type="email" bind:value={destinatario} placeholder="destinatario@mail.com" 
                        class="w-full px-4 py-2 bg-light-input dark:bg-dark-input border rounded-lg border-light-border dark:border-dark-border focus:border-sportify focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    <span class="font-semibold">Mensaje</span>
                    <textarea required bind:value={desc} placeholder="Ingresa el mensaje que quieres enviar" class="w-full px-4 py-2 bg-light-input dark:bg-dark-input border rounded-lg border-light-border dark:border-dark-border focus:border-sportify focus:ring-sportify focus:outline-none focus:ring focus:ring-opacity-40"></textarea>
                
                </form>
                {#if enviado.exito}
                    <div class="bg-sportify text-dark-text absolute bottom-8 p-2 px-4 z-50 a">
                        <p>Tu mensaje ha sido enviado con exito</p>
                    </div>
                {/if}
                        
            </div>

            <div class="w-full flex justify-center md:justify-between flex-wrap gap-3">
                <button
                    on:click={() => dialogSending.close()}
                    type="submit" aria-label="save bases modal"
                    class="w-2/5 min-w-fit px-4 py-2 font-medium text-dark-text trans bg-sportify rounded-lg hover:bg-sportifyhover"
                >
                    Confirmar
                </button>
                <button 
                    on:click={() => dialogSending.close()}
                    type="button" aria-label="close bases modal"
                    class="w-2/5 min-w-fit px-4 py-2 font-medium text-dark-text trans bg-sportify rounded-lg hover:bg-sportifyhover"
                >
                    Cancelar
                </button>
            </div>
        </form>
    </div>
</dialog>
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