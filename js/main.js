/* ============================================
   مناسبات و هدايا - Main JavaScript
   ============================================ */

const WA_NUMBER = "201125020599"; // رقم الواتساب

// ============ Product Data ============
const products = [
  {
    id: 1,
    name: "باقة الورد الكلاسيكية",
    desc: "باقة جميلة من الورود الطازجة تناسب جميع المناسبات الخاصة والاحتفالات",
    badge: "الأكثر طلباً",
    img: "../images/flower1.jpg",
  },
  {
    id: 2,
    name: "هدية الفراشات الملوّنة",
    desc: "صندوق هدايا فاخر مزيّن بالزهور وعناصر يدوية الصنع بألوان رومانسية رائعة",
    badge: "جديد",
    img: "../images/flower2.jpg",
  },
  {
    id: 3,
    name: "ورود الإيتيرنيتي",
    desc: "ورود محفوظة تدوم أكثر من سنة، تهدية لا تُنسى بألوان متعددة وتغليف أنيق",
    badge: "",
    img: "../images/flower3.jpg",
  },
  {
    id: 4,
    name: "سلة الهدايا الفاخرة",
    desc: "سلة مميزة تحتوي على ورود وشوكولاتة وهدايا يدوية منتقاة بعناية فائقة",
    badge: "مميز",
    img: "../images/flower4.jpg",
  },
  {
    id: 5,
    name: "باقة الزهور المجففة",
    desc: "باقة من الزهور المجففة الطبيعية تدوم لأشهر طويلة وتضيف لمسة بوهيمية جميلة",
    badge: "",
    img: "../images/flower5.jpg",
  },
  {
    id: 6,
    name: "صندوق المفاجأة الوردي",
    desc: "صندوق هدية مميز مليء بالورود والمفاجآت الجميلة المصنوعة يدوياً باللون الوردي",
    badge: "حصري",
    img: "../images/flower6.jpg",
  },
];
// ============ State ============
let selectedProduct = null;

