<script>
    import FormBases from './FormBases.svelte'
    import Botondatos from './Botondatos.svelte'
    import BuscadorEquipos from './buscadorEquipos.svelte'
    import FormClasificatoria from './FormClasificatoria.svelte'
    import DatosTorneo from './DatosTorneo.svelte'
    import Bracket from './Bracket.svelte'

    import { Torneo } from '../stores/torneo_store';
    import { onMount } from 'svelte';
    
    let nombreTorneo = ''

    onMount(async()=>{
        nombreTorneo = $Torneo
        console.log('aqui ' + nombreTorneo)
    })


</script>
<header class="flex justify-between items-center px-10 py-6 w-full text-nowrap border-b border-light-border dark:border-dark-border">
    <div class="flex flex-col md:flex-row gap-2">
      <FormBases />
      <Botondatos />
    </div>
    <BuscadorEquipos />
  </header>
  <DatosTorneo nombreTorneo={nombreTorneo} />
  <FormClasificatoria />
  <Bracket />