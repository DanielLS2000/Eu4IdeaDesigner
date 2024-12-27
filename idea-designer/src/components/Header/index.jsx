import { useContext, useState } from 'react';
import './Header.css'
import { useCountriesContext } from '@/context/countriesContext';
import NationSelector from '../NationSelector';
import { useIdeaSetContext } from '@/context/IdeaSetContext';
import NationLoader from '../NationLoader';

const Header = () => {
    const {countries, addCountry, removeCountry, countriesList} = useCountriesContext();
    const {loadIdeas} = useIdeaSetContext();
    const [dropdownVisible, setDropdownVisible] = useState(false)


    const countryNames = Object.keys(countriesList)
    
    const selectedCountries = countries.reduce((result, key) => {
        if (key in countriesList) {
          result[key] = countriesList[key];
        }
        return result;
      }, {});

    return (
        <div className='header'>
            <h1>My Ideas</h1>

            <div>
                <ul>
                    {countries.map((country, index) => (
                        <a
                        key={index}
                        className='country'
                        onClick={() => {
                            removeCountry(country);
                        }}
                        >
                        {country}
                        </a>
                    ))}
                </ul>
            </div>
            <div className='left-menu'>
                <NationLoader
                    options={selectedCountries}
                    onSelect={loadIdeas}
                    name={"Nation"}
                />
            </div>
            <div className='left-menu'>
                <NationSelector 
                    options={countryNames} 
                    onSelect={addCountry} 
                    name={"Nations"}/>
            </div>
        </div>
    );
}

export default Header;