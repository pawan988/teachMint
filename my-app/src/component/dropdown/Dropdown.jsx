import React, { useState, useEffect, useRef } from "react";
import "./Dropdown.css";
import { useSelector, useDispatch } from "react-redux";
import { getCountry } from "../../redux/actions/country";
import { getTime } from "../../redux/actions/time";

const CustomAutoSearch = () => {
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [countryData, setCountryData] = useState([]);

  const getCountryListData = useSelector((state) => state && state?.country);

  useEffect(() => {
    dispatch(getCountry());
  }, []);

  useEffect(() => {
    if (searchTerm !== "") dispatch(getTime(searchTerm));
  }, [searchTerm]);

  useEffect(() => {
    if (getCountryListData) {
      setCountryData(getCountryListData?.countryData);
    }
  }, [getCountryListData]);

  const handleSearch = (e) => {
    const input = e.target.value;
    setSearchTerm(input);

    const filteredResults = countryData.filter((item) =>
      item.toLowerCase().includes(input.toLowerCase())
    );

    setResults(filteredResults);
    setIsDropdownOpen(true);
  };

  const handleSelect = (item) => {
    setSearchTerm(item);
    setResults([]);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {isDropdownOpen && results.length > 0 && (
        <ul className="dropdown-list">
          {results.map((item, index) => (
            <li key={index} onClick={() => handleSelect(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}

      {selectedItem && (
        <div className="selected-item">
          <p>Selected: {selectedItem}</p>
        </div>
      )}
    </div>
  );
};

export default CustomAutoSearch;
