/* eslint-disable react/prop-types */
export default function CurrencySelector({ currencies, currencySymbols, no, selectedCurrency1, selectedCurrency2, currencyHandler }) {
   let value

   if (no == 1) {
      value = selectedCurrency1
   }
   if (no == 2) {
      value = selectedCurrency2
   }

   return (<>
      <select className="currency-select" id="currency1" value={value} onChange={(e) => currencyHandler(no, e.target.value)}>
         {currencies.map((currency, index) => (
            <option key={currency} value={currency} >
               <span>{currency}</span>{"\u2003"}<span>({currencySymbols[index]})</span>
            </option>
         ))}
      </select>
   </>)
}