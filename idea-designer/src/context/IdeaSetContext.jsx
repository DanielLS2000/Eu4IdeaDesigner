import { createContext, useContext, useEffect, useState } from "react";

class IdeaSlot {
  constructor(id) {
    this.id = id
    this.ideas = []
  }
}

class Idea {
  constructor(id, name, bonus_per_level, cost_per_level, type, base_cost, category, image) {
    this.id = id;
    this.name = name;
    this.bonus_per_level = bonus_per_level;
    this.cost_per_level = cost_per_level;
    this.type = type;
    this.base_cost = base_cost;
    this.category = category;
    this.image = image;
  }
}
     



const IdeaSetContext = createContext();

export const useIdeaSetContext = () => useContext(IdeaSetContext);

export const IdeaSetProvider = ({children}) => {
    const [ideaSet, setIdeaSet] = useState([
      [{
        "id": 0,
        "name": "Tradition 1",
        "cost": 40,
        "bonus": 10,
        "level": 1
      }],
      [{
        "id": 1,
        "name": "Tradition 2",
        "cost": 40,
        "bonus": 10,
        "level": 1
      }],
      [{
        "id": 2,
        "name": "Idea 1",
        "cost": 40,
        "bonus": 10,
        "level": 1
      }],
      [{
        "id": 3,
        "name": "Ideia 2",
        "cost": 40,
        "bonus": 10,
        "level": 1
      }],
      [{
        "id": 4,
        "name": "Ideia 3",
        "cost": 40,
        "bonus": 10,
        "level": 1
      }],
      [{
        "id": 5,
        "name": "Ideia 4",
        "cost": 40,
        "bonus": 10,
        "level": 1
      }],
      [{
        "id": 6,
        "name": "Ideia 5",
        "cost": 40,
        "bonus": 10,
        "level": 1
      }],
      [{
        "id": 7,
        "name": "Ideia 6",
        "cost": 40,
        "bonus": 10,
        "level": 1
      }],
      [{
        "id": 8,
        "name": "Ideia 7",
        "cost": 40,
        "bonus": 10,
        "level": 1
      }], 
      [{
        "id": 9,
        "name": "Ambition",
        "cost": 40,
        "bonus": 10,
        "level": 1
      }]
    ]);
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carregamento

    const updateIdea = (id, updatedItem) => {
      updatedItem = [updatedItem]
      setIdeaSet((prevList) =>
        prevList.map((item, i) => (i === id ? { ...item, ...updatedItem } : item))
      );
    };

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
        <IdeaSetContext.Provider value={{ideaSet, ideas, updateIdea}}>
            {children}
        </IdeaSetContext.Provider>
    );
}