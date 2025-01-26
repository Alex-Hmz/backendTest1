# API de Gestión de Usuarios, Camiones, Ubicaciones y Órdenes 🚚

Esta API permite gestionar usuarios, camiones, ubicaciones y órdenes relacionadas con un servicio de transporte. La API incluye funcionalidad completa de CRUD (Crear, Leer, Actualizar, Eliminar) y se conecta con la API de Google Places para obtener datos de ubicaciones.

---

## **Funcionalidad**

### **Endpoints principales**
1. **Usuarios (`api/v1/users`)**:
   - CRUD para gestionar usuarios.
   - Los datos de cada usuario incluyen:
     - `username`: Nombre del usuario.
     - `email`: Correo electrónico único.
     - `password`: Contraseña encriptada.

2. **Camiones (`api/v1/trucks`)**:
   - CRUD para gestionar camiones asignados a usuarios.
   - Los datos de cada camión incluyen:
     - `user`: ID del usuario al que pertenece.
     - `year`: Año del modelo.
     - `color`: Color del camión.
     - `plates`: Matrícula del camión.

3. **Ubicaciones (`api/v1/locations`)**:
   - CRUD para gestionar ubicaciones obtenidas a partir de un `place_id` de Google Places.
   - Los datos de cada ubicación incluyen:
     - `address`: Dirección obtenida de la API de Google.
     - `place_id`: ID del lugar.
     - `latitude`: Latitud de la ubicación.
     - `longitude`: Longitud de la ubicación.

4. **Órdenes (`api/v1/orders`)**:
   - CRUD para gestionar órdenes relacionadas con usuarios, camiones y ubicaciones.
   - Los datos de cada orden incluyen:
     - `user`: ID del usuario.
     - `truck`: ID del camión asignado.
     - `pickup`: ID de la ubicación de recogida.
     - `dropoff`: ID de la ubicación de entrega.
     - `status`: Estado de la orden (`created`, `in transit`, `completed`).

5. **Cambio de estado de órdenes**:
   - Endpoint para actualizar el estado de una orden (`api/v1/orders/:id/status`).

---

## **Desarrollo**

### **Tecnologías utilizadas**
- **NestJS**: Framework principal para el backend.
- **TypeORM**: ORM para la conexión con la base de datos MongoDB.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar los datos.
- **Google Places API**: Para obtener coordenadas y direcciones a partir de `place_id`.
- **Postman**: Herramienta para probar y documentar los endpoints.