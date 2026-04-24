import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   TINDAHAN KO PRO — Ultimate Sari-Sari Store Manager
   Built by: Mang Rodel (20yr tindero + coder) 😄
═══════════════════════════════════════════════════════════ */

const C = {
  bg: "#060810",
  surface: "#0d1117",
  card: "#111827",
  cardHover: "#161f2e",
  border: "#1e2a3a",
  borderLight: "#243040",
  gold: "#f5a623",
  goldLight: "#fbbf24",
  goldDark: "#d97706",
  goldGlow: "#f5a62333",
  red: "#ff4757",
  redGlow: "#ff475722",
  green: "#2ed573",
  greenGlow: "#2ed57322",
  blue: "#1e90ff",
  blueGlow: "#1e90ff22",
  purple: "#a855f7",
  purpleGlow: "#a855f722",
  cyan: "#00d2d3",
  orange: "#ff6b35",
  pink: "#ff4fa3",
  text: "#f0f4ff",
  textMid: "#8899aa",
  textDim: "#445566",
  font: "'Clash Display', 'Syne', sans-serif",
  body: "'Cabinet Grotesk', 'DM Sans', sans-serif",
};

// ── DATA ──────────────────────────────────────────────────
const PRODUCTS = [
  { id:1, name:"Lucky Me Pancit Canton",  cat:"Noodles",       stock:48, min:20, price:14, cost:10, expiry:"2025-08-01", sold:142, unit:"sachet" },
  { id:2, name:"Milo 22g Sachet",          cat:"Beverages",     stock:6,  min:24, price:8,  cost:5.5,expiry:"2025-12-01", sold:95,  unit:"sachet" },
  { id:3, name:"Palmolive Shampoo 12ml",   cat:"Personal Care", stock:30, min:15, price:8,  cost:5,  expiry:"2026-03-01", sold:61,  unit:"sachet" },
  { id:4, name:"Marlboro Red (Tingi)",     cat:"Cigarettes",    stock:2,  min:10, price:6,  cost:4,  expiry:"2025-10-01", sold:280, unit:"stick"  },
  { id:5, name:"Royal Tru-Orange 500ml",  cat:"Beverages",     stock:24, min:12, price:22, cost:16, expiry:"2025-07-15", sold:78,  unit:"bottle" },
  { id:6, name:"Magic Sarap 8g",           cat:"Condiments",    stock:60, min:30, price:5,  cost:3,  expiry:"2025-11-01", sold:210, unit:"sachet" },
  { id:7, name:"Argentina Corned Beef",    cat:"Canned Goods",  stock:15, min:10, price:45, cost:33, expiry:"2026-06-01", sold:38,  unit:"can"    },
  { id:8, name:"Bear Brand 33g",           cat:"Dairy",         stock:40, min:20, price:16, cost:11, expiry:"2025-09-01", sold:55,  unit:"sachet" },
  { id:9, name:"Tanduay Ice 330ml",        cat:"Beverages",     stock:18, min:12, price:35, cost:28, expiry:"2026-01-01", sold:44,  unit:"bottle" },
  { id:10,name:"Eden Cheese 165g",         cat:"Dairy",         stock:8,  min:6,  price:68, cost:52, expiry:"2025-09-15", sold:22,  unit:"pack"   },
];

const UTANG_DATA = [
  { id:1, name:"Aling Nena",   avatar:"AN", color:"#f5a623", items:[{desc:"Lucky Me x3, Milo x2",amount:58,date:"Jun 1"},{desc:"Softdrinks x2",amount:44,date:"Jun 3"}], paid:20, limit:150, phone:"09171111111" },
  { id:2, name:"Kuya Boyet",   avatar:"KB", color:"#1e90ff", items:[{desc:"Cigarettes, Shampoo",amount:22,date:"Jun 5"}], paid:0, limit:100, phone:"09182222222" },
  { id:3, name:"Ate Marites",  avatar:"AM", color:"#a855f7", items:[{desc:"Groceries",amount:230,date:"May 28"},{desc:"E-load 50",amount:50,date:"Jun 2"}], paid:100, limit:300, phone:"09193333333" },
  { id:4, name:"Mang Totoy",   avatar:"MT", color:"#2ed573", items:[{desc:"Corned Beef x3",amount:135,date:"Jun 6"}], paid:135, limit:200, phone:"09204444444" },
  { id:5, name:"Inday Rosa",   avatar:"IR", color:"#ff4fa3", items:[{desc:"Bear Brand x5",amount:80,date:"Jun 4"},{desc:"Shampoo x3",amount:24,date:"Jun 6"}], paid:50, limit:200, phone:"09215555555" },
];

const SALES_DATA = [
  { date:"May 31", sales:1240, profit:380, txn:47 },
  { date:"Jun 1",  sales:980,  profit:290, txn:38 },
  { date:"Jun 2",  sales:1560, profit:480, txn:62 },
  { date:"Jun 3",  sales:820,  profit:240, txn:31 },
  { date:"Jun 4",  sales:1890, profit:570, txn:71 },
  { date:"Jun 5",  sales:1340, profit:410, txn:53 },
  { date:"Jun 6",  sales:2100, profit:650, txn:84 },
];

const ELOAD = [
  { network:"Globe",  color:"#1e90ff", commission:0.03 },
  { network:"Smart",  color:"#2ed573", commission:0.03 },
  { network:"TNT",    color:"#f5a623", commission:0.03 },
  { network:"Sun",    color:"#ff6b35", commission:0.04 },
  { network:"DITO",   color:"#a855f7", commission:0.05 },
];

const BILLS = [
  { name:"Meralco",  icon:"⚡", commission:15 },
  { name:"Maynilad", icon:"💧", commission:10 },
  { name:"PLDT",     icon:"📡", commission:10 },
  { name:"Cignal",   icon:"📺", commission:15 },
  { name:"Pag-IBIG", icon:"🏠", commission:12 },
  { name:"SSS",      icon:"🛡️", commission:10 },
];

const TABS = [
  { id:"home",      label:"Home",      icon:"⌂"  },
  { id:"pos",       label:"POS",       icon:"🧾"  },
  { id:"inventory", label:"Stocks",    icon:"📦"  },
  { id:"utang",     label:"Utang",     icon:"📋"  },
  { id:"sales",     label:"Sales",     icon:"📈"  },
  { id:"services",  label:"Services",  icon:"⚡"  },
  { id:"ai",        label:"AI Tulong", icon:"🤖"  },
  { id:"settings",  label:"Settings",  icon:"⚙️"  },
];

// ── UTILS ─────────────────────────────────────────────────
const peso = (n) => `₱${Number(n).toLocaleString("en-PH", { minimumFractionDigits: 0 })}`;
const getBalance = (u) => u.items.reduce((a,b)=>a+b.amount,0) - u.paid;
const isLowStock = (p) => p.stock <= p.min;
const isExpiringSoon = (p) => {
  const d = new Date(p.expiry), now = new Date();
  return (d - now) / 86400000 < 30;
};
const getMargin = (p) => Math.round(((p.price - p.cost) / p.price) * 100);

// ── SHARED COMPONENTS ─────────────────────────────────────
const Badge = ({ children, color = C.gold }) => (
  <span style={{
    background: color + "22", color, fontSize: 10, fontWeight: 700,
    borderRadius: 6, padding: "3px 8px", letterSpacing: 0.5,
    border: `1px solid ${color}33`,
  }}>{children}</span>
);

const Pill = ({ children, active, onClick, color = C.gold }) => (
  <button onClick={onClick} style={{
    background: active ? color + "22" : C.card,
    color: active ? color : C.textMid,
    border: `1px solid ${active ? color + "44" : C.border}`,
    borderRadius: 20, padding: "6px 14px", fontSize: 11, fontWeight: 600,
    cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap",
  }}>{children}</button>
);

const Input = ({ style, ...props }) => (
  <input {...props} style={{
    background: C.surface, border: `1px solid ${C.border}`,
    borderRadius: 10, padding: "11px 14px", color: C.text,
    fontSize: 13, outline: "none", width: "100%",
    fontFamily: C.body, transition: "border 0.2s",
    ...style,
  }} onFocus={e => e.target.style.borderColor = C.gold}
     onBlur={e => e.target.style.borderColor = C.border} />
);

