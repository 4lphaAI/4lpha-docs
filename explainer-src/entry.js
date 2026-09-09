import React from 'react';
import {createRoot} from 'react-dom/client';
import {GridExplainer} from './GridExplainer.js';
import {TradeExplainer} from './TradeExplainer.js';
import {RangeExplainer} from './RangeExplainer.js';
import {CompoundExplainer} from './CompoundExplainer.js';
import {LendingExplainer} from './LendingExplainer.js';
const h = React.createElement;
const views = {grid:GridExplainer,trade:TradeExplainer,range:RangeExplainer,compound:CompoundExplainer,lending:LendingExplainer};
const agents = [
['Grid Agent','grid','grid'],
['AR Agent','range','lp'],['AC Agent','compound','lp'],
['Trading Agent','trade','trading'],
['Lending Agent','lending','lending']];
function Gallery(){
 const [selected,setSelected]=React.useState(0);
 const [name,kind,page]=agents[selected];
 return h(React.Fragment,null,
  h('div',{className:'agent-picker','aria-label':'Choose a marketplace agent'},agents.map(([label],i)=>h('button',{key:label,type:'button','aria-pressed':selected===i,onClick:()=>setSelected(i)},label))),
  h('div',{className:'example-heading'},h('strong',null,name),h('a',{href:'#'+page},'Read the guide')),
  h(views[kind],{key:name,protocol:kind==='lending'?'Venus':'PancakeSwap v3'}),
  h('p',{className:'example-note'},'Illustrative animation · Sample prices, balances, timing and outcomes are not live data or performance claims. Agent variants share the same strategy explainer. Actual behavior follows the guide and signed settings.')
 );
}
let roots=[];
function mount(){
 for(const root of roots) root.unmount();
 roots=[];
 const page=(location.hash.slice(1)||'start').split('/')[0];
 const host=document.getElementById('article');
 if(!host)return;
 const configs=page==='start'?['gallery']:page==='grid'?['grid']:page==='trading'?['trade']:page==='lp'?['range','compound']:page==='lending'?['lending']:[];
 if(!configs.length)return;
 const section=document.createElement('section');
 section.className='explainer-block';
 section.setAttribute('aria-label','Animated strategy examples');
 if(page==='start'){
  const heading=document.createElement('h2');heading.textContent='See the agents in action';heading.id='start-section-3';section.append(heading);
  const toc=document.getElementById('toc');const jump=document.createElement('a');jump.href='#start/3';jump.textContent=heading.textContent;toc.children[0]?.after(jump);
  const target=Array.from(host.querySelectorAll('h2')).find(el=>el.textContent==='Start with the essentials');
  target.before(section);
 }else{host.querySelector('.lead').after(section);}
 for(const kind of configs){
  const wrapper=document.createElement('div');wrapper.className='explainer-frame';section.append(wrapper);
  const root=createRoot(wrapper);roots.push(root);
  root.render(kind==='gallery'?h(Gallery):h(React.Fragment,null,
   h(views[kind],{protocol:kind==='lending'?'Venus':'PancakeSwap v3'}),
   h('p',{className:'example-note'},'Illustrative animation · Sample values and compressed timing explain the strategy, not live performance. '+'Execution can wait, fail or be refused.')));
 }
}
window.addEventListener('hashchange',mount);
mount();
