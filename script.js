// Optional: add real numbers to make your STAR results measurable, e.g. "Resolved 40+ support requests in 8 weeks."
// Contact settings: paste your own Facebook profile link and a phone number you are comfortable sharing.
const CONTACT={facebook:"https://www.facebook.com/welbertrayponbanua/",phone:""};
const METRICS={m1:"",m2:""};
for(const k in METRICS){if(METRICS[k]){const e=document.getElementById(k);e.textContent="Measured result: "+METRICS[k];e.hidden=false}}
const $=id=>document.getElementById(id);
$('c-fb').href=CONTACT.facebook;
if(CONTACT.phone){const t=$('c-tel');t.href='tel:'+CONTACT.phone.replace(/[^+\d]/g,'');$('tel-h').textContent=CONTACT.phone;$('tel-p').textContent='Tap to call.'}
// theme
function tg(){const r=document.documentElement,d=r.dataset.theme==='dark'||(!r.dataset.theme&&matchMedia('(prefers-color-scheme:dark)').matches);r.dataset.theme=d?'light':'dark'}
$('tg').onclick=tg;
// highlight current section in nav
const links=[...document.querySelectorAll('nav a')];
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))})},{rootMargin:'-30% 0px -60% 0px'});
document.querySelectorAll('main section').forEach(s=>io.observe(s));
// demo
const D={rows:[{no:'2024-001',n:'Student A',st:'Enrolled'},{no:'2024-002',n:'Student B',st:'Enrolled'},{no:'2023-010',n:'Student C',st:'Graduated'}],edit:-1};
const esc=t=>String(t).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
function draw(){const q=$('dq').value.trim().toLowerCase();
const rows=D.rows.map((r,i)=>[r,i]).filter(([r])=>(r.no+' '+r.n).toLowerCase().includes(q));
$('dt').innerHTML=rows.map(([r,i])=>`<tr><td>${esc(r.no)}</td><td>${esc(r.n)}</td><td>${esc(r.st)}</td><td class="da"><button data-e="${i}">Edit</button><button data-d="${i}">Delete</button></td></tr>`).join('')||'<tr><td colspan="4">No students found.</td></tr>'}
function reset(){$('df').reset();D.edit=-1;$('dsave').textContent='Add'}
$('df').addEventListener('submit',e=>{e.preventDefault();const no=$('dno').value.trim(),n=$('dname').value.trim(),st=$('dst').value;
if(!no||!n){$('derr').textContent='Please fill in all fields.';return}
if(D.rows.some((r,i)=>r.no===no&&i!==D.edit)){$('derr').textContent='That student number already exists.';return}
$('derr').textContent='';if(D.edit>=0)D.rows[D.edit]={no,n,st};else D.rows.unshift({no,n,st});reset();draw()});
$('dt').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
if(b.dataset.d!==undefined&&confirm('Delete this student?')){D.rows.splice(+b.dataset.d,1);reset();draw()}
if(b.dataset.e!==undefined){const r=D.rows[+b.dataset.e];D.edit=+b.dataset.e;$('dno').value=r.no;$('dname').value=r.n;$('dst').value=r.st;$('dsave').textContent='Save';$('dname').focus()}});
$('dq').addEventListener('input',draw);
const dm=$('demo');let last=null;
$('open-demo').onclick=e=>{last=e.currentTarget;dm.hidden=false;draw();$('dno').focus()};
const close=()=>{dm.hidden=true;if(last)last.focus()};
$('dx').onclick=close;dm.addEventListener('click',e=>{if(e.target===dm)close()});
addEventListener('keydown',e=>{if(e.key==='Escape'&&!dm.hidden)close()});

