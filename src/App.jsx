/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from 'react'
import Card from "./components/Card"
import Graph from './components/Graph'
import Title from './components/Title'
import CurrentRate from "./components/CurrentRate"
import CurrencyBox from './components/CurrencyBox'
import Trend from './components/Trend'
import HighestRate from './components/HighestRate'
import Funfact from './components/Funfact'

import beacon from "./currencyBeaconResult.json"
//import key from "./key.js"

import { currencies, currencySymbols } from "./currencies"

import './App.css'
import CurrencySwitch from './components/CurrencySwitch'
import DarkmodeToggle from './components/DarkmodeToggle'

function App() {

   const [data, setData] = useState(beacon)
   const [date, setDate] = useState("2024-10-06")
   const [error, setError] = useState(null)
   const [loading, setLoading] = useState(null)
   const [isDarkMode, setIsDarkMode] = useState(true)
   const [textValue, setTextValue] = useState("")
   const [selectedCurrency1, setSelectedCurrency1] = useState(currencies[0])
   const [selectedCurrency2, setSelectedCurrency2] = useState(currencies[1])
   const [isSwitched, setIsSwitched] = useState(false)

   useEffect(() => {
      document.body.setAttribute('data-dark-mode', isDarkMode ? 'true' : 'false');
   }, [isDarkMode]);

   const { dataArray, dateArray, highest, lowest } = useMemo(() => {
      const tempDataArray = [];
      const tempDateArray = [];
      let tempHighest = 0;
      let tempLowest = Infinity;

      let dateFirst = new Date(date);
      dateFirst.setDate(dateFirst.getDate() - 31);
      let workingDate = dateFirst;

      for (let i = 0; i < 31; i++) {
         workingDate.setDate(workingDate.getDate() + 1);
         let dateISO = workingDate.toISOString().split('T')[0];

         let value = data.response[dateISO][selectedCurrency2];
         if (isSwitched) {
            value = 1 / value;
         }
         tempDataArray.push(value);

         if (value > tempHighest) {
            tempHighest = value;
         }
         if (value < tempLowest) {
            tempLowest = value;
         }

         let formattedDate = dateISO.slice(5);
         tempDateArray.push(formattedDate);
      }

      return {
         dataArray: tempDataArray,
         dateArray: tempDateArray,
         highest: tempHighest,
         lowest: tempLowest,
      };
   }, [data, date, selectedCurrency2, isSwitched]);

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

   const combinedData = useMemo(() => ({
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
   }), [dataArray, dateArray]);

   if (loading) return (<div>Loading</div>)
   if (error) return (<div>Error: {error.message}</div>)

   /*
      console.log("LATEST: " + latest)
      console.log("formattedDate: " + dateArray)
      console.log(data.response[date][selectedCurrency2])
   */

   function switchMode() {
      setIsDarkMode((prev) => !prev)
   }

   function handleTextField(e) {
      setTextValue(e.target.value)
   }

   function handleCurrencies(i, value) {
      if (i == 1) setSelectedCurrency1(value)
      if (i == 2) setSelectedCurrency2(value)
   }

   function currencySwitch() {
      let oldFirst = selectedCurrency1
      let oldSecond = selectedCurrency2
      setSelectedCurrency1(oldSecond)
      setSelectedCurrency2(oldFirst)
      setIsSwitched((prev) => !prev)
   }

   let first = parseFloat(dataArray[0]);
   let latest = parseFloat(dataArray[dataArray.length - 1]);


   let textValue2 = parseFloat(textValue.replace(',', '.')) * latest
   //console.log(textValue + " " + latest)
   //console.log(darkModeIconStatus)
   return (
      <>
         <Title />

         <DarkmodeToggle
            isDarkMode={isDarkMode}
            switchMode={switchMode}
         />

         <div className="container">

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
                  handleCurrencies={handleCurrencies}
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
                  first={first}
                  latest={latest}
               />
            </Card>

         </div>
      </>
   )
}

export default App
