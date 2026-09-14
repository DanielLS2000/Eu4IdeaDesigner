import React, { useState, useRef, useEffect } from "react";

const NationSelector = ({ options, onSelect, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    onSelect(item);
    setSearchQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      
      {/* BOTÃO SELECT NATIONS */}
      <button 
        className="relative w-[150px] h-[30px] flex items-center justify-between px-3 bg-[#1e2328] border-[1.5px] border-[#5a4225] text-[#f4ecd8] font-serif font-bold text-[13px] rounded-sm shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_0_8px_rgba(0,0,0,0.8)] hover:bg-[#2a3138] active:brightness-90 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Cantos do Botão */}
        <div className="absolute -top-[1.5px] -left-[1.5px] w-2.5 h-2.5 bg-[url('/images/corner-button.png')] bg-contain bg-no-repeat pointer-events-none"></div>
        <div className="absolute -top-[1.5px] -right-[1.5px] w-2.5 h-2.5 bg-[url('/images/corner-button.png')] bg-contain bg-no-repeat rotate-90 pointer-events-none"></div>
        <div className="absolute -bottom-[1.5px] -right-[1.5px] w-2.5 h-2.5 bg-[url('/images/corner-button.png')] bg-contain bg-no-repeat rotate-180 pointer-events-none"></div>
        <div className="absolute -bottom-[1.5px] -left-[1.5px] w-2.5 h-2.5 bg-[url('/images/corner-button.png')] bg-contain bg-no-repeat -rotate-90 pointer-events-none"></div>

        <span className="relative z-10">Select {name}</span>
        <span className="text-[10px] relative z-10">{isOpen ? "▲" : "▼"}</span>
      </button>

      {/* MENU DROPDOWN DE PERGAMINHO */}
      {isOpen && (
        <div className="absolute right-0 top-[105%] w-[220px] bg-[#d9c49c] border-2 border-[#6b4d24] rounded-sm shadow-[0_8px_16px_rgba(0,0,0,0.9)] z-50 flex flex-col">
            
          {/* Cantos do Pergaminho (Requer a imagem corner-parchment.png) */}
          <div className="absolute -top-[2px] -left-[2px] w-5 h-5 bg-[url('/images/corner-parchment.png')] bg-contain bg-no-repeat pointer-events-none z-20"></div>
          <div className="absolute -top-[2px] -right-[2px] w-5 h-5 bg-[url('/images/corner-parchment.png')] bg-contain bg-no-repeat rotate-90 pointer-events-none z-20"></div>
          <div className="absolute -bottom-[2px] -right-[2px] w-5 h-5 bg-[url('/images/corner-parchment.png')] bg-contain bg-no-repeat rotate-180 pointer-events-none z-20"></div>
          <div className="absolute -bottom-[2px] -left-[2px] w-5 h-5 bg-[url('/images/corner-parchment.png')] bg-contain bg-no-repeat -rotate-90 pointer-events-none z-20"></div>

          <div className="border border-[#e8dcc4] w-full h-full flex flex-col relative z-10">
            {/* Input Search */}
            <div className="p-1.5 border-b-2 border-[#8c6b3e] bg-[#cbb485]/50 mx-1 mt-1">
              <input
                type="text"
                className="w-full px-2 py-1 bg-[#e8dcc4] border border-[#a68652] text-[#332211] font-serif text-[13px] placeholder-[#8c6b3e] outline-none shadow-inner"
                placeholder={`Search ${name}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>

            {/* Opções */}
            <div className="max-h-[240px] overflow-y-auto eu4-scrollbar my-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <div
                    key={index}
                    className="px-3 py-1.5 cursor-pointer font-serif text-[14px] text-[#332211] font-bold hover:bg-[#e6d6b8] hover:text-black transition-colors"
                    onClick={() => handleSelect(option)}
                  >
                    {option}
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-center font-serif text-[13px] text-[#8c6b3e] italic">
                  No {name} Available
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NationSelector;