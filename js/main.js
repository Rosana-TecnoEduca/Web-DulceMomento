/**
 * DULCE MOMENTO - INTERACTIVIDAD Y CONEXIÓN CON WHATSAPP
 * Emprendimiento artesanal en Luján
 * Diseñado y programado por Rosana
 */

// ==========================================
// CONFIGURACIÓN DEL NEGOCIO Y DESARROLLADORA
// ==========================================
// Podés cambiar los números de WhatsApp aquí (formato internacional: código país + código área + número sin 15 ni guiones)
const CONFIG = {
  // Teléfono de Valeria para los pedidos de Dulce Momento (11 3023-2632)
  whatsappNumber: '5491130232632', 
  instagramUser: 'dulce.momento2627',
  businessName: 'Dulce Momento',
  bakerName: 'Valeria',

  // Teléfono de Rosana (para recibir consultas de clientes que quieran su propia página web)
  developerWhatsApp: '5492323523149', // WhatsApp de Rosana (Luján: 2323 523149)
  developerName: 'Rosana'
};

// ==========================================
// ELEMENTOS DEL DOM
// ==========================================
const mobileToggle = document.getElementById('mobileToggle');
const mainNav = document.getElementById('mainNav');
const navLinksUl = document.querySelector('.nav-links');
const header = document.getElementById('header');

// Widget WhatsApp flotante
const whatsappToggle = document.getElementById('whatsappToggle');
const whatsappChatWidget = document.getElementById('whatsappChatWidget');
const closeWidgetBtn = document.getElementById('closeWidgetBtn');
const whatsappForm = document.getElementById('whatsappForm');
const whatsappInput = document.getElementById('whatsappInput');

// Modal de Pedidos
const orderModal = document.getElementById('orderModal');
const modalProductTitle = document.getElementById('modalProductTitle');
const orderProductSelect = document.getElementById('orderProductSelect');
const orderFlavorSelect = document.getElementById('orderFlavor');
const orderQuantityInput = document.getElementById('orderQuantity');
const orderNameInput = document.getElementById('orderName');
const orderNotesInput = document.getElementById('orderNotes');
const modalTotalPrice = document.getElementById('modalTotalPrice');

// Modal de Contacto Desarrolladora (Rosana)
const devModal = document.getElementById('devModal');

let currentUnitPrice = 3500;

// ==========================================
// MENÚ MÓVIL Y NAVEGACIÓN PRECISA POR SECCIONES
// ==========================================
if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    navLinksUl.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    if (navLinksUl.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    } else {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  });
}

// Desplazamiento suave y alineación milimétrica con la cabecera
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#' || !targetId) return;
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      e.preventDefault();
      
      // Altura dinámica de la barra de navegación para que nunca se tape ni quede margen sobrante
      const headerOffset = header ? header.offsetHeight : 76;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = (targetId === '#inicio') ? 0 : (elementPosition + window.pageYOffset - headerOffset);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Cerrar menú móvil si estaba abierto
      if (navLinksUl && navLinksUl.classList.contains('active')) {
        navLinksUl.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    }
  });
});

// Sombra en el header al hacer scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.style.boxShadow = '0 4px 20px rgba(70, 43, 27, 0.12)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// ==========================================
// CONTROL DEL WIDGET DE WHATSAPP FLOTANTE
// ==========================================
if (whatsappToggle && whatsappChatWidget) {
  whatsappToggle.addEventListener('click', () => {
    whatsappChatWidget.classList.toggle('active');
    if (whatsappChatWidget.classList.contains('active')) {
      setTimeout(() => {
        whatsappInput.focus();
      }, 200);
    }
  });
}

if (closeWidgetBtn) {
  closeWidgetBtn.addEventListener('click', () => {
    whatsappChatWidget.classList.remove('active');
  });
}

// Envío desde el chat flotante
function handleSendWhatsApp(event) {
  event.preventDefault();
  const message = whatsappInput.value.trim();
  if (!message) return;

  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
  
  whatsappInput.value = '';
  whatsappChatWidget.classList.remove('active');
}

// Opciones rápidas del chat
function selectQuickChat(text) {
  whatsappInput.value = text;
  whatsappInput.focus();
}

