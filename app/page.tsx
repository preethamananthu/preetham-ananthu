import { HomeClient } from "@/components/home-client";
import { client } from "@/lib/sanity";

export const revalidate = 3600; // Edge cache for 1 hour

export default async function Page() {
  const featuredProject = await client.fetch(`*[_type == "project" && featured == true][0]`);
  return <HomeClient featuredProject={featuredProject} />;
}
