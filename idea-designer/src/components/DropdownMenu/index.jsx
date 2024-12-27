import React, { useState } from "react";
import './DropdownMenu.css'

const DropdownMenu = ({ options, onSelect, name}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filtra as opções com base no termo de pesquisa
  const filteredOptions = options.filter((option) => {
    var match = false;
    option.forEach(item=> {
        if (item[0].toLowerCase().includes(searchQuery.toLowerCase())){
          match = true;
        }
    });

    return match;
});

  const handleSelect = (item) => {
    onSelect(item); // Chama a função passada como prop
    setIsOpen(false); // Fecha o dropdown após selecionar
  };

  return (
    <div className="dropdownmenu" onClick={() => setIsOpen(!isOpen)}>
      {/* Botão para abrir o dropdown */}
      <button className="dropdownmenu-button">
        Select {name}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="dropdown">
          {/* Campo de pesquisa */}
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="dropdownmenu-search"
          />

          {/* Lista de opções */}
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              className="dropdownmenu-option"
            >
              {option.map((idea) => {
                return <h1 key={idea[1]} >{idea[0]}</h1>
              })}
            </div>
          ))}

          {/* Caso não haja itens */}
          {filteredOptions.length === 0 && (
            <div className="dropdownmenu-no-results">
              No {name} Avaliable
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
