import MOCK from "@/mocks/event.json";
import Fetch from "@/utils/Fetch";
import Banner from "@/components/banner/Banner";

import EventCard, { EventCardProps } from "@/components/card/EventCard";

const prepareFetch = async () => {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/event/upcoming` || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return res;
  }

  return { data: MOCK.card };
};

export default async function Upcoming() {
  const { data } = await prepareFetch();

  return (
    <section>
      <Banner
        src="https://p-u.popcdn.net/collections/covers/000/000/119/cover/hero-3.png?1602133913"
        alt="banner"
        text="Upcoming Events"
      />
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {data.map((event: EventCardProps, index: number) => (
            <EventCard key={index} data={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
