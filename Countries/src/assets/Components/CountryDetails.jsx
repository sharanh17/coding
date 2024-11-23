import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CountryDetails({ theme }) {
  const { ccn3 } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${ccn3}`
        );
        const data = await response.json();
        setCountry(data[0]);
      } catch (error) {
        console.error("Error fetching country:", error);
      }
    };

    fetchCountry();
  }, [ccn3]);

  if (!country) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center text-xl font-medium text-gray-700">
          Loading country details...
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 py-10 px-6 ${theme}`}>
      <button
        onClick={() => navigate(-1)}
        className={`mb-6 px-4 py-2 rounded-md  shadow-md  element-${theme}`}
      >
        Back
      </button>

      <div
        className={`flex flex-col items-center gap-10 bg-white p-8 rounded-lg shadow-lg ${theme}`}
      >
        <div
          className={`flex flex-col md:flex-row gap-10 items-center w-full ${theme}`}
        >
          <img
            src={country.flags.svg}
            alt={`${country.name.common} flag`}
            className="w-64 rounded-lg shadow-lg border border-gray-200"
          />

          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 w-full ${theme}`}
          >
            <div className={`space-y-4 ${theme}`}>
              <h1 className="text-3xl font-extrabold ">
                {country.name.common}
              </h1>
              <p>
                <strong className="font-semibold ">Population:</strong>{" "}
                {country.population.toLocaleString()}
              </p>
              <p>
                <strong className="font-semibold ">Native Name:</strong>{" "}
                {country.name.nativeName &&
                  Object.values(country.name.nativeName)[0].common}
              </p>
              <p>
                <strong className="font-semibold ">Region:</strong>{" "}
                {country.region}
              </p>
              <p>
                <strong className="font-semibold ">Sub Region:</strong>{" "}
                {country.subregion}
              </p>
              <p>
                <strong className="font-semibold ">Capital:</strong>{" "}
                {country.capital?.join(", ")}
              </p>
            </div>

            <div className="space-y-4">
              <p>
                <strong className="font-semibold ">Top Level Domain:</strong>{" "}
                {country.tld?.join(", ")}
              </p>
              <p>
                <strong className="font-semibold">Currencies:</strong>{" "}
                {country.currencies &&
                  Object.values(country.currencies)
                    .map((currency) => currency.name)
                    .join(", ")}
              </p>
              <p>
                <strong className="font-semibold ">Languages:</strong>{" "}
                {country.languages &&
                  Object.values(country.languages).join(", ")}
              </p>
            </div>
          </div>
        </div>
        {country.borders && country.borders.length > 0 && (
          <div className="w-full">
            <h2 className="text-2xl font-bold  mb-4">Border Countries:</h2>
            <div className="flex flex-wrap gap-3">
              {country.borders.map((border) => (
                <span
                  key={border}
                  className={`px-4 py-2 bg-blue-100 text-blue-800 rounded-full shadow-md text-sm font-medium element-${theme}`}
                >
                  {border}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
