
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Title);

export default function Graph({ selectedCurrency1, selectedCurrency2, combinedData, highest, lowest, isDarkMode }) {

   //"EUR", "USD", "GBP", "CHF", "CZK", "DKK", "HUF", "NOK", "PLN", "RON", "SEK", "JPY", "CNY"

   let rangeVal = 0.1;
   let steps = 11.5

   let gridColor = "white";

   if (isDarkMode) {
      gridColor = "rgba(255,255,255,0.18)"
   } else {
      gridColor = "rgba(255,255,255,0.55)"
   }

   const calculateStepSizeInPercentage = (lowest, highest) => {
      const range = highest - lowest;
      console.log(range)
      rangeVal = range * (1 / steps)
      return rangeVal
   };

   const stepSize = calculateStepSizeInPercentage(lowest, highest);

   const options = {
      plugins: {
         legend: {
            display: false,
         },
         tooltip: {
            displayColors: false,
            callbacks: {
               label: function (tooltipItem) {
                  const value = parseFloat(tooltipItem.raw);
                  return value.toFixed(4);
               },
            },
            // Tooltip-Optionen
            backgroundColor: 'rgba(211,217,212, 1)',
            titleColor: '#000',
            bodyColor: '#000',
            borderColor: 'rgba(211,217,212, 1)',
            borderWidth: 1,
            // Schriftart für Tooltip
            titleFont: {
               size: 16, // Schriftgröße für den Titel
               weight: '400', // Schriftstärke für den Titel
               family: 'Arial', // Schriftfamilie für den Titel
            },
            bodyFont: {
               size: 18, // Schriftgröße für den Inhalt
               weight: 'bold', // Schriftstärke für den Inhalt
               family: 'Arial', // Schriftfamilie für den Inhalt
            },
         },
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
         y: {
            beginAtZero: false,
            grid: {
               color: gridColor, // Gitterfarbe
               lineWidth: 1, // Liniendicke der Gitterlinien
            },
            ticks: {
               stepSize: stepSize, // Hier die Schrittgröße anpassen
               color: "#D3D9D4", // Ändere die Farbe der y-Achsenbeschriftung
               callback: function (value) {
                  return value.toFixed(3); // Hier die Anzahl der Nachkommastellen anpassen
               }
            }
         },
         x: {
            grid: {
               color: gridColor, // Gitterfarbe
               lineWidth: 1, // Liniendicke der Gitterlinien
            },
            ticks: {
               color: "#D3D9D4" // Ändere die Farbe der x-Achsenbeschriftung
            }
         },
      },
   }

   return (
      <>
         <h3>1 {selectedCurrency1} in {selectedCurrency2}</h3>
         <div className="diagram">
            <Line
               data={combinedData}
               options={options}
            />
         </div>
      </>
   );
}