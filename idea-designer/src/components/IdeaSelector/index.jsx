import { useIdeaSetContext } from "@/context/IdeaSetContext";
import IdeaRow from "../IdeaRow";
import "./IdeaSelector.css";
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
              idea.id,
              idea.name,
              idea.level,
              idea.bonus_per_level,
              idea.cost_per_level,
              idea.type,
              idea.base_cost,
              idea.category,
              idea.image
            )
        )
      ));
    }
  }, []);

  // Dividindo o conjunto de ideias em categorias
  const traditions = ideaSet.slice(0, 2);
  const ideas = ideaSet.slice(2, 9);
  const ambition = ideaSet.slice(9, 10);

  return (
    <div className="ideaSelector">
      {/* Traditions Section */}
      <div>
        <div className="titles">
          <h2 className="item">Traditions</h2>
          <h2 className="item">Level</h2>
          <h2 className="item">Bonus</h2>
          <h2 className="item">Cost</h2>
        </div>
        <div className="ideaList">
          {traditions.map((idea, index) => (
            <IdeaRow idea={idea} key={index} id={index} />
          ))}
        </div>
      </div>

      {/* Ideas Section */}
      <div>
        <div className="titles">
          <h2 className="item">Ideas</h2>
          <h2 className="item">Level</h2>
          <h2 className="item">Bonus</h2>
          <h2 className="item">Cost</h2>
        </div>
        <div className="ideaList">
          {ideas.map((idea, index) => (
            <IdeaRow idea={idea} key={index + 2} id={index + 2} />
          ))}
        </div>
      </div>

      {/* Ambition Section */}
      <div>
        <div className="titles">
          <h2 className="item">Ambition</h2>
          <h2 className="item">Level</h2>
          <h2 className="item">Bonus</h2>
          <h2 className="item">Cost</h2>
        </div>
        <div className="ideaList">
          {ambition.map((idea, index) => (
            <IdeaRow idea={idea} key={9} id={9} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IdeaSelector;
