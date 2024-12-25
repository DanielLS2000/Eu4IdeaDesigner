import { useContext, useState } from 'react';
import './Header.css'
import { useCountriesContext } from '@/context/countriesContext';
import NationSelector from '../NationSelector';

const Header = () => {
    const {countries, addCountry, removeCountry, countriesList} = useCountriesContext();
    const [dropdownVisible, setDropdownVisible] = useState(false)


    const countryNames = Object.keys(countriesList)


    return (
        <div className='header'>
            <h1>My Ideas</h1>


            <div className=''>
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
            <div className='item'>
                <NationSelector 
                    options={countryNames} 
                    onSelect={addCountry} 
                    name={"Nations"}/>
            </div>
        </div>
    );
}

export default Header;