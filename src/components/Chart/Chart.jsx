import React,{useState,useEffect} from 'react';
import { fetchDailydata } from '../../api';
import {Line, Bar} from 'react-chartjs-2';
import styles from './Chart.module.css'
const Charts = ({data :{confirmed, recovered, deaths},country}) => {

    const [dailydata,setDailyData] = useState([]);

    useEffect(() => {
        
        const fetchApi = async ()=>{
            setDailyData(await fetchDailydata());
        }

        fetchApi();

    },[]);

    const lineChart=(
        
        dailydata.length
        ?
        (<Line
            data={{
                labels : dailydata.map(({date}) => date),
                datasets : [{
                    data : dailydata.map(({confirmed}) => confirmed),
                    label : "Infected",
                    borderColor: 'blue',
                    fill: true
                },{
                    data : dailydata.map(({deaths}) => deaths),
                    label : "Deaths",
                    borderColor: 'red',
                    backgroundColor:'rgba(255,0,0,0.5)',
                    fill: true

                }],

            }}
        />)
        :
        null
        
    )

    // console.log(confirmed.value, recovered.value, deaths.value)

    const barChart = (
        confirmed
        ?
        <Bar
            data={{
                labels:['Infected', 'Recovered', 'Deaths'],
                datasets:[{
                    label : "People",
                    backgroundColor : ['rgba(144, 144, 189, 0.5)',
                        'rgba(0, 255, 0, 0.5)',
                        'rgba(255, 0, 0, 0.5)'],
                    data : [confirmed.value, recovered.value, deaths.value]
                }]
            }}
            options = {{
                legend : {display:false},
                title : {display: true, text:{country}}
            }}
        />
        :
        null
    )
    

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Charts