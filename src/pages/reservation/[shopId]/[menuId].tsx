import { useRouter } from "next/router";
import ShopHeader from "~/components/shop-header";
import { trpc } from "~/utils/trpc";
import { useAtom } from "jotai";
import {
  selectedDateAtom,
  selectedDateTimeAtom,
  selectedOptionIdAtom,
} from "~/stores/reservation";
import OptionSection from "~/components/option-section";
import DateSection from "~/components/date-section";
import TimeSection from "~/components/time-section";
import Summary from "~/components/summary";
import PeopleSection from "~/components/people-section";
import RequestSection from "~/components/request-section";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const ReservationMenuPage = () => {
  const [selectedOptionId] = useAtom(selectedOptionIdAtom);
  const [selectedDate] = useAtom(selectedDateAtom);
  const [selectedDateTime] = useAtom(selectedDateTimeAtom);

  const router = useRouter();
  const shopId = Number(router.query.shopId as string);
  const menuId = Number(router.query.menuId as string);

  const { data: shop } = trpc.useQuery(["reservation.shop", { shopId }]);
  const { data: menu } = trpc.useQuery(["reservation.menu", { menuId }]);

  if (!menu || !shop) {
    return <div>loading..</div>;
  }

  return (
    <div className="container relative mx-auto flex h-full flex-col gap-4 p-4 lg:px-[21rem]">
      <ShopHeader shop={shop} to={`/reservation/${shopId}`} />
      <SimpleBar className="flex overflow-y-auto">
        <section className="flex flex-col gap-4 pb-80">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between font-bold">
              <h2 className="text-xl">{menu.name}</h2>
              <span className="text-lg tabular-nums text-orange-600">
                {menu.price.toLocaleString()}원
              </span>
            </div>
            <p className="text-sm text-gray-700">{menu.description}</p>
          </div>
          <hr />
          <OptionSection menuId={menuId} />
          {selectedOptionId !== null && <hr />}
          {selectedOptionId !== null && <DateSection />}
          {selectedDate !== null && <hr />}
          {selectedDate !== null && <TimeSection />}
          {selectedDateTime !== null && <hr />}
          {selectedDateTime !== null && <PeopleSection />}
          {selectedDateTime !== null && <hr />}
          {selectedDateTime !== null && <RequestSection />}
        </section>
      </SimpleBar>
      <Summary menuId={menuId} />
    </div>
  );
};

export default ReservationMenuPage;
