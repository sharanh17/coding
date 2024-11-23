export default function FilterComponent({
  searchTerm,
  setSearchTerm,
  selectedRegion,
  setSelectedRegion,
  regions,
  theme,
}) {
  return (
    <div
      className={`flex flex-col md:flex-row  ${theme} justify-between items-center gap-4 mb-6`}
    >
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`border  p-2 rounded w-full md:w-1/2  element-${theme}`}
      />

      <select
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
        className={`border p-2 rounded w-full md:w-1/4  element-${theme} `}
      >
        <option value="">Filter by Region</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}
