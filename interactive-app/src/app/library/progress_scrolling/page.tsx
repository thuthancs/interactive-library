"use client";

import Image from 'next/image';
import Link from 'next/link';
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

    const handleScroll = () => {
      // 1. Update scroll progress bar (existing logic)
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      document.documentElement.style.setProperty('--scroll-progress', String(scrolled));

      // Handle top of page edge case
      if (scrollTop < 50 && tocItems[0]?.id) {
        setActiveId(tocItems[0].id);
        return;
      }
      
      // 2. Find active TOC item
      const targetLine = scrollTop + window.innerHeight * 0.5;
      let currentBest: { id: string; delta: number } | null = null;

      for (const item of tocItems) {
        const elem = document.getElementById(item.id);
        if (!elem) continue;

        const delta = Math.abs(targetLine - (elem.offsetTop + elem.offsetHeight / 2));
        
        if (currentBest === null || delta < currentBest.delta) {
          currentBest = { id: item.id, delta };
        }
      }
      
      if (currentBest) {
        setActiveId(currentBest.id);
      }
    };

    handleScroll(); // Run on mount
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
                level === 1 ? 'text-base' : 'text-small'
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

      <main className="w-full max-w-3xl px-4 mt-8 lg:ml-[280px]">
        <article className="prose max-w-none">
            <section id="intro" className="scroll-mt-24 py-10 border-b">
              <h1 className='font-bold text-xl mb-4'>Where I got the inspiration</h1>
              <p className="mb-4">
                I got the inspiration to implement this effect when reading this{' '}
                <Link href="https://pudding.cool/2025/10/walk/" className="text-blue-600 hover:text-[#BA867B]">
                  article
                </Link> on the pudding.cool. As I scrolled through the article, the walking route would gradually be updated
                on the top of the page, indicating how far I have read and as if I am walking through the story with the author.
              </p>
              <Image src="/top_bar.png" alt="pudding article top bar" width={1200} height={80}/>
              <p className="mt-4 mb-4">Another inspiration I got is from Nicky Case. They design their <Link href="https://blog.ncase.me/30/" className="text-blue-600 hover:text-[#BA867B]">blog</Link> posts such that
                as you scroll down, there is this little clock on the bottom right of the screen showing you how much time
                you have spent reading the post.
              </p>
              <Image src="/ncase_blog.png" alt="nicky case blog clock" width={500} height={500}/>
              <p className='mt-4'>I love these designs because it offers a great user experience. By great I mean 
                the design is <strong>intentional and thoughtful</strong> - the pudding article includes the progress bar that is closely
                related to the story while the Nicky Case blog post gives a sense of completion instead of making me 
                feel anxious about how much more I have to read.
              </p>
            </section>

            <section id="usage" className="scroll-mt-24 py-10 border-b">
              <h1 className="mb-4 font-bold text-xl">Understand the code</h1>
              <p>
                I love The Pudding because they open-source their code. Let&apos;s take a look at how they implemented the scroll progress bar and learn from their approach!
                Almost all of their articles are built with Svelte and D3.js, none of which I am familiar with. However, I still tried to understand the logic behind their implementation.
              </p>
            </section>

            <section id="tips" className="scroll-mt-24 py-10 border-b">
              <h1 className="mb-4 text-xl font-bold">How to implement</h1>
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