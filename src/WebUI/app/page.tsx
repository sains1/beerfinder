import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Filters } from "./components/filters";
import { VenueListPage } from "./components/venues-list";
import { env } from "node:process";
import { Button } from "@/components/ui/button";

export default function Home() {
  const serverUrl = env["services__api__1"] ?? "";

  return (
    <main className="flex flex-row">
      <div className="h-[500px] w-[300px] sticky top-[69px] hidden lg:block p-4">
        <Filters />
      </div>
      <div className="flex-grow p-8">
        <Drawer>
          <div className="flex flex-row justify-between mb-4">
            <h1 className="text-2xl font-bold">
              Sort and filter venues in Leeds
            </h1>
            <DrawerTrigger asChild>
              <Button variant="outline" className="block lg:hidden">
                Filter
              </Button>
            </DrawerTrigger>
          </div>
          <DrawerContent className="p-4 mb-8">
            <Filters />
          </DrawerContent>
        </Drawer>
        <VenueListPage serverUrl={serverUrl} />
      </div>
    </main>
  );
}
