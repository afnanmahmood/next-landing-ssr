// components/Card.js
import React from "react";

const Card = (props) => {
    const {
        title, 
        body, 
        id
    } = props

    return (
        <div className="p-6 border rounded-lg shadow-sm bg-white hover:shadow-lg transition-shadow flex flex-col">
            <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-2">{body}</p>
            <span className="mt-auto text-sm text-gray-500">Post ID: {id}</span>
        </div>
    );
};

export default Card;