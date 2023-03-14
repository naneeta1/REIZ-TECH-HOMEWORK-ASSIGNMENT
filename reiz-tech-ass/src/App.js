import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import DropDown from './DropDown';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './App.css';


function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);
  const [sortOrder, setSortOrder] = useState('Ascending');
  const [regions, setRegions] = useState({
    Africa: false,
    Americas: false,
    Asia: false,
    Europe: false,
    Oceania: false,
  });
  const [sliderValue, setSliderValue] = useState({ min: 0, max: 20000000 });
  const [showLithuania, setShowLithuania] = useState(false);

  useEffect(() => {
    fetch('https://restcountries.com/v2/all?fields=name,region,area')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  function handleCheckboxChange(event) {
    const { name, checked } = event.target;
    setRegions((prevRegions) => ({ ...prevRegions, [name]: checked }));
  }

  function filterCountriesByRegion(countries) {
    const selectedRegions = Object.entries(regions)
      .filter(([region, isSelected]) => isSelected)
      .map(([region, isSelected]) => region);
    if (selectedRegions.length === 0) {
      return countries;
    } else {
      return countries.filter((country) =>
        selectedRegions.includes(country.region)
      );
    }
  }

  function filterCountriesByArea(countries) {
    if (showLithuania) {
      return countries.filter(
        (country) =>
          country.area !== null && country.area < 65300 && country.name !== 'Lithuania'
      );
    } else {
      return countries.filter(
        (country) =>
          country.area !== null &&
          country.area >= sliderValue.min &&
          country.area <= sliderValue.max
      );
    }
  }

  function sortCountriesByArea(countries) {
    return countries.sort((a, b) =>
      sortOrder === 'AreaAscending' ? a.area - b.area : b.area - a.area
    );
  }

  function sortCountriesByName(countries) {
    return countries.sort((a, b) => {
      if (sortOrder === 'Ascending') {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === 'Descending') {
        return b.name.localeCompare(a.name);
      } else if (sortOrder === 'AreaAscending') {
        if (a.area === undefined) {
          return -1;
        } else if (b.area === undefined) {
          return 1;
        } else {
          return a.area - b.area;
        }
      } else if (sortOrder === 'AreaDescending') {
        if (b.area === undefined) {
          return -1;
        } else if (a.area === undefined) {
          return 1;
        } else {
          return b.area - a.area;
        }
      }
    }
    );
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const filteredData = filterCountriesByRegion(data);
  const filteredDataByArea = filterCountriesByArea(filteredData);
  const sortedDataByArea = sortCountriesByArea(filteredDataByArea);
  const sortedData = sortCountriesByName(sortedDataByArea);
  const currentPosts = sortedData.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="App">
      <header className="header">REIZ  TECH  HOMEWORK  ASSIGNMENT</header>
      
      <div className="row-2">
      <div className="checkbox-menu">
        <label style={{color:"white", fontSize:"20px", backgroundColor:"gray", padding:"8px", margin:"10px",borderRadius:"10px"}}>Filter by region</label>
        {Object.entries(regions).map(([region, isSelected]) => (
          <div key={region} className="checkbox-wrapper">
            <input
              type="checkbox"
              name={region}
              checked={isSelected}
              onChange={handleCheckboxChange}
            />
            <label >{region}</label>
          </div>
        ))}
      </div>
      <div className='right-menu'>
        <div className='row-1'>
          <div className="dropdown-container">
            <DropDown setSortOrder={setSortOrder} />
          </div>
          <button className="show-lithuania" onClick={() => setShowLithuania(!showLithuania)}>
            {showLithuania ? 'Hide Lithuania' : 'Show Lithuania'}
          </button>
      </div>
      <div className="card-container">
        {currentPosts.map((record, i) => (
          <div key={i} className="card">
            <div className="card-body">
              <div className="card-title">{record.name}</div>
              <div className="card-text">
                <p>{record.region} {record.area}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
      

      </div>
      <Pagination totalCountries={filteredData.length / postsPerPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;