const Btn = ({ children, onClick, variant = "primary", small, style }) => {
  const variants = {
    primary: { background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`, color: "#1a0f00" },
    danger:  { background: C.redGlow, color: C.red, border: `1px solid ${C.red}44` },
    ghost:   { background: C.card, color: C.textMid, border: `1px solid ${C.border}` },
    success: { background: C.greenGlow, color: C.green, border: `1px solid ${C.green}44` },
    blue:    { background: C.blueGlow, color: C.blue, border: `1px solid ${C.blue}44` },
  };
  return (
    <button onClick={onClick} style={{
      ...variants[variant], borderRadius: 10,
      padding: small ? "8px 14px" : "12px 18px",
      fontSize: small ? 11 : 13, fontWeight: 700, cursor: "pointer",
      fontFamily: C.body, border: "none", transition: "all 0.2s",
      ...style,
    }}>{children}</button>
  );
};

const Card = ({ children, glow, style }) => (
  <div style={{
    background: C.card, border: `1px solid ${glow ? glow + "44" : C.border}`,
    borderRadius: 18, padding: 20,
    boxShadow: glow ? `0 0 20px ${glow}11` : "none",
    ...style,
  }}>{children}</div>
);

const StatCard = ({ icon, label, value, sub, color = C.gold, pulse }) => (
  <div style={{
    background: C.card, border: `1px solid ${color}33`,
    borderRadius: 16, padding: "16px 18px", position: "relative", overflow: "hidden",
    boxShadow: `0 4px 20px ${color}11`,
  }}>
    <div style={{ position:"absolute", top:-24, right:-24, width:80, height:80, borderRadius:"50%", background:color, opacity:0.06 }} />
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
      <div>
        <div style={{ fontSize:10, color:C.textMid, textTransform:"uppercase", letterSpacing:1.2, marginBottom:8 }}>{label}</div>
        <div style={{ fontSize:24, fontWeight:800, color, fontFamily:C.font, lineHeight:1 }}>{value}</div>
        {sub && <div style={{ fontSize:10, color:C.textDim, marginTop:6 }}>{sub}</div>}
      </div>
      <div style={{ position:"relative" }}>
        <div style={{ fontSize:26, background:color+"22", borderRadius:12, padding:"8px 10px" }}>{icon}</div>
        {pulse && <div style={{ position:"absolute", top:4, right:4, width:8, height:8, borderRadius:"50%", background:C.red, animation:"ping 1.5s infinite" }} />}
      </div>
    </div>
  </div>
);

// ── SPARKLINE ─────────────────────────────────────────────
const Sparkline = ({ data, color = C.gold, height = 50 }) => {
  const max = Math.max(...data), min = Math.min(...data);
  const w = 200, h = height;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 8) - 4;
    return `${x},${y}`;
  }).join(" ");
  const area = `M0,${h} L${pts.split(" ").map(p => p).join(" L")} L${w},${h} Z`;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display:"block" }}>
      <defs>
        <linearGradient id={`sg${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#sg${color})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// ── BAR CHART ─────────────────────────────────────────────
const BarChart = ({ data }) => {
  const max = Math.max(...data.map(d => d.sales));
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:6, height:100, padding:"8px 0 0" }}>
      {data.map((d,i) => (
        <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
          <div style={{ width:"100%", display:"flex", flexDirection:"column", justifyContent:"flex-end", height:80, gap:2 }}>
            <div style={{ width:"100%", background:`linear-gradient(180deg,${C.goldLight},${C.goldDark})`, borderRadius:"4px 4px 0 0", height:`${(d.profit/max)*80}px`, transition:"height 0.6s ease", opacity:0.9 }} />
            <div style={{ width:"100%", background:`linear-gradient(180deg,${C.blue}88,${C.blue}44)`, height:`${((d.sales-d.profit)/max)*80}px`, transition:"height 0.6s ease" }} />
          </div>
          <span style={{ fontSize:8, color:C.textDim, whiteSpace:"nowrap" }}>{d.date}</span>
        </div>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// TAB: HOME DASHBOARD
// ═══════════════════════════════════════════════════════════
function HomeTab({ products, utang, sales, setSales }) {
  const lowStock = products.filter(isLowStock);
  const expiring = products.filter(isExpiringSoon);
  const totalUtang = utang.reduce((s,u) => s + getBalance(u), 0);
  const today = sales[sales.length-1];
  const yesterday = sales[sales.length-2];
  const salesDelta = today.sales - yesterday.sales;
  const [time, setTime] = useState(new Date());
  const [quickSale, setQuickSale] = useState("");
  const [quickAmt, setQuickAmt] = useState("");

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const logQuickSale = () => {
    if (!quickAmt) return;
    setSales(prev => {
      const updated = [...prev];
      updated[updated.length-1] = { ...updated[updated.length-1], sales: updated[updated.length-1].sales + +quickAmt, profit: updated[updated.length-1].profit + Math.round(+quickAmt * 0.28), txn: updated[updated.length-1].txn + 1 };
      return updated;
    });
    setQuickSale(""); setQuickAmt("");
  };

  const hours = time.getHours();
  const greeting = hours < 12 ? "Magandang Umaga" : hours < 18 ? "Magandang Hapon" : "Magandang Gabi";
  const weekTotal = sales.reduce((s,d)=>s+d.sales,0);
  const weekProfit = sales.reduce((s,d)=>s+d.profit,0);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
      {/* Hero Banner */}
      <div style={{
        background: `linear-gradient(135deg, #1a1200, #2d1f00, #1a1200)`,
        borderRadius: 22, padding: "24px 22px", position:"relative", overflow:"hidden",
        border: `1px solid ${C.gold}44`,
        boxShadow: `0 8px 40px ${C.gold}11`,
      }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, bottom:0, background:`radial-gradient(ellipse at top right, ${C.gold}11, transparent 60%)` }} />
        <div style={{ position:"absolute", bottom:-30, right:-30, fontSize:100, opacity:0.06 }}>🏪</div>
        <div style={{ position:"relative" }}>
          <div style={{ fontSize:11, color:C.goldLight, fontWeight:600, opacity:0.8 }}>
            {time.toLocaleDateString("fil-PH",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}
          </div>
          <div style={{ fontSize:30, fontWeight:800, color:C.goldLight, fontFamily:C.font, marginTop:4 }}>
            {time.toLocaleTimeString("en-PH",{hour:"2-digit",minute:"2-digit",second:"2-digit"})}
          </div>
          <div style={{ fontSize:16, color:C.text, fontWeight:600, marginTop:4 }}>{greeting}, Mang Rodel! 👋</div>
          <div style={{ display:"flex", gap:12, marginTop:16, flexWrap:"wrap" }}>
            {lowStock.length > 0 && (
              <div style={{ background:C.redGlow, border:`1px solid ${C.red}33`, borderRadius:10, padding:"8px 14px", display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ fontSize:14 }}>⚠️</span>
                <span style={{ fontSize:11, color:C.red, fontWeight:700 }}>{lowStock.length} produkto mababa ang stock</span>
              </div>
            )}
            {expiring.length > 0 && (
              <div style={{ background:"#ff6b3522", border:`1px solid ${C.orange}33`, borderRadius:10, padding:"8px 14px", display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ fontSize:14 }}>📅</span>
                <span style={{ fontSize:11, color:C.orange, fontWeight:700 }}>{expiring.length} malapit mag-expire</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Sale POS */}
      <Card glow={C.green} style={{ padding:"18px 20px" }}>
        <div style={{ fontSize:12, color:C.green, fontWeight:700, marginBottom:12 }}>⚡ MABILIS NA BENTA</div>
        <div style={{ display:"flex", gap:8 }}>
          <Input placeholder="Ano ang nabenta?" value={quickSale} onChange={e=>setQuickSale(e.target.value)} style={{ flex:2 }} />
          <Input placeholder="₱ Halaga" value={quickAmt} onChange={e=>setQuickAmt(e.target.value)} type="number" style={{ flex:1 }} />
          <Btn onClick={logQuickSale} small>✓</Btn>
        </div>
      </Card>

      {/* Stats Grid */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <StatCard icon="💰" label="Sales Ngayon" value={peso(today.sales)} sub={`${salesDelta >= 0 ? "↑" : "↓"} ${peso(Math.abs(salesDelta))} vs kahapon`} color={C.green} />
        <StatCard icon="📊" label="Kita Ngayon" value={peso(today.profit)} sub={`${Math.round((today.profit/today.sales)*100)}% margin`} color={C.gold} />
        <StatCard icon="🧾" label="Txn Ngayon" value={today.txn} sub="transaksyon" color={C.blue} />
        <StatCard icon="📋" label="Kabuuang Utang" value={peso(totalUtang)} sub={`${utang.filter(u=>getBalance(u)>0).length} may utang`} color={C.red} pulse={totalUtang > 0} />
      </div>

      {/* Weekly Chart */}
      <Card>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
          <div style={{ fontSize:13, fontWeight:700, color:C.text }}>Lingguhang Performance</div>
          <div style={{ display:"flex", gap:10 }}>
            <span style={{ fontSize:9, color:C.blue }}>▪ Sales</span>
            <span style={{ fontSize:9, color:C.gold }}>▪ Kita</span>
          </div>
        </div>
        <div style={{ display:"flex", gap:20, marginBottom:12 }}>
          <div><div style={{ fontSize:18, fontWeight:800, color:C.blue, fontFamily:C.font }}>{peso(weekTotal)}</div><div style={{ fontSize:9, color:C.textDim }}>Total Sales</div></div>
          <div><div style={{ fontSize:18, fontWeight:800, color:C.gold, fontFamily:C.font }}>{peso(weekProfit)}</div><div style={{ fontSize:9, color:C.textDim }}>Total Kita</div></div>
        </div>
        <BarChart data={sales} />
      </Card>

      {/* Sparklines */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <Card style={{ padding:"14px 16px" }}>
          <div style={{ fontSize:10, color:C.textMid, marginBottom:6 }}>Sales Trend</div>
          <Sparkline data={sales.map(s=>s.sales)} color={C.blue} height={40} />
        </Card>
        <Card style={{ padding:"14px 16px" }}>
          <div style={{ fontSize:10, color:C.textMid, marginBottom:6 }}>Profit Trend</div>
          <Sparkline data={sales.map(s=>s.profit)} color={C.gold} height={40} />
        </Card>
      </div>

      {/* Low Stock Alerts */}
      {lowStock.length > 0 && (
        <Card glow={C.red}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <div style={{ fontSize:13, fontWeight:700, color:C.red }}>🚨 Mag-order Na!</div>
            <Badge color={C.red}>{lowStock.length} items</Badge>
          </div>
          {lowStock.map(p => (
            <div key={p.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:`1px solid ${C.border}` }}>
              <div>
                <div style={{ fontSize:12, fontWeight:600, color:C.text }}>{p.name}</div>
                <div style={{ fontSize:10, color:C.textDim }}>{p.cat}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:14, fontWeight:800, color:C.red, fontFamily:C.font }}>{p.stock}</div>
                <div style={{ fontSize:9, color:C.textDim }}>min: {p.min}</div>
              </div>
            </div>
          ))}
        </Card>
      )}

      {/* Top Sellers mini */}
      <Card>
        <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:14 }}>🏆 Top Sellers Ngayon</div>
        {PRODUCTS.sort((a,b)=>b.sold-a.sold).slice(0,4).map((p,i) => (
          <div key={p.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"8px 0", borderBottom:`1px solid ${C.border}` }}>
            <div style={{ width:24, height:24, borderRadius:"50%", background:[C.gold,C.blue,C.green,C.purple][i]+"33", color:[C.gold,C.blue,C.green,C.purple][i], display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:800 }}>{i+1}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:12, fontWeight:600, color:C.text }}>{p.name}</div>
            </div>
            <div style={{ fontSize:12, color:C.gold, fontWeight:700 }}>{p.sold} pcs</div>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TAB: POS (POINT OF SALE)
// ═══════════════════════════════════════════════════════════
function POSTab({ products, setProducts, sales, setSales }) {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [cash, setCash] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [filter, setFilter] = useState("All");

  const cats = ["All", ...new Set(products.map(p=>p.cat))];
  const filtered = products.filter(p =>
    (filter === "All" || p.cat === filter) &&
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    p.stock > 0
  );

  const addToCart = (p) => {
    setCart(prev => {
      const existing = prev.find(i=>i.id===p.id);
      if (existing) return prev.map(i=>i.id===p.id ? {...i,qty:i.qty+1} : i);
      return [...prev, {...p, qty:1}];
    });
  };
  const removeFromCart = (id) => setCart(prev => prev.filter(i=>i.id!==id));
  const updateQty = (id, q) => {
    if (q <= 0) return removeFromCart(id);
    setCart(prev => prev.map(i=>i.id===id ? {...i,qty:q} : i));
  };

  const subtotal = cart.reduce((s,i)=>s+(i.price*i.qty),0);
  const change = cash ? +cash - subtotal : 0;

  const checkout = () => {
    if (!cash || +cash < subtotal) return;
    // Update stock
    setProducts(prev => prev.map(p => {
      const ci = cart.find(i=>i.id===p.id);
      return ci ? {...p, stock: p.stock - ci.qty, sold: p.sold + ci.qty} : p;
    }));
    // Update sales
    setSales(prev => {
      const updated = [...prev];
      const profit = cart.reduce((s,i)=>s+(i.price-i.cost)*i.qty,0);
      updated[updated.length-1] = {
        ...updated[updated.length-1],
        sales: updated[updated.length-1].sales + subtotal,
        profit: updated[updated.length-1].profit + profit,
        txn: updated[updated.length-1].txn + 1,
      };
      return updated;
    });
    setReceipt({ items:[...cart], subtotal, cash:+cash, change, time:new Date().toLocaleTimeString() });
    setCart([]);
    setCash("");
  };

  if (receipt) return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <Card glow={C.green} style={{ textAlign:"center" }}>
        <div style={{ fontSize:40, marginBottom:8 }}>✅</div>
        <div style={{ fontSize:18, fontWeight:800, color:C.green, fontFamily:C.font }}>Bayad Na!</div>
        <div style={{ fontSize:12, color:C.textMid, marginBottom:20 }}>{receipt.time}</div>
        <div style={{ background:C.surface, borderRadius:14, padding:18, textAlign:"left", marginBottom:16 }}>
          <div style={{ fontSize:12, fontWeight:700, color:C.textMid, marginBottom:12, textAlign:"center" }}>🏪 TINDAHAN KO — RESIBO</div>
          {receipt.items.map((i,idx) => (
            <div key={idx} style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:C.text, padding:"4px 0" }}>
              <span>{i.name} x{i.qty}</span>
              <span>{peso(i.price * i.qty)}</span>
            </div>
          ))}
          <div style={{ borderTop:`1px dashed ${C.border}`, marginTop:12, paddingTop:12 }}>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, fontWeight:700, color:C.text }}><span>TOTAL</span><span>{peso(receipt.subtotal)}</span></div>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:C.textMid, marginTop:4 }}><span>Cash</span><span>{peso(receipt.cash)}</span></div>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:14, fontWeight:800, color:C.green, marginTop:4 }}><span>Sukli</span><span>{peso(receipt.change)}</span></div>
          </div>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <Btn onClick={()=>setReceipt(null)} variant="ghost" style={{ flex:1 }}>Bagong Transaksyon</Btn>
          <Btn variant="success" style={{ flex:1 }}>🖨️ I-print</Btn>
        </div>
      </Card>
    </div>
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      {/* Search */}
      <Input placeholder="🔍 Hanapin ang produkto..." value={search} onChange={e=>setSearch(e.target.value)} />

      {/* Category Pills */}
      <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:4 }}>
        {cats.map(c => <Pill key={c} active={filter===c} onClick={()=>setFilter(c)}>{c}</Pill>)}
      </div>

      {/* Product Grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10 }}>
        {filtered.map(p => (
          <div key={p.id} onClick={()=>addToCart(p)} style={{
            background: C.card, border:`1px solid ${C.border}`, borderRadius:14,
            padding:"12px 14px", cursor:"pointer", transition:"all 0.15s",
            position:"relative", overflow:"hidden",
          }}>
            <div style={{ position:"absolute", top:6, right:6 }}>
              <Badge color={p.stock <= p.min ? C.red : C.green}>{p.stock}</Badge>
            </div>
            <div style={{ fontSize:10, color:C.textDim, marginBottom:4 }}>{p.cat}</div>
            <div style={{ fontSize:12, fontWeight:700, color:C.text, marginBottom:8, lineHeight:1.3 }}>{p.name}</div>
            <div style={{ fontSize:16, fontWeight:800, color:C.gold, fontFamily:C.font }}>{peso(p.price)}</div>
          </div>
        ))}
      </div>

      {/* Cart */}
      {cart.length > 0 && (
        <Card glow={C.gold} style={{ position:"sticky", bottom:90 }}>
          <div style={{ fontSize:13, fontWeight:700, color:C.gold, marginBottom:12 }}>🛒 Cart ({cart.length} items)</div>
          {cart.map(i => (
            <div key={i.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:`1px solid ${C.border}` }}>
              <div style={{ flex:1, fontSize:12, color:C.text }}>{i.name}</div>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <button onClick={()=>updateQty(i.id,i.qty-1)} style={{ background:C.redGlow, color:C.red, border:"none", borderRadius:6, width:24, height:24, cursor:"pointer", fontWeight:700 }}>-</button>
                <span style={{ fontSize:12, color:C.text, fontWeight:700, minWidth:20, textAlign:"center" }}>{i.qty}</span>
                <button onClick={()=>updateQty(i.id,i.qty+1)} style={{ background:C.greenGlow, color:C.green, border:"none", borderRadius:6, width:24, height:24, cursor:"pointer", fontWeight:700 }}>+</button>
              </div>
              <div style={{ fontSize:12, fontWeight:700, color:C.gold, minWidth:50, textAlign:"right" }}>{peso(i.price*i.qty)}</div>
            </div>
          ))}
          <div style={{ marginTop:14, display:"flex", flexDirection:"column", gap:10 }}>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontSize:14, fontWeight:700, color:C.text }}>TOTAL</span>
              <span style={{ fontSize:20, fontWeight:800, color:C.gold, fontFamily:C.font }}>{peso(subtotal)}</span>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <Input placeholder="₱ Cash na ibinayad" value={cash} onChange={e=>setCash(e.target.value)} type="number" style={{ flex:1 }} />
              <div style={{ flex:1 }}>
                {cash && <div style={{ fontSize:11, color:C.green, fontWeight:700, marginBottom:6 }}>Sukli: {peso(Math.max(0,change))}</div>}
              </div>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <Btn variant="ghost" onClick={()=>setCart([])} style={{ flex:1 }}>Burahin</Btn>
              <Btn onClick={checkout} style={{ flex:2, opacity: (!cash || +cash < subtotal) ? 0.5 : 1 }}>✓ I-checkout {peso(subtotal)}</Btn>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TAB: INVENTORY
