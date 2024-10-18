/* eslint-disable no-unused-vars */
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Title);

export default function Graph({ selectedCurrency1, selectedCurrency2, dataArray, dateArray, highest, lowest, isDarkMode }) {

   const bgColorD = "#0B0C10"
   const fontColorD = "#D3D9D4"
   const mainColorD = "#272f35"
   const secondaryColorD = "#66FCF1"
   const highlightColorD = "#124E66"

   const bgColor = "#f0f1f5"
   const fontColor = "#262c27"
   const mainColor = "#d7dde4"
   const secondaryColor = "#0092cc"
   const highlightColor = "#97e2ff"

   let gridColor;
   let graph;
   let toolTipBG;
   let toolTipFontColor;
   let legend;

   if (isDarkMode) {
      gridColor = "rgba(255,255,255,0.18)"
      graph = secondaryColorD
      toolTipBG = bgColorD
      toolTipFontColor = secondaryColorD
      legend = fontColorD

   } else {
      gridColor = "rgba(0,0,0,0.25)"
      graph = secondaryColor
      toolTipBG = bgColor
      toolTipFontColor = secondaryColor
      legend = fontColor
   }

   let rangeVal = 0.1
   let steps = 11.5

   const combinedData = {
      labels: dateArray,
      datasets: [
         {
            data: dataArray,
            borderColor: graph,
            tension: 0.2,
            borderWidth: 2.5,
            pointRadius: 2,
         }
      ],
   };

   const calculateStepSizeInPercentage = (lowest, highest) => {
      const range = highest - lowest;
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
                  return value.toFixed(5);
               },
            },
            // Tooltip-Optionen
            backgroundColor: toolTipBG,
            titleColor: toolTipFontColor,
            bodyColor: toolTipFontColor,
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
               color: legend, // Ändere die Farbe der y-Achsenbeschriftung
               callback: function (value) {
                  return value.toFixed(5); // Hier die Anzahl der Nachkommastellen anpassen
               }
            }
         },
         x: {
            grid: {
               color: gridColor, // Gitterfarbe
               lineWidth: 1, // Liniendicke der Gitterlinien
            },
            ticks: {
               color: legend // Ändere die Farbe der x-Achsenbeschriftung
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