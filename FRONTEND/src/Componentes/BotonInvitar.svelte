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
    class="px-4 py-2 font-medium text-white transition-all duration-300 transform bg-green-600 rounded-lg hover:scale-105"
    on:click={handlePeticion}>Invitar Equipo</button
>
