<script>
    import { onMount } from "svelte";
    import { Usuario } from "../stores/login_store.js";

    let isOpen = false;
    //esto deberia ser el correo que se ingrese en el login no variables, guardarlo en una store
    let email = "";
    let data = [];
    let notify = false;
    console.log($Usuario + "en mount");

    onMount(() => {
        email = $Usuario;
        request();
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
        notify =
            data.filter((element) => {
                return element.estado == 'pendiente';
            }).length > 0;
    };
    const decision = async (id, des) => {
        fakeSol(id, des);
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

    function fakeSol(id, des) {
        let copy = data;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                if (des) {
                    copy[i].estado = "aceptado";
                } else {
                    copy[i].estado = "rechazado";
                }
                break;
            }
        }
        data = [...copy];
    }
</script>

<div class="flex justify-center flex-col w-fit p-2 gap-2 relative">
    <button
        on:click={() => {
            isOpen = !isOpen;
        }}
        class="hidden mx-4 transition-colors duration-300 transform lg:block text-light-border dark:text-dark-border hover:text-light-text hover:dark:text-dark-text"
        aria-label="show notifications"
    >
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
        <div
            class="absolute top-10 right-0 trans bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text border shadow-md p-2 w-64 overflow-y-scroll max-h-96 z-50"
        >
            {#if $Usuario == ''}
                <p class="text-center">Inicia sesión para ver tus notificaciones</p>
            {/if}
            {#if data.length == 0 && $Usuario != ""}
                <p class="text-center">No hay notificaciones</p>
            {/if}
            {#each data as noti}
                <div
                    class="border-b p-2 gap-4 flex flex-col justify-between items-center"
                >
                    <div>
                        <p class="font-bold">{noti.descripcion}</p>
                        <p class="font-light">{noti.emisor}</p>
                    </div>
                    {#if noti.estado == "pendiente"}
                        <div>
                            <button
                                class="bg-sportify p-1 rounded"
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