// Abrir WhatsApp directo con mensaje para Valeria
function openWhatsAppChat(customMessage) {
  const message = customMessage || `¡Hola ${CONFIG.bakerName}! Me gustaría hacerte una consulta sobre ${CONFIG.businessName}.`;
  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// ==========================================
// MODAL DE PEDIDO PERSONALIZADO (VALERIA)
// ==========================================
function openOrderModal(productName, priceString) {
  orderModal.classList.add('active');
  document.body.style.overflow = 'hidden';

  if (productName) {
    modalProductTitle.textContent = productName;
    if (orderProductSelect) {
      for (let i = 0; i < orderProductSelect.options.length; i++) {
        const opt = orderProductSelect.options[i];
        if (opt.value.toLowerCase().includes(productName.toLowerCase()) || 
            productName.toLowerCase().includes(opt.value.toLowerCase())) {
          orderProductSelect.selectedIndex = i;
          break;
        }
      }
    }
  } else {
    modalProductTitle.textContent = 'Hacer mi pedido';
  }

  updateSelectedProductPrice();

  orderQuantityInput.value = 1;
  orderNameInput.value = '';
  orderNotesInput.value = '';
  calculateModalTotal();

  setTimeout(() => {
    orderNameInput.focus();
  }, 150);
}

function closeOrderModal() {
  orderModal.classList.remove('active');
  document.body.style.overflow = '';
}

// Actualizar precio unitario según el producto seleccionado en el dropdown
function updateSelectedProductPrice() {
  if (!orderProductSelect) return;
  const selectedOption = orderProductSelect.options[orderProductSelect.selectedIndex];
  currentUnitPrice = parseInt(selectedOption.getAttribute('data-price')) || 0;
  modalProductTitle.textContent = selectedOption.value;
  calculateModalTotal();
}

// Calcular total estimado
function calculateModalTotal() {
  const qty = parseInt(orderQuantityInput.value) || 1;
  if (currentUnitPrice > 0) {
    const total = currentUnitPrice * qty;
    modalTotalPrice.textContent = `$${total.toLocaleString('es-AR')}`;
    document.getElementById('modalTotalBar').style.display = 'flex';
  } else {
    modalTotalPrice.textContent = 'A coordinar';
  }
}

// Enviar pedido estructurado a WhatsApp de Valeria
function handleOrderSubmit(event) {
  event.preventDefault();

  const product = orderProductSelect.value;
  const flavor = orderFlavorSelect.value;
  const quantity = parseInt(orderQuantityInput.value) || 1;
  const name = orderNameInput.value.trim();
  const notes = orderNotesInput.value.trim();

  let totalPriceText = '';
  if (currentUnitPrice > 0) {
    const total = currentUnitPrice * quantity;
    totalPriceText = `\n💰 *Total estimado:* $${total.toLocaleString('es-AR')}`;
  }

  const message = 
    `¡Hola ${CONFIG.bakerName}! Quiero hacer un pedido en *${CONFIG.businessName}*:\n\n` +
    `🧁 *Producto:* ${product}\n` +
    `🍓 *Relleno / Variedad:* ${flavor}\n` +
    `🔢 *Cantidad:* ${quantity}` +
    totalPriceText + `\n` +
    `👤 *Nombre del cliente:* ${name}\n` +
    (notes ? `📝 *Retiro / Fecha / Notas:* ${notes}\n` : '') +
    `\n¿Podemos coordinar la disponibilidad y el retiro en Luján? ¡Muchas gracias!`;

  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');

  closeOrderModal();
}

// ==========================================
// MODAL Y CONTACTO DESARROLLADORA (ROSANA)
// ==========================================
function openDevModal() {
  if (devModal) {
    devModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeDevModal() {
  if (devModal) {
    devModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Abrir WhatsApp directo para contactar a Rosana
function contactRosanaWhatsApp() {
  const message = `¡Hola ${CONFIG.developerName}! Vi la página web que diseñaste para Dulce Momento y me encantó. Me gustaría consultar para crear una web para mi negocio/emprendimiento.`;
  const url = `https://wa.me/${CONFIG.developerWhatsApp}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
  closeDevModal();
}

// Cerrar modales con clic afuera o tecla Escape
window.addEventListener('click', (event) => {
  if (event.target === orderModal) closeOrderModal();
  if (event.target === devModal) closeDevModal();
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeOrderModal();
    closeDevModal();
    if (whatsappChatWidget) whatsappChatWidget.classList.remove('active');
  }
});
