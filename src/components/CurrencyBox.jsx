import CurrencySelector from "./CurrencySelector"

export default function CurrencyBox({ textValue, textValue2, handleTextField, currencySymbols, currencies, selectedCurrency1, selectedCurrency2, handleCurrencies }) {

   return (<>
      <div className="currency-box">
         <span className="currency-span">
            <input value={textValue} placeholder="Wert eingeben" onChange={handleTextField} className="blinking"></input>
            <CurrencySelector
               no={1}
               currencySymbols={currencySymbols}
               currencies={currencies}
               selectedCurrency1={selectedCurrency1}
               selectedCurrency2={selectedCurrency2}
               currencyHandler={handleCurrencies}
            />
         </span>

         <span className="currency-span">
            <input value={textValue2 ? textValue2.toFixed(2) : 0} onChange={handleTextField} disabled></input>
            <CurrencySelector
               no={2}
               currencySymbols={currencySymbols}
               currencies={currencies}
               selectedCurrency1={selectedCurrency1}
               selectedCurrency2={selectedCurrency2}
               currencyHandler={handleCurrencies}
            />
         </span>
      </div>
   </>)
}