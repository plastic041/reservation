import { trpc } from "~/utils/trpc";
import { useAtom } from "jotai";
import {
  selectedDateAtom,
  selectedDateTimeAtom,
  selectedOptionIdAtom,
  selectedTimeAtom,
} from "~/stores/reservation";

type SummaryProps = {
  menuId: number;
};
const Summary = ({ menuId }: SummaryProps) => {
  const [selectedOptionId] = useAtom(selectedOptionIdAtom);
  const [selectedDate] = useAtom(selectedDateAtom);
  const [selectedTime] = useAtom(selectedTimeAtom);
  const [selectedDateTime] = useAtom(selectedDateTimeAtom);

  const { data: menu } = trpc.useQuery(["reservation.menu", { menuId }]);
  const { data: menuOptions } = trpc.useQuery([
    "reservation.menu-options",
    { menuId },
  ]);

  const optionPrice: number | undefined = menuOptions?.find(
    (option) => option.id === selectedOptionId
  )?.price;
  const totalPrice: number | null =
    optionPrice === undefined || !menu ? null : menu.price + optionPrice;

  if (!menu || !menuOptions) {
    return <div>loading..</div>;
  }

  return (
    <section className="shadow-t absolute bottom-0 left-0 right-0 z-10 flex flex-col gap-4 rounded bg-white p-4 lg:mx-80">
      <dl className="flex flex-col gap-1">
        <div
          className={`flex flex-row justify-between text-xl font-bold transition ${
            totalPrice ? "text-gray-900" : "text-gray-300"
          }`}
        >
          <dt>최종 가격</dt>
          {totalPrice ? (
            <dd className="tabular-nums">{totalPrice.toLocaleString()}원</dd>
          ) : (
            <dd>옵션을 선택해주세요.</dd>
          )}
        </div>
        <div
          className={`flex flex-row justify-between ${
            selectedDateTime ? "text-gray-900" : "text-gray-300"
          }`}
        >
          <dt>일시</dt>
          {selectedDateTime ? (
            <dd className="tabular-nums">
              {selectedDateTime.format("YYYY년 M월 DD일 H:mm")} ~{" "}
              {selectedDateTime.add(2, "hour").format("H:mm")}
            </dd>
          ) : selectedDate ? (
            <dd>시각을 선택해주세요.</dd>
          ) : (
            <dd>날짜를 선택해주세요.</dd>
          )}
        </div>
      </dl>
      <button
        className="rounded-md bg-violet-500 py-2 text-white transition disabled:bg-violet-200"
        disabled={!selectedDate || !selectedTime || selectedOptionId === null}
      >
        예약
      </button>
    </section>
  );
};

export default Summary;
