import React, { useState } from "react";
import './NationSelector.css'

const NationSelector = ({ options, onSelect, name}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filtra as opções com base no termo de pesquisa
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (item) => {
    onSelect(item); // Chama a função passada como prop
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
        Select {name}
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
          {/* Campo de pesquisa */}
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              boxSizing: "border-box",
              border: "none",
              borderBottom: "1px solid #ccc",
              color: "#000",
            }}
          />

          {/* Lista de opções */}
          {filteredOptions.map((option, index) => (
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
              {option}
            </div>
          ))}

          {/* Caso não haja itens */}
          {filteredOptions.length === 0 && (
            <div style={{ padding: "10px", textAlign: "center", color: "#999" }}>
              No {name} Avaliable
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NationSelector;
