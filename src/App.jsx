
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import Card from "./components/Card"
import Graph from './components/Graph'
import Title from './components/Title'
import CurrentRate from "./components/CurrentRate"
import CurrencyBox from './components/CurrencyBox'
import Trend from './components/Trend'
import HighestRate from './components/HighestRate'
import Funfact from './components/Funfact'

import MoonFullIcon from "./assets/MoonFullIcon"
import MoonLineIcon from "./assets/MoonLineIcon"
import SunFullIcon from "./assets/SunFullIcon"
import SunLineIcon from "./assets/SunLineIcon"

import beacon from "./currencyBeaconResult.json"
//import key from "./key.js"

import './App.css'
import CurrencySwitch from './components/CurrencySwitch'

function App() {

   const currencies = [
      "EUR", "USD", "GBP", "CHF", "CZK", "DKK", "HUF", "NOK", "PLN", "RON", "SEK", "RUB", "JPY", "CNY", "BTC", "ETH"
   ];

   const currencySymbols = [
      "€", "$", "£", "₣", "Kč", "kr", "Ft", "kr", "zł", "lei", "kr", "₽", "¥", "元", "₿", "Ξ"
   ]

   const [data, setData] = useState(beacon)
   const [date, setDate] = useState("2024-10-06")
   const [error, setError] = useState(null)
   const [loading, setLoading] = useState(null)
   const [isDarkMode, setIsDarkMode] = useState(true)
   const [isHovering, setIsHovering] = useState(false)
   const [textValue, setTextValue] = useState("")
   const [selectedCurrency1, setSelectedCurrency1] = useState(currencies[0])
   const [selectedCurrency2, setSelectedCurrency2] = useState(currencies[1])
   const [isSwitched, setIsSwitched] = useState(false)

   let darkModeIconStatus = null

   const dataArray = []
   const dateArray = []

   let dateFirst = new Date(date)
   dateFirst.setDate(dateFirst.getDate() - 31);

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

   /*useEffect(() => {
      let today = new Date();
      today.setDate(today.getDate() - 6);
      let isoDate = today.toISOString().split('T')[0].toString();
      setDate(isoDate)

      console.log("date1 " + date)

   }, [date])
*/
   useEffect(() => {
      document.body.setAttribute('data-dark-mode', isDarkMode ? 'true' : 'false');
   }, [isDarkMode]);

   if (loading) return (<div>Loading</div>)
   if (error) return (<div>Error: {error.message}</div>)

   //setDate([])

   let highest = 0
   let lowest = Infinity

   let workingDate = dateFirst;

   for (let i = 0; i < 31; i++) {

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

   let first = parseFloat(dataArray[0]);
   let latest = parseFloat(dataArray[dataArray.length - 1]);

   let trend = (1 - (first / latest)) * 100
   let trendWording = trend > 0 ? "gestiegen" : "gefallen"
   console.log(`Der Kurs von ${selectedCurrency2} ist im Verhältnis zu ${selectedCurrency1} um ${trend.toFixed(4)}% gestiegen`)

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

   let textValue2 = parseFloat(textValue.replace(',', '.')) * latest
   console.log(textValue + " " + latest)
   //console.log(darkModeIconStatus)
   return (
      <>
         <div className="icon-container">
            {iconArray[darkModeIconStatus]}
         </div>

         <div className="container">

            <Title />

            <Card key="1" width="4" height="800" style={{ borderRadius: "64px 64px 8px 8px" }}>
               <Graph
                  selectedCurrency1={selectedCurrency1}
                  selectedCurrency2={selectedCurrency2}
                  combinedData={combinedData}
               />
            </Card>

            <Card key="2" width="1" background={isDarkMode ? "var(--highlight)" : "var(--highlight-neon)"}>
               <CurrentRate
                  selectedCurrency1={selectedCurrency1}
                  selectedCurrency2={selectedCurrency2}
                  data={data}
                  date={date}
               />
            </Card>

            <Card key="3" width="2">
               <CurrencyBox
                  textValue={textValue}
                  textValue2={textValue2}
                  handleTextField={handleTextField}
                  currencyHandler={currencyHandler}
                  currencySymbols={currencySymbols}
                  currencies={currencies}
                  selectedCurrency1={selectedCurrency1}
                  selectedCurrency2={selectedCurrency2}
               />
            </Card>

            <Card key="4" width="1" >
               <CurrencySwitch currencySwitch={currencySwitch} />
            </Card>

            <Card key="5" width="1" >
               <HighestRate
                  selectedCurrency1={selectedCurrency1}
                  selectedCurrency2={selectedCurrency2}
                  highest={highest}
                  lowest={lowest}
               />
            </Card>

            <Card key="6" width="2" >
               <Funfact />
            </Card>

            <Card key="7" width="1" >
               <Trend
                  selectedCurrency1={selectedCurrency1}
                  selectedCurrency2={selectedCurrency2}
                  trend={trend}
                  trendWording={trendWording}
               />
            </Card>

         </div>
      </>
   )
}

export default App
