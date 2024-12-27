import React, { useState } from "react";
import "./NationSelector.css";

const NationSelector = ({ options, onSelect, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filtra as opções com base no termo de pesquisa
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (item) => {
    onSelect(item); // Chama a função passada como prop
    setSearchQuery(""); // Limpa o campo de pesquisa após selecionar
    setIsOpen(false); // Fecha o dropdown
  };

  return (
    <div className="nation-selector">
      {/* Botão para abrir o dropdown */}
      <button className="nation-selector-button" onClick={() => setIsOpen(!isOpen)}>
        Select {name} {isOpen ? "▲" : "▼"}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="dropdown-container">
          {/* Campo de pesquisa */}
          <input
            type="text"
            className="dropdown-search"
            placeholder={`Search ${name}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Lista de opções */}
          <div className="dropdown-options">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className="dropdown-option"
                  onClick={() => handleSelect(option)}
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

export default NationSelector;
