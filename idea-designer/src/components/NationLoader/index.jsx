import React, { useState } from "react";
import "./NationLoader.css";
import { useIdeaSetContext } from "@/context/IdeaSetContext";

const NationLoader = ({ options, onSelect, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { ideas } = useIdeaSetContext();

  // Lista dos modificadores que são exclusivos entre si dependendo do governo
  const govMechanics = [
    "legitimacy",
    "devotion",
    "republican_tradition",
    "meritocracy",
    "horde_unity"
  ];

  // Função auxiliar para processar e formatar uma única ideia
  const parseIdea = (ideaName, rawBonus, isGov, isFirstGov) => {
    var foundIdea = ideas.find((obj) => obj.name === ideaName);

    if (!foundIdea) {
      console.warn(`Ideia não encontrada: ${ideaName}`);
      return null;
    }

    var idea = { ...foundIdea }; // Cópia para não mutar o estado base

    if (idea.type === "percentage") {
      idea["level"] = Math.abs((parseFloat(rawBonus) * 100) / parseFloat(idea.per_level));
    } else if (idea.type === "absolute") {
      idea["level"] = Math.abs(parseFloat(rawBonus) / parseFloat(idea.per_level));
    } else {
      idea["level"] = 1;
    }

    // Zera o custo dos atributos de governo excedentes para contar o custo apenas 1 vez
    if (isGov && !isFirstGov) {
      idea.base_cost = 0;
      idea.cost_per_level = 0;
    }

    return idea;
  };

  const handleSelect = (item) => {
    var newIdeas = [];

    // --- Processamento do Slot 0 (Traditions) ---
    // O Slot 0 sempre deve retornar exatamente 2 arrays para preencher as Tradições 1 e 2
    if (item["slot0"]) {
      let keys = Object.keys(item["slot0"]);
      let govKeys = keys.filter((k) => govMechanics.includes(k));
      let regKeys = keys.filter((k) => !govMechanics.includes(k));

      let trad1 = [];
      let trad2 = [];

      // Se houver mecânicas de governo, todas vão para a Tradição 1 agrupadas
      if (govKeys.length > 0) {
        govKeys.forEach((k, index) => {
          let ideaObj = parseIdea(k, item["slot0"][k], true, index === 0);
          if (ideaObj) trad1.push(ideaObj);
        });
        
        // A ideia restante vai para a Tradição 2
        regKeys.forEach((k) => {
          let ideaObj = parseIdea(k, item["slot0"][k], false, false);
          if (ideaObj) trad2.push(ideaObj);
        });
      } else {
        // Se não houver, divide a primeira na Tradição 1 e o resto na Tradição 2
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

    // --- Processamento dos Slots 1 a 8 (Ideas e Ambition) ---
    for (var i = 1; i <= 8; i++) {
      var slot = item[`slot${i}`];
      var slotData = [];

      if (slot) {
        var foundGov = false;

        Object.keys(slot).forEach((ideaName) => {
          let isGov = govMechanics.includes(ideaName);
          let isFirstGov = false;

          // Sinaliza se é o primeiro atributo de governo do slot para manter seu custo
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

      newIdeas.push(slotData); // Mesmo se estiver vazio, adiciona para não quebrar a ordem
    }

    onSelect(newIdeas);
    setIsOpen(false);
  };

  const avaliableNations = Object.keys(options);

  return (
    <div className="nation-loader">
      <button className="nation-loader-button" onClick={() => setIsOpen(!isOpen)}>
        Load {name} ideas{isOpen ? "▲" : "▼"}
      </button>

      {isOpen && (
        <div className="dropdown-container">
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