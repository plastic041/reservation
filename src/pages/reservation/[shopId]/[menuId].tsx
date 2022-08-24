import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { number } from "zod";
import ShopHeader from "~/components/shop-header";
import { trpc } from "~/utils/trpc";

const ReservationMenuPage = () => {
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<{
    year: number;
    month: number;
    day: number;
  } | null>(null);
  const [selectedTime, setSelectedTime] = useState<{
    hour: number;
    minute: number;
  } | null>(null);

  const router = useRouter();
  const shopId = Number(router.query.shopId as string);
  const menuId = Number(router.query.menuId as string);

  const { data: shop } = trpc.useQuery(["reservation.shop", { shopId }]);
  const { data: menu } = trpc.useQuery(["reservation.menu", { menuId }]);
  const { data: menuOptions } = trpc.useQuery([
    "reservation.menu-options",
    { menuId },
  ]);

  if (!menu || !shop || !menuOptions) {
    return <div>loading..</div>;
  }
  const optionPrice = menuOptions.find(
    (option) => option.id === selectedOptionId
  )?.price;
  const totalPrice: number | null =
    optionPrice === undefined ? null : menu.price + optionPrice;

  const selectedDateTime: dayjs.Dayjs | null =
    selectedDate && selectedTime
      ? dayjs(
          new Date(
            selectedDate.year,
            selectedDate.month - 1,
            selectedDate.day,
            selectedTime.hour,
            selectedTime.minute
          )
        )
      : null;

  return (
    <div className="container mx-auto flex h-full flex-col gap-4 p-4">
      <ShopHeader shop={shop} to={`/reservation/${shopId}`} />
      <main className="flex h-full flex-col justify-between">
        <section className="flex flex-col gap-4">
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
          <section className="flex flex-col gap-2">
            <span className="text-2xl font-bold">옵션</span>
            <ul className="flex flex-col gap-2">
              {menuOptions.map((option) => (
                <li key={option.id}>
                  <div
                    onClick={() => setSelectedOptionId(option.id)}
                    className={`flex flex-row justify-between transition 
                     ${
                       option.id === selectedOptionId
                         ? "text-gray-700"
                         : "text-gray-300"
                     }`}
                  >
                    <div className="flex flex-row gap-2">
                      <input
                        type="radio"
                        checked={option.id === selectedOptionId}
                      />
                      <span className="">{option.name}</span>
                    </div>
                    <span className="tabular-nums">
                      {option.price.toLocaleString()}원
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          {selectedOptionId !== null && <hr />}
          {selectedOptionId === null ? (
            <section className="-translate-y-4 opacity-0 transition-all duration-300" />
          ) : (
            <section className="flex translate-y-0 flex-col gap-2 opacity-100 transition-all">
              <span className="text-2xl font-bold">날짜</span>
              <ul className="flex flex-col gap-2 text-gray-300">
                {[
                  { year: 2022, month: 8, day: 24 },
                  { year: 2022, month: 8, day: 25 },
                  { year: 2022, month: 8, day: 26 },
                ].map(({ year, month, day }) => (
                  <li
                    key={`${year}${month}${day}`}
                    onClick={() => setSelectedDate({ year, month, day })}
                    className={`flex flex-row gap-2 transition ${
                      selectedDate?.year === year &&
                      selectedDate?.month === month &&
                      selectedDate?.day === day
                        ? "text-gray-700"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      checked={
                        selectedDate?.year === year &&
                        selectedDate?.month === month &&
                        selectedDate?.day === day
                      }
                    />
                    {year}년 {month}월 {day}일
                  </li>
                ))}
              </ul>
            </section>
          )}
          {selectedDate !== null && <hr />}
          {selectedDate === null ? (
            <section className="-translate-y-4 opacity-0 transition-all duration-300" />
          ) : (
            <section className="flex translate-y-0 flex-col gap-2 opacity-100 transition-all">
              <span className="text-2xl font-bold">시각</span>
              <ul className="flex flex-col gap-2 text-gray-300">
                {[
                  { hour: 12, minute: 0 },
                  { hour: 14, minute: 0 },
                  { hour: 16, minute: 0 },
                ].map(({ hour, minute }) => (
                  <li
                    key={hour}
                    onClick={() => setSelectedTime({ hour, minute })}
                    className={`flex flex-row gap-2 transition ${
                      selectedTime?.hour === hour &&
                      selectedTime?.minute === minute
                        ? "text-gray-700"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      checked={
                        selectedTime?.hour === hour &&
                        selectedTime?.minute === minute
                      }
                    />
                    {hour}:{String(minute).padStart(2, "0")} ~ {hour + 2}:
                    {String(minute).padStart(2, "0")}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </section>
        <section className="shadow-t -m-4 flex flex-col gap-4 rounded p-4">
          <dl className="flex flex-col gap-1">
            <div
              className={`flex flex-row justify-between text-xl font-bold transition ${
                totalPrice ? "text-gray-900" : "text-gray-300"
              }`}
            >
              <dt>최종 가격</dt>
              {totalPrice ? (
                <dd className="tabular-nums">
                  {totalPrice.toLocaleString()}원
                </dd>
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
                  {selectedDateTime.format("YYYY년 M월 DD일 H:mm")}
                </dd>
              ) : (
                <dd>일자를 선택해주세요.</dd>
              )}
            </div>
          </dl>
          <button
            className="rounded-md bg-violet-500 py-2 text-white transition disabled:bg-violet-200"
            disabled={
              !selectedDate || !selectedTime || selectedOptionId === null
            }
          >
            예약
          </button>
        </section>
      </main>
    </div>
  );
};

export default ReservationMenuPage;
