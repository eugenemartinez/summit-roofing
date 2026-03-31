<?php
/**
 * Testimonials Block - Frontend Render
 * Displays testimonials in mobile carousel + desktop grid layout
 */

$eyebrow_text = isset($attributes["eyebrowText"])
    ? sanitize_text_field($attributes["eyebrowText"])
    : "Testimonials";
$heading = isset($attributes["heading"])
    ? sanitize_text_field($attributes["heading"])
    : "What Our Customers Say";
$subheading = isset($attributes["subheading"])
    ? wp_kses_post($attributes["subheading"])
    : "";
$testimonials =
    isset($attributes["testimonials"]) && is_array($attributes["testimonials"])
        ? $attributes["testimonials"]
        : [];
$review_score = isset($attributes["reviewScore"])
    ? sanitize_text_field($attributes["reviewScore"])
    : "4.9/5.0";
$review_count = isset($attributes["reviewCount"])
    ? sanitize_text_field($attributes["reviewCount"])
    : "Based on 150+ Reviews";
$bbb_rating = isset($attributes["bbbRating"])
    ? sanitize_text_field($attributes["bbbRating"])
    : "A+ Rating";
$bbb_label = isset($attributes["bbbLabel"])
    ? sanitize_text_field($attributes["bbbLabel"])
    : "Better Business Bureau";
$years_title = isset($attributes["yearsTitle"])
    ? sanitize_text_field($attributes["yearsTitle"])
    : "20+ Years";
$years_label = isset($attributes["yearsLabel"])
    ? sanitize_text_field($attributes["yearsLabel"])
    : "Serving our community";
$auto_advance_delay = isset($attributes["autoAdvanceDelay"])
    ? intval($attributes["autoAdvanceDelay"])
    : 6000;

// Normalize testimonials data
$safe_testimonials = array_map(function ($t) {
    return [
        "id" => isset($t["id"]) ? intval($t["id"]) : 0,
        "name" => isset($t["name"]) ? sanitize_text_field($t["name"]) : "",
        "location" => isset($t["location"])
            ? sanitize_text_field($t["location"])
            : "",
        "rating" => isset($t["rating"]) ? intval($t["rating"]) : 5,
        "text" => isset($t["text"]) ? wp_kses_post($t["text"]) : "",
        "imageUrl" => isset($t["imageUrl"]) ? esc_url($t["imageUrl"]) : "",
    ];
}, $testimonials);

// Fallback testimonials if empty
if (empty($safe_testimonials)) {
    $safe_testimonials = [
        [
            "id" => 1,
            "name" => "Jennifer Thompson",
            "location" => "Westview, CA",
            "rating" => 5,
            "text" =>
                'Summit Roofing replaced our entire roof after storm damage, and we couldn\'t be happier with the results.',
            "imageUrl" => "https://randomuser.me/api/portraits/women/32.jpg",
        ],
    ];
}
?>

