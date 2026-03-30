<?php
/**
 * Navigation Template Part
 * Optimized for Tailwind v4 and synced with theme.css variables.
 */

$nav_items = [
    "about" => "About",
    "services" => "Services",
    "projects" => "Our Work",
    "testimonials" => "Testimonials",
    "faq" => "FAQ",
]; ?>

<header id="main-header" class="fixed top-0 right-0 left-0 z-50 py-4 text-white bg-transparent transition-all duration-300">
    <div class="container flex justify-between items-center px-4 mx-auto">
        
        <a href="<?php echo home_url(); ?>" 
           class="flex items-center no-underline transition-transform duration-300 active:scale-95 group hover:scale-102"
           aria-label="Summit Roofing Home">
            <?php echo get_custom_logo_svg("medium", "header-logo-wrapper"); ?>
        </a>
        
        <nav class="hidden items-center space-x-8 md:flex">
            <?php foreach ($nav_items as $id => $label): ?>
                <a href="#<?php echo $id; ?>" 
                class="relative font-medium no-underline transition-colors duration-300 text-white/90 nav-link group hover:text-cta"
                data-section="<?php echo $id; ?>">
                    <?php echo $label; ?>
                    <span class="absolute left-0 -bottom-1 w-0 h-0.5 transition-all duration-300 group-hover:w-full nav-underline bg-cta"></span>
                </a>
            <?php endforeach; ?>
                        
            <a href="#contact" 
            class="inline-block py-2 px-6 font-semibold text-white no-underline rounded-md shadow-lg transition-all duration-300 hover:scale-105 nav-link bg-cta shadow-cta/20 active:scale-98"
            data-section="contact">
                Get a Quote
            </a>
        </nav>
        
        <button id="mobile-menu-btn" class="relative z-50 p-2 text-white md:hidden">
            <i data-lucide="menu" class="w-6 h-6 menu-icon"></i>
            <i data-lucide="x" class="hidden w-6 h-6 close-icon"></i>
        </button>
        </div>

    <div id="mobile-menu" 
        class="hidden fixed inset-0 z-40 w-screen h-screen md:hidden bg-primary/98 backdrop-blur-xl">
        
        <div class="flex flex-col justify-center items-center px-6 space-y-8 h-full">
            <?php foreach ($nav_items as $id => $label): ?>
                <a href="#<?php echo $id; ?>" 
                class="text-2xl font-semibold no-underline transition-all duration-200 mobile-nav-link text-white/90 hover:text-cta" 
                data-section="<?php echo $id; ?>">
                    <?php echo $label; ?>
                </a>
            <?php endforeach; ?>
            
            <a href="#contact" 
            class="py-4 px-10 w-full max-w-xs font-bold text-center text-white no-underline rounded-md shadow-lg transition-transform active:scale-95 bg-cta">
                Get a Quote
            </a>
        </div>
    </div>
</header>
