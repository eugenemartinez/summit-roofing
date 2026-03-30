<?php
/**
 * Services Section — render.php
 *
 * Available variables:
 * $attributes  (array)    Block attributes from block.json
 * $content     (string)   Inner blocks HTML (unused)
 * $block       (WP_Block) Block instance
 */

// ── Section header ────────────────────────────────────────────────────────
$eyebrow_text = esc_html($attributes["eyebrowText"] ?? "Our Services");
$heading = esc_html(
    $attributes["heading"] ?? "Comprehensive Roofing Solutions",
);
$subheading = esc_html(
    $attributes["subheading"] ??
        "From installation to repairs, we provide expert roofing services for residential and commercial properties.",
);

// ── Services array ────────────────────────────────────────────────────────
$services = $attributes["services"] ?? [];

// ── Banner ────────────────────────────────────────────────────────────────
$banner_heading = esc_html(
    $attributes["bannerHeading"] ?? "Not sure which service you need?",
);
$banner_subtext = esc_html(
    $attributes["bannerSubtext"] ??
        "Our experts can assess your roofing needs and recommend the best solution.",
);
$banner_cta_text = esc_html(
    $attributes["bannerCtaText"] ?? "Schedule a Free Consultation",
);
$banner_cta_url = esc_url($attributes["bannerCtaUrl"] ?? "#contact");

// ── Lucide Icon Mapping ───────────────────────────────────────────────────
// Maps the attribute values from the block editor to Lucide icon names.
$lucide_name_map = [
    "home" => "home",
    "building" => "building-2",
    "tools" => "wrench",
    "clipboard" => "clipboard-list",
    "storm" => "zap",
    "leaf" => "leaf",
];
?>

<section
    id="services"
    class="py-16 bg-white"
