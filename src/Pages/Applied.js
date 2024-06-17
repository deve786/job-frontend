import React, { useEffect, useState } from 'react'
import { deleteAppliedJob, deleteAppliedJobApi, fetchAppliedJob, fetchAppliedJobApi } from '../services/allAPI'

function Applied() {
    const [applied, setApplied] = useState([])

    const fetchApply=async()=>{
        const data=await fetchAppliedJobApi()
        console.log(data.data);
        setApplied(data.data)
    }

    const handleDelete=async(id)=>{
        const data=await deleteAppliedJobApi(id)
        fetchApply()
        console.log(data);
        
    }

    useEffect(() => {
      fetchApply()
    }, [])
    
  return (
    <div className='p-3'>
        {
            applied.length>0 ?
                applied.map(apply => (
                    <div key={apply.id} className='mt-10 border py-4 px-6 shadow-lg'>
                        <div className='flex justify-between'>
                            <div className='font-semibold'>
                                {apply.title}
                            </div>
                            <div className='flex gap-3'>
                                <button onClick={()=>{handleDelete(apply.id)}} className=' border py-1 px-8 rounded-2xl hover:bg-gray-200 bg-red-400 hover:bg-red-500'>Delete</button>
                            </div>
                        </div>
                    </div>
                ))
                :
                <h1 className='font-semibold text-xl'>No Jobs Applied</h1>
            }
    </div>
  )
}

export default Applied