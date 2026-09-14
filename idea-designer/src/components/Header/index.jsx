import { useState } from 'react';
import { useCountriesContext } from '@/context/countriesContext';
import { useIdeaSetContext } from '@/context/IdeaSetContext';
import NationSelector from '../NationSelector';
import NationLoader from '../NationLoader';
import ExportIdeasButton from '../ExportIdeasButton';

const Header = () => {
    const { countries, removeCountry, countriesList, addCountry } = useCountriesContext();
    const { loadIdeas } = useIdeaSetContext();

    const countryNames = Object.keys(countriesList);
    
    const selectedCountries = countries.reduce((result, key) => {
        if (key in countriesList) {
          result[key] = countriesList[key];
        }
        return result;
    }, {});

    return (
        <header className="relative w-full flex items-center justify-between px-4 py-3 border-b border-[#1b222a] shadow-md">
        
            {/* 1. TITLE PLATE ("My Ideas") */}
            <div className="relative flex items-center justify-center min-w-[200px] h-[36px] bg-[#4a1c1c] border-[2px] border-[#9c7b4a] rounded-sm shadow-[inset_0_0_10px_rgba(0,0,0,0.8),0_2px_4px_rgba(0,0,0,0.5)]">
                <h1 className="font-serif text-[#f4ecd8] font-bold text-lg drop-shadow-[1px_2px_1px_rgba(0,0,0,0.8)] tracking-wide">
                    My Ideas
                </h1>
                {/* Inner Bevel Effect */}
                <div className="absolute inset-0 border border-[#b89562] opacity-30 pointer-events-none rounded-sm"></div>
            </div>

            {/* 2. COUNTRY HISTORY */}
            <div className="flex-1 flex justify-center px-4">
                <ul className="flex items-center gap-3">
                    {countries.map((country, index) => (
                        <li key={index}>
                            <button
                                onClick={() => removeCountry(country)}
                                className="group relative flex items-center gap-2 px-4 py-1.5 font-serif text-[14px] text-[#332211] font-bold bg-[#d9c49c] border border-[#8c6b3e] rounded-sm shadow-[0_3px_6px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.4)] hover:bg-[#e6d6b8] hover:-translate-y-0.5 hover:shadow-[0_5px_10px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.6)] active:translate-y-px transition-all duration-200 cursor-pointer overflow-hidden"
                            >
                                {/* Borda interna clara para dar relevo ao pergaminho */}
                                <div className="absolute inset-0 border border-[#e8dcc4] pointer-events-none rounded-sm"></div>
                                
                                <span className="relative z-10 drop-shadow-[0_1px_0_rgba(255,255,255,0.2)]">
                                    {country}
                                </span>
                                
                                {/* Ícone de fechar que ganha destaque no hover */}
                                <span className="relative z-10 text-[#a68652] group-hover:text-[#a02c2c] transition-colors duration-200 text-[10px] font-black drop-shadow-sm mt-0.5">
                                    ✕
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* 3. ACTION BUTTONS */}
            <div className="flex items-center gap-3 relative">
                <NationLoader
                    options={selectedCountries}
                    onSelect={loadIdeas}
                    name={"Nation Ideas"}
                />
                
                <NationSelector 
                    options={countryNames} 
                    onSelect={addCountry} 
                    name={"Nations"}
                />

                <ExportIdeasButton />
            </div>
        </header>
    );
}

export default Header;
