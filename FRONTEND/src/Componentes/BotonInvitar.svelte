<script>
    //import { Usuario } from "../stores/login_store";
    export let equipo = '';
    export let torneo = '';

    let enviado = false;

    async function handlePeticion() {
        if (equipo != "" && torneo != "") {
            const res = await fetch(
                "http://localhost:3000/insertTorneoEquipo",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ equipo, torneo }),
                },
            );
            if (!res.ok) {
                console.log("error al ingresar relacion torneo-equipo");
                return;
            }
            enviado = true
            setTimeout(()=>{
                enviado = false
            },8000)
            console.log("enviada correctamente");
        }
    }
</script>

<button
    type="button"
    disabled={equipo == ""}
    class="px-2 py-1 cursor-pointer font-medium text-white transition-all duration-300 transform bg-sportify rounded-lg hover:bg-sportify hover:scale-105"
    on:click={handlePeticion}>
    Invitar
</button>

{#if enviado}
    <div class="bg-sportify absolute bottom-8 p-2 px-4 z-50 a">
        <p>enviado con exito</p>
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