import { useContext, useState } from 'react';
import './Header.css'
import { useCountriesContext } from '@/context/countriesContext';

const Header = () => {
    const {countries, addCountry, removeCountry, countriesList} = useCountriesContext();
    const [dropdownVisible, setDropdownVisible] = useState(false)
    
    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };

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
                        {country} Ideas
                        </a>
                    ))}
                </ul>
            </div>
            <div className=''>
                <button onClick={toggleDropdown}>
                    Select Nations
                </button>
                {dropdownVisible && (
                    <ul style={{ listStyleType: "none", marginTop: "10px", padding: "0" }}>
                    {countryNames.map((country, index) => (
                        <li
                        key={index}
                        style={{
                            margin: "5px 0",
                            padding: "5px",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            addCountry(country);
                            setDropdownVisible(false);
                        }}
                        >
                        {country} Ideas
                        </li>
                    ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Header;