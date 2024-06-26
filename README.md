# OPTIMO (FrontEnd)

* 💬 App de gestion de espacios edilicios
* 🛠️ Intuitiva y de facil recorrido para el administrador
* 📁 Soporta la subida y bajada de datos
* 🪟 Realizada con Node.js, React, Redux toolkit, axios, Next y estilada con material UI

 <img width="1459" alt="スクリーンショット 2023-11-20 2 23 51" src="https://github.com/AndresXX1/back-pf-hoteles/blob/main/images/Imagen%20de%20WhatsApp%202024-01-24%20a%20las%2019.10.42_a6838362.jpg"> 

## 🌟 Quick Start

1. 👤 Recorda que para loguearte necesitas un usuario administrador, para ello contactate con migo :D 

<a href="https://www.linkedin.com/in/andres-vera-676414281/" target="_blank">
<img src=https://img.shields.io/badge/linkedin-%231E77B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white alt=linkedin style="margin-bottom: 5px;" />
</a> 

2. 🔑 cambia las rutas de las actions por las rutas de tu base de datos local

3. ⬇️ Clona el repositorio

    ```bash
    $ git clone https://github.com/AndresXX1/P.F-Front/
    ```

4. 📦 Instala dependencias

    ```bash
    $ npm install
    ```

5. 🔑 Cambia las rutas de las actions por tus rutas locales en actions.js

ej:
de esto..
 ```
 export const deleteUser = (userId) => async (dispatch) => {
   try {
 
     await axios.delete(`https://pf-back-hostel-admin.onrender.com/users/delete/${userId}`);
 
     dispatch({
       type: DELETE_USER_SUCCESS,
       payload: userId,
     });
   } catch (error) {
     console.error("Error deleting user:", error);
     dispatch({
       type: DELETE_USER_FAILURE,
       payload: error.message || "Failed to delete user",
     });
    }
  };

 ```
a esto

 ```
 export const deleteUser = (userId) => async (dispatch) => {
   try {
 
await axios.delete(`http://localhost:3001/users/delete/${userId}`);
 
     dispatch({
       type: DELETE_USER_SUCCESS,
       payload: userId,
     });
   } catch (error) {
     console.error("Error deleting user:", error);
     dispatch({
       type: DELETE_USER_FAILURE,
       payload: error.message || "Failed to delete user",
     });
    }
  };

 ```


y asi en cada funcion del archivo actions.js

6. 🏃‍️ Inicia la aplicacion!

    ```bash
    $ npm run dev
