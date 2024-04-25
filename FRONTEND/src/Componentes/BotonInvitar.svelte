<script>
    //import { Usuario } from "../stores/login_store";
    export let equipo = '';
    export let torneo = '';

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
            console.log("enviada correctamente");
        }
    }
</script>

<button
    type="button"
    disabled={equipo == ""}
    class="px-2 py-1 font-medium text-white transition-all duration-300 transform bg-emerald-500 rounded-lg hover:bg-emerald-600"
    on:click={handlePeticion}>Invitar</button
>
