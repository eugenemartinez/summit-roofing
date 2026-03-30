<?php
/**
 * Hero Block Render
 *
 * Full-width hero section with background image, primary/secondary buttons, and trust indicators
 */

$title = $attributes["title"] ?? "Quality Roofing Solutions for Every Home";
$subtitle =
    $attributes["subtitle"] ??
    "Professional roof installation, repair, and maintenance services with over 20 years of experience.";
$primary_button_text = $attributes["primaryButtonText"] ?? "Get Free Estimate";
$primary_button_url = $attributes["primaryButtonUrl"] ?? "#contact";
$secondary_button_text = $attributes["secondaryButtonText"] ?? "Our Services";
$secondary_button_url = $attributes["secondaryButtonUrl"] ?? "#services";
$overlay_opacity = $attributes["overlayOpacity"] ?? 50;
$overlay_decimal = $overlay_opacity / 100;

// ── Background image: prefer WP media library, fall back to URL, then hardcoded default ──
$bg_image_id = intval($attributes["backgroundImage"] ?? 0);
$bg_image_alt = esc_attr($attributes["backgroundImageAlt"] ?? "");
$fallback_url =
    "https://images.pexels.com/photos/209315/pexels-photo-209315.jpeg";

if ($bg_image_id > 0) {
    $bg_image_url = esc_url(
        wp_get_attachment_image_url($bg_image_id, "full") ?: $fallback_url,
    );
    if (empty($bg_image_alt)) {
        $bg_image_alt = esc_attr(
            get_post_meta($bg_image_id, "_wp_attachment_image_alt", true),
        );
    }
} else {
    $bg_image_url = esc_url($attributes["backgroundImageUrl"] ?? $fallback_url);
}
?>

<section 
  id="hero"
  class="flex relative items-center bg-accent min-h-[90vh]"
>
    <div class="overflow-hidden absolute inset-0 z-0">
        <img 
            src="<?php echo $bg_image_url; ?>" 
            alt="<?php echo $bg_image_alt; ?>"
            data-motion="parallax"
            class="w-full h-[130%] object-cover object-center will-change-transform"
            loading="eager"
            fetchpriority="high"
        />
        
        <div
            class="absolute inset-0 z-10 opacity-20 pointer-events-none"
            style="background-image: url('data:image/svg+xml,%3Csvg width%3D%2220%22 height%3D%2220%22 viewBox%3D%220 0 20 20%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg fill%3D%22%23ffffff%22 fill-opacity%3D%220.4%22 fill-rule%3D%22evenodd%22%3E%3Ccircle cx%3D%223%22 cy%3D%223%22 r%3D%223%22%2F%3E%3Ccircle cx%3D%2213%22 cy%3D%2213%22 r%3D%223%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E'); background-repeat: repeat;"
            aria-hidden="true"
        ></div>
        
        <div
            class="absolute inset-0 z-[5]"
            style="background-color: rgba(0,0,0,<?php echo esc_attr(
                $overlay_decimal,
            ); ?>);"
            aria-hidden="true"
        ></div>
    </div>

  <div class="container relative z-10 py-24 px-4 mx-auto md:py-32">
    <div class="max-w-2xl">
      
      <h1
        class="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl drop-shadow-lg"
        data-motion="fade-up"
        data-duration="0.6"
      >
        <?php echo esc_html($title); ?>
      </h1>

      <p
        class="mb-8 text-xl text-white drop-shadow-md"
        data-motion="fade-up"
        data-duration="0.6"
        data-delay="0.2"
      >
        <?php echo esc_html($subtitle); ?>
      </p>

      <div
        class="flex flex-col gap-4 sm:flex-row"
        data-motion="fade-up"
        data-duration="0.6"
        data-delay="0.4"
      >
        <a
          href="<?php echo esc_url($primary_button_url); ?>"
          class="py-3 px-6 font-medium text-center text-white rounded-md transition-all duration-300 bg-cta hover:bg-cta/90"
          data-motion="hover-scale"
          data-duration="0.2"
        >
          <?php echo esc_html($primary_button_text); ?>
        </a>
        <a
          href="<?php echo esc_url($secondary_button_url); ?>"
          class="py-3 px-6 font-medium text-center text-white rounded-md transition-all duration-300 bg-white/10 backdrop-blur-sm hover:bg-white/20"
          data-motion="hover-scale"
          data-duration="0.2"
        >
          <?php echo esc_html($secondary_button_text); ?>
        </a>
      </div>

      <div
        class="flex flex-wrap gap-6 items-center mt-12"
        data-motion="stagger-fade-up"
        data-duration="0.4"
        data-delay="0.6"
        data-stagger="0.1"
      >
        <div 
          class="flex items-center py-2 px-4 rounded-md bg-white/10 backdrop-blur-sm hover:bg-white/20"
          data-motion="hover-scale"
          data-duration="0.2"
        >
          <i data-lucide="star" class="mr-2 w-5 h-5 text-cta fill-cta"></i>
          <span class="text-sm font-medium text-white">5-Star Rated</span>
        </div>

        <div 
          class="flex items-center py-2 px-4 rounded-md bg-white/10 backdrop-blur-sm hover:bg-white/20"
          data-motion="hover-scale"
          data-duration="0.2"
        >
          <i data-lucide="shield-check" class="mr-2 w-5 h-5 text-cta"></i>
          <span class="text-sm font-medium text-white">Licensed &amp; Insured</span>
        </div>

        <div 
          class="flex items-center py-2 px-4 rounded-md bg-white/10 backdrop-blur-sm hover:bg-white/20"
          data-motion="hover-scale"
          data-duration="0.2"
        >
          <i data-lucide="award" class="mr-2 w-5 h-5 text-cta"></i>
          <span class="text-sm font-medium text-white">20+ Years Experience</span>
        </div>
      </div>
    </div>
  </div>
</section>
