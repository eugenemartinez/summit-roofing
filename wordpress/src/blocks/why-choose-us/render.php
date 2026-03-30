<?php
$title = $attributes['title'] ?? 'What Sets Summit Roofing Apart';
$subtitle = $attributes['subtitle'] ?? 'Why Choose Us';
$description = $attributes['description'] ?? '';
$section1Title = $attributes['section1Title'] ?? '';
$section1Description = $attributes['section1Description'] ?? '';
$section1Image = $attributes['section1Image'] ?? '';
$section1Points = $attributes['section1Points'] ?? [];
$section2Title = $attributes['section2Title'] ?? '';
$section2Description = $attributes['section2Description'] ?? '';
$section2Image = $attributes['section2Image'] ?? '';
$section2Points = $attributes['section2Points'] ?? [];
$benefits = $attributes['benefits'] ?? [];
$ctaText = $attributes['ctaText'] ?? 'Experience the Summit Difference';
$ctaUrl = $attributes['ctaUrl'] ?? '#contact';
?>

<section id="why-choose-us" class="py-16 md:py-24 bg-muted">
  <!-- Header -->
  <div class="text-center mb-16 max-w-3xl mx-auto px-4" data-motion="fade-up">
    <div class="flex items-center justify-center gap-3 mb-4">
      <div class="h-1 w-16 rounded-full bg-[#D86A6A]"></div>
      <span class="text-sm font-semibold text-[#36454F] uppercase tracking-wider"><?php echo esc_html($subtitle); ?></span>
      <div class="h-1 w-16 rounded-full bg-[#D86A6A]"></div>
    </div>
    <h2 class="text-3xl md:text-4xl font-bold text-[#1E3A5E] mb-4"><?php echo esc_html($title); ?></h2>
    <p class="text-gray-600 leading-relaxed"><?php echo esc_html($description); ?></p>
  </div>

  <!-- Sections with center line -->
  <div class="relative max-w-7xl mx-auto px-4 mb-20">

    <!-- Section 1: Professional Team (text left, image right) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12" data-motion="fade-up">
        <div class="hidden lg:block absolute inset-y-0 left-1/2 w-px bg-gray-200"></div>
      <div data-motion="slide-right" data-motion-delay="0.1">
        <h3 class="text-3xl font-bold text-gray-900 mb-6"><?php echo esc_html($section1Title); ?></h3>
        <p class="text-gray-600 mb-6 leading-relaxed"><?php echo esc_html($section1Description); ?></p>
        <ul class="space-y-3">
          <?php foreach ($section1Points as $index => $point) : ?>
            <li class="flex items-start gap-3" data-motion="fade-up" data-motion-delay="<?php echo esc_attr(0.15 + $index * 0.05); ?>">
              <i data-lucide="check-circle" class="w-5 h-5 text-[#D86A6A] flex-shrink-0 mt-0.5"></i>
              <span class="text-gray-700"><?php echo esc_html($point); ?></span>
            </li>
          <?php endforeach; ?>
        </ul>
      </div>
      <div data-motion="fade-up" data-motion-delay="0.2">
        <img
          src="<?php echo esc_url($section1Image); ?>"
          alt="<?php echo esc_attr($section1Title); ?>"
          class="rounded-lg w-full h-auto object-cover shadow-lg"
          loading="lazy"
          data-motion="hover-card"
        />
      </div>
    </div>
  </div>

  <!-- Section 2: Premium Materials (image left, text right) -->
  <div class="relative max-w-7xl mx-auto px-4 mb-20" data-motion="fade-up">
    <div class="hidden lg:block absolute inset-y-0 left-1/2 w-px bg-gray-200"></div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div data-motion="fade-up" data-motion-delay="0.1" class="order-2 lg:order-1">
        <img
          src="<?php echo esc_url($section2Image); ?>"
          alt="<?php echo esc_attr($section2Title); ?>"
          class="rounded-lg w-full h-auto object-cover shadow-lg"
          loading="lazy"
          data-motion="hover-card"
        />
      </div>
      <div data-motion="slide-left" data-motion-delay="0.2" class="order-1 lg:order-2">
        <h3 class="text-3xl font-bold text-gray-900 mb-6"><?php echo esc_html($section2Title); ?></h3>
        <p class="text-gray-600 mb-6 leading-relaxed"><?php echo esc_html($section2Description); ?></p>
        <ul class="space-y-3">
          <?php foreach ($section2Points as $index => $point) : ?>
            <li class="flex items-start gap-3" data-motion="fade-up" data-motion-delay="<?php echo esc_attr(0.25 + $index * 0.05); ?>">
              <i data-lucide="check-circle" class="w-5 h-5 text-[#D86A6A] flex-shrink-0 mt-0.5"></i>
              <span class="text-gray-700"><?php echo esc_html($point); ?></span>
            </li>
          <?php endforeach; ?>
        </ul>
      </div>
    </div>
  </div>

  <!-- Benefits Grid -->
  <div class="max-w-7xl mx-auto px-4 mb-16" data-motion="fade-up">
    <div class="text-center mb-8">
      <h3 class="text-2xl md:text-3xl font-bold text-[#1E3A5E]">Key Benefits</h3>
      <p class="text-gray-600 max-w-2xl mx-auto">Our value-driven advantages help you choose confidently.<br/> every project executed with our standard of quality.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <?php foreach ($benefits as $index => $benefit) : ?>
        <div
            class="flex flex-col items-center text-center bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
          data-motion="fade-up hover-lift"
          data-motion-delay="<?php echo esc_attr(0.1 + $index * 0.1); ?>"
        >
          <div class="mb-4">
            <i data-lucide="<?php echo esc_attr($benefit['icon'] ?? 'star'); ?>" class="w-10 h-10 text-[#D86A6A]"></i>
          </div>
          <h4 class="text-xl font-bold text-gray-900 mb-3"><?php echo esc_html($benefit['title'] ?? ''); ?></h4>
          <p class="text-gray-600 leading-relaxed"><?php echo esc_html($benefit['description'] ?? ''); ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </div>

  <!-- CTA Button -->
  <div class="flex justify-center" data-motion="fade-up" data-motion-delay="0.3">
    <a
      href="<?php echo esc_url($ctaUrl); ?>"
      class="inline-flex items-center gap-2 px-8 py-4 bg-[#D86A6A] hover:bg-[#c75353] text-white font-semibold rounded-lg transition-all duration-300 group"
    >
      <?php echo esc_html($ctaText); ?>
      <i data-lucide="arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform" data-motion="hover-arrow"></i>
    </a>
  </div>
</section>
