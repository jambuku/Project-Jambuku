import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import ProductDetail from "./components/ProductDetail";
import Trust from "./components/Trust";
import Events from "./components/Events";
import Contact from "./components/Contact";

async function getEvents() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/events?published=true`,
    { next: { tags: ['events'] } } // ← penting
  );
  if (!res.ok) return { data: [] };
  return res.json();
}


export default async function Home() {
  const { data: events = [] } = await getEvents();

  return (
    <main>
      <Hero />
      <About />
      <Features />
      <ProductDetail />
      <Trust />
      <Events events={events} />
      <Contact />
    </main>
  );
}
