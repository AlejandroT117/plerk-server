# Acerca de este proyecto

### La api de este proyecto permite consultar, entre otras cosas, lo siguiente: 
- Servicio de resumen:
    - Este servicio no recibirá ningún parámetro, pero deberá regresar un resumen de lo que se encuentra en la base de datos previamente importada. Por ejemplo:
        - La empresa con más ventas
        - La empresa con menos ventas
        - El precio total de las transacciones que SÍ se cobraron
        - El precio total de las transacciones que NO se cobraron
        - La empresa con más rechazos de ventas (es decir, no se cobraron)
        
- Servicio de empresa
    - Este servicio deberá recibir el ID de la empresa y nos deberá regresar la siguiente información
        - Nombre de la empresa
        - Total de transacciones que SÍ se cobraron
        - Total de transacciones que NO se cobraron
        - El día que se registraron más transacciones

### El front end arroja los mismos datos y algunas tablas generales que se alimentan de la api


## ¿Cómo hice este proyecto?

### En cuanto al backend...

  * Primero, leí detenidamente las instrucciones e intenté abstraer una lógica para cada una de las funciones que necesitaría en la api de tal manera que con las menos funciones posibles, 
  pudiera satisfacer los servicios solicitados

  * luego modelé los esquemas necesarios para los datos en mongo

  * Utilicé python para obtener un array de empresas únicas

  * Levanté un servidor con express y organicé mis carpetas y archivos de forma más limpia que me fue posible

  * Diseñé funciones para cargar los datos del csv a dos bases de datos en mongodb, una para los datos de la empresa y otra para las transacciones

  * Añadí una función que permitiera añadir el Id de la empresa que estaba en la otra base de datos, a la base de datos de las transacciones

  * Con el resto de funciones GET, hice algunas pruebas unitarias y paulatinamente fui construyendo mis funciones en los modelos

  * Simultáneamente, emplée postman para verificar que cada endpoint funcionara y realicé estos dos últimos pasos hasta que concluí los servicios requeridos


### En cuanto al frontend...


