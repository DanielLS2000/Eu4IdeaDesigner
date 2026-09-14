import React, { useState, useRef, useEffect } from "react";

const DropdownMenu = ({ options, onSelect, name}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter((option) => {
    let match = false;
    option.forEach(item => {
        if (item[0].toLowerCase().includes(searchQuery.toLowerCase())) match = true;
    });
    return match;
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    onSelect(item);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      
      <button 
        className="relative w-full h-[26px] flex items-center justify-between px-2 bg-[#1e2328] border-[1.5px] border-[#5a4225] text-[#d9c49c] font-serif font-bold text-[12px] rounded-sm shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_0_8px_rgba(0,0,0,0.8)] hover:bg-[#2a3138] hover:text-[#f4ecd8] active:brightness-90 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Cantos do Botão Metálico */}
        <div className="absolute -top-[1.5px] -left-[1.5px] w-2 h-2 bg-[url('/images/corner-button.png')] bg-contain bg-no-repeat pointer-events-none"></div>
        <div className="absolute -top-[1.5px] -right-[1.5px] w-2 h-2 bg-[url('/images/corner-button.png')] bg-contain bg-no-repeat rotate-90 pointer-events-none"></div>
        <div className="absolute -bottom-[1.5px] -right-[1.5px] w-2 h-2 bg-[url('/images/corner-button.png')] bg-contain bg-no-repeat rotate-180 pointer-events-none"></div>
        <div className="absolute -bottom-[1.5px] -left-[1.5px] w-2 h-2 bg-[url('/images/corner-button.png')] bg-contain bg-no-repeat -rotate-90 pointer-events-none"></div>

        <span className="relative z-10 w-full text-left truncate">{name}</span>
        <span className="text-[9px] relative z-10">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[110%] w-full bg-[#d9c49c] border-2 border-[#6b4d24] rounded-sm shadow-[0_8px_16px_rgba(0,0,0,0.9)] z-50 flex flex-col">
          
          {/* Cantos do Pergaminho */}
          <div className="absolute -top-[2px] -left-[2px] w-4 h-4 bg-[url('/images/corner-parchment.png')] bg-contain bg-no-repeat pointer-events-none z-20"></div>
          <div className="absolute -top-[2px] -right-[2px] w-4 h-4 bg-[url('/images/corner-parchment.png')] bg-contain bg-no-repeat rotate-90 pointer-events-none z-20"></div>
          <div className="absolute -bottom-[2px] -right-[2px] w-4 h-4 bg-[url('/images/corner-parchment.png')] bg-contain bg-no-repeat rotate-180 pointer-events-none z-20"></div>
          <div className="absolute -bottom-[2px] -left-[2px] w-4 h-4 bg-[url('/images/corner-parchment.png')] bg-contain bg-no-repeat -rotate-90 pointer-events-none z-20"></div>

          <div className="border border-[#e8dcc4] w-full h-full flex flex-col relative z-10">
            <div className="p-1 border-b-2 border-[#8c6b3e] bg-[#cbb485]/50 mx-1 mt-1">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-2 py-1 bg-[#e8dcc4] border border-[#a68652] text-[#332211] font-serif text-[13px] placeholder-[#8c6b3e] outline-none shadow-inner"
                autoFocus
              />
            </div>

            <div className="max-h-[240px] overflow-y-auto eu4-scrollbar my-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelect(option)}
                    className="px-3 py-1.5 cursor-pointer font-serif text-[13px] text-[#332211] font-bold border-b border-[#c2a977] hover:bg-[#e6d6b8] hover:text-black transition-colors"
                  >
                    {option.map((idea) => (
                      <div key={idea[1]} className="flex items-center gap-2 min-w-0">
                        <img
                          src={`/images/ideaEu4/${idea[2]}.png`}
                          alt=""
                          className="w-6 h-6 object-contain shrink-0"
                        />
                        <span className="truncate">{idea[0]}</span>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-center font-serif text-[12px] text-[#8c6b3e] italic">
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

export default DropdownMenu;
