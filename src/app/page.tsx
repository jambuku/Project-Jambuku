import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import ProductDetail from "./components/ProductDetail";
import Trust from "./components/Trust";
import Events from "./components/Events";
import Contact from "./components/Contact";
import { getBaseUrl } from "@/lib/getBaseUrl";

async function getEvents() {
  const res = await fetch(`${getBaseUrl()}/api/events?published=true`, {
  next: { revalidate: 60 }, // boleh dihapus kalau ga butuh ISR
});
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
