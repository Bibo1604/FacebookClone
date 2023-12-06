import { db } from '@/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import Post from './Post';

function Posts() {
    const postsRef = collection(db, 'posts');
    const [realtimePosts] = useCollection(
        query(postsRef, orderBy("timestamp", "desc")),
        // collection(db, 'posts'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    return (
        <div>
            {realtimePosts && (
                <div>
                    {realtimePosts.docs.map((post) => (
                        <Post 
                            key={post.id}
                            name={post.data().name}
                            message={post.data().message}
                            email={post.data().email}
                            timestamp={post.data().timestamp}
                            image={post.data().image}
                            postImage={post.data().postImage}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Posts