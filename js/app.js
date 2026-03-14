/**
 * HND LUXE — js/app.js
 * Proyecto: guia_hoteles
 *
 * Incluye:
 *  - JSON hotelesData + jQuery $.each() para renderizar tarjetas
 *  - Eventos show.bs.modal y shown.bs.modal con log
 *  - Control del carrusel con jQuery
 *  - Inicialización de tooltips y popovers (DOMContentLoaded)
 *  - showToast() para notificación de formulario
 *  - Modal de reserva 3 pasos: validación de fechas,
 *    cálculo de precio con IVA 15% y descuento 20% (código HND2026)
 *  - Barra promocional: cerrar y copiar código
 */

/* ================================================================
   DATOS JSON DE HOTELES
================================================================ */
const hotelesData = [
  {
    id: 1,
    nombre: "Roatán Coral Palace",
    destino: "Islas de la Bahía",
    estrellas: 5,
    precio: 145,
    descripcion: "Resort frente al arrecife mesoamericano con habitaciones semi-sumergidas y acceso directo al mar.",
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=75"
  },
  {
    id: 2,
    nombre: "Grand Sula Tower",
    destino: "San Pedro Sula",
    estrellas: 5,
    precio: 95,
    descripcion: "El hotel de negocios más moderno del norte, 24 pisos con vistas panorámicas al Valle de Sula.",
    img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=75"
  },
  {
    id: 3,
    nombre: "Hacienda Copán",
    destino: "Copán Ruinas",
    estrellas: 4,
    precio: 85,
    descripcion: "Hotel boutique junto a las ruinas mayas declaradas Patrimonio de la Humanidad por la UNESCO.",
    img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=75"
  },
  {
    id: 4,
    nombre: "Tegucigalpa Palace",
    destino: "Tegucigalpa",
    estrellas: 5,
    precio: 120,
    descripcion: "El referente de lujo en la capital hondureña, con spa, tres restaurantes y salones ejecutivos.",
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=75"
  },
  {
    id: 5,
    nombre: "Utila Dive & Resort",
    destino: "Utila, Islas de la Bahía",
    estrellas: 4,
    precio: 110,
    descripcion: "Paraíso del buceo con instructores PADI, equipo de primer nivel e instalaciones sobre el agua.",
    img: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&q=75"
  },
  {
    id: 6,
    nombre: "La Ceiba Beach Resort",
    destino: "La Ceiba",
    estrellas: 4,
    precio: 90,
    descripcion: "Frente al Mar Caribe con acceso a la Reserva de la Biosfera del Río Plátano y ecoturismo.",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=75"
  }
];

/* Mapa de precios por valor del select (modal reserva) */
const preciosPorOpcion = {
  roatan_coral:    145,
  sula_tower:       95,
  copan_hacienda:   85,
  executive_plus:  145,
  ultra_luxe:      210
};

