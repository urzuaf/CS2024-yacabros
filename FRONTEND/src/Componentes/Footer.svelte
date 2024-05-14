<script>
    let footerNavs = [
      { href: "/torneo", name: 'Torneo' },
      { href: '/noticias', name: 'Noticias' },
      { href: '/FormularioForo', name: 'Foros' },
    ];
  </script>
  <footer class="flex flex-col bg-light-gradient dark:bg-dark-background2 px-4 py-5 w-full mx-auto md:px-8 mt-auto border-t border-light-border dark:border-dark-border">
    <div class="max-w-lg sm:mx-auto sm:text-center">
      <a href="/">
        <img src="/sportify-favicon.svg" class="w-20 sm:mx-auto" alt="Logo"/>
      </a>
    </div>
    <ul class="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
      {#each footerNavs as item, idx}
        <li>
          <a href={item.href} class="px-2 py-2 transition-colors duration-300 transform rounded-md hover:bg-light-input dark:hover:bg-dark-input">
            {item.name}
          </a>
        </li>
      {/each}
    </ul>
    <div class="mt-8 items-center flex-col-reverse gap-2 sm:flex">
      <div class="mt-4 sm:mt-0 m-auto">
        2024 Sportify derechos reservados.
      </div>
      <div class="mt-6 sm:mt-0">
        <ul class="flex items-center space-x-4">
          <li class="w-10 h-10 border-0 rounded-full hover:bg-light-input hover:dark:bg-dark-input flex items-center justify-center">
            <a href="https://chat.whatsapp.com/DoD72Imcm335g9JGaYWOcN">
              <img src="/whatsapp.svg" alt="WhatsApp" class="w-8 h-8">
            </a>
          </li>
          
          <li class="w-10 h-10 border-0 rounded-full hover:bg-light-input hover:dark:bg-dark-input flex items-center justify-center">
            <a href="https://x.com">
              <img src="/twitter.svg" alt="twitter" class="w-8 h-8">
            </a>
          </li>

          
          <li class="w-10 h-10 border-0 rounded-full hover:bg-light-input hover:dark:bg-dark-input flex items-center justify-center">
            <a href="https://discord.gg/drk3sPXg">
              <img src="/discord.svg" alt="discord" class="w-8 h-8">
            </a>
          </li>
          
          <li class="w-10 h-10 border-0 rounded-full hover:bg-light-input hover:dark:bg-dark-input flex items-center justify-center">
            <a href="https://instagram.com/">
              <img src="/instagram.svg" alt="instagram" class="w-8 h-8">
            </a>
          </li>

        </ul>
      </div>
    </div>
  </footer>