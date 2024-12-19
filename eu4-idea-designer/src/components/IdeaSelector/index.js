import IdeaRow from '../IdeaRow'
import './IdeaSelector.css'

const IdeaSelector = () => {
    return (
        <div className='ideaSelector'>
            <div>
                {/* Titles */}
                <div className='titles'>
                    <h2 className='item'>Traditions</h2>
                    <h2 className='item'>Level</h2>
                    <h2 className='item'>Bonus</h2>
                    <h2 className='item'>Custo</h2>
                </div>
                {/* Traditions */}
                <div className='ideaList'>
                    {[1, 2].map((id) => (
                        <IdeaRow id={id}/>
                    ))}
                </div>
            </div>

            <div>
                {/* Title */}
                <div className='titles'>
                    <h2>Ideas</h2>
                </div>
                {/* Ideas */}
                <div className='ideaList'>
                    {[3, 4, 5, 6, 7, 8, 9].map((id) => (
                        <IdeaRow id={id}/>
                    ))}
                </div>
            </div>
            <div>
                {/* Title */}
                <div className='titles'>
                    <h2>Ambition</h2>
                </div>
                {/* Ambition */}
                <div className='ideaList'>
                    {[10].map((id) => (
                        <IdeaRow id={id}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default IdeaSelector