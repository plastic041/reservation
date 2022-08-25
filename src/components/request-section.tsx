import Section from "./section";

const RequestSection = () => {
  return (
    <Section>
      <span className="text-2xl font-bold">요청사항</span>
      <div className="flex flex-row">
        <textarea
          className="h-32 w-full resize-none rounded border p-2"
          placeholder="맛있게 해주세요 ヾ(•ω•`)o"
        />
      </div>
    </Section>
  );
};

export default RequestSection;
