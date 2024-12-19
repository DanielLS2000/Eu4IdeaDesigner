import IdeaLevel from '../IdeaLevel';
import './IdeaRow.css'
import '@/classes/Idea'
const IdeaRow = (id) => {

    return (
        <div className='ideaRow'>
            <div className='item'>
                <a>{}</a>
            </div>

            <div className='item'>
                <IdeaLevel/>
            </div>

            <div className='item'>
                {}
            </div>

            <div className='item'>
                {}
            </div>

            <div className='item'>
                <button>
                    Add Idea
                </button>
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