
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import Dropdown from "./components/Dropdown"
import Card from "./components/Card"
import CurrencySelector from "./components/CurrencySelector"
//import key from "./key.js"

import MoonFullIcon from "./assets/MoonFullIcon"
import MoonLineIcon from "./assets/MoonLineIcon"
import SunFullIcon from "./assets/SunFullIcon"
import SunLineIcon from "./assets/SunLineIcon"

import beacon from "./currencyBeaconResult.json"
import options from "./chartjs-options"

import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Title } from 'chart.js';
import { Line } from 'react-chartjs-2';

import './App.css'

function App() {

   const currencies = [
      "EUR", "USD", "GBP", "CHF", "CZK", "DKK", "HUF", "NOK", "PLN", "RON", "SEK", "RUB", "JPY", "CNY", "BTC", "ETH"
   ];

   const currencySymbols = [
      "€", "$", "£", "₣", "Kč", "kr", "Ft", "kr", "zł", "lei", "kr", "₽", "¥", "元", "₿", "Ξ"
   ]

   const [data, setData] = useState(beacon)
   const [date, setDate] = useState("2024-10-02")
   const [error, setError] = useState(null)
   const [loading, setLoading] = useState(null)
   const [isDarkMode, setIsDarkMode] = useState(false)
   const [isHovering, setIsHovering] = useState(false)
   const [textValue, setTextValue] = useState("")
   const [selectedCurrency1, setSelectedCurrency1] = useState(currencies[0])
   const [selectedCurrency2, setSelectedCurrency2] = useState(currencies[1])
   const [isSwitched, setIsSwitched] = useState(false)

   let darkModeIconStatus = null

   const dataArray = []
   const dateArray = []

   ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Title);

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
      let today = new Date();
      today.setDate(today.getDate() - 6);
      let isoDate = today.toISOString().split('T')[0].toString();
      setDate(isoDate)

      console.log("date1 " + date)

   }, [date])

   useEffect(() => {
      document.body.setAttribute('data-dark-mode', isDarkMode ? 'true' : 'false');
   }, [isDarkMode]);

   if (loading) return (<div>Loading</div>)
   if (error) return (<div>Error: {error.message}</div>)

   let dateFirst = new Date(date)
   dateFirst.setDate(dateFirst.getDate() - 27);

   //setDate([])

   let highest = 0
   let lowest = Infinity
   let first = 0

   let workingDate = dateFirst;



   for (let i = 0; i < 20; i++) {

      workingDate.setDate(workingDate.getDate() + 1);
      let dateISO = workingDate.toISOString().split('T')[0].toString();

      let value = data.response[dateISO][selectedCurrency2]

      if (isSwitched) {
         //value = data.response[dateISO][selectedCurrency1]
         console.log("XXXXXXXXXXXXXXXXXXXX")
         dataArray.push(
            (1 / value)
         )
      } else {
         dataArray.push(
            value
         )
      }
      if (i == 0) {
         first = value
      }

      console.log("VALUE " + value)
      if (value > highest) {
         highest = value
      }
      if (value < lowest) {
         lowest = value
      }

      let formattedDate = dateISO.slice(5)
      dateArray.push(formattedDate)
      /*
            console.log("dateISO " + dateISO)
            console.log("workingDate " + workingDate)
      */
   }

   let latest = parseFloat(dataArray[dataArray.length - 1]);
   /*
      console.log("LATEST: " + latest)
      console.log("formattedDate: " + dateArray)
      console.log(data.response[date][selectedCurrency2])
   */
   const combinedData = {
      labels: dateArray,
      datasets: [
         {
            data: dataArray,
            borderColor: '#66FCF1',
            tension: 0.2, // für eine glattere Kurve
            borderWidth: 3.5,
            pointRadius: 3,
            /*pointBackgroundColor: "#fff", 
            pointBorderColor: "#fff",*/
         }
      ],
   };

   function switchMode() {
      setIsDarkMode((prev) => !prev)
   }

   function handleMouseEnter() {
      setIsHovering(true)
   }

   function handleMouseLeave() {
      setIsHovering(false)
   }

   function handleTextField(e) {
      setTextValue(e.target.value)
   }

   function currencyHandler(i, value) {
      if (i == 1) {
         setSelectedCurrency1(value)
         console.log(i + " i " + value)
      }
      if (i == 2) {
         setSelectedCurrency2(value)
         console.log(i + " i " + value)
      }
   }

   function currencySwitch() {
      let oldFirst = selectedCurrency1
      let oldSecond = selectedCurrency2
      setSelectedCurrency1(oldSecond)
      setSelectedCurrency2(oldFirst)
      setIsSwitched((prev) => !prev)
   }


   if (isDarkMode) {
      if (isHovering) {
         darkModeIconStatus = 0
      } else {
         darkModeIconStatus = 1
      }
   } else if (isHovering) {
      darkModeIconStatus = 2
   } else {
      darkModeIconStatus = 3
   }

   // dark-hover    dark    light-hover   light

   const icons = [
      { Component: SunFullIcon },
      { Component: SunLineIcon },
      { Component: MoonFullIcon },
      { Component: MoonLineIcon },
   ];

   const iconArray = icons.map(({ Component }) => (
      <Component
         key={Component.name}
         onClick={switchMode}
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
      />
   ));

   let textValue2 = parseFloat(textValue) * latest

   //console.log(darkModeIconStatus)
   return (
      <>
         <div className="icon-container">
            {iconArray[darkModeIconStatus]}
         </div>

         <div className="container">
            <Card width="4" height="100" style={{ background: "transparent" }}>
               <h1>CurrencyGrid</h1>
            </Card>


            <Card width="4" height="800" style={{ borderRadius: "64px 64px 8px 8px" }}>
               <h3>1 {selectedCurrency1} in {selectedCurrency2}</h3>
               <div className="diagram">
                  <Line data={combinedData} options={options} />


                  {/*arrowfunction in options. const = ... je nach dark oder light mode andere hintergrundlinien*/}



               </div>
            </Card>

            <Card key="1" width="1" >
               <div className="top-card">
                  <h4>Höchster Wechselkurs</h4>
                  <div>1 {selectedCurrency1} = <span className="result">{highest.toFixed(4)} {selectedCurrency2}</span></div>
                  <div>1 {selectedCurrency2} = <span className="result">{lowest.toFixed(4)} {selectedCurrency1}</span></div>
               </div>
               <h6>letzte 30 Tage</h6>
            </Card>

            <Card key="2" width="1" background={isDarkMode ? "var(--highlight)" : "var(--highlight-neon)"}>
               <div className="top-card">
                  <h4>Aktueller Wechselkurs</h4>
                  <div>1 {selectedCurrency1} = <span className="result">{(data.response["2024-10-06"][selectedCurrency2]).toFixed(4)} {selectedCurrency2}</span></div>
                  <div>1 {selectedCurrency2} = <span className="result">{(1 / +(data.response["2024-10-06"][selectedCurrency2])).toFixed(4)} {selectedCurrency1}</span></div>
               </div>
               <h6>{date}</h6>
            </Card>

            <Card key="3" width="1" style={{ backgroundColor: "var(--panel)", color: "var(--highlight)" }}>
               <div className="currency-box">
                  <span className="currency-span"><input value={textValue} onChange={handleTextField}></input>
                     <CurrencySelector
                        no={1}
                        currencySymbols={currencySymbols}
                        currencies={currencies}
                        selectedCurrency1={selectedCurrency1}
                        selectedCurrency2={selectedCurrency2}
                        currencyHandler={currencyHandler}
                     />
                  </span>

                  <span className="currency-span"><input value={textValue} onChange={handleTextField} disabled></input>
                     <CurrencySelector
                        no={2}
                        currencySymbols={currencySymbols}
                        currencies={currencies}
                        selectedCurrency1={selectedCurrency1}
                        selectedCurrency2={selectedCurrency2}
                        currencyHandler={currencyHandler}
                     />
                  </span>
               </div>
            </Card>



            <Card width="1" >
               <div className="emoji" onClick={currencySwitch}>
                  💱
               </div>
            </Card>



            <Card width="2" >
               <div >
                  {lowest}
               </div>
            </Card>



         </div>
      </>
   )
}

export default App
