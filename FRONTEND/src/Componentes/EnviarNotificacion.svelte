
<script>
    import { Usuario } from "../stores/login_store";
    import { onMount } from "svelte";
    let destinatario = ""
    let desc = ""
    let email = "";
    let data = [];
    let notify = false;
    let isOpen = false;
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
<button
        on:click={() => {
            isOpen = !isOpen;
        }}
        class="hidden mx-4 transition-colors duration-300 transform lg:block text-light-border dark:text-dark-border hover:text-light-text hover:dark:text-dark-text"
        aria-label="show notifications">
        <svg
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
        {#if notify}
            <div class="w-2 h-2 rounded-full bg-red-500 absolute top-0 right-0 ">
                .
            </div>
        {/if} 
</button>
{#if isOpen}
    {#if $Usuario != ''}
        <div class=" flex flex-col justify-center items-center p-2 gap-2"> 
            <h2 class="font-bold text-lg">Enviar Notificación</h2>
            <form on:submit|preventDefault={handleSubmit} class="flex-col flex w-80 gap-2 ">
                <span class="font-semibold">Destinatario </span>
               <input required type="email" bind:value={destinatario} placeholder="destinatario@mail.com" class="border p-2 rounded bg-light-input dark:bg-dark-input" />
                <span class="font-semibold">Mensaje </span>
                <textarea required bind:value={desc} placeholder="Ingresa el mensaje que quieres enviar" class="border p-2 rounded bg-light-input dark:bg-dark-input"></textarea>
                <button disabled={enviado.exito} type="submit" class=" px-2 py-2 bg-sportify text-dark-text font-semibold rounded disabled:opacity-90 disabled:bg-gray-100 disabled:cursor-wait hover:scale-105">
                Enviar</button>
                            
            </form>
            {#if enviado.exito}
                <div class="bg-sportify text-dark-text absolute bottom-8 p-2 px-4 z-50 a">
                    <p>Tu mensaje ha sido enviado con exito</p>
                </div>
            {/if}
                    
        </div>
    {/if}
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