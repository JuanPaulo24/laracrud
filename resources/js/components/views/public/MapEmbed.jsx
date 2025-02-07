import React from 'react';

const MapEmbed = () => {
    return (
        <div>
            <h2>Our Church Location</h2>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d15765.258181788256!2d125.54811405234298!3d8.94313519973547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1schurch!5e0!3m2!1sen!2sph!4v1738822969499!5m2!1sen!2sph"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
    );
};

export default MapEmbed;
