import { useEffect } from "react";

export const useScrollReveal = (active = true) => {
  useEffect(() => {
    if (!active) {
      const els = document.querySelectorAll("[data-reveal]");
      els.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    const els = document.querySelectorAll("[data-reveal]");
    els.forEach((el) => {
      const delay = el.getAttribute("data-delay") || "0";
      const type = el.getAttribute("data-reveal");
      
      el.style.transitionDelay = `${delay}ms`;
      
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.9;
      
      if (isVisible) {
        el.classList.add("revealed");
      } else {
        if (type === "left") {
          el.style.transform = "translateX(-30px)";
        } else if (type === "right") {
          el.style.transform = "translateX(30px)";
        } else if (type === "scale") {
          el.style.transform = "scale(.94)";
        } else {
          el.style.transform = "translateY(30px)";
        }
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [active]);
};
