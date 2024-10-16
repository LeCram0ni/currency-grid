
import { useState, useEffect, useMemo } from 'react'
import Card from "./components/Card"
import Graph from './components/Graph'
import Title from './components/Title'
import CurrentRate from "./components/CurrentRate"
import CurrencyBox from './components/CurrencyBox'
import Trend from './components/Trend'
import HighestLowestRate from './components/HighestLowestRate.jsx'
import Funfact from './components/Funfact'

//import beacon from "./currencyBeaconResult.json"
import key from "./key.js"

import { currencies, currencySymbols } from "./currencies"

import './App.css'
import CurrencySwitch from './components/CurrencySwitch'
import DarkmodeToggle from './components/DarkmodeToggle'

function App() {

   const [data, setData] = useState(null)
   const [error, setError] = useState(null)
   const [loading, setLoading] = useState(null)
   const [isDarkMode, setIsDarkMode] = useState(true)
   const [textValue, setTextValue] = useState("")
   const [selectedCurrency1, setSelectedCurrency1] = useState(currencies[1])
   const [selectedCurrency2, setSelectedCurrency2] = useState(currencies[2])

   const startDate = getDate(true, true) // -31 Tage , ISO Format
   const endDate = getDate(false, true) // heute , ISO Format

   let storageKey = ""
   const url = `https://api.currencybeacon.com/v1/timeseries?api_key=${key}&base=${selectedCurrency1}&start_date=${startDate}&end_date=${endDate}&symbols=${currencies}`;

   function getDate(offset, iso) {
      let date = new Date();
      if (offset) {
         date.setDate(date.getDate() - 31)
      }
      if (iso) {
         date = date.toISOString().split('T')[0];
      }
      return date
   }

   useEffect(() => {
      document.body.setAttribute('data-dark-mode', isDarkMode ? 'true' : 'false');
   }, [isDarkMode]);

   useEffect(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      storageKey = `${endDate}-${selectedCurrency1}`;
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
         setData(JSON.parse(savedData));
         console.log("Daten aus dem LocalStorage geladen");
      } else {
         getApiData();
      }
   }, [selectedCurrency1, endDate]);

   useEffect(() => {
      if (data) {
         const storageKey = `${endDate}-${selectedCurrency1}`; // gleicher dynamischer Schlüssel
         localStorage.setItem(storageKey, JSON.stringify(data));
         console.log(`Daten wurden unter dem Schlüssel ${storageKey} im LocalStorage gespeichert.`);
      }
   }, [data, selectedCurrency1, startDate, endDate]);

   function getApiData() {
      //setLoading(true)
      fetch(url)
         .then((res) => {
            if (!res.ok) {
               throw new Error("Fehlerhaftes fetch")
            }
            return res.json()
         })
         .then((dat) => {
            console.log("API Aufruf")
            setData(dat)
            localStorage.setItem(storageKey, JSON.stringify(dat));
            setLoading(false)
         })
         .catch((err) => {
            setError(err)
            setLoading(false)
         })
   }

   useEffect(() => {
      if (data) {
         console.log(data);
      }
   }, [data]);

   const { dataArray, dateArray, highest, lowest } = useMemo(() => {
      if (!data) {
         return { dataArray: [], dateArray: [], highest: 0, lowest: Infinity };
      }

      const tempDataArray = [];
      const tempDateArray = [];
      let tempHighest = 0;
      let tempLowest = Infinity;

      let workingDate = getDate(true, false);

      for (let i = 0; i < 31; i++) {
         workingDate.setDate(workingDate.getDate() + 1);
         let dateISO = workingDate.toISOString().split('T')[0];
         console.log(dateISO)
         let value = data.response[dateISO][selectedCurrency2];
         tempDataArray.push(value);

         if (value > tempHighest) {
            tempHighest = value;
         }
         if (value < tempLowest) {
            tempLowest = value;
         }
         let formattedDate = dateISO.slice(5); //Beschriftung für Graphen, z.B.: 09-20
         let dayLegend = formattedDate.slice(3, 5)
         let monthLegend = formattedDate.slice(0, 2)
         let legend = dayLegend + "." + monthLegend + "."
         tempDateArray.push(legend);
      }

      return {
         dataArray: tempDataArray,
         dateArray: tempDateArray,
         highest: tempHighest,
         lowest: tempLowest,
      };
   }, [data, selectedCurrency2]);

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

   if (loading) return (<div></div>)
   if (error) return (<div>Error: {error.message}</div>)

   let first = parseFloat(dataArray[0]);
   let latest = parseFloat(dataArray[dataArray.length - 1]);

   let textValue2 = parseFloat(textValue.replace(',', '.')) * latest

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
   }

   //console.log(dataArray)

   return (
      <>
         <div className="nav-bar">
            <Title />

            <DarkmodeToggle
               isDarkMode={isDarkMode}
               switchMode={switchMode}
            />
         </div>
         <div className="container">

            <Card className="width-full mobile-full" id="card-1" height="720" style={{ borderRadius: "64px 64px 8px 8px" }}>
               <Graph
                  selectedCurrency1={selectedCurrency1}
                  selectedCurrency2={selectedCurrency2}
                  combinedData={combinedData}
                  highest={highest}
                  lowest={lowest}
                  isDarkMode={isDarkMode}
               />
            </Card>

            <Card className="width-quarter mobile-half" id="card-3" background={isDarkMode ? "var(--highlight)" : "var(--highlight-neon)"}>
               <CurrentRate
                  selectedCurrency1={selectedCurrency1}
                  selectedCurrency2={selectedCurrency2}
                  data={data}
                  endDate={endDate}
               />
            </Card>

            <Card className="width-half mobile-full" id="card-2">
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

            <Card className="width-quarter mobile-half" id="card-4"  >
               <CurrencySwitch currencySwitch={currencySwitch} />
            </Card>

            <Card className="width-quarter mobile-half" id="card-5" >
               <HighestLowestRate
                  selectedCurrency1={selectedCurrency1}
                  selectedCurrency2={selectedCurrency2}
                  highest={highest}
                  lowest={lowest}
               />
            </Card>

            <Card className="width-half mobile-full" id="card-7" >
               <Funfact />
            </Card>

            <Card className="width-quarter mobile-half" id="card-6"  >
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
