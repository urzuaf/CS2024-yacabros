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

<div class="flex">
    <input id="searchbox" autocomplete="off" on:input={search} on:keydown={onEnter} type="text" placeholder="Invitar un equipo al torneo" class="w-60 px-4 py-2 border-2 rounded-lg text-black hover:border-sportify p-4" bind:value={campo}>

    <div class="absolute bg-white-700 my-11 inline-block max-h-24 w-60 overflow-y-auto ">
        {#if mostrar && campo.length!=0}
            <ul class="w-full">
                {#each rows as row}
                    <li class="w-full hover:bg-white hover:text-black hover:border-sportify border-2 h-6">
                        <label class="w-full">
                            <span class="">{""+row.nombre}</span>
                            <input id="check" class="form-checkbox h-0 w-full flex" type="checkbox" bind:checked={row.selected} on:click={() => {campo=row.nombre;mostrar=false;rowSelect=row;console.log("SE HA SELECCIONADO ROW: ",row)}} >
                        </label>
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
    <BotonInvitar torneo="Torneo1" equipo={campo} />
</div>

