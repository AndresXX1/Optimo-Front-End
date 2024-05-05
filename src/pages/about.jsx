import Layout from "./layuot"

function About () {

    return (
        <div>
            <div>
                <Layout/>
            </div>

            <div style={{
                left: "220px",
                top: "200px",
                position:"absolute",
                fontSize: "20px"
            }}>
         <h1> ¿Que es Optimo?</h1>
            </div>

            <div style={{
                width: "500px",
                fontSize: "18px",
                position: "absolute",
                marginLeft:"300px",
                top: "300px"
            }}>
                <h4>Óptimo nos da la capacidad de visualizar y gestionar el espacio,
                     ya que es esencial para crear lugares de trabajo atractivos, 
                     productivos y rentables. Por este motivo,
                      el software de gestión de espacios Óptimo es la base de toda gestión de instalaciones.
                       Óptimo reúne los planos de planta en una única pantalla interactiva para una planificación del espacio más eficiente.</h4>

            </div>
                       <div style={{
                width: "500px",
                fontSize: "18px",
                position:"absolute",
                marginLeft:"400px",
                top: "450px"
            }}>
                      <h4> El mejor software de gestión del espacio captura datos de múltiples fuentes,
                        incluidos los sensores de Internet de las cosas (IoT), para proporcionar datos sobre la ocupación en tiempo real.
                         Los líderes del lugar de trabajo pueden usarlo para mejorar la utilización del espacio, 
                         reducir los costos inmobiliarios, planificar mudanzas fácilmente, ayudar a los empleados a navegar por el lugar de trabajo, 
                         administrar reservas de oficinas, salas de junta, parqueaderos, consultorios y más.</h4>
                        </div> 
        </div>
    )
}

export default About