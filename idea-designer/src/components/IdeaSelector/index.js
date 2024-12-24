import { useIdeaSetContext } from '@/context/IdeaSetContext'
import IdeaRow from '../IdeaRow'
import './IdeaSelector.css'

const IdeaSelector = () => {
    const {ideaSet} = useIdeaSetContext();

    const traditions = ideaSet.slice(0,2);
    const ideas = ideaSet.slice(2,9);
    const ambition = ideaSet.slice(9,10);

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
                    {traditions.map((idea, index) => (
                        <IdeaRow idea={idea} key={index} id={index}/>
                    ))}
                </div>
            </div>

            <div>
                {/* Title */}
                <div className='titles'>
                    <h2>Ideas</h2>
                </div>
                {/* Ideas */}
                {/* <div className='ideaList'>
                    {ideaSet.map((idea, index) => (
                        <IdeaRow idea={idea} key={index} id={index}/>
                    ))}
                </div>
            </div>
            <div>
                {/* Title */}
                <div className='titles'>
                    <h2>Ambition</h2>
                </div>
                {/* Ambition */}
                {/* <div className='ideaList'>
                    {ideaSet.map((idea, index) => (
                        <IdeaRow idea={idea} key={index} id={index}/>
                    ))}
                </div> */}
            </div>
        </div>
    )
}

export default IdeaSelector