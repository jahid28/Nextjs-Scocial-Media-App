import React from 'react'
import Image from 'next/image'
const notfound = () => {
  return (
    <div>

<h1 className='text-5xl font-bold text-center mt-5 mb-5'>Page not found</h1>

<div className='grid place-items-center w-[100vw]'>

<Image className='justify-center w-[50vw]' height={"200"} width={"500"} src={"/404.jpg"}></Image>
</div>
      
    </div>
  )
}

export default notfound
