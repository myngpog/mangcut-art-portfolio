import { useState, useEffect } from 'react'
import './index.css'
import { CiMail, CiInstagram  } from 'react-icons/ci';
import {ResponsiveMasonry} from "react-responsive-masonry"
import Masonry from "react-responsive-masonry";
import AOS from 'aos';
import 'aos/dist/aos.css';


function App() {

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
      duration: 1500, // animation duration in ms
      once: true,    // animate only once on scroll
    });
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(null);

  const imageUrls = [
    "https://i.pinimg.com/736x/1e/4a/54/1e4a547d834f1b5a3a8555229ec9649c.jpg",
    "https://i.pinimg.com/736x/55/be/50/55be50421b2d121af9d83e10f01db5c2.jpg",
    "https://i.pinimg.com/736x/c1/10/d1/c110d14dae9f9d380e0ad6540f07264f.jpg",
    "https://i.pinimg.com/736x/ab/12/63/ab12633894e50a82cd8c18982b624530.jpg",
    "https://i.pinimg.com/736x/3b/e1/76/3be17636eea2e89de4e8d06d854eb611.jpg",
    // etc.
  ];
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
        <p>Painter & Lover of Sweets</p> {/* customizable */}
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
              <img
                key={index}
                src={url}
                alt={`Artwork ${index}`}
                className="gallery-img"
                data-aos="fade-up"
                data-aos-delay={index * 300}
                onClick={() => {
                  setIsFadingOut(false); 
                  setSelectedIndex(index);
                }}
              />
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
