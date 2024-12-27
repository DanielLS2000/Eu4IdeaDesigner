import { createContext, useContext, useEffect, useState } from "react";

class Idea {
  constructor(id, name, level, bonus_per_level, cost_per_level, type, base_cost, category, image) {
    this.id = id;
    this.name = name;
    this.level = level;
    this.bonus_per_level = bonus_per_level;
    this.cost_per_level = cost_per_level;
    this.type = type;
    this.base_cost = base_cost;
    this.category = category;
    this.image = image;
  }

  updateDetails(ideasData){

    if (ideasData.bonus != undefined) this.name = ideasData.bonus;
    if (ideasData.per_level != undefined) this.bonus_per_level = parseFloat(ideasData.per_level);
    if (ideasData.cost_per_level != undefined) this.cost_per_level = parseInt(ideasData.cost_per_level);
    if (ideasData.type != undefined) this.type = ideasData.type;
    if (ideasData.base_cost != undefined) this.base_cost = parseInt(ideasData.base_cost);
    if (ideasData.category != undefined) this.category = ideasData.category;
    if (ideasData.image != undefined) this.image = ideasData.name;
    if (ideasData.level != undefined && ideasData.level > 0) {
      this.level = ideasData.level;
    } else {
      this.level = 1;
    }
  }

  getCost(){
    var multiplier = 0;
    switch (this.id){
      case 0:
        multiplier = 2;
        break;
      case 1:
        multiplier = 2;
        break;
      case 2:
        multiplier = 2;
        break;
      case 3:
        multiplier = 1.8;
        break;
      case 4:
        multiplier = 1.6;
        break;
      case 5:
        multiplier = 1.4;
        break;
      case 6:
        multiplier = 1.2;
        break;
      case 7:
        multiplier = 1;
        break;
      case 8:
        multiplier = 1;
        break;
      case 9:
        multiplier = 1;
    }
    var level = this.level;
    var cost = this.base_cost;
    while (level > 1) {
      level -= 1;
      cost += this.cost_per_level * level;
    }
    return (cost * multiplier);
  }

  getBonus(){
    var bonus;
    if (this.type == "percentage"){
      if (this.bonus_per_level < 0){
        bonus = `${Math.floor(this.bonus_per_level * this.level)}%`;
      } else {
        bonus = `+${Math.floor(this.bonus_per_level * this.level)}%`;
      }
    } else if (this.type == "absolute"){
      if (this.bonus_per_level < 0){
        bonus = `${this.bonus_per_level * this.level}`;
      } else {
        bonus = `+${this.bonus_per_level * this.level}`;
      }
    } else {
      bonus = "yes"
    }
    
    return bonus;
  }

  updateLevel(num) {
    if (num > 0){
      this.level = num;
    }
  }
}

const IdeaSetContext = createContext();

export const useIdeaSetContext = () => useContext(IdeaSetContext);

export const IdeaSetProvider = ({children}) => {
    const [ideaSet, setIdeaSet] = useState([
      [new Idea(0, "Tradition 1", 1, 5, 3, "percentage", 0, "ADM", "unknown")],
      [new Idea(1, "Tradition 2", 1, 5, 3, "percentage", 0, "ADM", "unknown")],
      [new Idea(2, "Idea 1", 1, 5, 3, "percentage", 0, "ADM", "unknown")],
      [new Idea(3, "Idea 2", 1, 5, 3, "percentage", 0, "ADM", "unknown")],
      [new Idea(4, "Idea 3", 1, 5, 3, "percentage", 0, "ADM", "unknown")],
      [new Idea(5, "Idea 4", 1, 5, 3, "percentage", 0, "ADM", "unknown")],
      [new Idea(6, "Idea 5", 1, 5, 3, "percentage", 0, "ADM", "unknown")],
      [new Idea(7, "Idea 6", 1, 5, 3, "percentage", 0, "ADM", "unknown")],
      [new Idea(8, "Idea 7", 1, 5, 3, "percentage", 0, "ADM", "unknown")],
      [new Idea(9, "Ambition 1", 1, 5, 3, "percentage", 0, "ADM", "unknown")],
    ]);
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carregamento

    useEffect(() => {
      localStorage.setItem("ideaSet", JSON.stringify(ideaSet));
    }, [ideaSet]);

    const updateIdea = (id, updatedItem) => {
      setIdeaSet((prevList) =>
        prevList.map((item, index) => {
          // Item encontrado no IdeaSet
          if (index === (id)) {
            var idea = []
            // Se houverem mais itens armazenados que novos reseta tudo
            if (item.length > updatedItem.length){
              item = []
            }
            // Adicionar Items a lista 
            for(var i=0;i<updatedItem.length;i++){
              if (item[i] == undefined){
                item.push(new Idea(id, "placeholder", 1, 3, 5, "percentage", 3, "ADM", "default.png"))
              }
              idea = idea.concat(item[i])
              idea[i].updateDetails(updatedItem[i])
            }
            return idea;
          }
          return item;
        })
      );
    };

    const updateLevel = (id, num, selectedIdea) => {
      setIdeaSet((prevList) =>
        prevList.map((item, index) => {
          if (index === id) {
            const idea = item; // Pega a ideia na lista
            idea[selectedIdea].updateLevel(num); // Atualiza a ideia usando o método da classe
            
            return idea;
          }
          return item;
        })
      );
    }

    const getTotalCost = () => {
      var totalCost = 0;
      ideaSet.forEach(ideaSlot => {
        if (ideaSlot !== undefined){
          ideaSlot.forEach(idea => {
            if (idea != undefined){
              totalCost += idea.getCost()
            }
          })
        }
      })

      return totalCost;
    }

    const getPercentages = () => {
      var admLevels = 0;
      var dipLevels = 0;
      var milLevels = 0;
      ideaSet.map((ideaSlot)=>{
        ideaSlot.map((idea)=>{
          if (idea.category == "ADM"){
            admLevels++;
          }
          else if (idea.category == "DIP"){
            dipLevels++;
          }
          else{
            milLevels++;
          }
        })
      })

      var totalLevels = admLevels + dipLevels + milLevels;
      
      return ([admLevels/totalLevels * 100, dipLevels/totalLevels * 100, milLevels/totalLevels * 100])
    }

    const loadIdeas = (nationalIdeas) => {
      nationalIdeas.forEach((ideaSlot, index) => {
        updateIdea(index, ideaSlot)
      })
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("/api/getIdeas"); // Faz requisição para a API
            const data = await response.json();
            setIdeas(data);
          } catch (error) {
            console.error("Erro ao buscar o conjunto predeterminado:", error);
          } finally {
            setLoading(false); // Finaliza o carregamento
          }
        };
    
        fetchData();
      }, []);

    return (
        <IdeaSetContext.Provider value={{ideaSet, setIdeaSet, ideas, Idea, updateIdea, updateLevel, getTotalCost, getPercentages, loadIdeas}}>
            {children}
        </IdeaSetContext.Provider>
    );
}