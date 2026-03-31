<?php
/**
 * Footer Template Part
 *
 * Global footer with trust badges, contact info, links, and social media
 */

$current_year = date("Y"); ?>

<footer class="relative text-white bg-linear-to-br from-primary via-primary to-primary/95">

  <!-- Wave decoration -->
<div class="absolute top-0 left-0 w-full overflow-hidden leading-0 transform -translate-y-99%">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" class="w-full h-12">
      <path 
        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
        fill="#f8fafc" 
        class="opacity-10"
      />
    </svg>
  </div>

  <!-- Trust badges -->
  <div class="container py-8 px-4 mx-auto border-b border-white/10">
    <div
      class="grid grid-cols-1 gap-8 items-center md:grid-cols-3"
      data-motion="stagger-fade-up"
      data-scroll="true"
      data-stagger="0.1"
    >
      <div class="flex items-center" data-motion="fade-up" data-scroll="true">
        <div class="flex justify-center items-center p-4 mr-4 rounded-full transition-all duration-300 bg-white/10 text-cta hover:bg-white/20" data-motion="hover-scale">
          <i data-lucide="shield-check" class="w-6 h-6"></i>
        </div>
        <div>
          <h3 class="font-semibold">Licensed & Insured</h3>
          <p class="text-sm text-white/70">Full coverage for peace of mind</p>
        </div>
      </div>

      <div class="flex items-center" data-motion="fade-up" data-scroll="true" data-delay="0.1">
        <div class="flex justify-center items-center p-4 mr-4 rounded-full transition-all duration-300 bg-white/10 text-cta hover:bg-white/20" data-motion="hover-scale">
          <i data-lucide="handshake" class="w-6 h-6"></i>
        </div>
        <div>
          <h3 class="font-semibold">Quality Guarantee</h3>
          <p class="text-sm text-white/70">Satisfaction on every project</p>
        </div>
      </div>

      <div class="flex items-center" data-motion="fade-up" data-scroll="true" data-delay="0.2">
        <div class="flex justify-center items-center p-4 mr-4 rounded-full transition-all duration-300 bg-white/10 text-cta hover:bg-white/20" data-motion="hover-scale">
          <i data-lucide="star" class="w-6 h-6"></i>
        </div>
        <div>
          <h3 class="font-semibold">Award Winning Service</h3>
          <p class="text-sm text-white/70">Recognized industry leader</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Main footer content -->
  <div class="container py-12 px-4 mx-auto">
    <div
      class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
      data-motion="stagger-fade-up"
      data-scroll="true"
      data-stagger="0.1"
    >

      <!-- Company info -->
      <div data-motion="fade-up" data-scroll="true">
        <div class="mb-6">
          <?php echo get_custom_logo_svg("medium", "footer-logo-wrapper"); ?>
        </div>

        <p class="mb-6 leading-relaxed text-white/80">
          Professional roofing solutions for residential and commercial properties.
          Quality craftsmanship with over 20 years of industry experience.
        </p>

        <div class="flex space-x-4">
            <a href="#" class="flex justify-center items-center p-2 rounded-full transition-colors duration-300 bg-white/10 hover:bg-cta" data-motion="hover-scale">
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
            </a>
            <a href="#" class="flex justify-center items-center p-2 rounded-full transition-colors duration-300 bg-white/10 hover:bg-cta" data-motion="hover-scale">
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.584-.07 4.85c-.056 1.17-.247 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.419.419-.824.679-1.38.896-.42.164-1.057.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.584-.015-4.85-.07c-1.17-.056-1.805-.247-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.419-.679-.824-.896-1.38-.164-.42-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.016-3.584.071-4.85c.055-1.17.249-1.805.415-2.227.217-.562.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.057-.36 2.227-.413 1.266-.057 1.646-.07 4.85-.07zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
            </a>
            <a href="#" class="flex justify-center items-center p-2 rounded-full transition-colors duration-300 bg-white/10 hover:bg-cta" data-motion="hover-scale">
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                </svg>
            </a>
            <a href="#" class="flex justify-center items-center p-2 rounded-full transition-colors duration-300 bg-white/10 hover:bg-cta" data-motion="hover-scale">
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                </svg>
            </a>
        </div>
      </div>

      <!-- Quick Links -->
      <div data-motion="fade-up" data-scroll="true" data-delay="0.1">
        <h3 class="flex items-center pb-2 mb-6 text-lg font-semibold border-b border-white/20">
          <span class="inline-block mr-2 w-1.5 h-6 rounded-full bg-cta"></span>
          Quick Links
        </h3>

        <ul class="space-y-3">
          <li>
            <a href="<?php echo esc_url(
                home_url("/#about"),
            ); ?>" class="flex items-center transition-colors duration-300 text-white/80 hover:text-cta" data-motion="hover-lift">
              <span class="mr-2 text-cta">›</span> About Us
            </a>
          </li>
          <li>
            <a href="<?php echo esc_url(
                home_url("/#services"),
            ); ?>" class="flex items-center transition-colors duration-300 text-white/80 hover:text-cta" data-motion="hover-lift">
              <span class="mr-2 text-cta">›</span> Our Services
            </a>
          </li>
          <li>
            <a href="<?php echo esc_url(
                home_url("/#projects"),
            ); ?>" class="flex items-center transition-colors duration-300 text-white/80 hover:text-cta" data-motion="hover-lift">
              <span class="mr-2 text-cta">›</span> Recent Projects
            </a>
          </li>
          <li>
            <a href="<?php echo esc_url(
                home_url("/#testimonials"),
            ); ?>" class="flex items-center transition-colors duration-300 text-white/80 hover:text-cta" data-motion="hover-lift">
              <span class="mr-2 text-cta">›</span> Testimonials
            </a>
          </li>
          <li>
            <a href="<?php echo esc_url(
                home_url("/#faq"),
            ); ?>" class="flex items-center transition-colors duration-300 text-white/80 hover:text-cta" data-motion="hover-lift">
              <span class="mr-2 text-cta">›</span> FAQ
            </a>
          </li>
          <li>
            <a href="<?php echo esc_url(
                home_url("/#contact"),
            ); ?>" class="flex items-center transition-colors duration-300 text-white/80 hover:text-cta" data-motion="hover-lift">
              <span class="mr-2 text-cta">›</span> Contact Us
            </a>
          </li>
        </ul>
      </div>

      <!-- Services -->
      <div data-motion="fade-up" data-scroll="true" data-delay="0.2">
        <h3 class="flex items-center pb-2 mb-6 text-lg font-semibold border-b border-white/20">
          <span class="inline-block mr-2 w-1.5 h-6 rounded-full bg-cta"></span>
          Our Services
        </h3>

        <ul class="space-y-3">
          <li>
            <a href="<?php echo esc_url(
                home_url("/#services"),
            ); ?>" class="flex items-center transition-colors duration-300 text-white/80 hover:text-cta" data-motion="hover-lift">
              <span class="mr-2 text-cta">›</span> Roof Installation
            </a>
          </li>
          <li>
            <a href="<?php echo esc_url(
                home_url("/#services"),
            ); ?>" class="flex items-center transition-colors duration-300 text-white/80 hover:text-cta" data-motion="hover-lift">
              <span class="mr-2 text-cta">›</span> Roof Repair
            </a>
          </li>
          <li>
            <a href="<?php echo esc_url(
                home_url("/#services"),
            ); ?>" class="flex items-center transition-colors duration-300 text-white/80 hover:text-cta" data-motion="hover-lift">
              <span class="mr-2 text-cta">›</span> Roof Inspection
            </a>
          </li>
          <li>
            <a href="<?php echo esc_url(
                home_url("/#services"),
            ); ?>" class="flex items-center transition-colors duration-300 text-white/80 hover:text-cta" data-motion="hover-lift">
              <span class="mr-2 text-cta">›</span> Gutter Installation
            </a>
          </li>
          <li>
            <a href="<?php echo esc_url(
                home_url("/#services"),
            ); ?>" class="flex items-center transition-colors duration-300 text-white/80 hover:text-cta" data-motion="hover-lift">
              <span class="mr-2 text-cta">›</span> Storm Damage Repair
            </a>
          </li>
          <li>
            <a href="<?php echo esc_url(
                home_url("/#services"),
            ); ?>" class="flex items-center transition-colors duration-300 text-white/80 hover:text-cta" data-motion="hover-lift">
              <span class="mr-2 text-cta">›</span> Commercial Roofing
            </a>
          </li>
        </ul>
      </div>

      <!-- Contact Info -->
      <div data-motion="fade-up" data-scroll="true" data-delay="0.3">
        <h3 class="flex items-center pb-2 mb-6 text-lg font-semibold border-b border-white/20">
          <span class="inline-block mr-2 w-1.5 h-6 rounded-full bg-cta"></span>
          Contact Us
        </h3>

        <ul class="space-y-4">
          <li class="flex items-start">
            <div class="p-2 mt-1 mr-3 rounded-full transition-all duration-300 bg-white/10 hover:bg-white/20" data-motion="hover-scale">
              <i data-lucide="map-pin" class="w-5 h-5 text-cta"></i>
            </div>
            <span class="text-white/80">123 Roofing Way, Anytown, ST 12345</span>
          </li>

          <li class="flex items-center">
            <div class="p-2 mr-3 rounded-full transition-all duration-300 bg-white/10 hover:bg-white/20" data-motion="hover-scale">
              <i data-lucide="phone" class="w-5 h-5 text-cta"></i>
            </div>
            <a href="tel:+15551234567" class="transition-colors duration-300 text-white/80 hover:text-cta" data-motion="hover-lift">
              (555) 123-4567
            </a>
          </li>

          <li class="flex items-center">
            <div class="p-2 mr-3 rounded-full transition-all duration-300 bg-white/10 hover:bg-white/20" data-motion="hover-scale">
              <i data-lucide="mail" class="w-5 h-5 text-cta"></i>
            </div>
            <a href="mailto:contact@summitroofing.com" class="transition-colors duration-300 text-white/80 hover:text-cta" data-motion="hover-lift">
              contact@summitroofing.com
            </a>
          </li>

          <li class="flex items-start">
            <div class="p-2 mt-1 mr-3 rounded-full transition-all duration-300 bg-white/10 hover:bg-white/20" data-motion="hover-scale">
              <i data-lucide="clock" class="w-5 h-5 text-cta"></i>
            </div>
            <div class="text-white/80">
              <div>Monday-Friday: 7am-6pm</div>
              <div>Saturday: 8am-2pm</div>
              <div>Sunday: Closed</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Bottom bar -->
  <div class="py-4 bg-accent">
    <div class="container flex flex-col justify-between items-center px-4 mx-auto text-sm md:flex-row text-white/70">
      <div data-motion="fade-in" data-delay="0.5">
        © <?php echo esc_html(
            $current_year,
        ); ?> Summit Roofing. All rights reserved.
      </div>
      <div class="flex flex-wrap justify-center mt-3 space-x-4 md:mt-0" data-motion="fade-in" data-delay="0.6">
        <a href="#" class="transition-colors duration-300 hover:text-cta" data-motion="hover-lift">Privacy Policy</a>
        <a href="#" class="transition-colors duration-300 hover:text-cta" data-motion="hover-lift">Terms of Service</a>
        <a href="#" class="transition-colors duration-300 hover:text-cta" data-motion="hover-lift">Sitemap</a>
      </div>
    </div>
  </div>
</footer>
