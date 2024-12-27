import React, { useState } from "react";
import "./NationLoader.css";
import { useIdeaSetContext } from "@/context/IdeaSetContext";

const NationLoader = ({ options, onSelect, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {ideas} = useIdeaSetContext();

  const handleSelect = (item) => {
    var newIdeas = [];
    //Traditions
    Object.keys(item["slot0"]).forEach(ideaName =>{
      var idea = ideas.find(obj => obj.name == ideaName)
      // Pegando o nivel da Ideia
      var bonus = item["slot0"][ideaName];
  
      if (idea.type == "percentage") {
        idea["level"] = Math.abs(parseFloat(bonus)*100/parseFloat(idea.per_level));
      } else if (idea.type == "absolute"){
        idea["level"] = Math.abs(parseFloat(bonus)/parseFloat(idea.per_level));
      } else{
        idea["level"] = 1;
      }
      newIdeas = newIdeas.concat([[idea]])
    })

    // Para cada IdeaSlot
    for (var i=1;i<Object.keys(item).length;i++){
      var slot = item[`slot${i}`]
      var slotData = []

      // Pegando os dados de todas as ideias do slot
      Object.keys(slot).forEach(ideaName => {
        var idea = ideas.find(obj => obj.name == ideaName)
        var bonus = slot[ideaName];

        if (idea.type == "percentage") {
          idea["level"] = Math.abs(parseFloat(bonus)*100/parseFloat(idea.per_level));
        } else if (idea.type == "absolute"){
          idea["level"] = Math.abs(parseFloat(bonus)/parseFloat(idea.per_level));
        } else{
          idea["level"] = 1;
        }
        slotData = slotData.concat(idea)
      })

      newIdeas = newIdeas.concat([slotData]);
    }
    onSelect(newIdeas); // Chama a função passada como prop
    setIsOpen(false); // Fecha o dropdown
  };
  const avaliableNations = Object.keys(options)

  return (
    <div className="nation-loader">
      {/* Botão para abrir o dropdown */}
      <button className="nation-loader-button" onClick={() => setIsOpen(!isOpen)}>
        Load {name} ideas{isOpen ? "▲" : "▼"}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="dropdown-container">
          {/* Lista de opções */}
          <div className="dropdown-options">
            {avaliableNations.length > 0 ? (
              avaliableNations.map((option, index) => (
                <div
                  key={index}
                  className="dropdown-option"
                  onClick={() => handleSelect(options[option])}
                >
                  {option}
                </div>
              ))
            ) : (
              <div className="dropdown-no-results">No {name} Available</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NationLoader;
