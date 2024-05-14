<script>
    //import { Usuario } from "../stores/login_store";
    export let equipo = "";
    import { Torneo } from "../stores/torneo_store";

    let torneo = $Torneo;
    let enviado = false;
    let error = false;

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
            console.log(res);
            if (!res.ok) {
                error = true
                console.log("error al ingresar relacion torneo-equipo");
                setTimeout(() => {
                    error = false;
                }, 8000);
                return;
            }
            enviado = true;
            setTimeout(() => {
                enviado = false;
            }, 8000);
            console.log("enviada correctamente");
        }
    }
</script>

<button
    type="button"
    disabled={equipo == ""}
    class="px-4 py-2 cursor-pointer font-medium text-white transition-all duration-300 transform bg-sportify rounded-lg hover:bg-sportifyhover"
    on:click={handlePeticion}
>
    Invitar
</button>

{#if enviado}
    <div class="bg-sportify absolute bottom-8 p-2 px-4 z-50 a text-white">
        <p>enviado con exito</p>
    </div>
{/if}
{#if error}
    <div class="bg-red-800 absolute bottom-8 p-2 px-4 z-50 a text-white">
        <p>
            Error al enviar, verifica que el equipo ingresado exista y que no
            este ingresado en este torneo actualmente
        </p>
    </div>
{/if}

<style>
    .a {
        right: -2000px;
        animation: appear 6s;
    }
    @keyframes appear {
        0% {
            right: -500px;
        }
        10% {
            right: 10px;
        }
        80% {
            right: 10px;
        }
        100% {
            right: -500px;
        }
    }
</style>
