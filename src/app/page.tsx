import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Overview from "@/components/Overview";
import Cast from "@/components/Cast";
import Episodes from "@/components/Episodes";
import Discord from "@/components/Discord";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Overview />
        <Cast />
        <Episodes />
        <Discord />
      </main>
      <Footer />
    </>
  );
}
