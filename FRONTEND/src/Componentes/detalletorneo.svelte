<script>
    import FormBases from './FormBases.svelte'
    import BuscadorEquipos from './buscadorEquipos.svelte'
    import FormClasificatoria from './FormClasificatoria.svelte'
    import DatosTorneo from './DatosTorneo.svelte'
    import Bracket from './Bracket.svelte'
    import { Usuario } from "../stores/login_store";
    import { Torneo } from '../stores/torneo_store';
    import { onMount } from 'svelte';
    let userProfile = {
      email: $Usuario,
      rol: ""
    }
    
    let nombreTorneo = ''

    onMount(async()=>{
        nombreTorneo = $Torneo
        getRol()
        console.log('aqui ' + nombreTorneo)

    })

    const getRol = async () => {
      const resp2 = await fetch("http://localhost:3000/getRol", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userProfile.email }), // Envía el correo electrónico en el cuerpo de la solicitud
      });

      if (!resp2.ok)
        throw new Error("Error al obtener los datos del servidor");

      const result2 = await resp2.json();

      if (result2.length > 0) {
        userProfile.rol = result2[0].rol; 
      }
    };
</script>

{#if userProfile.rol == "creador"}
<header class="flex justify-between items-center px-10 py-6 w-full text-nowrap border-b border-light-border dark:border-dark-border">
    <div class="flex flex-col md:flex-row gap-2">
      <FormBases />
      <button
        type="button"
        class="px-4 py-2 font-medium text-dark-text transition-all duration-300 transform bg-sportify rounded-lg hover:bg-sportifyhover"
        onclick="cambiarDatos()">Cambiar Datos</button
      >
    </div>
    <BuscadorEquipos />
  </header>
  <DatosTorneo nombreTorneo={nombreTorneo} />
  <FormClasificatoria />
  <Bracket />
{/if}

{#if userProfile.rol != "creador"}
<header class="flex justify-between items-center px-10 py-6 w-full text-nowrap border-b border-light-border dark:border-dark-border">
    <div class="flex flex-col md:flex-row gap-2">
      <FormBases />
      <button
        type="button"
        class="px-4 py-2 font-medium text-dark-text transition-all duration-300 transform bg-sportify rounded-lg hover:bg-sportifyhover"
        onclick="cambiarDatos()">Cambiar Datos</button
      >
    </div>
    <BuscadorEquipos />
  </header>
  <DatosTorneo nombreTorneo={nombreTorneo} />
  <FormClasificatoria />
  <Bracket />
{/if}