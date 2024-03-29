import { CarCard, CustomFilter, SearchBar } from "@/components";
import Hero from "@/components/Hero";
import { fetchCars } from "@/utils";
import Image from "next/image";

export default async function Home() {
  const allCars = await fetchCars();

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars[0].message;

  console.log(allCars);
  return (
    <main className="overflow-hidden">
      <Hero />

      <div
        className="mt-12 padding-x padding-y
      max-width"
        id="discover"
      >
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the car that you might like</p>
        </div>
        {/* creating the filters */}

        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" />
            <CustomFilter title="year" />
          </div>
        </div>
        
        {isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {/* //fixed this error early */}
              {allCars?.map((car: any) => (
                <CarCard car={car} />
              ))}
            </div>

          </section>
        ): (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>{allCars[0]?.message}</p>
          </div>
        )}




      </div>
    </main>
  );
}
