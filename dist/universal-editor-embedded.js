(()=>{var e,t,n,r,o,i,c,a;(t=e||(e={})).Call="call",t.Reply="reply",t.Syn="syn",t.SynAck="synAck",t.Ack="ack",(r=n||(n={})).Fulfilled="fulfilled",r.Rejected="rejected",(i=o||(o={})).ConnectionDestroyed="ConnectionDestroyed",i.ConnectionTimeout="ConnectionTimeout",i.NoIframeSrc="NoIframeSrc",(c||(c={})).DataCloneError="DataCloneError",(a||(a={})).Message="message";const s=({name:e,message:t,stack:n})=>({name:e,message:t,stack:n});var l=(t,r,o)=>{const{localName:i,local:l,remote:d,originForSending:u,originForReceiving:m}=t;let p=!1;const E=t=>{if(t.source!==d||t.data.penpal!==e.Call)return;if("*"!==m&&t.origin!==m)return void o(`${i} received message from origin ${t.origin} which did not match expected origin ${m}`);const a=t.data,{methodName:l,args:E,id:f}=a;o(`${i}: Received ${l}() call`);const g=t=>r=>{if(o(`${i}: Sending ${l}() reply`),p)return void o(`${i}: Unable to send ${l}() reply due to destroyed connection`);const a={penpal:e.Reply,id:f,resolution:t,returnValue:r};t===n.Rejected&&r instanceof Error&&(a.returnValue=s(r),a.returnValueIsError=!0);try{d.postMessage(a,u)}catch(t){if(t.name===c.DataCloneError){const r={penpal:e.Reply,id:f,resolution:n.Rejected,returnValue:s(t),returnValueIsError:!0};d.postMessage(r,u)}throw t}};new Promise((e=>e(r[l].apply(r,E)))).then(g(n.Fulfilled),g(n.Rejected))};return l.addEventListener(a.Message,E),()=>{p=!0,l.removeEventListener(a.Message,E)}};let d=0;const u=e=>e?e.split("."):[],m=(e,t,n)=>{const r=u(t);return r.reduce(((e,t,o)=>(void 0===e[t]&&(e[t]={}),o===r.length-1&&(e[t]=n),e[t])),e),e},p=(e,t)=>{const n={};return Object.keys(e).forEach((r=>{const o=e[r],i=((e,t)=>{const n=u(t||"");return n.push(e),(e=>e.join("."))(n)})(r,t);"object"==typeof o&&Object.assign(n,p(o,i)),"function"==typeof o&&(n[i]=o)})),n},E=e=>{const t={};for(const n in e)m(t,n,e[n]);return t};var f,g,h=(t,r,i,c,s)=>{const{localName:l,local:u,remote:m,originForSending:p,originForReceiving:f}=r;let g=!1;s(`${l}: Connecting call sender`);const h=t=>(...r)=>{let i;s(`${l}: Sending ${t}() call`);try{m.closed&&(i=!0)}catch(e){i=!0}if(i&&c(),g){const e=new Error(`Unable to send ${t}() call due to destroyed connection`);throw e.code=o.ConnectionDestroyed,e}return new Promise(((o,i)=>{const c=++d,E=r=>{if(r.source!==m||r.data.penpal!==e.Reply||r.data.id!==c)return;if("*"!==f&&r.origin!==f)return void s(`${l} received message from origin ${r.origin} which did not match expected origin ${f}`);const d=r.data;s(`${l}: Received ${t}() reply`),u.removeEventListener(a.Message,E);let p=d.returnValue;d.returnValueIsError&&(p=(e=>{const t=new Error;return Object.keys(e).forEach((n=>t[n]=e[n])),t})(p)),(d.resolution===n.Fulfilled?o:i)(p)};u.addEventListener(a.Message,E);const g={penpal:e.Call,id:c,methodName:t,args:r};m.postMessage(g,p)}))},y=i.reduce(((e,t)=>(e[t]=h(t),e)),{});return Object.assign(t,E(y)),()=>{g=!0}},y=(e,t)=>{let n;return void 0!==e&&(n=window.setTimeout((()=>{const n=new Error(`Connection timed out after ${e}ms`);n.code=o.ConnectionTimeout,t(n)}),e)),()=>{clearTimeout(n)}},v=(t,n,r,o)=>{const{destroy:i,onDestroy:c}=r;return r=>{if(!(t instanceof RegExp?t.test(r.origin):"*"===t||t===r.origin))return void o(`Child: Handshake - Received SYN-ACK from origin ${r.origin} which did not match expected origin ${t}`);o("Child: Handshake - Received SYN-ACK, responding with ACK");const a="null"===r.origin?"*":r.origin,s={penpal:e.Ack,methodNames:Object.keys(n)};window.parent.postMessage(s,a);const d={localName:"Child",local:window,remote:window.parent,originForSending:a,originForReceiving:r.origin},u=l(d,n,o);c(u);const m={},p=h(m,d,r.data.methodNames,i,o);return c(p),m}},T=(t={})=>{const{parentOrigin:n="*",methods:r={},timeout:o,debug:i=!1}=t,c=(e=>(...t)=>{e&&console.log("[Penpal]",...t)})(i),s=((e,t)=>{const n=[];let r=!1;return{destroy(o){r||(r=!0,t(`${e}: Destroying connection`),n.forEach((e=>{e(o)})))},onDestroy(e){r?e():n.push(e)}}})("Child",c),{destroy:l,onDestroy:d}=s,u=p(r),m=v(n,u,s,c);return{promise:new Promise(((t,r)=>{const i=y(o,l),s=n=>{if((()=>{try{clearTimeout()}catch(e){return!1}return!0})()&&n.source===parent&&n.data&&n.data.penpal===e.SynAck){const e=m(n);e&&(window.removeEventListener(a.Message,s),i(),t(e))}};window.addEventListener(a.Message,s),(()=>{c("Child: Handshake - Sending SYN");const t={penpal:e.Syn},r=n instanceof RegExp?"*":n;window.parent.postMessage(t,r)})(),d((e=>{window.removeEventListener(a.Message,s),e&&r(e)}))})),destroy(){l()}}};(g=f||(f={})).ID="itemID",g.TYPE="itemType",g.SCOPE="itemScope",g.PROP="itemProp";const R={UUID:"id",ID:f.ID.toLowerCase(),TYPE:f.TYPE.toLowerCase(),SCOPE:f.SCOPE.toLowerCase(),PROP:f.PROP.toLowerCase(),PARENTID:"parentid",EDITOR_BEHAVIOR:"data-editor-behavior",EDITOR_LABEL:"data-editor-itemlabel",EDITOR_MODEL:"data-editor-itemmodel"};var b,w,A,I;(w=b||(b={})).EDIT="edit",w.PREVIEW="preview",(I=A||(A={})).TEXT="text",I.MEDIA="media",I.RICHTEXT="richtext",I.REFERENCE="reference",I.CONTAINER="container";const C="universal-editor-message-bus.herokuapp.com",S="/gql",P="urn:adobe:aem:editor:",L="urn:auecon:",O={USER_INPUT_RELAY_MESSAGE:"REMOTE_APP_USER_INPUT",OVERLAY_INPUT_MESSAGE:"OVERLAY_INPUT_MESSAGE",DEMO_APP_HOST:"ue-remote-app.adobe.net/?authorHost=https://author-p15902-e145656-cmstg.adobeaemcloud.com&publishHost=https://publish-p15902-e145656-cmstg.adobeaemcloud.com",GRAPHQL_HOST:C,GRAPHQL_PORT_PUBLIC:443,GRAPHQL_PORT_LOCAL:4e3,GRAPHQL_PATH:S,GRAPHQL_URL:`${C}:443${S}`,EDITABLE_SELECTOR:`[${R.TYPE}]`,CANVAS_PATH:"/canvas",PARENT_SELECTOR:`[${R.SCOPE}][${R.ID}]`,URN_PREFIX:P,DEPRECATED_URN_PREFIX:L,META_SELECTOR:`meta[name^='${P}'],meta[name^='${L}']`,DEMO_APP_HOST_PROD:"ue-remote-app.adobe.net",FRAGMENT_TYPE:"reference",UNIFIED_SHELL_STAGE:"https://experience-stage.adobe.com",UNIFIED_SHELL_PROD:"https://experience.adobe.com",HEADLESS_CF_EDITOR_URL:"#/aem/cf/editor/editor",CONTAINER_SELECTOR:`[${R.TYPE}=container]`,COMPONENT_ITEM_TYPE:"component",TRANSPARENT_BACKGROUND:"rgba(0, 0, 0, 0)",TARGET_ORIGIN:"*"};var _=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;const D=[];for(let e=0;e<256;++e)D.push((e+256).toString(16).slice(1));var M,N=function(e){if(!function(e){return"string"==typeof e&&_.test(e)}(e))throw TypeError("Invalid UUID");let t;const n=new Uint8Array(16);return n[0]=(t=parseInt(e.slice(0,8),16))>>>24,n[1]=t>>>16&255,n[2]=t>>>8&255,n[3]=255&t,n[4]=(t=parseInt(e.slice(9,13),16))>>>8,n[5]=255&t,n[6]=(t=parseInt(e.slice(14,18),16))>>>8,n[7]=255&t,n[8]=(t=parseInt(e.slice(19,23),16))>>>8,n[9]=255&t,n[10]=(t=parseInt(e.slice(24,36),16))/1099511627776&255,n[11]=t/4294967296&255,n[12]=t>>>24&255,n[13]=t>>>16&255,n[14]=t>>>8&255,n[15]=255&t,n};function $(e,t,n,r){switch(e){case 0:return t&n^~t&r;case 1:case 3:return t^n^r;case 2:return t&n^t&r^n&r}}function U(e,t){return e<<t|e>>>32-t}function H(e,t,n){var r,o,i,c,a;function s(){var l=Date.now()-c;l<t&&l>=0?r=setTimeout(s,t-l):(r=null,n||(a=e.apply(i,o),i=o=null))}null==t&&(t=100);var l=function(){i=this,o=arguments,c=Date.now();var l=n&&!r;return r||(r=setTimeout(s,t)),l&&(a=e.apply(i,o),i=o=null),a};return l.clear=function(){r&&(clearTimeout(r),r=null)},l.flush=function(){r&&(a=e.apply(i,o),i=o=null,clearTimeout(r),r=null)},l}!function(e,t,n){function r(e,t,n,r){var o;if("string"==typeof e&&(e=function(e){e=unescape(encodeURIComponent(e));const t=[];for(let n=0;n<e.length;++n)t.push(e.charCodeAt(n));return t}(e)),"string"==typeof t&&(t=N(t)),16!==(null===(o=t)||void 0===o?void 0:o.length))throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let i=new Uint8Array(16+e.length);if(i.set(t),i.set(e,t.length),i=function(e){const t=[1518500249,1859775393,2400959708,3395469782],n=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof e){const t=unescape(encodeURIComponent(e));e=[];for(let n=0;n<t.length;++n)e.push(t.charCodeAt(n))}else Array.isArray(e)||(e=Array.prototype.slice.call(e));e.push(128);const r=e.length/4+2,o=Math.ceil(r/16),i=new Array(o);for(let t=0;t<o;++t){const n=new Uint32Array(16);for(let r=0;r<16;++r)n[r]=e[64*t+4*r]<<24|e[64*t+4*r+1]<<16|e[64*t+4*r+2]<<8|e[64*t+4*r+3];i[t]=n}i[o-1][14]=8*(e.length-1)/Math.pow(2,32),i[o-1][14]=Math.floor(i[o-1][14]),i[o-1][15]=8*(e.length-1)&4294967295;for(let e=0;e<o;++e){const r=new Uint32Array(80);for(let t=0;t<16;++t)r[t]=i[e][t];for(let e=16;e<80;++e)r[e]=U(r[e-3]^r[e-8]^r[e-14]^r[e-16],1);let o=n[0],c=n[1],a=n[2],s=n[3],l=n[4];for(let e=0;e<80;++e){const n=Math.floor(e/20),i=U(o,5)+$(n,c,a,s)+l+t[n]+r[e]>>>0;l=s,s=a,a=U(c,30)>>>0,c=o,o=i}n[0]=n[0]+o>>>0,n[1]=n[1]+c>>>0,n[2]=n[2]+a>>>0,n[3]=n[3]+s>>>0,n[4]=n[4]+l>>>0}return[n[0]>>24&255,n[0]>>16&255,n[0]>>8&255,255&n[0],n[1]>>24&255,n[1]>>16&255,n[1]>>8&255,255&n[1],n[2]>>24&255,n[2]>>16&255,n[2]>>8&255,255&n[2],n[3]>>24&255,n[3]>>16&255,n[3]>>8&255,255&n[3],n[4]>>24&255,n[4]>>16&255,n[4]>>8&255,255&n[4]]}(i),i[6]=15&i[6]|80,i[8]=63&i[8]|128,n){r=r||0;for(let e=0;e<16;++e)n[r+e]=i[e];return n}return function(e,t=0){return(D[e[t+0]]+D[e[t+1]]+D[e[t+2]]+D[e[t+3]]+"-"+D[e[t+4]]+D[e[t+5]]+"-"+D[e[t+6]]+D[e[t+7]]+"-"+D[e[t+8]]+D[e[t+9]]+"-"+D[e[t+10]]+D[e[t+11]]+D[e[t+12]]+D[e[t+13]]+D[e[t+14]]+D[e[t+15]]).toLowerCase()}(i)}try{r.name="v5"}catch(e){}r.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",r.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8"}(),H.debounce=H,M=H;var x=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;const k=[];for(let e=0;e<256;++e)k.push((e+256).toString(16).slice(1));var F=function(e){if(!function(e){return"string"==typeof e&&x.test(e)}(e))throw TypeError("Invalid UUID");let t;const n=new Uint8Array(16);return n[0]=(t=parseInt(e.slice(0,8),16))>>>24,n[1]=t>>>16&255,n[2]=t>>>8&255,n[3]=255&t,n[4]=(t=parseInt(e.slice(9,13),16))>>>8,n[5]=255&t,n[6]=(t=parseInt(e.slice(14,18),16))>>>8,n[7]=255&t,n[8]=(t=parseInt(e.slice(19,23),16))>>>8,n[9]=255&t,n[10]=(t=parseInt(e.slice(24,36),16))/1099511627776&255,n[11]=t/4294967296&255,n[12]=t>>>24&255,n[13]=t>>>16&255,n[14]=t>>>8&255,n[15]=255&t,n};function V(e,t,n,r){switch(e){case 0:return t&n^~t&r;case 1:case 3:return t^n^r;case 2:return t&n^t&r^n&r}}function B(e,t){return e<<t|e>>>32-t}var Y=function(e,t,n){function r(e,t,n,r){var o;if("string"==typeof e&&(e=function(e){e=unescape(encodeURIComponent(e));const t=[];for(let n=0;n<e.length;++n)t.push(e.charCodeAt(n));return t}(e)),"string"==typeof t&&(t=F(t)),16!==(null===(o=t)||void 0===o?void 0:o.length))throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let i=new Uint8Array(16+e.length);if(i.set(t),i.set(e,t.length),i=function(e){const t=[1518500249,1859775393,2400959708,3395469782],n=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof e){const t=unescape(encodeURIComponent(e));e=[];for(let n=0;n<t.length;++n)e.push(t.charCodeAt(n))}else Array.isArray(e)||(e=Array.prototype.slice.call(e));e.push(128);const r=e.length/4+2,o=Math.ceil(r/16),i=new Array(o);for(let t=0;t<o;++t){const n=new Uint32Array(16);for(let r=0;r<16;++r)n[r]=e[64*t+4*r]<<24|e[64*t+4*r+1]<<16|e[64*t+4*r+2]<<8|e[64*t+4*r+3];i[t]=n}i[o-1][14]=8*(e.length-1)/Math.pow(2,32),i[o-1][14]=Math.floor(i[o-1][14]),i[o-1][15]=8*(e.length-1)&4294967295;for(let e=0;e<o;++e){const r=new Uint32Array(80);for(let t=0;t<16;++t)r[t]=i[e][t];for(let e=16;e<80;++e)r[e]=B(r[e-3]^r[e-8]^r[e-14]^r[e-16],1);let o=n[0],c=n[1],a=n[2],s=n[3],l=n[4];for(let e=0;e<80;++e){const n=Math.floor(e/20),i=B(o,5)+V(n,c,a,s)+l+t[n]+r[e]>>>0;l=s,s=a,a=B(c,30)>>>0,c=o,o=i}n[0]=n[0]+o>>>0,n[1]=n[1]+c>>>0,n[2]=n[2]+a>>>0,n[3]=n[3]+s>>>0,n[4]=n[4]+l>>>0}return[n[0]>>24&255,n[0]>>16&255,n[0]>>8&255,255&n[0],n[1]>>24&255,n[1]>>16&255,n[1]>>8&255,255&n[1],n[2]>>24&255,n[2]>>16&255,n[2]>>8&255,255&n[2],n[3]>>24&255,n[3]>>16&255,n[3]>>8&255,255&n[3],n[4]>>24&255,n[4]>>16&255,n[4]>>8&255,255&n[4]]}(i),i[6]=15&i[6]|80,i[8]=63&i[8]|128,n){r=r||0;for(let e=0;e<16;++e)n[r+e]=i[e];return n}return function(e,t=0){return(k[e[t+0]]+k[e[t+1]]+k[e[t+2]]+k[e[t+3]]+"-"+k[e[t+4]]+k[e[t+5]]+"-"+k[e[t+6]]+k[e[t+7]]+"-"+k[e[t+8]]+k[e[t+9]]+"-"+k[e[t+10]]+k[e[t+11]]+k[e[t+12]]+k[e[t+13]]+k[e[t+14]]+k[e[t+15]]).toLowerCase()}(i)}try{r.name="v5"}catch(e){}return r.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",r.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",r}();const j={element:window.document},G=150,q=e=>{const t=window.getComputedStyle(e).backgroundColor,n=e.parentElement;return t===O.TRANSPARENT_BACKGROUND&&n?q(n):t},K=e=>{if(!(e&&e instanceof HTMLElement))return;const t=window.getComputedStyle(e);return{content:e.innerText,htmlContent:e.innerHTML,style:{font:t.getPropertyValue("font"),visibility:e.style.visibility,color:t.getPropertyValue("color"),textAlign:t.getPropertyValue("text-align"),textTransform:t.getPropertyValue("text-transform"),border:t.getPropertyValue("border"),padding:t.getPropertyValue("padding"),backgroundColor:q(e),width:t.getPropertyValue("width"),height:t.getPropertyValue("height")}}},X=e=>{e.preventDefault(),e.stopImmediatePropagation(),e.stopPropagation();const t={pageHeight:document.documentElement.scrollHeight,scrollOffset:{x:window.scrollX,y:window.scrollY},type:e.type,x:null,y:null,keyModifiers:{advancedSelect:e.ctrlKey,multiSelect:e.shiftKey,metaKey:e.metaKey},editables:[]};"scroll"!==e.type&&(t.x=e.x,t.y=e.y,t.editables=document.elementsFromPoint(e.x,e.y).filter((e=>e.matches(O.EDITABLE_SELECTOR))).map((e=>{const t=K(e),n=Z(e);return{content:(null==t?void 0:t.content)||"",htmlContent:(null==t?void 0:t.htmlContent)||"",style:(null==t?void 0:t.style)||{},...n}}))),parent.postMessage({type:O.OVERLAY_INPUT_MESSAGE,payload:t},O.TARGET_ORIGIN)},z=e=>X(e),W="OverlayBlockingElement",Q=()=>{document.removeEventListener("scroll",z),document.removeEventListener("mousemove",X),document.removeEventListener("mousedown",X),document.removeEventListener("mouseup",X),document.removeEventListener("click",X);const e=document.getElementById(W);e&&e.remove()},J=e=>{const t=e.closest(O.PARENT_SELECTOR);return(null==t?void 0:t.getAttribute(R.ID))||""},Z=e=>{const t=e.getAttribute(R.TYPE)||"",n=e.getAttribute(R.ID)||void 0,r=e.getAttribute(R.PROP)||void 0,{parentid:o,parentItemId:i,selector:c,isComponent:a}=((e,{itemid:t,itemtype:n,itemprop:r})=>{const o=n===O.COMPONENT_ITEM_TYPE||e.getAttribute(R.EDITOR_BEHAVIOR)===O.COMPONENT_ITEM_TYPE;let i="",c="",a="";if(t){i=`[${R.ID}="${t}"]`;const n=(e=>{var t;const n=null===(t=e.parentElement)||void 0===t?void 0:t.closest(O.CONTAINER_SELECTOR),r=null==n?void 0:n.getAttribute(R.ID);if(r)return{parentItemId:r,parentid:Y(`${r}`,Y.URL)};const o=null==n?void 0:n.getAttribute(R.PROP),i=n&&J(n);return o&&i?{parentItemId:i,parentid:Y(`${i}_${o}`,Y.URL)}:void 0})(e);c=(null==n?void 0:n.parentid)||"",a=(null==n?void 0:n.parentItemId)||""}else a=J(e),c=Y(`${a}`,Y.URL),i=`[${R.ID}="${a}"] ${e.tagName.toLocaleLowerCase()}[${R.TYPE}="${n}"]`,r&&(i+=`[${R.PROP}="${r}"]`);return{parentid:c,parentItemId:a,selector:i,isComponent:o}})(e,{itemid:n,itemtype:t,itemprop:r}),s=K(e),l=Y(`${n||i}${r?`_${r}`:""}`,Y.URL);let d={rect:e.getBoundingClientRect(),itemtype:t,label:e.getAttribute(R.EDITOR_LABEL)||"",id:l,itemid:n,itemprop:r,parentid:o,selector:c,pageYOffset:window.scrollY,isComponent:a,modeltype:e.getAttribute(R.EDITOR_MODEL)||""};return[A.TEXT,A.RICHTEXT].includes(t)&&(d={...d,...s}),d},ee={viewport:{width:0,height:0},frame:{width:0,height:0},scroll:{x:0,y:0}},te=({editor:e})=>{null==e||e.updateFrameDetails({details:ee})},ne=({target:e})=>{const t=e.documentElement;ee.scroll.x=t.scrollLeft,ee.scroll.y=t.scrollTop},re=({target:e})=>{const t=Math.max(e.document.documentElement.clientWidth||0,e.innerWidth||0),n=Math.max(e.document.documentElement.clientHeight||0,e.innerHeight||0),{width:r,height:o}=e.document.documentElement.getBoundingClientRect();ee.viewport={width:t,height:n},ee.frame={width:Math.ceil(r),height:Math.ceil(o)}},oe=({editor:e})=>{const t=[];[...document.styleSheets].forEach((e=>{try{const{cssRules:n}=e;[...n].find((e=>e instanceof CSSFontFaceRule))&&e.href&&t.push(e.href)}catch(n){e.href&&t.push(e.href)}})),e.addCustomFonts(t)},ie=({editor:e})=>{const t=j.element,n=(0,M.debounce)((()=>{const n=(e=>{const{scrollLeft:t,scrollTop:n}=e.documentElement,r=e.querySelectorAll(O.EDITABLE_SELECTOR)||[],o=new Map;return r.forEach((e=>{const t=Z(e),n=o.get(t.id);if(o.set(t.id,{...t,children:(null==n?void 0:n.children)||[]}),t.parentid){const e=o.get(t.parentid);e?e.children.push(t.id):o.set(t.parentid,{children:[t.id]})}})),{editables:o,offset:{x:t,y:n},selected:{}}})(t);e.repaintEditables({editables:n})}),G);n(),window.removeEventListener("resize",n),window.addEventListener("resize",n),(({element:e,callback:t})=>{const n=new MutationObserver(t);n.observe(e,{attributes:!0,characterData:!0,childList:!0,subtree:!0,attributeOldValue:!0,characterDataOldValue:!0}),n.disconnect})({element:t,callback:n})},ce=({editor:e})=>{const t=window;t.document.addEventListener("scroll",(0,M.debounce)((({target:t})=>{ne({target:t}),te({editor:e})}),G)),t.addEventListener("resize",(0,M.debounce)((({target:t})=>{re({target:t}),te({editor:e})}),G)),t.addEventListener("orientationchange",(0,M.debounce)((({target:n})=>{ne({target:t.document}),re({target:n}),te({editor:e})}),G));const n=(0,M.debounce)((()=>{re({target:t}),te({editor:e})}),G);new ResizeObserver(n).observe(t.document.body),requestAnimationFrame((()=>{ne({target:t.document}),re({target:t}),te({editor:e})}))},ae=({editor:e})=>{document.addEventListener("click",(t=>(({event:e,editor:t})=>{const n=e.target.closest("A");n&&(e.preventDefault(),t.navigateTo({href:n.href}))})({event:t,editor:e})),{capture:!0})},se=()=>{window.addEventListener("keydown",(({type:e,key:t,altKey:n,metaKey:r,shiftKey:o,ctrlKey:i})=>{const c={type:e,key:t,altKey:n,metaKey:r,shiftKey:o,ctrlKey:i};parent.postMessage({type:O.USER_INPUT_RELAY_MESSAGE,value:c},"*")}))},le=Object.freeze({edit:"adobe-ue-edit",preview:"adobe-ue-preview"}),de=e=>e.split("/").pop()||"",ue=e=>{const[t="",n=""]=e.split("/");return`${n.toUpperCase()} ${t}`},me=e=>{const{naturalWidth:t,naturalHeight:n}=e;return t&&n&&`${t} x ${n}`||""},pe=e=>{const t=Math.floor(Math.log(e)/Math.log(1024));return`${parseFloat((e/Math.pow(1024,t)).toFixed(0))} ${["B","KB","MB","GB","TB","PB","EB","ZB","YB"][t]}`};var Ee;Ee=function(e){return function(t,n,r){var o=r.subscribe;return r.subscribe=function(e,t,n){var i=e;if(t){var c=(null==n?void 0:n.equalityFn)||Object.is,a=e(r.getState());i=function(n){var r=e(n);if(!c(a,r)){var o=a;t(a=r,o)}},null!=n&&n.fireImmediately&&t(a,a)}return o(i)},e(t,n,r)}};var fe=function(e){var t,n=new Set,r=function(e,r){var o="function"==typeof e?e(t):e;if(!Object.is(o,t)){var i=t;t=(null!=r?r:"object"!=typeof o)?o:Object.assign({},t,o),n.forEach((function(e){return e(t,i)}))}},o=function(){return t},i={setState:r,getState:o,subscribe:function(e){return n.add(e),function(){return n.delete(e)}},destroy:function(){return n.clear()}};return t=e(r,o,i),i};const ge=({set:e},{mode:t})=>{e((e=>{const n=t===b.EDIT||t===b.PREVIEW;return{...e,mode:t,isInEditor:n}}))},he=function(e){return e&&e.__esModule?e.default:e}((function(e){return e?fe(e):fe}))(Ee(((e,t)=>({mode:null,isInEditor:!1,setMode:ge.bind(null,{get:t,set:e})})))),ye=({selector:e,classNames:t,operation:n="toggle"})=>{const r=document.querySelector(e);if(r)for(const e of t)r.classList[n](e)},ve=new RegExp(`^${O.URN_PREFIX}|^${O.DEPRECATED_URN_PREFIX}`),Te={updateAppMode:e=>{if(!e)return;const{mode:t,setMode:n}=he.getState();if(t){if(t===e)return;ye({selector:"html",classNames:Object.values(le)})}else ye({selector:"html",classNames:[le[e]]});n({mode:e})},getEditableElement:e=>{const t=document.querySelector(e);return t&&t instanceof HTMLElement?K(t):void 0},updateField:async({selector:e,value:t,itemid:n,property:r=""})=>{const o=document.querySelector(e);if(t)if(o)((e,t)=>{(null==e?void 0:e.getAttribute("itemtype"))===A.MEDIA?e.src=t:(null==e?void 0:e.getAttribute("itemtype"))!==A.TEXT&&(null==e?void 0:e.getAttribute("itemtype"))!==A.RICHTEXT||(e.innerHTML=t)})(o,t);else{const e=document.querySelector(`[${R.ID}="${n}"]`);e.hasAttribute(r)&&e.setAttribute(r,t);const o=new CustomEvent("editor-update",{detail:{itemids:[n]}});document.dispatchEvent(o)}},removeField:({selector:e})=>{const t=document.querySelector(e);t&&t.remove()},getUrnMappings:()=>{const e=document.querySelectorAll(O.META_SELECTOR);return Array.from(e).reduce(((e,{name:t,content:n})=>({...e,[t.replace(ve,"")]:n})),{})},getMediaProperties:async e=>{const t=document.querySelector(e),n=null==t?void 0:t.src;if(!n||!t)return;const r=await(async e=>{try{return await fetch(e).then((e=>e.blob()))}catch{return}})(n),{type:o,size:i}=r||{};return{name:de(n),mimeType:o?ue(o):"",resolution:me(t),size:i?pe(i):"",src:n,alt:t.getAttribute("alt")||""}},scrollEditableIntoView:e=>{const t=document.querySelector(e);if(t){const e=t.getBoundingClientRect();!(e.top>=0&&e.bottom<=window.innerHeight)&&t.scrollIntoView({behavior:"smooth"})}},toggleEditableVisibility:(e,t)=>{const n=document.querySelector(e);n&&(t?n.style.removeProperty("color"):n.style.color="rgba(0, 0, 0, 0)")},getRichTextColors:e=>{const t=document.querySelector(e),n=[];if(t.getAttribute("itemtype")===A.RICHTEXT)for(const e of t.children){const t=window.getComputedStyle(e).color;n.push(t)}return n},updateContainer:async({containerSelector:e,selector:t,beforeSelector:n,refresh:r})=>{const o=t&&document.querySelector(t),i=document.querySelector(e);o&&i?((e,t,n)=>{n?document.querySelector(n).before(e):t.appendChild(e)})(o,i,n):r&&window.location.reload()},getComponentsDefinition:async()=>{const e=document.querySelector('script[type="application/vnd.adobe.aem.editor.component-definition+json"]');if(!e)return null;const t=e.src;if(t)return await(async e=>{try{return await fetch(e).then((e=>e.json()))}catch(e){return console.log("fetchDefinition",e),null}})(t);const n=e.innerText;return n?JSON.parse(n):null}};(async()=>{const e=T({methods:Te}),t=await e.promise;var n;oe({editor:t}),ie({editor:t}),ce({editor:t}),ae({editor:t}),se(),n=e=>{e===b.PREVIEW&&Q(),e===b.EDIT&&(Q(),(()=>{const e=document.createElement("div");e.id=W,e.style.cssText="\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 2147483647;",document.body.appendChild(e)})(),document.addEventListener("scroll",z),document.addEventListener("mousemove",X),document.addEventListener("mousedown",X),document.addEventListener("mouseup",X),document.addEventListener("click",X))},he.subscribe((e=>[e.mode]),(([e],[t])=>{e!==t&&n(e)}))})()})();