import React, { useState, useRef, useEffect } from "react";

const IdeaSlotMenu = ({ options, onSelect, selectedIdea }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    const index = options.indexOf(item);
    onSelect(index);
    setIsOpen(false);
  };

  const hasMultiple = options.length > 1;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => hasMultiple && setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-3 text-left font-serif text-[15px] text-[#e8dcc4] ${hasMultiple ? 'cursor-pointer hover:text-white' : 'cursor-default'}`}
      >
        <img 
          src={`/images/${options[selectedIdea]?.category || 'ADM'}.png`} 
          alt="" 
          className="w-7 h-7 object-contain drop-shadow-md" 
        />
        <span className="truncate">{options[selectedIdea]?.name || "Select Idea"}</span>
        {hasMultiple && <span className="text-[10px] text-[#8c6b3e] ml-2">▼</span>}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[110%] min-w-[220px] bg-[#d9c49c] border-2 border-[#8c6b3e] rounded-sm shadow-[0_8px_16px_rgba(0,0,0,0.9)] z-50">
          <div className="border border-[#e8dcc4] w-full h-full max-h-[220px] overflow-y-auto eu4-scrollbar">
            {options.map((option, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-3 py-2 cursor-pointer font-serif text-[14px] text-[#332211] font-bold border-b border-[#c2a977] hover:bg-[#e6d6b8] hover:text-black transition-colors"
                onClick={() => handleSelect(option)}
              >
                <img src={`/images/${option.category || 'ADM'}.png`} alt="" className="w-5 h-5 object-contain" />
                <span className="truncate">{option.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IdeaSlotMenu;