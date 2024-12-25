import { useIdeaSetContext } from '@/context/IdeaSetContext';
import IdeaLevel from '../IdeaLevel';
import './IdeaRow.css'
import { useState } from 'react';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { useCountriesContext } from '@/context/countriesContext';
import DropdownMenu from '../DropdownMenu';
import IdeaSlotMenu from '../IdeaSlotMenu';
const IdeaRow = ({id, idea}) => {
    const {ideaSet, ideas, updateIdea} = useIdeaSetContext();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const {countries, countriesList} = useCountriesContext();
    const [selectedIdea, setSelectedIdea] = useState([0]);

    // Avaliable ideas
    var availableIdeas = [];
    // Traditions are interchangeable
    countries.map((tag) => {
        var traditions = Object.keys(countriesList[tag].slot0);
        traditions = traditions.map((availableIdea) => {
            // Debug Seleciona país e não acha ideias resultando em crash
            // console.log([ideas.filter(obj => obj.name == availableIdea)[0]])
            return [[ideas.filter(obj => obj.name == availableIdea)[0].bonus, availableIdea]]
        })
        availableIdeas = availableIdeas.concat(traditions)
    });

    // Varrendo os paises selecionados
    for (var i=2; i<10;i++){
        if (id >= i){
            countries.map((tag) => {
                //Pegando Idea x do país
                var dummies = Object.keys(countriesList[tag][`slot${i - 1}`]);
                // Buscando o nome das ideias na lista de ideias
                dummies = dummies.map((dummy) => {
                    return [ideas.filter(obj => obj.name == dummy)[0].bonus, dummy]
                })
                
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

        if (!alreadySelected){
            return availableIdea
        }
    });

    filteredIdeas = filteredIdeas.filter((el) => el !== undefined)

    const selectIdea = (item) => {
        // Pegando so dados da ideia
        var filteredData = [];
        for (i=0;i<item.length;i++){
            filteredData = filteredData.concat(ideas.filter(obj => obj.name == item[i][1]))
        }
        updateIdea(id, filteredData);
        setSelectedIdea(0);
    }

    const removeIdea = () => {
        // Criando dados vazios
        const data = [{
            "bonus": "Removed Idea",
            "per_level": "+5",
            "cost_per_level": 3.0,
            "type": "percentage",
            "base_cost": "0",
            "category": "ADM",
            "image": "default_idea.png",
            "name": "default_idea"
        }]

        updateIdea(id, data)
    }

    return (
        <div className='ideaRow'>
            <div className='item'>
                
                <IdeaSlotMenu 
                    options={idea}
                    onSelect={setSelectedIdea}
                    selectedIdea={selectedIdea}
                />
            </div>

            <div className='item'>
                <IdeaLevel id={id} idea={idea} selectedIdea={selectedIdea}/>
            </div>

            <div className='item'>
                {idea[selectedIdea].getBonus()}
            </div>

            <div className='item'>
                {idea[selectedIdea].getCost()}
            </div>

            <div className='item'>
                <DropdownMenu options={filteredIdeas} onSelect={selectIdea} name={"Ideas"}/>
            </div>

            <div className='item'>
                <button
                    onClick={() => {
                        setSelectedIdea(0);
                        removeIdea()
                    }}>
                    Remove Idea
                </button>
            </div>
        </div>
    )
}

export default IdeaRow;