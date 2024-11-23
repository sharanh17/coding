import { useState, useEffect } from "react";
import CountryCard from "./countryCard";
import FilterComponent from "./filter";
import { useNavigate } from "react-router-dom";

export default function FetchCountries({ theme }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [regions, setRegions] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllCountries = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        const uniqueRegions = Array.from(
          new Set(data.map((country) => country.region))
        );
        setRegions(uniqueRegions);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCountries();
  }, []);

  useEffect(() => {
    const fetchFilteredCountries = async () => {
      setLoading(true);

      try {
        let url = "https://restcountries.com/v3.1/all";
        if (selectedRegion && searchTerm) {
          const response = await fetch(
            `https://restcountries.com/v3.1/region/${selectedRegion}`
          );
          const regionData = await response.json();

          const filteredData = regionData.filter((country) =>
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setCountries(filteredData);
        } else if (selectedRegion) {
          url = `https://restcountries.com/v3.1/region/${selectedRegion}`;
          const response = await fetch(url);
          const data = await response.json();
          setCountries(data);
        } else if (searchTerm) {
          url = `https://restcountries.com/v3.1/name/${searchTerm}`;
          const response = await fetch(url);

          if (response.ok) {
            const data = await response.json();
            setCountries(data);
          } else {
            setCountries([]);
          }
        } else {
          const response = await fetch(url);
          const data = await response.json();
          setCountries(data);
        }
      } catch (error) {
        console.error("Error fetching filtered countries:", error);
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredCountries();
  }, [searchTerm, selectedRegion]);

  return (
    <div className={`${theme} px-6`}>
      <FilterComponent
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        regions={regions}
        theme={theme}
      />

      {loading && <div className="text-center text-lg">Loading...</div>}

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {countries.map((country) => (
            <div
              key={country.cca3}
              onClick={() => navigate(`/country/${country.ccn3}`)}
              className="cursor-pointer"
            >
              <CountryCard
                flag={country.flags.svg}
                name={country.name.common}
                population={country.population}
                region={country.region}
                capital={country.capital ? country.capital[0] : null}
                theme={theme}
              />
            </div>
          ))}
        </div>
      )}

      {!loading && countries.length === 0 && (
        <div className="text-center text-lg">No countries found</div>
      )}
    </div>
  );
}
