import { Filters } from "./components/filters";
import { VenueListPage } from "./components/venues-list";
import { env } from "node:process";

export default function Home() {
  const serverUrl = env["services__api__1"] ?? "";

  return (
    <main className="flex flex-row">
      <div className="h-[500px] w-[300px] bg-fuchsia-400 sticky top-[69px] hidden lg:block">
        <Filters />
        {serverUrl}
      </div>
      <div className="flex-grow p-8">
        <VenueListPage serverUrl={serverUrl} />
      </div>
    </main>
  );
}
