import React from "react";
import { useIdeaSetContext } from "@/context/IdeaSetContext";
import "./Preview.css";
import SlotName from "../SlotName";

const PreviewIdea = ({ idea }) => (
  <div className="preview-row">
    <div className="preview-idea-details">
      <span className="preview-bonus">{idea.getBonus()}</span>
      <img src={`/images/ideaEu4/${idea.image}.png`} alt="" className="preview-idea-image" />
      <span className="preview-idea-name">{idea.name}</span>
    </div>
    <span className="preview-row-cost">{idea.getCost().toFixed(0)}</span>
  </div>
);

const PreviewSection = ({ title, groups, showSlotNames = false }) => (
  <section className={`preview-section${showSlotNames ? " preview-ideas-section" : ""}`}>
    <h2 className="preview-section-title">{title}</h2>
    <div className={`preview-section-content${showSlotNames ? " eu4-scrollbar" : ""}`}>
      {groups.map((ideaGroup, index) => (
        <div className="preview-slot" key={`${title}-${index}`}>
          {showSlotNames && (
            <div className="preview-slot-title">
              <SlotName id={ideaGroup[0].id - 1} image={ideaGroup[0].image} />
            </div>
          )}
          {ideaGroup.map((idea, ideaIndex) => (
            <PreviewIdea idea={idea} key={`${idea.id}-${ideaIndex}`} />
          ))}
        </div>
      ))}
    </div>
  </section>
);

const Preview = () => {
  const { ideaSet } = useIdeaSetContext();

  return (
    <aside className="preview" aria-label="Nation ideas preview">
      <PreviewSection title="Traditions" groups={ideaSet.slice(0, 2)} />
      <PreviewSection title="Ideas" groups={ideaSet.slice(2, 9)} showSlotNames />
      <PreviewSection title="Ambition" groups={ideaSet.slice(9, 10)} />
    </aside>
  );
};

export default Preview;