// ============ Render Products ============
function renderProducts() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  grid.innerHTML = products
    .map(
      (p) => `
    <div class="col-md-6 col-lg-4 mb-4 fade-in">
      <div class="product-card">
        <div class="product-image">
          <img src="${p.img}" alt="${p.name}" loading="lazy" />
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
        </div>
        <div class="product-body">
          <h3 class="product-name">${p.name}</h3>
          <p class="product-desc">${p.desc}</p>
          <button
            class="btn-select"
            id="btn-product-${p.id}"
            onclick="selectProduct(${p.id})"
          >
            اختيار هذه الهدية 🎁
          </button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");

  // Trigger animations
  setTimeout(observeFadeIns, 100);
}

// ============ Select Product ============
function selectProduct(id) {
  selectedProduct = products.find((p) => p.id === id);

  // Update all buttons
  products.forEach((p) => {
    const btn = document.getElementById(`btn-product-${p.id}`);
    if (btn) {
      btn.classList.remove("selected");
      btn.textContent = "اختيار هذه الهدية 🎁";
    }
  });

  // Mark selected
  const selectedBtn = document.getElementById(`btn-product-${id}`);
  if (selectedBtn) {
    selectedBtn.classList.add("selected");
    selectedBtn.textContent = "تم الاختيار ✓";
  }

  // Update the order form select
  const orderSelect = document.getElementById("order-product");
  if (orderSelect) {
    orderSelect.value = selectedProduct.name;
    // If not in the list, add it dynamically
    if (!orderSelect.value) {
      const opt = new Option(selectedProduct.name, selectedProduct.name);
      orderSelect.add(opt);
      orderSelect.value = selectedProduct.name;
    }
  }

  // Show toast
  showToast(`✨ تم اختيار "${selectedProduct.name}"`);

  // Smooth scroll to order section
  setTimeout(() => {
    const orderSection = document.getElementById("order");
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 500);
}

// ============ Populate Order Select ============
function populateOrderSelect() {
  const select = document.getElementById("order-product");
  if (!select) return;

  // Clear existing options except first
  while (select.options.length > 1) {
    select.remove(1);
  }

  products.forEach((p) => {
    const opt = new Option(p.name, p.name);
    select.add(opt);
  });
}

// ============ Handle Order Form ============
function handleOrder(e) {
  e.preventDefault();

  const name = document.getElementById("order-name").value.trim();
  const phone = document.getElementById("order-phone").value.trim();
  const product = document.getElementById("order-product").value;
  const note = document.getElementById("order-note").value.trim();

  if (!name || !phone || !product) {
    showToast("⚠️ يرجى تعبئة جميع الحقول المطلوبة");
    return;
  }

  const message = buildWhatsAppMessage({ name, phone, product, note });
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(waUrl, "_blank");
}

// ============ Build WhatsApp Message ============
function buildWhatsAppMessage({ name, phone, product, note }) {
  let msg = `مرحباً 🌸\n`;
  msg += `أريد طلب هدية من مناسبات و هدايا\n\n`;
  msg += `━━━━━━━━━━━━━━━\n`;
  msg += `👤 الاسم: ${name}\n`;
  msg += `📞 رقم الهاتف: ${phone}\n`;
  msg += `🎁 المنتج: ${product}\n`;
  if (note) {
    msg += `📝 ملاحظة: ${note}\n`;
  }
  msg += `━━━━━━━━━━━━━━━\n`;
  msg += `شكراً لكم 💕`;
  return msg;
}

// ============ Floating WhatsApp ============
function openFloatingWA() {
  const msg = `مرحباً 🌸 أريد الاستفسار عن منتجاتكم في مناسبات و هدايا 💕`;
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

// ============ Toast ============
function showToast(message) {
  let toast = document.getElementById("toast-custom");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-custom";
    toast.className = "toast-custom";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// ============ Scroll Animations ============
function observeFadeIns() {
  const els = document.querySelectorAll(".fade-in");
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  els.forEach((el) => observer.observe(el));
}

// ============ Navbar Scroll Effect ============
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = "0 4px 28px rgba(183, 110, 121, 0.15)";
    } else {
      navbar.style.boxShadow = "0 2px 20px rgba(183, 110, 121, 0.08)";
    }
  });
}

// ============ Scroll to Section ============
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ============ Necklace Multi-Select ============
const selectedNecklaces = new Set();

function toggleNecklace(el) {
  const name = el.getAttribute("data-name");
  if (selectedNecklaces.has(name)) {
    selectedNecklaces.delete(name);
    el.classList.remove("chosen");
  } else {
    selectedNecklaces.add(name);
    el.classList.add("chosen");
  }
  updateNecklaceUI();
}

function updateNecklaceUI() {
  const count = selectedNecklaces.size;
  const countEl = document.getElementById("selected-count");
  const numEl = document.getElementById("selected-num");
  const bar = document.getElementById("gallery-order-bar");
  const summary = document.getElementById("gallery-selected-summary");

  if (count === 0) {
    countEl.style.display = "none";
    bar.style.display = "none";
  } else {
    countEl.style.display = "inline-block";
    numEl.textContent = count;
    bar.style.display = "flex";
    const names = [...selectedNecklaces].join(" — ");
    summary.textContent = `🛍️ المختار: ${names}`;
  }
}

function orderSelectedNecklaces() {
  if (selectedNecklaces.size === 0) return;
  const list = [...selectedNecklaces]
    .map((n, i) => `${i + 1}. ${n}`)
    .join("\n");
  let msg = `مرحباً 🌸\nأريد الاستفسار عن هذه القطع من مناسبات و هدايا:\n\n`;
  msg += `━━━━━━━━━━━━━━━\n${list}\n━━━━━━━━━━━━━━━\n`;
  msg += `شكراً لكم 💕`;
  window.open(
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`,
    "_blank",
  );
}

// ============ Init ============
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  populateOrderSelect();
  observeFadeIns();
  initNavbarScroll();

  const orderForm = document.getElementById("order-form");
  if (orderForm) {
    orderForm.addEventListener("submit", handleOrder);
  }
});
