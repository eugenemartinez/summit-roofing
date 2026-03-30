<?php
/**
 * Call to Action Block Template
 */

// 1. Let WordPress handle the ID and Classes automatically
// This replaces your $id and $className logic entirely.
$wrapper_attributes = get_block_wrapper_attributes([
    "class" => "relative py-16 overflow-hidden",
    "style" =>
        "background-color: var(--primary); color: var(--primary-foreground);",
]);

// 2. Safely get attributes with defaults
$attributes = wp_parse_args($attributes, [
    "heading" => 'Ready for a Roof That <span class="text-cta">Lasts</span>?',
    "subheading" => 'Don\'t wait until leaks or damage worsen.',
    "primaryButtonText" => "Request Free Estimate",
    "primaryButtonUrl" => "#contact",
    "secondaryButtonText" => "Call Us Now",
    "secondaryButtonPhone" => "tel:+15551234567",
    "trustIndicators" => [],
    "projectsCompleted" => "1,500",
    "rating" => "4.9/5",
]);
?>

<section <?php echo $wrapper_attributes; ?>>
    <!-- Background pattern with animation -->
<div class="overflow-hidden absolute inset-0 z-0 pointer-events-none">
        <svg 
            class="w-full h-full opacity-20" 
            viewBox="0 0 800 800" 
            xmlns="http://www.w3.org/2000/svg"
            data-motion="svg-container"
        >
            <g stroke="white" fill="none" stroke-width="80">
                <path d="M0 0L800 0L800 800L0 800L0 0Z" data-motion="path-anim" data-motion-delay="0" />
                <path d="M100 100L700 100L700 700L100 700L100 100Z" data-motion="path-anim" data-motion-delay="0.5" />
                <path d="M200 200L600 200L600 600L200 600L200 200Z" data-motion="path-anim" data-motion-delay="1" />
            </g>
        </svg>
    </div>

    <div class="container relative z-10 px-4 mx-auto">
        <div class="mx-auto max-w-5xl text-center" data-motion="stagger-container">
            <div class="inline-block mb-4" data-motion="scale-in">
                <div class="mx-auto w-20 h-1 bg-cta"></div>
            </div>

            <h2 class="mb-6 text-3xl font-bold leading-tight text-white md:text-5xl" data-motion="fade-up" data-motion-delay="0.1">
                <?php echo wp_kses($attributes["heading"], [
                    "span" => ["class" => []],
                    "br" => [],
                ]); ?>
            </h2>

            <p class="mx-auto mb-8 max-w-3xl text-lg text-white/80" data-motion="fade-up" data-motion-delay="0.2">
                <?php echo esc_html($attributes["subheading"]); ?>
            </p>

            <div class="flex flex-col gap-4 justify-center sm:flex-row" data-motion="fade-up" data-motion-delay="0.3">
                <!-- Primary CTA button -->
                <a
                    href="<?php echo esc_url(
                        $attributes["primaryButtonUrl"],
                    ); ?>"
                    class="py-4 px-8 text-lg font-medium text-center text-white rounded-md shadow-lg transition-all duration-300 bg-cta shadow-cta/20 smooth-scroll hover:bg-cta/90"
                    data-motion="button-hover"
                >
                    <?php echo esc_html($attributes["primaryButtonText"]); ?>
                </a>

                <!-- Secondary CTA button -->
                <a
                    href="<?php echo esc_url(
                        $attributes["secondaryButtonPhone"],
                    ); ?>"
                    class="flex justify-center items-center py-4 px-8 font-medium text-center text-white rounded-md border transition-all duration-300 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
                    data-motion="button-hover"
                >
                    <i data-lucide="phone" class="mr-2 w-4 h-4"></i>
                    <?php echo esc_html($attributes["secondaryButtonText"]); ?>
                </a>
            </div>

            <!-- Animated trust indicators -->
            <div class="flex flex-wrap gap-6 justify-center items-center mt-12 md:gap-10" data-motion="fade-up" data-motion-delay="0.4">
                <?php if (is_array($attributes["trustIndicators"])): ?>
                    <?php foreach (
                        $attributes["trustIndicators"] as $index => $indicator
                    ): ?>
                        <div
                            class="flex items-center py-2 px-4 rounded-full border transition-all duration-300 bg-white/10 backdrop-blur-sm border-white/10 hover:bg-white/15"
                            data-motion="scale-hover"
                            data-motion-delay="<?php echo 0.5 +
                                $index * 0.1; ?>"
                        >
                            <i data-lucide="<?php echo esc_attr(
                                $indicator["icon"],
                            ); ?>" class="mr-2 text-xl text-cta"></i>
                            <span class="text-sm text-white"><?php echo esc_html(
                                $indicator["text"],
                            ); ?></span>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>

            <!-- Additional social proof -->
            <div
                class="p-6 mx-auto mt-16 max-w-3xl rounded-lg border transition-all duration-300 bg-white/10 backdrop-blur-sm border-white/10 hover:bg-white/15"
                data-motion="fade-up"
                data-motion-delay="0.6"
                data-motion="card-hover"
            >
                <div class="flex justify-center items-center mb-3">
                    <?php for ($i = 1; $i <= 5; $i++): ?>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 text-yellow-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            data-motion="star-appear"
                            data-motion-delay="<?php echo 0.7 + $i * 0.1; ?>"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    <?php endfor; ?>
                </div>
                <p class="text-center text-white" data-motion="fade-in" data-motion-delay="1.2">
                    <span class="font-semibold">We've completed over <?php echo esc_html(
                        $attributes["projectsCompleted"],
                    ); ?> projects</span> with a
                    <span class="font-bold text-yellow-400"> <?php echo esc_html(
                        $attributes["rating"],
                    ); ?></span> customer satisfaction rating!
                </p>
            </div>
        </div>
    </div>

    <!-- Animated corner decoration -->
    <div
        class="absolute -right-24 -bottom-24 w-48 h-48 rounded-full bg-cta/20"
        data-motion="scale-in"
        data-motion-delay="0.5"
    ></div>

    <div
        class="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-white/10"
        data-motion="scale-in"
        data-motion-delay="0.7"
    ></div>
</section>


