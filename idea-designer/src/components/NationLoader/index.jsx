import React, { useState, useRef, useEffect } from "react";
import { useIdeaSetContext } from "@/context/IdeaSetContext";

const NationLoader = ({ options, onSelect, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { ideas } = useIdeaSetContext();
  const dropdownRef = useRef(null);

  const govMechanics = [
    "legitimacy",
    "devotion",
    "republican_tradition",
    "meritocracy",
    "horde_unity"
  ];

  // Fecha o dropdown ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lógica original de processamento
  const parseIdea = (ideaName, rawBonus, isGov, isFirstGov) => {
    var foundIdea = ideas.find((obj) => obj.name === ideaName);

    if (!foundIdea) {
      console.warn(`Ideia não encontrada: ${ideaName}`);
      return null;
    }

    var idea = { ...foundIdea };

    if (idea.type === "percentage") {
      idea["level"] = Math.abs((parseFloat(rawBonus) * 100) / parseFloat(idea.per_level));
    } else if (idea.type === "absolute") {
      idea["level"] = Math.abs(parseFloat(rawBonus) / parseFloat(idea.per_level));
    } else {
      idea["level"] = 1;
    }

    if (isGov && !isFirstGov) {
      idea.base_cost = 0;
      idea.cost_per_level = 0;
    }

    return idea;
  };

  const handleSelect = (item) => {
    var newIdeas = [];

    if (item["slot0"]) {
      let keys = Object.keys(item["slot0"]);
      let govKeys = keys.filter((k) => govMechanics.includes(k));
      let regKeys = keys.filter((k) => !govMechanics.includes(k));

      let trad1 = [];
      let trad2 = [];

      if (govKeys.length > 0) {
        govKeys.forEach((k, index) => {
          let ideaObj = parseIdea(k, item["slot0"][k], true, index === 0);
          if (ideaObj) trad1.push(ideaObj);
        });
        
        regKeys.forEach((k) => {
          let ideaObj = parseIdea(k, item["slot0"][k], false, false);
          if (ideaObj) trad2.push(ideaObj);
        });
      } else {
        if (regKeys.length > 0) {
          let ideaObj = parseIdea(regKeys[0], item["slot0"][regKeys[0]], false, false);
          if (ideaObj) trad1.push(ideaObj);
        }
        for (let i = 1; i < regKeys.length; i++) {
          let ideaObj = parseIdea(regKeys[i], item["slot0"][regKeys[i]], false, false);
          if (ideaObj) trad2.push(ideaObj);
        }
      }

      newIdeas.push(trad1);
      newIdeas.push(trad2);
    } else {
      newIdeas.push([]);
      newIdeas.push([]);
    }

    for (var i = 1; i <= 8; i++) {
      var slot = item[`slot${i}`];
      var slotData = [];

      if (slot) {
        var foundGov = false;

        Object.keys(slot).forEach((ideaName) => {
          let isGov = govMechanics.includes(ideaName);
          let isFirstGov = false;

          if (isGov) {
            if (!foundGov) {
              isFirstGov = true;
              foundGov = true;
            }
          }

          let ideaObj = parseIdea(ideaName, slot[ideaName], isGov, isFirstGov);
          if (ideaObj) slotData.push(ideaObj);
        });
      }

      newIdeas.push(slotData);
    }

    onSelect(newIdeas);
    setIsOpen(false);
  };

  const avaliableNations = Object.keys(options);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button 
        className="w-[180px] h-[30px] flex items-center justify-between px-3 bg-gradient-to-b from-[#40688a] to-[#25415c] border border-[#a88a52] text-[#f4ecd8] font-serif font-bold text-[13px] rounded-sm shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:brightness-110 active:brightness-90 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Load {name}</span>
        <span className="text-[10px]">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[110%] w-[200px] bg-[#d9c49c] border-2 border-[#8c6b3e] rounded-sm shadow-[0_8px_16px_rgba(0,0,0,0.8)] z-50 overflow-hidden">
          <div className="border border-[#e8dcc4] w-full h-full">
            <div className="max-h-[240px] overflow-y-auto eu4-scrollbar">
              {avaliableNations.length > 0 ? (
                avaliableNations.map((option, index) => (
                  <div
                    key={index}
                    className="px-3 py-1.5 cursor-pointer font-serif text-[14px] text-[#332211] font-bold border-b border-[#c2a977] hover:bg-[#e6d6b8] hover:text-black transition-colors"
                    onClick={() => handleSelect(options[option])}
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

export default NationLoader;