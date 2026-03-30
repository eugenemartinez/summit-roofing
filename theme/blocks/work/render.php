<?php
// Extract attributes with defaults
$title = $attributes["title"] ?? "Our Work";
$subtitle = $attributes["subtitle"] ?? "Portfolio";
$description =
    $attributes["description"] ??
    "Explore our recent projects and see how we transform spaces with quality craftsmanship and attention to detail.";
$categories = $attributes["categories"] ?? [
    "All",
    "Residential",
    "Commercial",
    "Repairs",
    "Metal Roofing",
];
$projects = $attributes["projects"] ?? [];
$ctaText = $attributes["ctaText"] ?? "View All Projects";
$ctaUrl = $attributes["ctaUrl"] ?? "#contact";

// Generate unique IDs for this block instance
$blockId = "work-" . wp_unique_id();
$modalId = $blockId . "-modal";
?>

<section id="projects" class="overflow-hidden relative py-16 bg-white md:py-24" data-block-id="<?php echo esc_attr(
    $blockId,
); ?>">

  <!-- Background elements -->
  <div class="absolute inset-0 pointer-events-none">
    <div class="absolute top-0 right-0 rounded-full translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px]"
         data-motion="blob" data-duration="20" data-scale="1.3" data-x="40" data-y="20"></div>
    <div class="absolute bottom-0 left-0 rounded-full -translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-primary/5 blur-[100px]"
         data-motion="blob" data-duration="25" data-scale="1.2" data-x="-30" data-y="-20" data-delay="3"></div>
  </div>

  <div class="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">

    <!-- Header -->
    <div class="mb-12 text-center md:mb-16">
      <div class="flex justify-center items-center mb-4" data-motion="fade-up" data-delay="0.1">
        <div class="mr-4 w-12 h-1 rounded-full bg-cta"></div>
        <span class="text-sm font-semibold tracking-wider uppercase text-accent"><?php echo esc_html(
            $subtitle,
        ); ?></span>
        <div class="ml-4 w-12 h-1 rounded-full bg-cta"></div>
      </div>
      <h2 class="mb-6 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl text-primary"
          data-motion="fade-up" data-delay="0.2">
        <?php echo esc_html($title); ?>
      </h2>
      <p class="mx-auto max-w-2xl text-lg leading-relaxed text-accent"
         data-motion="fade-up" data-delay="0.3">
        <?php echo esc_html($description); ?>
      </p>
    </div>

    <!-- Category filters -->
    <div class="flex flex-wrap gap-3 justify-center mb-12" data-motion="fade-up" data-delay="0.4">
      <?php foreach ($categories as $index => $category): ?>
        <button
          class="category-filter px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border border-gray-200 hover:border-primary hover:bg-primary hover:text-white <?php echo $index ===
          0
              ? "bg-primary text-white border-primary"
              : "bg-white text-accent"; ?>"
          data-category="<?php echo esc_attr(
              strtolower(str_replace(" ", "-", $category)),
          ); ?>">
          <?php echo esc_html($category); ?>
        </button>
      <?php endforeach; ?>
    </div>

    <!-- Projects grid -->
    <div class="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2 lg:grid-cols-3" id="<?php echo esc_attr(
        $blockId,
    ); ?>-grid">
      <?php foreach ($projects as $index => $project):

          $delay = 0.5 + $index * 0.1;
          $categorySlug = strtolower(
              str_replace(" ", "-", $project["category"]),
          );
          ?>
        <div
          class="overflow-hidden bg-white rounded-lg shadow-lg transition-all duration-300 transform cursor-pointer hover:shadow-xl hover:-translate-y-2 project-card group"
          data-category="<?php echo esc_attr($categorySlug); ?>"
          data-project-id="<?php echo esc_attr($project["id"]); ?>"
          data-motion="fade-up"
          data-scroll="true"
          data-delay="<?php echo esc_attr($delay); ?>">

          <!-- Project image -->
          <div class="overflow-hidden relative h-64 group">
            <?php if (!empty($project["image"])): ?>
              <img
                src="<?php echo esc_url($project["image"]); ?>"
                alt="<?php echo esc_attr($project["title"]); ?>"
                class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
              <div class="flex justify-center items-center w-full h-full bg-gray-200" style="display: none;">
                <i data-lucide="search" class="w-12 h-12 text-gray-400"></i>
              </div>
            <?php else: ?>
              <div class="flex justify-center items-center w-full h-full bg-gray-200">
                <i data-lucide="search" class="w-12 h-12 text-gray-400"></i>
              </div>
            <?php endif; ?>

            <!-- Overlay with search icon -->
            <div class="flex absolute inset-0 justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-primary/50">
              <div class="p-3 bg-white rounded-full transition-transform duration-300 transform translate-y-4 group-hover:translate-y-0 text-primary">
                <i data-lucide="search" class="w-5 h-5"></i>
              </div>
            </div>
          </div>

          <!-- Project info -->
          <div class="p-6">
            <div class="flex justify-between items-center mb-2">
              <span class="py-1 px-2 text-xs font-semibold rounded text-cta bg-cta/10">
                <?php echo esc_html($project["category"]); ?>
              </span>
              <span class="text-xs text-accent">
                <?php echo esc_html($project["location"]); ?>
              </span>
            </div>
            <h3 class="mb-2 text-xl font-bold text-primary"><?php echo esc_html(
                $project["title"],
            ); ?></h3>
            <p class="text-sm text-accent"><?php echo esc_html(
                $project["description"],
            ); ?></p>
          </div>
        </div>
      <?php
      endforeach; ?>
    </div>

    <!-- CTA Button -->
    <div class="text-center" data-motion="fade-up" data-delay="0.6">
      <a
        href="<?php echo esc_url($ctaUrl); ?>"
        class="inline-flex gap-3 items-center py-4 px-8 text-lg font-semibold text-white rounded-lg shadow-lg transition-colors duration-300 hover:shadow-xl bg-primary hover:bg-primary/90"
        data-motion="hover-lift">
        <?php echo esc_html($ctaText); ?>
        <i data-lucide="arrow-right" class="w-5 h-5"></i>
      </a>
    </div>

  </div>
