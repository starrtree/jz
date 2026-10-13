'use strict';

// Original photographs are never distorted. This is a curated view of the full archive.
const works = [
  {id:'dense-floral-sleeve',title:'A garden, forever',category:'floral',file:'media/portfolio/dense-floral-sleeve.jpeg',alt:'Dense black-and-grey floral sleeve with roses and leaves'},
  {id:'ghostface-arm',title:'Sweet little nightmare',category:'dark',file:'media/cutout-candidates/ghostface-arm.jpeg',alt:'Red and black Ghostface tattoo with a dagger, webs and hearts'},
  {id:'barbed-wire-rose',title:'Soft, with thorns',category:'floral',file:'media/portfolio/barbed-wire-rose.jpeg',alt:'Fine-line red rose with black barbed-wire details'},
  {id:'centipede',title:'Beautifully unsettling',category:'dark',file:'media/portfolio/centipede.jpeg',alt:'Long black centipede tattoo on an arm'},
  {id:'fine-line-flower',title:'The little things',category:'detail',file:'media/portfolio/fine-line-flower.jpeg',alt:'Small fine-line flower tattoo'},
  {id:'floral-mandala-shoulder',title:'Petal by petal',category:'floral',file:'media/portfolio/floral-mandala-shoulder.jpeg',alt:'Floral mandala tattoo wrapping a shoulder'},
  {id:'stars-foot',title:'Written in the stars',category:'detail',file:'media/cutout-candidates/stars-foot.jpeg',alt:'Stars, fine swirls and animal-print details tattooed across a foot'},
  {id:'anatomical-heart-script',title:'Wear your heart',category:'dark',file:'media/portfolio/anatomical-heart-script.jpeg',alt:'Anatomical heart tattoo with lettering'},
  {id:'roses-cross-butterflies',title:'Something to believe in',category:'floral',file:'media/portfolio/roses-cross-butterflies.jpeg',alt:'Roses, butterflies and a cross tattoo along an arm'},
  {id:'pixel-cat',title:'A little character',category:'detail',file:'media/portfolio/pixel-cat.jpeg',alt:'Small pixel-style cat tattoo'},
  {id:'lilies-arm',title:'Lilies in ink',category:'floral',file:'media/cutout-candidates/lilies-arm.jpeg',alt:'Large lilies and leaves tattooed along an upper arm'},
  {id:'branching-neck-shoulder',title:'Follow the lines',category:'detail',file:'media/cutout-candidates/branching-neck-shoulder.jpeg',alt:'Fine branching tattoo extending from behind the ear across a shoulder'}
];
const sessionOptions = {
  consult:{name:'Consultation',note:'a good place to begin',description:'Talk through your idea and the design direction with JZ.',price:'Free',duration:'60 minutes'},
  small:{name:'Small tattoos / script',note:'small piece, big feeling',description:'For designs 4 inches and under. A $50 deposit is listed on the booking menu.',price:'Price varies',duration:'60 minutes'},
  half:{name:'Half day',note:'make space for the details',description:'For quarter sleeves or several small-to-medium pieces. A $50 deposit is listed.',price:'$500',duration:'4 hours'},
  day:{name:'Tapout / all day',note:'for the brave',description:'Consultation required before booking. The menu lists 8–10 hours of tattoo time and a $50 deposit.',price:'$850',duration:'All-day session'}
};

const gallery = document.querySelector('#gallery');
const dialog = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
let visibleWorks = works;
let selectedIndex = 0;
let previousFocus;
let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let manuallyPaused = false;
let frame = 0;

function motionAllowed(){return !reducedMotion.matches && !manuallyPaused;}
function renderGallery(category='all') {
  visibleWorks = category === 'all' ? works : works.filter(work => work.category === category);
  gallery.replaceChildren();
  for (const [index, work] of visibleWorks.entries()) {
    const figure = document.createElement('figure'); figure.className = 'tattoo-card';
    figure.style.setProperty('--delay', `${Math.min(index % 3 * 60,120)}ms`);
    const link = document.createElement('a'); link.href=work.file;
    link.setAttribute('aria-label', `View ${work.title}: ${work.alt}`);
    const wrapper=document.createElement('div'); wrapper.className='tattoo-image';
    const image=document.createElement('img'); image.src=work.file; image.alt=work.alt;
    image.loading='lazy'; image.decoding='async'; image.width=640; image.height=800;
    wrapper.append(image); link.append(wrapper);
    const caption=document.createElement('figcaption'); caption.append(work.title);
    const number=document.createElement('span'); number.textContent=String(works.indexOf(work)+1).padStart(2,'0'); caption.append(number);
    figure.append(link,caption); gallery.append(figure);
    link.addEventListener('click',event=>{
      if(typeof dialog.showModal!=='function' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)return;
      event.preventDefault(); selectedIndex=index; previousFocus=link; updateLightbox();
      dialog.showModal(); document.body.classList.add('modal-open'); document.querySelector('#close-lightbox').focus();
    });
    if(revealObserver)revealObserver.observe(figure);
  }
  document.querySelector('#gallery-count').textContent=`${visibleWorks.length} pieces · tap to explore`;
}

const revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries=>{
  for(const entry of entries){if(entry.isIntersecting){if(motionAllowed())entry.target.classList.add('arriving');revealObserver.unobserve(entry.target);}}
},{threshold:.08}) : null;
renderGallery();
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-filter]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  renderGallery(button.dataset.filter);
}));

function updateLightbox(){
  const work=visibleWorks[selectedIndex];
  lightboxImage.src=work.file;lightboxImage.alt=work.alt;
  document.querySelector('#lightbox-title').textContent=`${work.title} · ${selectedIndex+1}/${visibleWorks.length}`;
  document.querySelector('#original-photo').href=work.file;
}
function movePhoto(delta){selectedIndex=(selectedIndex+delta+visibleWorks.length)%visibleWorks.length;updateLightbox();}
document.querySelector('#previous-photo').addEventListener('click',()=>movePhoto(-1));
document.querySelector('#next-photo').addEventListener('click',()=>movePhoto(1));
document.querySelector('#close-lightbox').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');if(previousFocus?.isConnected)previousFocus.focus();lightboxImage.removeAttribute('src');});
dialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();movePhoto(-1);}if(event.key==='ArrowRight'){event.preventDefault();movePhoto(1);}});
dialog.addEventListener('click',event=>{const rect=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom))dialog.close();});

document.querySelectorAll('[data-session]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-session]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  const session=sessionOptions[button.dataset.session];
  document.querySelector('#session-name').textContent=session.name;
  document.querySelector('#session-note').textContent=session.note;
  document.querySelector('#session-description').textContent=session.description;
  const price=document.querySelector('#session-price');const duration=document.createElement('span');duration.textContent=` · ${session.duration}`;price.replaceChildren(session.price,duration);
}));

const portrait=document.querySelector('.hero-portrait');
const hero=document.querySelector('.hero');
const drifters=[...document.querySelectorAll('[data-drift]')];
function updateScroll(){
  frame=0;if(!motionAllowed()||document.hidden)return;
  const heroRect=hero.getBoundingClientRect();
  if(heroRect.bottom>0&&heroRect.top<innerHeight){portrait.style.translate=`0 ${Math.min(20,Math.max(0,-heroRect.top*.035))}px`;}
  for(const element of drifters){const rect=element.parentElement.getBoundingClientRect();if(rect.bottom>0&&rect.top<innerHeight){const progress=Math.max(-1,Math.min(1,(innerHeight/2-rect.top)/innerHeight));element.style.translate=`0 ${progress*Number(element.dataset.drift)}px`;}}
}
function requestScroll(){if(!frame&&motionAllowed())frame=requestAnimationFrame(updateScroll);}
function syncMotion(){
  document.body.classList.toggle('motion-paused',manuallyPaused||reducedMotion.matches);
  const button=document.querySelector('#motion-toggle');button.setAttribute('aria-pressed',String(manuallyPaused||reducedMotion.matches));
  button.textContent=reducedMotion.matches?'Reduced motion: system setting':manuallyPaused?'Resume decorative motion':'Pause decorative motion';
  button.disabled=reducedMotion.matches;
  if(!motionAllowed()){cancelAnimationFrame(frame);frame=0;portrait.style.removeProperty('translate');drifters.forEach(item=>item.style.removeProperty('translate'));}
  else requestScroll();
}
document.querySelector('#motion-toggle').addEventListener('click',()=>{manuallyPaused=!manuallyPaused;syncMotion();});
reducedMotion.addEventListener('change',syncMotion);
window.addEventListener('scroll',requestScroll,{passive:true});window.addEventListener('resize',requestScroll,{passive:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else requestScroll();});
syncMotion();document.querySelector('#year').textContent=new Date().getFullYear();
