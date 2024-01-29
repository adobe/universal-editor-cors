/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

(()=>{(l=d||(d={})).Call="call",l.Reply="reply",l.Syn="syn",l.SynAck="synAck",l.Ack="ack",(a=s||(s={})).Fulfilled="fulfilled",a.Rejected="rejected",(c=u||(u={})).ConnectionDestroyed="ConnectionDestroyed",c.ConnectionTimeout="ConnectionTimeout",c.NoIframeSrc="NoIframeSrc",(E||(E={})).DataCloneError="DataCloneError",(p||(p={})).Message="message";var e,t,r,n,o,i,l,a,c,d,s,u,E,p,m,g,f,y,h;let T=({name:e,message:t,stack:r})=>({name:e,message:t,stack:r});var v=(e,t,r)=>{let{localName:n,local:o,remote:i,originForSending:l,originForReceiving:a}=e,c=!1,u=e=>{if(e.source!==i||e.data.penpal!==d.Call)return;if("*"!==a&&e.origin!==a)return void r(`${n} received message from origin ${e.origin} which did not match expected origin ${a}`);let{methodName:o,args:u,id:p}=e.data;r(`${n}: Received ${o}() call`);let m=e=>t=>{if(r(`${n}: Sending ${o}() reply`),c)return void r(`${n}: Unable to send ${o}() reply due to destroyed connection`);let a={penpal:d.Reply,id:p,resolution:e,returnValue:t};e===s.Rejected&&t instanceof Error&&(a.returnValue=T(t),a.returnValueIsError=!0);try{i.postMessage(a,l)}catch(e){if(e.name===E.DataCloneError){let t={penpal:d.Reply,id:p,resolution:s.Rejected,returnValue:T(e),returnValueIsError:!0};i.postMessage(t,l)}throw e}};new Promise((e=>e(t[o].apply(t,u)))).then(m(s.Fulfilled),m(s.Rejected))};return o.addEventListener(p.Message,u),()=>{c=!0,o.removeEventListener(p.Message,u)}};let R=0;let b=e=>e?e.split("."):[],C=(e,t,r)=>{let n=b(t);return n.reduce(((e,t,o)=>(void 0===e[t]&&(e[t]={}),o===n.length-1&&(e[t]=r),e[t])),e),e},S=(e,t)=>{let r={};return Object.keys(e).forEach((n=>{let o=e[n],i=((e,t)=>{let r=b(t||"");return r.push(e),(e=>e.join("."))(r)})(n,t);"object"==typeof o&&Object.assign(r,S(o,i)),"function"==typeof o&&(r[i]=o)})),r};var A=(e,t,r,n,o)=>{let{localName:i,local:l,remote:a,originForSending:c,originForReceiving:E}=t,m=!1;o(`${i}: Connecting call sender`);let g=e=>(...t)=>{let r;o(`${i}: Sending ${e}() call`);try{a.closed&&(r=!0)}catch(e){r=!0}if(r&&n(),m){let t=Error(`Unable to send ${e}() call due to destroyed connection`);throw t.code=u.ConnectionDestroyed,t}return new Promise(((r,n)=>{let u=++R,m=t=>{if(t.source!==a||t.data.penpal!==d.Reply||t.data.id!==u)return;if("*"!==E&&t.origin!==E)return void o(`${i} received message from origin ${t.origin} which did not match expected origin ${E}`);let c=t.data;o(`${i}: Received ${e}() reply`),l.removeEventListener(p.Message,m);let g=c.returnValue;c.returnValueIsError&&(g=(e=>{let t=Error();return Object.keys(e).forEach((r=>t[r]=e[r])),t})(g)),(c.resolution===s.Fulfilled?r:n)(g)};l.addEventListener(p.Message,m);let g={penpal:d.Call,id:u,methodName:e,args:t};a.postMessage(g,c)}))};return Object.assign(e,(e=>{let t={};for(let r in e)C(t,r,e[r]);return t})(r.reduce(((e,t)=>(e[t]=g(t),e)),{}))),()=>{m=!0}},w=(e,t)=>{let r;return void 0!==e&&(r=window.setTimeout((()=>{let r=Error(`Connection timed out after ${e}ms`);r.code=u.ConnectionTimeout,t(r)}),e)),()=>{clearTimeout(r)}};var I=(e={})=>{let{parentOrigin:t="*",methods:r={},timeout:n,debug:o=!1}=e,i=(e=>(...t)=>{e&&console.log("[Penpal]",...t)})(o),l=((e,t)=>{let r=[],n=!1;return{destroy(o){n||(n=!0,t(`${e}: Destroying connection`),r.forEach((e=>{e(o)})))},onDestroy(e){n?e():r.push(e)}}})("Child",i),{destroy:a,onDestroy:c}=l,s=((e,t,r,n)=>{let{destroy:o,onDestroy:i}=r;return r=>{if(!(e instanceof RegExp?e.test(r.origin):"*"===e||e===r.origin))return void n(`Child: Handshake - Received SYN-ACK from origin ${r.origin} which did not match expected origin ${e}`);n("Child: Handshake - Received SYN-ACK, responding with ACK");let l="null"===r.origin?"*":r.origin,a={penpal:d.Ack,methodNames:Object.keys(t)};window.parent.postMessage(a,l);let c={localName:"Child",local:window,remote:window.parent,originForSending:l,originForReceiving:r.origin};i(v(c,t,n));let s={};return i(A(s,c,r.data.methodNames,o,n)),s}})(t,S(r),l,i),u=()=>{i("Child: Handshake - Sending SYN");let e={penpal:d.Syn};window.parent.postMessage(e,t instanceof RegExp?"*":t)};return{promise:new Promise(((e,t)=>{let r=w(n,a),o=t=>{if((()=>{try{clearTimeout()}catch(e){return!1}return!0})()&&t.source===parent&&t.data&&t.data.penpal===d.SynAck){let n=s(t);n&&(window.removeEventListener(p.Message,o),r(),e(n))}};window.addEventListener(p.Message,o),u(),c((e=>{window.removeEventListener(p.Message,o),e&&t(e)}))})),destroy(){a()}}};(e=m||(m={})).DRAFT="draft",e.PUBLISHED="published",e.UNPUBLISHED="unpublished",e.OUTDATED="outdated",e.UNKNOWN="unknown",(t=g||(g={})).PAGE="page",t.CONTENT_FRAGMENT="content-fragment",t.EXPERIENCE_FRAGMENT="experience-fragment",t.ASSET="asset",t.TEMPLATE="template",t.POLICIES="policies",t.PRODUCT="product",t.CATALOG="catalog",t.TAG="tag",t.OTHERS="others";let O=Object.freeze({UUID:"id",RESOURCE:"resource",TYPE:"type",PROP:"prop",PARENTID:"parentid",BEHAVIOR:"behavior",LABEL:"label",MODEL:"model",FILTER:"filter"});(r=f||(f={})).EDIT="edit",r.PREVIEW="preview",(n=y||(y={})).TEXT="text",n.MEDIA="media",n.RICHTEXT="richtext",n.REFERENCE="reference",n.CONTAINER="container",n.COMPONENT="component",(o=h||(h={})).TEXT="text",o.MEDIA="media",o.RICHTEXT="richtext",o.REFERENCE="reference",o.CONTAINER="container",o.COMPONENT="component",Object.freeze({BLOCKS:"blocks",FORMAT:"format",ALIGNMENT:"alignment",INDENTATION:"indentation",SR_SCRIPT:"sr_script",LIST:"list",INSERT:"insert",ADVANCED:"advanced",EXTENSIONS:"extensions",EDITOR:"editor"});let N="urn:adobe:aue:",P=`meta[name^='${N}']`,$=`meta[name='${N}config:namespace']`,M=(O.TYPE,{URN_PREFIX:N,META_SELECTOR:P,META_NAMESPACE:$,USER_INPUT_RELAY_MESSAGE:"REMOTE_APP_USER_INPUT",TRANSPARENT_BACKGROUND:"rgba(0, 0, 0, 0)",DEFAULT_PREFIX:"data-aue-",COMPONENT_ITEM_TYPE:"component",RTE_URL:"https://exc-unifiedcontent.experience.adobe.net/solutions/CQ-aem-headless-rte/assets/tinymce-681/js/tinymce/tinymce.min.js",EVENT_UI_SELECT:"aue:ui-select",EVENT_CONTENT_MOVE:"aue:content-move"});var L;function D(e,t,r){function n(){var d=Date.now()-a;d<t&&d>=0?o=setTimeout(n,t-d):(o=null,r||(c=e.apply(l,i),l=i=null))}null==t&&(t=100);var o,i,l,a,c,d=function(){l=this,i=arguments,a=Date.now();var d=r&&!o;return o||(o=setTimeout(n,t)),d&&(c=e.apply(l,i),l=i=null),c};return d.clear=function(){o&&(clearTimeout(o),o=null)},d.flush=function(){o&&(c=e.apply(l,i),l=i=null,clearTimeout(o),o=null)},d}D.debounce=D,L=D;var U=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;let x=[];for(let e=0;e<256;++e)x.push((e+256).toString(16).slice(1));function _(e,t){return e<<t|e>>>32-t}let F=function(e,t,r){function n(e,t,r,n){var o;if("string"==typeof e&&(e=function(e){e=unescape(encodeURIComponent(e));let t=[];for(let r=0;r<e.length;++r)t.push(e.charCodeAt(r));return t}(e)),"string"==typeof t&&(t=function(e){let t;if("string"!=typeof e||!U.test(e))throw TypeError("Invalid UUID");let r=new Uint8Array(16);return r[0]=(t=parseInt(e.slice(0,8),16))>>>24,r[1]=t>>>16&255,r[2]=t>>>8&255,r[3]=255&t,r[4]=(t=parseInt(e.slice(9,13),16))>>>8,r[5]=255&t,r[6]=(t=parseInt(e.slice(14,18),16))>>>8,r[7]=255&t,r[8]=(t=parseInt(e.slice(19,23),16))>>>8,r[9]=255&t,r[10]=(t=parseInt(e.slice(24,36),16))/1099511627776&255,r[11]=t/4294967296&255,r[12]=t>>>24&255,r[13]=t>>>16&255,r[14]=t>>>8&255,r[15]=255&t,r}(t)),16!==(null===(o=t)||void 0===o?void 0:o.length))throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let i=new Uint8Array(16+e.length);if(i.set(t),i.set(e,t.length),(i=function(e){let t=[1518500249,1859775393,2400959708,3395469782],r=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof e){let t=unescape(encodeURIComponent(e));e=[];for(let r=0;r<t.length;++r)e.push(t.charCodeAt(r))}else Array.isArray(e)||(e=Array.prototype.slice.call(e));e.push(128);let n=Math.ceil((e.length/4+2)/16),o=Array(n);for(let t=0;t<n;++t){let r=new Uint32Array(16);for(let n=0;n<16;++n)r[n]=e[64*t+4*n]<<24|e[64*t+4*n+1]<<16|e[64*t+4*n+2]<<8|e[64*t+4*n+3];o[t]=r}o[n-1][14]=8*(e.length-1)/4294967296,o[n-1][14]=Math.floor(o[n-1][14]),o[n-1][15]=8*(e.length-1)&4294967295;for(let e=0;e<n;++e){let n=new Uint32Array(80);for(let t=0;t<16;++t)n[t]=o[e][t];for(let e=16;e<80;++e)n[e]=_(n[e-3]^n[e-8]^n[e-14]^n[e-16],1);let i=r[0],l=r[1],a=r[2],c=r[3],d=r[4];for(let e=0;e<80;++e){let r=Math.floor(e/20),o=_(i,5)+function(e,t,r,n){switch(e){case 0:return t&r^~t&n;case 1:case 3:return t^r^n;case 2:return t&r^t&n^r&n}}(r,l,a,c)+d+t[r]+n[e]>>>0;d=c,c=a,a=_(l,30)>>>0,l=i,i=o}r[0]=r[0]+i>>>0,r[1]=r[1]+l>>>0,r[2]=r[2]+a>>>0,r[3]=r[3]+c>>>0,r[4]=r[4]+d>>>0}return[r[0]>>24&255,r[0]>>16&255,r[0]>>8&255,255&r[0],r[1]>>24&255,r[1]>>16&255,r[1]>>8&255,255&r[1],r[2]>>24&255,r[2]>>16&255,r[2]>>8&255,255&r[2],r[3]>>24&255,r[3]>>16&255,r[3]>>8&255,255&r[3],r[4]>>24&255,r[4]>>16&255,r[4]>>8&255,255&r[4]]}(i))[6]=15&i[6]|80,i[8]=63&i[8]|128,r){n=n||0;for(let e=0;e<16;++e)r[n+e]=i[e];return r}return function(e,t=0){return x[e[t+0]]+x[e[t+1]]+x[e[t+2]]+x[e[t+3]]+"-"+x[e[t+4]]+x[e[t+5]]+"-"+x[e[t+6]]+x[e[t+7]]+"-"+x[e[t+8]]+x[e[t+9]]+"-"+x[e[t+10]]+x[e[t+11]]+x[e[t+12]]+x[e[t+13]]+x[e[t+14]]+x[e[t+15]]}(i)}try{n.name="v5"}catch(e){}return n.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",n.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",n}(),V={element:window.document},k=0,j=(e=M.DEFAULT_PREFIX)=>{let t={};for(let r in O)t[r]=`${e}${O[r]}`;return t},H=(e,t)=>{if(!(e&&e instanceof HTMLElement&&t))return"";let r="";return t===h.TEXT?r=e.textContent||e.innerText:t===h.RICHTEXT?r=e.innerHTML:t===h.MEDIA&&(r=e.src),r},B=e=>{let t=window.getComputedStyle(e).backgroundColor,r=e.parentElement;return t===M.TRANSPARENT_BACKGROUND&&r?B(r):t},X=e=>{if(!(e&&e instanceof HTMLElement))return null;let t=e.textContent||e.innerText,r=e.innerHTML,n=window.getComputedStyle(e);return{content:t,htmlContent:r,style:{font:n.getPropertyValue("font"),visibility:e.style.visibility,color:n.getPropertyValue("color"),textAlign:n.getPropertyValue("text-align"),textTransform:n.getPropertyValue("text-transform"),border:n.getPropertyValue("border"),padding:n.getPropertyValue("padding"),backgroundColor:B(e),width:n.getPropertyValue("width"),height:n.getPropertyValue("height")}}},q="OverlayBlockingElement",Y=()=>{K(),(()=>{let e=document.createElement("div");e.id=q,e.style.cssText="\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 2147483647;",document.body.appendChild(e)})()},K=()=>{let e=document.getElementById(q);e&&e.remove()},G=j(),z=new Map,W=e=>{let t=e.closest(`[${G.RESOURCE}]`);return{cfid:(null==t?void 0:t.getAttribute(G.RESOURCE))||"",prop:(null==t?void 0:t.getAttribute(G.PROP))||""}},J=(e,{resource:t,type:r,prop:n})=>{let o="",i="",l="";if(t){o=`[${G.RESOURCE}="${t}"]`;let r=(e=>{var t;let r=null===(t=e.parentElement)||void 0===t?void 0:t.closest(`[${G.TYPE}="${h.CONTAINER}"]:is([${G.RESOURCE}],[${G.PROP}]`),n=null==r?void 0:r.getAttribute(G.RESOURCE),o=null==r?void 0:r.getAttribute(G.PROP);if(n)return{parentResource:n,parentID:Q([n,o],!0)};let i=r&&W(r).cfid;return o&&i?{parentResource:i,parentID:Q([i,o],!0)}:void 0})(e);i=(null==r?void 0:r.parentID)||"",l=(null==r?void 0:r.parentResource)||""}else{let t=W(e);i=Q([l=t.cfid,t.prop],!0),o=`[${G.RESOURCE}="${l}"] ${e.tagName.toLocaleLowerCase()}[${G.TYPE}="${r}"]`}return n&&(o+=`[${G.PROP}="${n}"]`),{parentid:i,parentResource:l,selector:o,isComponent:r===M.COMPONENT_ITEM_TYPE||e.getAttribute(G.BEHAVIOR)===M.COMPONENT_ITEM_TYPE}},Q=(e,t=!1)=>{let r=e.filter((e=>!!e)).join("_");if(t&&z.has(r))return z.get(r);let n=`_${(e=>(k++,`${e||"id"}${k}`))()}`,o=F(`${r}${n}`,F.URL);return z.set(r,o),o},Z=e=>{let{scrollLeft:t,scrollTop:r}=e.documentElement,n=e.querySelectorAll(`[${G.RESOURCE}],[${G.PROP}]`)||[],o=new Map;return k=0,z.clear(),n.forEach((e=>{let t=(e=>{let t=e.getAttribute(null==G?void 0:G.TYPE),r=e.getAttribute(G.RESOURCE),n=e.getAttribute(G.PROP);if(!r&&!n)return;let o=e.getAttribute(G.MODEL)||"",{parentid:i,parentResource:l,selector:a,isComponent:c}=J(e,{resource:r,type:t,prop:n}),d={id:Q([r||l,n]),type:t||"",resource:r||"",prop:n||"",model:o,rect:e.getBoundingClientRect(),label:e.getAttribute(G.LABEL)||"",parentid:i,selector:a,pageYOffset:window.scrollY,isComponent:c,filter:e.getAttribute(G.FILTER)||"",content:H(e,t),modeltype:o};return t&&[h.TEXT,h.RICHTEXT].includes(t)&&(d={...d,...X(e)}),d})(e);if(t){let e=o.get(t.id);if(o.set(t.id,{...t,children:(null==e?void 0:e.children)||[]}),t.parentid&&t.id!==t.parentid){let e=o.get(t.parentid);e?e.children.push(t.id):o.set(t.parentid,{children:[t.id]})}}})),{editables:o,offset:{x:t,y:r},selected:{}}},ee={viewport:{width:0,height:0},frame:{width:0,height:0},scroll:{x:0,y:0}},te=({editor:e})=>{null==e||e.updateFrameDetails({details:ee})},re=({target:e})=>{let t=e.documentElement;ee.scroll.x=t.scrollLeft,ee.scroll.y=t.scrollTop},ne=({target:e})=>{let t=Math.max(e.document.documentElement.clientWidth||0,e.innerWidth||0),r=Math.max(e.document.documentElement.clientHeight||0,e.innerHeight||0),{width:n,height:o}=e.document.documentElement.getBoundingClientRect();ee.viewport={width:t,height:r},ee.frame={width:Math.ceil(n),height:Math.ceil(o)}},oe=({editor:e,prefix:t})=>{let r=V.element;t&&t!==M.DEFAULT_PREFIX&&Object.assign(G,j(t));let n=(0,L.debounce)((()=>{let t=Z(r);e.repaintEditables({editables:t})}),150);n(),window.removeEventListener("resize",n),window.addEventListener("resize",n),(({element:e,callback:t})=>{let r=new MutationObserver(t);r.observe(e,{attributes:!0,characterData:!0,childList:!0,subtree:!0,attributeOldValue:!0,characterDataOldValue:!0}),r.disconnect})({element:r,callback:n})},ie=({editor:e})=>{let t=window;t.document.addEventListener("scroll",(0,L.debounce)((({target:t})=>{re({target:t}),te({editor:e})}),150)),t.addEventListener("resize",(0,L.debounce)((({target:t})=>{ne({target:t}),te({editor:e})}),150)),t.addEventListener("orientationchange",(0,L.debounce)((({target:r})=>{re({target:t.document}),ne({target:r}),te({editor:e})}),150));let r=(0,L.debounce)((()=>{ne({target:t}),te({editor:e})}),150),n=new ResizeObserver(r);n.observe(t.document.documentElement),n.observe(t.document.body),requestAnimationFrame((()=>{re({target:t.document}),ne({target:t}),te({editor:e})}))},le=({editor:e})=>{document.addEventListener("click",(t=>(({event:e,editor:t})=>{let r=e.target.closest("A");r&&(e.preventDefault(),t.navigateTo({href:r.href}))})({event:t,editor:e})),{capture:!0})},ae=()=>{window.addEventListener("keydown",(({type:e,key:t,altKey:r,metaKey:n,shiftKey:o,ctrlKey:i})=>{parent.postMessage({type:M.USER_INPUT_RELAY_MESSAGE,value:{type:e,key:t,altKey:r,metaKey:n,shiftKey:o,ctrlKey:i}},"*")}))},ce=Object.freeze({edit:"adobe-ue-edit",preview:"adobe-ue-preview"}),de="application/vnd.adobe.aue.",se=e=>e.split("/").pop()||"",ue=e=>{let[t="",r=""]=e.split("/");return`${r.toUpperCase()} ${t}`},Ee=e=>{let{naturalWidth:t,naturalHeight:r}=e;return t&&r&&`${t} x ${r}`||""},pe=e=>{let t=Math.floor(Math.log(e)/Math.log(1024));return`${parseFloat((e/Math.pow(1024,t)).toFixed(0))} ${["B","KB","MB","GB","TB","PB","EB","ZB","YB"][t]}`};var me={},ge=function(e){var t,r=new Set,n=function(e,n){var o="function"==typeof e?e(t):e;if(!Object.is(o,t)){var i=t;t=(null!=n?n:"object"!=typeof o||null===o)?o:Object.assign({},t,o),r.forEach((function(e){return e(t,i)}))}},o=function(){return t},i={setState:n,getState:o,subscribe:function(e){return r.add(e),function(){return r.delete(e)}},destroy:function(){r.clear()}};return t=e(n,o,i),i},fe=function(e){return e?ge(e):ge},ye=function(e){return fe(e)};me.createStore=fe,me.default=ye,(me=ye).createStore=fe,me.default=me;let he=({set:e},t)=>{e((e=>({...e,editor:t})))},Te=({set:e},{mode:t})=>{e((e=>{let r=t===f.EDIT||t===f.PREVIEW;return{...e,mode:t,isInEditor:r}}))},ve=({set:e},t)=>{e((e=>({...e,prefix:t})))},Re=(0,me.createStore)((i=(e,t)=>({mode:f.PREVIEW,isInEditor:!1,prefix:null,editor:null,setMode:Te.bind(null,{get:t,set:e}),setPrefix:ve.bind(null,{get:t,set:e}),setEditor:he.bind(null,{get:t,set:e})}),function(e,t,r){var n=r.subscribe;return r.subscribe=function(e,t,o){var i=e;if(t){var l=(null==o?void 0:o.equalityFn)||Object.is,a=e(r.getState());i=function(r){var n=e(r);if(!l(a,n)){var o=a;t(a=n,o)}},null!=o&&o.fireImmediately&&t(a,a)}return n(i)},i(e,t)})),be=({editable:e,config:t},r=0)=>{window.tinymce?(K(),tinymce.init({...t,setup:t=>{t.on("init",(()=>tinymce.activeEditor.focus())),t.on("keyup",(e=>"Escape"===e.key&&e.target.blur())),t.on("blur",(r=>{let n=r.target.isDirty();((e,t,r)=>{let{editor:n}=Re.getState(),{bodyElement:o}=null==e?void 0:e.target;null==n||n.closeRTE({editable:t,isModified:r,newContent:{html:o.innerHTML,text:o.textContent}})})(r,e,n),((e,t)=>{e.preventDefault(),e.stopImmediatePropagation(),t.remove(),Y()})(r,t)}))}})):r<3&&setTimeout((()=>be({editable:e,config:t},r+1)),100)},Ce=({selector:e,classNames:t,operation:r="toggle"})=>{let n=document.querySelector(e);if(n)for(let e of t)n.classList[r](e)},Se=async({containerSelector:e,selector:t,beforeSelector:r,refresh:n})=>{let o=t&&document.querySelector(t),i=document.querySelector(e);o&&i?((e,t,r)=>{r?document.querySelector(r).before(e):t.appendChild(e)})(o,i,r):n&&window.location.reload()},Ae=()=>{(()=>{let{prefix:e}=Re.getState();document.body.addEventListener(M.EVENT_CONTENT_MOVE,(t=>{let{from:r,to:n}=t.detail;Se({containerSelector:`[${e}${O.RESOURCE}="${r.container.resource}"]`,selector:`[${e}${O.RESOURCE}="${r.component.resource}"]`,beforeSelector:n.before?`[${e}${O.RESOURCE}="${n.before.resource}"]`:void 0})}))})(),document.body.addEventListener(M.EVENT_UI_SELECT,(e=>{let t=e.target;t&&(t.scrollIntoViewIfNeeded?t.scrollIntoViewIfNeeded():t.scrollIntoView({block:"nearest"}))}))},we={updateAppMode:e=>{if(!e)return;let{mode:t,setMode:r}=Re.getState();if(t){if(t===e)return;Ce({selector:"html",classNames:Object.values(ce)})}else Ce({selector:"html",classNames:[ce[e]]});r({mode:e})},getEditableElement:e=>X(document.querySelector(e)),updateField:async({selector:e,value:t,itemid:r,property:n="",itemprop:o})=>{if(null==t)return;let{prefix:i}=Re.getState();n&&n!==o&&(e+=`[${i}${O.PROP}='${n}']`);let l=document.querySelector(e);if(l)((e,t,r)=>{let n=`${t}${O.TYPE}`;(null==e?void 0:e.getAttribute(n))===h.MEDIA?e.src=r:((null==e?void 0:e.getAttribute(n))===h.TEXT||(null==e?void 0:e.getAttribute(n))===h.RICHTEXT)&&(e.innerHTML=r)})(l,i,t);else{let e=document.querySelector(`[${i}${O.RESOURCE}="${r}"]`);(null==e?void 0:e.hasAttribute(n))&&e.setAttribute(n,t);let o=new CustomEvent("editor-update",{detail:{itemids:[r]}});document.dispatchEvent(o)}},removeField:({selector:e})=>{let t=document.querySelector(e);t&&t.remove()},getUrnMappings:()=>[...document.querySelectorAll(M.META_SELECTOR)].reduce(((e,{name:t,content:r})=>{let[n,o]=t.replace(M.URN_PREFIX,"").split(":");return{...e,[n]:o?{...e[n],[o]:r}:r}}),{}),getMediaProperties:async e=>{let t=document.querySelector(e),r=null==t?void 0:t.src;if(!r||!t)return;let{type:n,size:o}=await(async e=>{try{return await fetch(e).then((e=>e.blob()))}catch{return}})(r)||{};return{name:se(r),mimeType:n?ue(n):"",resolution:Ee(t),size:o?pe(o):"",src:r,alt:t.getAttribute("alt")||""}},toggleEditableVisibility:(e,t)=>{let r=document.querySelector(e);r&&(t?r.style.removeProperty("visibility"):r.style.visibility="hidden")},getRichTextColors:e=>{let t=document.querySelector(e),r=[];if(t.getAttribute("itemtype")===h.RICHTEXT)for(let e of t.children){let t=window.getComputedStyle(e).color;r.push(t)}return r},updateContainer:Se,getDocumentProperties:e=>{let t={};try{for(let r of e)void 0!==document[r]?t[r]=document[r]:t[r]=null}catch(e){console.log(e)}return t},getDefinitions:async()=>{let e={},t=document.querySelectorAll(`script[type^="${de}"]`);return await Promise.all([...t].map((async({type:t,src:r,innerText:n})=>{let o=t.replace(de,"").replace("+json",""),i=n?(e=>{try{return JSON.parse(e)}catch(e){return console.log("parseDefinitions",e),null}})(n):await(async e=>{try{return await fetch(e).then((e=>e.json()))}catch(e){return console.log("fetchDefinitions",e),null}})(r);e[o]=i}))),e},triggerEvent:function(e,t,r){var n;let o=new CustomEvent(e,{bubbles:!0,detail:r});null===(n=document.querySelector(t))||void 0===n||n.dispatchEvent(o)},openRTE:be};(async()=>{let e=I({methods:we}),t=await e.promise;Re.getState().setEditor(t);let r=(()=>{let e=document.querySelector(M.META_NAMESPACE);return(null==e?void 0:e.content)?`data-${e.content}-`:M.DEFAULT_PREFIX})();Re.getState().setPrefix(r),(()=>{let e=document.createElement("script");e.id="tiny-mce-script",e.src=M.RTE_URL,document.body.appendChild(e)})(),oe({editor:t,prefix:r}),ie({editor:t}),le({editor:t}),ae(),Ae(),(e=>{Re.subscribe((e=>[e.mode]),(([t],[r])=>{t&&t!==r&&e(t)}))})((e=>{var t;let r={[f.PREVIEW]:K,[f.EDIT]:Y};null===(t=r[e])||void 0===t||t.call(r)}))})()})();