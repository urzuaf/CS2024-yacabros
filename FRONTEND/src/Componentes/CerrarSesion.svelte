<script>
    import { Usuario } from "../stores/login_store";

    function logout(){
        Usuario.set('')
        localStorage.clear('email')
        setTimeout(()=>{
            window.location.href = '/'
        }, 100)
    }
</script>
{#if $Usuario != ''}
<button on:click={logout} class="px-4 py-2 font-medium text-light-text dark:text-dark-text transform rounded-md hover:bg-light-input dark:hover:bg-dark-input trans">
    Cerrar Sesión
</button>
{/if}

<style>
    .trans{
        transition: .2s ease;
    }
    
</style>