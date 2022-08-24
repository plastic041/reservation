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

  return (
    <div className="container mx-auto flex flex-col h-full p-4 gap-4">
      <ShopHeader shop={shop} to={`/reservation/${shopId}`} />
      <main className="flex flex-col justify-between h-full">
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
          <ul className="flex flex-col gap-2">
            {menuOptions.map((option) => (
              <li key={option.id}>
                <div
                  onClick={() => setSelectedOptionId(option.id)}
                  className="flex flex-row justify-between"
                >
                  <div className="flex flex-row gap-2">
                    <input
                      type="radio"
                      checked={option.id === selectedOptionId}
                    />
                    <span className="">{option.name}</span>
                  </div>
                  <span
                    className={`tabular-nums ${
                      option.id === selectedOptionId
                        ? "text-gray-700"
                        : "text-gray-300"
                    }`}
                  >
                    {option.price.toLocaleString()}원
                  </span>
                </div>
              </li>
            ))}
          </ul>
          {selectedOptionId !== null && (
            <ul className="flex flex-col text-gray-300">
              {[
                { year: 2022, month: 8, day: 24 },
                { year: 2022, month: 8, day: 25 },
                { year: 2022, month: 8, day: 26 },
              ].map(({ year, month, day }) => (
                <li
                  key={`${year}${month}${day}`}
                  onClick={() => setSelectedDate({ year, month, day })}
                  className={`${
                    selectedDate?.year === year &&
                    selectedDate?.month === month &&
                    selectedDate?.day === day
                      ? "text-gray-700"
                      : ""
                  }`}
                >
                  {year}년 {month}월 {day}일
                </li>
              ))}
            </ul>
          )}
          {selectedDate && (
            <ul className="flex flex-col text-gray-300">
              {[
                { hour: 12, minute: 0 },
                { hour: 14, minute: 0 },
                { hour: 16, minute: 0 },
              ].map(({ hour, minute }) => (
                <li
                  key={hour}
                  onClick={() => setSelectedTime({ hour, minute })}
                  className={`${
                    selectedTime?.hour === hour &&
                    selectedTime?.minute === minute
                      ? "text-gray-700"
                      : ""
                  }`}
                >
                  {hour}:{String(minute).padStart(2, "0")}
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="flex flex-col gap-2 -m-4 p-4 shadow-t rounded">
          <div className="flex flex-row justify-between text-xl font-bold">
            <span>최종 가격</span>
            {totalPrice ? (
              <span>{totalPrice.toLocaleString()}원</span>
            ) : (
              <span>옵션을 선택해주세요.</span>
            )}
          </div>
          <button
            className={`text-white bg-violet-500 disabled:bg-violet-200 py-2 rounded-md`}
            disabled={
              !(selectedDate && selectedTime) && selectedOptionId !== null
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
