"use client";

import { useEffect } from 'react';
import styles from './page.module.css';

export default function ProgressCrollPage() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      document.documentElement.style.setProperty(
        '--scroll-progress',
        String(scrolled)
      );
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${styles.container} relative`}>
      <div className={styles.progressBar} />

      <main className="w-full max-w-3xl mx-auto px-4 mt-20">
        <article className="prose max-w-none">
          <h1 className="font-bold text-xl mb-4">Scroll Progress Effect</h1>
          <p>
            Scroll down this page to see the progress bar at the top fill up as you scroll.
            This effect provides visual feedback about reading progress and enhances the user experience.
          </p>
          
          <h2 className="font-bold text-lg mt-8 mb-4">How It Works</h2>
          <p>
            The progress bar uses JavaScript to track the scroll position and calculates
            what percentage of the page has been scrolled. This value is then applied as
            a CSS variable that controls the width of the progress bar.
          </p>

          <h2 className="font-bold text-lg mt-8 mb-4">Implementation</h2>
          <p>
            On scroll, we calculate: <code>(scrollTop / totalScrollableHeight) * 100</code>.
            This percentage is stored in a CSS custom property <code>--scroll-progress</code>,
            which is used to set the width of the progress bar element.
          </p>

          {/* Add some filler content to enable scrolling */}
          <div className="mt-8 space-y-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
              eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
              in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}