"use client";

import React from "react";

const WhatsAppFloating = () => {
    const phoneNumber = "919876543210";
    const message = "Hello, I want to know more about your services.";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
    )}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 shadow-lg hover:scale-110 transition-transform duration-300"
            aria-label="Chat on WhatsApp"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="white"
                className="w-7 h-7"
            >
                <path d="M16 .4C7.4.4.4 7.4.4 16c0 2.8.7 5.5 2.1 7.9L0 32l8.3-2.2c2.3 1.2 4.9 1.8 7.7 1.8 8.6 0 15.6-7 15.6-15.6S24.6.4 16 .4zm0 28.6c-2.4 0-4.8-.7-6.9-2l-.5-.3-4.9 1.3 1.3-4.8-.3-.5C3.6 20.8 3 18.4 3 16 3 8.8 8.8 3 16 3s13 5.8 13 13-5.8 13-13 13zm7.2-9.8c-.4-.2-2.2-1.1-2.6-1.2-.4-.1-.7-.2-1 .2s-1.1 1.2-1.3 1.4-.5.3-.9.1c-2.4-1.2-4-2.2-5.6-4.9-.4-.6.4-.6 1.2-2.1.1-.2.1-.5 0-.7s-1-2.4-1.3-3.2c-.3-.8-.6-.7-1-.7h-.9c-.3 0-.7.1-1 .5s-1.4 1.4-1.4 3.4 1.5 3.9 1.7 4.2c.2.3 3 4.6 7.3 6.4 2.7 1.2 3.7 1.3 5 1.1.8-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.2-.4-.3-.8-.5z" />
            </svg>
        </a>
    );
};

export default WhatsAppFloating;