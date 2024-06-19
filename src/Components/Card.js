import React from 'react'
import { Link } from 'react-router-dom'

function Card({ data }) {
  return (



    <div class="max-w-sm  flex flex-col justify-between bg-white max-h-86 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p">

      <div class="p-5">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.title}</h5>
        </a>
        <p className='tracking-tight text-gray-900 dark:text-white text-md'>{data.company}</p>

        <p className='tracking-tight text-gray-900 dark:text-white'>{data.experience}  |  {data.location}</p>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{(data.description).slice(0, 100) + "..."}</p>
        <p className='tracking-tight text-gray-900 dark:text-white'>{(data.technologies).slice(0, 30) + "..."}</p>
      </div>
      <div class="p-3">
        <Link to={`job-detail/${data.id}`} class="inline-flex items-center px-3 py-2 mt-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <button>Read more</button>
          <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </Link>
      </div>
    </div>


  )
}

export default Card