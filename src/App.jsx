import { useState, useEffect } from 'react'
import './index.css'
import { CiMail, CiInstagram  } from 'react-icons/ci';
import {ResponsiveMasonry} from "react-responsive-masonry"
import Masonry from "react-responsive-masonry";
import AOS from 'aos';
import 'aos/dist/aos.css';


function App() {
  {/* VAR CHANGES */}
  const [cmsData, setCmsData] = useState(null);

  useEffect(() => {
    const fetchCMS = async () => {
      const res = await fetch(import.meta.env.VITE_CMS_URL);
      const data = await res.json();
      console.log("CMS Data:", data);
      setCmsData(data);
    };

    fetchCMS();
  }, []);
  

  useEffect(() => {
    const header = document.querySelector(".scroll-header");
  
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add("header-visible");
      } else {
        header.classList.remove("header-visible");
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1500, 
      once: true,  
    });
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(null);

  const imageUrls = [...(cmsData?.images || [])].reverse();

  const currentImage = selectedIndex !== null ? imageUrls[selectedIndex] : null;
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleClose = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setSelectedIndex(null);
      setIsFadingOut(false);
    }, 300);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
  };
  
  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % imageUrls.length);
  };

  return (
    <>
      <header className="scroll-header">
        <nav className="nav-links">
            <a href="mailto:mang.illust@gmail.com"><CiMail /></a>
            <a href="https://www.instagram.com/mangcuts/" target="blank"><CiInstagram /></a>
        </nav>
      </header>
      <div className="hero"> 
        <h1>Tam Nguyen</h1> {/* change */}
        <p>Painter and Lover of Sweets</p> {/* customizable */}
        <nav className="nav-links">
            <a href="mailto:mang.illust@gmail.com"><CiMail /></a>
            <a href="https://www.instagram.com/mangcuts/" target="blank"><CiInstagram /></a>
        </nav>
      </div>
      <div className="gallery">
        <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1200: 4, 1500: 5, }}
        >
          <Masonry>
          {imageUrls.map((url, index) => (
            <div key={index} className="gallery-item" data-aos="fade-up" data-aos-delay={index * 300}>
              <img
                src={url}
                alt={`Artwork ${index}`}
                className="gallery-img"
                onClick={() => {
                  setIsFadingOut(false); 
                  setSelectedIndex(index);
                }}
              />
            </div>
          ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>

      {(selectedIndex !== null || isFadingOut) && (
        <div className={`lightbox ${isFadingOut ? 'fade-out' : ''}`} onClick={handleClose}>
          <button className="nav-arrow left" onClick={(e) => handlePrev(e)}>&#10094;</button>
          <img src={imageUrls[selectedIndex]} alt="Full View" className="lightbox-img" />
          <button className="nav-arrow right" onClick={(e) => handleNext(e)}>&#10095;</button>
        </div>
      )}
    </>
  );
}

export default App;
