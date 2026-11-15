# Dulce Momento - Sitio Web Oficial

Sitio web artesanal, cálido y moderno para **Dulce Momento** (Luján, Buenos Aires).
Diseñado y programado por **Rosana**.

---

## 🍰 Características Implementadas

1. **Identidad Visual Oficial de Marca:**
   - Paleta oficial: `#462b1b` (marrón oscuro), `#79492a` (marrón cálido), `#dc90b3` (rosa medio) y `#f7a8b8` (rosa pastel).
   - Tipografía serif elegante (*Playfair Display*) combinada con sans-serif moderna (*Plus Jakarta Sans*).
   - Icono de torta marrón en círculo rosa en el logo de la cabecera.
   - Estrella rosa sobre el título principal: *Emprendimiento artesanal, hecho en casa*.
   - Fotos originales desde la carpeta `Recursos`: Pastelería en cocina con basílica, Pastaflora y Pepas caseras.

2. **Navegación Exacta por Secciones:**
   - Sistema de desplazamiento suave que calcula dinámicamente la altura de la cabecera (`header.offsetHeight`), aterrizando con precisión quirúrgica en el comienzo de cada sección (**Sobre mí**, **Productos**, **Cómo pedir**, **Por qué elegirnos**) sin cortes ni márgenes sobrantes.

3. **Interacción con WhatsApp de Valeria:**
   - Formulario de pedido con variedad de dulce (Membrillo, Batata o Mixto), cantidad con cálculo dinámico del total, botón de cierre (`✕`) y botón para volver.
   - Cuadro explicativo que indica que el mensaje se enviará directo a WhatsApp.
   - Chat simulador flotante en la esquina inferior derecha.

4. **Promoción de Rosana (Diseño y Programación Web):**
   - Barra delicada y profesional en el pie de página: *"Diseñado y programado por Rosana · ¿Querés una página web moderna y atractiva como esta para tu emprendimiento? [Contactar a Rosana]"*.
   - Modal interactivo con los servicios web que ofrece Rosana y botón directo para enviarle un mensaje por WhatsApp.

---

## ⚙️ Configuración de Números de WhatsApp

En el archivo [js/main.js](file:///c:/Users/Rosana/OneDrive/Documentos/Paginas%20web/Dulce%20Momentos/js/main.js#L11-L21) podés configurar tanto el teléfono de Valeria como tu propio teléfono:

```javascript
const CONFIG = {
  // Teléfono de Valeria (para los pedidos de pastelería)
  whatsappNumber: '5491130232632', // 11 3023-2632
  instagramUser: 'dulce.momento2627',
  businessName: 'Dulce Momento',
  bakerName: 'Valeria',

  // Teléfono de Rosana (para recibir consultas de clientes para crear webs)
  developerWhatsApp: '5492323523149', // 2323 523149
  developerName: 'Rosana'
};
```

---

## 🚀 Cómo Visualizar el Sitio

Abrí directamente el archivo [index.html](file:///c:/Users/Rosana/OneDrive/Documentos/Paginas%20web/Dulce%20Momentos/index.html) en tu navegador preferido.
