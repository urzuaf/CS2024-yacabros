<script>
    import { Usuario } from "../stores/login_store";

    let show= false
    const eliminar = async () => {
        let email = $Usuario;

        const resp2 = await fetch("http://localhost:3000/delTorneo", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        if(resp2.ok){
            window.location.href = "/torneos"
        }
    };
    const open = () =>{
        show = !show
    }
</script>
<div class="relative">
    <button on:click={open} class="bg-red-600 text-white shadow-md hover:bg-red-700 p-2 rounded-lg">
        Borrar Torneo
    </button>
    {#if show}
    <div class="flex p-10 flex-col bg-light-background dark:bg-dark-background2 absolute z-40 border shadow-md gap-2">
            <h4>Estas seguro</h4>
            <div class="flex gap-2">
                <button class="bg-sportify cursor-pointer hover:bg-sportifyhover px-2 rounded" on:click={eliminar}>SI</button>
                <button class="bg-red-600 cursor-pointer hover:bg-red-700 px-2 rounded" on:click={open}>NO</button>
            </div>
        </div>
    {/if}
</div>