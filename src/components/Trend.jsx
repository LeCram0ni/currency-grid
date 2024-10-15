export default function Trend({ selectedCurrency1, selectedCurrency2, first, latest }) {

   let trend = (1 - (first / latest)) * 100
   let trendWording = trend > 0 ? <span className="rising">gestiegen</span> : <span className="dropping">gefallen</span>

   return (<>
      <div className="flex line-height-small trend">
         {selectedCurrency1 == selectedCurrency2 ? "Wähle zwei verschiedene Währungen aus!" : (
            <>
               <span className="top-card">
                  <b>{selectedCurrency1}</b> {"=>"} <b>{selectedCurrency2}</b><br />{trendWording}<br /><b>{Math.abs(trend).toFixed(4)}%</b>

               </span>
               <div><h6>letzte 30 Tage</h6></div>
            </>)
         }
      </div>
   </>)
}

/*
<span>
   Der Kurs von <br /><b>{selectedCurrency1}</b> {"=>"} <b>{selectedCurrency2}</b> ist in <br />den letzten 30 Tagen um <b>{Math.abs(trend).toFixed(4)}% {trendWording}</b>
</span> 
               */