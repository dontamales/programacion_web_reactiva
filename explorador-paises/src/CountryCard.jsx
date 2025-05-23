import "./CountryCard.css";

function CountryCard({ country, onClick }) {
  return (
    <div className="country-card" onClick={onClick}>
      <img src={country.flags.svg} alt={country.name.common} />
      <h3>{country.name.common}</h3>
      <p>Región: {country.region}</p>
      <p>Población: {country.population.toLocaleString()}</p>
    </div>
  );
}

export default CountryCard;