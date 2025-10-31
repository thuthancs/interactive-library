"use client";

import Image from 'next/image';
import { useEffect } from 'react';
import styles from './page.module.css';

export default function ProgressCrollPage() {
  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY;
      const docHeight = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const scrolled = docHeight > 0 ? (progress / docHeight) * 100 : 0;
      document.documentElement.style.setProperty(
        '--scroll-progress',
        String(scrolled)
      );
    };

    // Call the function immediately to set initial progress
    handleScroll();

    // Registers a scroll event listener so handleScroll is called on scroll
    // passive: true means the listener won't call preventDefault() and block scrolling
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup the event listener on component unmount
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
          <Image src="/progress_heights.png" alt="Diagram showing scroll progress calculation" width={800} height={400} />
          <h2 className="font-bold text-lg mt-8 mb-4">Implementation</h2>
          <p>The image above shows us some built-in properties for getting the value of different heights of the window.
            As a result, in order to calculate the scroll progress, we follow the formula below:
          </p>
          <p><code>(window.scrollY / (scrollHeight - innerHeight)) * 100</code></p>
          <p>
            This percentage is then stored in a CSS custom property <code>--scroll-progress</code>,
            which is used to set the width of the progress bar element in the CSS file:
          </p>
          <p><code>width: calc(var(--scroll-progress, 0) * 1%);</code></p>

          {/* Add some filler content to enable scrolling */}
          <div className="mt-8 space-y-4">
            <p>
              The <code>document.documentElement.style.setProperty()</code> method in JavaScript is used to set a new value for a CSS property on the documentElement, which represents the html element of an HTML document,
              which is useful for setting global CSS variables that can be accessed throughout the entire document. 
            </p>
            <p>
              Then, we create a <code>handleScroll</code> function that calculates the scroll progress and updates the CSS variable accordingly.
              This function is called both on mount and whenever a scroll event occurs.
              On mount means the very first time the component appears. 
            </p>
            <p>
              <code>{`window.addEventListener('scroll', handleScroll, { passive: true });`}</code> registers a scroll listener so handleScroll runs on scroll. 
              <code>{ `passive: true` }</code> means the listener will not call preventDefault() and block scrolling.
            </p>
            <p>
              Finally, we clean up the event listener when the component unmounts to prevent memory leaks.
              <code>{`return () => window.removeEventListener('scroll', handleScroll);`}</code>
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}