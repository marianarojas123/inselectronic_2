# Configuración del Formulario de Contacto

## Opción 1: EmailJS (Recomendado)

### Pasos para configurar EmailJS:

1. **Crear cuenta en EmailJS:**
   - Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
   - Regístrate para una cuenta gratuita

2. **Configurar el servicio de email:**
   - En el dashboard, ve a "Email Services"
   - Agrega un nuevo servicio (Gmail, Outlook, etc.)
   - Usa tu email: `insbotinselectronic@gmail.com`

3. **Crear una plantilla de email:**
   - Ve a "Email Templates"
   - Crea una nueva plantilla con el ID: `template_contact_form`
   - Usa esta plantilla:

```html
Nuevo mensaje de contacto:

Nombre: {{from_name}}
Email: {{from_email}}
Asunto: {{subject}}

Mensaje:
{{message}}
```

4. **Obtener las claves necesarias:**
   - Service ID: `service_insbotinselectronic` (o el que te genere)
   - Template ID: `template_contact_form`
   - Public Key: Tu clave pública de EmailJS

5. **Actualizar el código:**
   - En `src/pages/Contact.jsx`, reemplaza:
     - `'YOUR_PUBLIC_KEY'` con tu clave pública
     - `'service_insbotinselectronic'` con tu Service ID
     - `'template_contact_form'` con tu Template ID

## Opción 2: Email Directo (Funciona inmediatamente)

El formulario ya incluye un botón de "Enviar Email Directo" que abre el cliente de email del usuario con:
- Destinatario: `insbotinselectronic@gmail.com`
- Asunto: "Consulta desde el sitio web"

## Opción 3: Formspree (Alternativa gratuita)

1. Ve a [https://formspree.io/](https://formspree.io/)
2. Crea una cuenta gratuita
3. Crea un nuevo formulario
4. Reemplaza el endpoint en el código con tu endpoint de Formspree

## Estado Actual

El formulario está configurado para:
- ✅ Mostrar mensajes de éxito/error
- ✅ Validar campos requeridos
- ✅ Tener un botón de email directo como respaldo
- ✅ Ser responsivo y con buen diseño
- ⚠️ Necesita configuración de EmailJS para funcionar completamente

## Prueba el formulario

1. Ejecuta `npm run dev`
2. Ve a la página de contacto
3. Llena el formulario y envíalo
4. Si no funciona, usa el botón "Enviar Email Directo" 