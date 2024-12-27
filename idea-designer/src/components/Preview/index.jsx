import React, { useState } from "react";
import { useIdeaSetContext } from "@/context/IdeaSetContext";
import "./Preview.css";
import SlotName from "../SlotName";

const Preview = () => {
  const { ideaSet } = useIdeaSetContext(); // Obtém o conjunto de slots

  const traditions = ideaSet.slice(0, 2);
  const ideas = ideaSet.slice(2, 9);
  const ambition = ideaSet.slice(9, 10);

  return (
    <div className="preview">
      {/* Cabeçalho */}
      <div className="preview-header top-header">
        <div className="header-item">Traditions</div>
        <div className="header-item">Cost</div>
      </div>

      {/* Linhas de slots e ideias */}
      <div className="preview-list">
        {traditions.map((ideaGroup, slotId) => {
          return (
            <React.Fragment key={slotId}>
                <div className="preview-slot">
                    {/* Ideias dentro do slot */}
                    {ideaGroup.map((idea, index) => (
                        <div className="preview-row" key={`${slotId}-${index}`}>
                          <div className="row-item">
                            <span className="inline-content">
                              {idea.getBonus()}
                              <img src={`/images/ideaEu4/${idea.image}.png`} alt="" className="idea-image" />
                              {idea.name}
                            </span>
                          </div>
                          <div className="row-item-cost">{idea.getCost().toFixed(0)}</div>
                        </div>
                    ))}
                </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Cabeçalho */}
      <div className="preview-header">
        <div className="header-item">Ideas</div>
      </div>

      {/* Linhas de slots e ideias */}
      <div className="preview-list">
        {ideas.map((ideaGroup, slotId) => {
          return (
            <React.Fragment key={slotId}>
                <div className="preview-slot">
                    <SlotName
                      id={ideaGroup[0].id -1}
                      image={ideaGroup[0].image}
                    />
                    {/* Ideias dentro do slot */}
                    {ideaGroup.map((idea, index) => (
                        <div className="preview-row" key={`${slotId}-${index}`}>
                          <div className="row-item">
                            <span className="inline-content">
                              {idea.getBonus()}
                              <img src={`/images/ideaEu4/${idea.image}.png`} alt="" className="idea-image" />
                              {idea.name}
                            </span>
                          </div>
                          <div className="row-item-cost">{idea.getCost().toFixed(0)}</div>
                        </div>
                    ))}
                </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Cabeçalho */}
      <div className="preview-header">
        <div className="header-item">Ambition</div>
      </div>

      {/* Linhas de slots e ideias */}
      <div className="preview-list">
        {ambition.map((ideaGroup, slotId) => {
          return (
            <React.Fragment key={slotId}>
                <div className="preview-slot">
                    {/* Ideias dentro do slot */}
                    {ideaGroup.map((idea, index) => (
                        <div className="preview-row" key={`${slotId}-${index}`}>
                          <div className="row-item">
                            <span className="inline-content">
                              {idea.getBonus()}
                              <img src={`/images/ideaEu4/${idea.image}.png`} alt="" className="idea-image" />
                              {idea.name}
                            </span>
                          </div>
                          <div className="row-item-cost">{idea.getCost().toFixed(0)}</div>
                        </div>
                    ))}
                </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Preview;
