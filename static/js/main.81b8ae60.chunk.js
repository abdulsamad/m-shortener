(this["webpackJsonpurl-shortener-is.gd"]=this["webpackJsonpurl-shortener-is.gd"]||[]).push([[0],{121:function(e,t,n){},122:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),r=n(27),o=n.n(r),c=n(28),i=n(5),s=n(4),u=n.n(s),m=n(9),d=n(1);var h=function(e){var t=e.title,n=Object(a.useState)(!1),r=Object(m.a)(n,2),o=r[0],c=r[1];return Object(a.useEffect)((function(){"dark"===localStorage.getItem("theme")&&c(!0)}),[]),l.a.createElement("header",null,l.a.createElement(d.Navbar,{alignLinks:"right",brand:l.a.createElement("a",{href:document.domain},t),menuIcon:l.a.createElement(d.Icon,null,"menu"),options:{draggable:!0,edge:"left",inDuration:250,onCloseEnd:null,onCloseStart:null,onOpenEnd:null,onOpenStart:null,outDuration:200,preventScrolling:!0}},l.a.createElement(d.NavItem,null,l.a.createElement(d.Switch,{id:"theme-switch",checked:o,offLabel:l.a.createElement(d.Icon,{className:"yellow-text",left:!0},"wb_sunny"),onChange:function(e){e.target.checked?(c(!0),document.body.classList.replace("light","dark"),localStorage.setItem("theme","dark")):(c(!1),document.body.classList.replace("dark","light"),localStorage.setItem("theme","light"))},onLabel:l.a.createElement(d.Icon,{className:"yellow-text text-lighten-4",right:!0},"brightness_6")}))))},p=n(29),f=n.n(p),g=n(50),E=n(15),v=n(33),b=n(8),w=n.n(b);function C(e){var t=e.copyText,n=e.classes,r=e.btnText,o=e.title;return l.a.createElement(a.Fragment,null,l.a.createElement("a",{href:"#!",className:n,onClick:function(){return function(e){var t=document.createElement("textarea");w.a.Toast.dismissAll(),t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t),w.a.toast({html:"<i class='material-icons green-text'>check_circle</i> &nbsp; Link Copied",classes:"copy-toast"})}(t)},title:o},l.a.createElement(d.Icon,{left:!0},"content_copy")," ",r))}C.defaultProps={btnText:"Copy"};var k=C,y=n(30),S=n.n(y);var x=function(){var e=Object(a.useState)(""),t=Object(m.a)(e,2),n=t[0],r=t[1],o=Object(a.useState)(null),c=Object(m.a)(o,2),i=c[0],s=c[1],h=Object(a.useRef)(),p=Object(a.useRef)(),b=function(e){return S.a.get("https://cors-anywhere.herokuapp.com/".concat(e),{timeout:5e3}).then((function(e){var t=(new DOMParser).parseFromString(e.data,"text/html").querySelectorAll("title")[0];if(t)return t.innerText.trim()}))},C=function(){var e=Object(g.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,navigator.clipboard.readText();case 3:t=e.sent,h.current.value=t,h.current.blur(),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),w.a.toast({html:"<i class='material-icons red-text'>error</i> &nbsp; Clipboard permission not granted.",classes:"error-toast"});case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}();return l.a.createElement("section",{className:"form-container"},l.a.createElement(d.CardPanel,{className:"z-depth-2"},l.a.createElement(d.Row,null,l.a.createElement(d.Col,{s:12},l.a.createElement("form",{onSubmit:function(e){e.preventDefault(),s(null);var t=new URL(e.target.elements.url.value),n=e.target.elements.stats.checked,a=n?"https://is.gd/create.php?format=json&url=".concat(t,"&logstats=1"):"https://is.gd/create.php?format=json&url=".concat(t);S.a.get(a,{timeout:5e3}).then((function(e){var a=e.data.shorturl;r(a),function(e,t,n){var a="linksCollection",l={url:e,shorturl:t,stats:n,id:t.replace("https://is.gd/",""),timestamp:Date.now()};u.a.getItem(a).then((function(t){b(e).then((function(e){t?u.a.setItem(a,[Object(E.a)(Object(E.a)({},l),{},{title:e})].concat(Object(v.a)(t))):u.a.setItem(a,[Object(E.a)(Object(E.a)({},l),{},{title:e})]),s(!0)})).catch((function(){t?u.a.setItem(a,[l].concat(Object(v.a)(t))):u.a.setItem(a,[l]),s(!1)}))})).catch((function(e){w.a.toast({html:"<i class='material-icons red-text'>error</i> &nbsp; ".concat(e.message),classes:"error-toast"})}))}(t.href,a,n)})).catch((function(e){w.a.toast({html:"<i class='material-icons red-text'>error</i> &nbsp; ".concat(e.message),classes:"error-toast"})})),e.target.elements.url.value=""},className:"form"},l.a.createElement("div",{className:"input-field"},l.a.createElement("label",{className:"active",htmlFor:"url"},"Enter a Long URL"),l.a.createElement("input",{type:"url",name:"url",ref:h,placeholder:"https://mylongurl.com/",className:"validate url",onKeyDown:function(e){13===(e.keyCode?e.keyCode:e.which)&&(e.preventDefault(),p.current.click())},required:!0}),l.a.createElement(d.Button,{className:"paste-button hide",waves:"light",style:{padding:"0"},onClick:C,flat:!0},l.a.createElement(d.Icon,null,"content_paste"))),l.a.createElement(d.Row,null,l.a.createElement(d.Col,{s:12},l.a.createElement("div",{className:"switch"},l.a.createElement("label",null,l.a.createElement("span",null,"Show Stats"),l.a.createElement("input",{type:"checkbox",name:"stats"}),l.a.createElement("span",{className:"lever"}))))),l.a.createElement(d.Button,{node:"button",type:"submit",style:{marginRight:"5px"},waves:"light"},l.a.createElement(d.Icon,{left:!0},"content_cut"),l.a.createElement("span",{ref:p},"Shorten It"))),n&&l.a.createElement("div",null,l.a.createElement("div",{className:"input-field"},l.a.createElement("input",{type:"url",className:"shorten-url",value:n,disabled:!0}),l.a.createElement(d.Button,{flat:!0,"aria-hidden":"true",className:"shorturl-title-preload",style:{padding:"0"},waves:"light"},null===i&&l.a.createElement(d.Preloader,{active:!0,color:"blue",tooltip:"Fetching link title",tooltipOptions:{position:"top"},flashing:!1,size:"small"}),!1===i&&l.a.createElement(d.Icon,{tooltip:"Fetching link title failed",tooltipOptions:{position:"top"},className:"red-text"},"highlight_off"),i&&l.a.createElement(d.Icon,{tooltip:"Link title fetched",tooltipOptions:{position:"top"},className:"green-text"},"check_circle"))),navigator.share&&l.a.createElement(d.Button,{small:!0,onClick:function(){var e={title:"Created with ".concat(document.title),text:"Check this out!",url:n};navigator.share(e)},node:"button",style:{marginRight:"5px"},waves:"light"},l.a.createElement(d.Icon,{left:!0},"share"),l.a.createElement("span",null,"Share")),l.a.createElement(k,{copyText:n,classes:"btn btn-small waves-effect waves-light",btnText:"Copy",title:"Copy ShortURL to Clipboard"}))))))},I=n(22);var O=function(e){var t=e.onSearch,n=e.onSearchCancel,r=e.showSearch,o=e.setShowSearch,c=e.editMode,i="e5a9cc5a85b282aec3acbc5f95bd009a",s=Object(a.useState)(!1),h=Object(m.a)(s,2),p=h[0],f=h[1];Object(a.useEffect)((function(){u.a.getItem("linksCollection").then((function(e){return f(null!==e)}))}),[]);var g=function(){var e=document.createElement("a");u.a.getItem("linksCollection").then((function(t){t?(t.push({id:i}),e.href="data:text/json;charset=utf-8,".concat(encodeURIComponent(JSON.stringify(t))),e.download="".concat(document.domain,".json"),document.body.appendChild(e),e.click(),document.body.removeChild(e),w.a.toast({html:"<i class='material-icons blue-text'>info</i> &nbsp; Please download your backup and Keep it safe."})):w.a.toast({html:"<i class='material-icons red-text'>error</i> &nbsp; Nothing to export",classes:"error-toast"})}))},E=function(e){var t=e.target.files[0];try{if(!t||"application/json"!==t.type)throw new Error("Not a valid file");var n=new FileReader;n.readAsText(t,"UTF-8"),n.onload=function(e){u.a.getItem("linksCollection").then((function(t){var n=JSON.parse(e.target.result);if(n.pop().id!==i)throw new Error("Not a valid file");null===t?u.a.setItem("linksCollection",n):u.a.setItem("linksCollection",n.concat(t)),window.location.reload()}))}}catch(a){w.a.toast({html:"<i class='material-icons red-text'>error</i> &nbsp; ".concat(a.message),classes:"error-toast"})}};return r?l.a.createElement("div",{className:"search-input-container"},l.a.createElement(d.TextInput,{placeholder:"Enter Search Keyword",onKeyUp:t,autoFocus:!0}),l.a.createElement(d.Button,{className:"red darken-1",onClick:n},l.a.createElement(d.Icon,null,"close"))):l.a.createElement("div",{className:"list-head"},l.a.createElement("div",{className:"heading"},"Recent Shorten Links"),p&&l.a.createElement("span",{className:"list-dropdown"},l.a.createElement("a",{href:"#!",onClick:function(){return o(!0)}},l.a.createElement(d.Icon,null,"search")),l.a.createElement(d.Dropdown,{id:"list-dropdown",options:{alignment:"left",autoTrigger:!0,closeOnClick:!0,constrainWidth:!0,container:null,coverTrigger:!0,hover:!1,inDuration:150,onCloseEnd:null,onCloseStart:null,onOpenEnd:null,onOpenStart:null,outDuration:250},trigger:l.a.createElement("a",{href:"#!"},l.a.createElement(d.Icon,{right:!0},"more_vert"))},l.a.createElement("a",{href:"#!",onClick:c},l.a.createElement(d.Icon,{left:!0},"edit")," Edit Mode"),l.a.createElement("a",{href:"#!",onChange:E},l.a.createElement(d.Icon,{left:!0},"import_export"),l.a.createElement("input",{type:"file",accept:".json",className:"import-file-input"})),l.a.createElement("a",{href:"#!",onClick:g},l.a.createElement(d.Icon,{left:!0},"cloud_download")," Export"),l.a.createElement("a",{className:"modal-trigger",href:"#delete-modal"},l.a.createElement(d.Icon,{left:!0},"delete")," Delete All"))),!p&&l.a.createElement(d.Dropdown,{id:"list-dropdown",options:{alignment:"left",autoTrigger:!0,closeOnClick:!0,constrainWidth:!0,container:null,coverTrigger:!0,hover:!1,inDuration:150,onCloseEnd:null,onCloseStart:null,onOpenEnd:null,onOpenStart:null,outDuration:250},trigger:l.a.createElement("a",{href:"#!"},l.a.createElement(d.Icon,{right:!0},"more_vert"))},l.a.createElement("a",{href:"#!",onChange:E},l.a.createElement(d.Icon,{left:!0},"import_export"),l.a.createElement("input",{type:"file",accept:".json",className:"import-file-input"}))),l.a.createElement(d.Modal,{bottomSheet:!1,fixedFooter:!1,header:"Delete All links stored locally?",id:"delete-modal",open:!1,options:{dismissible:!0,endingTop:"10%",inDuration:250,onCloseEnd:null,onCloseStart:null,onOpenEnd:null,onOpenStart:null,opacity:.5,outDuration:250,preventScrolling:!0,startingTop:"4%"}},l.a.createElement("h6",null,l.a.createElement("b",null,"Note:")," All your created short links will continue to redirect to their destination."),l.a.createElement("p",null,"Meanwhile, You can download your backup data\xa0",l.a.createElement("a",{href:"#!",onClick:g},"here.")),l.a.createElement(d.Button,{className:"red darken-1",node:"button",onClick:function(){u.a.removeItem("linksCollection"),window.location.reload()}},"Yes")))};var N=function(e){var t=e.match,n=Object(i.g)(),r=Object(a.useState)([]),o=Object(m.a)(r,2),c=o[0],s=o[1],h=Object(a.useState)(0),p=Object(m.a)(h,2),f=p[0],g=p[1],v=Object(a.useState)(1),b=Object(m.a)(v,2),C=b[0],y=b[1],S=Object(a.useState)(!1),x=Object(m.a)(S,2),N=x[0],j=x[1],T=Object(a.useState)(!1),L=Object(m.a)(T,2),R=L[0],_=L[1],D=Object(a.useState)({url:"",shorturl:"",title:"",id:""}),U=Object(m.a)(D,2),A=U[0],B=U[1];Object(a.useEffect)((function(){u.a.getItem("linksCollection").then((function(e){var n=t.params.page;if(e){for(var a=1,l=e.length;10*a<l;)a++;g(a),"/"!==t.path&&y(parseInt(n)),s(e.slice(10*C-10,10*C))}}))}),[f,C,t]);var F=function(e){var t=e.target,n=e.currentTarget;u.a.getItem("linksCollection").then((function(e){var a=t.parentElement.parentElement.parentElement.querySelector(".shorturl").innerText.replace("https://is.gd/","");if(t.classList.contains("edit")){var l=e.find((function(e){return e.id===a}));B(Object(E.a)({title:""},l))}else t.classList.contains("delete")&&function(e,t){u.a.getItem("linksCollection").then((function(n){var a=n.filter((function(t){return t.id!==e})),l=c.filter((function(t){return t.id!==e}));t.classList.add("deleting-item"),w.a.Toast.dismissAll(),u.a.setItem("linksCollection",a),s(l),setTimeout((function(){return t.classList.remove("deleting-item")}),500),w.a.toast({html:"<i class='material-icons red-text'>check_circle</i> &nbsp; URL Deleted",classes:"delete-toast"})}))}(a,n)}))};return l.a.createElement("section",{className:"links-collection z-depth-2"},l.a.createElement(d.Collection,{header:l.a.createElement(O,{onSearch:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,n=e.target.value;u.a.getItem("linksCollection").then((function(e){if(e){var a=new RegExp(n,"gi"),l=e.filter((function(e){return e.title?e.url.match(a)||e.shorturl.match(a)||e.title.match(a):e.url.match(a)||e.shorturl.match(a)}));s(l.slice(0,t))}}))},onSearchCancel:function(){j(!1),n.push("/")},showSearch:N,setShowSearch:j,editMode:function(){return _((function(e){return!e}))}})},0===c.length&&l.a.createElement(d.CollectionItem,null,l.a.createElement("br",null),l.a.createElement("h5",{className:"grey-text"},"Your history will appear here."),l.a.createElement("br",null)),C>f&&c.length>0&&l.a.createElement(d.CollectionItem,null,l.a.createElement("br",null),l.a.createElement("h5",{className:"grey-text"},"Page not found"),l.a.createElement("br",null)),c.map((function(e,t){return l.a.createElement(d.CollectionItem,{key:t,onClick:F},l.a.createElement(d.Row,null,l.a.createElement(d.Col,{s:R?12:10,style:{padding:"0px"}},R&&l.a.createElement("div",{className:"edit-mode-icons"},l.a.createElement("a",{href:"#Edit-Modal",className:"modal-trigger"},l.a.createElement(d.Icon,{left:!0,className:"edit"},"edit")),l.a.createElement("a",{href:"#!"},l.a.createElement(d.Icon,{left:!0,className:"delete"},"delete"))),l.a.createElement("div",{className:"truncate",title:"Title"},e.title?e.title:e.url),l.a.createElement("div",{className:"truncate blue-text shorturl",title:"Short URL"},e.shorturl)),!R&&l.a.createElement(d.Col,{s:2,className:"center-align"},l.a.createElement(k,{copyText:e.shorturl,classes:"secondary-content secondary-copy-btn",btnText:"",title:"Copy ShortURL to Clipboard"}),e.stats&&!R&&l.a.createElement("a",{href:"https://is.gd/stats.php?url=".concat(e.id),target:"_blank",rel:"noreferrer noopener",className:"secondary-content",title:"Check Statistics"},l.a.createElement(d.Icon,{left:!0},"show_chart")))))})),!N&&l.a.createElement(d.CollectionItem,{className:"center-align"},l.a.createElement(d.Pagination,{activePage:C,items:f,leftBtn:l.a.createElement(d.Icon,null,"chevron_left"),maxButtons:5,rightBtn:l.a.createElement(d.Icon,null,"chevron_right"),onSelect:function(e){n.push("/".concat(e))}}))),l.a.createElement(d.Modal,{actions:[l.a.createElement(d.Button,{modal:"close",node:"button",className:"red"},"Cancel"),l.a.createElement("span",null,"\xa0\xa0\xa0"),l.a.createElement(d.Button,{modal:"close",node:"button",className:"blue",onClick:function(){return function(e){var t=e.id;u.a.getItem("linksCollection").then((function(e){var n=c.map((function(e){return e.id===t?A:e})),a=e.map((function(e){return e.id===t?A:e}));s(n),u.a.setItem("linksCollection",a)}))}(A)}},"Edit")],className:"edit-modal",bottomSheet:!1,fixedFooter:!0,header:"Edit URL",id:"Edit-Modal",options:{dismissible:!0,endingTop:"10%",inDuration:250,onCloseEnd:null,onCloseStart:null,onOpenEnd:null,onOpenStart:null,opacity:.5,outDuration:250,preventScrolling:!0,startingTop:"4%"}},l.a.createElement("div",{style:{paddingTop:"10px"}},l.a.createElement(d.TextInput,{type:"text",icon:"title",value:A.title,name:"title",onChange:function(e){return B(Object(E.a)(Object(E.a)({},A),{},Object(I.a)({},e.target.name,e.target.value)))},label:"Title"}),l.a.createElement(d.TextInput,{type:"url",icon:"public",value:A.url,name:"url",label:"Full URL",readOnly:!0}),l.a.createElement(d.TextInput,{type:"url",icon:"link",value:A.shorturl,name:"shorturl",label:"Short URL",readOnly:!0}))))};var j=function(){return l.a.createElement(d.Footer,{className:"footer z-depth-2",copyrights:"\xa9 2020"},l.a.createElement("h5",{className:"white-text"},"URL Shortner v","1.0.0"),l.a.createElement("p",{className:"grey-text text-lighten-4 valign-wrapper"},"Made with \xa0 ",l.a.createElement(d.Icon,{className:"red-text"},"favorite"),"\xa0 by \xa0","Abdul Samad"))};n(121);var T=function(){return Object(a.useEffect)((function(){localStorage.getItem("theme")&&(document.body.className=localStorage.getItem("theme")),u.a.config({name:"URL Shortener"})}),[]),l.a.createElement(c.a,{basename:"/url_shortener_is.gd"},l.a.createElement("div",{className:"App"},l.a.createElement(h,{title:"URL Shortener"}),l.a.createElement("div",{className:"container"},l.a.createElement(x,null),l.a.createElement(i.d,null,l.a.createElement(i.a,{exact:!0,from:"/",to:"/1"}),l.a.createElement(i.b,{exact:!0,from:"/:page",component:N}))),l.a.createElement(j,null)))},L=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function R(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}o.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(T,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/url_shortener_is.gd",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/url_shortener_is.gd","/service-worker.js");L?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):R(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):R(t,e)}))}}()},52:function(e,t,n){e.exports=n(122)}},[[52,1,2]]]);
//# sourceMappingURL=main.81b8ae60.chunk.js.map