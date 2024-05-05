import { useRouter } from 'next/router';
import { useEffect } from 'react';
import DisplayLottie from '../Components/displayLottie/DisplayLottie';
import cargenc from "../../public/lottie/puntitos"

function Landing() {

 const router = useRouter();

 useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push('/pages/login');
    }, 3000);
    
    return () => clearTimeout(redirectTimer); 

 }, [router])


 return (

    <div>
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", }}>
        <img src="/fondos/fonde.jpg" alt="Fondo de la página" style={{ width: "100%", height: "100%", objectFit: "center" }} />
        <div style={{ position: "absolute", top: -140, left: 680, }}>
          <img src='logos/opsnf.png' alt="Logo" /> {/* Añade propiedad 'alt' */}
        </div>
      </div>
      <div style={{
        left: "715px",
        top: "620px",
        position: "fixed",
      }}>
        <DisplayLottie animationData={cargenc} />
      </div>
    </div>
 );
}

export default Landing;