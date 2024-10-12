export default function Trend({ selectedCurrency1, selectedCurrency2, trend, trendWording }) {

   return (<>
      <div className="flex line-height-small">
         {`Der Kurs von ${selectedCurrency1}`}<br />
         {`ist im Verhältnis zu ${selectedCurrency2}`}<br />
         in den letzten 30 Tagen <br />
         {`um ${Math.abs(trend).toFixed(4)}% ${trendWording}`}
      </div>
   </>)
}