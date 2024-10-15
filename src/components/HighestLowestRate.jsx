export default function HighestLowestRate({ selectedCurrency1, selectedCurrency2, highest, lowest }) {

   return (<>
      <div className="top-card highest">
         <h5>Höchster Wechselkurs</h5>
         <div>1 {selectedCurrency1} = <span className="result">{highest.toFixed(4)}{selectedCurrency2}</span>
         </div>
         <h5>Niedrigster Wechselkurs</h5>
         <div>1 {selectedCurrency1} = <span className="result">{lowest.toFixed(4)}{selectedCurrency2}</span>
         </div>
      </div>
      <h6>letzte 30 Tage</h6>
   </>)
}