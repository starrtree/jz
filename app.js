'use strict';

// Original photographs are never distorted. This is a curated view of the full archive.
const works = [
  {id:'dense-floral-sleeve',title:'A garden, forever',category:'floral',file:'media/portfolio/dense-floral-sleeve.jpeg',alt:'Dense black-and-grey floral sleeve with roses and leaves'},
  {id:'barbed-wire-rose',title:'Soft, with thorns',category:'floral',file:'media/portfolio/barbed-wire-rose.jpeg',alt:'Fine-line red rose with black barbed-wire details'},
  {id:'centipede',title:'Beautifully unsettling',category:'dark',file:'media/portfolio/centipede.jpeg',alt:'Long black centipede tattoo on an arm'},
  {id:'fine-line-flower',title:'The little things',category:'detail',file:'media/portfolio/fine-line-flower.jpeg',alt:'Small fine-line flower tattoo'},
  {id:'floral-mandala-shoulder',title:'Petal by petal',category:'floral',file:'media/portfolio/floral-mandala-shoulder.jpeg',alt:'Floral mandala tattoo wrapping a shoulder'},
  {id:'anatomical-heart-script',title:'Wear your heart',category:'dark',file:'media/portfolio/anatomical-heart-script.jpeg',alt:'Anatomical heart tattoo with lettering'},
  {id:'roses-cross-butterflies',title:'Something to believe in',category:'floral',file:'media/portfolio/roses-cross-butterflies.jpeg',alt:'Roses, butterflies and a cross tattoo along an arm'},
  {id:'pixel-cat',title:'Electric bones',category:'dark',file:'media/portfolio/pixel-cat.jpeg',alt:'Black skeleton tattoo surrounded by a jagged dark outline'},
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

// One native-scroll controller owns the narrative. No wheel/touch interception.
const drawing=document.querySelector('.living-drawing');
const night=document.querySelector('.night-garden');
const book=document.querySelector('.photobook');
const sourcePaths=[...document.querySelectorAll('.source-lines path')];
const cutouts=[...document.querySelectorAll('.body-cutout')];
const bookPhotos=[...document.querySelectorAll('.book-photo')];
const desktop=window.matchMedia('(min-width: 901px)');
const clamp=value=>Math.max(0,Math.min(1,value));
const progress=(element,start=.85,end=.15)=>{
  const rect=element.getBoundingClientRect();
  return clamp((innerHeight*start-rect.top)/(rect.height+innerHeight*(start-end)));
};
sourcePaths.forEach(path=>path.setAttribute('pathLength','1'));
document.querySelectorAll('.signature-strokes path').forEach((path,i)=>path.style.setProperty('--stroke-index',i));
function updateScroll(){
  frame=0;
  const active=motionAllowed();
  document.body.classList.toggle('motion-enabled',active);
  const draw=active?clamp(progress(drawing,1,0)*2.0):1;
  sourcePaths.forEach((path,i)=>{
    const local=clamp(draw*1.65-i/sourcePaths.length*.65);
    path.style.strokeDashoffset=String(1-local);
  });
  drawing.style.setProperty('--bloom',String(active?clamp((draw-.25)/.65)*.6:.6));
  const nightProgress=progress(night,1,0);
  cutouts.forEach((item,i)=>item.style.translate=active?
    ((i%2?-1:1)*(1-nightProgress)*45)+'px '+((nightProgress-.45)*(i%2?80:-70))+'px':'none');
  const moon=night.querySelector('.moon');
  moon.style.opacity=active?String(clamp(nightProgress*5)):1;
  moon.style.translate=active?'0 '+((1-nightProgress)*35)+'px':'none';
  night.querySelector('.constellation').style.opacity=active?String(clamp(nightProgress*4)):1;
  const rect=book.getBoundingClientRect();
  const p=clamp((74-rect.top)/Math.max(1,rect.height-innerHeight+74));
  book.style.setProperty('--book-progress',(p*100)+'%');
  bookPhotos.forEach((photo,i)=>{
    const enhanced=active&&desktop.matches;
    const turn=clamp(p*2.6-i);
    photo.style.zIndex=String(3-i);
    photo.style.transform=enhanced?
      'translate3d('+(-turn*75)+'%, '+(-turn*28)+'px, 0) rotate('+([-5,5,-2][i]-turn*14)+'deg) rotateY('+(-turn*24)+'deg)':
      'rotate('+([-3,3,-2][i])+'deg)';
    photo.style.opacity=enhanced?String(1-clamp((turn-.65)/.35)):1;
    // Only the top page can receive focus when layered. Full collection follows.
    const covered=enhanced&&(p*2.6<i||turn>.95);
    photo.inert=covered;
    if(covered)photo.setAttribute('aria-hidden','true');else photo.removeAttribute('aria-hidden');
  });
}
function requestScroll(){if(!frame&&!document.hidden)frame=requestAnimationFrame(updateScroll);}
function syncMotion(){
  document.body.classList.toggle('motion-paused',!motionAllowed());
  document.body.classList.toggle('motion-enabled',motionAllowed());
  const button=document.querySelector('#motion-toggle');
  button.setAttribute('aria-pressed',String(!motionAllowed()));
  button.textContent=reducedMotion.matches?'Reduced motion: system setting':manuallyPaused?'Resume decorative motion':'Pause decorative motion';
  button.disabled=reducedMotion.matches;
  document.querySelector('#replay-ink').disabled=!motionAllowed();
  requestScroll();
}
document.querySelector('#replay-ink').addEventListener('click',()=>{
  const signature=document.querySelector('.signature');
  signature.getAnimations({subtree:true}).forEach(animation=>{animation.cancel();animation.play();});
});
document.querySelector('#motion-toggle').addEventListener('click',()=>{manuallyPaused=!manuallyPaused;syncMotion();});
reducedMotion.addEventListener('change',syncMotion);
desktop.addEventListener('change',requestScroll);
window.addEventListener('scroll',requestScroll,{passive:true});
window.addEventListener('resize',requestScroll,{passive:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else requestScroll();});
syncMotion();document.querySelector('#year').textContent=new Date().getFullYear();
