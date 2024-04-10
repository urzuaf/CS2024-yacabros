<script>
  let email = "",
    password = "";

  async function handleSubmit() {
    let rows;
    try {
      const response = await fetch("http://localhost:3000/");
      //console.log(response + " jolaaaaa");

      if (!response.ok)
        throw new Error("Error al obtener los datos del servidor");

      rows = await response.json();
      console.log("Datos recibidos:", rows);
      
    } catch (error) {
      console.error("Error:", error);
    }

    verify(rows);
  }

  function verify(rows) {
    var find=false;
    rows.forEach((elem) => {
      if (elem.email == email && elem.password == password) {
        console.log("Bienvenido");
        find=true;
        return;
      }
    });
    if(!find)
        console.log("Datos Incorrectos");
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

  <button
    class="w-full px-6 py-2 font-medium text-white transition-all duration-300 transform bg-green-600 rounded-lg hover:scale-105"
    type="submit"
  >
    Ingresar
  </button>
</form>
