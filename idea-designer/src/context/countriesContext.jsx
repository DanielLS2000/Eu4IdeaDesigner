import { createContext, useContext, useEffect, useState } from "react";

const CountriesContext = createContext();

export const useCountriesContext = () => useContext(CountriesContext);

export const CountriesProvider = ({children}) => {
    const [countries, setCountries] = useState([]);
    const [countriesList, setCountriesList] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await fetch("/api/getCountries"); // Faz requisição para a API
            const data = await response.json();
            setCountriesList(data);
            } catch (error) {
            console.error("Erro ao buscar o conjunto predeterminado:", error);
            } finally {
            setLoading(false); // Finaliza o carregamento
            }
        };
    
        fetchData();
    }, []);

    // Adicionar país
    const addCountry = (country) => {
        setCountries((prevCountries) => {
            if (prevCountries.length < 4 && !(prevCountries.includes(country))) {
                return [...prevCountries, country]
            } else{
                return [...prevCountries]
            }
        })
    }

    const removeCountry = (country) => {
        setCountries((prevCountries) => prevCountries.filter((item) => item !== country));
    }

    return(
        <CountriesContext.Provider value={{countries, addCountry, removeCountry, countriesList}}>
            {children}
        </CountriesContext.Provider>
    );
}