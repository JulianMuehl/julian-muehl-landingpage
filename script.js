const toggle=document.querySelector('.menu-toggle');const menu=document.querySelector('#menu');function closeMenu(){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Menü öffnen');}toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Menü schließen':'Menü öffnen');menu.classList.toggle('open',open);});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}});document.addEventListener('click',e=>{if(!e.target.closest('nav'))closeMenu();});
// Details stay within the page: broad below the desktop row, local on mobile.
function createJourneyInline(timeline,index){
 const frame=timeline.parentElement;
 const summaries=[...timeline.querySelectorAll('.step-detail > summary')];
 if(!summaries.length)return;
 const panel=document.createElement('section');panel.className='journey-inline';panel.id=`journey-inline-${index}`;panel.hidden=true;
 const head=document.createElement('div');head.className='inline-head';
 const title=document.createElement('h3');title.id=`journey-inline-title-${index}`;
 panel.setAttribute('aria-labelledby',title.id);
 const close=document.createElement('button');close.type='button';close.className='inline-close';close.textContent='Schließen';
 const body=document.createElement('div');body.className='inline-body';head.append(title,close);panel.append(head,body);frame.append(panel);
 const mobile=window.matchMedia('(max-width: 1100px)');
 let active=null,version=0,original=null;
 const pin=(button,mutate)=>{
  const root=document.documentElement,top=button.getBoundingClientRect().top,current=++version;
  if(original===null)original={behavior:root.style.scrollBehavior,anchor:root.style.overflowAnchor};
  root.style.scrollBehavior='auto';root.style.overflowAnchor='none';mutate();
  const correct=()=>window.scrollBy({top:button.getBoundingClientRect().top-top,left:0,behavior:'auto'});
  correct();requestAnimationFrame(()=>{
   if(current!==version)return;correct();
   requestAnimationFrame(()=>{if(current!==version)return;root.style.scrollBehavior=original.behavior;root.style.overflowAnchor=original.anchor;original=null;});
  });
 };
 const place=()=>{if(active)(mobile.matches?active.item:frame).append(panel);};
 const choices=summaries.map(summary=>{
  const item=summary.closest('li'),detail=summary.parentElement,button=document.createElement('button');
  button.type='button';button.className='journey-trigger';button.textContent='Mehr erfahren';button.setAttribute('aria-controls',panel.id);button.setAttribute('aria-expanded','false');
  detail.before(button);
  const choice={item,detail,button};
  button.addEventListener('click',()=>pin(button,()=>{
   const closing=active===choice;
   choices.forEach(other=>{other.button.setAttribute('aria-expanded','false');other.item.classList.remove('is-active');});
   if(closing){panel.hidden=true;active=null;return;}
   active=choice;title.textContent=item.querySelector('h3').textContent;body.replaceChildren(detail.querySelector('div').cloneNode(true));
   place();panel.hidden=false;button.setAttribute('aria-expanded','true');item.classList.add('is-active');
  }));return choice;
 });
 close.addEventListener('click',()=>{if(!active)return;const button=active.button;pin(button,()=>{panel.hidden=true;button.setAttribute('aria-expanded','false');active.item.classList.remove('is-active');active=null;button.focus({preventScroll:true});});});
 mobile.addEventListener('change',()=>{if(active)pin(active.button,place);});
 timeline.classList.add('has-inline');
}
document.querySelectorAll('.timeline').forEach(createJourneyInline);

