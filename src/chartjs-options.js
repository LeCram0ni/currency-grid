const options = {
   plugins: {
      legend: {
         display: false, // Hide legend
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
            color: 'rgba(211,217,212, 0.15)', // Gitterfarbe
            lineWidth: 1, // Liniendicke der Gitterlinien
         },
         ticks: {
            stepSize: 0.001, // Hier die Schrittgröße anpassen
            color: "#D3D9D4", // Ändere die Farbe der y-Achsenbeschriftung
            callback: function (value) {
               return value.toFixed(3); // Hier die Anzahl der Nachkommastellen anpassen
            }
         }
      },
      x: {
         grid: {
            color: 'rgba(211,217,212, 0.15)', // Gitterfarbe
            lineWidth: 1, // Liniendicke der Gitterlinien
         },
         ticks: {
            color: "#D3D9D4" // Ändere die Farbe der x-Achsenbeschriftung
         }
      },
   },
};

export default options