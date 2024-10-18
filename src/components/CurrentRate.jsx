export default function CurrentRate({ selectedCurrency1, selectedCurrency2, endDate, data }) {

   if (!data || !data.response) {
      return <div>Loading...</div>;
   }

   let day = endDate.slice(8, 10)
   let month = endDate.slice(5, 7)
   let year = endDate.slice(0, 4)

   let formattedDate = day + "." + month + "." + year

   return (<>
      <div className="top-card">
         <h4>Aktueller Wechselkurs</h4>
         <div>1 {selectedCurrency1} = <span className="result">{parseFloat((data.response[endDate][selectedCurrency2])).toFixed(4)} {selectedCurrency2}</span></div>
         <div>1 {selectedCurrency2} = <span className="result">{(1 / +(data.response[endDate][selectedCurrency2])).toFixed(4)} {selectedCurrency1}</span></div>
      </div>
      <h6>{formattedDate}</h6>
   </>)
}
