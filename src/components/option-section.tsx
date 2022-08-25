import { trpc } from "~/utils/trpc";
import { useAtom } from "jotai";
import { selectedOptionIdAtom } from "~/stores/reservation";
import Section from "./section";

type OptionProps = {
  menuId: number;
};
const OptionSection = ({ menuId }: OptionProps) => {
  const [selectedOptionId, setSelectedOptionId] = useAtom(selectedOptionIdAtom);

  const { data: menuOptions } = trpc.useQuery([
    "reservation.menu-options",
    { menuId },
  ]);

  if (!menuOptions) {
    return <div>loading..</div>;
  }

  return (
    <Section>
      <span className="text-2xl font-bold">옵션</span>
      <ul className="flex flex-col gap-2">
        {menuOptions.map((option) => (
          <li key={option.id}>
            <div
              onClick={() => setSelectedOptionId(option.id)}
              className={`flex cursor-pointer flex-row justify-between transition
                    hover:text-gray-400
                     ${
                       option.id === selectedOptionId
                         ? "text-gray-700"
                         : "text-gray-300"
                     }`}
            >
              <div className="flex flex-row gap-2">
                <input type="radio" checked={option.id === selectedOptionId} />
                <span className="">{option.name}</span>
              </div>
              <span className="tabular-nums">
                {option.price.toLocaleString()}원
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default OptionSection;
