<?php

// Load theme styles and scripts
function theme_scripts()
{
    wp_enqueue_style(
        "theme-style",
        get_template_directory_uri() . "/assets/index.css",
        [],
        filemtime(get_template_directory() . "/assets/index.css"),
    );
    wp_enqueue_script(
        "theme-script",
        get_template_directory_uri() . "/assets/index.js",
        [],
        filemtime(get_template_directory() . "/assets/index.js"),
        true,
    );
}
add_action("wp_enqueue_scripts", "theme_scripts");

// Register blocks
function theme_register_blocks()
{
    $blocks_dir = get_template_directory() . "/blocks";
    foreach (glob($blocks_dir . "/*/block.json") as $block) {
        register_block_type($block);
    }
}
add_action("init", "theme_register_blocks");

// Post view tracking
function theme_track_views($post_id)
{
    $count = (int) get_post_meta($post_id, "post_views_count", true);
    update_post_meta($post_id, "post_views_count", $count + 1);
}

// Related posts by shared tags
function theme_get_related_posts($post_id, $count = 3)
{
    $tags = wp_get_post_tags($post_id, ["fields" => "ids"]);
    if (empty($tags)) {
        return [];
    }

    return get_posts([
        "posts_per_page" => $count,
        "post__not_in" => [$post_id],
        "tag__in" => $tags,
        "orderby" => "relevance",
        "no_found_rows" => true,
    ]);
}

// Restrict search to posts only
function theme_search_filter($query)
{
    if ($query->is_search && !is_admin()) {
        $query->set("post_type", "post");
    }
    return $query;
}
add_filter("pre_get_posts", "theme_search_filter");

// Logo
function get_custom_logo_svg($size = "default", $class = "")
{
    $dimensions = [
        "small" => ["w" => 40, "h" => 40, "font" => "text-xs"],
        "default" => ["w" => 50, "h" => 50, "font" => "text-sm"],
        "medium" => ["w" => 60, "h" => 60, "font" => "text-base"],
        "large" => ["w" => 80, "h" => 80, "font" => "text-lg"],
    ];

    $dim = $dimensions[$size] ?? $dimensions["default"];
    $w = $dim["w"];
    $h = $dim["h"];
    $fontSize = $dim["font"];

    ob_start();
    ?>
    <div class="flex items-center <?php echo esc_attr($class); ?>">
        <div class="mr-1">
            <svg width="<?php echo $w; ?>" height="<?php echo $h; ?>" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="46" fill="#1E3A5F" stroke="#1E3A5F" stroke-width="2" />
                
                <path d="M20 50L50 20L80 50" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="url(#roof-gradient-<?php echo $size; ?>)" />
                
                <path d="M30 45L50 25M40 45L50 35M60 45L50 35M70 45L50 25" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" stroke-linecap="round" />
                
                <path d="M50 20L55 25L50 30L45 25L50 20" fill="#D86A6A" stroke="white" stroke-width="1" />
                
                <path d="M35 75L45 55L55 65L65 45" stroke="#D86A6A" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                
                <rect x="65" y="30" width="8" height="12" fill="white" rx="1" />
                
                <path d="M30 50V75H70V50" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
                
                <rect x="45" y="58" width="10" height="10" rx="2" fill="#D86A6A" />
                
                <defs>
                    <linearGradient id="roof-gradient-<?php echo $size; ?>" x1="50" y1="20" x2="50" y2="50" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stop-color="#D86A6A" stop-opacity="0.8" />
                        <stop offset="1" stop-color="#D86A6A" stop-opacity="0.3" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
        
        <div class="flex flex-col pt-1">
            <span class="font-bold leading-none text-white tracking-wider <?php echo $fontSize; ?>">SUMMIT</span>
            <span class="font-semibold leading-none text-cta <?php echo $fontSize; ?>">ROOFING</span>
        </div>
    </div>
    <?php return ob_get_clean();
}
