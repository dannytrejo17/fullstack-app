# Retrospectiva final

## Qué aprendí

este proyecto me ha servido para reforzar conocimientos sobre cómo se conecta el frontend con el backend y cómo trabajan juntos a través de una API. También me ha ayudado a afianzar conceptos que ya había visto antes, como la organización del código por capas y la importancia de mantener una estructura clara desde el principio.
Además, me ha hecho ver que aunque el proyecto no sea muy grande, tomar buenas decisiones desde el inicio evita muchos problemas más adelante cuando el código empieza a crecer.

## Problemas encontrados

Los principales problemas se han dado en la integración entre frontend y API. Al inicio aparecieron errores de CORS al conectar directamente con el backend, lo que obligó a ajustar la configuración utilizando rutas relativas y proxy en Vite.

Otro problema importante fue el desajuste de tipos entre frontend y backend. Al ampliar el modelo de datos en el backend, fue necesario actualizar múltiples componentes del frontend, lo que evidenció la importancia de mantener los tipos sincronizados desde el inicio.

También se detectó una mala organización inicial del estado del carrito, ya que estaba gestionado dentro del hook de productos. Posteriormente se corrigió separándolo en un contexto independiente, lo que mejoró la estructura general de la aplicación.



## Uso de IA durante el desarrollo

Durante el desarrollo utilicce Ia como herramienta de apoyo para resolver dudas puntuales, revisar algunos errores y obtener ejemplos de implementación .
tambien lo utilize para  mejorar parte de la documentación y comparar distintas formas de estructurar el proyecto, aunque todas las decisiones finales de arquitectura, componentes y organización fueron adaptadas y aplicadas manualmente.
La Ia fue complemento para tareas puntuales y algunas dudas en general.

## Reflexión final

construir una aplicacion desde cero, aunque sea pequeña, obliga a tomar decisiones de arquitectura reales  y a entender mejor cómo se conecta todo. También me ha servido para ver la importancia de probar bien el backend y asegurar que todo funcione correctamente con el frontend para evitar bugs.