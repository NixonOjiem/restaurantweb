<template>
  <div class="loader-container">
    <span class="loader"></span>

    <div class="text-wrapper">
      <div ref="textRef" class="loading-text">
        Something is Cooking
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';

const textRef = ref<HTMLElement | null>(null);
let splitInstance: SplitText | null = null;
let animContext: gsap.Context | null = null;

onMounted(() => {
  // --- THE FIX: ADD THIS CHECK ---
  // If the HTML element hasn't loaded for some reason, stop here.
  // This satisfies TypeScript that textRef.value is not null below.
  if (!textRef.value) return;

  gsap.registerPlugin(SplitText);

  // We use gsap.context() for easy cleanup in Vue
  animContext = gsap.context(() => {

    // 1. Create the SplitText instance
    // TypeScript now knows textRef.value is definitely an HTMLElement
    splitInstance = new SplitText(textRef.value as HTMLElement, {
      type: "chars, words"
    });

    // 2. Run the "Characters" Animation
    gsap.from(splitInstance.chars, {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      stagger: 0.05,
      delay: 0.2
    });

  }, textRef.value); // Scope to the text element
});

onUnmounted(() => {
  animContext?.revert();
  splitInstance?.revert();
});
</script>

<style scoped>
/* --- CONTAINER & BACKGROUND --- */
.loader-container {
  background-image: url('/9575634.png');
  background-color: antiquewhite;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  display: flex;
  flex-direction: column;
  /* Stack Pan and Text */
  justify-content: center;
  align-items: center;
  gap: 2rem;

  min-height: 100vh;
  width: 100vw;
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  /* Prevent scrollbars if letters fly out */
}

/* --- TEXT STYLES --- */
.text-wrapper {
  perspective: 500px;
  /* Gives depth if you use 3D rotations later */
  overflow: hidden;
  /* Ensures text coming from outside isn't visible too early */
  padding: 10px;
  /* Buffer for animation movement */
}

.loading-text {
  /* Use a nice font for the split text */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 800;
  font-size: 2.5rem;
  /* Adjustable size */
  color: #222;
  /* Dark grey to match pan */
  text-align: center;
  line-height: 1.2;
}

/* --- FRYING PAN LOADER (Unchanged) --- */
.loader {
  width: 100px;
  height: 100px;
  display: block;
  position: relative;
  background: #222;
  border-radius: 50%;
  box-sizing: border-box;
  transform-origin: 170px 50px;
  border: 4px solid #333;
  box-shadow: 3px 4px #0003 inset, 0 0 6px #0002 inset;
  animation: panmov 0.4s ease-in-out infinite alternate;
}

.loader::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) skew(-15deg, 15deg) rotate(-15deg);
  width: 55px;
  height: 53px;
  background: #fff;
  background-image:
    radial-gradient(circle 3px, #fff6 90%, transparent 10%),
    radial-gradient(circle 12px, #ffc400 90%, transparent 10%),
    radial-gradient(circle 12px, #ffae00 100%, transparent 0);
  background-repeat: no-repeat;
  background-position: -4px -6px, -2px -2px, -1px -1px;
  box-shadow: -2px -3px #0002 inset, 0 0 4px #0003 inset;
  border-radius: 47% 36% 50% 50% / 49% 45% 42% 44%;
  animation: ylmov 0.6s ease-in-out infinite alternate;
}

.loader::after {
  content: '';
  position: absolute;
  left: 100%;
  top: 48px;
  height: 15px;
  width: 70px;
  background: #222222;
  border-radius: 0 8px 8px 0;
  box-shadow: 3px 0 3px #eee2 inset;
  transform: rotate(5deg) translateX(3px);
}

@keyframes panmov {

  0%,
  10% {
    transform: rotate(5deg)
  }

  90%,
  100% {
    transform: rotate(-5deg)
  }
}

@keyframes ylmov {
  to {
    border-radius: 50% 36% 50% 50% / 49% 50% 45% 45%;
    background-position: -2px -4px, 2px 2px, 1px 1px;
  }
}
</style>
