import React from 'react'
import Contact from './Contact'

// import icon
import { SearchIcon } from '@heroicons/react/outline'
import { DotsHorizontalIcon, VideoCameraIcon } from '@heroicons/react/solid'

const contacts = [
    {src: "/images/avatars/1.jpg", name: "Fanny Elisa"},
    {src: "/images/avatars/2.jpg", name: "Geffrey Davis"},
    {src: "/images/avatars/3.jpg", name: "Marty Ricky"},
    {src: "/images/avatars/4.jpg", name: "Neely Lizzy"},
    {src: "/images/avatars/5.jpg", name: "Andie Bryan"},
    {src: "/images/avatars/6.jpg", name: "Tracie Lavern"},
    {src: "/images/avatars/7.jpg", name: "Denver Kash"},
]

function Widgets() {
  return (
    <div className='hidden lg:flex flex-col w-60 p-2 mt-5'>
        <div className='flex justify-between items-center text-gray-500 mb-5'>
            <h2 className='text-xl'>Contacts</h2>
            <div className='flex space-x-2'>
                <VideoCameraIcon className='h-6'/>
                <SearchIcon className='h-6'/>
                <DotsHorizontalIcon className='h-6'/>
            </div>
        </div>

        {contacts.map(contact => (
            <Contact key={contact.src} src={contact.src} name={contact.name}/>
        ))}
    </div>
  )
}

export default Widgets