// Continuous line and dense, varied lights; no unpositioned SVG/SMIL circles.
function journeyPath(points){return points.map((p,i)=>`${i===0?'M':'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ');}
function journeyPosition(points,progress){
 const lengths=points.slice(1).map((p,i)=>Math.hypot(p.x-points[i].x,p.y-points[i].y));
 const total=lengths.reduce((sum,n)=>sum+n,0);let remaining=progress*total;
 for(let i=0;i<lengths.length;i++){
  if(remaining<=lengths[i]||i===lengths.length-1){const fraction=lengths[i]?remaining/lengths[i]:0;return {x:points[i].x+(points[i+1].x-points[i].x)*fraction,y:points[i].y+(points[i+1].y-points[i].y)*fraction};}
  remaining-=lengths[i];
 }
 return points[0];
}
function createJourneyOrbit(timeline,index){
 const frame=timeline.parentElement;if(!frame.classList.contains('journey-frame'))return;
 const make=(tag,attrs={})=>{const el=document.createElementNS('http://www.w3.org/2000/svg',tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,String(v)));return el;};
 const svg=make('svg',{'class':'journey-orbit','aria-hidden':'true',focusable:'false'});svg.style.visibility='hidden';
 const defs=make('defs'),filter=make('filter',{id:`journey-glow-${index}`,x:'-200%',y:'-200%',width:'500%',height:'500%'});
 filter.append(make('feGaussianBlur',{stdDeviation:'2.4'}));defs.append(filter);svg.append(defs);
 const rail=make('path',{'class':'journey-orbit-rail',fill:'none'});svg.append(rail);
 const particles=Array.from({length:24},(_,i)=>{
  const group=make('g',{'class':'journey-particle'}),radius=1.2+(i%5)*.32;
  group.append(make('circle',{r:5+(i%4)*1.5,opacity:.12+(i%3)*.035,fill:'var(--gold)',filter:`url(#journey-glow-${index})`}));
  group.append(make('circle',{r:radius,opacity:.5+(i%4)*.13,fill:i%3===0?'var(--cashmere)':'var(--gold)'}));
  svg.append(group);return group;
 });frame.prepend(svg);
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 let points=[],visible=true,animation=0,scheduled=false,epoch=null,lastDraw=0;
 const draw=seconds=>{
  if(points.length<2)return;
  const vertical=Math.abs(points.at(-1).y-points[0].y)>Math.abs(points.at(-1).x-points[0].x);
  particles.forEach((particle,i)=>{
   const progress=((i/24+Math.sin(i*1.7)*.014+seconds/(24+i%5))%1+1)%1;
   const point=journeyPosition(points,progress),drift=Math.sin(seconds*.5+i)*2;
   if(vertical)point.x+=drift;else point.y+=drift;
   particle.setAttribute('transform',`translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`);
  });
 };
 const animate=now=>{
  animation=0;if(!visible||reduced.matches||points.length<2)return;
  if(epoch===null)epoch=now;
  if(now-lastDraw>=32){draw((now-epoch)/1000);lastDraw=now;}
  animation=requestAnimationFrame(animate);
 };
 const run=()=>{
  if(!visible||reduced.matches){if(animation)cancelAnimationFrame(animation);animation=0;if(reduced.matches)draw(0);return;}
  if(!animation&&points.length>1)animation=requestAnimationFrame(animate);
 };
 const update=()=>{
  const box=frame.getBoundingClientRect(),markers=[...timeline.querySelectorAll('.timeline-number')];
  if(markers.length<2||!box.width||!box.height){svg.style.visibility='hidden';return;}
  points=markers.map(marker=>{const r=marker.getBoundingClientRect();return {x:r.left+r.width/2-box.left,y:r.top+r.height/2-box.top};});
  svg.setAttribute('viewBox',`0 0 ${box.width} ${box.height}`);rail.setAttribute('d',journeyPath(points));
  draw(0);svg.style.visibility='visible';timeline.classList.add('has-orbit');run();
 };
 const schedule=()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;update();});};
 if(typeof ResizeObserver!=='undefined')new ResizeObserver(schedule).observe(frame);
 if(typeof IntersectionObserver!=='undefined')new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;run();}).observe(frame);
 timeline.addEventListener('toggle',schedule,true);window.addEventListener('resize',schedule);reduced.addEventListener('change',run);
 if(document.fonts)document.fonts.ready.then(schedule);schedule();
}
document.querySelectorAll('.timeline').forEach(createJourneyOrbit);
