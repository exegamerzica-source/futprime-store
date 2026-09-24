"use client";

import { useEffect, useState, useRef } from "react";
import { TrendingUp, Users, DollarSign, Activity, BellRing, Settings, ShieldAlert, LogOut, CheckCircle2, Search, ArrowUpRight, Copy, Save } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { supabase } from "@/lib/supabase";

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
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Settings State
  const [pixKey, setPixKey] = useState("");
  const [pixName, setPixName] = useState("");
  const [pixCity, setPixCity] = useState("");
  const [savingConfig, setSavingConfig] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const previousOrdersCount = useRef<number>(0);

  useEffect(() => {
    audioRef.current = new Audio("https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=cash-register-kaching-93513.mp3");
  }, []);

  useEffect(() => {
    if (!isLogged) return;
    
    // Load local orders
    const rawOrders = localStorage.getItem("futprime_orders");
    if (rawOrders) {
      const parsed = JSON.parse(rawOrders);
      setOrders(parsed.reverse());
      previousOrdersCount.current = parsed.length;
    }

    // Load Settings from Supabase
    const loadSettings = async () => {
      const { data } = await supabase.from('store_settings').select('*').eq('id', 'default').single();
      if (data) {
        setPixKey(data.pix_key || "");
        setPixName(data.pix_name || "");
        setPixCity(data.pix_city || "");
      }
    };
    loadSettings();

    const interval = setInterval(() => {
      const currentRaw = localStorage.getItem("futprime_orders");
      if (currentRaw) {
        const parsed = JSON.parse(currentRaw);
        if (parsed.length > previousOrdersCount.current) {
          audioRef.current?.play().catch(() => {});
          setOrders(parsed.reverse());
          previousOrdersCount.current = parsed.length;
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isLogged]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsLogged(true);
    } else {
      alert("Senha incorreta");
    }
  };

  const handleSaveSettings = async () => {
    setSavingConfig(true);
    const { error } = await supabase
      .from('store_settings')
      .upsert({ id: 'default', pix_key: pixKey, pix_name: pixName, pix_city: pixCity });
    
    setSavingConfig(false);
    if (error) {
      alert("Erro ao salvar: " + error.message);
    } else {
      alert("Configurações salvas com sucesso! O site já está usando sua chave PIX real.");
    }
  };

  if (!isLogged) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 w-full max-w-sm">
          <div className="flex items-center justify-center gap-2 mb-8">
            <ShieldAlert className="text-ea-green w-8 h-8" />
            <h1 className="text-2xl font-black italic text-white uppercase">Acesso Restrito</h1>
          </div>
          <input
            type="password"
            placeholder="Senha Mestra"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-zinc-700 text-white p-4 rounded-xl mb-4 text-center tracking-[0.5em] font-mono"
          />
          <button type="submit" className="w-full bg-ea-green text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-colors">
            Entrar no Painel
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-300 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 border-r border-zinc-900 flex flex-col">
        <div className="p-6 border-b border-zinc-900">
          <h2 className="text-xl font-black text-white italic">FUT<span className="text-ea-green">PRIME</span></h2>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Admin Pro</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-ea-green/10 text-ea-green' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
          >
            <Activity className="w-5 h-5" /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-ea-green/10 text-ea-green' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
          >
            <Settings className="w-5 h-5" /> Configurações
          </button>
        </nav>
        <div className="p-4 border-t border-zinc-900">
          <button onClick={() => setIsLogged(false)} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" /> Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">
            {activeTab === 'dashboard' ? 'Visão Geral' : 'Configurações da Loja'}
          </h1>
          <div className="flex items-center gap-4 bg-zinc-900 px-4 py-2 rounded-full border border-zinc-800">
            <span className="w-2 h-2 rounded-full bg-ea-green animate-pulse" />
            <span className="text-xs font-bold text-ea-green uppercase tracking-widest">Sistema Online</span>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 flex items-center gap-4">
                <div className="p-4 bg-ea-green/10 rounded-xl text-ea-green"><DollarSign className="w-8 h-8" /></div>
                <div>
                  <p className="text-sm text-zinc-500 font-bold uppercase">Faturamento (Hoje)</p>
                  <p className="text-3xl font-black text-white">R$ 14.590,00</p>
                </div>
              </div>
              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 flex items-center gap-4">
                <div className="p-4 bg-blue-500/10 rounded-xl text-blue-500"><TrendingUp className="w-8 h-8" /></div>
                <div>
                  <p className="text-sm text-zinc-500 font-bold uppercase">Pedidos Aprovados</p>
                  <p className="text-3xl font-black text-white">124</p>
                </div>
              </div>
              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 flex items-center gap-4">
                <div className="p-4 bg-purple-500/10 rounded-xl text-purple-500"><Users className="w-8 h-8" /></div>
                <div>
                  <p className="text-sm text-zinc-500 font-bold uppercase">Taxa de Conversão</p>
                  <p className="text-3xl font-black text-white">4.8%</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                <h3 className="text-lg font-bold text-white mb-6 uppercase">Receita em Tempo Real</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1AF45A" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#1AF45A" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                      <XAxis dataKey="time" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `R$${val/1000}k`} />
                      <RechartsTooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }} />
                      <Area type="monotone" dataKey="amount" stroke="#1AF45A" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 overflow-hidden flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-white uppercase flex items-center gap-2">
                    <BellRing className="w-5 h-5 text-ea-green" /> Feed Ao Vivo
                  </h3>
                </div>
                <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                  {orders.length === 0 ? (
                    <div className="text-center text-zinc-500 py-10 text-sm">Nenhum pedido local ainda.<br/>Faça um teste no checkout!</div>
                  ) : (
                    orders.map(order => (
                      <div key={order.id} className="p-4 bg-black rounded-xl border border-zinc-800 relative group cursor-pointer hover:border-zinc-600 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-mono text-zinc-500">{order.id}</span>
                          <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-md ${order.status === 'Aprovado' ? 'bg-ea-green/20 text-ea-green' : 'bg-yellow-500/20 text-yellow-500'}`}>
                            {order.method}
                          </span>
                        </div>
                        <p className="font-bold text-white text-sm">{order.customer.nome}</p>
                        <p className="text-ea-green font-black">{order.item}</p>
                        <p className="text-zinc-500 text-xs mt-2 truncate">{order.customer.email}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
            <h2 className="text-xl font-bold text-white mb-6 uppercase border-b border-zinc-800 pb-4">Configuração do Recebimento (PIX)</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Sua Chave PIX</label>
                <input 
                  type="text" 
                  value={pixKey}
                  onChange={e => setPixKey(e.target.value)}
                  placeholder="Ex: seuemail@gmail.com ou 11999999999"
                  className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-white focus:border-ea-green focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Nome do Titular da Conta</label>
                <input 
                  type="text" 
                  value={pixName}
                  onChange={e => setPixName(e.target.value)}
                  placeholder="Ex: João da Silva"
                  className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-white focus:border-ea-green focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Cidade</label>
                <input 
                  type="text" 
                  value={pixCity}
                  onChange={e => setPixCity(e.target.value)}
                  placeholder="Ex: Sao Paulo"
                  className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-white focus:border-ea-green focus:outline-none transition-colors"
                />
                <p className="text-zinc-500 text-xs mt-2">A cidade deve ser escrita sem acentos (Ex: Sao Paulo). Necessário para gerar o código Copia e Cola corretamente.</p>
              </div>
              
              <button 
                onClick={handleSaveSettings}
                disabled={savingConfig}
                className="w-full bg-ea-green text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {savingConfig ? 'Salvando...' : 'Salvar Configurações'}
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
