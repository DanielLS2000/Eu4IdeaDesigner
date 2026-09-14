import { useIdeaSetContext } from "@/context/IdeaSetContext";
import IdeaRow from "../IdeaRow";
import { useEffect } from "react";

const IdeaSelector = () => {
  const { ideaSet, setIdeaSet, Idea} = useIdeaSetContext();

  useEffect(() => {
    const savedIdeaSet = localStorage.getItem("ideaSet");
    if (savedIdeaSet) {
      setIdeaSet(JSON.parse(savedIdeaSet).map(slot =>
        slot.map(
          idea =>
            new Idea(
              idea.id, idea.name, idea.level, idea.bonus_per_level,
              idea.cost_per_level, idea.type, idea.base_cost, idea.category, idea.image
            )
        )
      ));
    }
  }, []);

  const traditions = ideaSet.slice(0, 2);
  const ideas = ideaSet.slice(2, 9);
  const ambition = ideaSet.slice(9, 10);

  // Cabeçalhos limpos, sem bordas, apenas a imagem de fundo esticada para preencher
  const SectionHeader = ({ title }) => (
    <div className="grid grid-cols-[3fr_1fr_1.5fr_1fr_2.5fr_0.5fr] gap-x-3 items-center mb-1">
      <div className="flex items-center justify-center h-[32px] bg-[url('/images/red-banner.png')] bg-[length:100%_100%] bg-no-repeat shadow-sm">
        <h2 className="font-serif font-bold text-[#f4ecd8] text-[15px] drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]">{title}</h2>
      </div>
      <div className="flex items-center justify-center h-[32px] bg-[url('/images/red-banner.png')] bg-[length:100%_100%] bg-no-repeat shadow-sm">
        <h2 className="font-serif font-bold text-[#f4ecd8] text-[15px] drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]">Level</h2>
      </div>
      <div className="flex items-center justify-center h-[32px] bg-[url('/images/red-banner.png')] bg-[length:100%_100%] bg-no-repeat shadow-sm">
        <h2 className="font-serif font-bold text-[#f4ecd8] text-[15px] drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]">Bonus</h2>
      </div>
      <div className="flex items-center justify-center h-[32px] bg-[url('/images/red-banner.png')] bg-[length:100%_100%] bg-no-repeat shadow-sm">
        <h2 className="font-serif font-bold text-[#f4ecd8] text-[15px] drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]">Cost</h2>
      </div>
      <div className="col-span-2"></div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Traditions Section */}
      <div>
        <SectionHeader title="Traditions" />
        <div className="flex flex-col gap-1">
          {traditions.map((idea, index) => <IdeaRow idea={idea} key={index} id={index} />)}
        </div>
      </div>

      {/* Ideas Section */}
      <div>
        <SectionHeader title="Ideas" />
        <div className="flex flex-col gap-1">
          {ideas.map((idea, index) => <IdeaRow idea={idea} key={index + 2} id={index + 2} />)}
        </div>
      </div>

      {/* Ambition Section */}
      <div>
        <SectionHeader title="Ambition" />
        <div className="flex flex-col gap-1">
          {ambition.map((idea, index) => <IdeaRow idea={idea} key={9} id={9} />)}
        </div>
      </div>
    </div>
  );
};

export default IdeaSelector;