<script>
    import { onMount } from "svelte";
    import { Torneo } from "../stores/torneo_store";
    let list = [];

    onMount(() => {
        getTorneos();
    });

    const getTorneos = async () => {
        const response = await fetch("http://localhost:3000/getTorneos");
        const res = await response.json();
        console.log(res);
        if (res.length > 0 && res.length != undefined) {
            list = [...res];
        }
    };

    const handleClick = (name) => {
        localStorage.setItem('torneo', JSON.stringify(name))
        Torneo.set(name)

    }
    
    function redirect(){
        window.location.href = '/detalletorneo'

    }

</script>

<section class="w-11/12 pb-20 m-auto">
    <h1 class="text-center text-3xl py-8 font-bold ">Lista de torneos</h1>
    {#if list.length > 0}
        <div href="/torneos" class="flex justify-center items-center gap-8 ">
            {#each list as torneo}
                <a href="/detalletorneo" on:focus={()=>handleClick(torneo.nombre)} on:mouseover={()=>handleClick(torneo.nombre)} class="w-1/6 shadow-lg p-4 flex flex-col gap-4 border hover:scale-105 transition-transform">
                    <img src="/torn.png" alt="imagen torneo" class="w-full" />
                    <div class="flex flex-col">

                        <h2 class="font-bold text-xl text-center">{torneo.nombre}</h2>
                        <h3 class="text-center text-gray-900">{torneo.premio}</h3>
                        <h2 class="text-center">{torneo.deporte}</h2>
                        <h4 class="text-center font-light ">{torneo.creador}</h4>
                    </div>
                </a>
            {/each}
        </div>
    {/if}
</section>
