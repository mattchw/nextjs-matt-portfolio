import { about, resume, projects, contact } from "@/data";
import { getBlogPosts } from "@/lib/blog";
import { SiteShell } from "@/components/SiteShell";
import Banner from "@/components/Banner/Banner";
import About from "@/components/About/About";
import Resume from "@/components/Resume/Resume";
import Project from "@/components/Project/Project";
import Blog from "@/components/Blog/Blog";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";

export default async function Home() {
  const posts = await getBlogPosts();

  return (
    <SiteShell>
      <Banner />
      <About data={about} />
      <Resume data={resume} />
      <Project projects={projects} />
      <Blog posts={posts} />
      <Contact info={contact.info} socials={contact.socials} />
      <Footer />
    </SiteShell>
  );
}