<section id="testimonials" class="py-16 bg-gradient-to-br from-primary via-primary to-primary/90">
	<div class="container px-4 mx-auto">
		<!-- Header -->
		<div class="mb-12 text-center" data-motion="fade-up">
			<div class="flex justify-center items-center mb-4">
				<div class="mr-4 w-12 h-1 bg-cta"></div>
				<span class="text-sm font-semibold tracking-wider text-white uppercase">
					<?php echo esc_html($eyebrow_text); ?>
				</span>
				<div class="ml-4 w-12 h-1 bg-cta"></div>
			</div>
			
			<h2 class="mb-4 text-3xl font-bold text-white md:text-4xl">
				<?php echo esc_html($heading); ?>
			</h2>
			
			<p class="mx-auto max-w-2xl text-white/80">
				<?php echo wp_kses_post($subheading); ?>
			</p>
		</div>

		<!-- Mobile Carousel (hidden on md and up) -->
		<div class="mb-8 md:hidden">
			<div class="relative p-6 bg-white rounded-lg shadow-lg testimonials-mobile-carousel min-h-[400px]" data-auto-delay="<?php echo esc_attr(
			    $auto_advance_delay,
			); ?>">
				<!-- Quote Icon -->
				<div class="absolute -top-5 left-6 z-10 p-3 rounded-full bg-cta">
					<i data-lucide="quote" style="width: 1.25rem; height: 1.25rem; color: #ffffff;"></i>
				</div>

				<!-- Carousel Slides -->
				<div class="relative h-full testimonials-carousel-slides">
					<?php foreach ($safe_testimonials as $index => $testimonial): ?>
						<div class="absolute inset-0 pt-4 opacity-0 transition-opacity duration-500 testimonials-slide" data-index="<?php echo esc_attr(
						    $index,
						); ?>" style="<?php echo $index === 0 ? "opacity: 1;" : ""; ?>">
							<!-- Avatar + Name -->
							<div class="flex items-center mt-2 mb-4">
								<img 
									src="<?php echo esc_url($testimonial["imageUrl"]); ?>" 
									alt="<?php echo esc_attr($testimonial["name"]); ?>"
									class="object-cover mr-4 w-12 h-12 rounded-full border-2 border-primary/20"
								>
								<div>
									<h4 class="font-bold text-primary">
										<?php echo esc_html($testimonial["name"]); ?>
									</h4>
									<p class="flex items-center text-sm text-accent">
										<i data-lucide="map-pin" style="width: 0.75rem; height: 0.75rem; margin-right: 4px;"></i>
										<?php echo esc_html($testimonial["location"]); ?>
									</p>
								</div>
							</div>

							<!-- Stars -->
							<div class="flex mb-3 space-x-1">
								<?php for ($i = 0; $i < 5; $i++): ?>
									<span style="font-size: 1rem; color: <?php echo $i < $testimonial["rating"]
						       ? "#FACC15"
						       : "#D1D5DB"; ?>;">★</span>
								<?php endfor; ?>
							</div>

							<!-- Text -->
							<p class="overflow-y-auto pr-2 mb-8 text-accent max-h-[160px]">
								"<?php echo wp_kses_post($testimonial["text"]); ?>"
							</p>
						</div>
					<?php endforeach; ?>
				</div>

				<!-- Navigation Controls -->
				<div class="flex absolute right-0 left-0 bottom-6 justify-center items-center space-x-6">
					<!-- Prev Button -->
					<button class="flex justify-center items-center w-9 h-9 bg-gray-100 rounded-full border border-gray-200 shadow-sm transition-all duration-300 hover:bg-gray-200 testimonials-prev">
<i data-lucide="chevron-left" class="w-5 h-5 text-primary"></i>
					</button>

					<!-- Dot Indicators -->
					<div class="flex justify-center space-x-2 testimonials-dots">
						<?php foreach ($safe_testimonials as $index => $testimonial): ?>
							<button 
								class="testimonials-dot h-2.5 rounded-full transition-all duration-300 <?php echo $index ===
						  0
						      ? "w-8 bg-cta"
						      : "w-2.5 bg-gray-300"; ?>"
								data-index="<?php echo esc_attr($index); ?>"
								aria-label="Go to testimonial <?php echo esc_attr($index + 1); ?>"
							></button>
						<?php endforeach; ?>
					</div>

					<!-- Next Button -->
					<button class="flex justify-center items-center w-9 h-9 bg-gray-100 rounded-full border border-gray-200 shadow-sm transition-all duration-300 hover:bg-gray-200 testimonials-next">
