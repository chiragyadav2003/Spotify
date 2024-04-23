import getSongs from "@/actions/getSongs";
import { Header } from "@/components/header";
import { ListItem } from "@/components/listItem";
import likedImage from "@/public/images/liked.jpeg"
import PageContent from "./_components/pageContent";

//new data after every reload, remove cache
export const revalidate = 0;

export default async function Home() {

  const songs = await getSongs()

  return (
    <div className=" bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      {/* header */}
      <Header>
        <div className="mb-2">
          <h1 className=" text-3xl text-white font-semibold">
            Welcome back
          </h1>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4"
          >
            <ListItem
              image={likedImage.src}
              name="Liked Songs"
              href="liked"
            />
          </div>
        </div>
      </Header>
      {/* new songs */}
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className=" text-2xl font-semibold text-white">
            Newest songs
          </h1>
        </div>
        <PageContent songs={songs} />
      </div>
    </div>
  );
}
