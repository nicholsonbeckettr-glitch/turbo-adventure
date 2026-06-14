import Background from "@/components/Background";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CardGrid from "@/components/CardGrid";
import ValueProps from "@/components/ValueProps";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Background />
      <Header />
      <Hero />
      <CardGrid />
      <ValueProps />
      <Footer />
    </main>
  );
}
