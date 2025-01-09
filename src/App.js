import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(data => {
        setCountries(data);
        setFilteredCountries(data);
      });
  }, []);

  const continentChange = (event) => {
    const continent = event.target.value;
    setSelectedContinent(continent);
    const filtered = countries.filter(country => {
      if (continent === '') return true;
      if (continent === 'Afrika') return country.region === 'Africa';
      if (continent === 'Avropa') return country.region === 'Europe';
      if (continent === 'Asiya') return country.region === 'Asia';
      if (continent === 'Avstraliya') return country.region === 'Oceania';
      if (continent === 'Simali Amerika') return country.region === 'Americas'  && country.subregion === 'North America';
      if (continent === 'Cenubi Amerika') return country.region === 'Americas'  && country.subregion === 'South America';
      return false;
    });
    setFilteredCountries(filtered);
  };

  return (
    <div>
      <select name='' onChange={continentChange}>
        <option value="">Select Continent</option>
        <option value="Avropa">Avropa</option>
        <option value="Asiya">Asiya</option>
        <option value="Afrika">Afrika</option>
        <option value="Avstraliya">Avstraliya</option>
        <option value="Simali Amerika">Simali Amerika</option>
        <option value="Cenubi Amerika">Cenubi Amerika</option>
      </select>
      
      <div className='all'>
        {filteredCountries.map(country => (
          <div key={country.name.common} className='box'>
            <img src={country.flags.svg} alt={country.name.common} />
            <h1>{country.name.official}</h1>
            <h4>{country.capital}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

