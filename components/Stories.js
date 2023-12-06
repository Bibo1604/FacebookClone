import React from 'react'
import StoryCard from './StoryCard'

const stories = [
    {
        name: "Hoang Nguyen",
        src: "/images/stories/1.jpg",
        profile: "/images/avatars/me.jpg"
    },
    {
        name: "Fanny Elisa",
        src: "/images/stories/2.jpg",
        profile: "/images/avatars/1.jpg"
    },
    {
        name: "Geffrey Davis",
        src: "/images/stories/3.jpg",
        profile: "/images/avatars/2.jpg"
    },
    {
        name: "Marty Ricky",
        src: "/images/stories/4.jpg",
        profile: "/images/avatars/3.jpg"
    },
    {
        name: "Neely Lizzy",
        src: "/images/stories/5.jpg",
        profile: "/images/avatars/4.jpg"
    },
]

function Stories() {
    return (
        <div className='flex justify-center space-x-3 mx-auto'>
            {stories.map(story => (
                <StoryCard key={story.src} name={story.name} src={story.src} profile={story.profile}/>
            ))}
        </div>
    )
}

export default Stories