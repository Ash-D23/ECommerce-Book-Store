import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Slider from '../Components/Slider/Slider';
import Categories from '../Components/Categories/Categories';
import Products from '../Components/Products/Products';
import Newsletter from '../Components/Newsletter/Newsletter';
import Footer from '../Components/Footer/Footer';

function Home() {
    return (
        <div>
            <Navbar/>
            <Slider/>
            <Categories />
            <Products />
            <Footer />
        </div>
    )
}

export default Home
