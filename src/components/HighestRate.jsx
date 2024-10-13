export default function HighestRate({ selectedCurrency1, selectedCurrency2, highest, lowest }) {

   return (<>
      <div className="top-card">
         <h4>Höchster Wechselkurs</h4>
         <div>1 {selectedCurrency1} =
            <span className="result">{highest.toFixed(4)}
               {selectedCurrency2}
            </span>
         </div>
         <div>1 {selectedCurrency2} =
            <span className="result">{lowest.toFixed(4)}
               {selectedCurrency1}
            </span>
         </div>
      </div>
      <h6>letzte 30 Tage</h6>
   </>)
}