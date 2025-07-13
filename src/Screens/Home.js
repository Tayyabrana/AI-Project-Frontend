import React from 'react'
import PortalLayout from '../layouts/PortalLayout'
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, } from 'chart.js';


const projects = [
  { name: "Government Contractors", deadline: "12 Oct ,2024" },
  { name: "Project Management", deadline: "20 Oct ,2024" },
  { name: "CMS", deadline: "20 Oct ,2024" }
]

const bug_progress = [
  { name: "Login issue", time: "12 Oct 2024", assigned: "Nouman Arshad" },
  { name: "Sign-Up issue", time: "2 Oct 2024", assigned: "Haseeb Mazhar" },
  { name: "API service", time: "20 sept 2024", assigned: "Bilal Mustafa" },
  { name: "Middleware issue", time: "22 sept 2024", assigned: "Haroon Rana" },
  { name: "Clients Data", time: "28 sept 2024", assigned: "Faraz Ali " },
]
const task_progress = [
  { name: "Complete the Forms", time: "12 Oct 2024", assigned: "Nouman Arshad" },
  { name: "Connect all the API", time: "2 Oct 2024", assigned: "Haseeb Mazhar" },
  { name: "Apply regex and errors", time: "20 sept 2024", assigned: "Bilal Mustafa" },
]

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const Home = () => {
  const data = {
    labels: ['Girls', 'Boys'],
    datasets: [{
      label: 'Weekly Users',
      data: [40, 60],
      backgroundColor: [
        '#FF2D38',
        'black',
      ],
      hoverOffset: 4
    }]
  };
  const Utils = {
    days: ({ count }) => {
      const days = ['Monaday', 'Tuesdsay', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      return days.slice(0, count);
    },
    rand: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    CHART_COLORS: {
      blue: '#FF2D38',
      red: 'black',

    }
  };
  const DATA_COUNT = 7;

  const labels = Utils.days({ count: DATA_COUNT });
  const chart_data = {
    labels: labels,
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          pointStyle: 'circle', // makes the legend box round like a dot
        },
      },
    },
    datasets: [
      {
        label: 'Boys',
        data: [[0, 50], [0, 60], [0, 150], [0, 80], [0, 90], [0, 150], [0, 80]],
        backgroundColor: Utils.CHART_COLORS.red,
        borderRadius: 5, // makes bars rounded like dots
        barThickness: 20, // control thickness to make it circular-ish
        categoryPercentage: 0.5, // gap between groups
        barPercentage: 0.5 
      },
      {
        label: 'Girls',
        data: [[0, 100], [0, 40], [0, 120], [0, 80], [0, 140], [0, 60], [0, 80]],
        backgroundColor: Utils.CHART_COLORS.blue,
        borderRadius: 5,
        barThickness: 20,
        categoryPercentage: 0.5, // gap between groups
        barPercentage: 0.5 
      },
    ]
  };
  


  return (
    <div className=' w-[100%]'>
      <div className=''>
        <div className='grid grid-cols-3 gap-4 '>
          <div className='col-span-2 bg-white rounded-xl shadow-md'>
            <div className=' flex flex-col gap-3 py-6 px-4 h-full'>
              <div
                className='font-semibold text-primary text-3xl text-center mx-auto'>Overview
              </div>
              <div className='grid grid-cols-3 gap-3 text-center justify-center mt-2 px-3 h-full'>
                <div
                  className='flex flex-col gap-3 p-4 rounded-xl bg-white border'>
                  <div className='text-gray-700 font-[500] text-left'>Today Users</div>
                  <div className=' text-4xl text-gray-900 font-[600]'>10</div>
                </div>

                <div
                  className='flex flex-col gap-3 p-4 rounded-xl bg-white border'>
                  <div className='text-gray-700 font-[500] text-left'>Weekkly Users</div>
                  <div className=' text-4xl text-gray-900 font-[600]'>27</div>
                </div>
                <div
                  className='flex flex-col gap-3 p-4 rounded-xl bg-white border'>
                  <div className='text-gray-700 font-[500] text-left'>Monthly Users</div>
                  <div className=' text-4xl text-gray-900 font-[600]'> 135</div>
                </div>
              </div>
            </div>
          </div>
          <div className=' col-span-1 bg-white rounded-xl shadow-md'>
            <div className=' flex flex-col gap-3 py-6 px-4'>
              <div
                className='font-semibold text-black text-left text-xl'> Projects in Pipeline
              </div>
              <table>
                <tbody className={`flex flex-col gap-2 mt-2`}>
                  {projects?.map((val, i) => (
                    <tr key={i} className="text-black text-sm w-full bg-gray-500 bg-opacity-10 rounded-lg">
                      <td className="py-2 w-[2%] px-2 text-center text-gray-800 font-medium">
                        {val.name}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>


        <div className=' grid grid-cols-3 gap-4 mt-5'>
          <div className=' bg-white rounded-xl shadow-md p-5 col-span-1'>
            <div className='text-center font-semibold text-xl'> Projects Tracking </div>
            <div className='mt-2' >  <Doughnut data={data} /> </div>

          </div>
          <div className=' bg-white rounded-xl shadow-md p-5 col-span-2'>
            <div className='text-center font-semibold text-xl'> Weekly Progress </div>
            <div className='mt-2' >
              <Bar data={chart_data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