/* ================================================================
   RENDERIZAR TARJETAS CON jQuery $.each()
================================================================ */
$(document).ready(function () {

  // ── Renderizar tarjetas de hotel ──────────────────────────────
  $.each(hotelesData, function (index, hotel) {
    // Generar estrellas
    let estrellas = "";
    for (let i = 0; i < hotel.estrellas; i++) {
      estrellas += '<i class="bi bi-star-fill"></i>';
    }

    const tarjeta = `
      <div class="hotel-card">
        <img class="hotel-card__img" src="${hotel.img}" alt="${hotel.nombre}" loading="lazy" />
        <div class="hotel-card__body">
          <div class="d-flex justify-content-between align-items-start mb-1">
            <h3 class="hotel-card__title">${hotel.nombre}</h3>
            <span class="badge-gold ms-2">$${hotel.precio}</span>
          </div>
          <div class="hotel-card__stars">${estrellas}</div>
          <p class="hotel-card__desc">${hotel.descripcion}</p>
          <div class="d-flex align-items-center gap-2">
            <i class="bi bi-geo-alt" style="color:#c9a96e;font-size:.85rem"></i>
            <span style="font-family:'Montserrat',sans-serif;font-size:.75rem;color:#777;letter-spacing:.05em">${hotel.destino}</span>
          </div>
          <button class="hotel-card__btn mt-3 w-100"
            onclick="abrirReservaHotel(${hotel.id})">
            Ver Disponibilidad
          </button>
        </div>
      </div>
    `;

    $("#hoteles-container").append(tarjeta);
  });

  // ── Animación de entrada escalonada de tarjetas ───────────────
  const cards = document.querySelectorAll(".hotel-card");
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "0";
          entry.target.style.transform = "translateY(24px)";
          entry.target.style.transition = `opacity .5s ${i * 0.08}s ease, transform .5s ${i * 0.08}s ease`;
          requestAnimationFrame(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    cards.forEach(c => obs.observe(c));
  }

  // ── Navbar: ocultar barra promo al hacer scroll ───────────────
  $(window).on("scroll", function () {
    const scrollY = $(this).scrollTop();
    if (scrollY > 60) {
      $("#navbar-principal").css("top", "0");
    }
  });

  // ── Carrusel: eventos jQuery ──────────────────────────────────
  $("#mainCarousel").on("slide.bs.carousel", function (e) {
    // Puedes loguear aquí si lo necesitas
  });

  // Botones extra de control del carrusel (si se agregan en otro lugar)
  $(document).on("click", "[data-carousel-control]", function () {
    const dir = $(this).data("carousel-control");
    const carousel = bootstrap.Carousel.getOrCreateInstance(
      document.getElementById("mainCarousel")
    );
    dir === "prev" ? carousel.prev() : carousel.next();
  });

}); // end document.ready

/* ================================================================
   EVENTOS BOOTSTRAP MODAL — LOG DE EVENTOS (original)
================================================================ */
document.addEventListener("DOMContentLoaded", function () {

  // Log de eventos del modal
  const modalEventosEl = document.getElementById("modalEventos");
  if (modalEventosEl) {
    modalEventosEl.addEventListener("show.bs.modal", function () {
      appendLog("show.bs.modal", "El modal está a punto de mostrarse.");
    });
    modalEventosEl.addEventListener("shown.bs.modal", function () {
      appendLog("shown.bs.modal", "El modal ya es visible y las transiciones terminaron.");
    });
    modalEventosEl.addEventListener("hide.bs.modal", function () {
      appendLog("hide.bs.modal", "El modal está a punto de ocultarse.");
    });
    modalEventosEl.addEventListener("hidden.bs.modal", function () {
      appendLog("hidden.bs.modal", "El modal está oculto.");
    });
  }

  // ── INICIALIZAR TOOLTIPS ──────────────────────────────────────
  const tooltipEls = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltipEls.forEach(el => {
    new bootstrap.Tooltip(el, {
      delay: { show: 300, hide: 100 },
      boundary: "window"
    });
  });

  // ── INICIALIZAR POPOVERS ──────────────────────────────────────
  const popoverEls = document.querySelectorAll('[data-bs-toggle="popover"]');
  popoverEls.forEach(el => {
    new bootstrap.Popover(el, {
      html: false,
      sanitize: true,
      trigger: el.dataset.bsTrigger || "hover focus"
    });
  });

  // ── BARRA PROMOCIONAL: cerrar ─────────────────────────────────
  const btnCerrarPromo = document.getElementById("btnCerrarPromo");
  if (btnCerrarPromo) {
    btnCerrarPromo.addEventListener("click", function () {
      const promoBar = document.getElementById("promo-bar");
      if (promoBar) {
        promoBar.style.transition = "max-height .4s ease, opacity .4s ease, padding .4s ease";
        promoBar.style.overflow = "hidden";
        promoBar.style.maxHeight = promoBar.offsetHeight + "px";
        requestAnimationFrame(() => {
          promoBar.style.maxHeight = "0";
          promoBar.style.opacity = "0";
          promoBar.style.padding = "0";
        });
        setTimeout(() => promoBar.remove(), 420);
      }
    });
  }

  // ── BARRA PROMOCIONAL: copiar código ─────────────────────────
  const promoCodes = document.querySelectorAll(".promo-code");
  promoCodes.forEach(el => {
    el.addEventListener("click", function () {
      navigator.clipboard.writeText("HND2026").then(() => {
        const orig = el.textContent;
        el.textContent = "¡Copiado!";
        setTimeout(() => el.textContent = orig, 1800);
      }).catch(() => {
        // fallback: seleccionar
        const range = document.createRange();
        range.selectNode(el);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      });
    });
  });

  // ── FORMULARIO DE CONTACTO → Toast ───────────────────────────
  const btnEnviar = document.getElementById("btnEnviarContacto");
  if (btnEnviar) {
    btnEnviar.addEventListener("click", function () {
      const nombre  = document.getElementById("ctcNombre")?.value.trim();
      const email   = document.getElementById("ctcEmail")?.value.trim();
      const mensaje = document.getElementById("ctcMensaje")?.value.trim();

      if (!nombre || !email || !mensaje) {
        // Feedback visual básico
        [document.getElementById("ctcNombre"),
         document.getElementById("ctcEmail"),
         document.getElementById("ctcMensaje")].forEach(el => {
          if (el && !el.value.trim()) {
            el.style.borderColor = "#dc3545";
            el.addEventListener("input", () => el.style.borderColor = "", { once: true });
          }
        });
        return;
      }

      showToast("toastContacto");

      // Limpiar formulario
      ["ctcNombre","ctcEmail","ctcTel","ctcAsunto","ctcMensaje"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
      });
    });
  }

  // ── MODAL DE RESERVA — lógica 3 pasos ────────────────────────
  initModalReserva();

}); // end DOMContentLoaded

