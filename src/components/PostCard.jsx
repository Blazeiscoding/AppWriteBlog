import React, { useState, useEffect } from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imageURL = appwriteService.getFilePreview(featuredImage);
                setImage(imageURL.toString()); // Convert URL object to string
            } catch (error) {
                console.error('Error fetching image:', error);
                setError('Failed to load image');
            }
        };

        fetchImage();
    }, [featuredImage]);

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    {image ? (
                        <img src={image} alt={title} className='rounded-xl' />
                    ) : (
                        <div className='rounded-xl bg-gray-200' style={{ height: '200px' }}>
                            {error && <p>{error}</p>}
                        </div>
                    )}
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;
