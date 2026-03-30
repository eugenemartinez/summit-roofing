<?php
// Extract attributes with defaults
$title       = $attributes['title'] ?? 'Get Your Free Roofing Estimate';
$subtitle    = $attributes['subtitle'] ?? 'Contact Us';
$description = $attributes['description'] ?? 'Fill out the form below and our team will get back to you within 24 hours to discuss your roofing needs.';
$address     = $attributes['address'] ?? '123 Roofing Way, Anytown, ST 12345';
$phone       = $attributes['phone'] ?? '(555) 123-4567';
$email       = $attributes['email'] ?? 'contact@summitroofing.com';
$hoursWeekday = $attributes['hoursWeekday'] ?? 'Mon-Fri: 7am-6pm';
$hoursSaturday = $attributes['hoursSaturday'] ?? 'Sat: 8am-2pm';
$tagline     = $attributes['tagline'] ?? 'Proudly serving homeowners throughout the region with quality roofing solutions.';
$credentials = $attributes['credentials'] ?? ['BBB Accredited', 'Fully Insured', 'Licensed Contractors'];
$serviceOptions = $attributes['serviceOptions'] ?? ['Roof Repair', 'Roof Replacement', 'Roof Inspection', 'Gutter Installation', 'Storm Damage Assessment', 'Commercial Roofing', 'Other Services'];
$ctaText     = $attributes['ctaText'] ?? 'Request Free Estimate';

// Generate unique IDs for this block instance
$blockId = 'contact-' . wp_unique_id();
?>

