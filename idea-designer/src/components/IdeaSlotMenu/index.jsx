import React, { useState } from "react";
import './IdeaSlotMenu.css'

const IdeaSlotMenu = ({ options, onSelect, selectedIdea}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item) => {
    const index = options.indexOf(item)
    onSelect(index); // Chama a função passada como prop
    setIsOpen(false); // Fecha o dropdown após selecionar
  };


  return (
    <div style={{ position: "relative", display: "inline-block", width: "200px" }}>
      {/* Botão para abrir o dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {options[selectedIdea].name}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            maxHeight: "200px",
            overflowY: "auto",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            zIndex: 1000,
          }}
        >
          {/* Lista de opções */}
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #ccc",
                backgroundColor: "#fff",
                transition: "background-color 0.2s",
                color: "#000",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#fff")}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IdeaSlotMenu;
