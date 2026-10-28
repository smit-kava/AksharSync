import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animate text reveal with staggered words and smooth power4 easing
 */
export function animateTextReveal(
  element: HTMLElement | null,
  options?: {
    delay?: number;
    stagger?: number;
    duration?: number;
    yOffset?: number;
  }
) {
  if (!element) return null;

  const delay = options?.delay ?? 0.1;
  const stagger = options?.stagger ?? 0.035;
  const duration = options?.duration ?? 0.85;
  const yOffset = options?.yOffset ?? 35;

  const words = element.querySelectorAll(".gsap-word");
  if (words.length > 0) {
    return gsap.fromTo(
      words,
      {
        opacity: 0,
        y: yOffset,
        rotateX: -15,
        filter: "blur(6px)",
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
        duration,
        stagger,
        delay,
        ease: "power4.out",
      }
    );
  }

  return gsap.fromTo(
    element,
    { opacity: 0, y: yOffset, filter: "blur(6px)" },
    { opacity: 1, y: 0, filter: "blur(0px)", duration, delay, ease: "power4.out" }
  );
}

/**
 * Animate elements on scroll using GSAP ScrollTrigger
 */
export function animateOnScroll(
  element: HTMLElement | string,
  options?: {
    y?: number;
    duration?: number;
    stagger?: number;
    start?: string;
    delay?: number;
  }
) {
  const y = options?.y ?? 45;
  const duration = options?.duration ?? 0.85;
  const stagger = options?.stagger ?? 0.12;
  const start = options?.start ?? "top 85%";
  const delay = options?.delay ?? 0;

  return gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start,
      toggleActions: "play none none none",
      once: true,
    },
    y,
    opacity: 0,
    duration,
    stagger,
    delay,
    ease: "power3.out",
    clearProps: "transform",
  });
}

/**
 * Continuous smooth organic floating ambient animation
 */
export function animateFloating(
  element: HTMLElement | null,
  options?: {
    xDist?: number;
    yDist?: number;
    duration?: number;
    delay?: number;
  }
) {
  if (!element) return null;

  const xDist = options?.xDist ?? 12;
  const yDist = options?.yDist ?? 14;
  const duration = options?.duration ?? 5;
  const delay = options?.delay ?? 0;

  return gsap.to(element, {
    x: `+=${xDist}`,
    y: `+=${yDist}`,
    rotation: 2,
    duration,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay,
  });
}

/**
 * Magnetic button cursor effect using GSAP
 */
export function attachMagneticEffect(element: HTMLElement | null, strength: number = 0.25) {
  if (!element) return () => {};

  const xTo = gsap.quickTo(element, "x", { duration: 0.35, ease: "power3" });
  const yTo = gsap.quickTo(element, "y", { duration: 0.35, ease: "power3" });

  const onMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    xTo(deltaX);
    yTo(deltaY);
  };

  const onMouseLeave = () => {
    xTo(0);
    yTo(0);
  };

  element.addEventListener("mousemove", onMouseMove);
  element.addEventListener("mouseleave", onMouseLeave);

  return () => {
    element.removeEventListener("mousemove", onMouseMove);
    element.removeEventListener("mouseleave", onMouseLeave);
  };
}