>
    <div class="container px-4 mx-auto">

        <div
            class="mb-12 text-center"
            data-motion="fade-up"
            data-scroll="true"
            data-scroll-start="0.1"
            data-duration="0.6"
        >
            <div
                class="flex justify-center items-center mb-4"
                data-motion="fade-in"
                data-scroll="true"
                data-scroll-start="0.1"
                data-duration="0.4"
            >
                <div
                    class="flex-shrink-0 mr-4 h-1 rounded-sm"
                    style="width: 3rem; background-color: var(--cta, #D86A6A);"
                    aria-hidden="true"
                ></div>
                <span
                    class="text-sm font-semibold tracking-wider uppercase"
                    style="color: var(--accent, #36454F);"
                >
                    <?php echo $eyebrow_text; ?>
                </span>
                <div
                    class="flex-shrink-0 ml-4 h-1 rounded-sm"
                    style="width: 3rem; background-color: var(--cta, #D86A6A);"
                    aria-hidden="true"
                ></div>
            </div>

            <h2
                class="mb-4 text-3xl font-bold md:text-4xl"
                style="color: var(--primary, #1E3A5E); font-family: var(--font-headline, 'Poppins', sans-serif);"
                data-motion="fade-up"
                data-scroll="true"
                data-scroll-start="0.1"
                data-duration="0.6"
                data-delay="0.2"
            >
                <?php echo $heading; ?>
            </h2>

            <p
                class="mx-auto max-w-2xl"
                style="color: var(--accent, #36454F);"
                data-motion="fade-in"
                data-scroll="true"
                data-scroll-start="0.1"
                data-duration="0.6"
                data-delay="0.3"
            >
                <?php echo $subheading; ?>
            </p>
        </div>

        <?php if (!empty($services)): ?>
            <div
                class="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2 lg:grid-cols-3"
                data-motion="stagger-fade-up"
                data-scroll="true"
                data-scroll-start="0.1"
                data-duration="0.5"
                data-stagger="0.1"
            >
                <?php foreach ($services as $service):

                    $svc_title = esc_html($service["title"] ?? "");
                    $svc_desc = esc_html($service["description"] ?? "");
                    $svc_icon_key = $service["icon"] ?? "home";
                    $svc_feats = $service["features"] ?? [];
                    $svc_cta = esc_html($service["ctaText"] ?? "Get a Quote");
                    $svc_url = esc_url($service["ctaUrl"] ?? "#contact");

                    // Resolve the Lucide icon name
                    $lucide_icon = $lucide_name_map[$svc_icon_key] ?? "home";
                    ?>
                    <div
                        class="flex flex-col p-8 h-full rounded-lg shadow-sm transition-all duration-300"
                        style="background-color: var(--muted, #F5F5F5);"
                        data-motion="hover-card"
                    >
                        <div class="mb-6 text-center">
                            <div class="flex justify-center items-center mb-4">
                                <div
                                    class="inline-flex justify-center items-center p-5 rounded-full transition-all duration-300"
                                    style="background-color: rgba(30,58,95,0.05);"
                                    data-motion="hover-scale"
                                    data-duration="0.3"
                                >
                                    <i 
                                        data-lucide="<?php echo esc_attr(
                                            $lucide_icon,
                                        ); ?>" 
                                        class="w-12 h-12" 
                                        style="color: var(--cta, #D86A6A);"
                                    ></i>
                                </div>
                            </div>
                            <h3
                                class="mb-3 text-xl font-bold"
                                style="color: var(--primary, #1E3A5E); font-family: var(--font-headline, 'Poppins', sans-serif);"
                            >
                                <?php echo $svc_title; ?>
                            </h3>
                        </div>

                        <p
                            class="flex-grow mb-6 text-sm leading-relaxed"
                            style="color: var(--accent, #36454F);"
                        >
                            <?php echo $svc_desc; ?>
                        </p>

                        <?php if (!empty($svc_feats)): ?>
                            <ul
                                class="pt-4 mb-6 space-y-2 border-t"
                                style="border-color: rgba(30,58,95,0.1);"
                                data-motion="stagger-fade-left"
                                data-scroll="true"
                                data-scroll-start="0.1"
                                data-duration="0.3"
                                data-stagger="0.08"
                            >
                                <?php foreach ($svc_feats as $feature): ?>
                                    <li
                                        class="flex items-center text-sm"
                                        style="color: var(--accent, #36454F);"
                                        data-motion="hover-rise"
                                    >
                                        <i data-lucide="check-circle-2" class="w-5 h-5 text-cta"></i>
                                        <span class="ml-2"><?php echo esc_html(
                                            $feature,
                                        ); ?></span>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                        <?php endif; ?>

                        <div
                            class="pt-4 mt-auto border-t"
                            style="border-color: rgba(30,58,95,0.1);"
                        >
                            <a
                                href="<?php echo $svc_url; ?>"
                                class="inline-block py-2 px-4 w-full font-medium text-center text-white rounded-md transition-all duration-300"
                                style="background-color: var(--primary, #1E3A5E);"
                                data-motion="hover-scale"
                                data-duration="0.2"
                            >
                                <?php echo $svc_cta; ?>
                            </a>
                        </div>

                    </div>
                <?php
                endforeach; ?>
            </div>
        <?php endif; ?>

        <div
            class="p-6 rounded-lg border transition-all duration-300 md:p-8"
            style="background-color: rgba(30,58,95,0.05); border-color: rgba(30,58,95,0.1);"
            data-motion="fade-up"
            data-scroll="true"
            data-scroll-start="0.15"
            data-duration="0.6"
            data-delay="0.2"
        >
            <div class="flex flex-col gap-6 justify-between items-center md:flex-row">

                <div
                    data-motion="fade-left"
                    data-scroll="true"
                    data-scroll-start="0.15"
                    data-duration="0.4"
                    data-delay="0.3"
                >
                    <h3
                        class="mb-2 text-2xl font-semibold"
                        style="color: var(--primary, #1E3A5E); font-family: var(--font-headline, 'Poppins', sans-serif);"
                    >
                        <?php echo $banner_heading; ?>
                    </h3>
                    <p style="color: var(--accent, #36454F);">
                        <?php echo $banner_subtext; ?>
                    </p>
                </div>

                <a
                    href="<?php echo $banner_cta_url; ?>"
                    class="inline-flex flex-shrink-0 items-center py-3 px-6 font-medium text-white whitespace-nowrap rounded-md transition-all duration-300"
                    style="background-color: var(--cta, #D86A6A);"
                    data-motion="fade-in hover-arrow"
                    data-scroll="true"
                    data-scroll-start="0.15"
                    data-duration="0.4"
                    data-delay="0.5"
                >
                    <?php echo $banner_cta_text; ?>
                    <span data-arrow class="inline-flex items-center">
                        <i data-lucide="arrow-right" class="ml-2 w-5 h-5"></i>
                    </span>
                </a>

            </div>
        </div>

    </div>
</section>
