<template>
  <section class="menu-hero-wrapper">
    <div class="hero-card">
      <div class="hero-image-overlay">
        <img src="/487.webp
        " alt="A beautifully plated dish or a chef preparing food" class="hero-image" />
      </div>

      <div class="hero-content">
        <h1 class="hero-title">Our Culinary Journey</h1>
        <p class="hero-subtitle">
          Explore a world of flavor, crafted with the freshest ingredients and passion.
        </p>
        <a href="#menu-details" class="view-menu-btn">View Our Full Menu</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No logic needed for a simple hero section.
</script>

<style lang="css" scoped>
/* --- Outer Wrapper --- */
.menu-hero-wrapper {
  /* This creates the space around the "card" so you can see the rounded edges */
  padding: 2rem;
  background-color: #FFF7E0;
  /* Or match your page background */
  width: 100%;
  box-sizing: border-box;
}

/* --- The Rounded Card --- */
.hero-card {
  position: relative;
  height: 60vh;
  min-height: 400px;
  width: 100%;

  /* KEY LINES FOR ROUNDED RECTANGLE: */
  border-radius: 30px;
  /* Curves the edges */
  overflow: hidden;
  /* Chops off the square corners of the image */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  /* Adds depth */

  /* Flexbox to center the text content */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

/* --- Image & Overlay --- */
.hero-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  /* Behind content */
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Using a gradient overlay usually looks better than simple brightness,
     but keeping your filter method as requested: */
  filter: brightness(0.5);
  transition: transform 0.5s ease;
  /* Subtle zoom effect on hover support */
}

/* Optional: Slight zoom on the image when hovering the card */
.hero-card:hover .hero-image {
  transform: scale(1.05);
}

/* --- Content Styling --- */
.hero-content {
  position: relative;
  z-index: 10;
  /* Above image */
  text-align: center;
  padding: 0 20px;
  max-width: 800px;
}

.hero-title {
  font-size: 4rem;
  margin-bottom: 0.5rem;
  font-family: 'Georgia', serif;
  text-transform: uppercase;
  letter-spacing: 5px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  margin-top: 0;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  font-style: italic;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
}

/* --- Button Styling --- */
.view-menu-btn {
  display: inline-block;
  padding: 12px 25px;
  background-color: #a0522d;
  color: white;
  text-decoration: none;
  border-radius: 50px;
  /* Fully rounded button matches the theme */
  font-size: 1.1rem;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.view-menu-btn:hover {
  background-color: #8b4513;
  transform: translateY(-2px);
}

/* --- Responsive --- */
@media (max-width: 768px) {
  .menu-hero-wrapper {
    padding: 1rem;
    /* Smaller gaps on mobile */
  }

  .hero-card {
    border-radius: 20px;
    /* Slightly tighter corners on mobile */
  }

  .hero-title {
    font-size: 2.5rem;
    letter-spacing: 2px;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }
}
</style>
