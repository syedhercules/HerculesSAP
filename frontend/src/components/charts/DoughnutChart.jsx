// // src/components/charts/DoughnutChart.jsx
// import React from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

// ChartJS.register(ArcElement, Tooltip, Legend, Title);

// const data = {
//   labels: ['Flour', 'Bran', 'Screenings'],
//   datasets: [
//     {
//       data: [70, 20, 10],
//       backgroundColor: ['#4ade80', '#60a5fa', '#facc15'],
//     },
//   ],
// };

// const options = {
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: {
//     legend: {
//       position: 'right',
//     },
//     title: {
//       display: true,
//       // text: 'Milling Output Ratio',
//       font: {
//         size: 16,
//       },
//     },
//   },
// };

// export default function DoughnutChart() {
//   return (
//     <div className="h-52 w-full flex items-center justify-center">
//       <Doughnut data={data} options={options} />
//     </div>
//   );
// }



// // src/components/charts/DoughnutChart.jsx
// import React, { useRef, useEffect, useState } from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

// ChartJS.register(ArcElement, Tooltip, Legend, Title);

// export default function DoughnutChart() {
//   const chartRef = useRef();
//   const [gradient, setGradient] = useState([]);

//   useEffect(() => {
//     const chart = chartRef.current;
//     if (!chart) return;

//     const ctx = chart.ctx;
//     const grad = ctx.createLinearGradient(0, 0, 200, 200);
//     grad.addColorStop(0, '#34d399'); // emerald
//     grad.addColorStop(1, '#064e3b'); // deep green

//     setGradient([grad, grad, grad]);
//   }, []);

//   const data = {
//     labels: ['Flour', 'Bran', 'Screenings'],
//     datasets: [{ data: [70, 20, 10], backgroundColor: gradient }],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: 'right' },
//       title: { display: true, font: { size: 16 } },
//     },
//   };

//   return (
//     <div className="h-52 w-full flex items-center justify-center">
//       <Doughnut ref={chartRef} data={data} options={options} />
//     </div>
//   );
// }







// import React, { useRef, useEffect, useState } from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

// ChartJS.register(ArcElement, Tooltip, Legend, Title);

// export default function DoughnutChart() {
//   const chartRef = useRef();
//   const [gradient, setGradient] = useState([]);

//   useEffect(() => {
//     const chart = chartRef.current;
//     if (!chart) return;

//     const ctx = chart.ctx;
//     const grad = ctx.createLinearGradient(0, 0, 200, 200);
//     grad.addColorStop(0, '#34d399'); // emerald
//     grad.addColorStop(1, '#064e3b'); // deep green

//     setGradient([grad, grad, grad]);
//   }, []);

//   const data = {
//     labels: ['Flour', 'Bran', 'Screenings'],
//     datasets: [
//       {
//         data: [70, 20, 10],
//         backgroundColor: gradient,
//         borderColor: '#0f172a',
//         borderWidth: 2,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'right',
//         labels: {
//           color: '#00ffff', // 💡 Neon cyan legend text
//           font: {
//             weight: 'bold',
//             size: 13,
//           },
//         },
//       },
//       title: {
//         display: true,
//         // text: 'Milling Output Ratio',
//         color: '#67e8f9',
//         font: { size: 16 },
//       },
//     },
//   };

//   return (
//     <div className="h-52 w-full flex items-center justify-center">
//       <Doughnut ref={chartRef} data={data} options={options} />
//     </div>
//   );
// }






// import React, { useRef, useEffect, useState } from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   Title,
// } from 'chart.js';

// ChartJS.register(ArcElement, Tooltip, Legend, Title);

// export default function DoughnutChart() {
//   const chartRef = useRef();
//   const [gradient, setGradient] = useState([]);

//   const labels = ['Flour', 'Bran', 'Screenings'];

//   useEffect(() => {
//     const chart = chartRef.current;
//     if (!chart) return;

//     const ctx = chart.ctx;
//     const grad = ctx.createLinearGradient(0, 0, 200, 200);
//     grad.addColorStop(0, '#34d399'); // light green
//     grad.addColorStop(1, '#064e3b'); // dark green
//     setGradient([grad, grad, grad]);
//   }, []);

//   const data = {
//     labels,
//     datasets: [
//       {
//         data: [70, 20, 10],
//         backgroundColor: gradient,
//         borderWidth: 1,
//       },
//     ],
//   };

// const centerTextPlugin = {
//   id: 'centerText',
//   beforeDraw(chart) {
//     const { width, height } = chart;
//     const ctx = chart.ctx;
//     ctx.save();

//     const text = `Materials: ${chart.data.labels.length}`;
//     const fontSize = Math.min(width, height) / 16;
//     ctx.font = `${fontSize}px monospace`;
//     ctx.fillStyle = '#00ffff';
//     ctx.textAlign = 'center';
//     ctx.textBaseline = 'middle';

//     const x = width / 3;
//     const y = height / 2;

//     ctx.fillText(text, x, y);
//     ctx.restore();
//   },
// };


//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'right',
//         labels: { color: '#67e8f9' },
//       },
//       title: {
//         display: false,
//       },
//     },
//   };

//   return (
//     <div className="h-52 w-full flex items-center justify-center">
//       <Doughnut
//         ref={chartRef}
//         data={data}
//         options={options}
//         plugins={[centerTextPlugin]}
//       />
//     </div>
//   );
// }








import React, { useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart() {
  const chartRef = useRef();

  const labels = ['Flour', 'Bran', 'Screenings'];

  // Base blue color
  const baseColor = [59, 130, 246]; // Tailwind blue-500

  const createShade = (opacity) =>
    `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${opacity})`;

  const shades = labels.map((_, i) =>
    createShade(0.3 + (0.7 * (i + 1)) / labels.length)
  );

  const data = {
    labels,
    datasets: [
      {
        data: [15, 10, 5],
        backgroundColor: shades,
        borderColor: '#0f172a', // match dark theme
        borderWidth: 2,
      },
    ],
  };

  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw(chart) {
      const { width, height } = chart;
      const ctx = chart.ctx;
      ctx.save();
      const text = `Total Materials ${labels.length}`;
      ctx.font = `${Math.min(width, height) / 20}px monospace`;
      ctx.fillStyle = '#00ffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, width / 2, height / 2);
      ctx.restore();
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="h-64 w-full flex items-center justify-center bg-[#1e293b] rounded-xl">
      <Doughnut
        ref={chartRef}
        data={data}
        options={options}
        plugins={[centerTextPlugin]}
      />
    </div>
  );
}
