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
// Original pre-scroll-report movement (6fa5dce): independent 24–28s laps,
// original phase offsets and the separate +/-2px sideways drift.
function journeyOriginalProgress(index,seconds){return ((index/24+Math.sin(index*1.7)*.014+seconds/(24+index%5))%1+1)%1;}
function journeyOriginalKeys(points,index){
 const transform=progress=>{const p=journeyPosition(points,progress);return `translate3d(${p.x.toFixed(2)}px,${p.y.toFixed(2)}px,0)`;};
 const phase=journeyOriginalProgress(index,0),crossing=1-phase,keys=[];
 for(let sample=0;sample<=112;sample++){
  const offset=sample/112;
  if(sample&&crossing>(sample-1)/112&&crossing<=offset){keys.push({transform:transform(1),offset:crossing},{transform:transform(0),offset:crossing});}
  keys.push({transform:transform((phase+offset)%1),offset});
 }
 return keys;
}
function journeyDriftKeys(index,vertical){return Array.from({length:65},(_,k)=>{
 const drift=Math.sin(2*Math.PI*k/64+index)*2;
 return {transform:`translate3d(${vertical?drift.toFixed(3):0}px,${vertical?0:drift.toFixed(3)}px,0)`,offset:k/64};
});}
// Extra lights only move forward within their section, then wrap instantly.
function journeySectionKeys(points,index){
 const a=points[index],b=points[index+1],phase=(index*.38196601125)%1,crossing=1-phase;
 const position=f=>`translate3d(${(a.x+(b.x-a.x)*f).toFixed(2)}px,${(a.y+(b.y-a.y)*f).toFixed(2)}px,0)`;
 return [{transform:position(.22+.56*phase),offset:0},
  {transform:position(.78),offset:crossing},{transform:position(.22),offset:crossing},
  {transform:position(.22+.56*phase),offset:1}];
}
function createJourneyOrbit(timeline,index){
 const frame=timeline.parentElement;if(!frame.classList.contains('journey-frame'))return;
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('class','journey-orbit');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');
 const rail=document.createElementNS('http://www.w3.org/2000/svg','path');rail.setAttribute('class','journey-orbit-rail');rail.setAttribute('fill','none');svg.append(rail);
 const layer=document.createElement('div');layer.className='journey-lights';layer.style.visibility='hidden';layer.setAttribute('aria-hidden','true');
 const makeLight=i=>{
  const carrier=document.createElement('span');carrier.className='journey-carrier';
  const dot=document.createElement('span');dot.className='journey-light';
  const diameter=2.4+(i%5)*.64;dot.style.width=`${diameter}px`;dot.style.height=`${diameter}px`;dot.style.marginLeft=dot.style.marginTop=`${-diameter/2}px`;
  dot.style.opacity=String(.5+(i%4)*.13);dot.style.background=i%3===0?'var(--cashmere)':'var(--gold)';
  carrier.append(dot);layer.append(carrier);return {carrier,dot};
 };
 const particles=Array.from({length:29},(_,i)=>makeLight(i));frame.prepend(svg,layer);
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const origin=performance.now();let animations=[],signature='',scheduled=false;
 const transform=point=>`translate3d(${point.x.toFixed(2)}px,${point.y.toFixed(2)}px,0)`;
 const sync=()=>animations.forEach(animation=>{if(document.hidden)animation.pause();else animation.play();});
 const update=()=>{
  const box=frame.getBoundingClientRect(),markers=[...timeline.querySelectorAll('.timeline-number')];
  // Keep the last painted lights if a webview temporarily reports a zero-size frame.
  if(markers.length<2||!box.width||!box.height)return;
  const points=markers.map(marker=>{const r=marker.getBoundingClientRect();return {x:r.left+r.width/2-box.left,y:r.top+r.height/2-box.top};});
  const next=JSON.stringify([Math.round(box.width),Math.round(box.height),points.map(p=>[Math.round(p.x),Math.round(p.y)]),reduced.matches]);
  if(next===signature)return;signature=next;
  const lengths=points.slice(1).map((p,i)=>Math.hypot(p.x-points[i].x,p.y-points[i].y)),total=lengths.reduce((a,b)=>a+b,0);if(!total)return;
  svg.setAttribute('viewBox',`0 0 ${box.width} ${box.height}`);rail.setAttribute('d',journeyPath(points));
  animations.forEach(animation=>animation.cancel());animations=[];
  const elapsed=performance.now()-origin,vertical=Math.abs(points.at(-1).y-points[0].y)>Math.abs(points.at(-1).x-points[0].x);
  particles.forEach(({carrier,dot},i)=>{
   const section=i-24;
   const keys=i<24?journeyOriginalKeys(points,i):journeySectionKeys(points,section);
   const duration=i<24?(24+i%5)*1000:(23+section*3)*1000;
   carrier.style.transform=keys[0].transform;
   const drift=journeyDriftKeys(i,vertical);dot.style.transform=drift[0].transform;
   if(!reduced.matches&&typeof carrier.animate==='function'){
    const movement=carrier.animate(keys,{duration,iterations:Infinity,easing:'linear'});
    const sway=dot.animate(drift,{duration:Math.PI*4000,iterations:Infinity,easing:'linear'});
    movement.currentTime=sway.currentTime=elapsed;animations.push(movement,sway);
   }
  });
  layer.style.visibility='visible';timeline.classList.add('has-orbit');sync();
 };
 const schedule=()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;update();});};
 if(typeof ResizeObserver!=='undefined')new ResizeObserver(schedule).observe(frame);
 // No IntersectionObserver start/stop and no per-frame JS: scrolling must not reset motion.
 timeline.addEventListener('toggle',schedule,true);window.addEventListener('resize',schedule);reduced.addEventListener('change',schedule);document.addEventListener('visibilitychange',sync);
 if(document.fonts)document.fonts.ready.then(schedule);schedule();
}
document.querySelectorAll('.timeline').forEach(createJourneyOrbit);