/* ================================================================
   FUNCIÓN showToast()
================================================================ */
/**
 * Muestra un toast Bootstrap por su id.
 * @param {string} toastId — id del elemento .toast
 * @param {number} delay   — ms antes de ocultar (default 5000)
 */
function showToast(toastId, delay = 5000) {
  const toastEl = document.getElementById(toastId);
  if (!toastEl) return;
  const toast = bootstrap.Toast.getOrCreateInstance(toastEl, {
    delay: delay,
    autohide: true
  });
  toast.show();
}

/* ================================================================
   LOG DE EVENTOS (helper)
================================================================ */
function appendLog(evento, detalle) {
  const log = document.getElementById("log-eventos");
  if (!log) return;
  const ts  = new Date().toLocaleTimeString("es-HN");
  const lin = document.createElement("div");
  lin.innerHTML = `<span style="color:rgba(245,240,232,.4)">[${ts}]</span> <strong style="color:#c9a96e">${evento}</strong> — ${detalle}`;
  lin.style.marginBottom = ".4rem";
  log.appendChild(lin);
  log.scrollTop = log.scrollHeight;
}

/* ================================================================
   ABRIR MODAL RESERVA DESDE TARJETA DE HOTEL
================================================================ */
function abrirReservaHotel(hotelId) {
  const mapa = {
    1: "roatan_coral",
    2: "sula_tower",
    3: "copan_hacienda",
    4: "sula_tower",
    5: "roatan_coral",
    6: "copan_hacienda"
  };
  const modal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("modalReserva")
  );
  modal.show();
  // Pre-seleccionar hotel después de un tick
  setTimeout(() => {
    const sel = document.getElementById("inputHotel");
    if (sel && mapa[hotelId]) sel.value = mapa[hotelId];
  }, 200);
}

