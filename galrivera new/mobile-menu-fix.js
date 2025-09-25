/**
 * GALRIVIERA Mobile Menu Fix V6.1
 * Script de correction automatique du menu mobile
 * Compatible avec toutes les pages (HE/EN/FR)
 * Support RTL pour l'hébreu
 */

(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        mobileBreakpoint: 768,
        tabletBreakpoint: 1024,
        menuAnimationDuration: 300
    };
    
    // Injection des styles CSS
    function injectStyles() {
        const styleId = 'galriviera-mobile-menu-styles';
        
        // Éviter la duplication
        if (document.getElementById(styleId)) return;
        
        const styles = `
            /* ===== MOBILE MENU FIX STYLES ===== */
            
            /* Reset pour éviter les conflits */
            .nav-container {
                position: relative !important;
            }
            
            /* Bouton Hamburger */
            .mobile-menu-toggle {
                display: none;
                background: none;
                border: none;
                cursor: pointer;
                padding: 10px;
                z-index: 1002;
                position: relative;
            }
            
            .mobile-menu-toggle span {
                display: block;
                width: 25px;
                height: 3px;
                background: #D4AF37;
                margin: 5px 0;
                transition: all 0.3s ease;
                border-radius: 2px;
            }
            
            /* Animation hamburger actif */
            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
            
            /* Overlay sombre */
            .mobile-menu-overlay {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                z-index: 999;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .mobile-menu-overlay.active {
                display: block;
                opacity: 1;
            }
            
            /* ===== STYLES MOBILE (max 768px) ===== */
            @media (max-width: 768px) {
                /* Header ajustements */
                .header {
                    padding: 12px 0 !important;
                }
                
                .nav-container {
                    padding: 0 15px !important;
                    display: flex !important;
                    justify-content: space-between !important;
                    align-items: center !important;
                    flex-wrap: nowrap !important;
                }
                
                /* Logo */
                .logo {
                    font-size: 24px !important;
                    flex-shrink: 0;
                }
                
                /* Afficher hamburger */
                .mobile-menu-toggle {
                    display: block !important;
                }
                
                /* Menu mobile transformé */
                .nav-menu {
                    position: fixed !important;
                    top: 60px !important;
                    right: -100% !important;
                    width: 85% !important;
                    max-width: 320px !important;
                    height: calc(100vh - 60px) !important;
                    background: linear-gradient(180deg, #1a1a1a 0%, #0A0A0A 100%) !important;
                    flex-direction: column !important;
                    justify-content: flex-start !important;
                    align-items: stretch !important;
                    padding: 20px 0 !important;
                    gap: 0 !important;
                    transition: right 0.3s ease !important;
                    overflow-y: auto !important;
                    z-index: 1001 !important;
                    box-shadow: -5px 0 20px rgba(0,0,0,0.5) !important;
                    border-left: 1px solid #D4AF37 !important;
                }
                
                /* Menu RTL pour hébreu */
                html[dir="rtl"] .nav-menu {
                    right: auto !important;
                    left: -100% !important;
                    border-left: none !important;
                    border-right: 1px solid #D4AF37 !important;
                }
                
                html[dir="rtl"] .nav-menu.mobile-active {
                    left: 0 !important;
                }
                
                /* Menu ouvert */
                .nav-menu.mobile-active {
                    right: 0 !important;
                }
                
                /* Liens menu mobile */
                .nav-menu a {
                    display: block !important;
                    width: 100% !important;
                    padding: 15px 25px !important;
                    text-align: left !important;
                    font-size: 17px !important;
                    color: #C0C0C0 !important;
                    border-bottom: 1px solid rgba(212, 175, 55, 0.1) !important;
                    transition: all 0.3s !important;
                    text-decoration: none !important;
                }
                
                html[dir="rtl"] .nav-menu a {
                    text-align: right !important;
                }
                
                .nav-menu a:hover,
                .nav-menu a.active {
                    background: rgba(212, 175, 55, 0.1) !important;
                    color: #D4AF37 !important;
                    padding-left: 35px !important;
                }
                
                html[dir="rtl"] .nav-menu a:hover,
                html[dir="rtl"] .nav-menu a.active {
                    padding-left: 25px !important;
                    padding-right: 35px !important;
                }
                
                /* Sélecteur langues mobile */
                .language-selector {
                    display: flex !important;
                    gap: 10px !important;
                    margin: 15px 25px !important;
                    padding: 15px 0 !important;
                    border-top: 1px solid rgba(212, 175, 55, 0.2) !important;
                    border-bottom: 1px solid rgba(212, 175, 55, 0.2) !important;
                    justify-content: center !important;
                    flex-wrap: nowrap !important;
                }
                
                .lang-btn {
                    width: auto !important;
                    height: auto !important;
                    padding: 8px 12px !important;
                    border-radius: 20px !important;
                    font-size: 16px !important;
                    display: inline-flex !important;
                    align-items: center !important;
                    border: 1px solid #D4AF37 !important;
                    background: transparent !important;
                }
                
                .lang-btn.active {
                    background: #D4AF37 !important;
                    color: #0A0A0A !important;
                }
                
                /* CTA WhatsApp mobile */
                .header-cta {
                    margin: 20px 25px !important;
                    display: block !important;
                    text-align: center !important;
                    padding: 12px 20px !important;
                    font-size: 17px !important;
                    background: #25D366 !important;
                    color: white !important;
                    border-radius: 25px !important;
                    text-decoration: none !important;
                    font-weight: bold !important;
                }
                
                /* WhatsApp flottant ajusté */
                .whatsapp-float {
                    bottom: 20px !important;
                    right: 20px !important;
                    left: auto !important;
                    width: 55px !important;
                    height: 55px !important;
                    font-size: 28px !important;
                }
                
                html[dir="rtl"] .whatsapp-float {
                    right: auto !important;
                    left: 20px !important;
                }
                
                /* Prevent body scroll quand menu ouvert */
                body.mobile-menu-open {
                    overflow: hidden !important;
                }
            }
            
            /* ===== TABLETTE (769px - 1024px) ===== */
            @media (min-width: 769px) and (max-width: 1024px) {
                .nav-menu {
                    flex-wrap: wrap !important;
                    gap: 12px !important;
                }
                
                .nav-menu a {
                    font-size: 14px !important;
                    padding: 5px 10px !important;
                }
                
                .language-selector {
                    margin: 0 15px !important;
                    gap: 8px !important;
                }
                
                .lang-btn {
                    width: 32px !important;
                    height: 32px !important;
                    font-size: 18px !important;
                }
                
                .header-cta {
                    padding: 6px 15px !important;
                    font-size: 14px !important;
                }
            }
            
            /* ===== DESKTOP (1025px+) ===== */
            @media (min-width: 1025px) {
                .mobile-menu-toggle {
                    display: none !important;
                }
                
                .mobile-menu-overlay {
                    display: none !important;
                }
                
                .nav-menu {
                    display: flex !important;
                    position: static !important;
                    width: auto !important;
                    height: auto !important;
                    right: auto !important;
                    background: none !important;
                    box-shadow: none !important;
                    border: none !important;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.id = styleId;
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    // Créer le bouton hamburger
    function createHamburgerButton() {
        const button = document.createElement('button');
        button.className = 'mobile-menu-toggle';
        button.id = 'mobileMenuToggle';
        button.setAttribute('aria-label', 'Menu');
        button.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        return button;
    }
    
    // Créer l'overlay
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        overlay.id = 'mobileMenuOverlay';
        return overlay;
    }
    
    // Initialisation du menu mobile
    function initMobileMenu() {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!navContainer || !navMenu) {
            console.warn('GALRIVIERA: Structure de navigation non trouvée');
            return;
        }
        
        // Éviter la double initialisation
        if (document.getElementById('mobileMenuToggle')) return;
        
        // Créer et insérer le bouton hamburger
        const hamburger = createHamburgerButton();
        navContainer.appendChild(hamburger);
        
        // Créer et insérer l'overlay
        const overlay = createOverlay();
        document.body.appendChild(overlay);
        
        // Gestion des événements
        hamburger.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', closeMenu);
        
        // Fermer le menu au clic sur un lien
        const menuLinks = navMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= CONFIG.mobileBreakpoint) {
                    closeMenu();
                }
            });
        });
        
        // Gestion du resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > CONFIG.mobileBreakpoint) {
                    closeMenu();
                }
            }, 250);
        });
        
        // Fermeture avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('mobile-active')) {
                closeMenu();
            }
        });
    }
    
    // Toggle menu
    function toggleMenu() {
        const hamburger = document.getElementById('mobileMenuToggle');
        const navMenu = document.querySelector('.nav-menu');
        const overlay = document.getElementById('mobileMenuOverlay');
        const isOpen = navMenu.classList.contains('mobile-active');
        
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    // Ouvrir menu
    function openMenu() {
        const hamburger = document.getElementById('mobileMenuToggle');
        const navMenu = document.querySelector('.nav-menu');
        const overlay = document.getElementById('mobileMenuOverlay');
        
        hamburger.classList.add('active');
        navMenu.classList.add('mobile-active');
        overlay.classList.add('active');
        document.body.classList.add('mobile-menu-open');
        
        // Analytics event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'menu_mobile_open', {
                'event_category': 'engagement',
                'event_label': 'mobile_navigation'
            });
        }
    }
    
    // Fermer menu
    function closeMenu() {
        const hamburger = document.getElementById('mobileMenuToggle');
        const navMenu = document.querySelector('.nav-menu');
        const overlay = document.getElementById('mobileMenuOverlay');
        
        hamburger.classList.remove('active');
        navMenu.classList.remove('mobile-active');
        overlay.classList.remove('active');
        document.body.classList.remove('mobile-menu-open');
    }
    
    // Optimisation pour les langues RTL
    function handleRTL() {
        const html = document.documentElement;
        const isHebrew = html.getAttribute('lang') === 'he';
        
        if (isHebrew && !html.getAttribute('dir')) {
            html.setAttribute('dir', 'rtl');
        }
    }
    
    // Point d'entrée principal
    function init() {
        // Attendre que le DOM soit chargé
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        // Exécuter les initialisations
        handleRTL();
        injectStyles();
        initMobileMenu();
        
        console.log('✅ GALRIVIERA Mobile Menu Fix V6.1 - Activé');
    }
    
    // Lancer l'initialisation
    init();
    
})();