/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import Dropdown from "./components/Dropdown"
import Card from "./components/Card"
//import key from "./key.js"

import beacon from "./currencyBeaconResult.json"

import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Title } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Title);

import './App.css'

function App() {

   const [data, setData] = useState(beacon)
   const [date, setdate] = useState()
   const [error, setError] = useState(null)
   const [loading, setLoading] = useState(null)
   const [isOpen, setIsOpen] = useState(false)
   const [isDarkMode, setIsDarkMode] = useState(true)

   const curr1 = "EUR"
   const curr2 = "USD"


   /*
      const symbols = "EUR,USD,GBP,CHF,CZK,DKK,HUF,NOK,PLN,RON,SEK,RUB,JPY,CNY,BTC,ETH"
   
      const startDate = "2024-08-01"
      const endDate = "2024-10-06"
   */

   /*
   useEffect(() => {
      fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/${apiVersion}/${endpoint}.json`)
         .then((res) => {
            if (!res.ok) {
               throw new Error("Fehlerhaftes fetch")
            }
            return res.json()
         })
         .then((dat) => {
            console.log(dat[curr1][curr2])
            setData(dat[curr1][curr2])
            setLoading(false)
         })
         .catch((err) => {
            setError(err)
            setLoading(false)
         })
   }, []
   )
*/

   /* LIVE FETCH
      
      const url = `https://api.currencybeacon.com/v1/timeseries?api_key=${key}&base=${curr1}&start_date=${startDate}&end_date=${endDate}&symbols=${symbols}`;
   
      useEffect(() => {
         fetch(url)
            .then((res) => {
               if (!res.ok) {
                  throw new Error("Fehlerhaftes fetch")
               }
               return res.json()
            })
            .then((dat) => {
               console.log(dat)
               setData(dat)
               setLoading(false)
            })
            .catch((err) => {
               setError(err)
               setLoading(false)
            })
      }, []
      )
   
   */

   useEffect(() => {
      const dateObject = new Date()
      const year = dateObject.getFullYear()
      const month = dateObject.getMonth() + 1
      const day = dateObject.getDate()

      setdate(`${year}-${month}-${day}`)

      console.log(date)
   }, [date])


   useEffect(() => {
      document.body.setAttribute('data-dark-mode', isDarkMode ? 'true' : 'false');
   }, [isDarkMode]);


   if (loading) return (<div>Loading</div>)
   if (error) return (<div>Error: {error.message}</div>)


   const combinedData = {
      labels: ['1', '2', '3', '4', '5', '6', "7", "8", "9", "10", "11", "12"],
      datasets: [
         {
            label: 'A',
            data: [1.07, 1.06, 1.076, 1.072, 1.09931729, 1.092, 1.05, 1.06, 1.03, 1.082, 1.09931729, 1.06931729],
            borderColor: '#66FCF1',
            tension: 0.3, // für eine glattere Kurve
            borderWidth: 4,
            pointRadius: 3,
            /*pointBackgroundColor: "#fff",
            pointBorderColor: "#fff",*/
         }
      ],
   };

   const options = {
      plugins: {
         legend: false // Hide legend
      },
      legend: {
         display: false
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
         y: {
            beginAtZero: false,
            grid: {
               color: 'rgba(255, 255, 255, 0.1)', // Gitterfarbe
               lineWidth: 1, // Liniendicke der Gitterlinien
            },
         },
         x: {
            grid: {
               color: 'rgba(255, 255, 255, 0.1)', // Gitterfarbe
               lineWidth: 1, // Liniendicke der Gitterlinien
            },
         },
      },
   }


   function dropdownHandler() {
      setIsOpen((x) => !x)
   }

   //console.log(JSON.stringify(data))

   return (
      <>

         <svg
            className='dark-light-toggle'
            viewBox="0 0 502.944 502.944"
            onClick={() => setIsDarkMode((prev) => !prev)}
         >
            <path d="M 491.733 286.523 C 483.2 282.256 472.533 284.39 466.133 290.79 C 453.333 304.657 438.4 316.39 421.333 325.99 C 391.466 343.057 359.466 351.59 326.4 351.59 C 270.933 351.59 221.867 325.99 197.333 283.323 C 180.266 253.456 176 217.19 185.6 180.923 C 197.333 136.123 229.333 96.656 273.067 72.123 C 289.067 63.59 307.2 56.123 326.4 51.856 C 336 49.723 342.4 41.189 342.4 31.589 C 342.4 21.989 337.067 14.522 327.467 11.322 C 261.334 -7.878 188.8 -0.411 129.067 33.722 C 69.333 66.789 27.733 121.189 8.533 186.256 C -8.533 251.323 0 318.522 34.133 376.122 C 80 453.989 164.267 501.989 254.933 501.989 C 299.733 501.989 343.466 490.256 381.866 467.856 C 442.666 433.723 485.333 377.189 502.399 309.989 C 504.533 300.39 500.266 290.79 491.733 286.523 Z" />
         </svg>

         <div className="container">
            <Card width="4" height="800" style={{ borderRadius: "64px 64px 8px 8px" }}>
               <div className="diagram">

                  <Line data={combinedData} options={options} />
               </div>
            </Card>

            <Card width="1" height="250" >
               <div className="top-card">
                  <h4>Höchster Kurs</h4>
                  <div>1 {curr1.toUpperCase()} = <span className="result">{(data.response["2024-10-06"][curr2]).toFixed(4)} {curr2.toUpperCase()}</span></div>
                  <div>1 {curr2.toUpperCase()} = <span className="result">{(1 / +(data.response["2024-10-06"][curr2])).toFixed(4)} {curr1.toUpperCase()}</span></div>
               </div>
               <h6>letzte 30 Tage</h6>
            </Card>
            <Card width="1" height="250" background={isDarkMode ? "var(--highlight)" : "var(--highlight-neon)"}>
               <div className="top-card">
                  <h4>Aktueller Kurs</h4>
                  <div>1 {curr1.toUpperCase()} = <span className="result">{(data.response["2024-10-06"][curr2]).toFixed(4)} {curr2.toUpperCase()}</span></div>
                  <div>1 {curr2.toUpperCase()} = <span className="result">{(1 / +(data.response["2024-10-06"][curr2])).toFixed(4)} {curr1.toUpperCase()}</span></div>
               </div>
               <h6>{date}</h6>
            </Card>

            <Card width="2" height="250" dropdownHandler={dropdownHandler} style={{ backgroundColor: "var(--font)", color: "var(--highlight)" }}>
               {isOpen ? <Dropdown /> : "Select"}
            </Card>
            <Card width="2" height="250" dropdownHandler={dropdownHandler}>
               {isOpen ? <Dropdown /> : "Select"}
            </Card>
            <Card width="2" height="250" dropdownHandler={dropdownHandler}>
               {isOpen ? <Dropdown /> : "Select"}
            </Card>
            <Card width="2" height="250" dropdownHandler={dropdownHandler}>
               {isOpen ? <Dropdown /> : "Select"}
            </Card>
            <Card width="2" height="250" dropdownHandler={dropdownHandler}>
               {isOpen ? <Dropdown /> : "Select"}
            </Card>

         </div>
      </>
   )
}

export default App