// ═══════════════════════════════════════════════════════════
function InventoryTab({ products, setProducts }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [sort, setSort] = useState("name");
  const [blank, setBlank] = useState({ name:"",cat:"",stock:"",min:"",price:"",cost:"",expiry:"",unit:"" });

  const filters = ["All","Low Stock","Expiring","OK"];
  let items = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.cat.toLowerCase().includes(search.toLowerCase()));
  if (filter==="Low Stock") items = items.filter(isLowStock);
  else if (filter==="Expiring") items = items.filter(isExpiringSoon);
  else if (filter==="OK") items = items.filter(p=>!isLowStock(p)&&!isExpiringSoon(p));
  if (sort==="price") items = [...items].sort((a,b)=>b.price-a.price);
  else if (sort==="stock") items = [...items].sort((a,b)=>a.stock-b.stock);
  else if (sort==="margin") items = [...items].sort((a,b)=>getMargin(b)-getMargin(a));

  const addProduct = () => {
    if (!blank.name) return;
    setProducts(prev=>[...prev,{...blank,id:Date.now(),stock:+blank.stock,min:+blank.min,price:+blank.price,cost:+blank.cost,sold:0}]);
    setBlank({name:"",cat:"",stock:"",min:"",price:"",cost:"",expiry:"",unit:""});
    setShowAdd(false);
  };

  const totalValue = products.reduce((s,p)=>s+(p.cost*p.stock),0);
  const totalRetail = products.reduce((s,p)=>s+(p.price*p.stock),0);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      {/* Summary */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
        <Card style={{ padding:"12px 14px", textAlign:"center" }}>
          <div style={{ fontSize:16, fontWeight:800, color:C.blue, fontFamily:C.font }}>{products.length}</div>
          <div style={{ fontSize:9, color:C.textDim }}>Products</div>
        </Card>
        <Card style={{ padding:"12px 14px", textAlign:"center" }}>
          <div style={{ fontSize:14, fontWeight:800, color:C.red, fontFamily:C.font }}>{products.filter(isLowStock).length}</div>
          <div style={{ fontSize:9, color:C.textDim }}>Low Stock</div>
        </Card>
        <Card style={{ padding:"12px 14px", textAlign:"center" }}>
          <div style={{ fontSize:14, fontWeight:800, color:C.gold, fontFamily:C.font }}>{peso(totalRetail)}</div>
          <div style={{ fontSize:9, color:C.textDim }}>Retail Value</div>
        </Card>
      </div>

      <div style={{ display:"flex", gap:8 }}>
        <Input placeholder="🔍 Hanapin..." value={search} onChange={e=>setSearch(e.target.value)} />
        <Btn onClick={()=>setShowAdd(!showAdd)} small style={{ whiteSpace:"nowrap" }}>+ Dagdag</Btn>
      </div>

      <div style={{ display:"flex", gap:8, overflowX:"auto" }}>
        {filters.map(f => <Pill key={f} active={filter===f} onClick={()=>setFilter(f)} color={f==="Low Stock"?C.red:f==="Expiring"?C.orange:C.gold}>{f}</Pill>)}
      </div>

      <div style={{ display:"flex", gap:6, alignItems:"center" }}>
        <span style={{ fontSize:10, color:C.textDim }}>Sort:</span>
        {["name","price","stock","margin"].map(s=>(
          <Pill key={s} active={sort===s} onClick={()=>setSort(s)} color={C.blue}>{s}</Pill>
        ))}
      </div>

      {showAdd && (
        <Card glow={C.gold}>
          <div style={{ fontSize:12, fontWeight:700, color:C.gold, marginBottom:14 }}>➕ Bagong Produkto</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {[["name","Pangalan ng Produkto"],["cat","Kategorya"],["stock","Stock"],["min","Min Stock"],["price","Presyo (₱)"],["cost","Gastos (₱)"],["expiry","Expiry Date"],["unit","Unit (sachet/can...)"]].map(([k,label])=>(
              <Input key={k} placeholder={label} value={blank[k]} onChange={e=>setBlank({...blank,[k]:e.target.value})}
                type={k==="expiry"?"date":"text"} style={{ gridColumn:k==="name"||k==="cat"?"1 / -1":"auto" }} />
            ))}
          </div>
          <Btn onClick={addProduct} style={{ width:"100%", marginTop:14 }}>💾 I-save</Btn>
        </Card>
      )}

      {items.map(p => {
        const margin = getMargin(p);
        const low = isLowStock(p), exp = isExpiringSoon(p);
        return (
          <div key={p.id} style={{
            background:C.card, borderRadius:16, padding:"16px 18px",
            border:`1px solid ${low?C.red+"44":exp?C.orange+"44":C.border}`,
          }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.text }}>{p.name}</div>
                <div style={{ fontSize:10, color:C.textDim, marginTop:2 }}>{p.cat} • {p.expiry} • {p.unit}</div>
              </div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", justifyContent:"flex-end" }}>
                {low && <Badge color={C.red}>LOW</Badge>}
                {exp && <Badge color={C.orange}>EXPIRING</Badge>}
                <Badge color={C.purple}>{margin}% margin</Badge>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:12 }}>
              {[["Stock",p.stock,low?C.red:C.green],["Min",p.min,C.textDim],["Presyo",peso(p.price),C.gold],["Gastos",peso(p.cost),C.textMid]].map(([l,v,c])=>(
                <div key={l} style={{ textAlign:"center" }}>
                  <div style={{ fontSize:14, fontWeight:800, color:c, fontFamily:C.font }}>{v}</div>
                  <div style={{ fontSize:9, color:C.textDim }}>{l}</div>
                </div>
              ))}
            </div>
            {/* Stock bar */}
            <div style={{ background:C.border, borderRadius:99, height:4, marginBottom:12 }}>
              <div style={{ width:`${Math.min(100,(p.stock/Math.max(p.min*2,1))*100)}%`, height:"100%", borderRadius:99, background:low?C.red:C.green, transition:"width 0.4s" }} />
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <Btn variant="success" small onClick={()=>setProducts(prev=>prev.map(x=>x.id===p.id?{...x,stock:x.stock+1}:x))}>+1 Stock</Btn>
              <Btn variant="danger" small onClick={()=>setProducts(prev=>prev.map(x=>x.id===p.id?{...x,stock:Math.max(0,x.stock-1)}:x))}>-1</Btn>
              <Btn variant="ghost" small style={{ flex:1 }} onClick={()=>setProducts(prev=>prev.map(x=>x.id===p.id?{...x,stock:x.min*2+10}:x))}>📦 Restock</Btn>
              <Btn variant="danger" small onClick={()=>setProducts(prev=>prev.filter(x=>x.id!==p.id))}>🗑️</Btn>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TAB: UTANG MANAGER
// ═══════════════════════════════════════════════════════════
function UtangTab({ utang, setUtang }) {
  const [selected, setSelected] = useState(null);
  const [newName, setNewName] = useState("");
  const [newLimit, setNewLimit] = useState("200");
  const [newPhone, setNewPhone] = useState("");
  const [payAmt, setPayAmt] = useState("");
  const [debtDesc, setDebtDesc] = useState("");
  const [debtAmt, setDebtAmt] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const totalUtang = utang.reduce((s,u)=>s+getBalance(u),0);
  const activeDebtors = utang.filter(u=>getBalance(u)>0);

  let shown = utang.filter(u=>u.name.toLowerCase().includes(search.toLowerCase()));
  if(filter==="May Utang") shown=shown.filter(u=>getBalance(u)>0);
  if(filter==="Bayad Na") shown=shown.filter(u=>getBalance(u)<=0);
  if(filter==="Malapit sa Limit") shown=shown.filter(u=>getBalance(u)/u.limit>0.7);

  const addPerson = () => {
    if(!newName) return;
    const initials = newName.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);
    setUtang(prev=>[...prev,{id:Date.now(),name:newName,avatar:initials,color:["#f5a623","#1e90ff","#a855f7","#2ed573","#ff4fa3"][prev.length%5],items:[],paid:0,limit:+newLimit||200,phone:newPhone}]);
    setNewName(""); setNewLimit("200"); setNewPhone("");
  };

  const addDebt = (id) => {
    if(!debtDesc||!debtAmt) return;
    setUtang(prev=>prev.map(u=>u.id===id?{...u,items:[...u.items,{desc:debtDesc,amount:+debtAmt,date:new Date().toLocaleDateString("en-PH",{month:"short",day:"numeric"})}]}:u));
    setDebtDesc(""); setDebtAmt("");
  };

  const recordPayment = (id) => {
    if(!payAmt) return;
    setUtang(prev=>prev.map(u=>u.id===id?{...u,paid:u.paid+(+payAmt)}:u));
    setPayAmt("");
  };

  if(selected !== null) {
    const u = utang.find(x=>x.id===selected);
    if(!u) { setSelected(null); return null; }
    const bal = getBalance(u);
    const pct = Math.min(100,(bal/u.limit)*100);
    const statusColor = pct>80?C.red:pct>50?C.orange:C.green;

    return (
      <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        <Btn variant="ghost" onClick={()=>setSelected(null)} small>← Bumalik</Btn>
        <Card glow={u.color}>
          <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:20 }}>
            <div style={{ width:56,height:56,borderRadius:"50%", background:`linear-gradient(135deg,${u.color},${u.color}88)`, display:"flex",alignItems:"center",justifyContent:"center", fontSize:18,fontWeight:800,color:"#fff", flexShrink:0 }}>{u.avatar}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:20,fontWeight:800,color:C.text,fontFamily:C.font }}>{u.name}</div>
              {u.phone && <div style={{ fontSize:11,color:C.textDim }}>📱 {u.phone}</div>}
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:28,fontWeight:800,color:bal>0?C.red:C.green,fontFamily:C.font }}>{peso(bal)}</div>
              <div style={{ fontSize:10,color:C.textDim }}>balance</div>
            </div>
          </div>

          {/* Limit bar */}
          <div style={{ marginBottom:6, display:"flex", justifyContent:"space-between" }}>
            <span style={{ fontSize:10,color:C.textDim }}>Credit Limit: {peso(u.limit)}</span>
            <span style={{ fontSize:10,color:statusColor }}>{Math.round(pct)}% used</span>
          </div>
          <div style={{ background:C.border,borderRadius:99,height:8,marginBottom:20 }}>
            <div style={{ width:`${pct}%`,height:"100%",borderRadius:99,background:statusColor,transition:"width 0.5s" }} />
          </div>

          {/* Actions */}
          <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
            <Btn variant="success" style={{ flex:1 }}>📱 SMS Reminder</Btn>
            <Btn variant="blue" style={{ flex:1 }}>📞 Tawagan</Btn>
          </div>
        </Card>

        {/* Record Payment */}
        <Card glow={C.green}>
          <div style={{ fontSize:12,fontWeight:700,color:C.green,marginBottom:12 }}>💰 I-record ang Bayad</div>
          <div style={{ display:"flex",gap:8 }}>
            <Input placeholder="₱ Halaga" value={payAmt} onChange={e=>setPayAmt(e.target.value)} type="number" />
            <Btn onClick={()=>recordPayment(u.id)} variant="success">Bayad ✓</Btn>
          </div>
          {payAmt && <div style={{ fontSize:11,color:C.green,marginTop:8 }}>Magiging balance: {peso(Math.max(0,bal-+payAmt))}</div>}
        </Card>

        {/* Add Debt */}
        <Card glow={C.red}>
          <div style={{ fontSize:12,fontWeight:700,color:C.red,marginBottom:12 }}>➕ Dagdag na Utang</div>
          <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
            <Input placeholder="Ano ang binili?" value={debtDesc} onChange={e=>setDebtDesc(e.target.value)} />
            <div style={{ display:"flex",gap:8 }}>
              <Input placeholder="₱ Halaga" type="number" value={debtAmt} onChange={e=>setDebtAmt(e.target.value)} />
              <Btn onClick={()=>addDebt(u.id)} variant="danger">I-add</Btn>
            </div>
          </div>
          {debtAmt && bal + +debtAmt > u.limit && (
            <div style={{ fontSize:11,color:C.red,marginTop:8,fontWeight:700 }}>⚠️ Lalampas sa credit limit!</div>
          )}
        </Card>

        {/* Transaction History */}
        <Card>
          <div style={{ fontSize:13,fontWeight:700,color:C.text,marginBottom:14 }}>📜 Kasaysayan ng Transaksyon</div>
          {u.items.length === 0 && <div style={{ fontSize:12,color:C.textDim,textAlign:"center",padding:20 }}>Wala pang utang. 😊</div>}
          {[...u.items].reverse().map((item,i)=>(
            <div key={i} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${C.border}` }}>
              <div>
                <div style={{ fontSize:12,color:C.text,fontWeight:600 }}>{item.desc}</div>
                <div style={{ fontSize:10,color:C.textDim }}>{item.date}</div>
              </div>
              <div style={{ fontSize:14,fontWeight:800,color:C.red,fontFamily:C.font }}>+{peso(item.amount)}</div>
            </div>
          ))}
          <div style={{ display:"flex",justifyContent:"space-between",padding:"10px 0",borderTop:`1px solid ${C.border}` }}>
            <div style={{ fontSize:12,color:C.green,fontWeight:600 }}>Total Bayad</div>
            <div style={{ fontSize:14,fontWeight:800,color:C.green,fontFamily:C.font }}>-{peso(u.paid)}</div>
          </div>
          <div style={{ display:"flex",justifyContent:"space-between",paddingTop:8 }}>
            <div style={{ fontSize:13,color:C.text,fontWeight:700 }}>BALANCE</div>
            <div style={{ fontSize:18,fontWeight:800,color:bal>0?C.red:C.green,fontFamily:C.font }}>{peso(bal)}</div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
      {/* Summary Banner */}
      <div style={{ background:`linear-gradient(135deg,#1a0000,#2d0808)`, border:`1px solid ${C.red}33`, borderRadius:20, padding:"20px 22px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute",top:0,left:0,right:0,bottom:0,background:`radial-gradient(ellipse at top right,${C.red}11,transparent 60%)` }} />
        <div style={{ position:"relative" }}>
          <div style={{ fontSize:11,color:C.red,fontWeight:600,textTransform:"uppercase",letterSpacing:1 }}>Total Utang sa'yo</div>
          <div style={{ fontSize:36,fontWeight:800,color:C.red,fontFamily:C.font }}>{peso(totalUtang)}</div>
          <div style={{ fontSize:11,color:C.textMid,marginTop:4 }}>{activeDebtors.length} tao may utang • {utang.length - activeDebtors.length} bayad na</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display:"flex",gap:8,overflowX:"auto" }}>
        {["All","May Utang","Bayad Na","Malapit sa Limit"].map(f=>(
          <Pill key={f} active={filter===f} onClick={()=>setFilter(f)} color={f==="May Utang"?C.red:f==="Bayad Na"?C.green:C.gold}>{f}</Pill>
        ))}
      </div>

      <Input placeholder="🔍 Hanapin ang pangalan..." value={search} onChange={e=>setSearch(e.target.value)} />

      {/* Add Person */}
      <Card glow={C.gold}>
        <div style={{ fontSize:12,fontWeight:700,color:C.gold,marginBottom:12 }}>👤 Magdagdag ng Tao</div>
        <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
          <Input placeholder="Pangalan" value={newName} onChange={e=>setNewName(e.target.value)} />
          <div style={{ display:"flex",gap:8 }}>
            <Input placeholder="Phone (optional)" value={newPhone} onChange={e=>setNewPhone(e.target.value)} />
            <Input placeholder="Limit (₱)" value={newLimit} onChange={e=>setNewLimit(e.target.value)} type="number" />
          </div>
          <Btn onClick={addPerson}>+ Idagdag</Btn>
        </div>
      </Card>

      {/* Debtor Cards */}
      {shown.map((u) => {
        const bal = getBalance(u);
        const pct = Math.min(100,(bal/u.limit)*100);
        const sc = pct>80?C.red:pct>50?C.orange:C.green;
        return (
          <div key={u.id} onClick={()=>setSelected(u.id)} style={{
            background:C.card, border:`1px solid ${bal>=u.limit?C.red+"66":C.border}`,
            borderRadius:16, padding:"16px 18px", cursor:"pointer",
          }}>
            <div style={{ display:"flex",alignItems:"center",gap:14 }}>
              <div style={{ width:46,height:46,borderRadius:"50%",background:`linear-gradient(135deg,${u.color},${u.color}88)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:800,color:"#fff",flexShrink:0 }}>{u.avatar}</div>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <div style={{ fontSize:14,fontWeight:700,color:C.text }}>{u.name}</div>
                  <div style={{ fontSize:18,fontWeight:800,color:bal<=0?C.green:C.red,fontFamily:C.font }}>
                    {bal<=0?"✓ Bayad":peso(bal)}
                  </div>
                </div>
                <div style={{ marginTop:8,background:C.border,borderRadius:99,height:5 }}>
                  <div style={{ width:`${pct}%`,height:"100%",borderRadius:99,background:sc,transition:"width 0.5s" }} />
                </div>
                <div style={{ fontSize:10,color:C.textDim,marginTop:4 }}>
                  {u.items.length} txn • Limit {peso(u.limit)} • {Math.round(pct)}% used
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TAB: SALES & ANALYTICS
// ═══════════════════════════════════════════════════════════
function SalesTab({ sales, products }) {
  const [period, setPeriod] = useState("week");
  const totalSales = sales.reduce((s,d)=>s+d.sales,0);
  const totalProfit = sales.reduce((s,d)=>s+d.profit,0);
  const totalTxn = sales.reduce((s,d)=>s+d.txn,0);
  const avgOrder = Math.round(totalSales/totalTxn);
  const margin = Math.round((totalProfit/totalSales)*100);
  const best = sales.reduce((a,b)=>b.sales>a.sales?b:a);
  const sortedProducts = [...products].sort((a,b)=>b.sold-a.sold);

  return (
    <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
      {/* Hero Metrics */}
      <Card glow={C.gold}>
        <div style={{ display:"flex",gap:8,marginBottom:20 }}>
          {["week","month"].map(p=><Pill key={p} active={period===p} onClick={()=>setPeriod(p)}>{p==="week"?"7 Araw":"30 Araw"}</Pill>)}
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
          {[["💰 Sales",peso(totalSales),C.blue],["📊 Kita",peso(totalProfit),C.green],["🧾 Transactions",totalTxn,C.gold],["📦 Avg Order",peso(avgOrder),C.purple]].map(([l,v,c])=>(
            <div key={l} style={{ background:C.surface,borderRadius:14,padding:"14px 16px" }}>
              <div style={{ fontSize:10,color:C.textDim,marginBottom:4 }}>{l}</div>
              <div style={{ fontSize:22,fontWeight:800,color:c,fontFamily:C.font }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:16,display:"flex",gap:16 }}>
          <div style={{ background:C.surface,borderRadius:14,padding:"12px 16px",flex:1 }}>
            <div style={{ fontSize:10,color:C.textDim }}>Profit Margin</div>
            <div style={{ fontSize:20,fontWeight:800,color:margin>30?C.green:C.orange,fontFamily:C.font }}>{margin}%</div>
          </div>
          <div style={{ background:C.surface,borderRadius:14,padding:"12px 16px",flex:1 }}>
            <div style={{ fontSize:10,color:C.textDim }}>Best Day</div>
            <div style={{ fontSize:14,fontWeight:800,color:C.gold }}>{best.date}</div>
            <div style={{ fontSize:11,color:C.textDim }}>{peso(best.sales)}</div>
          </div>
        </div>
      </Card>

      {/* Chart */}
      <Card>
        <div style={{ fontSize:13,fontWeight:700,color:C.text,marginBottom:4 }}>Daily Sales Chart</div>
        <div style={{ display:"flex",gap:12,fontSize:10,marginBottom:14 }}>
          <span style={{ color:C.blue }}>▪ Revenue</span>
          <span style={{ color:C.gold }}>▪ Profit</span>
        </div>
        <BarChart data={sales} />
        <div style={{ marginTop:14, display:"flex",flexDirection:"column",gap:8 }}>
          {sales.map((d,i)=>(
            <div key={i} style={{ display:"flex",alignItems:"center",gap:10 }}>
              <div style={{ fontSize:11,color:C.textMid,width:44 }}>{d.date}</div>
              <div style={{ flex:1,background:C.border,borderRadius:99,height:6,position:"relative" }}>
                <div style={{ position:"absolute",top:0,left:0,width:`${(d.sales/best.sales)*100}%`,height:"100%",borderRadius:99,background:C.blue+"88" }} />
                <div style={{ position:"absolute",top:0,left:0,width:`${(d.profit/best.sales)*100}%`,height:"100%",borderRadius:99,background:C.gold }} />
              </div>
              <div style={{ fontSize:11,color:C.text,fontWeight:700,width:52,textAlign:"right" }}>{peso(d.sales)}</div>
              <div style={{ fontSize:10,color:C.green,width:40,textAlign:"right" }}>+{peso(d.profit)}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Products */}
      <Card>
        <div style={{ fontSize:13,fontWeight:700,color:C.text,marginBottom:16 }}>🏆 Best Sellers</div>
        {sortedProducts.slice(0,6).map((p,i)=>{
          const revenue = p.price * p.sold;
          const maxRev = sortedProducts[0].price * sortedProducts[0].sold;
          return (
            <div key={p.id} style={{ marginBottom:14 }}>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:4 }}>
                <div style={{ display:"flex",gap:8,alignItems:"center" }}>
                  <div style={{ width:22,height:22,borderRadius:"50%",background:[C.gold,C.blue,C.green,C.purple,C.red,C.cyan][i]+"33",color:[C.gold,C.blue,C.green,C.purple,C.red,C.cyan][i],display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800 }}>{i+1}</div>
                  <div style={{ fontSize:12,color:C.text,fontWeight:600 }}>{p.name}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:12,color:C.gold,fontWeight:700 }}>{peso(revenue)}</div>
                  <div style={{ fontSize:9,color:C.textDim }}>{p.sold} pcs</div>
                </div>
              </div>
              <div style={{ background:C.border,borderRadius:99,height:4 }}>
                <div style={{ width:`${(revenue/maxRev)*100}%`,height:"100%",borderRadius:99,background:[C.gold,C.blue,C.green,C.purple,C.red,C.cyan][i],transition:"width 0.6s" }} />
              </div>
            </div>
          );
        })}
      </Card>

      {/* Insights */}
      <Card glow={C.purple}>
        <div style={{ fontSize:13,fontWeight:700,color:C.purple,marginBottom:14 }}>💡 Smart Insights</div>
        {[
          { icon:"📈", text:"Ang iyong pinaka-profitable na produkto ay Magic Sarap na may 40% margin.", color:C.green },
          { icon:"⚠️", text:"Si Ate Marites ang pinaka-malaking debtor (₱180). Recommend: send reminder.", color:C.red },
          { icon:"💡", text:"Tuesday ang pinaka-mababang sales day. Try mag-promo tuwing Martes.", color:C.gold },
          { icon:"🔄", text:"Milo at Marlboro mabilis maubusin — dagdagan ang minimum stock.", color:C.orange },
        ].map((ins,i)=>(
          <div key={i} style={{ display:"flex",gap:12,padding:"10px 0",borderBottom:`1px solid ${C.border}` }}>
            <div style={{ fontSize:18 }}>{ins.icon}</div>
            <div style={{ fontSize:12,color:C.textMid,lineHeight:1.5 }}>{ins.text}</div>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TAB: SERVICES (E-LOAD, BILLS)
// ═══════════════════════════════════════════════════════════
function ServicesTab() {
  const [eloadAmt, setEloadAmt] = useState("");
  const [eloadNet, setEloadNet] = useState(ELOAD[0]);
  const [eloadPhone, setEloadPhone] = useState("");
  const [eloadLogs, setEloadLogs] = useState([
    { network:"Globe", phone:"09171234567", amount:50, commission:1.50, time:"8:32 AM" },
    { network:"Smart", phone:"09185678901", amount:100, commission:3.00, time:"9:15 AM" },
    { network:"TNT",   phone:"09063456789", amount:30, commission:0.90, time:"10:45 AM" },
  ]);
  const [billLogs, setBillLogs] = useState([]);

  const sendLoad = () => {
    if(!eloadPhone||!eloadAmt) return;
    const commission = Math.round(+eloadAmt * eloadNet.commission * 100)/100;
    setEloadLogs(prev=>[{network:eloadNet.network,phone:eloadPhone,amount:+eloadAmt,commission,time:new Date().toLocaleTimeString("en-PH",{hour:"2-digit",minute:"2-digit"})}, ...prev]);
    setEloadPhone(""); setEloadAmt("");
  };

  const payBill = (bill) => {
    setBillLogs(prev=>[{name:bill.name,commission:bill.commission,time:new Date().toLocaleTimeString("en-PH",{hour:"2-digit",minute:"2-digit"})}, ...prev]);
  };

  const totalLoadComm = eloadLogs.reduce((s,l)=>s+l.commission,0);
  const totalBillComm = billLogs.reduce((s,b)=>s+b.commission,0);

  return (
    <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
      {/* Earnings Summary */}
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
        <StatCard icon="📱" label="E-Load Komisyon" value={`₱${totalLoadComm.toFixed(2)}`} sub="ngayong araw" color={C.blue} />
        <StatCard icon="💳" label="Bills Komisyon" value={`₱${totalBillComm}`} sub="ngayong araw" color={C.purple} />
      </div>

      {/* E-Load Section */}
      <Card glow={C.blue}>
        <div style={{ fontSize:13,fontWeight:700,color:C.blue,marginBottom:14 }}>📱 E-Load</div>
        <div style={{ display:"flex",gap:8,overflowX:"auto",marginBottom:12 }}>
          {ELOAD.map(n=>(
            <Pill key={n.network} active={eloadNet.network===n.network} onClick={()=>setEloadNet(n)} color={n.color}>{n.network}</Pill>
          ))}
        </div>
        <div style={{ display:"flex",gap:10,marginBottom:10 }}>
          <Input placeholder={`${eloadNet.network} Number`} value={eloadPhone} onChange={e=>setEloadPhone(e.target.value)} />
        </div>
        <div style={{ display:"flex",gap:10 }}>
          {[30,50,100,200,300,500].map(amt=>(
            <button key={amt} onClick={()=>setEloadAmt(String(amt))} style={{
              flex:1, background:eloadAmt===String(amt)?eloadNet.color+"33":C.surface,
              color:eloadAmt===String(amt)?eloadNet.color:C.textMid,
              border:`1px solid ${eloadAmt===String(amt)?eloadNet.color+"44":C.border}`,
              borderRadius:8, padding:"8px 4px", fontSize:11, fontWeight:700, cursor:"pointer",
            }}>₱{amt}</button>
          ))}
        </div>
        {eloadAmt && (
          <div style={{ marginTop:10,padding:"10px 14px",background:C.surface,borderRadius:10 }}>
            <div style={{ fontSize:11,color:C.textMid }}>Komisyon: <span style={{ color:C.green,fontWeight:700 }}>₱{(+eloadAmt*eloadNet.commission).toFixed(2)}</span></div>
          </div>
        )}
        <Btn onClick={sendLoad} style={{ width:"100%",marginTop:12 }}>📤 Magpadala ng Load</Btn>

        {/* Load Logs */}
        {eloadLogs.length > 0 && (
          <div style={{ marginTop:16 }}>
            <div style={{ fontSize:11,color:C.textMid,marginBottom:10 }}>Mga Napadala:</div>
            {eloadLogs.slice(0,5).map((l,i)=>(
              <div key={i} style={{ display:"flex",justifyContent:"space-between",fontSize:11,padding:"6px 0",borderBottom:`1px solid ${C.border}` }}>
                <span style={{ color:C.textMid }}>{l.network} • {l.phone}</span>
                <div style={{ textAlign:"right" }}>
                  <div style={{ color:C.text }}>{peso(l.amount)}</div>
                  <div style={{ color:C.green,fontSize:9 }}>+₱{l.commission.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Bills Payment */}
      <Card glow={C.purple}>
        <div style={{ fontSize:13,fontWeight:700,color:C.purple,marginBottom:14 }}>💳 Bills Payment</div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
          {BILLS.map(b=>(
            <div key={b.name} onClick={()=>payBill(b)} style={{
              background:C.surface, border:`1px solid ${C.border}`, borderRadius:12,
              padding:"14px", cursor:"pointer", textAlign:"center",
            }}>
              <div style={{ fontSize:24,marginBottom:6 }}>{b.icon}</div>
              <div style={{ fontSize:12,fontWeight:700,color:C.text }}>{b.name}</div>
              <div style={{ fontSize:10,color:C.green,marginTop:4 }}>+₱{b.commission} komisyon</div>
            </div>
          ))}
        </div>
        {billLogs.length>0 && (
          <div style={{ marginTop:16 }}>
            <div style={{ fontSize:11,color:C.textMid,marginBottom:8 }}>Mga Na-process:</div>
            {billLogs.map((b,i)=>(
              <div key={i} style={{ display:"flex",justifyContent:"space-between",fontSize:11,padding:"6px 0",borderBottom:`1px solid ${C.border}` }}>
                <span style={{ color:C.textMid }}>{b.name} • {b.time}</span>
                <span style={{ color:C.green }}>+₱{b.commission}</span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* GCash / Maya */}
      <Card>
        <div style={{ fontSize:13,fontWeight:700,color:C.text,marginBottom:14 }}>💸 Cash-In / Cash-Out</div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
          {[["GCash","#0066ff","💙","₱25 komisyon"],["Maya","#00c878","💚","₱20 komisyon"]].map(([name,color,emoji,comm])=>(
            <div key={name} style={{ background:C.surface,border:`1px solid ${color}33`,borderRadius:14,padding:"18px 14px",textAlign:"center" }}>
              <div style={{ fontSize:28,marginBottom:8 }}>{emoji}</div>
              <div style={{ fontSize:14,fontWeight:800,color,fontFamily:C.font }}>{name}</div>
              <div style={{ fontSize:10,color:C.green,marginTop:4 }}>{comm}</div>
              <Btn variant="ghost" small style={{ marginTop:10,width:"100%" }}>I-process</Btn>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TAB: AI ASSISTANT (Claude-powered)
// ═══════════════════════════════════════════════════════════
function AITab({ products, utang, sales }) {
  const [messages, setMessages] = useState([
    { role:"assistant", content:"Hoy! Ako si TindaBot, ang inyong AI na tindero-assistant! 🤖🏪 Tanungin mo ako tungkol sa iyong negosyo — presyo, inventory, utang, tips para kumita — lahat ng kailangan mo, sagot ko! 😄" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if(scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const lowStock = products.filter(isLowStock);
  const totalUtang = utang.reduce((s,u)=>s+getBalance(u),0);
  const todaySales = sales[sales.length-1];
  const weekSales = sales.reduce((s,d)=>s+d.sales,0);
  const weekProfit = sales.reduce((s,d)=>s+d.profit,0);
  const topProduct = [...products].sort((a,b)=>b.sold-a.sold)[0];

  const context = `
Ikaw ay TindaBot — isang matalinong AI assistant para sa sari-sari store sa Pilipinas.
Sumasagot ka sa Tagalog at Taglish. Ikaw ay praktikal, makulit (pero helpful), at may sense of humor.
Mag-address sa may-ari bilang "Mang Rodel" o "Boss".

TINDAHAN DATA (Real-time):
- Ngayong sales: ${peso(todaySales.sales)} | Kita: ${peso(todaySales.profit)} | Txn: ${todaySales.txn}
- Lingguhang sales: ${peso(weekSales)} | Profit: ${peso(weekProfit)} | Margin: ${Math.round((weekProfit/weekSales)*100)}%
- Total utang: ${peso(totalUtang)} mula sa ${utang.filter(u=>getBalance(u)>0).length} tao
- Pinakamalaking utang: ${utang.sort((a,b)=>getBalance(b)-getBalance(a))[0]?.name} - ${peso(getBalance(utang.sort((a,b)=>getBalance(b)-getBalance(a))[0]))}
- Mababang stock: ${lowStock.map(p=>p.name).join(", ") || "Wala"}
- Pinaka-sikat na produkto: ${topProduct.name} (${topProduct.sold} nabenta)
- Total products: ${products.length}

Bigyan ng specific, actionable na advice. Gumamit ng emojis. Maging makulit pero helpful.
Kung may computation, ipakita ang math. Kung may rekomendasyon, i-explain kung bakit.
  `.trim();

  const send = async () => {
    if(!input.trim()||loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev=>[...prev,{role:"user",content:userMsg}]);
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system: context,
          messages:[...messages.filter(m=>m.role!=="assistant"||messages.indexOf(m)>0).map(m=>({role:m.role,content:m.content})),{role:"user",content:userMsg}],
        })
      });
      const data = await res.json();
      const reply = data.content?.map(b=>b.text||"").join("") || "Sorry, may error. Try ulit!";
      setMessages(prev=>[...prev,{role:"assistant",content:reply}]);
    } catch(e) {
      setMessages(prev=>[...prev,{role:"assistant",content:"Ay, may internet problem! Try ulit mamaya. 😅"}]);
    }
    setLoading(false);
  };

  const quickQuestions = [
    "Kumikita ba ako ngayon?",
    "Sino ang may pinakamalaking utang?",
    "Ano ang dapat kong i-reorder?",
    "Paano ko mapataas ang profit?",
    "Mag-recommend ng promosyon",
  ];

  return (
    <div style={{ display:"flex",flexDirection:"column",height:"calc(100vh - 200px)",gap:0 }}>
      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,#0d0d1a,#1a1035)`, border:`1px solid ${C.purple}33`, borderRadius:18, padding:"16px 20px", marginBottom:14 }}>
        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
          <div style={{ fontSize:32 }}>🤖</div>
          <div>
            <div style={{ fontSize:15,fontWeight:800,color:C.purple,fontFamily:C.font }}>TindaBot AI</div>
            <div style={{ fontSize:10,color:C.textDim }}>Powered by Claude • May alam sa inyong tindahan</div>
          </div>
          <div style={{ marginLeft:"auto" }}>
            <div style={{ width:8,height:8,borderRadius:"50%",background:C.green,boxShadow:`0 0 8px ${C.green}` }} />
          </div>
        </div>
      </div>

      {/* Quick Qs */}
      <div style={{ display:"flex",gap:8,overflowX:"auto",paddingBottom:10,marginBottom:4 }}>
        {quickQuestions.map(q=>(
          <button key={q} onClick={()=>{setInput(q);}} style={{
            background:C.card,border:`1px solid ${C.border}`,borderRadius:20,
            padding:"6px 12px",fontSize:10,color:C.textMid,cursor:"pointer",whiteSpace:"nowrap",fontFamily:C.body,
          }}>{q}</button>
        ))}
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{ flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:12,paddingRight:4,marginBottom:14 }}>
        {messages.map((m,i)=>(
          <div key={i} style={{ display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start" }}>
            {m.role==="assistant" && <div style={{ fontSize:20,marginRight:8,marginTop:4 }}>🤖</div>}
            <div style={{
              maxWidth:"82%",
              background:m.role==="user"?`linear-gradient(135deg,${C.gold},${C.goldDark})`:C.card,
              color:m.role==="user"?"#1a0f00":C.text,
              borderRadius:m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",
              padding:"12px 16px",fontSize:12,lineHeight:1.6,fontFamily:C.body,
              border:m.role==="assistant"?`1px solid ${C.border}`:"none",
            }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
            <div style={{ fontSize:20 }}>🤖</div>
            <div style={{ background:C.card,border:`1px solid ${C.border}`,borderRadius:"18px 18px 18px 4px",padding:"12px 16px" }}>
              <div style={{ display:"flex",gap:4 }}>
                {[0,1,2].map(i=>(
                  <div key={i} style={{ width:6,height:6,borderRadius:"50%",background:C.purple,animation:`bounce 0.8s ${i*0.15}s infinite` }} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ display:"flex",gap:10,paddingTop:10,borderTop:`1px solid ${C.border}` }}>
        <Input
          placeholder="Tanungin si TindaBot..."
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&send()}
          style={{ flex:1 }}
        />
        <Btn onClick={send} style={{ padding:"11px 18px" }}>
          {loading?"⏳":"📤"}
        </Btn>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TAB: SETTINGS
// ═══════════════════════════════════════════════════════════
function SettingsTab() {
  const [storeName, setStoreName] = useState("Tindahan Ko");
  const [owner, setOwner] = useState("Mang Rodel");
  const [address, setAddress] = useState("Imus, Cavite");
  const [phone, setPhone] = useState("09xx-xxx-xxxx");
  const [pin, setPin] = useState("");
  const [notifications, setNotifications] = useState({ lowStock:true, expiry:true, utang:true, daily:true });
  const [currency, setCurrency] = useState("PHP");
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(()=>setSaved(false),2000); };

  return (
    <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
      {/* Profile */}
      <Card>
        <div style={{ textAlign:"center",marginBottom:20 }}>
          <div style={{ width:72,height:72,borderRadius:"50%",background:`linear-gradient(135deg,${C.gold},${C.goldDark})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 12px" }}>🏪</div>
          <div style={{ fontSize:16,fontWeight:800,color:C.text,fontFamily:C.font }}>{storeName}</div>
          <div style={{ fontSize:11,color:C.textDim }}>{address}</div>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
          {[["Pangalan ng Tindahan",storeName,setStoreName],["Pangalan ng May-ari",owner,setOwner],["Address",address,setAddress],["Phone",phone,setPhone]].map(([label,val,set])=>(
            <div key={label}>
              <div style={{ fontSize:10,color:C.textDim,marginBottom:4 }}>{label}</div>
              <Input value={val} onChange={e=>set(e.target.value)} />
            </div>
          ))}
        </div>
      </Card>

      {/* Notifications */}
      <Card>
        <div style={{ fontSize:13,fontWeight:700,color:C.text,marginBottom:16 }}>🔔 Mga Notification</div>
        {[["lowStock","⚠️ Low Stock Alert"],["expiry","📅 Expiry Date Alert"],["utang","📋 Utang Reminder"],["daily","📊 Daily Sales Report"]].map(([key,label])=>(
          <div key={key} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:`1px solid ${C.border}` }}>
            <div style={{ fontSize:12,color:C.text }}>{label}</div>
            <div onClick={()=>setNotifications(n=>({...n,[key]:!n[key]}))} style={{
              width:44,height:24,borderRadius:99,cursor:"pointer",transition:"all 0.3s",
              background:notifications[key]?C.gold:C.border,position:"relative",
            }}>
              <div style={{ position:"absolute",top:2,left:notifications[key]?22:2,width:20,height:20,borderRadius:"50%",background:"#fff",transition:"left 0.3s" }} />
            </div>
          </div>
        ))}
      </Card>

      {/* Security */}
      <Card>
        <div style={{ fontSize:13,fontWeight:700,color:C.text,marginBottom:14 }}>🔒 Seguridad</div>
        <Input placeholder="I-set ang PIN (4 digits)" value={pin} onChange={e=>setPin(e.target.value.slice(0,4))} type="password" />
        <div style={{ fontSize:10,color:C.textDim,marginTop:8 }}>Ang PIN ay gagamitin para buksan ang sensitibong data</div>
      </Card>

      {/* About */}
      <Card>
        <div style={{ fontSize:13,fontWeight:700,color:C.text,marginBottom:14 }}>ℹ️ Tungkol sa App</div>
        <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
          {[["Version","2.0.0 Pro"],["Built for","Filipino Sari-Sari Store Owners"],["AI Model","Claude Sonnet (Anthropic)"],["Developer","Mang Rodel + Claude 😄"]].map(([k,v])=>(
            <div key={k} style={{ display:"flex",justifyContent:"space-between",fontSize:12 }}>
              <span style={{ color:C.textDim }}>{k}</span>
              <span style={{ color:C.text,fontWeight:600 }}>{v}</span>
            </div>
          ))}
        </div>
      </Card>

      <Btn onClick={save} style={{ width:"100%" }}>
        {saved?"✅ Na-save na!":"💾 I-save ang mga Setting"}
      </Btn>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════
export default function TindahanKoPro() {
  const [tab, setTab] = useState("home");
  const [products, setProducts] = useState(PRODUCTS);
  const [utang, setUtang] = useState(UTANG_DATA);
  const [sales, setSales] = useState(SALES_DATA);
  const [toast, setToast] = useState(null);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(()=>{
    setTimeout(()=>setSplashDone(true), 1800);
  },[]);

  const showToast = (msg, color=C.gold) => {
    setToast({msg,color});
    setTimeout(()=>setToast(null),3000);
  };

  const lowStockCount = products.filter(isLowStock).length;
  const utangCount = utang.filter(u=>getBalance(u)>0).length;

  if(!splashDone) return (
    <div style={{ background:C.bg,minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:C.font }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');`}</style>
      <div style={{ fontSize:72,marginBottom:16,animation:"spin 1s linear" }}>🏪</div>
      <div style={{ fontSize:32,fontWeight:800,color:C.gold,fontFamily:C.font }}>Tindahan Ko</div>
      <div style={{ fontSize:12,color:C.textDim,marginTop:8 }}>PRO Edition</div>
      <div style={{ marginTop:32,display:"flex",gap:6 }}>
        {[0,1,2].map(i=><div key={i} style={{ width:8,height:8,borderRadius:"50%",background:C.gold,opacity:0.4,animation:`bounce 0.8s ${i*0.2}s infinite` }} />)}
      </div>
    </div>
  );

  return (
    <div style={{ background:C.bg, minHeight:"100vh", maxWidth:430, margin:"0 auto", fontFamily:C.body, position:"relative", paddingBottom:100 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:0; height:0; }
        @keyframes ping { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.4)} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes slideDown { from{transform:translateY(-50px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes fadeUp { from{transform:translateY(16px);opacity:0} to{transform:translateY(0);opacity:1} }
        input::placeholder{color:#445566}
        input:focus{border-color:#f5a623!important}
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{
          position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",
          background:toast.color,color:"#1a0f00",borderRadius:14,
          padding:"12px 24px",fontSize:12,fontWeight:700,zIndex:200,
          animation:"slideDown 0.3s ease",whiteSpace:"nowrap",
          boxShadow:`0 8px 30px ${toast.color}55`,
        }}>{toast.msg}</div>
      )}

      {/* Header */}
      <div style={{
        background:`${C.surface}ee`, backdropFilter:"blur(20px)",
        borderBottom:`1px solid ${C.border}`,
        padding:"16px 20px 14px",
        position:"sticky",top:0,zIndex:100,
      }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <div>
            <div style={{ fontSize:10,color:C.textDim }}>🏪 Imus, Cavite • {new Date().toLocaleDateString("en-PH",{month:"short",day:"numeric"})}</div>
            <div style={{ fontSize:22,fontWeight:800,fontFamily:C.font }}>
              <span style={{ color:C.text }}>Tindahan </span>
              <span style={{ color:C.gold }}>Ko</span>
              <span style={{ fontSize:10,color:C.textDim,fontFamily:C.body,fontWeight:400,marginLeft:6 }}>PRO</span>
            </div>
          </div>
          <div style={{ display:"flex",gap:8,alignItems:"center" }}>
            {lowStockCount>0 && (
              <div style={{ background:C.redGlow,border:`1px solid ${C.red}44`,borderRadius:10,padding:"6px 10px",display:"flex",gap:4,alignItems:"center" }}>
                <span style={{ fontSize:9,color:C.red,fontWeight:700 }}>⚠️ {lowStockCount}</span>
              </div>
            )}
            <div style={{ background:C.card,borderRadius:10,padding:"8px 10px",fontSize:16 }}>🔔</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding:"18px 16px 0", animation:"fadeUp 0.3s ease" }}>
        {tab==="home"      && <HomeTab products={products} utang={utang} sales={sales} setSales={setSales} />}
        {tab==="pos"       && <POSTab products={products} setProducts={setProducts} sales={sales} setSales={setSales} />}
        {tab==="inventory" && <InventoryTab products={products} setProducts={setProducts} />}
        {tab==="utang"     && <UtangTab utang={utang} setUtang={setUtang} />}
        {tab==="sales"     && <SalesTab sales={sales} products={products} />}
        {tab==="services"  && <ServicesTab />}
        {tab==="ai"        && <AITab products={products} utang={utang} sales={sales} />}
        {tab==="settings"  && <SettingsTab />}
      </div>

      {/* Bottom Nav */}
      <div style={{
        position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",
        width:"100%",maxWidth:430,
        background:`${C.surface}f5`,backdropFilter:"blur(24px)",
        borderTop:`1px solid ${C.border}`,
        display:"flex",padding:"8px 4px 16px",
        zIndex:100,
      }}>
        {TABS.map(t=>{
          const active = tab===t.id;
          let badge = t.id==="inventory"?lowStockCount:t.id==="utang"?utangCount:0;
          return (
            <button key={t.id} onClick={()=>setTab(t.id)} style={{
              flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,
              background:"none",border:"none",cursor:"pointer",padding:"6px 2px",
              position:"relative",
            }}>
              {badge>0 && (
                <div style={{ position:"absolute",top:0,right:4,background:C.red,borderRadius:"50%",width:14,height:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:800,color:"#fff" }}>{badge}</div>
              )}
              <div style={{ fontSize:active?20:18,filter:active?"none":"grayscale(0.6) opacity(0.5)",transition:"all 0.2s" }}>{t.icon}</div>
              <div style={{ fontSize:8,fontWeight:active?800:500,color:active?C.gold:C.textDim,transition:"all 0.2s",lineHeight:1 }}>{t.label}</div>
              {active && <div style={{ width:16,height:2,borderRadius:99,background:C.gold,marginTop:1 }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
