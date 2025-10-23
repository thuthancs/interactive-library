"use client";

import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function ProgressCrollPage() {
  const [activeId, setActiveId] = useState<string>("intro");
  const [tocItems, setTocItems] = useState<Array<{ id: string; title: string; level: number }>>([]);

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

  useEffect(() => {
    if (tocItems.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) {
          const scrollY = window.scrollY;
          const maxY = document.documentElement.scrollHeight - window.innerHeight;
          if (scrollY <= 4 && tocItems[0]?.id) {
            setActiveId(tocItems[0].id);
          } else if (scrollY >= maxY - 4 && tocItems[tocItems.length - 1]?.id) {
            setActiveId(tocItems[tocItems.length - 1].id);
          }
          return;
        }
        const sorted = visible.sort((a, b) => {
          const ratioDiff = (b.intersectionRatio || 0) - (a.intersectionRatio || 0);
          if (ratioDiff !== 0) return ratioDiff;
          return a.boundingClientRect.top - b.boundingClientRect.top;
        });
        const top = sorted[0];
        if (top?.target?.id) setActiveId(top.target.id);
      },
      { root: null, rootMargin: '-50% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    const elements: HTMLElement[] = [];
    tocItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        elements.push(el);
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [tocItems]);

  useEffect(() => {
    const slugify = (text: string) =>
      text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

    const rafId = requestAnimationFrame(() => {
      const article = document.querySelector('main article');
      const headings = Array.from(
        (article?.querySelectorAll('h1, h2, h3') as NodeListOf<HTMLElement>) || []
      );
      const items = headings.map((h, idx) => {
        const title = (h.textContent || '').trim() || `Section ${idx + 1}`;
        if (!h.id) h.id = slugify(title);
        const level = Number(h.tagName.substring(1));
        return { id: h.id, title, level };
      });
      setTocItems(items);
      if (items[0]?.id) setActiveId(items[0].id);
    });
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className={`${styles.container} relative`}>
      <div className={styles.progressBar} />

      <aside className="hidden lg:block fixed left-6 top-24 w-60 bg-white/80 backdrop-blur">
        <nav className="space-y-1">
          {tocItems.map(({ id, title, level }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`block transition-colors ${
                level === 1 ? 'text-sm' : 'text-xs'
              } ${
                level === 1 ? '' : level === 2 ? 'pl-4' : 'pl-8'
              } ${activeId === id ? 'font-bold text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
              aria-current={activeId === id ? 'page' : undefined}
            >
              {title}
            </a>
          ))}
        </nav>
      </aside>

      <main className="w-full max-w-3xl px-4 lg:ml-[280px]">
        <article className="prose max-w-none">
            <section id="intro" className="scroll-mt-24 py-10 border-b">
              <h1>progress scrolling effect</h1>
              <h2>when to use this effect</h2>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo viverra maecenas accumsan lacus. Orci sagittis eu volutpat odio facilisis mauris. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. Amet nisl purus in mollis nunc sed. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Lorem sed risus ultricies tristique nulla. Commodo sed egestas egestas fringilla phasellus faucibus. Semper eget duis at tellus at urna condimentum mattis pellentesque. Porta lorem mollis aliquam ut porttitor leo a diam. At lectus urna duis convallis convallis tellus id interdum velit. Placerat orci nulla pellentesque dignissim enim sit amet venenatis urna. Rutrum tellus pellentesque eu tincidunt tortor. Nulla facilisi cras fermentum odio eu feugiat. Aliquet risus feugiat in ante metus. Quis imperdiet massa tincidunt nunc pulvinar sapien et. Vel pharetra vel turpis nunc.

              Potenti nullam ac tortor vitae purus. Tempor orci dapibus ultrices in iaculis nunc sed augue. Adipiscing elit duis tristique sollicitudin nibh. Luctus accumsan tortor posuere ac ut consequat semper. Enim nulla aliquet porttitor lacus. Netus et malesuada fames ac. Aliquam ultrices sagittis orci a scelerisque. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Nibh praesent tristique magna sit amet purus gravida quis. Mi proin sed libero enim sed faucibus turpis in eu. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Nunc faucibus a pellentesque sit amet porttitor eget dolor. Luctus accumsan tortor posuere ac ut. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit. Ac odio tempor orci dapibus ultrices in iaculis nunc sed.

              Molestie ac feugiat sed lectus vestibulum mattis. Elementum curabitur vitae nunc sed velit dignissim sodales ut. Netus et malesuada fames ac turpis egestas sed tempus. Viverra nam libero justo laoreet sit amet cursus sit amet. Maecenas sed enim ut sem viverra aliquet eget. Et netus et malesuada fames ac turpis egestas maecenas pharetra. Imperdiet proin fermentum leo vel orci porta. Nunc eget lorem dolor sed viverra ipsum nunc aliquet. Facilisis mauris sit amet massa vitae. Cras semper auctor neque vitae. Adipiscing diam donec adipiscing tristique risus. Scelerisque eu ultrices vitae auctor eu. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna. Egestas quis ipsum suspendisse ultrices gravida. Semper quis lectus nulla at volutpat diam. Egestas congue quisque egestas diam in arcu.

              Est velit egestas dui id ornare arcu odio ut sem. Tortor consequat id porta nibh venenatis. Proin sagittis nisl rhoncus mattis rhoncus urna neque. Porta non pulvinar neque laoreet suspendisse interdum. Lacus vel facilisis volutpat est velit egestas dui. Facilisi morbi tempus iaculis urna id volutpat. Venenatis urna cursus eget nunc scelerisque viverra. Ultrices gravida dictum fusce ut. Eu augue ut lectus arcu. Orci dapibus ultrices in iaculis. Rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Odio eu feugiat pretium nibh ipsum consequat. Accumsan in nisl nisi scelerisque eu ultrices vitae. Nunc faucibus a pellentesque sit. Ultricies integer quis auctor elit sed vulputate mi. Nulla aliquet enim tortor at auctor urna nunc id cursus.

              Integer enim neque volutpat ac tincidunt vitae semper. Condimentum lacinia quis vel eros donec ac odio tempor orci. Imperdiet dui accumsan sit amet nulla facilisi morbi tempus. Suspendisse potenti nullam ac tortor vitae. Non sodales neque sodales ut. Elementum eu facilisis sed odio. Aliquet nec ullamcorper sit amet risus nullam eget felis eget. Diam phasellus vestibulum lorem sed risus ultricies tristique. Facilisis sed odio morbi quis. Diam quis enim lobortis scelerisque fermentum dui faucibus. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim.
              </p>
            </section>

            <section id="usage" className="scroll-mt-24 py-10 border-b">
              <h1 className="mb-2">Usage</h1>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo viverra maecenas accumsan lacus. Orci sagittis eu volutpat odio facilisis mauris. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. Amet nisl purus in mollis nunc sed. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Lorem sed risus ultricies tristique nulla. Commodo sed egestas egestas fringilla phasellus faucibus. Semper eget duis at tellus at urna condimentum mattis pellentesque. Porta lorem mollis aliquam ut porttitor leo a diam. At lectus urna duis convallis convallis tellus id interdum velit. Placerat orci nulla pellentesque dignissim enim sit amet venenatis urna. Rutrum tellus pellentesque eu tincidunt tortor. Nulla facilisi cras fermentum odio eu feugiat. Aliquet risus feugiat in ante metus. Quis imperdiet massa tincidunt nunc pulvinar sapien et. Vel pharetra vel turpis nunc.

              Potenti nullam ac tortor vitae purus. Tempor orci dapibus ultrices in iaculis nunc sed augue. Adipiscing elit duis tristique sollicitudin nibh. Luctus accumsan tortor posuere ac ut consequat semper. Enim nulla aliquet porttitor lacus. Netus et malesuada fames ac. Aliquam ultrices sagittis orci a scelerisque. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Nibh praesent tristique magna sit amet purus gravida quis. Mi proin sed libero enim sed faucibus turpis in eu. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Nunc faucibus a pellentesque sit amet porttitor eget dolor. Luctus accumsan tortor posuere ac ut. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit. Ac odio tempor orci dapibus ultrices in iaculis nunc sed.

              Molestie ac feugiat sed lectus vestibulum mattis. Elementum curabitur vitae nunc sed velit dignissim sodales ut. Netus et malesuada fames ac turpis egestas sed tempus. Viverra nam libero justo laoreet sit amet cursus sit amet. Maecenas sed enim ut sem viverra aliquet eget. Et netus et malesuada fames ac turpis egestas maecenas pharetra. Imperdiet proin fermentum leo vel orci porta. Nunc eget lorem dolor sed viverra ipsum nunc aliquet. Facilisis mauris sit amet massa vitae. Cras semper auctor neque vitae. Adipiscing diam donec adipiscing tristique risus. Scelerisque eu ultrices vitae auctor eu. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna. Egestas quis ipsum suspendisse ultrices gravida. Semper quis lectus nulla at volutpat diam. Egestas congue quisque egestas diam in arcu.

              Est velit egestas dui id ornare arcu odio ut sem. Tortor consequat id porta nibh venenatis. Proin sagittis nisl rhoncus mattis rhoncus urna neque. Porta non pulvinar neque laoreet suspendisse interdum. Lacus vel facilisis volutpat est velit egestas dui. Facilisi morbi tempus iaculis urna id volutpat. Venenatis urna cursus eget nunc scelerisque viverra. Ultrices gravida dictum fusce ut. Eu augue ut lectus arcu. Orci dapibus ultrices in iaculis. Rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Odio eu feugiat pretium nibh ipsum consequat. Accumsan in nisl nisi scelerisque eu ultrices vitae. Nunc faucibus a pellentesque sit. Ultricies integer quis auctor elit sed vulputate mi. Nulla aliquet enim tortor at auctor urna nunc id cursus.

              Integer enim neque volutpat ac tincidunt vitae semper. Condimentum lacinia quis vel eros donec ac odio tempor orci. Imperdiet dui accumsan sit amet nulla facilisi morbi tempus. Suspendisse potenti nullam ac tortor vitae. Non sodales neque sodales ut. Elementum eu facilisis sed odio. Aliquet nec ullamcorper sit amet risus nullam eget felis eget. Diam phasellus vestibulum lorem sed risus ultricies tristique. Facilisis sed odio morbi quis. Diam quis enim lobortis scelerisque fermentum dui faucibus. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. 
              </p>
              <p>
                Add enough content here to make the page scroll so you can observe the
                behavior.
              </p>
            </section>

            <section id="tips" className="scroll-mt-24 py-10 border-b">
              <h1 className="mb-2">Tips</h1>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo viverra maecenas accumsan lacus. Orci sagittis eu volutpat odio facilisis mauris. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. Amet nisl purus in mollis nunc sed. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Lorem sed risus ultricies tristique nulla. Commodo sed egestas egestas fringilla phasellus faucibus. Semper eget duis at tellus at urna condimentum mattis pellentesque. Porta lorem mollis aliquam ut porttitor leo a diam. At lectus urna duis convallis convallis tellus id interdum velit. Placerat orci nulla pellentesque dignissim enim sit amet venenatis urna. Rutrum tellus pellentesque eu tincidunt tortor. Nulla facilisi cras fermentum odio eu feugiat. Aliquet risus feugiat in ante metus. Quis imperdiet massa tincidunt nunc pulvinar sapien et. Vel pharetra vel turpis nunc.

              Potenti nullam ac tortor vitae purus. Tempor orci dapibus ultrices in iaculis nunc sed augue. Adipiscing elit duis tristique sollicitudin nibh. Luctus accumsan tortor posuere ac ut consequat semper. Enim nulla aliquet porttitor lacus. Netus et malesuada fames ac. Aliquam ultrices sagittis orci a scelerisque. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Nibh praesent tristique magna sit amet purus gravida quis. Mi proin sed libero enim sed faucibus turpis in eu. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Nunc faucibus a pellentesque sit amet porttitor eget dolor. Luctus accumsan tortor posuere ac ut. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit. Ac odio tempor orci dapibus ultrices in iaculis nunc sed.

              Molestie ac feugiat sed lectus vestibulum mattis. Elementum curabitur vitae nunc sed velit dignissim sodales ut. Netus et malesuada fames ac turpis egestas sed tempus. Viverra nam libero justo laoreet sit amet cursus sit amet. Maecenas sed enim ut sem viverra aliquet eget. Et netus et malesuada fames ac turpis egestas maecenas pharetra. Imperdiet proin fermentum leo vel orci porta. Nunc eget lorem dolor sed viverra ipsum nunc aliquet. Facilisis mauris sit amet massa vitae. Cras semper auctor neque vitae. Adipiscing diam donec adipiscing tristique risus. Scelerisque eu ultrices vitae auctor eu. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna. Egestas quis ipsum suspendisse ultrices gravida. Semper quis lectus nulla at volutpat diam. Egestas congue quisque egestas diam in arcu.

              Est velit egestas dui id ornare arcu odio ut sem. Tortor consequat id porta nibh venenatis. Proin sagittis nisl rhoncus mattis rhoncus urna neque. Porta non pulvinar neque laoreet suspendisse interdum. Lacus vel facilisis volutpat est velit egestas dui. Facilisi morbi tempus iaculis urna id volutpat. Venenatis urna cursus eget nunc scelerisque viverra. Ultrices gravida dictum fusce ut. Eu augue ut lectus arcu. Orci dapibus ultrices in iaculis. Rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Odio eu feugiat pretium nibh ipsum consequat. Accumsan in nisl nisi scelerisque eu ultrices vitae. Nunc faucibus a pellentesque sit. Ultricies integer quis auctor elit sed vulputate mi. Nulla aliquet enim tortor at auctor urna nunc id cursus.

              Integer enim neque volutpat ac t
              </p>
            </section>

            <section id="conclusion" className="scroll-mt-24 py-10">
              <h1 className="mb-2">Conclusion</h1>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo viverra maecenas accumsan lacus. Orci sagittis eu volutpat odio facilisis mauris. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. Amet nisl purus in mollis nunc sed. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Lorem sed risus ultricies tristique nulla. Commodo sed egestas egestas fringilla phasellus faucibus. Semper eget duis at tellus at urna condimentum mattis pellentesque. Porta lorem mollis aliquam ut porttitor leo a diam. At lectus urna duis convallis convallis tellus id interdum velit. Placerat orci nulla pellentesque dignissim enim sit amet venenatis urna. Rutrum tellus pellentesque eu tincidunt tortor. Nulla facilisi cras fermentum odio eu feugiat. Aliquet risus feugiat in ante metus. Quis imperdiet massa tincidunt nunc pulvinar sapien et. Vel pharetra vel turpis nunc.

              Potenti nullam ac tortor vitae purus. Tempor orci dapibus ultrices in iaculis nunc sed augue. Adipiscing elit duis tristique sollicitudin nibh. Luctus accumsan tortor posuere ac ut consequat semper. Enim nulla aliquet porttitor lacus. Netus et malesuada fames ac. Aliquam ultrices sagittis orci a scelerisque. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Nibh praesent tristique magna sit amet purus gravida quis. Mi proin sed libero enim sed faucibus turpis in eu. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Nunc faucibus a pellentesque sit amet porttitor eget dolor. Luctus accumsan tortor posuere ac ut. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit. Ac odio tempor orci dapibus ultrices in iaculis nunc sed.

              Molestie ac feugiat sed lectus vestibulum mattis. Elementum curabitur vitae nunc sed velit dignissim sodales ut. Netus et malesuada fames ac turpis egestas sed tempus. Viverra nam libero justo laoreet sit amet cursus sit amet. Maecenas sed enim ut sem viverra aliquet eget. Et netus et malesuada fames ac turpis egestas maecenas pharetra. Imperdiet proin fermentum leo vel orci porta. Nunc eget lorem dolor sed viverra ipsum nunc aliquet. Facilisis mauris sit amet massa vitae. Cras semper auctor neque vitae. Adipiscing diam donec adipiscing tristique risus. Scelerisque eu ultrices vitae auctor eu. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna. Egestas quis ipsum suspendisse ultrices gravida. Semper quis lectus nulla at volutpat diam. Egestas congue quisque egestas diam in arcu.

              Est velit egestas dui id ornare arcu odio ut sem. Tortor consequat id porta nibh venenatis. Proin sagittis nisl rhoncus mattis rhoncus urna neque. Porta non pulvinar neque laoreet suspendisse interdum. Lacus vel facilisis volutpat est velit egestas dui. Facilisi morbi tempus iaculis urna id volutpat. Venenatis urna cursus eget nunc scelerisque viverra. Ultrices gravida dictum fusce ut. Eu augue ut lectus arcu. Orci dapibus ultrices in iaculis. Rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Odio eu feugiat pretium nibh ipsum consequat. Accumsan in nisl nisi scelerisque eu ultrices vitae. Nunc faucibus a pellentesque sit. Ultricies integer quis auctor elit sed vulputate mi. Nulla aliquet enim tortor at auctor urna nunc id cursus.

              Integer enim neque volutpat ac t
              </p>
            </section>
        </article>
      </main>
    </div>
  );
}