<?php
/**
 * FAQ Block - Frontend Render
 * Displays FAQ accordion with expandable questions and answers
 */

$eyebrow_text = isset($attributes['eyebrowText']) ? sanitize_text_field($attributes['eyebrowText']) : 'FAQ';
$heading = isset($attributes['heading']) ? sanitize_text_field($attributes['heading']) : 'Frequently Asked Questions';
$subheading = isset($attributes['subheading']) ? wp_kses_post($attributes['subheading']) : '';
$faq_items = isset($attributes['faqItems']) && is_array($attributes['faqItems']) ? $attributes['faqItems'] : [];
$show_cta = isset($attributes['showCTA']) ? (bool) $attributes['showCTA'] : true;
$cta_text = isset($attributes['ctaText']) ? sanitize_text_field($attributes['ctaText']) : 'Get in Touch';
$cta_heading = isset($attributes['ctaHeading']) ? sanitize_text_field($attributes['ctaHeading']) : 'Still have questions?';
$cta_subheading = isset($attributes['ctaSubheading']) ? wp_kses_post($attributes['ctaSubheading']) : '';

// Normalize FAQ items data
$safe_faq_items = array_map(function($item) {
	return array(
		'id' => isset($item['id']) ? intval($item['id']) : 0,
		'question' => isset($item['question']) ? sanitize_text_field($item['question']) : '',
		'answer' => isset($item['answer']) ? wp_kses_post($item['answer']) : '',
	);
}, $faq_items);

// Fallback FAQ items if empty
if (empty($safe_faq_items)) {
	$safe_faq_items = array(
		array(
			'id' => 1,
			'question' => 'How long does a typical roof installation take?',
			'answer' => 'Most residential roof installations can be completed in 1-3 days, depending on the size of your roof, weather conditions, and complexity of the job.',
		)
	);
}
?>

<section id="faq"class="py-16 bg-neutral-bg relative overflow-hidden">
	<!-- Background decorations -->
	<div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32"></div>
	<div class="absolute bottom-0 left-0 w-96 h-96 bg-cta/5 rounded-full -ml-48 -mb-48"></div>

	<div class="container mx-auto px-4 relative z-10">
		<!-- Header -->
		<div class="text-center mb-12" data-motion="fade-up">
			<div class="flex items-center justify-center mb-4">
				<div class="h-1 w-12 bg-cta mr-4"></div>
				<span class="text-accent uppercase tracking-wider text-sm font-semibold">
					<?php echo esc_html($eyebrow_text); ?>
				</span>
				<div class="h-1 w-12 bg-cta ml-4"></div>
			</div>
			
			<h2 class="text-3xl md:text-4xl font-bold text-primary mb-4">
				<?php echo esc_html($heading); ?>
			</h2>
			
			<p class="text-accent max-w-2xl mx-auto">
				<?php echo wp_kses_post($subheading); ?>
			</p>
		</div>

		<!-- FAQ Accordion -->
        <div class="max-w-3xl mx-auto mb-8" data-motion="fade-up" data-motion-delay="0.1">
            <?php foreach ($safe_faq_items as $index => $item) : ?>
                <div 
                    class="faq-item mb-5 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300" 
                    data-motion="fade-up"
                    data-motion-delay="<?php echo esc_attr(0.1 * ($index + 1)); ?>"
                >
                    <button 
                        type="button"
                        class="faq-toggle w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-cta/50 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        aria-expanded="false"
                        aria-controls="faq-answer-<?php echo esc_attr($item['id']); ?>"
                    >
                        <div class="flex items-center flex-1">
                            <i data-lucide="help-circle" class="text-cta mr-3 flex-shrink-0 w-5 h-5"></i>
                            <span class="font-semibold text-primary">
                                <?php echo esc_html($item['question']); ?>
                            </span>
                        </div>

                        <div class="faq-chevron bg-primary/5 rounded-full p-1 text-primary flex-shrink-0 ml-4 transition-transform duration-300">
                            <i data-lucide="chevron-down" class="w-5 h-5"></i>
                        </div>
                    </button>

                    <div 
                        id="faq-answer-<?php echo esc_attr($item['id']); ?>"
                        class="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out"
                    >
                        <div class="px-6 pb-5">
                            <div class="bg-gray-50 p-4 rounded-lg border-l-4 border-cta text-accent mt-4">
                                <?php echo wp_kses_post($item['answer']); ?>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

		<!-- CTA Section -->
		<?php if ($show_cta) : ?>
			<div class="text-center mt-14 bg-white p-8 rounded-xl shadow-sm max-w-3xl mx-auto border border-gray-100 hover:shadow-md transition-all duration-300" data-motion="fade-up">
				<div class="inline-block mb-4 bg-cta/10 p-3 rounded-full" style="display: inline-block;">
					<i 
						data-lucide="help-circle"
						style="width: 2rem; height: 2rem; color: #d86a6a;"
					></i>
				</div>
				
				<h3 class="text-xl font-bold text-primary mb-2">
					<?php echo esc_html($cta_heading); ?>
				</h3>
				
				<p class="text-accent mb-6">
					<?php echo wp_kses_post($cta_subheading); ?>
				</p>
				
				<a 
					href="#contact" 
					class="inline-flex items-center justify-center bg-cta hover:bg-cta/90 text-white font-medium px-6 py-3 rounded-md transition-all duration-300"
                    data-motion="hover-scale"
				>
					<?php echo esc_html($cta_text); ?>
					<span style="margin-left: 0.5rem;">→</span>
				</a>
			</div>
		<?php endif; ?>
	</div>
</section>
