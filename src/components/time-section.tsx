import Section from "./section";
import { useAtom } from "jotai";
import { selectedTimeAtom } from "~/stores/reservation";

const TimeSection = () => {
  const [selectedTime, setSelectedTime] = useAtom(selectedTimeAtom);

  return (
    <Section>
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
            className={`flex cursor-pointer flex-row gap-2 transition hover:text-gray-400 ${
              selectedTime?.hour === hour && selectedTime?.minute === minute
                ? "text-gray-700"
                : ""
            }`}
          >
            <input
              type="radio"
              checked={
                selectedTime?.hour === hour && selectedTime?.minute === minute
              }
            />
            {hour}:{String(minute).padStart(2, "0")} ~ {hour + 2}:
            {String(minute).padStart(2, "0")}
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default TimeSection;
