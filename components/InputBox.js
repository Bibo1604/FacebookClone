import { useSession } from 'next-auth/react';
import Image from 'next/image'
import React, { useRef, useState } from 'react'

// import icon
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';
import { db, storage } from "../firebase"
import { serverTimestamp, collection, addDoc, setDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'

function InputBox() {
    const { data: session } = useSession();
    const inputRef = useRef(null);
    const filePickerRef = useRef(null);
    const [imageToPost, setImageToPost] = useState(null);

    const sendPost = async (e) => {
        e.preventDefault();

        if (!inputRef.current.value) return;
        
        await addDoc(collection(db, "posts"), {
            message: inputRef.current.value,
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            timestamp: serverTimestamp()
        }).then(async(document) => {
            if (imageToPost) {
                const newFile = await fetch(imageToPost).then(r => r.blob());
                const storageRef = ref(storage, `posts/${document.id}`);
                const uploadTask = uploadBytesResumable(storageRef, newFile);
                removeImage();
                uploadTask.on('state_change', null, error => console.error(error), () => {
                    // When the upload completes
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setDoc(doc(db, 'posts', document.id), {
                            postImage: downloadURL
                        }, {merge: true})
                    })
                })
            }
        })

        inputRef.current.value = "";
    }

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setImageToPost(readerEvent.target.result);
            console.log(imageToPost);
        }
    }

    const removeImage = () => {
        setImageToPost(null);
    }

    return (
        <div className='bg-white -2 rounded-2xl shadow-md text-gray-500 font-medium mt-6'>
            <div className='flex space-x-4 p-4 items-center'>
                <Image className='rounded-full' src={session.user.image} width={40} height={40} alt=''/>
                <form className='flex flex-1'>
                    <input
                        ref={inputRef}
                        type='text'
                        placeholder={`What's on your mind, ${session.user.name}?`}
                        className='rounded-full h-12 bg-gray-200 flex-grow px-5 focus:outline-none'
                    />
                    <button hidden type='submit' onClick={sendPost}>Submit</button>
                </form>
                {imageToPost && (
                    <div onClick={removeImage} className='flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer'>
                        <img src={imageToPost} alt='' className='h-10 object-contain'/>
                        <p className='text-xs text-red-500 text-center'>Remove</p>
                    </div>
                )}
            </div>

            <div className='flex justify-evenly p-3 border-t'>
                <div className='inputIcon'>
                    <VideoCameraIcon className='h-7 text-red-500' />
                    <p className='text-xs sm:text-sm xl:text-base'>Live Video</p>
                </div>

                <div className='inputIcon' onClick={() => filePickerRef.current.click()}>
                    <CameraIcon className='h-7 text-green-400' />
                    <p className='text-xs sm:text-sm xl:text-base'>Photo/Video</p>
                    <input ref={filePickerRef} type='file' hidden onClick={addImageToPost} />
                </div>

                <div className='inputIcon'>
                    <EmojiHappyIcon className='h-7 text-yellow-300' />
                    <p className='text-xs sm:text-sm xl:text-base'>Feeling/Activity</p>
                </div>
            </div>
        </div>
    )
}

export default InputBox