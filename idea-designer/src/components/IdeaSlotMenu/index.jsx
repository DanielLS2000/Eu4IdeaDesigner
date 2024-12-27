import React, { useState } from "react";
import "./IdeaSlotMenu.css";

const IdeaSlotMenu = ({ options, onSelect, selectedIdea }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item) => {
    const index = options.indexOf(item);
    onSelect(index); // Chama a função passada como prop
    setIsOpen(false); // Fecha o dropdown após selecionar
  };

  return (
    <div className="idea-slot" onClick={() => setIsOpen(!isOpen)}>
      {/* Botão para abrir o dropdown */}
      <button
        className="idea-slot-button"
      >
        <span className="line-idea">
          <img src={`/images/${options[selectedIdea]?.category}.png`} alt="" className="idea-image" />
          {options[selectedIdea]?.name || "Select Idea"}
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="dropdown-ideaslot ideaslot-options">
          {options.map((option, index) => (
            <div
              key={index}
              className="ideaslot-option"
              onClick={() => handleSelect(option)}
            >
              <span className="line-idea">
                <img src={`/images/${option.category}.png`} alt="" className="idea-image" />
                {option.name}
              </span>
            </div>
          ))}
          {options.length === 0 && (
            <div className="dropdown-no-results">No Ideas Available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default IdeaSlotMenu;
