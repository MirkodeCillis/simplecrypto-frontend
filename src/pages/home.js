import React, {useEffect, useState} from 'react';
import bulmaCarousel from 'bulma-carousel/dist/js/bulma-carousel.min.js';

export default function Home() {
    const [isLoaded, setLoaded] = useState(false);
    useEffect(() => {
        bulmaCarousel.attach('#homecarousel', {
            slidesToScroll: 1,
            slidesToShow: 1,
            autoplay: true,
            loop: true,
            duration: 1500,
            navigation: true,
            autoplaySpeed: 7000,
        });
        setLoaded(true);
    }, [isLoaded]);

    return isLoaded && (
        <div>
            <div className='carousel carousel-animated carousel-animate-slide'>
                <div className='carousel-container carouselhome' id="homecarousel">
                    <img className="item-1" src="img/slide1.webp" alt="Benvenutə in SimpleCrypto"/>
                    <img className="item-2" src="img/slide2.webp"
                         alt="Chatta con tutti nella room globale... ...oppure entra in una room privata con i tuoi amici"/>
                    <img className="item-3" src="img/slide3.webp"
                         alt="La privacy è importante per noi. Oltre a una connessione sicura, i messaggi non saranno salvati da noi &quot;Quello che accade nella room rimane nella room&quot;"/>
                    <img className="item-3" src="img/slide4.webp"
                         alt="CARMINE CONVERSANO (Capo Chef) MIRKO DE CILLIS (Inserviente)"/>
                </div>
            </div>
        </div>
    );
}
