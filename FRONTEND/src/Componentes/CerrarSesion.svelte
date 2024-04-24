<script>
    import { Usuario } from "../stores/login_store";

    function logout(){
        Usuario.set('')
        localStorage.clear('email')
        setTimeout(()=>{
            window.location.href('/')
        }, 100)
    }
</script>
{#if $Usuario != ''}
<button on:click={logout} class="p-1 text-emerald-700 dark:text-emerald-400 rounded mx-1 hover:underline hover:text-emerald-600 hover:dark:text-emerald-500 trans">
    Cerrar sesión
</button>
{/if}

<style>
    .trans{
        transition: .2s ease;
    }
    
</style>