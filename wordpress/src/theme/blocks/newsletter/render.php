<?php
/**
 * Newsletter Subscribe Block Template
 *
 * @param array $attributes Block attributes.
 */

// Let WordPress handle the ID and Classes automatically
$wrapper_attributes = get_block_wrapper_attributes([
    "class" =>
        "overflow-hidden relative py-12 bg-gradient-to-br from-primary-dark/30 to-primary/20 backdrop-blur-sm",
]);

// Safely get attributes with defaults
$attributes = wp_parse_args($attributes, [
    "title" => "Subscribe to Our Newsletter",
    "subtitle" =>
        "Stay updated with our latest offers, promotions and roofing tips",
    "features" => ["Monthly Updates", "Expert Tips", "Special Offers"],
    "buttonText" => "Subscribe",
    "placeholderText" => "Your email address",
    "privacyText" =>
        "We respect your privacy. You can unsubscribe at any time.",
    "successTitle" => "Success!",
    "successMessage" => "Redirecting to repository details...",
    "errorTitle" => "Something Went Wrong",
    "errorMessage" => "Please try again or contact us directly.",
]);
?>

<section <?php echo wp_kses_post($wrapper_attributes); ?>>
    <!-- Decorative elements -->
    <div
        class="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent to-transparent via-cta/50"
        data-motion="scale-x"
        data-scroll="true"
    ></div>

    <div
        class="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-cta/10"
        data-motion="float"
        data-y="-10"
        data-duration="6"
    ></div>

    <div
        class="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-primary-dark/20"
        data-motion="float"
        data-y="15"
        data-duration="7"
    ></div>

    <div class="container relative z-10 px-4 mx-auto">
        <div class="mx-auto max-w-3xl text-center">
            <div class="flex flex-col items-center mb-8" data-motion="stagger-fade-up" data-scroll="true">
                <div
                    class="inline-flex justify-center items-center p-4 mb-4 rounded-full transition-all duration-300 bg-cta/20 hover:bg-cta/30"
                    data-motion="hover-scale"
                >
                    <i data-lucide="mail" class="text-2xl text-cta"></i>
                </div>

                <h3 class="mb-2 text-2xl font-bold text-gray-800 bg-clip-text bg-gradient-to-r sm:text-3xl from-bg to-bg/80" data-motion="fade-up">
                    <?php echo esc_html($attributes["title"]); ?>
                </h3>

                <p class="mb-2 text-gray-800/70" data-motion="fade-up">
                    <?php echo esc_html($attributes["subtitle"]); ?>
                </p>

                <div class="flex flex-wrap gap-3 justify-center items-center mb-6 text-xs text-black" data-motion="fade-up">
                    <?php if (is_array($attributes["features"])): ?>
                        <?php foreach (
                            $attributes["features"] as $index => $feature
                        ): ?>
                            <div class="flex items-center">
                                <?php if ($index > 0): ?>
                                    <span class="hidden mx-2 text-black sm:inline-block">•</span>
                                <?php endif; ?>
                                <div
                                    class="flex items-center py-1.5 px-3 rounded-full transition-all duration-300 bg-white/80 hover:bg-white/90"
                                    data-motion="hover-lift"
                                >
                                    <i data-lucide="zap" class="mr-1.5 text-xs text-cta"></i>
                                    <span class="font-medium"><?php echo esc_html(
                                        $feature,
                                    ); ?></span>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
            </div>

            <!-- Newsletter Form -->
            <div
                class="relative z-10 p-2 rounded-lg border shadow-xl transition-shadow duration-300 hover:shadow-2xl bg-white/10 backdrop-blur-md border-white/20"
                data-motion="fade-up"
                data-scroll="true"
                data-delay="0.2"
                data-motion="hover-card"
            >
                <form class="flex flex-col gap-3 sm:flex-row newsletter-form" data-form-state="idle">
                    <div class="relative flex-grow">
                        <div class="absolute left-3 top-1/2 z-20 transition-all duration-300 -translate-y-1/2 pointer-events-none" data-envelope-icon>
                            <i data-lucide="mail" class="w-5 h-5 text-gray-400"></i>
                        </div>
                        
<input
        type="email"
        name="email"
        placeholder="<?php echo esc_attr($attributes["placeholderText"]); ?>"
        class="py-3 pr-4 pl-10 w-full bg-white rounded-md transition-all duration-300 focus:ring-2 focus:outline-none newsletter-email text-accent focus:ring-cta"
        required
    />
                    </div>
                    <button
                        type="submit"
                        class="flex justify-center items-center py-3 px-6 font-medium text-white rounded-md transition-colors duration-300 cursor-pointer newsletter-submit bg-cta min-w-[120px] hover:bg-cta/90"
                        data-motion="hover-scale"
                    >
                        <span class="submit-text"><?php echo esc_html(
                            $attributes["buttonText"],
                        ); ?></span>
                        <i data-lucide="send" class="ml-2 submit-icon"></i>
                        <div class="hidden ml-2 loading-spinner">
                            <i data-lucide="loader-2" class="w-4 h-4 text-white animate-spin"></i>
                        </div>
                    </button>
                </form>

                <!-- Success State -->
                <div class="hidden p-6 text-white rounded-lg border newsletter-success bg-green-500/20 border-green-500/30" data-motion="fade-in">
                    <div class="flex flex-col items-center text-primary">
                        <div class="p-3 mb-3 rounded-full bg-green-500/30">
                            <i data-lucide="check-circle" class="text-2xl text-green-600"></i>
                        </div>
                        <h4 class="mb-1 text-xl font-semibold"><?php echo esc_html(
                            $attributes["successTitle"],
                        ); ?></h4>
                        <p><?php echo esc_html(
                            $attributes["successMessage"],
                        ); ?></p>
                    </div>
                </div>

                <!-- Error State -->
                <div class="hidden p-6 text-white rounded-lg border newsletter-error bg-red-500/20 border-red-500/30" data-motion="fade-in">
                    <div class="flex flex-col items-center text-primary">
                        <div class="p-3 mb-3 rounded-full bg-red-500/30">
                            <i data-lucide="alert-triangle" class="text-2xl text-red-400"></i>
                        </div>
                        <h4 class="mb-1 text-xl font-semibold"><?php echo esc_html(
                            $attributes["errorTitle"],
                        ); ?></h4>
                        <p><?php echo esc_html(
                            $attributes["errorMessage"],
                        ); ?></p>
                    </div>
                </div>
            </div>

            <p class="mt-4 text-xs text-bg/60" data-motion="fade-in" data-scroll="true" data-delay="0.3">
                <?php echo esc_html($attributes["privacyText"]); ?>
            </p>
        </div>
    </div>
</section>
