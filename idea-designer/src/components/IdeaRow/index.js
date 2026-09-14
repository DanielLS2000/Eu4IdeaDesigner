import { useIdeaSetContext } from '@/context/IdeaSetContext';
import IdeaLevel from '../IdeaLevel';
import { useEffect, useState } from 'react';
import { useCountriesContext } from '@/context/countriesContext';
import DropdownMenu from '../DropdownMenu';
import IdeaSlotMenu from '../IdeaSlotMenu';

const IdeaRow = ({id, idea}) => {
    const {ideaSet, ideas, updateIdea} = useIdeaSetContext();
    const {countries, countriesList} = useCountriesContext();
    const [selectedIdea, setSelectedIdea] = useState(0);

    // Avaliable ideas
    var availableIdeas = [];
    countries.map((tag) => {
        var traditions = Object.keys(countriesList[tag].slot0);
        traditions = traditions.map((availableIdea) => {
            const foundIdea = ideas.find(obj => obj.name === availableIdea);
            if (!foundIdea) return null;
            return [[foundIdea.bonus, availableIdea, foundIdea.name]];
        }).filter(Boolean); 
        availableIdeas = availableIdeas.concat(traditions)
    });

    for (var i=2; i<10;i++){
        if (id >= i){
            countries.map((tag) => {
                var dummies = Object.keys(countriesList[tag][`slot${i - 1}`]);
                dummies = dummies.map((dummy) => {
                    const foundIdea = ideas.find(obj => obj.name === dummy);
                    if (!foundIdea) return null;
                    return [foundIdea.bonus, dummy, foundIdea.name];
                }).filter(Boolean); 
                availableIdeas = availableIdeas.concat([dummies])
            })
        }
    }

    var filteredIdeas = availableIdeas.map((availableIdea) => {
        var alreadySelected = false;
        availableIdea.forEach(item=> {
            for(var i=0;i<10;i++){
                for(var j=0; j<ideaSet[i].length;j++){
                    if(ideaSet[i][j].name === item[0]){
                        alreadySelected = true;
                    }
                }
            }
        });
        if (!alreadySelected) return availableIdea
    });

    filteredIdeas = filteredIdeas.filter((el) => el !== undefined)

    const selectIdea = (item) => {
        var filteredData = [];
        for (var i=0;i<item.length;i++){
            filteredData = filteredData.concat(ideas.filter(obj => obj.name == item[i][1]))
        }
        updateIdea(id, filteredData);
        setSelectedIdea(0);
    }

    const removeIdea = () => {
        var data;
        if (id-1 < 1) {
            data = [{"bonus": `Tradition ${id+1}`, "per_level": "+5", "cost_per_level": 3.0, "type": "percentage", "base_cost": "0", "category": "ADM", "image": "unknown.png", "name": "unknown"}]
        } else if (id < 9){
            data = [{"bonus": `Idea ${id-1}`, "per_level": "+5", "cost_per_level": 3.0, "type": "percentage", "base_cost": "0", "category": "ADM", "image": "unknown.png", "name": "unknown"}]
        } else{
            data = [{"bonus": "Ambition", "per_level": "+5", "cost_per_level": 3.0, "type": "percentage", "base_cost": "0", "category": "ADM", "image": "unknown.png", "name": "unknown"}]
        }
        updateIdea(id, data)
    }

    return (
        <div className="grid grid-cols-[3fr_1fr_1.5fr_1fr_2.5fr_0.5fr] gap-x-3 items-center px-3 py-2 bg-[#252f38]/60 hover:bg-[#2d3843] border-b border-[#3e4b59] transition-colors">
            
            <div className="flex items-center">
                <IdeaSlotMenu options={idea} onSelect={setSelectedIdea} selectedIdea={selectedIdea} />
            </div>

            <div className="flex justify-center items-center">
                <IdeaLevel id={id} idea={idea} selectedIdea={selectedIdea}/>
            </div>

            <div className="text-center font-sans font-bold text-[#f4ecd8] text-[14px]">
                {idea[selectedIdea]?.getBonus ? idea[selectedIdea].getBonus() : ""}
            </div>

            <div className="text-center font-sans font-bold text-[#f4ecd8] text-[14px]">
                {idea[selectedIdea]?.getCost ? idea[selectedIdea].getCost().toFixed(0) : "0"}
            </div>

            <div className="flex justify-end w-full">
                <DropdownMenu options={filteredIdeas} onSelect={selectIdea} name={"Idea"}/>
            </div>

            <div className="flex justify-center">
                <button
                    onClick={() => { setSelectedIdea(0); removeIdea(); }}
                    className="text-[#a68652] hover:text-[#c43c3c] font-bold text-[18px] transition-colors"
                >
                    ✕
                </button>
            </div>
        </div>
    )
}

export default IdeaRow;
