

import AllThingsToDoServer from "@/components/things-to-do/AllThingsToDo";
import Hero from "@/components/things-to-do/ThingsToDoHero";

export default async function ThingsToDo() {
  return (
    <div>
      <Hero/>
      <AllThingsToDoServer />
    </div>
  );
}
