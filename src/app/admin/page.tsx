"use client";

import { useEffect, useState, useRef } from "react";
import { TrendingUp, Users, DollarSign, Activity, BellRing, Settings, ShieldAlert, LogOut, CheckCircle2, Search, ArrowUpRight, Copy } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

type Order = {
  id: string;
  item: string;
  price: string;
  platform: string;
  method: string;
  customer: { nome: string; email: string; cpf: string; whatsapp: string };
  status: string;
  date: string;
};

// Fake data for graphs to make it Instagrammable
const salesData = [
  { time: "08:00", amount: 1200 },
  { time: "10:00", amount: 2100 },
  { time: "12:00", amount: 1800 },
  { time: "14:00", amount: 3400 },
  { time: "16:00", amount: 2900 },
  { time: "18:00", amount: 5200 },
  { time: "20:00", amount: 8400 },
];

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const previousOrdersCount = useRef<number>(0);

  useEffect(() => {
    // Create audio instance
    audioRef.current = new Audio("https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=cash-register-kaching-93513.mp3");
  }, []);

  useEffect(() => {
    if (!isLogged) return;

    const loadOrders = () => {
      const data = JSON.parse(localStorage.getItem("futprime_orders") || "[]");
      setOrders(data);

      if (data.length > previousOrdersCount.current && previousOrdersCount.current > 0) {
        audioRef.current?.play().catch(e => console.log("Audio autoplay blocked"));
      }
      previousOrdersCount.current = data.length;
    };

    loadOrders();
    const interval = setInterval(loadOrders, 3000);
    return () => clearInterval(interval);
  }, [isLogged]);

  if (!isLogged) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl w-full max-w-sm space-y-6">
          <div className="text-3xl font-black italic tracking-tighter uppercase text-center mb-8">
            FUT<span className="text-ea-green">PRIME</span>
          </div>
          <input 
            type="password" 
            placeholder="Senha Mestra" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-center text-white tracking-widest outline-none focus:border-ea-green"
          />
          <button 
            onClick={() => password === "admin" ? setIsLogged(true) : alert("Acesso Negado")}
            className="w-full bg-ea-green hover:bg-white text-black font-black uppercase tracking-widest py-4 rounded-xl transition-all"
          >
            Acessar Operação
          </button>
        </div>
      </div>
    );
  }

  const totalRevenue = orders.reduce((acc, order) => acc + parseFloat(order.price), 0) + 12450.00; // Added fake base for flex
  const pendingOrders = orders.filter(o => o.status === "Pendente").length;
  
  const approveOrder = (id: string) => {
    const updated = orders.map(o => o.id === id ? { ...o, status: "Aprovado" } : o);
    setOrders(updated);
    localStorage.setItem("futprime_orders", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#07090b] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 border-r border-zinc-900 flex flex-col hidden md:flex">
        <div className="h-20 flex items-center px-6 border-b border-zinc-900">
          <div className="text-2xl font-black italic tracking-tighter uppercase text-white drop-shadow-[0_0_10px_rgba(26,244,90,0.2)]">
            FUT<span className="text-ea-green">PRIME</span>
          </div>
        </div>
        <nav className="flex-1 py-8 px-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-ea-green/10 text-ea-green font-bold rounded-xl"><Activity className="w-5 h-5" /> Live Ops</a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors"><DollarSign className="w-5 h-5" /> Faturamento</a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors"><Users className="w-5 h-5" /> Clientes</a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors"><Settings className="w-5 h-5" /> Ajustes</a>
        </nav>
        <div className="p-4 border-t border-zinc-900">
          <button onClick={() => setIsLogged(false)} className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 rounded-xl transition-colors font-bold">
            <LogOut className="w-5 h-5" /> Encerrar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 bg-zinc-950/50 backdrop-blur-md border-b border-zinc-900 flex items-center justify-between px-8 sticky top-0 z-40">
          <h1 className="text-xl font-black uppercase tracking-widest text-zinc-100">Painel de Controle</h1>
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer">
              <BellRing className="w-6 h-6 text-zinc-400 hover:text-white transition-colors" />
              {pendingOrders > 0 && <span className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full animate-ping"></span>}
              {pendingOrders > 0 && <span className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full border-2 border-zinc-950"></span>}
            </div>
            <div className="h-10 w-10 bg-ea-green rounded-full flex items-center justify-center font-black text-black">
              AD
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          
          {/* Top Metrics (Instagrammable) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-6 rounded-3xl shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 text-ea-green/5 group-hover:text-ea-green/10 transition-colors">
                <TrendingUp className="w-48 h-48" />
              </div>
              <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-2 relative z-10">Faturamento Hoje</p>
              <h2 className="text-5xl font-black italic tracking-tighter text-white relative z-10 flex items-center gap-2">
                R$ {totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </h2>
              <div className="mt-4 flex items-center gap-2 text-ea-green text-sm font-bold bg-ea-green/10 w-fit px-3 py-1 rounded-full relative z-10">
                <ArrowUpRight className="w-4 h-4" /> +14.2% desde ontem
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-6 rounded-3xl shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 text-blue-500/5 group-hover:text-blue-500/10 transition-colors">
                <Activity className="w-48 h-48" />
              </div>
              <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-2 relative z-10">Pedidos Ativos</p>
              <h2 className="text-5xl font-black italic tracking-tighter text-white relative z-10">
                {orders.length + 84}
              </h2>
              <div className="mt-4 flex items-center gap-2 text-blue-400 text-sm font-bold bg-blue-500/10 w-fit px-3 py-1 rounded-full relative z-10">
                <Activity className="w-4 h-4" /> Alto volume detectado
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-6 rounded-3xl shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 text-orange-500/5 group-hover:text-orange-500/10 transition-colors">
                <ShieldAlert className="w-48 h-48" />
              </div>
              <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-2 relative z-10">Aguardando Envio</p>
              <h2 className="text-5xl font-black italic tracking-tighter text-orange-500 relative z-10">
                {pendingOrders}
              </h2>
              <div className="mt-4 flex items-center gap-2 text-orange-400 text-sm font-bold bg-orange-500/10 w-fit px-3 py-1 rounded-full relative z-10">
                Prioridade Máxima
              </div>
            </div>
          </div>

          {/* Fake Graph for Instagram Stories */}
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black uppercase tracking-widest">Desempenho em Tempo Real</h3>
              <div className="flex gap-2">
                <button className="px-4 py-1 text-xs font-bold uppercase tracking-wider bg-ea-green text-black rounded-lg">Hoje</button>
                <button className="px-4 py-1 text-xs font-bold uppercase tracking-wider bg-zinc-800 text-zinc-400 rounded-lg">7D</button>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1af45a" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#1af45a" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#52525b" tick={{fill: '#a1a1aa', fontSize: 12}} />
                  <YAxis stroke="#52525b" tick={{fill: '#a1a1aa', fontSize: 12}} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px' }}
                    itemStyle={{ color: '#1af45a', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#1af45a" strokeWidth={4} fillOpacity={1} fill="url(#colorAmount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/50">
              <h3 className="text-lg font-black uppercase tracking-widest">Fila de Execução</h3>
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input type="text" placeholder="Buscar ID ou Cliente..." className="bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:border-ea-green outline-none" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-900/50 text-zinc-400 text-xs uppercase tracking-widest">
                    <th className="p-4 font-bold border-b border-zinc-800">ID do Pedido</th>
                    <th className="p-4 font-bold border-b border-zinc-800">Cliente</th>
                    <th className="p-4 font-bold border-b border-zinc-800">Produto</th>
                    <th className="p-4 font-bold border-b border-zinc-800">Valor</th>
                    <th className="p-4 font-bold border-b border-zinc-800">Status</th>
                    <th className="p-4 font-bold border-b border-zinc-800">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-zinc-500 italic">Nenhum pedido recente.</td>
                    </tr>
                  ) : (
                    orders.slice().reverse().map((order) => (
                      <tr key={order.id} className="hover:bg-zinc-800/50 transition-colors">
                        <td className="p-4 font-mono text-sm text-zinc-300">{order.id}</td>
                        <td className="p-4">
                          <p className="font-bold">{order.customer.nome}</p>
                          <p className="text-xs text-zinc-500">{order.customer.whatsapp}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-ea-green">{order.item}</p>
                          <p className="text-xs text-zinc-400">{order.platform}</p>
                        </td>
                        <td className="p-4 font-bold">R$ {order.price}</td>
                        <td className="p-4">
                          {order.status === "Pendente" ? (
                            <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Pendente</span>
                          ) : (
                            <span className="bg-ea-green/20 text-ea-green px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-fit"><CheckCircle2 className="w-3 h-3"/> Aprovado</span>
                          )}
                        </td>
                        <td className="p-4">
                          {order.status === "Pendente" && (
                            <button onClick={() => approveOrder(order.id)} className="bg-white hover:bg-ea-green hover:text-black text-black text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-wider transition-colors">
                              Liberar
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
