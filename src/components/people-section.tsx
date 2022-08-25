import { IconMinus, IconPlus } from "@tabler/icons";
import { useAtom } from "jotai";
import { selectedPeopleAtom } from "~/stores/reservation";
import Section from "./section";

const PeopleSection = () => {
  const [selectedPeople, setSelectedPeople] = useAtom(selectedPeopleAtom);

  return (
    <Section>
      <span className="text-2xl font-bold">인원</span>
      <div className="flex flex-row gap-1">
        <button onClick={() => setSelectedPeople((prev) => prev - 1)}>
          <IconMinus />
        </button>
        <input
          type="number"
          className="h-8 flex-1 rounded border text-center"
          value={selectedPeople}
          onChange={(e) => setSelectedPeople(e.currentTarget.valueAsNumber)}
          min={1}
          max={30}
        />

        <button onClick={() => setSelectedPeople((prev) => prev + 1)}>
          <IconPlus />
        </button>
      </div>
    </Section>
  );
};

export default PeopleSection;
