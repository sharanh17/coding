export default function CountryCard({
  flag,
  name,
  population,
  region,
  capital,
  theme
}) {
  return (
    <div
      className={` rounded-lg shadow-lg overflow-hidden element-${theme}`}
    >
    
      <img
        src={flag}
        alt={`${name} flag`}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        <h2 className="text-center font-bold text-lg mb-2">{name}</h2>
        <p className="text-sm ">
          <span className="font-semibold">Population:</span>{" "}
          {population.toLocaleString()}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Region:</span> {region}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Capital:</span> {capital || "N/A"}
        </p>
      </div>
    </div>
  );
}
