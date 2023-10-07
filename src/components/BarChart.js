import React, { Component } from 'react';

import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';


function BarChart({ chartData}){
return <Bar data = { chartData}/>

}

export default BarChart;



// export default class BarChart extends Component {
//   render() {
//     return (
//       <div>BarChart</div>
//     )
//   }
// }
