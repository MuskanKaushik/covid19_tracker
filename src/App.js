import React from 'react';

//import Cards from './components/Cards/Cards';
//import Chart from './components/Chart/Chart';
//import CountryPicker from './components/CountryPicker/CountryPicker';

//Alternative to import each component separately -->>
import {Cards, Chart, CountryPicker} from './components';
import styles from './App.module.css';
import { fetchData} from './api';

class App extends React.Component{

    state={
        data: {},
        country:'',
    }

    async componentDidMount(){
        const fetchedData = await fetchData(); //await because we are dealing with asynchronous data
        
        this.setState({data: fetchedData});
    }

    handleCountryChange = async(country)=>{
        const fetchedData = await fetchData(country);
        //fetch the data
        //set the state
        this.setState({data: fetchedData, country: country});
    }
    render(){
        //destruct the data -->
        const { data, country } = this.state;

        return (
            <div className={styles.container}>
              <Cards data={data}/>
              <CountryPicker  handleCountryChange={this.handleCountryChange}/>
              <Chart data={data} country={country}/>
            </div>
        );
    }
}

export default App;
