import "./CountryDetails.css";

function CountryDetails({ country, onBack }) {
  return (
    <div className="country-details">
      <button onClick={onBack}>Volver</button>
      <h2>{country.name.common}</h2>
      <img src={country.flags.svg} alt={country.name.common} />
      <p><b>Capital:</b> {country.capital?.[0]}</p>
      <p><b>Región:</b> {country.region}</p>
      <p><b>Subregión:</b> {country.subregion}</p>
      <p><b>Población:</b> {country.population.toLocaleString()}</p>
      <p><b>Área:</b> {country.area.toLocaleString()} km²</p>
      <p><b>Idiomas:</b> {country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
      <p><b>Monedas:</b> {country.currencies ? Object.values(country.currencies).map(c => c.name).join(", ") : "N/A"}</p>
    </div>
  );
}

export default CountryDetails;