</section>

<!-- Project Modal -->
<div id="<?php echo esc_attr(
    $modalId,
); ?>" class="flex fixed inset-0 z-50 justify-center items-center p-4 bg-black/80" style="display: none;">
  <div class="overflow-hidden relative w-full max-w-4xl bg-white rounded-lg">
    <!-- Close button -->
    <button
      class="absolute top-4 right-4 z-10 p-2 text-white rounded-full transition-colors duration-200 cursor-pointer bg-primary/50 hover:bg-primary"
      onclick="closeModal('<?php echo esc_attr($modalId); ?>')">
        <i data-lucide="x" class="w-5 h-5"></i>
    </button>

    <!-- Modal content -->
    <div class="modal-content">
      <!-- Content will be populated by JavaScript -->
    </div>
  </div>
</div>

<script>
(function() {
  // Grab the dynamic IDs from PHP
  const blockId = '<?php echo esc_attr($blockId); ?>';
  const modalId = '<?php echo esc_attr($modalId); ?>';
  const projects = <?php echo wp_json_encode($projects); ?>;

  // We target the container via data attribute to avoid ID conflicts with the nav anchor
  const container = document.querySelector(`[data-block-id="${blockId}"]`);
  const modal = document.getElementById(modalId);

  if (!container || !modal) return;

  // Category filtering
  function initCategoryFilters() {
    const filterButtons = container.querySelectorAll('.category-filter');
    const projectCards = container.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const category = this.dataset.category;

        // Update active button UI
        filterButtons.forEach(btn => {
          btn.classList.remove('bg-primary', 'text-white', 'border-primary');
          btn.classList.add('bg-white', 'text-accent');
        });
        this.classList.add('bg-primary', 'text-white', 'border-primary');

        // Filter cards
        projectCards.forEach(card => {
          card.style.display = (category === 'all' || card.dataset.category === category) ? 'block' : 'none';
        });
      });
    });
  }

  // Modal logic
  function initModal() {
    const projectCards = container.querySelectorAll('.project-card');

    projectCards.forEach(card => {
      card.addEventListener('click', function() {
        const projectId = this.dataset.projectId;
        // String comparison is safer as dataset often returns strings
        const project = projects.find(p => String(p.id) === String(projectId));

        if (project) {
          showModal(project);
        }
      });
    });

    // Close modal on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) window.closeModal(modalId);
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display !== 'none') {
        window.closeModal(modalId);
      }
    });
  }

  function showModal(project) {
    const modalContent = modal.querySelector('.modal-content');

    modalContent.innerHTML = `
      <div class="relative pb-[56.25%] bg-gray-100">
        ${project.image ? 
          `<img src="${project.image}" alt="${project.title}" class="object-cover absolute inset-0 w-full h-full">` : 
          `<div class="flex absolute inset-0 justify-center items-center"><i data-lucide="camera" class="w-12 h-12 text-gray-400"></i></div>`
        }
      </div>

      <div class="p-8">
        <div class="flex justify-between items-center mb-4">
          <span class="py-1 px-2 text-xs font-bold tracking-wider uppercase rounded text-cta bg-cta/10">
            ${project.category}
          </span>
          <div class="flex items-center text-sm text-accent">
            <i data-lucide="map-pin" class="mr-2 w-4 h-4"></i>
            ${project.location}
          </div>
        </div>
        <h3 class="mb-3 text-3xl font-bold text-primary">${project.title}</h3>
        <p class="text-lg leading-relaxed text-accent">${project.description}</p>
      </div>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // IMPORTANT: Refresh Lucide icons for the newly injected HTML
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Define global close function
  window.closeModal = function(id) {
    const targetModal = document.getElementById(id);
    if (targetModal) {
      targetModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  };

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initCategoryFilters();
      initModal();
    });
  } else {
    initCategoryFilters();
    initModal();
  }
})();
</script>

<style>
/* Custom styles for the work block */
#<?php echo esc_attr($blockId); ?> .category-filter {
  transition: all 0.3s ease;
}

#<?php echo esc_attr($blockId); ?> .project-card {
  transition: all 0.3s ease;
}

#<?php echo esc_attr($blockId); ?> .project-card:hover {
  transform: translateY(-8px);
}

/* Modal styles */
#<?php echo esc_attr($modalId); ?> {
  transition: opacity 0.3s ease;
}
</style>
