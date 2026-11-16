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
  // Teléfono de Valeria para los pedidos de Dulce Momento.
  whatsappNumber: '5491130232632',
  businessName: 'Dulce Momento',
  bakerName: 'Valeria',

  // Teléfono de Rosana para consultas sobre desarrollo web.
  developerWhatsApp: '5492323523149',
  developerName: 'Rosana'
};

// ==========================================
// ELEMENTOS DEL DOM
// ==========================================
const mobileToggle = document.getElementById('mobileToggle');
const navLinksUl = document.querySelector('.nav-links');
const header = document.getElementById('header');

// Widget WhatsApp flotante
const whatsappToggle = document.getElementById('whatsappToggle');
const whatsappChatWidget = document.getElementById('whatsappChatWidget');
const closeWidgetBtn = document.getElementById('closeWidgetBtn');
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
let orderModalTrigger = null;
let devModalTrigger = null;

// ==========================================
// MENÚ MÓVIL Y NAVEGACIÓN PRECISA POR SECCIONES
// ==========================================
function setMobileMenuOpen(isOpen) {
  if (!mobileToggle || !navLinksUl) return;

  navLinksUl.classList.toggle('active', isOpen);
  mobileToggle.setAttribute('aria-expanded', String(isOpen));
  mobileToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');

  const icon = mobileToggle.querySelector('i');
  if (!icon) return;
  icon.classList.toggle('fa-bars', !isOpen);
  icon.classList.toggle('fa-xmark', isOpen);
}

if (mobileToggle && navLinksUl) {
  mobileToggle.addEventListener('click', () => {
    setMobileMenuOpen(!navLinksUl.classList.contains('active'));
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
        setMobileMenuOpen(false);
      }
    }
  });
});

// Sombra en el header al hacer scroll
window.addEventListener('scroll', () => {
  if (!header) return;
  if (window.scrollY > 40) {
    header.style.boxShadow = '0 4px 20px rgba(70, 43, 27, 0.12)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// ==========================================
// CONTROL DEL WIDGET DE WHATSAPP FLOTANTE
// ==========================================
function setWhatsAppWidgetOpen(isOpen) {
  if (!whatsappToggle || !whatsappChatWidget) return;

  whatsappChatWidget.classList.toggle('active', isOpen);
  whatsappToggle.setAttribute('aria-expanded', String(isOpen));
  whatsappToggle.setAttribute('aria-label', isOpen ? 'Cerrar chat de WhatsApp' : 'Abrir chat de WhatsApp');

  if (isOpen && whatsappInput) {
    setTimeout(() => {
      if (whatsappChatWidget.classList.contains('active')) whatsappInput.focus();
    }, 200);
  }
}

if (whatsappToggle && whatsappChatWidget) {
  whatsappToggle.addEventListener('click', () => {
    setWhatsAppWidgetOpen(!whatsappChatWidget.classList.contains('active'));
  });
}

if (closeWidgetBtn && whatsappChatWidget) {
  closeWidgetBtn.addEventListener('click', () => {
    setWhatsAppWidgetOpen(false);
  });
}

// Envío desde el chat flotante
function handleSendWhatsApp(event) {
  event.preventDefault();
  const message = whatsappInput.value.trim();
  if (!message) return;

  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  
  whatsappInput.value = '';
  setWhatsAppWidgetOpen(false);
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
  window.open(url, '_blank', 'noopener,noreferrer');
}

// ==========================================
// MODAL DE PEDIDO PERSONALIZADO (VALERIA)
// ==========================================
function openOrderModal(productName) {
  orderModalTrigger = document.activeElement;
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
  if (!orderModal.classList.contains('active')) return;
  orderModal.classList.remove('active');
  document.body.style.overflow = devModal && devModal.classList.contains('active') ? 'hidden' : '';
  if (orderModalTrigger instanceof HTMLElement) orderModalTrigger.focus();
  orderModalTrigger = null;
}

// Actualizar precio unitario según el producto seleccionado en el dropdown
function updateSelectedProductPrice() {
  if (!orderProductSelect) return;
  const selectedOption = orderProductSelect.options[orderProductSelect.selectedIndex];
  currentUnitPrice = parseInt(selectedOption.getAttribute('data-price'), 10) || 0;
  modalProductTitle.textContent = selectedOption.value;
  calculateModalTotal();
}

// Calcular total estimado
function calculateModalTotal() {
  const qty = parseInt(orderQuantityInput.value, 10);
  if (!orderQuantityInput.checkValidity() || !Number.isFinite(qty)) {
    modalTotalPrice.textContent = '—';
    return;
  }

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
  const quantity = parseInt(orderQuantityInput.value, 10);
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
  window.open(url, '_blank', 'noopener,noreferrer');

  closeOrderModal();
}

// ==========================================
// MODAL Y CONTACTO DESARROLLADORA (ROSANA)
// ==========================================
function openDevModal() {
  if (devModal) {
    devModalTrigger = document.activeElement;
    devModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    devModal.querySelector('.modal-close-btn').focus();
  }
}

function closeDevModal() {
  if (devModal) {
    if (!devModal.classList.contains('active')) return;
    devModal.classList.remove('active');
    document.body.style.overflow = orderModal && orderModal.classList.contains('active') ? 'hidden' : '';
    if (devModalTrigger instanceof HTMLElement) devModalTrigger.focus();
    devModalTrigger = null;
  }
}

// Abrir WhatsApp directo para contactar a Rosana
function contactRosanaWhatsApp() {
  const message = `¡Hola ${CONFIG.developerName}! Vi la página web que diseñaste para Dulce Momento y me encantó. Me gustaría consultar para crear una web para mi negocio/emprendimiento.`;
  const url = `https://wa.me/${CONFIG.developerWhatsApp}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  closeDevModal();
}

// Cerrar modales con clic afuera o tecla Escape
window.addEventListener('click', (event) => {
  if (event.target === orderModal) closeOrderModal();
  if (event.target === devModal) closeDevModal();
});

function trapDialogFocus(event, dialog) {
  if (event.key !== 'Tab') return;

  const focusableElements = Array.from(dialog.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )).filter(element => element.getClientRects().length > 0);

  if (focusableElements.length === 0) {
    event.preventDefault();
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && (document.activeElement === firstElement || !dialog.contains(document.activeElement))) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && (document.activeElement === lastElement || !dialog.contains(document.activeElement))) {
    event.preventDefault();
    firstElement.focus();
  }
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeOrderModal();
    closeDevModal();
    setWhatsAppWidgetOpen(false);
    if (navLinksUl && navLinksUl.classList.contains('active')) {
      setMobileMenuOpen(false);
    }
    return;
  }

  if (orderModal.classList.contains('active')) {
    trapDialogFocus(event, orderModal);
  } else if (devModal && devModal.classList.contains('active')) {
    trapDialogFocus(event, devModal);
  }
});
