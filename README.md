Frontend de Aplicación To-Do List con Angular
Este es el frontend para una aplicación de lista de tareas (To-Do List) desarrollada con Angular. La aplicación se conecta a un backend utilizando Axios para manejar la autenticación y las operaciones CRUD de las tareas.

Instalación
Sigue estos pasos para clonar, instalar y ejecutar el frontend de la aplicación To-Do List:

1. Clonar el repositorio
Primero, clona este repositorio en tu máquina local. Abre una terminal y ejecuta:

https://github.com/SantiagoRodriguezd/To-Do-Front.git

2. Instalar dependencias
Una vez dentro del directorio del proyecto, instala las dependencias utilizando npm o yarn (dependiendo de lo que prefieras):

npm install

3. Compilar y ejecutar la aplicación
Una vez instaladas las dependencias y configurado el entorno, puedes ejecutar la aplicación con el siguiente comando:

ng serve

4. Conectar el frontend con el backend
La aplicación utiliza Axios para realizar solicitudes al backend. El servicio de autenticación (UserService) y el servicio de tareas (TodoService) están configurados para hacer peticiones a la API del backend.

Uso

Iniciar sesión

-Al cargar la aplicación, se te presentará un cuadro de diálogo de inicio de sesión (implementado con SweetAlert2).
-Ingresa tu nombre de usuario y contraseña (ejemplo: admin / password).
-Si la autenticación es exitosa, las tareas asociadas a ese usuario se mostrarán en la pantalla.

Funcionalidades de la aplicación

-Agregar Tarea: Puedes agregar una nueva tarea ingresando el título en el campo correspondiente y presionando "Enter" o el botón "Agregar".
-Actualizar Tarea: Puedes marcar las tareas como completadas o editar sus detalles.
-Eliminar Tarea: Puedes eliminar una tarea utilizando el botón de eliminar asociado a cada tarea.
-Filtrado: Puedes filtrar las tareas completadas, incompletas o ver todas las tareas.

Cerrar sesión

-El usuario puede cerrar sesión utilizando el botón "Cerrar sesión", lo cual borra la sesión del localStorage y muestra nuevamente el diálogo de inicio de sesión.

Esta guía proporciona una visión general detallada sobre cómo instalar, configurar y ejecutar el frontend de la aplicación To-Do List con Angular. Puedes ajustarla según los detalles específicos de tu proyecto.
