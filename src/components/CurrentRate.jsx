export default function CurrentRate({ selectedCurrency1, selectedCurrency2, date, data }) {

   return (<>
      <div className="top-card">
         <h4>Aktueller Wechselkurs</h4>
         <div>1 {selectedCurrency1} = <span className="result">{(data.response["2024-10-06"][selectedCurrency2]).toFixed(4)} {selectedCurrency2}</span></div>
         <div>1 {selectedCurrency2} = <span className="result">{(1 / +(data.response["2024-10-06"][selectedCurrency2])).toFixed(4)} {selectedCurrency1}</span></div>
      </div>
      <h6>{date}</h6>
   </>)
}
