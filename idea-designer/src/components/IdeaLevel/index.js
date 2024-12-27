import { useIdeaSetContext } from '@/context/IdeaSetContext'
import './IdeaLevel.css'

const IdeaLevel = ({id, idea, selectedIdea}) => {
    const {updateLevel} = useIdeaSetContext();

    const levelUp = () => {
        updateLevel(id, (idea[selectedIdea].level + 1), selectedIdea)
    }

    const levelDown = () => {
        updateLevel(id, (idea[selectedIdea].level -1), selectedIdea)
    }
    
    return (
        <div className='ideaLevel'>
            <button onClick={(levelDown)}>
                <img src='./images/button_prev.png' alt='prev'/>
            </button>

            <div>
                {idea[selectedIdea].level.toFixed(0)}
            </div>
            
            <button onClick={levelUp}>
                <img src='./images/button_next.png' alt='next'/>
            </button>
        </div>
    )
}

export default IdeaLevel
