'use client'

import IdeaSelector from "@/components/IdeaSelector";
import Preview from "@/components/Preview";
import TotalCost from "@/components/TotalCost";
import { IdeaSetProvider } from "@/context/IdeaSetContext";
import Header from "@/components/Header";
import { CountriesProvider } from "@/context/countriesContext";


export default function Home() {
  return (
    <div className="main">
      <CountriesProvider>
        <IdeaSetProvider>
          <div className="cabecalho">
            <Header/>
          </div>
          <div className="mainContainer">
            <div className="primaryContainer">
              <IdeaSelector/>
            </div>
            <div className="secondaryContainer">
              <Preview/>
              <TotalCost/>
            </div>
          </div>
        
        </IdeaSetProvider>
      </CountriesProvider>
    </div>
  );
}
