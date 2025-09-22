import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import ProductDetail from "./components/ProductDetail";
import ProductShowcase from "./components/ProductShowcase";
import Trust from "./components/Trust";
import Events from "./components/Events";
import Contact from "./components/Contact"; 

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Features />
      <ProductDetail />
      <ProductShowcase />
      <Trust />
      <Events />
      <Contact /> 
    </main>
  );
}
