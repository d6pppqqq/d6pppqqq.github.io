import { useEffect, useRef, useState } from 'react';

/**
 * useCountUp
 * 数字滚动动画：当元素进入视口时，从 0 缓动到目标值。
 *
 * @param {number} target 目标数值
 * @param {object} opts { duration 毫秒, decimals 小数位, suffix 后缀, prefix 前缀 }
 * @returns {[ref, displayValue]} ref 绑定到目标元素，displayValue 为当前显示字符串
 */
export function useCountUp(target, opts = {}) {
  const { duration = 1600, decimals = 0, prefix = '', suffix = '' } = opts;
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // reduced-motion：直接显示终值
    if (prefersReduced) {
      setValue(target);
      startedRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();

            const tick = (now) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              // easeOutExpo 缓动
              const eased =
                progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              setValue(target * eased);
              if (progress < 1) {
                requestAnimationFrame(tick);
              } else {
                setValue(target);
              }
            };
            requestAnimationFrame(tick);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  const display = `${prefix}${value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}${suffix}`;

  return [ref, display];
}
