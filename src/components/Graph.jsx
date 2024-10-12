import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Title } from 'chart.js';

import options from "../chartjs-options.js"

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Title);

export default function Graph({ selectedCurrency1, selectedCurrency2, combinedData }) {

   return (<>
      <h3>1 {selectedCurrency1} in {selectedCurrency2}</h3>
      <div className="diagram">
         <Line data={combinedData} options={options} />


         {/*arrowfunction in options. const = ... je nach dark oder light mode andere hintergrundlinien*/}


      </div>
   </>)
}