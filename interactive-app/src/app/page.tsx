import Card from "./components/Card";

const components = [
  {
    title: "progress scrolling",
    description: "an interactive component that updates reading progress as you scroll",
    href: "/library/progress_scrolling",
  },
  {
    title: "scrolly-telling",
    description: "unfold a story as you scroll",
    href: "/library/scrolly_telling",
  },
  {
    title: "dot-plot",
    description: "a plot where each dot represents a data point",
    href: "/library/dot_plot",
  },
  {
    title: "geographic map",
    description: "a map that visualizes geographic data",
    href: "/library/interactive_map",
  },
  {
    title: "image comparison slider",
    description: "compare two images with a draggable slider",
    href: "/library/image_comparison_slider",
  },
  {
    title: "data filter",
    description: "filter data points based on user-selected criteria",
    href: "/library/data_filter",
  },
  {
    title: "timeline",
    description: "an interactive timeline to explore events over time",
    href: "/library/timeline",
  },
  {
    title: "distributions",
    description: "visualize data distributions with interactive elements",
    href: "/library/distributions",
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-20 px-8">
      <h1 className="text-5xl mb-12 text-center">
        interactive library
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {components.map((comp) => (
          <Card key={comp.href} {...comp} />
        ))}
      </div>
    </main>
  );
}