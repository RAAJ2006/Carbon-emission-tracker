import React from 'react'

const about = () => {
  return (
    <div className='font-mono text-xl text-gray-400 flex justify-center font-bold items-center mt-20 '>
      <div className='flex flex-row gap-66 justify-around '>
        <div className='font-mono text-2xl flex flex-row gap-40 ml-20'>
        <img 
                src="https://media.giphy.com/media/DaLNDirGxBAM7HjrXN/giphy.gif?cid=ecf05e47jsrfwwkrn3rlrl7sedltm4w1sddor58lgxdfbigj&ep=v1_gifs_search&rid=giphy.gif&ct=g" 
                alt="Exciting GIF 2" 
                style={{ maxWidth: '20%', height: 'auto', borderRadius:'50%', border:"2px"}} // Responsive styling
            />
           <img 
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXdwbXRydGNxc25mcDl1emZxenMzNzJ5YjdkdjdxMzRvaG1pbm13dSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/b5xDLakZRxJ6M/giphy.gif" 
                alt="Exciting GIF" 
                style={{ maxWidth: '30%', height: 'auto', borderRadius:'50%', border:"2px"}} // Responsive styling
            />
        </div>
        <div className='font-mono text-m mr-11'>
          So Welcome to my app How are you guys
        </div>
      </div>
    </div>
  )
}

export default about

