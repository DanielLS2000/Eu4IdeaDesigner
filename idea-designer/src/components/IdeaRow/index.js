import { useIdeaSetContext } from '@/context/IdeaSetContext';
import IdeaLevel from '../IdeaLevel';
import './IdeaRow.css'
import { useState } from 'react';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
const IdeaRow = ({id, ideaSet, idea}) => {
    const {ideas, updateIdea} = useIdeaSetContext();
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [query, setQuery] = useState('');
    const [selectedIdea, setSelectedIdea] = useState({})

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };

    var filterIdeas;

    return (
        <div className='ideaRow'>
            <div className='item'>
                <a>{idea[0].name}</a>
            </div>

            <div className='item'>
                <IdeaLevel id={id} idea={idea} />
            </div>

            <div className='item'>
                {idea[0].bonus}
            </div>

            <div className='item'>
                {idea[0].cost}
            </div>

            <div className='item'>
                <button onClick={toggleDropdown}>
                    Select Idea
                </button>
                {dropdownVisible && (
                    <ul style={{ listStyleType: "none", marginTop: "10px", padding: "0" }}>
                    {ideas.map((item, index) => (
                        <li
                        key={index}
                        style={{
                            margin: "5px 0",
                            padding: "5px",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            updateIdea(id, item);
                            setDropdownVisible(false);
                            console.log(idea)
                        }}
                        >
                        {item.name} {item.bonus}
                        </li>
                    ))}
                    </ul>
                )}
            </div>

            <div className='item'>
                <button>
                    Remove Idea
                </button>
            </div>
        </div>
    )
}

export default IdeaRow;