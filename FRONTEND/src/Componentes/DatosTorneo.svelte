<script>
import { onMount } from "svelte";
export let nombreTorneo = ''
let info = null

onMount(()=>{
  getTorneo()
  console.log("on mount dtorneo")
})

async function getTorneo() {
    console.log("here")
    const res = await fetch("http://localhost:3000/getTorneo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombreTorneo }),
    });

    if (!res.ok) {
      console.log("error al ingresar relacion torneo-equipo");
      return;
    }
    let data = await res.json()
    console.log(data)
    info = data[0]
    console.log("torneo cargado correctamente");

}

</script>

{#if info!=null}
  
<div class="flex flex-col justify-center items-center p-4 gap-2 text-center ">
  <h1 class="text-4xl font-bold">{info.nombre} </h1>
  <div>
    <p class="font-semibold">Premio: {info.premio}</p>
    <p class="font-semibold">Deporte: {info.deporte}</p>
  </div>
  <div>
    <p class="">Fecha inicio: {info.finicio}</p>
    <p class="">Fecha inicio: {info.ftermino}</p>
  </div>
  <p>
    {info.bases}
  </p>
</div>
{/if}