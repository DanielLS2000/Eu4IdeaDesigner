import './IdeaLevel.css'

const IdeaLevel = () => {
    
    return (
        <div className='ideaLevel'>
            <button onClick={console.log("Down")}>
                <img src='./images/button_prev.png' alt='prev'/>
            </button>

            <div>
                {}
            </div>
            
            <button onClick={console.log("Up")}>
                <img src='./images/button_next.png' alt='next'/>
            </button>
        </div>
    )
}

export default IdeaLevel
