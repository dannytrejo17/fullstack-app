# Login con usuario y contraseña (Firebase + NextAuth)

Además de GitHub, MiniMarket permite entrar con **usuario y contraseña**. Las contraseñas no se almacenan en el código de la app: eso lo gestiona Firebase. NextAuth crea la sesión cuando Firebase confirma que las credenciales son correctas.

## Cómo está montado

Intervienen dos componentes:

- **Firebase Auth** — registro de usuarios y validación de contraseñas.
- **NextAuth (CredentialsProvider)** — cookie de sesión en la aplicación.

NextAuth no tiene base de datos propia de usuarios. En `authorize()` se consulta a Firebase y, si la respuesta es correcta, se devuelve `{ id, email, name }`.

### Registro (`/register`)

Se usa el SDK de Firebase en el cliente:

```ts
createUserWithEmailAndPassword(firebaseAuth, emailInterno, password)
```

En el formulario el usuario escribe un **nombre de usuario** (por ejemplo `maria`), no un email. Firebase exige formato email, así que internamente se convierte a:

```
maria → maria@minimarket.local
```

La lógica está en `src/lib/auth-credentials.ts`.

El formulario muestra "usuario" en lugar de "email" porque **no se verifica el email** con un enlace de confirmación. Pedir email sin verificación resultaría confuso; con "usuario" la interfaz es más coherente para una demo.

### Login (`/login`)

1. El formulario llama a `signIn("credentials", { username, password })`.
2. NextAuth ejecuta `authorize()` en el servidor.
3. El servidor llama a la REST API de Firebase `signInWithPassword`.
4. Si la respuesta es correcta, se crea la cookie JWT y se accede al dashboard.

La configuración está en `src/app/api/auth/[...nextauth]/route.ts`.

## Por qué no guardar contraseñas en texto plano

Si una base de datos se filtra y las contraseñas están almacenadas tal cual, un atacante obtiene acceso inmediato a todas las cuentas. Muchos usuarios reutilizan contraseñas en otros servicios (email, banco, etc.).

Lo correcto es almacenar únicamente un **hash** irreversible, nunca la contraseña original.

En este proyecto **no se guardan contraseñas en código propio**. Firebase Auth se encarga del almacenamiento seguro.

## bcrypt, argon2 y los salts

Un **hash** transforma la contraseña en un valor de ida, no reversible. Es sencillo calcular el hash a partir de la contraseña; recuperar la contraseña a partir del hash, no.

**bcrypt** lleva tiempo usándose para contraseñas. Tiene un factor de coste configurable: a más rondas, más lento el cálculo y mayor resistencia a ataques de fuerza bruta.

**argon2** es más reciente (ganador de la Password Hashing Competition en 2015). Además de CPU consume memoria, lo que dificulta ataques con GPUs. OWASP lo recomienda para proyectos nuevos.

Ambos son preferibles a MD5 o SHA-256 aplicados directamente a contraseñas, porque estos algoritmos son muy rápidos y permiten probar millones de claves por segundo.

Un **salt** es un valor aleatorio único por usuario que se combina con la contraseña antes de hashear. Sin salt, dos usuarios con la misma contraseña `123456` producirían el mismo hash, lo que facilita el uso de tablas precalculadas. Con salt, cada hash es distinto aunque la contraseña coincida.

Firebase (así como bcrypt y argon2) gestionan salt y hash internamente. No es necesario implementarlo manualmente en la aplicación.

## Flujo de inicio de sesión

```
Usuario: maria + contraseña
    ↓
NextAuth authorize() (servidor)
    ↓
Firebase signInWithPassword(maria@minimarket.local, ...)
    ↓
Firebase compara con el hash almacenado
    ↓
OK → cookie HttpOnly con la sesión
```

La contraseña viaja cifrada por HTTPS en tránsito. En Firebase no se almacena en texto plano.

## Variables de entorno

En `.env.local` (excluido de Git):

- `NEXT_PUBLIC_FIREBASE_API_KEY`, `AUTH_DOMAIN`, `PROJECT_ID`
- `NEXTAUTH_SECRET`, `NEXTAUTH_URL`

La API key de Firebase es pública por diseño; la protección real depende de las reglas configuradas en la consola de Firebase, no de ocultar la clave.

## Medidas aplicadas en el proyecto

- Contraseñas gestionadas por Firebase, no en código propio.
- Sesión en cookie HttpOnly mediante NextAuth, no en `localStorage`.
- Contraseña mínima de 6 caracteres en registro (requisito de Firebase).
- Mensaje genérico en error de login: "Credenciales incorrectas" (no indica si el usuario existe).
- Secretos fuera del repositorio.

## Limitaciones (proyecto demo)

- Sin verificación de email.
- Sin CAPTCHA ni autenticación en dos pasos.
- API Express de productos sin autenticación, para demostrar el CRUD.

En un entorno de producción se añadirían verificación de email, límites de intentos de login y token de autenticación también en la API REST.

## Resumen

Las contraseñas no se almacenan en la app. Firebase las hashea con salt. NextAuth gestiona la sesión. El usuario ve "usuario + contraseña"; internamente Firebase trabaja con el email sintético `@minimarket.local`.
