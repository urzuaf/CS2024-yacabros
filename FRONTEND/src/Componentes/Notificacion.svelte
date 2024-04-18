<script>
    import { onMount } from "svelte";
    import {Usuario} from '../stores/login_store.js'

    let isOpen = false;
    //esto deberia ser el correo que se ingrese en el login no variables, guardarlo en una store
    let email = "";
    let data = [];
    console.log($Usuario + "en mount")
    
    
    onMount(() => {
        email = $Usuario
        request()
        setInterval(() => {
            request();
        }, 5000);
    });

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
    };
    const decision = async (id, des) => {
        fakeSol(id,des);
        const res = await fetch("http://localhost:3000/decision", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, des }),
        });
        if (!res.ok) {
            console.log("error");
            console.log(res);
            return;
        }
    };

    function fakeSol (id, des) {
        let copy = data
        for(let i=0; i<data.length; i++){
            if(data[i].id == id){
                if(des){
                    copy[i].estado = "aceptado"
                }
                else{
                    copy[i].estado = "rechazado"
                }
                break;
            }
        }
        data = [...copy]
    }

</script>

<div class="flex justify-center flex-col w-fit p-2 gap-2 relative">
    <button
        class="bg-green-500 p-2 rounded shadow-lg shadow-gray-200 hover:shadow-md trans disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-500 disabled:shadow-none"
        on:click={() => {
            isOpen = !isOpen;
        }}
        disabled={data.length <= 0}>Notificaciones</button
    >
    {#if isOpen}
        <div
            
            class="absolute top-10 trans bg-white border shadow-md p-2 w-64 overflow-y-scroll max-h-96"
        >
            {#each data as noti}
                <div
                    class="border-t p-2 gap-4 flex flex-col justify-between items-center"
                >
                    <div>
                        <p class="font-bold">{noti.descripcion}</p>
                        <p class="font-light">{noti.emisor}</p>
                    </div>
                    {#if noti.estado == "pendiente"}
                        <div>
                            <button
                                class="bg-green-500 p-1 rounded"
                                on:click={() => decision(noti.id, true)}
                                >Aceptar</button
                            >
                            <button
                                class="bg-red-500 p-1 rounded"
                                on:click={() => decision(noti.id, false)}
                                >Rechazar</button
                            >
                        </div>
                    {:else if noti.estado == "aceptado"}
                        <strong>Aceptado</strong>
                    {:else}
                        <strong>Rechazado</strong>
                    {/if}
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .trans {
        transition: 0.3s ease;
    }
</style>
