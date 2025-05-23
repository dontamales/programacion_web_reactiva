import { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import CountryDetails from "./CountryDetails";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let url = "https://restcountries.com/v3.1/";
    if (region !== "all") url += `region/${region}`;
    else if (search) url += `name/${search}`;
    else url += "all";
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountries(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, [search, region]);

  return (
    <div className="container">
      <h1>Explorador de Países</h1>
      <div className="controls">
        <input
          type="text"
          style={{ width: "100%" }}
          placeholder="Buscar país..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="all">Todas las regiones</option>
          <option value="africa">África</option>
          <option value="americas">Américas</option>
          <option value="asia">Asia</option>
          <option value="europe">Europa</option>
          <option value="oceania">Oceanía</option>
        </select>
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : selected ? (
        <CountryDetails country={selected} onBack={() => setSelected(null)} />
      ) : (
        <div className="countries-list">
          {countries.map((c) => (
            <CountryCard key={c.cca3} country={c} onClick={() => setSelected(c)} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
