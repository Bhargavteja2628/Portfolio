const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{
    mx=e.clientX; my=e.clientY;
    cursor.style.left=mx+'px'; cursor.style.top=my+'px';
  });
  (function animRing(){
    rx += (mx-rx)*0.12; ry += (my-ry)*0.12;
    ring.style.left=rx+'px'; ring.style.top=ry+'px';
    requestAnimationFrame(animRing);
  })();

  // Hover effects on cursor
  document.querySelectorAll('a,button,.about-card,.skill-group,.edu-card,.cert-card,.contact-item,.nav-dot').forEach(el=>{
    el.addEventListener('mouseenter',()=>{
      cursor.style.width='20px'; cursor.style.height='20px';
      ring.style.width='56px'; ring.style.height='56px';
    });
    el.addEventListener('mouseleave',()=>{
      cursor.style.width='10px'; cursor.style.height='10px';
      ring.style.width='36px'; ring.style.height='36px';
    });
  });

  // Scroll progress
  const scrollBar = document.getElementById('scrollBar');
  window.addEventListener('scroll',()=>{
    const pct = window.scrollY/(document.body.scrollHeight-window.innerHeight)*100;
    scrollBar.style.width=pct+'%';
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach((e,i)=>{
      if(e.isIntersecting){
        setTimeout(()=>e.target.classList.add('visible'),i*80);
      }
    });
  },{threshold:0.1});
  reveals.forEach(r=>observer.observe(r));

  // Active nav dots
  const sections = ['hero','about','skills','experience','education','certifications','contact'];
  function scrollTo(id){ document.getElementById(id).scrollIntoView({behavior:'smooth'}); }

  const dotObserver = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        document.querySelectorAll('.nav-dot').forEach(d=>d.classList.remove('active'));
        const dot = document.querySelector(`.nav-dot[data-section="${e.target.id}"]`);
        if(dot) dot.classList.add('active');
      }
    });
  },{threshold:0.5});
  sections.forEach(s=>{ const el=document.getElementById(s); if(el) dotObserver.observe(el); });