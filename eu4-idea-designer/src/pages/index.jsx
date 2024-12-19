import IdeaSelector from "@/components/IdeaSelector";
import Preview from "@/components/Preview";
import TotalCost from "@/components/TotalCost";
import './index.css'


export default function App() {


  return (
    <div className="App bg-blue-950">
      <h1>My Ideas</h1>
      <div className="mainContainer">
        <IdeaSelector/>
        
        <div className="secondaryContainer">
          <Preview/>
          <TotalCost/>
        </div>
      
      </div>
    </div>
  );
}