// ================= motion & polish =================
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
// 1. scroll progress, header shadow, back-to-top
(function(){const bar=$('prog'),hd=document.querySelector('header.top'),up=$('up');let t=false;
function upd(){t=false;const h=document.documentElement,m=h.scrollHeight-innerHeight,y=scrollY;
bar.style.transform='scaleX('+(m>0?y/m:0)+')';hd.classList.toggle('sc',y>10);up.classList.toggle('show',y>600)}
addEventListener('scroll',()=>{if(!t){t=true;requestAnimationFrame(upd)}},{passive:true});upd();
up.onclick=()=>scrollTo({top:0,behavior:reduce?'auto':'smooth'})})();
// 2. rotating role text
(function(){const el=$('rot');if(!el||reduce)return;const R=['IT Support Trainee','PHP & MySQL Builder','Problem Solver'];let i=0,j=R[0].length,del=true;
function k(){if(del){if(j>0){j--;el.textContent=R[i].slice(0,j);setTimeout(k,35)}else{del=false;i=(i+1)%R.length;setTimeout(k,250)}}
else if(j<R[i].length){j++;el.textContent=R[i].slice(0,j);setTimeout(k,70)}else{del=true;setTimeout(k,1900)}}
setTimeout(k,2200)})();
// 3. reveal on scroll
(function(){if(reduce||!('IntersectionObserver' in window))return;
const els=[...new Set(document.querySelectorAll('main section .num,main section h2,main section .intro,main .card,main .sheet'))];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const el=e.target;el.classList.add('in');io.unobserve(el);
setTimeout(()=>{el.classList.remove('rv','in');el.style.transitionDelay=''},1200)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
els.forEach(el=>{const i=[...el.parentElement.children].indexOf(el);el.style.transitionDelay=Math.min(i,5)*70+'ms';el.classList.add('rv');io.observe(el)})})();
// 4. card spotlight + tilt (mouse only)
(function(){if(reduce||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;
document.querySelectorAll('.card').forEach(c=>{
c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
c.style.setProperty('--mx',x*100+'%');c.style.setProperty('--my',y*100+'%');
c.style.transform='perspective(900px) rotateX('+((.5-y)*4)+'deg) rotateY('+((x-.5)*6)+'deg) translateY(-3px)'});
c.addEventListener('pointerleave',()=>{c.style.transform=''})})})();
// 5. animated network background in the hero
(function(){const c=$('net');if(!c)return;const hero=c.parentElement,ctx=c.getContext('2d');
let W=0,H=0,pts=[],mx=-999,my=-999,run=true,raf=0,col={l:['#2B3FDE','#0A7F70','#D6336C','#C2410C','#7048E8']};
function colors(){const s=getComputedStyle(document.documentElement);col.l=['--c1','--c2','--c3','--c4','--c5'].map((v,i)=>s.getPropertyValue(v).trim()||col.l[i])}
function size(){const r=hero.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);W=r.width;H=r.height;c.width=W*d;c.height=H*d;ctx.setTransform(d,0,0,d,0,0);
const n=Math.min(70,Math.round(W*H/12000));pts=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35}));draw()}
function draw(){ctx.clearRect(0,0,W,H);
for(const p of pts){if(!reduce){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
const dx=p.x-mx,dy=p.y-my,d=Math.sqrt(dx*dx+dy*dy);if(d<110&&d>0){p.x+=dx/d*1.6;p.y+=dy/d*1.6}}}
ctx.lineWidth=1;
for(let i=0;i<pts.length;i++){const p=pts[i];ctx.globalAlpha=.6;ctx.fillStyle=col.l[i%5];ctx.beginPath();ctx.arc(p.x,p.y,2,0,6.2832);ctx.fill();
for(let j=i+1;j<pts.length;j++){const q=pts[j],dx=p.x-q.x,dy=p.y-q.y,d=dx*dx+dy*dy;
if(d<14400){ctx.globalAlpha=(1-d/14400)*.4;ctx.strokeStyle=col.l[(i+2)%5];ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}}}
ctx.globalAlpha=1}
function loop(){raf=0;draw();if(run&&!reduce&&!document.hidden)raf=requestAnimationFrame(loop)}
function start(){if(!raf&&!reduce)raf=requestAnimationFrame(loop)}
hero.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top});
hero.addEventListener('pointerleave',()=>{mx=my=-999});
if('IntersectionObserver' in window)new IntersectionObserver(es=>{run=es[0].isIntersecting;if(run)start()}).observe(hero);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)start()});
$('tg').addEventListener('click',()=>{colors();draw()});
if('ResizeObserver' in window)new ResizeObserver(size).observe(hero);else addEventListener('resize',size);
colors();size();start()})();
