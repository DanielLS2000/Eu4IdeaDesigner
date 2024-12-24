import { useIdeaSetContext } from '@/context/IdeaSetContext'
import './IdeaLevel.css'

const IdeaLevel = ({id, idea}) => {
    const {updateIdea} = useIdeaSetContext();

    const levelUp = () => {
        const updatedIdea = {
            "id": idea[0].id,
            "name": idea[0].name,
            "cost": idea[0].cost,
            "bonus": idea[0].bonus,
            "level": idea[0].level + 1
        }
        updateIdea(id, updatedIdea)
    }

    const levelDown = () => {
        const updatedIdea = {
            "id": idea[0].id,
            "name": idea[0].name,
            "cost": idea[0].cost,
            "bonus": idea[0].bonus,
            "level": idea[0].level - 1
        }
        updateIdea(id, updatedIdea)
    }
    
    return (
        <div className='ideaLevel'>
            <button onClick={levelDown}>
                <img src='./images/button_prev.png' alt='prev'/>
            </button>

            <div>
                {idea[0].level}
            </div>
            
            <button onClick={levelUp}>
                <img src='./images/button_next.png' alt='next'/>
            </button>
        </div>
    )
}

export default IdeaLevel
