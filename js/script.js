// js/script.js
document.addEventListener("DOMContentLoaded", function() {
  // Carregar includes
  loadIncludes().then(setupHamburgerMenu);
  
  async function loadIncludes() {
    const includes = document.querySelectorAll('[data-include]');
    
    for (const el of includes) {
      const file = el.getAttribute("data-include");
      if (!file) continue;
      
      try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(response.statusText);
        
        el.innerHTML = await response.text();
      } catch (error) {
        console.error(`Error loading ${file}:`, error);
        el.innerHTML = `<p>Error loading ${file}</p>`;
      }
    }
  }

  function setupHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    let navMenu = document.getElementById('nav-menu');
    
    // Tentar novamente se o menu não foi encontrado
    if (!navMenu) {
      setTimeout(() => {
        navMenu = document.getElementById('nav-menu');
        if (navMenu) initMenu(hamburger, navMenu);
      }, 300);
      return;
    }
    
    initMenu(hamburger, navMenu);
  }

  function initMenu(hamburger, navMenu) {
    if (!hamburger || !navMenu) {
      console.error('Menu elements not found');
      return;
    }

    // Fechar menu ao clicar em links
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => closeMenu(hamburger, navMenu));
    });

    // Alternar menu ao clicar no ícone
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMenu(hamburger, navMenu);
    });

    // Fechar ao clicar fora do menu
    document.addEventListener('click', function(e) {
      if (navMenu.classList.contains('active') && 
          !navMenu.contains(e.target) && 
          !hamburger.contains(e.target)) {
        closeMenu(hamburger, navMenu);
      }
    });
  }

  function toggleMenu(hamburger, navMenu) {
    if (navMenu.classList.contains('active')) {
      closeMenu(hamburger, navMenu);
    } else {
      openMenu(hamburger, navMenu);
    }
  }

  function openMenu(hamburger, navMenu) {
    navMenu.classList.add('active');
    hamburger.classList.add('active');
    document.body.classList.add('menu-open');
  }

  function closeMenu(hamburger, navMenu) {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.classList.remove('menu-open');
  }
});