/* ================================================================
   MODAL DE RESERVA — 3 PASOS
================================================================ */
function initModalReserva() {
  const modalEl = document.getElementById("modalReserva");
  if (!modalEl) return;

  let pasoActual = 1;
  let descuentoAplicado = false;

  const pasos = [
    document.getElementById("paso1"),
    document.getElementById("paso2"),
    document.getElementById("paso3")
  ];
  const dots      = [document.getElementById("dot1"), document.getElementById("dot2"), document.getElementById("dot3")];
  const lbls      = [document.getElementById("lbl1"), document.getElementById("lbl2"), document.getElementById("lbl3")];
  const lineas    = [document.getElementById("linea1"), document.getElementById("linea2")];
  const btnSig    = document.getElementById("btnPasoSiguiente");
  const btnAnt    = document.getElementById("btnPasoAnterior");
  const btnConf   = document.getElementById("btnConfirmarReserva");
  const btnPromo  = document.getElementById("btnAplicarPromo");

  // Establecer fechas mínimas
  const hoy = new Date().toISOString().split("T")[0];
  const mañana = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const inputCI = document.getElementById("inputCheckIn");
  const inputCO = document.getElementById("inputCheckOut");
  if (inputCI) { inputCI.min = hoy; inputCI.value = mañana; }
  if (inputCO) {
    const dos = new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0];
    inputCO.min = mañana; inputCO.value = dos;
  }

  // ── Resetear modal al cerrarse ────────────────────────────────
  modalEl.addEventListener("hidden.bs.modal", function () {
    irAPaso(1);
    descuentoAplicado = false;
    document.getElementById("promoApplied")?.classList.remove("show");
    const pi = document.getElementById("inputPromo");
    if (pi) pi.value = "";
    document.getElementById("errorFechas").style.display = "none";
  });

  // ── Botón Siguiente ───────────────────────────────────────────
  if (btnSig) {
    btnSig.addEventListener("click", function () {
      if (pasoActual === 1) {
        if (!validarPaso1()) return;
        irAPaso(2);
      } else if (pasoActual === 2) {
        if (!validarPaso2()) return;
        construirResumen();
        irAPaso(3);
      }
    });
  }

  // ── Botón Anterior ────────────────────────────────────────────
  if (btnAnt) {
    btnAnt.addEventListener("click", function () {
      if (pasoActual > 1) irAPaso(pasoActual - 1);
    });
  }

  // ── Botón Confirmar ───────────────────────────────────────────
  if (btnConf) {
    btnConf.addEventListener("click", function () {
      // Feedback de confirmación
      btnConf.disabled = true;
      btnConf.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Procesando...';

      setTimeout(() => {
        bootstrap.Modal.getOrCreateInstance(modalEl).hide();
        setTimeout(() => {
          showToast("toastReserva") || mostrarToastReserva();
          btnConf.disabled = false;
          btnConf.innerHTML = '<i class="bi bi-check-lg me-1"></i>Confirmar Reserva';
        }, 400);
      }, 1800);
    });
  }

  // ── Botón Aplicar Código Promo ────────────────────────────────
  if (btnPromo) {
    btnPromo.addEventListener("click", function () {
      const val = (document.getElementById("inputPromo")?.value || "").trim().toUpperCase();
      if (val === "HND2026") {
        descuentoAplicado = true;
        document.getElementById("promoApplied")?.classList.add("show");
        recalcularTotales();
        btnPromo.textContent = "Aplicado ✓";
        btnPromo.style.background = "#4ade80";
        btnPromo.style.borderColor = "#4ade80";
        btnPromo.style.color = "#0f1923";
        btnPromo.disabled = true;
      } else {
        document.getElementById("inputPromo").style.borderColor = "#dc3545";
        setTimeout(() => document.getElementById("inputPromo").style.borderColor = "", 2000);
        // shake
        const inp = document.getElementById("inputPromo");
        inp.style.animation = "none";
        inp.offsetHeight; // reflow
        inp.style.animation = "shake .4s ease";
      }
    });
  }

  // ── Helpers ───────────────────────────────────────────────────
  function irAPaso(num) {
    pasoActual = num;

    // Mostrar/ocultar paneles
    pasos.forEach((p, i) => {
      if (p) p.style.display = i === (num - 1) ? "block" : "none";
    });

    // Actualizar indicador
    dots.forEach((d, i) => {
      d.classList.remove("activo", "completado");
      if (i + 1 === num) d.classList.add("activo");
      else if (i + 1 < num) { d.classList.add("completado"); d.innerHTML = '<i class="bi bi-check-lg"></i>'; }
      else d.innerHTML = (i + 1).toString();
    });
    lbls.forEach((l, i) => {
      l.classList.toggle("activo", i + 1 === num);
    });
    lineas.forEach((l, i) => {
      l.classList.toggle("completada", i + 1 < num);
    });

    // Botones footer
    if (btnAnt) btnAnt.style.display = num > 1 ? "inline-flex" : "none";
    if (btnSig) btnSig.style.display = num < 3 ? "inline-flex" : "none";
    if (btnConf) btnConf.style.display = num === 3 ? "inline-flex" : "none";
  }

  function validarPaso1() {
    const hotel = document.getElementById("inputHotel")?.value;
    const ci    = document.getElementById("inputCheckIn")?.value;
    const co    = document.getElementById("inputCheckOut")?.value;
    const errBox = document.getElementById("errorFechas");
    const errTxt = document.getElementById("errorFechasTxt");

    if (!hotel) {
      document.getElementById("inputHotel").style.borderColor = "#dc3545";
      setTimeout(() => document.getElementById("inputHotel").style.borderColor = "", 2000);
      return false;
    }

    if (!ci || !co) {
      if (errBox && errTxt) {
        errTxt.textContent = "Por favor selecciona las fechas de llegada y salida.";
        errBox.style.display = "block";
      }
      return false;
    }

    const fechaCI = new Date(ci);
    const fechaCO = new Date(co);
    const hoyDate = new Date(); hoyDate.setHours(0,0,0,0);

    if (fechaCI < hoyDate) {
      if (errBox && errTxt) {
        errTxt.textContent = "La fecha de llegada no puede ser en el pasado.";
        errBox.style.display = "block";
      }
      return false;
    }

    if (fechaCO <= fechaCI) {
      if (errBox && errTxt) {
        errTxt.textContent = "La fecha de salida debe ser al menos un día después de la llegada.";
        errBox.style.display = "block";
      }
      return false;
    }

    if (errBox) errBox.style.display = "none";
    return true;
  }

  function validarPaso2() {
    const nombre = document.getElementById("inputNombre")?.value.trim();
    const email  = document.getElementById("inputEmail")?.value.trim();
    if (!nombre || !email) {
      ["inputNombre","inputEmail"].forEach(id => {
        const el = document.getElementById(id);
        if (el && !el.value.trim()) {
          el.style.borderColor = "#dc3545";
          el.addEventListener("input", () => el.style.borderColor = "", { once: true });
        }
      });
      return false;
    }
    return true;
  }

  function construirResumen() {
    const hotelVal  = document.getElementById("inputHotel")?.value || "";
    const hotelTxt  = document.getElementById("inputHotel")?.options[document.getElementById("inputHotel").selectedIndex]?.text || "";
    const ci        = document.getElementById("inputCheckIn")?.value || "";
    const co        = document.getElementById("inputCheckOut")?.value || "";
    const adultos   = document.getElementById("inputAdultos")?.value || "2";
    const ninos     = document.getElementById("inputNinos")?.value || "0";
    const habs      = document.getElementById("inputHabitaciones")?.value || "1";
    const nombre    = document.getElementById("inputNombre")?.value.trim() || "";
    const apellido  = document.getElementById("inputApellido")?.value.trim() || "";
    const email     = document.getElementById("inputEmail")?.value.trim() || "";

    // Calcular noches
    const fechaCI = new Date(ci);
    const fechaCO = new Date(co);
    const noches  = Math.max(1, Math.round((fechaCO - fechaCI) / 86400000));

    // Precio base
    const precioPorNoche = preciosPorOpcion[hotelVal] || 95;
    const baseTotal      = precioPorNoche * noches * parseInt(habs);

    // Guardar en window para recalcular
    window._reservaData = { baseTotal, noches, precioPorNoche, habs: parseInt(habs), hotelTxt, ci, co, adultos, ninos, nombre, apellido, email };

    const resumenEl = document.getElementById("resumenContenido");
    if (resumenEl) {
      const fCI = formatearFecha(ci);
      const fCO = formatearFecha(co);
      resumenEl.innerHTML = `
        <h6 style="font-family:'Playfair Display',serif;color:var(--dorado);margin-bottom:1rem;font-size:1.05rem;">
          Resumen de tu Reserva
        </h6>
        <div class="resumen-linea"><span>Hotel</span><span>${hotelTxt.split("—")[0].trim()}</span></div>
        <div class="resumen-linea"><span>Llegada</span><span>${fCI}</span></div>
        <div class="resumen-linea"><span>Salida</span><span>${fCO}</span></div>
        <div class="resumen-linea"><span>Noches</span><span>${noches}</span></div>
        <div class="resumen-linea"><span>Habitaciones</span><span>${habs}</span></div>
        <div class="resumen-linea"><span>Huéspedes</span><span>${adultos} adulto(s)${parseInt(ninos)>0?" + "+ninos+" niño(s)":""}</span></div>
        <div class="resumen-linea"><span>Titular</span><span>${nombre} ${apellido}</span></div>
        <div class="resumen-linea"><span>Correo</span><span>${email}</span></div>
      `;
    }

    recalcularTotales();
  }

  function recalcularTotales() {
    const data = window._reservaData;
    if (!data) return;

    const TAX_RATE      = 0.15;  // IVA Honduras 15%
    const DISC_RATE     = 0.20;  // Descuento HND2026 20%

    const descuento = descuentoAplicado ? data.baseTotal * DISC_RATE : 0;
    const subtotal  = data.baseTotal - descuento;
    const impuesto  = subtotal * TAX_RATE;
    const total     = subtotal + impuesto;

    const totalesEl = document.getElementById("totalesContenido");
    if (totalesEl) {
      totalesEl.innerHTML = `
        <div class="resumen-linea">
          <span>Precio por noche × ${data.noches} noche(s) × ${data.habs} hab.</span>
          <span>$${data.baseTotal.toFixed(2)}</span>
        </div>
        ${descuentoAplicado ? `
        <div class="resumen-linea" style="color:#4ade80">
          <span>Descuento HND2026 (−20%)</span>
          <span>−$${descuento.toFixed(2)}</span>
        </div>` : ""}
        <div class="resumen-linea">
          <span>Subtotal</span>
          <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="resumen-linea">
          <span>IVA (15%)</span>
          <span>$${impuesto.toFixed(2)}</span>
        </div>
        <div class="resumen-linea total">
          <span>TOTAL A PAGAR</span>
          <span>$${total.toFixed(2)} USD</span>
        </div>
      `;
    }
  }

  function formatearFecha(str) {
    if (!str) return "—";
    const d = new Date(str + "T12:00:00");
    return d.toLocaleDateString("es-HN", { day: "2-digit", month: "long", year: "numeric" });
  }

  // Iniciar en paso 1
  irAPaso(1);
}

