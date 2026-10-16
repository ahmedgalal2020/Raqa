'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(returnFocus = false) { menuButton?.setAttribute('aria-expanded', 'false'); menuButton?.setAttribute('aria-label', 'فتح القائمة'); navigation?.classList.remove('open'); if (returnFocus) menuButton.focus(); }
menuButton?.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'إغلاق القائمة' : 'فتح القائمة'); navigation.classList.toggle('open', open); });
document.addEventListener('keydown', event => { if(event.key === 'Escape' && navigation?.classList.contains('open')) closeMenu(true); });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
navigation?.addEventListener('click', event => { if(event.target.closest('a')) closeMenu(); });
matchMedia('(min-width: 761px)').addEventListener('change', () => closeMenu());
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const heroVideo = document.querySelector('.hero-video');
const videoToggle = document.querySelector('.video-toggle');
if (heroVideo) {
  const stopBackground = () => { heroVideo.pause(); heroVideo.removeAttribute('src'); heroVideo.load(); videoToggle.hidden = true; };
  if (!reducedMotion.matches && !navigator.connection?.saveData) {
    heroVideo.src = matchMedia('(max-width: 700px)').matches ? heroVideo.dataset.mobile : heroVideo.dataset.desktop;
    heroVideo.play().catch(() => { videoToggle.textContent = 'تشغيل الحركة'; videoToggle.setAttribute('aria-label', 'تشغيل حركة الخلفية'); });
    videoToggle.addEventListener('click', () => { if(heroVideo.paused) heroVideo.play().catch(() => {}); else heroVideo.pause(); });
    const updateVideoLabel = () => { const label = heroVideo.paused ? 'تشغيل الحركة' : 'إيقاف الحركة'; videoToggle.textContent = label; videoToggle.setAttribute('aria-label', label); };
    heroVideo.addEventListener('play', updateVideoLabel); heroVideo.addEventListener('pause', updateVideoLabel);
    heroVideo.addEventListener('error', stopBackground);
  } else stopBackground();
  reducedMotion.addEventListener('change', event => { if (event.matches) stopBackground(); });
}
const galleryItems = [...document.querySelectorAll('.gallery-item')];
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  galleryItems.forEach(item => { item.hidden = button.dataset.filter !== 'all' && item.dataset.category !== button.dataset.filter; });
}));
const lightbox = document.querySelector('.lightbox');
let activeImage = 0, opener = null;
const visibleImages = () => galleryItems.filter(item => !item.hidden);
function showImage(index) {
  const items = visibleImages(); activeImage = (index + items.length) % items.length;
  const item = items[activeImage]; const image = lightbox.querySelector('img');
  image.src = item.dataset.full; image.alt = item.dataset.caption;
  lightbox.querySelector('figcaption').textContent = item.dataset.caption;
  lightbox.querySelector('.lightbox-count').textContent = `${activeImage + 1} / ${items.length}`;
}
galleryItems.forEach(item => item.addEventListener('click', () => { opener = item; showImage(visibleImages().indexOf(item)); lightbox.showModal(); document.body.classList.add('modal-open'); lightbox.querySelector('.lightbox-close').focus(); }));
if(lightbox) {
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showImage(activeImage - 1));
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => showImage(activeImage + 1));
  lightbox.addEventListener('close', () => { document.body.classList.remove('modal-open'); opener?.focus(); });
  lightbox.addEventListener('click', event => { if(event.target === lightbox) lightbox.close(); });
  lightbox.addEventListener('keydown', event => { if(event.key === 'ArrowLeft') { event.preventDefault(); showImage(activeImage + 1); } if(event.key === 'ArrowRight') { event.preventDefault(); showImage(activeImage - 1); } });
  let touchStart = null;
  lightbox.addEventListener('touchstart', event => { touchStart = event.touches[0].clientX; }, {passive:true});
  lightbox.addEventListener('touchend', event => { if(touchStart === null) return; const delta = event.changedTouches[0].clientX - touchStart; if(Math.abs(delta) > 55) showImage(activeImage + (delta > 0 ? 1 : -1)); touchStart = null; }, {passive:true});
}
const form = document.querySelector('#booking-form');
if(form) {
  const now = new Date(); const today = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  form.elements.date.min = today;
  const available = /^9665\d{8}$/.test(form.dataset.whatsapp);
  form.querySelector('button[type=submit]').disabled = !available;
  form.addEventListener('submit', event => {
    event.preventDefault(); if(!available) return;
    form.elements.city.setCustomValidity(form.elements.city.value.trim() ? '' : 'يرجى كتابة الموقع أو المدينة.');
    if(!form.reportValidity()) return;
    const values = new FormData(form);
    const lines = ['مرحبًا رِقّة،','أرغب بالاستفسار عن حجز ركن ضيافة.',`نوع المناسبة: ${values.get('event')}`,`تاريخ المناسبة: ${values.get('date')}`,`الموقع: ${String(values.get('city')).trim()}`];
    if(values.get('guests')) lines.push(`عدد الضيوف: ${values.get('guests')}`);
    if(String(values.get('notes')).trim()) lines.push(`ملاحظات: ${String(values.get('notes')).trim()}`);
    location.assign(`https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`);
  });
  form.elements.city.addEventListener('input', () => form.elements.city.setCustomValidity(''));
}
if(!reducedMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.add('reveal'); observer.unobserve(entry.target); } }); }, {threshold:.08});
  document.querySelectorAll('.product-card,.story-copy,.editorial-note').forEach(item => observer.observe(item));
}
