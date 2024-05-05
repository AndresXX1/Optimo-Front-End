import { useState } from 'react';
import { useRouter } from 'next/router';
import { Navbar, Nav } from 'react-bootstrap';
import { IoMenuSharp } from 'react-icons/io5';
import { BsChevronDown } from 'react-icons/bs';
import Link from 'next/link';

export default function NavBar() {
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionClick = (path) => {
    setShowOptions(false);
    router.push(path);
  };

  const isActive = (path) => {
    return router.pathname === path ? 'active' : '';
  };

  return (
    <Navbar bg="light" expand="lg" fixed="top" style={{ backgroundColor: '#f8f9fa',height:"75px" }}>
    <Link href="/">
      <div style={{
        marginLeft: "40px",
        display: "inline-block", 
        position: "absolute", 
        overflow: "hidden", 
        transition: "transform 0.3s"
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
      onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        <img 
          style={{
            width: "100%", 
            height: "70px", 
            display: "block", // lo agrege para eliminar el espacio debajo de la imagen
            padding: "4px 12px",
            marginTop: "2px",
          }}
          src="/images/logosinfondo.jpg"
          alt="Logo"
        />
      </div>
    </Link>

      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>


        <button
  style={{
    border: "none",
    background: "none",
    padding: "10px", // Ajusta el padding para aumentar el área activa
    cursor: "pointer",
  }}
>
  <Nav.Link 
    style={{
      marginLeft: "1650px",
      position: "absolute",
      fontSize: "20px",
      textDecoration: "none",
      color: "inherit",
      top: "30px",
      transition: "transform 0.3s",
      display: "block"
    }}
    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.2)"}
    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
    href="Cliente/Explorar" 
    className={isActive('Explorar')}
  >
    <span style={{ fontFamily: 'Arial', color: 'black' }}>Explorar</span>
  </Nav.Link>
</button>

<button
  style={{
    border: "none",
    background: "none",
    padding: "10px", // Ajusta el padding para aumentar el área activa
    cursor: "pointer",
  }}
>
  <Nav.Link 
    style={{
      marginLeft: "1320px",
      position: "absolute",
      fontSize: "20px",
      textDecoration: "none",
      color: "inherit",
      top: "30px",
      transition: "transform 0.3s",
      display: "block"
    }}
    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.2)"}
    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
    href="/Cliente" 
    className={isActive('Explorar')}
  >
    <span style={{ fontFamily: 'Arial', color: 'black' }}>Inicio</span>
  </Nav.Link>
</button>

<button
  style={{
    border: "none",
    background: "none",
    padding: "10px", // Ajusta el padding para aumentar el área activa
    cursor: "pointer",
  }}
>
  <Nav.Link 
    style={{
      marginLeft: "1400px",
      position: "absolute",
      fontSize: "20px",
      textDecoration: "none",
      color: "inherit",
      top: "30px",
      transition: "transform 0.3s",
      display: "block"
    }}
    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.2)"}
    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
    href="Cliente/about" 
    className={isActive('about')}
  >
    <span style={{ fontFamily: 'Arial', color: 'black' }}>¿Quienes Somos?</span>
  </Nav.Link>
</button>

          <div style={{
             position: 'relative',
             top:"15px",
             marginBottom:"10px",
             
              }}>

            
            <IoMenuSharp 
            
            size={24} onClick={() =>  setShowOptions(!showOptions)} style={{ marginBottom:"20px",marginTop:"-18px",marginLeft: '1800px', cursor: 'pointer',position:"absolute", }} />
            {showOptions && (
              <div style={{ width:"220px", position: 'absolute', top: '40px', left: "1620px", backgroundColor: 'transparent', boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)', zIndex: 1,borderRadius: "10px",height:"auto" }}>
                <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
                  <li onClick={() => handleOptionClick('/Cliente/register')} style={{fontFamily: 'Arial', cursor: 'pointer', padding: '15px 16px 10px 30px', borderBottom: '1px solid #e0e0e0',height:"30px" }}>Regístrate</li>
                  <li onClick={() => handleOptionClick('/Cliente/registerEmp')} style={{fontFamily: 'Arial', cursor: 'pointer', padding: '8px 16px', borderBottom: '1px solid #e0e0e0' }}>Regístrate como Empersa</li>
                  <li onClick={() => handleOptionClick('/Cliente/Help')} style={{fontFamily: 'Arial', cursor: 'pointer', padding: '8px 16px', borderBottom: '1px solid #e0e0e0' }}>Centro de ayuda</li>
                  <li onClick={() => handleOptionClick('/Cliente/contact')} style={{fontFamily: 'Arial', cursor: 'pointer', padding: '8px 16px', borderBottom: '1px solid #e0e0e0' }}>Contactanos</li>
                  <li onClick={() => handleOptionClick('/Cliente/login')} style={{fontFamily: 'Arial', cursor: 'pointer', padding: '8px 16px' }}>Inicia Sesión</li>
                  <li onClick={() => handleOptionClick('/Cliente/config')} style={{fontFamily: 'Arial', cursor: 'pointer', padding: '8px 16px' }}>Configuraciones</li>
                  <li onClick={() => handleOptionClick('/Cliente/controlPanel')} style={{fontFamily: 'Arial', cursor: 'pointer', padding: '8px 16px' }}>Panel de usuario</li>
                  <li  style={{fontFamily: 'Arial', cursor: 'pointer', padding: '8px 16px' }}>Cerrar session</li>
                </ul>
              </div>
            )}
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}