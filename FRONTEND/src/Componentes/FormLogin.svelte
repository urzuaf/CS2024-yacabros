<script>
  import { Usuario } from "../stores/login_store";

  let email = "",
    password = "";

  async function handleSubmit() {
    let rows;
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    //console.log(response + " jolaaaaa");

    if (!response.ok) {
      console.log("Error al obtener los datos del servidor");
      return;
    }
    rows = await response.json();
    console.log(rows)
    if (rows.length > 0) {
      //guardamos el email del usuario para hacer consultas en otros componentes o paginas
      localStorage.setItem("email", JSON.stringify(rows[0].email));
      Usuario.set(rows[0].email);

      console.log("Datos recibidos:", rows);
      console.log($Usuario);
      redirect();
    }
    else{
      console.log("datos erroneos")
    }
    // verify(rows);
  }

  /* esta funcion es innecesaria o no?, ya se comprueba en la bd, esto es medio redundante
  function verify(rows) {
    var find=false;
    rows.forEach((elem) => {
      if (elem.email == email && elem.password == password) {
        console.log("Bienvenido");
        find=true;
        return;
      }
    });

        console.log(email);

    if(!find)
        console.log("Datos Incorrectos");
  }

*/
  function redirect() {
    //movi la redirección aqui
    window.location.href = "/";
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4 my-4">
  <div class="min-w-72">
    <input
      type="email"
      id="email"
      placeholder="Correo electrónico"
      class="w-full px-4 py-2 bg-white dark:bg-gray-800 border rounded-lg border-gray-400 dark:border-gray-600 focus:border-green-600 focus:ring-green-600 focus:outline-none focus:ring focus:ring-opacity-40"
      bind:value={email}
    />
  </div>

  <div class="min-w-72">
    <input
      type="password"
      placeholder="Contraseña"
      class="w-full px-4 py-2 bg-white dark:bg-gray-800 border rounded-lg border-gray-400 dark:border-gray-600 focus:border-green-600 focus:ring-green-600 focus:outline-none focus:ring focus:ring-opacity-40"
      bind:value={password}
    />
  </div>

  <!-- Boton de Ingresar -->
  <button
    id="usuario"
    class="w-full px-6 py-2 font-medium text-white transition-all duration-300 transform bg-green-600 rounded-lg hover:scale-105"
    type="submit"
  >
    Ingresar
  </button>
</form>
