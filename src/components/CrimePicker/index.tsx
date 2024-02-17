import React, { useState } from 'react';
import './CrimePicker.css';

export default function CrimePicker({ onCrimeYearChange }) {
  const [selectedCategories, setSelectedCategories] = useState([]);  // Estado para las categorías de crimen seleccionadas
  const [selectedCrimes, setSelectedCrimes] = useState([]);  // Estado para los tipos de crimen seleccionados
  const [selectedYear, setSelectedYear] = useState('');  // Estado para el año seleccionado
  const [selectedMonth, setSelectedMonth] = useState('');  // Estado para el año seleccionado
  const [selectedDay, setSelectedDay] = useState('');  // Estado para el año seleccionado
  const [selectedSamples, setSelectedSamples] = useState('');  // Estado para el año seleccionado
  const [selectedCommunityArea, setSelectedCommunityArea] = useState('');  // Estado para el año seleccionado


  const [crimesByCategory, setCrimesByCategory] = useState({
    Violencia: ['Kidnapping', 'Intimidation', 'Battery', 'Assault', 'Homicide'],
    Personas: ['HumanTrafficking', 'OffenseInvolvingChildren', 'InterferenceWithPublicOfficer'],
    Fraude: ['Gambling', 'DeceptivePractice'],
    Sexual: ['SexOffence', 'Stalking', 'CriminalSexualAssault'],
    Violaciones: ['PublicPeaceViolation', 'LiquorLawViolation', 'Weapons Violation', 'ConsealedCarryLicenseViolation'],
    Narcoticos: ['Narcotics', 'OtherNarcoticViolations'],
    Propiedad: ['Theft', 'Arson', 'VehicleTheft', 'Burglary', 'CriminalTrespass', 'CriminalDamage'],
    InmoralidadPublica: ['Obcenity', 'PublicIndecency', 'Prostitution'],
  });

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter((c) => c !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  };

  const handleCrimeChange = (e) => {
    const crime = e.target.value;
    setSelectedCrimes((prevSelectedCrimes) => {
      if (prevSelectedCrimes.includes(crime)) {
        return prevSelectedCrimes.filter((c) => c !== crime);
      } else {
        return [...prevSelectedCrimes, crime];
      }
    });
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const handleCommunityAreaChange = (e) => {
    setSelectedCommunityArea(e.target.value);
  };

  const handleMin_SamplesChange = (e) => {
    console.log('Nuevo valor de selectedSamples:', e.target.value);
    setSelectedSamples(e.target.value);
  };

  const handleClearButtonClick = () => {
    setSelectedCategories([]);
    setSelectedCrimes([]);
    setSelectedYear('');
    setSelectedMonth('');
    setSelectedDay('');
    setSelectedCommunityArea('');
    setSelectedSamples('');
    // Puedes añadir más campos según sea necesario
  };

  const handleButtonClick = () => {
    if (selectedCategories.length > 0 && selectedYear) {
      // Verificar si se han seleccionado mes y día
      if (selectedMonth !== '' || selectedDay !== '' || selectedCommunityArea !== '') {
        onCrimeYearChange(selectedCategories, selectedCrimes, selectedYear, selectedMonth, selectedDay, selectedCommunityArea);
      } else {
        onCrimeYearChange(selectedCategories, selectedCrimes, selectedYear, selectedSamples);
      }
    } else {
      console.error('Por favor, selecciona al menos una categoría, el año y, opcionalmente, tipos de crimen.');
    }
  };

  return (
    <div className="crime-picker-container">
      <label>
        Elige categorías de crimen:
        <select
          multiple
          value={selectedCategories}
          onChange={handleCategoryChange}
          className="crime-picker-select"
        >
          {Object.keys(crimesByCategory).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label>
        Elige tipos de crimen:
        <select
          multiple
          value={selectedCrimes}
          onChange={handleCrimeChange}
          className="crime-picker-select"
        >
          {selectedCategories.flatMap((category) =>
            crimesByCategory[category].map((crime) => (
              <option key={crime} value={crime}>
                {crime}
              </option>
            ))
          )}
        </select>
      </label>
      <label>
        Elige un año:
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="crime-picker-select"
        >
          <option value="2010">2010</option>
          <option value="2011">2011</option>
          <option value="2012">2012</option>
          <option value="2013">2013</option>
          <option value="2014">2014</option>
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
        </select>
      </label>
{/*       <label>
        Elige un mes:
        <select value={selectedMonth} onChange={handleMonthChange} className="crime-picker-select">
          <option value="01">Enero</option>
          <option value="02">Febrero</option>
          <option value="03">Marzo</option>
          <option value="04">Abril</option>
          <option value="05">Mayo</option>
          <option value="06">Junio</option>
          <option value="07">Julio</option>
          <option value="08">Agosto</option>
          <option value="09">Septiembre</option>
          <option value="10">Octubre</option>
          <option value="11">Noviembre</option>
          <option value="12">Diciembre</option>
        </select>
      </label>
      <label>
        Elige un día:
        <select value={selectedDay} onChange={handleDayChange} className="crime-picker-select">
          {[...Array(31)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </label> */}
      <label>
        Ingresa parámetro min_samples:
        <input
          type="number"
          value={selectedSamples}
          onChange={handleMin_SamplesChange}
        />
      </label>
      <label>
        Elige un área comunitaria:
        <select
          value={selectedCommunityArea}
          onChange={handleCommunityAreaChange}
          className="crime-picker-select"
        >
              <option value="01">Rogers Park</option>
              <option value="02">West Ridge</option>
              <option value="03">Uptown</option>
              <option value="04">Lincoln Square</option>
              <option value="05">North Center</option>
              <option value="06">Lakeview</option>
              <option value="07">Lincoln Park</option>
              <option value="08">Near North Side</option>
              <option value="09">Edison Park</option>
              <option value="10">Norwood Park</option>
              <option value="11">Jefferson Park</option>
              <option value="12">Forest Glen</option>
              <option value="13">North Park</option>
              <option value="14">Albany Park</option>
              <option value="15">Portage Park</option>
              <option value="16">Irving Park</option>
              <option value="17">Dunning</option>
              <option value="18">Montclare</option>
              <option value="19">Belmont Cragin</option>
              <option value="20">Hermosa</option>
              <option value="21">Avondale</option>
              <option value="22">Logan Square</option>
              <option value="23">Humboldt Park</option>
              <option value="24">West Town</option>
              <option value="25">Austin</option>
              <option value="26">West Garfield Park</option>
              <option value="27">East Garfield Park</option>
              <option value="28">Near West Side</option>
              <option value="29">North Lawndale</option>
              <option value="30">South Lawndale</option>
              <option value="31">Lower West Side</option>
              <option value="32">Chicago Loop</option>
              <option value="33">Near South Side</option>
              <option value="34">Armour Square</option>
              <option value="35">Douglas</option>
              <option value="36">Oakland</option>
              <option value="37">Fuller Park</option>
              <option value="38">Grand Boulevard</option>
              <option value="39">Kenwood</option>
              <option value="40">Washington Park</option>
              <option value="41">Hyde Park</option>
              <option value="42">Woodlawn</option>
              <option value="43">South Shore</option>
              <option value="44">Chatham</option>
              <option value="45">Avalon Park</option>
              <option value="46">South Chicago</option>
              <option value="47">Burnside</option>
              <option value="48">Calumet Heights</option>
              <option value="49">Roseland</option>
              <option value="50">Pullman</option>
              <option value="51">South Deering</option>
              <option value="52">East Side</option>
              <option value="53">West Pullman</option>
              <option value="54">Riverdale</option>
              <option value="55">Hegewisch</option>
              <option value="56">Garfield Ridge</option>
              <option value="57">Archer Heights</option>
              <option value="58">Brighton Park</option>
              <option value="59">McKinley Park</option>
              <option value="60">Bridgeport</option>
              <option value="61">New City</option>
              <option value="62">West Eldson</option>
              <option value="63">Gage Park</option>
              <option value="64">Clearing</option>
              <option value="65">West Lawn</option>
              <option value="66">Chicago Lawn</option>
              <option value="67">West Englewood</option>
              <option value="68">Englewood</option>
              <option value="69">Greater Grand Crossing</option>
              <option value="70">Ashburn</option>
              <option value="71">Auburn Gresham</option>
              <option value="72">Beverly</option>
              <option value="73">Washington Heights</option>
              <option value="74">Mount Greenwood</option>
              <option value="75">Morgan Park</option>
              <option value="76">O'Hare</option>
              <option value="77">Edgewater</option>
        </select>
      </label>

      <div>
        <button
          onClick={handleButtonClick}
          className="crime-picker-button"
        >
          Filtrar
        </button>
        <button 
          onClick={handleClearButtonClick} 
          className='crime-picker-button'
        >
          Limpiar
        </button>
      </div>
    </div>
  );
}