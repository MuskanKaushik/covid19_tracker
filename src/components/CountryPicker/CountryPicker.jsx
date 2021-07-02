import React, {useState,useEffect} from 'react'
import {NativeSelect,FormControl} from '@material-ui/core'
import styles from './CountryPicker.module.css'
import { fetchCountry } from '../../api'

const CountryPicker = ({handleCountryChange}) => {
    
    const [fetchedCountries,setfetchedCountries] = useState([]);

    useEffect(()=>{
        const fetchApi = async () => {
            setfetchedCountries(await fetchCountry())
        }
        fetchApi();
       
    },[setfetchedCountries])

    // console.log(fetchedCountries)

    return (
        <FormControl className={styles.FormControl}>
            <NativeSelect defaultValue="" onChange={(e)=> handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {fetchedCountries.map((country, i) => 
                <option key={i} value={country}>{country}</option>
                )}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker