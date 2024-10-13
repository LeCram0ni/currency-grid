export default function Trend({ selectedCurrency1, selectedCurrency2, first, latest }) {

   let trend = (1 - (first / latest)) * 100
   let trendWording = trend > 0 ? "gestiegen" : "gefallen"

   return (<>
      <div className="flex line-height-small trend">
         {selectedCurrency1 == selectedCurrency2 ? "Wähle zwei verschiedene Währungen aus!" : (
            <> {`Der Kurs von ${selectedCurrency1}`}<br />
               {`ist im Verhältnis zu ${selectedCurrency2}`}<br />
               in den letzten 30 Tagen <br />
               {`um ${Math.abs(trend).toFixed(4)}% ${trendWording}`}</>)
         }
      </div>
   </>)
}