<i data-lucide="chevron-right" class="w-5 h-5 text-primary"></i>
					</button>
				</div>
			</div>
		</div>

		<!-- Desktop Grid (hidden on md and below) -->
		<div class="hidden grid-cols-1 gap-6 mb-12 md:grid md:grid-cols-2 lg:grid-cols-3" data-motion="fade-up" data-motion-delay="0.1">
			<?php foreach ($safe_testimonials as $index => $testimonial): ?>
				<div class="relative p-6 bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2" data-motion="fade-up" data-motion-delay="<?php echo esc_attr(
				    0.1 * ($index + 1),
				); ?>">
					<!-- Quote Icon -->
					<div class="absolute -top-5 left-6 p-3 rounded-full bg-cta">
						<i data-lucide="quote" style="width: 1.25rem; height: 1.25rem; color: #ffffff;"></i>
					</div>

					<div class="pt-4">
						<!-- Avatar + Name -->
						<div class="flex items-center mt-2 mb-4">
							<img 
								src="<?php echo esc_url($testimonial["imageUrl"]); ?>" 
								alt="<?php echo esc_attr($testimonial["name"]); ?>"
								class="object-cover mr-4 w-12 h-12 rounded-full border-2 border-primary/20"
							>
							<div>
								<h4 class="font-bold text-primary">
									<?php echo esc_html($testimonial["name"]); ?>
								</h4>
								<p class="flex items-center text-sm text-accent">
									<i data-lucide="map-pin" style="width: 0.75rem; height: 0.75rem; margin-right: 4px;"></i>
									<?php echo esc_html($testimonial["location"]); ?>
								</p>
							</div>
						</div>

						<!-- Stars -->
						<div class="flex mb-3 space-x-1">
							<?php for ($i = 0; $i < 5; $i++): ?>
								<span style="font-size: 1rem; color: <?php echo $i < $testimonial["rating"]
				        ? "#FACC15"
				        : "#D1D5DB"; ?>;">★</span>
							<?php endfor; ?>
						</div>

						<!-- Text -->
						<p class="text-accent">
							"<?php echo wp_kses_post($testimonial["text"]); ?>"
						</p>
					</div>
				</div>
			<?php endforeach; ?>
		</div>

		<!-- Review Badges -->
		<div class="flex flex-col justify-center items-center space-y-4 md:flex-row md:space-y-0 md:space-x-8" data-motion="fade-up">
			<!-- Star Rating Badge -->
			<div class="flex items-center py-3 px-6 rounded-lg transition-all duration-300 bg-white/10 backdrop-blur-sm hover:bg-white/15" data-motion="fade-up hover-scale" data-motion-delay="0.1">
				<i data-lucide="star" style="width: 1.5rem; height: 1.5rem; color: #ffffff; margin-right: 0.75rem; flex-shrink: 0;"></i>
				<div class="text-white">
					<p class="text-lg font-bold">
						<?php echo esc_html($review_score); ?>
					</p>
					<p class="text-sm">
						<?php echo esc_html($review_count); ?>
					</p>
				</div>
			</div>

			<!-- BBB Badge -->
			<div class="flex items-center py-3 px-6 rounded-lg transition-all duration-300 bg-white/10 backdrop-blur-sm hover:bg-white/15" data-motion="fade-up hover-scale" data-motion-delay="0.2">
				<i data-lucide="file-text" style="width: 1.5rem; height: 1.5rem; color: #ffffff; margin-right: 0.75rem; flex-shrink: 0;"></i>
				<div class="text-white">
					<p class="text-lg font-bold">
						<?php echo esc_html($bbb_rating); ?>
					</p>
					<p class="text-sm">
						<?php echo esc_html($bbb_label); ?>
					</p>
				</div>
			</div>

			<!-- Years Badge -->
			<div class="flex items-center py-3 px-6 rounded-lg transition-all duration-300 bg-white/10 backdrop-blur-sm hover:bg-white/15" data-motion="fade-up hover-scale" data-motion-delay="0.3">
				<i data-lucide="clock" style="width: 1.5rem; height: 1.5rem; color: #ffffff; margin-right: 0.75rem; flex-shrink: 0;"></i>
				<div class="text-white">
					<p class="text-lg font-bold">
						<?php echo esc_html($years_title); ?>
					</p>
					<p class="text-sm">
						<?php echo esc_html($years_label); ?>
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