<section id="contact" class="py-16 md:py-24 bg-neutral-bg">
  <div class="container px-4 mx-auto">

    <!-- Header -->
    <div
      class="mb-12 text-center"
      data-motion="fade-up"
      data-delay="0">
      <div class="flex justify-center items-center mb-4">
        <div class="h-1 w-12 bg-cta mr-4" data-motion="slide-right" data-duration="0.4" data-delay="0.1"></div>
        <span class="text-sm font-semibold tracking-wider uppercase text-accent" data-motion="fade-up" data-delay="0.1">
          <?php echo esc_html($subtitle); ?>
        </span>
        <div class="h-1 w-12 bg-cta ml-4" data-motion="slide-left" data-duration="0.4" data-delay="0.1"></div>
      </div>

      <h2 class="mb-4 text-3xl font-bold md:text-4xl text-primary" data-motion="fade-up" data-delay="0.2">
        <?php echo esc_html($title); ?>
      </h2>

      <p class="mx-auto max-w-2xl text-accent text-lg" data-motion="fade-up" data-delay="0.3">
        <?php echo esc_html($description); ?>
      </p>
    </div>

    <!-- Main Container -->
    <div
      class="mx-auto max-w-4xl"
      data-motion="fade-up"
      data-delay="0.4">
      <div class="flex overflow-hidden flex-col bg-white rounded-lg shadow-lg lg:flex-row">

        <!-- Left Column: Contact Information -->
        <div class="p-8 text-white bg-gradient-to-br lg:w-2/5 from-primary to-primary/90">
          <h3 class="mb-8 text-xl font-semibold" data-motion="fade-up" data-delay="0.5">
            Contact Information
          </h3>

          <!-- Contact Items -->
          <div class="space-y-8">

            <!-- Address -->
            <div class="flex items-start" data-motion="fade-up" data-delay="0.6">
              <div class="flex-shrink-0 p-3 mr-4 rounded-full transition-all duration-300 bg-white/10 hover:bg-white/20">
                <i data-lucide="map-pin" class="w-5 h-5"></i>
              </div>
              <div>
                <p class="mb-1 text-sm text-white/70">Address</p>
                <p><?php echo esc_html($address); ?></p>
              </div>
            </div>

            <!-- Phone -->
            <div class="flex items-start" data-motion="fade-up" data-delay="0.7">
              <div class="flex-shrink-0 p-3 mr-4 rounded-full transition-all duration-300 bg-white/10 hover:bg-white/20">
                <i data-lucide="phone" class="w-5 h-5"></i>
              </div>
              <div>
                <p class="mb-1 text-sm text-white/70">Phone</p>
                <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9+]/', '', $phone)); ?>" class="transition-colors duration-300 hover:text-white/80">
                  <?php echo esc_html($phone); ?>
                </a>
              </div>
            </div>

            <!-- Email -->
            <div class="flex items-start" data-motion="fade-up" data-delay="0.8">
              <div class="flex-shrink-0 p-3 mr-4 rounded-full transition-all duration-300 bg-white/10 hover:bg-white/20">
                <i data-lucide="mail" class="w-5 h-5"></i>
              </div>
              <div>
                <p class="mb-1 text-sm text-white/70">Email</p>
                <a href="mailto:<?php echo esc_attr($email); ?>" class="transition-colors duration-300 hover:text-white/80">
                  <?php echo esc_html($email); ?>
                </a>
              </div>
            </div>

            <!-- Hours -->
            <div class="flex items-start" data-motion="fade-up" data-delay="0.9">
              <div class="flex-shrink-0 p-3 mr-4 rounded-full transition-all duration-300 bg-white/10 hover:bg-white/20">
                <i data-lucide="clock" class="w-5 h-5"></i>
              </div>
              <div>
                <p class="mb-1 text-sm text-white/70">Hours</p>
                <p><?php echo esc_html($hoursWeekday); ?></p>
                <p><?php echo esc_html($hoursSaturday); ?></p>
              </div>
            </div>

          </div>

          <!-- Divider & Credentials -->
          <div class="pt-8 mt-10 border-t border-white/20" data-motion="fade-up" data-delay="1">
            <p class="mb-4 text-sm text-white/90">
              <?php echo esc_html($tagline); ?>
            </p>

            <div class="flex flex-wrap gap-2">
              <?php foreach ($credentials as $index => $credential) : ?>
                <div class="inline-flex items-center py-1 px-3 text-xs rounded-full transition-all duration-300 bg-white/10 hover:bg-white/20"
                     data-motion="fade-up" 
                     data-delay="<?php echo esc_attr(1.1 + ($index * 0.1)); ?>">
                  <i data-lucide="check" class="w-3 h-3 mr-1 text-cta"></i>
                  <span class="whitespace-nowrap"><?php echo esc_html($credential); ?></span>
                </div>
              <?php endforeach; ?>
            </div>
          </div>
        </div>

        <!-- Right Column: Contact Form -->
        <div class="p-8 lg:w-3/5">
          <form id="<?php echo esc_attr($blockId); ?>-form" class="space-y-6">

            <!-- Success Message (hidden by default) -->
            <div id="<?php echo esc_attr($blockId); ?>-success" class="hidden p-4 text-green-800 bg-green-50 rounded-md border border-green-200" data-motion="fade-up">
              <div class="flex">
                <div class="flex-shrink-0">
                  <i data-lucide="check-circle" class="w-5 h-5 text-green-600 mr-3"></i>
                </div>
                <div>
                  <p class="font-medium">Message sent successfully!</p>
                  <p class="mt-1 text-sm">We'll get back to you as soon as possible.</p>
                </div>
              </div>
            </div>

            <!-- Name Field -->
            <div>
              <label for="<?php echo esc_attr($blockId); ?>-name" class="block mb-2 text-sm font-medium text-accent">
                Full Name <span class="text-cta">*</span>
              </label>
              <input 
                type="text" 
                id="<?php echo esc_attr($blockId); ?>-name"
                name="name"
                required
                placeholder="John Doe"
                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200">
            </div>

            <!-- Email Field -->
            <div>
              <label for="<?php echo esc_attr($blockId); ?>-email" class="block mb-2 text-sm font-medium text-accent">
                Email Address <span class="text-cta">*</span>
              </label>
              <input 
                type="email" 
                id="<?php echo esc_attr($blockId); ?>-email"
                name="email"
                required
                placeholder="your@email.com"
                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200">
            </div>

            <!-- Two-column row: Phone and Service -->
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label for="<?php echo esc_attr($blockId); ?>-phone" class="block mb-2 text-sm font-medium text-accent">
                  Phone Number <span class="text-cta">*</span>
                </label>
                <input 
                  type="tel" 
                  id="<?php echo esc_attr($blockId); ?>-phone"
                  name="phone"
                  required
                  placeholder="(123) 456-7890"
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200">
              </div>

              <div>
                <label for="<?php echo esc_attr($blockId); ?>-service" class="block mb-2 text-sm font-medium text-accent">
                  Service Needed
                </label>
                <select 
                  id="<?php echo esc_attr($blockId); ?>-service"
                  name="service"
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white cursor-pointer transition-all duration-200">
                  <?php foreach ($serviceOptions as $service) : ?>
                    <option value="<?php echo esc_attr($service); ?>"><?php echo esc_html($service); ?></option>
                  <?php endforeach; ?>
                </select>
              </div>
            </div>

            <!-- Message Field -->
            <div>
              <label for="<?php echo esc_attr($blockId); ?>-message" class="block mb-2 text-sm font-medium text-accent">
                Message
              </label>
              <textarea 
                id="<?php echo esc_attr($blockId); ?>-message"
                name="message"
                rows="5"
                placeholder="Please provide details about your project..."
                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"></textarea>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="flex justify-center items-center w-full py-4 px-6 font-medium text-white rounded-md transition-all duration-300 cursor-pointer bg-primary hover:bg-primary/90 gap-2"
              data-motion="hover-lift">
              <span><?php echo esc_html($ctaText); ?></span>
              <i data-lucide="arrow-right" class="w-5 h-5"></i>
            </button>
          </form>
        </div>

      </div>
    </div>

  </div>
</section>

<script>
(function() {
  const blockId = '<?php echo esc_attr($blockId); ?>';
  const formId = blockId + '-form';
  const successId = blockId + '-success';

  const form = document.getElementById(formId);
  const successMsg = document.getElementById(successId);

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Show success message
      successMsg.classList.remove('hidden');
      
      // Reset form
      form.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        successMsg.classList.add('hidden');
      }, 5000);

      // Scroll to success message
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
})();
</script>
