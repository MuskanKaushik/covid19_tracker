import axios from 'axios';
const url = 'https://covid19.mathdro.id/api';

  export  const fetchData = async (country)=>{

    let changeableUrl =url
    if(country){
        changeableUrl = `${url}/countries/${country}`;

    }
    // console.log(changeableUrl)
    try{

        const {data:{confirmed,recovered,deaths,lastUpdate}} = await axios.get(changeableUrl);
        return {confirmed,recovered,deaths,lastUpdate};

        // const response = await axios.get(url);
        // const {data} = await axios.get(url);

        // const modifiedData = {
        //     confirmed : data.confirmed,
        //     recovered : data.recovered,
        //     deaths : data.deaths,
        //     lastUpdate: data.lastUpdate
        // }
        // return modifiedData;
    }
    catch(error){

    }
}

export const fetchDailydata = async ()=>{
    try{

        const {data} = await axios.get(`${url}/daily`);
        // console.log(data)
        const modifiedData = data.map((dailyData) => ({
            confirmed : dailyData.confirmed.total,
            deaths : dailyData.deaths.total,
            date : dailyData.reportDate
        }));
        // console.log(modifiedData)
        return modifiedData;
    }

    catch(error){

    }
}


export const fetchCountry = async () => {
    try{
        const {data:{countries}} = await axios.get(`${url}/countries`);
        // console.log({countries})
        return countries.map((country) => country.name);
    }
    catch{

    }
}