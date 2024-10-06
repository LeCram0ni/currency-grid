/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import Dropdown from "./components/Dropdown"
import Card from "./components/Card"
//import key from "./key.js"

import beacon from "./currencyBeaconResult.json"

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

   function dropdownHandler() {
      setIsOpen((x) => !x)
   }

   console.log(JSON.stringify(data))

   return (
      <>
         <div className="dark-light-toggle" onClick={() => setIsDarkMode((prev) => !prev)}>
            O
         </div>

         <div className="container">
            <Card width="4" height="800">
               <h1>test3</h1>
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

            <Card width="2" height="250" dropdownHandler={dropdownHandler}>
               {isOpen ? <Dropdown /> : "Select"}
            </Card>

         </div>
      </>
   )
}

export default App
