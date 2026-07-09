import { useEffect } from 'react';

/**
 * useScrollReveal
 * 全局滚动揭示 hook：监听所有带 [data-reveal] 属性的元素，
 * 当其进入视口时添加 .revealed 类触发 CSS 过渡动画。
 *
 * 用法：在 App 顶层调用一次 useScrollReveal()，然后给任何元素加 data-reveal 属性即可。
 * 可选 data-reveal-delay="120" 设置延迟（毫秒）。
 */
export function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]:not(.revealed)');

    // 尊重 reduced-motion：直接全部显示
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) {
      elements.forEach((el) => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.getAttribute('data-reveal-delay');
            if (delay) {
              el.style.setProperty('--reveal-delay', `${delay}ms`);
            }
            el.classList.add('revealed');
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
