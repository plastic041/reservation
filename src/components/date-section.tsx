import { useAtom } from "jotai";
import { selectedDateAtom } from "~/stores/reservation";
import Section from "./section";

const DateSection = () => {
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);

  return (
    <Section>
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
            className={`flex cursor-pointer flex-row gap-2 transition hover:text-gray-400 ${
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
    </Section>
  );
};

export default DateSection;
