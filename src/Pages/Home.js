import React from 'react'
import Header from '../Components/Header'
import Banner from '../Components/Banner'
import Jobs from '../Components/Jobs'
import Footer from '../Components/Footer'

function Home() {
    return (
        <div className='flex flex-col'>
            <Banner />
            <Jobs />

        </div>
    )
}

export default Home