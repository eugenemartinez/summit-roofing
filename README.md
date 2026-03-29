# SUMMIT_ROOFING // Repository_Structure

This repository is a visual and functional archive of a custom WordPress service site development project. It is structured to separate the core WordPress PHP logic, the React-based UI recreation, and the final production-ready theme output.

---

### ## Directory_Mapping

* **`/wordpress`**
  The primary WordPress development environment. This directory contains the PHP templates, custom post types, and components, with its own build tools for managing styles and scripts.

* **`/react`**
  A standalone React recreation of the WordPress project used for the live demo (since the live PHP environment isn't hosted here).

* **`/theme`**
  The clean, compiled output of the WordPress project. This folder contains the final architecture ready to be moved into a `wp-content/themes` directory as a functional, production-ready theme.

---

### ## Core_Technologies

* **WordPress PHP**: Native templating and custom field architecture.
* **React + Framer Motion**: Interactive UI components and the `DemoEndModal` logic.
* **Motion.dev**: High-performance, lightweight browser animations for the PHP environment.
* **Tailwind CSS**: Utility-first styling used consistently across both PHP and React environments.
