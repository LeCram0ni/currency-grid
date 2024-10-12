import CurrencySelector from "./CurrencySelector"

export default function CurrencyBox({ textValue, textValue2, handleTextField, currencySymbols, currencies, selectedCurrency1, selectedCurrency2, currencyHandler }) {

   return (<>
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
   </>)
}