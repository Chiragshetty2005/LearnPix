import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { KidsAppSpotlight } from "@/components/landing/kids-app-spotlight";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      <Header />
      <Hero />
      <Features />
      <KidsAppSpotlight />
      <Footer />
    </main>
  );
}
