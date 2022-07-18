import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { Geo_Api_Url, geoApiOptions } from "../../api";
const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null);
    //fetches our data from out api.js and saves it as a json file
    const loadOptions = (inputValue) => {
        return fetch(
            `${Geo_Api_Url}/cities?minPopulation=100000&namePrefix=${inputValue}`
            , geoApiOptions
        )
            .then(response => response.json())
            .then((response) => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        }
                    })
                }
            })
            .catch(err => console.error(err));
    };


    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };


    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
};

export default Search;