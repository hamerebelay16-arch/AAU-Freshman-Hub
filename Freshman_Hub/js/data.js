// data.js — shared helpers
export async function getJSON(path){
  const res = await fetch(path);
  if(!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

export function el(tag, attrs = {}, ...children){
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k,v])=>{
    if(k === "class") node.className = v;
    else if(k.startsWith("on") && typeof v === "function") node.addEventListener(k.substring(2), v);
    else if(k === "html") node.innerHTML = v;
    else node.setAttribute(k, v);
  });
  for(const ch of children){
    if(ch == null) continue;
    node.appendChild(typeof ch === "string" ? document.createTextNode(ch) : ch);
  }
  return node;
}

export function downloadLink(href, label){
  return el("a", {href, class:"btn ghost", download:""}, label || "Download");
}

export function card({title, desc, img, badge, actions=[]}) {
  return el("div", {
      class:"card",
      style: "background: linear-gradient(135deg, #eeebcaff, #78b0dbff); color: #16369fff;"
    },
    img ? el("img", {src: img, alt: title}) : null,
    el("h3", {}, title),
    desc ? el("p", {}, desc) : null,
    badge ? el("span", {class:"badge"}, badge) : null,
    actions.length ? el("div", {class:"row", style:"margin-top:8px; gap:8px; flex-wrap:wrap"}, ...actions) : null
  );
}