/* ================================================================
   TOAST DE RESERVA CONFIRMADA (dinámico si no existe en el DOM)
================================================================ */
function mostrarToastReserva() {
  // Crear toast dinámico si no existe
  let el = document.getElementById("toastReservaConf");
  if (!el) {
    el = document.createElement("div");
    el.id = "toastReservaConf";
    el.className = "toast toast-luxe";
    el.setAttribute("role", "alert");
    el.setAttribute("aria-atomic", "true");
    el.innerHTML = `
      <div class="toast-header d-flex justify-content-between align-items-center">
        <span><i class="bi bi-check-circle-fill me-2"></i>HND LUXE</span>
        <button type="button" class="btn-close btn-close-white ms-2" data-bs-dismiss="toast"></button>
      </div>
      <div class="toast-body">
        <strong>¡Reserva confirmada!</strong><br>
        Recibirás un correo de confirmación en breve. ¡Bienvenido a HND LUXE!
      </div>
    `;
    document.getElementById("toast-container").appendChild(el);
  }
  showToast("toastReservaConf", 6000);
}

/* ================================================================
   KEYFRAMES SHAKE (para input de código promo inválido)
================================================================ */
(function injectShakeAnim() {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes shake {
      0%,100% { transform: translateX(0); }
      20%      { transform: translateX(-6px); }
      40%      { transform: translateX(6px); }
      60%      { transform: translateX(-4px); }
      80%      { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(style);
})();
