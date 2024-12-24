'use client'

import Image from "next/image";
import IdeaSelector from "@/components/IdeaSelector";
import Preview from "@/components/Preview";
import TotalCost from "@/components/TotalCost";
import { IdeaSetProvider } from "@/context/IdeaSetContext";
import Header from "@/components/Header";
import { CountriesProvider } from "@/context/countriesContext";


export default function Home() {
  return (
    <div className="">
      <CountriesProvider>
        <IdeaSetProvider>
          <Header/>
          <div className="mainContainer">
            <IdeaSelector/>
          </div>
          {/* <div className="mainContainer">
              <Preview/>
              <TotalCost/>
          </div> */}
        </IdeaSetProvider>
      </CountriesProvider>
    </div>
  );
}
