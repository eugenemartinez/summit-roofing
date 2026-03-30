<?php
/**
 * About Section — render.php
 *
 * Available variables:
 *   $attributes  (array)  Block attributes from blocks.json
 *   $content     (string) Inner blocks HTML (unused — no inner blocks)
 *   $block       (WP_Block) Block instance
 */

// ── Attributes with fallbacks ─────────────────────────────────────────────
$eyebrow_text = esc_html($attributes["eyebrowText"] ?? "About Us");
$heading = esc_html($attributes["heading"] ?? "");
$body = esc_html($attributes["body"] ?? "");
$features = $attributes["features"] ?? [];
$cta_text = esc_html($attributes["ctaText"] ?? "Explore Our Services");
$cta_url = esc_url($attributes["ctaUrl"] ?? "#services");
$badge_number = esc_html($attributes["badgeNumber"] ?? "20+");
$badge_label = esc_html($attributes["badgeLabel"] ?? "Years Experience");
$image_id = intval($attributes["imageId"] ?? 0);
$image_url = esc_url(
    $attributes["imageUrl"] ??
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
);
$image_alt = esc_attr($attributes["imageAlt"] ?? "");

// ── Resolve image: prefer WP media library over raw URL ──────────────────
if ($image_id > 0) {
    $image_src = esc_url(
        wp_get_attachment_image_url($image_id, "large") ?: $image_url,
    );
    if (empty($image_alt)) {
        $image_alt = esc_attr(
            get_post_meta($image_id, "_wp_attachment_image_alt", true),
        );
    }
} else {
    $image_src = $image_url;
}
?>

<section
	id="about"
	class="py-16"
	style="background-color: var(--muted, #F5F5F5);"
>
	<div class="container px-4 mx-auto">

		<div
			class="flex flex-col gap-12 items-center lg:flex-row"
			data-motion="fade-in"
			data-scroll="true"
			data-scroll-start="0.1"
			data-duration="0.8"
		>

			<div
				class="w-full lg:w-1/2"
				data-motion="fade-left"
				data-scroll="true"
				data-scroll-start="0.15"
				data-duration="0.8"
				data-delay="0.2"
			>
				<div class="relative">

					<?php if ($image_src): ?>
						<img
							src="<?php echo $image_src; ?>"
							alt="<?php echo $image_alt; ?>"
							class="object-cover w-full rounded-lg shadow-lg"
							style="height: 500px;"
							data-motion="fade-in"
							data-scroll="true"
							data-scroll-start="0.15"
							data-duration="0.8"
							loading="lazy"
						/>
					<?php endif; ?>

					<div
						class="hidden absolute p-4 bg-white rounded-lg shadow-xl md:block"
						style="bottom: -1.5rem; right: -1.5rem;"
						data-motion="fade-up"
						data-scroll="true"
						data-scroll-start="0.2"
						data-duration="0.6"
						data-delay="0.6"
					>
						<p
							class="text-4xl font-bold"
							style="color: var(--primary, #1E3A5E); font-family: var(--font-headline, 'Poppins', sans-serif);"
							data-motion="zoom-in"
							data-scroll="true"
							data-scroll-start="0.2"
							data-duration="0.4"
							data-delay="0.9"
						>
							<?php echo $badge_number; ?>
						</p>
						<p style="color: var(--accent, #36454F);">
							<?php echo $badge_label; ?>
						</p>
					</div>

				</div>
			</div>

			<div
				class="w-full lg:w-1/2"
				data-motion="fade-right"
				data-scroll="true"
				data-scroll-start="0.15"
				data-duration="0.8"
				data-delay="0.2"
			>

				<div
					class="flex items-center mb-4"
					data-motion="fade-left"
					data-scroll="true"
					data-scroll-start="0.2"
					data-duration="0.5"
				>
					<div
						class="flex-shrink-0 mr-4"
						style="height: 4px; width: 3rem; background-color: var(--cta, #D86A6A); border-radius: 2px;"
					></div>
					<span
						class="text-sm font-semibold tracking-wider uppercase"
						style="color: var(--accent, #36454F);"
					>
						<?php echo $eyebrow_text; ?>
					</span>
				</div>

				<h2
					class="mb-6 text-3xl font-bold md:text-4xl"
					style="color: var(--primary, #1E3A5E); font-family: var(--font-headline, 'Poppins', sans-serif);"
					data-motion="fade-up"
					data-scroll="true"
					data-scroll-start="0.2"
					data-duration="0.6"
					data-delay="0.2"
				>
					<?php echo $heading; ?>
				</h2>

				<p
					class="mb-6 leading-relaxed"
					style="color: var(--accent, #36454F);"
					data-motion="fade-in"
					data-scroll="true"
					data-scroll-start="0.2"
					data-duration="0.6"
					data-delay="0.3"
				>
					<?php echo $body; ?>
				</p>

				<?php if (!empty($features)): ?>
					<div
						class="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2"
						data-motion="stagger-fade-up"
						data-scroll="true"
						data-scroll-start="0.2"
						data-duration="0.5"
						data-delay="0.4"
						data-stagger="0.1"
					>
						<?php foreach ($features as $feature):

						    $feat_title = esc_html($feature["title"] ?? "");
						    $feat_desc = esc_html($feature["description"] ?? "");
						    ?>
							<div
								class="flex items-start"
								data-motion="hover-rise"
							>
								<div
									class="flex-shrink-0 p-2 mr-4 text-white rounded-full"
									style="background-color: var(--primary, #1E3A5E);"
								>
							    <i data-lucide="check-circle-2" class="w-5 h-5 text-cta"></i>
								</div>
								<div>
									<h4
										class="mb-1 text-sm font-semibold"
										style="color: var(--primary, #1E3A5E);"
									>
										<?php echo $feat_title; ?>
									</h4>
									<p
										class="text-sm"
										style="color: var(--accent, #36454F);"
									>
										<?php echo $feat_desc; ?>
									</p>
								</div>
							</div>
						<?php
						endforeach; ?>
					</div>
				<?php endif; ?>

				<?php if ($cta_text && $cta_url): ?>
					<a
						href="<?php echo $cta_url; ?>"
						class="inline-flex items-center font-medium transition-colors duration-300"
						style="color: var(--cta, #D86A6A);"
						data-motion="fade-in hover-arrow"
						data-scroll="true"
						data-scroll-start="0.2"
						data-duration="0.5"
						data-delay="0.9"
					>
						<?php echo $cta_text; ?>
						<span data-arrow class="inline-flex items-center">
						  <i data-lucide="arrow-right" class="ml-2 w-5 h-5"></i>
						</span>
					</a>
				<?php endif; ?>

			</div>

		</div>
	</div>
</section>
