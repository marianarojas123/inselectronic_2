// Configuración de EmailJS
export const emailConfig = {
  serviceId: 'service_insbotinselectronic',
  templateId: 'template_contact_form',
  publicKey: 'YOUR_PUBLIC_KEY', // Reemplazar con tu clave pública de EmailJS
  toEmail: 'insbotinselectronic@gmail.com'
};

// Configuración alternativa usando Formspree (más simple)
export const formspreeConfig = {
  endpoint: 'https://formspree.io/f/xpzgwqzw' // Reemplazar con tu endpoint de Formspree
}; 