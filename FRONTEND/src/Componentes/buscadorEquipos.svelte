<script>
    import { onMount } from 'svelte';
  import { Usuario } from '../stores/login_store';
  import BotonInvitar from './BotonInvitar.svelte';

    let rows = [];
    let mostrar;
    let email = "";
    let rowSelect=[];

    onMount(async () =>{
        try{
            const resp = await fetch("http://localhost:3000/equipos");
            if (!resp.ok)
                throw new Error("Error al obtener los datos del servidor");

            rows = await resp.json();
            console.log(rows);
        }catch(error){
            console.log("Error: ",error);
        }

        email = $Usuario;
        console.log(email);

    });
    
    let campo="";
    let filtrado="";

    function search(){
        if(campo.length>0){mostrar=true;}
        else{mostrar=false;}
        //console.log($Usuario);
        //console.log(rows);
       //filtrar rows
        ordenarRows();
        
    }

    function onEnter(event){
        //console.log(event.key);
        if (event.key === "Tab") {
            filtrarIDorNombreExacto(campo);
        }else return
    }

    function ordenarRows(){
        //ordenar por id
        for(var i=0;i<rows.length;i++){
            for(var j=i+1;j<rows.length;j++){
                //console.log(rows[i].id+" "+rows[j].id)
                if(rows[i].id<rows[j].id){
                    var aux=rows[i];
                    rows[i]=rows[j];
                    rows[j]=aux;
                    //console.log("cambio!");
                }
            }    
        }

        //dejar los similes
        //console.log("---------------------");
        for(var i=0;i<rows.length;i++){
            for(var j=i+1;j<rows.length;j++){
                //console.log(rows[i].id+" "+rows[j].id)
                
               // console.log(rows[i].nombre+" "+similitud(rows[i].nombre));
                if(similitud(rows[i].nombre)<similitud(rows[j].nombre)){
                    var aux=rows[i];
                    rows[i]=rows[j];
                    rows[j]=aux;
                    //console.log("cambio!");
                }
            }    
        }

    }

    //devuelve el num de cuanto es similar
    function similitud(text){
        var simil=0;

        for(var i=0;i<campo.length;i++){
            for(var j=i;j<campo.length;j++)//es mejor volver usar el campo para ver los hits independiente de la posicion
                if(campo.toLowerCase().charAt(j)==text.toLowerCase().charAt(i)){
                    simil++;
                }
        }

        if(simil<text.length*.2) return 0;

        return simil;
    }

    function esSoloNumeros(texto) {
        return /^\d+$/.test(texto);
    }



    function filtrarIDorNombreExacto(text){
        campo=rows[0].nombre;
        rowSelect=rows[0];
        
        if(!esSoloNumeros) return;
        let numero = parseInt(text);

        for(var i=0;i<rows.length;i++){
            if(numero==rows[i].id){
                campo=rows[i].nombre;
                rowSelect=rows[i];
            }  
        } 

        console.log("SE HA SELECCIONADO ROW: ",rowSelect)
        mostrar=false;
    }

    
   
    
</script>

<div class="flex justify-start items-center gap-2">
    <input 
        id="searchbox" autocomplete="off" on:input={search} on:keydown={onEnter} type="text" placeholder="Invitar un equipo al torneo" 
        class="w-56 px-4 py-2 border rounded-lg border-light-border dark:border-dark-border bg-light-input dark:bg-dark-input text-light-text dark:text-dark-text hover:border-sportify outline-none focus:border-sportify" bind:value={campo}
    >
    <BotonInvitar torneo="Torneo1" equipo={campo} />
</div>

{#if mostrar && campo.length!=0}
<div class="absolute right-32 top-36 max-h-32 w-56 overflow-y-auto border rounded-md border-light-border dark:border-dark-border custom-scrollbar">
    <ul class="w-full bg-light-background dark:bg-dark-background2">
        {#each rows as row}
            <li class="w-full hover:bg-sportify dark:hover:bg-dark-input">
                <button  class="form-checkbox w-full flex" on:click={() => {campo=row.nombre;mostrar=false;rowSelect=row;console.log("SE HA SELECCIONADO ROW: ",row)}}>
                    <span class="w-0 ml-2">{row.nombre}</span>
                </button>    
            </li>
        {/each}
        
    </ul>
</div>
{/if}

<style>
    /* Estilo del scrollbar */
    /* Ancho del scrollbar */
    .custom-scrollbar::-webkit-scrollbar {
      width: 10px;
    }
  
    /* Fondo del scrollbar */
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
  
    /* Thumb o barra de desplazamiento */
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 5px;
    }
  
    /* Thumb en estado hover */
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  </style>

