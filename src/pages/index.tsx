import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import Profile from "@/components/Profile";
import Search from "@/components/Search";

const Home: NextPage = () => {
  const [profile, setProfile] = useState<{
    name: string;
    description: string;
    image?: string;
  }>({
    name: "",
    description: "",
  });

  const { data } = api.wiki.getPage.useQuery({ title: "joy division" });

  useEffect(() => {
    setProfile({
      name: data?.page.title || "",
      description: data?.page.description || "",
      image: data?.page.image || "",
    });
  }, [data]);

  return (
    <>
      <Head>
        <title>WikiInterviews</title>
        <meta
          name="description"
          content="An conversational interview with a Wikipedia page."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <Search
          className="absolute top-8 w-2/3"
          value=""
          onChange={() => console.log("todo...")}
          onSubmit={() => console.log("todo...")}
        />
        <div className="flex h-[65vh] w-2/3 gap-4 rounded-lg">
          <div className="flex h-full basis-2/3 flex-col gap-4">
            <div className="h-full rounded-lg border"></div>
            <div className="h-16 rounded-lg border"></div>
          </div>
          <Profile
            name={profile.name}
            description={profile.description}
            image={profile?.image}
          />
        </div>
      </main>
    </>
  );
};

export default Home;
