(function(t){function e(e){for(var i,o,a=e[0],c=e[1],u=e[2],l=0,d=[];l<a.length;l++)o=a[l],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&d.push(s[o][0]),s[o]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);p&&p(e);while(d.length)d.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],i=!0,o=1;o<n.length;o++){var c=n[o];0!==s[c]&&(i=!1)}i&&(r.splice(e--,1),t=a(a.s=n[0]))}return t}var i={},s={app:0},r=[];function o(t){return a.p+"js/"+({components:"components",directives:"directives"}[t]||t)+"."+{components:"61da769f",directives:"55af4a45"}[t]+".js"}function a(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.e=function(t){var e=[],n=s[t];if(0!==n)if(n)e.push(n[2]);else{var i=new Promise((function(e,i){n=s[t]=[e,i]}));e.push(n[2]=i);var r,c=document.createElement("script");c.charset="utf-8",c.timeout=120,a.nc&&c.setAttribute("nonce",a.nc),c.src=o(t);var u=new Error;r=function(e){c.onerror=c.onload=null,clearTimeout(l);var n=s[t];if(0!==n){if(n){var i=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src;u.message="Loading chunk "+t+" failed.\n("+i+": "+r+")",u.name="ChunkLoadError",u.type=i,u.request=r,n[1](u)}s[t]=void 0}};var l=setTimeout((function(){r({type:"timeout",target:c})}),12e4);c.onerror=c.onload=r,document.head.appendChild(c)}return Promise.all(e)},a.m=t,a.c=i,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(n,i,function(e){return t[e]}.bind(null,i));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var p=u;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"281a":function(t,e,n){"use strict";var i=n("6452"),s=n.n(i);s.a},"56d7":function(t,e,n){"use strict";n.r(e);var i=n("2b0e"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"app-header"},[n("div",[t._v("Vue")]),n("div",{staticClass:"theme-select"},[n("div",{staticClass:"theme-option blu",on:{click:function(e){return t.changeTheme("blu")}}}),n("div",{staticClass:"theme-option pur",on:{click:function(e){return t.changeTheme("pur")}}})])]),n("div",{staticClass:"app-body"},[n("div",{staticClass:"app-side"},[t._l(t.menus,(function(e){return[n("div",{key:e.key,staticClass:"menu-item menu-title"},[t._v(" "+t._s(e.name)+" ")]),t._l(e.children,(function(e){return n("div",{key:e.key+"item",staticClass:"menu-item menu-child",class:{active:e.key===t.$route.name},on:{click:function(n){return t.clickItem(e)}}},[t._v(" "+t._s(e.name)+" ")])}))]}))],2),n("router-view",{staticClass:"app-view"})],1)])},r=[],o={data(){return{menus:[{iconType:"appstore",key:"components",name:"组件",children:[{key:"comment",name:"评论"}]},{iconType:"sketch",key:"directives",name:"指令",children:[{key:"drClick",name:"防重复点击"}]}]}},methods:{changeTheme(t){document.documentElement.setAttribute("data-theme",t)},clickItem(t){this.$route.name!==t.key&&this.$router.push({name:t.key})}}},a=o,c=(n("5c0b"),n("2877")),u=Object(c["a"])(a,s,r,!1,null,null,null),l=u.exports,p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"w-comment-input"},[n("div",{staticClass:"textinput-wrap"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.inputing,expression:"inputing"}],ref:"input",staticClass:"textinput",attrs:{contenteditable:""},on:{blur:t.blur,input:t.input,paste:function(e){return e.preventDefault(),t.paste(e)},keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:e.ctrlKey?t.submit(e):null},keyup:t.keyup}}),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.inputing,expression:"!inputing"}],staticClass:"textinput placeholder",attrs:{contenteditable:""},on:{focus:t.placeholderFocus}},[t._v(" 请输入评论 ")]),n("div",{directives:[{name:"show",rawName:"v-show",value:t.showUsrs,expression:"showUsrs"}],staticClass:"atdropdown"},t._l(t.atUsrs,(function(e){return n("div",{key:e,staticClass:"item",on:{click:function(n){return t.clickAtItem({key:e})}}},[t._v(" "+t._s(e)+" ")])})),0)]),n("div",{staticClass:"toolbar"},[n("div",{staticClass:"toolbar-left"},[n("span",{staticClass:"item",on:{click:t.showAtOpts}},[t._v("@")])]),n("div",{staticClass:"toolbar-right"},[n("span",{staticClass:"tips"},[t._v("Ctrl + Enter 发送")]),n("button",{staticClass:"submit-btn",attrs:{type:"primary",size:"small"},on:{click:t.submit}},[t._v(" 发送 ")])])])])},d=[];function h(t,e){if(window.getSelection){if(!t.firstChild)return void t.focus();var n=window.getSelection(),i=document.createRange();void 0!==e?(i.setStart(t.firstChild,e),i.setEnd(t.firstChild,1)):(i.selectNodeContents(t),i.collapse(!1)),n.removeAllRanges(),n.addRange(i)}else console.warn("浏览器不支持window.getSelection")}var m={name:"CommentInput",data(){return{inputing:!1,showUsrs:!1,atUsrs:["用户1","用户2","用户3"]}},methods:{init(){const{input:t}=this.$refs;t.innerHTML="",this.inputing=!1},placeholderFocus(){const{input:t}=this.$refs;this.inputing=!0,setTimeout(()=>t.focus(),50)},clickAtItem({key:t}){const{input:e}=this.$refs;let n=[t],i=e.innerHTML;this.showUsrs=!1,this.inputing=!0;const s=n.map(t=>`<span class="at-item" data-userId="${t}" data-name="${t}" onclick="return false;" contenteditable="false">@${t}</span>&nbsp;`).join("");if(s){if(this.inputAt){if(this.atPrevEl){const t=this.atPrevEl.outerHTML+"",e=t+"&nbsp;",n=t+"@",r=e+"@",o=t+s,a=e+s;i.match(r)?i=i.replace(r,a):i.match(n)?i=i.replace(n,o):("@"===i[i.length-1]&&(i=i.slice(0,i.length-1)),i+=s)}else"@"===i[i.length-1]&&(i=i.slice(0,i.length-1)),i+=s;this.inputAt=!1}else i+=s;e.innerHTML=i,h(e)}else this.inputAt=!1},showAtOpts(){const t=window.getSelection&&window.getSelection();this.atPrevEl=t&&t.focusNode&&t.focusNode.previousElementSibling,this.atOffset=t&&t.focusOffset,this.atOffset||0===this.atOffset||(this.atOffset=null),this.showUsrs=!0},keyup(t){this.inputAt||"@"!==t.key&&50!==t.keyCode&&50!==t.which||(this.inputAt=!0,this.showAtOpts())},input(t){const{input:e}=this.$refs;this.inputAt=!(!e.innerText[e.innerText.length-1]||"@"!==t.data),this.inputAt&&this.showAtOpts()},blur(){const{input:t}=this.$refs;t.innerHTML||(this.inputing=!1)},paste(t){const{input:e}=this.$refs;let n=(t.clipboardData||window.clipboardData).getData("text");e.innerHTML+=n},submit(){const{input:t}=this.$refs;let e=t.innerHTML;const n=[...t.querySelectorAll(".at-item")],i=n.map(t=>(e=e.replace(new RegExp(t.outerHTML+"(&nbsp;)?"),""),{employeeId:t.getAttribute("data-userId"),name:t.getAttribute("data-name")}));e?(this.init(),this.$emit("on-submit",{content:e,usrs:i})):alert("请输入内容")}},mounted(){this.init()}},f=m,v=(n("281a"),Object(c["a"])(f,p,d,!1,null,null,null)),b=v.exports,w={inserted(t,e){t.addEventListener("click",e=>{if(!t.disabled){t.disabled=!0;const e=t.style.cursor;t.style.cursor="not-allowed",setTimeout(()=>{t.style.cursor=e,t.disabled=!1},300)}})}},y={install(t,e){t.component(b.name,b),t.directive("dr-click",w)}},g=n("8c4f");i["a"].use(g["a"]);const k=[{path:"/",redirect:"/comment"},{path:"/comment",name:"comment",component:()=>n.e("components").then(n.bind(null,"edd2"))},{path:"/drClick",name:"drClick",component:()=>n.e("directives").then(n.bind(null,"6b6a"))}],C=new g["a"]({routes:k});var _=C,O=n("2f62");i["a"].use(O["a"]);var T=new O["a"].Store({state:{},mutations:{},actions:{},modules:{}});i["a"].config.productionTip=!1,i["a"].use(y),new i["a"]({router:_,store:T,render:t=>t(l)}).$mount("#app")},"5c0b":function(t,e,n){"use strict";var i=n("70c1"),s=n.n(i);s.a},6452:function(t,e,n){},"70c1":function(t,e,n){}});