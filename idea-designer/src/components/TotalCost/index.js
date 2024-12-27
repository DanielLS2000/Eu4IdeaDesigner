import { useIdeaSetContext } from '@/context/IdeaSetContext';
import './TotalCost.css'

const TotalCost = () => {
    const {getTotalCost, getPercentages} = useIdeaSetContext();

    const percentages = getPercentages();
    return (
        <div className='totalCost'>
            <div className='line'>
                <h2></h2>
                <h2>ADM</h2>
                <h2>DIP</h2>
                <h2>MIL</h2>
                <h2>Total</h2>
            </div>
            <div className='line'>
                <h2>Cost</h2>
                <h2>{percentages[0].toFixed(2)}%</h2>
                <h2>{percentages[1].toFixed(2)}%</h2>
                <h2>{percentages[2].toFixed(2)}%</h2>
                <h2>{getTotalCost().toFixed(0)}</h2>
            </div>
        </div>
    )
}

export default TotalCost;