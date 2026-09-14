import { useIdeaSetContext } from "@/context/IdeaSetContext";
import IdeaRow from "../IdeaRow";
import { useEffect, useState } from "react";
import "./IdeaSelector.css";

const IdeaSelector = () => {
  const { ideaSet, setIdeaSet, Idea} = useIdeaSetContext();
  const [resetVersion, setResetVersion] = useState(0);

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

  const clearAllIdeas = () => {
    setIdeaSet(
      Array.from({ length: 10 }, (_, id) => {
        const name = id < 2 ? `Tradition ${id + 1}` : id < 9 ? `Idea ${id - 1}` : "Ambition";
        return [new Idea(id, name, 1, 5, 3, "percentage", 0, "ADM", "unknown")];
      })
    );
    setResetVersion((version) => version + 1);
  };

  // Cabeçalhos limpos, sem bordas, apenas a imagem de fundo esticada para preencher
  const SectionHeader = ({ title }) => (
    <div className="sectionHeader">
      <div className="sectionHeaderItem shadow-sm">
        <h2 className="font-serif font-bold text-[#f4ecd8] text-[15px] drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]">{title}</h2>
      </div>
      <div className="sectionHeaderItem shadow-sm">
        <h2 className="font-serif font-bold text-[#f4ecd8] text-[15px] drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]">Level</h2>
      </div>
      <div className="sectionHeaderItem shadow-sm">
        <h2 className="font-serif font-bold text-[#f4ecd8] text-[15px] drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]">Bonus</h2>
      </div>
      <div className="sectionHeaderItem shadow-sm">
        <h2 className="font-serif font-bold text-[#f4ecd8] text-[15px] drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]">Cost</h2>
      </div>
      <div className="col-span-2"></div>
    </div>
  );

  return (
    <div className="ideaSelector">
      <div className="flex justify-end -mb-3">
        <button
          type="button"
          onClick={clearAllIdeas}
          className="h-[26px] px-3 bg-[#1e2328] border-[1.5px] border-[#5a4225] rounded-sm text-[#d9c49c] font-serif font-bold text-[12px] shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_0_8px_rgba(0,0,0,0.8)] hover:bg-[#2a3138] hover:text-[#f4ecd8] active:brightness-90 transition-all"
        >
          Clear All Ideas
        </button>
      </div>

      {/* Traditions Section */}
      <div className="ideaSelector-section ideaSelector-section--traditions">
        <SectionHeader title="Traditions" />
        <div className="ideaSelector-list">
          {traditions.map((idea, index) => <IdeaRow idea={idea} key={`${resetVersion}-${index}`} id={index} />)}
        </div>
      </div>

      {/* Ideas Section */}
      <div className="ideaSelector-section ideaSelector-section--ideas">
        <SectionHeader title="Ideas" />
        <div className="ideaSelector-list">
          {ideas.map((idea, index) => <IdeaRow idea={idea} key={`${resetVersion}-${index + 2}`} id={index + 2} />)}
        </div>
      </div>

      {/* Ambition Section */}
      <div className="ideaSelector-section ideaSelector-section--ambition">
        <SectionHeader title="Ambition" />
        <div className="ideaSelector-list">
          {ambition.map((idea, index) => <IdeaRow idea={idea} key={`${resetVersion}-9`} id={9} />)}
        </div>
      </div>
    </div>
  );
};

export default IdeaSelector;
