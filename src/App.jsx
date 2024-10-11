
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

   const funfacts = [
      "Kroatien löste am 01. Januar 2023 die bisherige Währung Kuna durch den Euro ab.",
      "Rumänien möchte den Euro 2029 einführen.",
      "Am 12. Juli 2022 erreichte der Euro-Dollar-Wechselkurs seit fast 20 Jahren erneut ein Verhältnis von 1:1.",
      "Der Euro wurde am 1. Januar 1999 als Buchgeld eingeführt und trat am 1. Januar 2002 in Form von Bargeld in 12 EU-Ländern in Kraft.",
      "Das Euro-Zeichen (€) wurde 1996 entworfen.",
      "Über 340 Millionen Menschen in Europa nutzen den Euro als ihre Hauptwährung.",
      "Der Euro ist die gemeinsame Währung von 20 der 27 EU-Mitgliedstaaten, die zusammen als Eurozone bezeichnet werden.",
      "Um dem Euro beizutreten, müssen Länder bestimmte wirtschaftliche Kriterien erfüllen, die als Maastricht-Kriterien bekannt sind. Diese Kriterien betreffen unter anderem Inflation, öffentliche Schulden und Wechselkursstabilität.",
      "Die erste Euro-Münze wurde am 1. Januar 2002 in Berlin geprägt, um den offiziellen Start des Euros als Bargeld zu feiern.",
      "Viele Länder haben beim Euro-Wechselkurs einen festen Wechselkurs zur nationalen Währung, um Stabilität zu gewährleisten. Zum Beispiel wurde der Wechselkurs der D-Mark auf 1,95583 D-Mark pro Euro festgelegt.",

   ]

   const [data, setData] = useState(beacon)
   const [date, setDate] = useState("2024-10-06")
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

   let dateFirst = new Date(date)
   dateFirst.setDate(dateFirst.getDate() - 31);

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
<<<<<<< HEAD
   let trendWording = trend > 0 ? "gestiegen" : "gefallen"
=======
>>>>>>> 01f5e5f90fece5221f610a77e906607263d7ae42
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

<<<<<<< HEAD
            <div className="title-header" >
=======
            <Card width="4" height="100" style={{ background: "transparent" }}>
>>>>>>> 01f5e5f90fece5221f610a77e906607263d7ae42
               <h1>CurrencyGrid</h1>
            </div>


            <Card width="4" height="800" style={{ borderRadius: "64px 64px 8px 8px" }}>
               <h3>1 {selectedCurrency1} in {selectedCurrency2}</h3>
               <div className="diagram">
                  <Line data={combinedData} options={options} />


                  {/*arrowfunction in options. const = ... je nach dark oder light mode andere hintergrundlinien*/}



               </div>
            </Card>







            <Card key="2" width="1" background={isDarkMode ? "var(--highlight)" : "var(--highlight-neon)"}>
               <div className="top-card">
                  <h4>Aktueller Wechselkurs</h4>
                  <div>1 {selectedCurrency1} = <span className="result">{(data.response["2024-10-06"][selectedCurrency2]).toFixed(4)} {selectedCurrency2}</span></div>
                  <div>1 {selectedCurrency2} = <span className="result">{(1 / +(data.response["2024-10-06"][selectedCurrency2])).toFixed(4)} {selectedCurrency1}</span></div>
               </div>
               <h6>{date}</h6>
            </Card>

            <Card key="3" width="2">
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

                  <span className="currency-span"><input value={textValue2 ? textValue2.toFixed(2) : 0} onChange={handleTextField} disabled></input>
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

            <Card key="1" width="1" >
               <div className="top-card">
                  <h4>Höchster Wechselkurs</h4>
                  <div>1 {selectedCurrency1} = <span className="result">{highest.toFixed(4)} {selectedCurrency2}</span></div>
                  <div>1 {selectedCurrency2} = <span className="result">{lowest.toFixed(4)} {selectedCurrency1}</span></div>
               </div>
               <h6>letzte 30 Tage</h6>
            </Card>


            <Card width="2" >
               <div className="flex line-height-small funfact">
                  {funfacts[Math.floor(Math.random() * funfacts.length)]}
               </div>
            </Card>

            <Card width="1" >
               <div className="flex line-height-small">
<<<<<<< HEAD
                  {`Der Kurs von ${selectedCurrency1}`}<br />
                  {`ist im Verhältnis zu ${selectedCurrency2}`}<br />
                  in den letzten 30 Tagen <br />
                  {`um ${Math.abs(trend).toFixed(4)}% ${trendWording}`}
=======
                  {`Der Kurs von ${selectedCurrency2}`}<br />
                  {`ist im Verhältnis zu ${selectedCurrency1}`}<br />
                  in den letzten 30 Tagen <br />
                  {`um ${trend.toFixed(4)}% gestiegen`}
>>>>>>> 01f5e5f90fece5221f610a77e906607263d7ae42
               </div>
            </Card>



         </div>
      </>
   )
}

export default App
