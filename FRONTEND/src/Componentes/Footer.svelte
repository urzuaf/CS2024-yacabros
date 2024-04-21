<script>
    let footerNavs = [
      { href: 'javascript:void(0)', name: '' },
      { href: 'javascript:void(0)', name: 'Torneo' },
      { href: 'javascript:void(0)', name: 'Noticias' },
      { href: 'javascript:void(0)', name: 'Foros' },
      { href: 'javascript:void(0)', name: '' }
    ];
  </script>
  <footer class="text-gray-500 bg-white px-4 py-5 w-screen mx-auto md:px-8 border-2 border-gray  ">
    <div class="max-w-lg sm:mx-auto sm:text-center">
      <img src="/sportify-favicon.svg" class="w-20 sm:mx-auto" alt="Logo"/>
      <p class="leading-relaxed mt-2 text-[15px]">
      </p>
    </div>
    <ul class="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
      {#each footerNavs as item, idx}
        <li class="hover:text-gray-800">
          <a href={item.href}>
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
          <li class="w-10 h-10 border rounded-full flex items-center justify-center">
            <a href="https://chat.whatsapp.com/DoD72Imcm335g9JGaYWOcN">
              <img src="/whatsapp.svg" alt="WhatsApp" class="w-6 h-6 text-blue-400">
            </a>
          </li>
          
          <li class="w-10 h-10 border rounded-full flex items-center justify-center">
            <a href="https://x.com">
              <img src="/twitter.svg" alt="twitter" class="w-6 h-6 text-blue-400">
            </a>
          </li>

          
          <li class="w-10 h-10 border rounded-full flex items-center justify-center">
            <a href="https://discord.gg/drk3sPXg">
              <img src="/discord.svg" alt="discord" class="w-6 h-6 text-blue-400">
            </a>
          </li>
          
          <li class="w-10 h-10 border rounded-full flex items-center justify-center">
            <a href="https://instagram.com">
              <img src="/instagram.svg" alt="instagram" class="w-6 h-6 text-blue-400">
            </a>
          </li>
          
        </ul>
      </div>
    </div>
  </footer>
  
<style>
    .svg-icon{
        fill: currentColor;
    }
</style>