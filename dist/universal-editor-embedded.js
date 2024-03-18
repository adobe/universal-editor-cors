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

(()=>{(l=c||(c={})).Call="call",l.Reply="reply",l.Syn="syn",l.SynAck="synAck",l.Ack="ack",(a=s||(s={})).Fulfilled="fulfilled",a.Rejected="rejected",(d=u||(u={})).ConnectionDestroyed="ConnectionDestroyed",d.ConnectionTimeout="ConnectionTimeout",d.NoIframeSrc="NoIframeSrc",(E||(E={})).DataCloneError="DataCloneError",(p||(p={})).Message="message";var e,t,n,r,o,i,l,a,d,c,s,u,E,p,m,f,g,v,T;let h=({name:e,message:t,stack:n})=>({name:e,message:t,stack:n});var R=(e,t,n)=>{let{localName:r,local:o,remote:i,originForSending:l,originForReceiving:a}=e,d=!1,u=e=>{if(e.source!==i||e.data.penpal!==c.Call)return;if("*"!==a&&e.origin!==a)return void n(`${r} received message from origin ${e.origin} which did not match expected origin ${a}`);let{methodName:o,args:u,id:p}=e.data;n(`${r}: Received ${o}() call`);let m=e=>t=>{if(n(`${r}: Sending ${o}() reply`),d)return void n(`${r}: Unable to send ${o}() reply due to destroyed connection`);let a={penpal:c.Reply,id:p,resolution:e,returnValue:t};e===s.Rejected&&t instanceof Error&&(a.returnValue=h(t),a.returnValueIsError=!0);try{i.postMessage(a,l)}catch(e){if(e.name===E.DataCloneError){let t={penpal:c.Reply,id:p,resolution:s.Rejected,returnValue:h(e),returnValueIsError:!0};i.postMessage(t,l)}throw e}};new Promise((e=>e(t[o].apply(t,u)))).then(m(s.Fulfilled),m(s.Rejected))};return o.addEventListener(p.Message,u),()=>{d=!0,o.removeEventListener(p.Message,u)}};let y=0;let b=e=>e?e.split("."):[],N=(e,t,n)=>{let r=b(t);return r.reduce(((e,t,o)=>(void 0===e[t]&&(e[t]={}),o===r.length-1&&(e[t]=n),e[t])),e),e},I=(e,t)=>{let n={};return Object.keys(e).forEach((r=>{let o=e[r],i=((e,t)=>{let n=b(t||"");return n.push(e),(e=>e.join("."))(n)})(r,t);"object"==typeof o&&Object.assign(n,I(o,i)),"function"==typeof o&&(n[i]=o)})),n};var C=(e,t,n,r,o)=>{let{localName:i,local:l,remote:a,originForSending:d,originForReceiving:E}=t,m=!1;o(`${i}: Connecting call sender`);let f=e=>(...t)=>{let n;o(`${i}: Sending ${e}() call`);try{a.closed&&(n=!0)}catch(e){n=!0}if(n&&r(),m){let t=Error(`Unable to send ${e}() call due to destroyed connection`);throw t.code=u.ConnectionDestroyed,t}return new Promise(((n,r)=>{let u=++y,m=t=>{if(t.source!==a||t.data.penpal!==c.Reply||t.data.id!==u)return;if("*"!==E&&t.origin!==E)return void o(`${i} received message from origin ${t.origin} which did not match expected origin ${E}`);let d=t.data;o(`${i}: Received ${e}() reply`),l.removeEventListener(p.Message,m);let f=d.returnValue;d.returnValueIsError&&(f=(e=>{let t=Error();return Object.keys(e).forEach((n=>t[n]=e[n])),t})(f)),(d.resolution===s.Fulfilled?n:r)(f)};l.addEventListener(p.Message,m);let f={penpal:c.Call,id:u,methodName:e,args:t};a.postMessage(f,d)}))};return Object.assign(e,(e=>{let t={};for(let n in e)N(t,n,e[n]);return t})(n.reduce(((e,t)=>(e[t]=f(t),e)),{}))),()=>{m=!0}},w=(e,t)=>{let n;return void 0!==e&&(n=window.setTimeout((()=>{let n=Error(`Connection timed out after ${e}ms`);n.code=u.ConnectionTimeout,t(n)}),e)),()=>{clearTimeout(n)}};var A=(e={})=>{let{parentOrigin:t="*",methods:n={},timeout:r,debug:o=!1}=e,i=(e=>(...t)=>{e&&console.log("[Penpal]",...t)})(o),l=((e,t)=>{let n=[],r=!1;return{destroy(o){r||(r=!0,t(`${e}: Destroying connection`),n.forEach((e=>{e(o)})))},onDestroy(e){r?e():n.push(e)}}})("Child",i),{destroy:a,onDestroy:d}=l,s=((e,t,n,r)=>{let{destroy:o,onDestroy:i}=n;return n=>{if(!(e instanceof RegExp?e.test(n.origin):"*"===e||e===n.origin))return void r(`Child: Handshake - Received SYN-ACK from origin ${n.origin} which did not match expected origin ${e}`);r("Child: Handshake - Received SYN-ACK, responding with ACK");let l="null"===n.origin?"*":n.origin,a={penpal:c.Ack,methodNames:Object.keys(t)};window.parent.postMessage(a,l);let d={localName:"Child",local:window,remote:window.parent,originForSending:l,originForReceiving:n.origin};i(R(d,t,r));let s={};return i(C(s,d,n.data.methodNames,o,r)),s}})(t,I(n),l,i),u=()=>{i("Child: Handshake - Sending SYN");let e={penpal:c.Syn};window.parent.postMessage(e,t instanceof RegExp?"*":t)};return{promise:new Promise(((e,t)=>{let n=w(r,a),o=t=>{if((()=>{try{clearTimeout()}catch(e){return!1}return!0})()&&t.source===parent&&t.data&&t.data.penpal===c.SynAck){let r=s(t);r&&(window.removeEventListener(p.Message,o),n(),e(r))}};window.addEventListener(p.Message,o),u(),d((e=>{window.removeEventListener(p.Message,o),e&&t(e)}))})),destroy(){a()}}};(e=m||(m={})).DRAFT="draft",e.PUBLISHED="published",e.UNPUBLISHED="unpublished",e.MODIFIED="modified",e.UNKNOWN="unknown",(t=f||(f={})).PAGE="page",t.CONTENT_FRAGMENT="content-fragment",t.EXPERIENCE_FRAGMENT="experience-fragment",t.ASSET="asset",t.TEMPLATE="template",t.POLICIES="policies",t.PRODUCT="product",t.CATALOG="catalog",t.TAG="tag",t.OTHERS="others";let S=Object.freeze({UUID:"id",RESOURCE:"resource",TYPE:"type",PROP:"prop",PARENTID:"parentid",BEHAVIOR:"behavior",LABEL:"label",MODEL:"model",FILTER:"filter"});(n=g||(g={})).EDIT="edit",n.PREVIEW="preview",(r=v||(v={})).TEXT="text",r.MEDIA="media",r.RICHTEXT="richtext",r.REFERENCE="reference",r.CONTAINER="container",r.COMPONENT="component",(o=T||(T={})).TEXT="text",o.MEDIA="media",o.RICHTEXT="richtext",o.REFERENCE="reference",o.CONTAINER="container",o.COMPONENT="component",Object.freeze({BLOCKS:"blocks",FORMAT:"format",ALIGNMENT:"alignment",INDENTATION:"indentation",SR_SCRIPT:"sr_script",LIST:"list",INSERT:"insert",ADVANCED:"advanced",EXTENSIONS:"extensions",EDITOR:"editor"});let O="urn:adobe:aue:",P=`meta[name^='${O}']`,$=`meta[name='${O}config:namespace']`,_=(S.TYPE,{URN_PREFIX:O,META_SELECTOR:P,META_NAMESPACE:$,USER_INPUT_RELAY_MESSAGE:"REMOTE_APP_USER_INPUT",DEFAULT_PREFIX:"data-aue-",COMPONENT_ITEM_TYPE:"component",RTE_URL:"https://exc-unifiedcontent.experience.adobe.net/solutions/CQ-aem-headless-rte/assets/tinymce-681/js/tinymce/tinymce.min.js",EVENT_APP_INITIALIZED:"aue:initialized",EVENT_UI_SELECT:"aue:ui-select",EVENT_UI_PREVIEW:"aue:ui-preview",EVENT_UI_EDIT:"aue:ui-edit",EVENT_CONTENT_MOVE:"aue:content-move",EVENT_CONTENT_ADD:"aue:content-add",EVENT_CONTENT_PATCH:"aue:content-patch",EVENT_CONTENT_REMOVE:"aue:content-remove"});var M;function L(e,t,n){function r(){var c=Date.now()-a;c<t&&c>=0?o=setTimeout(r,t-c):(o=null,n||(d=e.apply(l,i),l=i=null))}null==t&&(t=100);var o,i,l,a,d,c=function(){l=this,i=arguments,a=Date.now();var c=n&&!o;return o||(o=setTimeout(r,t)),c&&(d=e.apply(l,i),l=i=null),d};return c.clear=function(){o&&(clearTimeout(o),o=null)},c.flush=function(){o&&(d=e.apply(l,i),l=i=null,clearTimeout(o),o=null)},c}L.debounce=L,M=L;var D=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;let U=[];for(let e=0;e<256;++e)U.push((e+256).toString(16).slice(1));function V(e,t){return e<<t|e>>>32-t}let x=function(e,t,n){function r(e,t,n,r){var o;if("string"==typeof e&&(e=function(e){e=unescape(encodeURIComponent(e));let t=[];for(let n=0;n<e.length;++n)t.push(e.charCodeAt(n));return t}(e)),"string"==typeof t&&(t=function(e){let t;if("string"!=typeof e||!D.test(e))throw TypeError("Invalid UUID");let n=new Uint8Array(16);return n[0]=(t=parseInt(e.slice(0,8),16))>>>24,n[1]=t>>>16&255,n[2]=t>>>8&255,n[3]=255&t,n[4]=(t=parseInt(e.slice(9,13),16))>>>8,n[5]=255&t,n[6]=(t=parseInt(e.slice(14,18),16))>>>8,n[7]=255&t,n[8]=(t=parseInt(e.slice(19,23),16))>>>8,n[9]=255&t,n[10]=(t=parseInt(e.slice(24,36),16))/1099511627776&255,n[11]=t/4294967296&255,n[12]=t>>>24&255,n[13]=t>>>16&255,n[14]=t>>>8&255,n[15]=255&t,n}(t)),16!==(null===(o=t)||void 0===o?void 0:o.length))throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let i=new Uint8Array(16+e.length);if(i.set(t),i.set(e,t.length),(i=function(e){let t=[1518500249,1859775393,2400959708,3395469782],n=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof e){let t=unescape(encodeURIComponent(e));e=[];for(let n=0;n<t.length;++n)e.push(t.charCodeAt(n))}else Array.isArray(e)||(e=Array.prototype.slice.call(e));e.push(128);let r=Math.ceil((e.length/4+2)/16),o=Array(r);for(let t=0;t<r;++t){let n=new Uint32Array(16);for(let r=0;r<16;++r)n[r]=e[64*t+4*r]<<24|e[64*t+4*r+1]<<16|e[64*t+4*r+2]<<8|e[64*t+4*r+3];o[t]=n}o[r-1][14]=8*(e.length-1)/4294967296,o[r-1][14]=Math.floor(o[r-1][14]),o[r-1][15]=8*(e.length-1)&4294967295;for(let e=0;e<r;++e){let r=new Uint32Array(80);for(let t=0;t<16;++t)r[t]=o[e][t];for(let e=16;e<80;++e)r[e]=V(r[e-3]^r[e-8]^r[e-14]^r[e-16],1);let i=n[0],l=n[1],a=n[2],d=n[3],c=n[4];for(let e=0;e<80;++e){let n=Math.floor(e/20),o=V(i,5)+function(e,t,n,r){switch(e){case 0:return t&n^~t&r;case 1:case 3:return t^n^r;case 2:return t&n^t&r^n&r}}(n,l,a,d)+c+t[n]+r[e]>>>0;c=d,d=a,a=V(l,30)>>>0,l=i,i=o}n[0]=n[0]+i>>>0,n[1]=n[1]+l>>>0,n[2]=n[2]+a>>>0,n[3]=n[3]+d>>>0,n[4]=n[4]+c>>>0}return[n[0]>>24&255,n[0]>>16&255,n[0]>>8&255,255&n[0],n[1]>>24&255,n[1]>>16&255,n[1]>>8&255,255&n[1],n[2]>>24&255,n[2]>>16&255,n[2]>>8&255,255&n[2],n[3]>>24&255,n[3]>>16&255,n[3]>>8&255,255&n[3],n[4]>>24&255,n[4]>>16&255,n[4]>>8&255,255&n[4]]}(i))[6]=15&i[6]|80,i[8]=63&i[8]|128,n){r=r||0;for(let e=0;e<16;++e)n[r+e]=i[e];return n}return function(e,t=0){return U[e[t+0]]+U[e[t+1]]+U[e[t+2]]+U[e[t+3]]+"-"+U[e[t+4]]+U[e[t+5]]+"-"+U[e[t+6]]+U[e[t+7]]+"-"+U[e[t+8]]+U[e[t+9]]+"-"+U[e[t+10]]+U[e[t+11]]+U[e[t+12]]+U[e[t+13]]+U[e[t+14]]+U[e[t+15]]}(i)}try{r.name="v5"}catch(e){}return r.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",r.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",r}(),F={element:window.document},k=0,j=(e=_.DEFAULT_PREFIX)=>{let t={};for(let n in S)t[n]=`${e}${S[n]}`;return t},H=(e,t)=>{var n;if(!(e&&e instanceof HTMLElement&&t))return"";let r="";return t===T.TEXT?r=e.textContent||e.innerText:t===T.RICHTEXT?r=e.innerHTML:t===T.MEDIA&&(r=null!==(n=e.getAttribute("src"))&&void 0!==n?n:""),r},q="OverlayBlockingElement",X=()=>{Y(),(()=>{let e=document.createElement("div");e.id=q,e.style.cssText="\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 2147483647;",document.body.appendChild(e)})()},Y=()=>{let e=document.getElementById(q);e&&e.remove()},K=j(),B=new Map,W=e=>{let t=e.closest(`[${K.RESOURCE}]`);return{cfid:(null==t?void 0:t.getAttribute(K.RESOURCE))||"",prop:(null==t?void 0:t.getAttribute(K.PROP))||""}},z=(e,{resource:t,type:n,prop:r})=>{let o="",i="",l="";if(t){o=`[${K.RESOURCE}="${t}"]`;let n=(e=>{var t;let n=null===(t=e.parentElement)||void 0===t?void 0:t.closest(`[${K.TYPE}="${T.CONTAINER}"]:is([${K.RESOURCE}],[${K.PROP}]`),r=null==n?void 0:n.getAttribute(K.RESOURCE),o=null==n?void 0:n.getAttribute(K.PROP);if(r)return{parentResource:r,parentID:G([r,o],!0)};let i=n&&W(n).cfid;return o&&i?{parentResource:i,parentID:G([i,o],!0)}:void 0})(e);i=(null==n?void 0:n.parentID)||"",l=(null==n?void 0:n.parentResource)||""}else{let t=W(e);i=G([l=t.cfid,t.prop],!0),o=`[${K.RESOURCE}="${l}"] ${e.tagName.toLocaleLowerCase()}[${K.TYPE}="${n}"]`}return r&&(o+=`[${K.PROP}="${r}"]`),{parentid:i,parentResource:l,selector:o,isComponent:n===_.COMPONENT_ITEM_TYPE||e.getAttribute(K.BEHAVIOR)===_.COMPONENT_ITEM_TYPE}},G=(e,t=!1)=>{let n=e.filter((e=>!!e)).join("_");if(t&&B.has(n))return B.get(n);let r=`_${(e=>(k++,`${e||"id"}${k}`))()}`,o=x(`${n}${r}`,x.URL);return B.set(n,o),o},Z=e=>{let{scrollLeft:t,scrollTop:n}=e.documentElement,r=e.querySelectorAll(`[${K.RESOURCE}],[${K.PROP}]`)||[],o=new Map;return k=0,B.clear(),r.forEach((e=>{let t=(e=>{let t=e.getAttribute(null==K?void 0:K.TYPE),n=e.getAttribute(K.RESOURCE),r=e.getAttribute(K.PROP);if(!n&&!r)return;let o=e.getAttribute(K.MODEL)||"",{parentid:i,parentResource:l,selector:a,isComponent:d}=z(e,{resource:n,type:t,prop:r});return{id:G([n||l,r]),type:t||"",resource:n||"",prop:r||"",model:o,rect:e.getBoundingClientRect(),label:e.getAttribute(K.LABEL)||"",parentid:i,selector:a,pageYOffset:window.scrollY,isComponent:d,filter:e.getAttribute(K.FILTER)||"",content:H(e,t),modeltype:o}})(e);if(t){let e=o.get(t.id);if(o.set(t.id,{...t,children:(null==e?void 0:e.children)||[]}),t.parentid&&t.id!==t.parentid){let e=o.get(t.parentid);e?e.children.push(t.id):o.set(t.parentid,{children:[t.id]})}}})),{editables:o,offset:{x:t,y:n},selected:{}}},J={viewport:{width:0,height:0},frame:{width:0,height:0},scroll:{x:0,y:0}},Q=({editor:e})=>{null==e||e.updateFrameDetails({details:J})},ee=({target:e})=>{let t=e.documentElement;J.scroll.x=t.scrollLeft,J.scroll.y=t.scrollTop},te=({target:e})=>{let t=Math.max(e.document.documentElement.clientWidth||0,e.innerWidth||0),n=Math.max(e.document.documentElement.clientHeight||0,e.innerHeight||0),{width:r,height:o}=e.document.documentElement.getBoundingClientRect();J.viewport={width:t,height:n},J.frame={width:Math.ceil(r),height:Math.ceil(o)}},ne=({editor:e,prefix:t})=>{let n=F.element;t&&t!==_.DEFAULT_PREFIX&&Object.assign(K,j(t));let r=(0,M.debounce)((()=>{let t=Z(n);e.repaintEditables({editables:t})}),150);r(),window.removeEventListener("resize",r),window.addEventListener("resize",r),(({element:e,callback:t})=>{let n=new MutationObserver(t);n.observe(e,{attributes:!0,characterData:!0,childList:!0,subtree:!0,attributeOldValue:!0,characterDataOldValue:!0}),n.disconnect})({element:n,callback:r})},re=({editor:e})=>{let t=window;t.document.addEventListener("scroll",(0,M.debounce)((({target:t})=>{ee({target:t}),Q({editor:e})}),150)),t.addEventListener("resize",(0,M.debounce)((({target:t})=>{te({target:t}),Q({editor:e})}),150)),t.addEventListener("orientationchange",(0,M.debounce)((({target:n})=>{ee({target:t.document}),te({target:n}),Q({editor:e})}),150));let n=(0,M.debounce)((()=>{te({target:t}),Q({editor:e})}),150),r=new ResizeObserver(n);r.observe(t.document.documentElement),r.observe(t.document.body),requestAnimationFrame((()=>{ee({target:t.document}),te({target:t}),Q({editor:e})}))},oe=({editor:e})=>{document.addEventListener("click",(t=>(({event:e,editor:t})=>{let n=e.target.closest("A");n&&(e.preventDefault(),t.navigateTo({href:n.href}))})({event:t,editor:e})),{capture:!0})},ie=()=>{window.addEventListener("keydown",(({type:e,key:t,altKey:n,metaKey:r,shiftKey:o,ctrlKey:i})=>{parent.postMessage({type:_.USER_INPUT_RELAY_MESSAGE,value:{type:e,key:t,altKey:n,metaKey:r,shiftKey:o,ctrlKey:i}},"*")}))},le=Object.freeze({edit:"adobe-ue-edit",preview:"adobe-ue-preview"}),ae="application/vnd.adobe.aue.";var de={},ce=function(e){var t,n=new Set,r=function(e,r){var o="function"==typeof e?e(t):e;if(!Object.is(o,t)){var i=t;t=(null!=r?r:"object"!=typeof o||null===o)?o:Object.assign({},t,o),n.forEach((function(e){return e(t,i)}))}},o=function(){return t},i={setState:r,getState:o,subscribe:function(e){return n.add(e),function(){return n.delete(e)}},destroy:function(){n.clear()}};return t=e(r,o,i),i},se=function(e){return e?ce(e):ce},ue=function(e){return se(e)};de.createStore=se,de.default=ue,(de=ue).createStore=se,de.default=de;let Ee=({set:e},t)=>{e((e=>({...e,editor:t})))},pe=({set:e},{mode:t})=>{e((e=>{let n=t===g.EDIT||t===g.PREVIEW;return{...e,mode:t,isInEditor:n}}))},me=({set:e},t)=>{e((e=>({...e,prefix:t})))},fe=(0,de.createStore)((i=(e,t)=>({mode:g.PREVIEW,isInEditor:!1,prefix:null,editor:null,setMode:pe.bind(null,{get:t,set:e}),setPrefix:me.bind(null,{get:t,set:e}),setEditor:Ee.bind(null,{get:t,set:e})}),function(e,t,n){var r=n.subscribe;return n.subscribe=function(e,t,o){var i=e;if(t){var l=(null==o?void 0:o.equalityFn)||Object.is,a=e(n.getState());i=function(n){var r=e(n);if(!l(a,r)){var o=a;t(a=r,o)}},null!=o&&o.fireImmediately&&t(a,a)}return r(i)},i(e,t)})),ge=e=>e.preventDefault(),ve=()=>{var e;null===(e=window.navigation)||void 0===e||e.removeEventListener("navigate",ge)},Te=({editable:e,config:t},n=0)=>{var r;window.tinymce?(Y(),t.toolbar||Object.assign(t,{forced_root_block:e.selector&&(null===(r=document.querySelector(e.selector))||void 0===r?void 0:r.tagName)||"p"}),window.tinymce.init({...t,setup:t=>{t.on("init",(()=>{window.tinymce.activeEditor.focus(!1),(()=>{var e;null===(e=window.navigation)||void 0===e||e.addEventListener("navigate",ge)})()})),t.on("keyup",(e=>"Escape"===e.key&&e.target.blur())),t.on("blur",(n=>{((e,t)=>{let{editor:n}=fe.getState(),{bodyElement:r,startContent:o}=null==e?void 0:e.target,i=window.tinymce.activeEditor.getContent();null==n||n.closeRTE({editable:t,isModified:o!==i,newContent:{html:i,text:r.textContent}})})(n,e),((e,t)=>{e.preventDefault(),e.stopImmediatePropagation(),t.remove(),ve(),X()})(n,t)}))}})):n<3&&setTimeout((()=>Te({editable:e,config:t},n+1)),100)},he=(e,t,n)=>{let r=new CustomEvent(e,{bubbles:!0,detail:n}),o=t?document.querySelector(t):document.body;return null==o||o.dispatchEvent(r),!!o},Re=({selector:e,classNames:t,operation:n="toggle"})=>{let r=document.querySelector(e);if(r)for(let e of t)r.classList[n](e)},ye=({containerSelector:e,selector:t,beforeSelector:n,refresh:r})=>{let o=t&&document.querySelector(t),i=document.querySelector(e);o&&i?((e,t,n)=>{n?document.querySelector(n).before(e):t.appendChild(e)})(o,i,n):r&&window.location.reload()},be=()=>{document.addEventListener(_.EVENT_CONTENT_MOVE,(e=>{let{prefix:t}=fe.getState(),{component:n,to:r,before:o}=e.detail;ye({containerSelector:`[${t}${S.RESOURCE}="${r}"]`,selector:`[${t}${S.RESOURCE}="${n}"]`,beforeSelector:o?`[${t}${S.RESOURCE}="${o}"]`:void 0})})),document.addEventListener(_.EVENT_UI_SELECT,(e=>{let t=e.target;t&&e.detail.selected&&(t.scrollIntoViewIfNeeded?t.scrollIntoViewIfNeeded():t.scrollIntoView({block:"nearest"}))})),document.addEventListener(_.EVENT_CONTENT_PATCH,(e=>{let{prefix:t}=fe.getState(),{request:n,patch:r}=null==e?void 0:e.detail,{resource:o}=null==n?void 0:n.target,{name:i,value:l}=r,a=document.querySelector(`[${t}${S.RESOURCE}="${o}"]`),d=null==a?void 0:a.getAttribute(`${t}${S.PROP}`);if(i&&d!==i&&(a=null==a?void 0:a.querySelector(`[${t}${S.PROP}='${i}']`)),!a)return void window.location.reload();let c=a.getAttribute(`${t}${S.TYPE}`);c===T.MEDIA?a.src=l:c===T.TEXT||c===T.RICHTEXT?a.innerHTML=l:window.location.reload()})),document.addEventListener(_.EVENT_CONTENT_REMOVE,(e=>{var t;let n=null===(t=null==e?void 0:e.detail)||void 0===t?void 0:t.resource;if(!n)return;let{prefix:r}=fe.getState(),o=document.querySelector(`[${r}${S.RESOURCE}="${n}"]`);o&&o.remove()})),document.addEventListener(_.EVENT_CONTENT_ADD,(()=>{window.location.reload()})),document.addEventListener(_.EVENT_UI_EDIT,(()=>{Ne(g.EDIT)})),document.addEventListener(_.EVENT_UI_PREVIEW,(()=>{Ne(g.PREVIEW)}))},Ne=e=>{if(!e)return;let{mode:t,setMode:n}=fe.getState();Re({selector:"html",classNames:[le[e]],operation:"add"}),t!==e&&(Re({selector:"html",classNames:[le[t]],operation:"remove"}),n({mode:e}))},Ie={updateAppMode:Ne,getUrnMappings:()=>[...document.querySelectorAll(_.META_SELECTOR)].reduce(((e,{name:t,content:n})=>{let[r,o]=t.replace(_.URN_PREFIX,"").split(":");return{...e,[r]:o?{...e[r],[o]:n}:n}}),{}),getDocumentProperties:e=>{let t={};try{for(let n of e)void 0!==document[n]?t[n]=document[n]:t[n]=null}catch(e){console.log(e)}return t},getDefinitions:async()=>{let e={},t=document.querySelectorAll(`script[type^="${ae}"]`);return await Promise.all([...t].map((async({type:t,src:n,innerText:r})=>{let o=t.replace(ae,"").replace("+json",""),i=r?(e=>{try{return JSON.parse(e)}catch(e){return console.log("Cors parseDefinitions",e),null}})(r):await(async e=>{try{return await fetch(e).then((e=>e.json()))}catch(e){return console.log("Cors fetchDefinitions",e),null}})(n);e[o]=i}))),e},triggerEvent:he,openRTE:Te};(async()=>{let e=A({methods:Ie}),t=await e.promise;fe.getState().setEditor(t),be();let n=(()=>{let e=document.querySelector(_.META_NAMESPACE);return(null==e?void 0:e.content)?`data-${e.content}-`:_.DEFAULT_PREFIX})();fe.getState().setPrefix(n),(()=>{let e=document.createElement("script");e.id="tiny-mce-script",e.src=_.RTE_URL,document.body.appendChild(e)})(),he(_.EVENT_APP_INITIALIZED),ne({editor:t,prefix:n}),re({editor:t}),oe({editor:t}),ie(),(e=>{fe.subscribe((e=>[e.mode]),(([t],[n])=>{t&&t!==n&&e(t)}))})((e=>{var t;let n={[g.PREVIEW]:Y,[g.EDIT]:X};null===(t=n[e])||void 0===t||t.call(n)})),t.trackCorsVersion({version:"2.3.0"})})()})();