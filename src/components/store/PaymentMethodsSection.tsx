import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Smartphone, 
  Building2, 
  CheckCircle2, 
  QrCode, 
  ArrowRight,
  HelpCircle,
  Clock,
  Sparkles,
  FileCheck
} from 'lucide-react';
import { PaymentMethod } from '../../types';

interface PaymentMethodsSectionProps {
  onSelectPaymentMethod?: (method: PaymentMethod) => void;
  onOpenCheckout?: () => void;
}

export const PaymentMethodsSection: React.FC<PaymentMethodsSectionProps> = ({ 
  onSelectPaymentMethod,
  onOpenCheckout 
}) => {
  const [activeTab, setActiveTab] = useState<'yape' | 'plin' | 'cards' | 'transfer'>('yape');
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(label);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const handlePayWith = (method: PaymentMethod) => {
    if (onSelectPaymentMethod) onSelectPaymentMethod(method);
    if (onOpenCheckout) onOpenCheckout();
  };

  return (
    <section id="metodos-pago" className="py-16 bg-slate-950 border-t border-slate-800 relative z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold mb-3">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>PASARELAS OFICIALES & SEGURIDAD BANCARIA EN PERÚ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight mb-3">
            Métodos de Pago Seguros y Confiables
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Paga en soles (S/.) o dólares ($ USD) con las plataformas oficiales más utilizadas en Perú. Disfruta de acreditación inmediata, 0% de comisiones extras y protección total de tus datos personales.
          </p>

          {/* Quick Bank & Wallet Badges Strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 pt-4 border-t border-slate-800/80">
            <span className="text-xs font-mono text-slate-400">Canales oficiales admitidos:</span>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="px-2.5 py-1 rounded-lg bg-[#742384]/20 border border-[#742384]/50 text-[#d87df2] font-bold text-xs">
                💜 Yape
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#00b0ca]/20 border border-[#00b0ca]/50 text-[#38d7f0] font-bold text-xs">
                💙 Plin
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-blue-950/60 border border-blue-600/40 text-blue-300 font-bold text-xs">
                💳 Visa
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-red-950/60 border border-red-600/40 text-red-300 font-bold text-xs">
                💳 Mastercard
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-orange-950/60 border border-orange-500/40 text-orange-300 font-bold text-xs">
                🏦 BCP
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-sky-950/60 border border-sky-500/40 text-sky-300 font-bold text-xs">
                🏦 BBVA
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold text-xs">
                🏦 Interbank
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 font-bold text-xs">
                🏦 Scotiabank
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation for Payment Methods */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('yape')}
            className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'yape'
                ? 'bg-[#742384] text-white shadow-lg shadow-[#742384]/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Yape (Móvil)</span>
          </button>

          <button
            onClick={() => setActiveTab('plin')}
            className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'plin'
                ? 'bg-[#00b0ca] text-slate-950 font-bold shadow-lg shadow-[#00b0ca]/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Plin (Interbancario)</span>
          </button>

          <button
            onClick={() => setActiveTab('cards')}
            className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'cards'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Tarjetas de Crédito / Débito</span>
          </button>

          <button
            onClick={() => setActiveTab('transfer')}
            className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'transfer'
                ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Transferencias & Cuentas</span>
          </button>
        </div>

        {/* Dynamic Payment Method Content Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* TAB 1: YAPE */}
          {activeTab === 'yape' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#742384] text-white flex items-center justify-center font-bold text-xl shadow-lg">
                    Y
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold text-[#d87df2] uppercase tracking-wider block">
                      Billetera Móvil BCP Perú
                    </span>
                    <h3 className="text-2xl font-display font-bold text-white">
                      Pago Instantáneo con Yape
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Paga al instante escaneando el código QR oficial de <strong>VORTEKSA</strong> o ingresando nuestro número de teléfono corporativo <strong>931978990</strong>. Sin comisiones, con acreditación al segundo y respaldo de BCP.
                </p>

                {/* Step by Step list */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Pasos sencillos para pagar con Yape:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                      <span className="w-5 h-5 rounded-full bg-[#742384] text-white font-bold text-[10px] flex items-center justify-center font-mono">1</span>
                      <strong className="text-white block pt-1">Abre tu app Yape</strong>
                      <span className="text-slate-400">Pulsa la opción «Escanear QR» o «Yapear a número».</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                      <span className="w-5 h-5 rounded-full bg-[#742384] text-white font-bold text-[10px] flex items-center justify-center font-mono">2</span>
                      <strong className="text-white block pt-1">Escanea o ingresa</strong>
                      <span className="text-slate-400">Yapea al número <strong>931978990</strong> a nombre de <strong>VORTEKSA AUTOREPUESTOS</strong>.</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                      <span className="w-5 h-5 rounded-full bg-[#742384] text-white font-bold text-[10px] flex items-center justify-center font-mono">3</span>
                      <strong className="text-white block pt-1">Confirmación</strong>
                      <span className="text-slate-400">Ingresa tu código de operación en el checkout y tu pedido se despacha.</span>
                    </div>
                  </div>
                </div>

                {/* Key metadata badges */}
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Acreditación: Instantánea (0 min)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>Comisión: 0% Gratuito</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                    <span>Límite: Hasta S/. 2,000 diarios</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handlePayWith('yape')}
                    className="px-6 py-3 bg-[#742384] hover:bg-[#862999] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-[#742384]/20 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Proceder a Comprar con Yape</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* QR and Merchant Card Box */}
              <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
                <div className="inline-block p-4 bg-white rounded-2xl shadow-xl">
                  {/* Clean SVG QR Mock for Yape */}
                  <svg className="w-44 h-44 mx-auto" viewBox="0 0 100 100" fill="none">
                    <rect width="100" height="100" fill="white" />
                    {/* Corner boxes */}
                    <rect x="10" y="10" width="24" height="24" fill="#742384" rx="2" />
                    <rect x="14" y="14" width="16" height="16" fill="white" rx="1" />
                    <rect x="18" y="18" width="8" height="8" fill="#742384" />
                    
                    <rect x="66" y="10" width="24" height="24" fill="#742384" rx="2" />
                    <rect x="70" y="14" width="16" height="16" fill="white" rx="1" />
                    <rect x="74" y="18" width="8" height="8" fill="#742384" />

                    <rect x="10" y="66" width="24" height="24" fill="#742384" rx="2" />
                    <rect x="14" y="70" width="16" height="16" fill="white" rx="1" />
                    <rect x="18" y="74" width="8" height="8" fill="#742384" />

                    {/* QR Pixel Matrix Dots */}
                    <circle cx="42" cy="18" r="2.5" fill="#742384" />
                    <circle cx="50" cy="24" r="2.5" fill="#742384" />
                    <circle cx="45" cy="35" r="2.5" fill="#742384" />
                    <circle cx="55" cy="45" r="3" fill="#742384" />
                    <circle cx="35" cy="50" r="2.5" fill="#742384" />
                    <circle cx="65" cy="55" r="2.5" fill="#742384" />
                    <circle cx="45" cy="65" r="3" fill="#742384" />
                    <circle cx="55" cy="75" r="2.5" fill="#742384" />
                    <circle cx="75" cy="65" r="2.5" fill="#742384" />
                    <circle cx="85" cy="45" r="2.5" fill="#742384" />
                    <circle cx="80" cy="80" r="3" fill="#742384" />

                    {/* Center Brand Badge */}
                    <circle cx="50" cy="50" r="10" fill="#742384" />
                    <text x="50" y="54" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Y</text>
                  </svg>
                </div>

                <div className="space-y-1">
                  <div className="text-white font-bold text-sm">VORTEKSA AUTOREPUESTOS</div>
                  <div className="text-xs text-slate-400">Titular verificado BCP: Ursula Fernandez</div>
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <span className="font-mono text-base font-bold text-amber-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                      931978990
                    </span>
                    <button
                      onClick={() => handleCopy('931978990', 'yape-num')}
                      className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-lg transition-colors border border-slate-700"
                    >
                      {copiedAccount === 'yape-num' ? '¡Copiado!' : 'Copiar'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PLIN */}
          {activeTab === 'plin' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#00b0ca] text-slate-950 flex items-center justify-center font-bold text-xl shadow-lg">
                    P
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold text-[#00b0ca] uppercase tracking-wider block">
                      Transferencia Interbancaria Inmediata
                    </span>
                    <h3 className="text-2xl font-display font-bold text-white">
                      Pago Inmediato con Plin
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Paga directamente desde la aplicación de tu banco favorito: <strong>BBVA, Interbank, Scotiabank o BanBif</strong>. Transfiere al número <strong>931978990</strong> sin pagar comisiones interbancarias y con confirmación en segundos.
                </p>

                {/* Steps */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Pasos para plinear tu pedido:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                      <span className="w-5 h-5 rounded-full bg-[#00b0ca] text-slate-950 font-bold text-[10px] flex items-center justify-center font-mono">1</span>
                      <strong className="text-white block pt-1">Ingresa a tu banco</strong>
                      <span className="text-slate-400">Abre tu app (BBVA, Interbank, Scotiabank o BanBif).</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                      <span className="w-5 h-5 rounded-full bg-[#00b0ca] text-slate-950 font-bold text-[10px] flex items-center justify-center font-mono">2</span>
                      <strong className="text-white block pt-1">Selecciona Plin</strong>
                      <span className="text-slate-400">Plinea al número <strong>931978990</strong> por el monto total.</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                      <span className="w-5 h-5 rounded-full bg-[#00b0ca] text-slate-950 font-bold text-[10px] flex items-center justify-center font-mono">3</span>
                      <strong className="text-white block pt-1">Constancia</strong>
                      <span className="text-slate-400">Adjunta el número de referencia en el checkout y listo.</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Acreditación: Instantánea (24/7)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>Sin comisión interbancaria</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handlePayWith('plin')}
                    className="px-6 py-3 bg-[#00b0ca] hover:bg-[#12c4de] text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-[#00b0ca]/20 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Proceder a Comprar con Plin</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Plin Card */}
              <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
                <div className="inline-block p-4 bg-white rounded-2xl shadow-xl">
                  {/* Clean SVG QR Mock for Plin */}
                  <svg className="w-44 h-44 mx-auto" viewBox="0 0 100 100" fill="none">
                    <rect width="100" height="100" fill="white" />
                    {/* Corner boxes */}
                    <rect x="10" y="10" width="24" height="24" fill="#00b0ca" rx="2" />
                    <rect x="14" y="14" width="16" height="16" fill="white" rx="1" />
                    <rect x="18" y="18" width="8" height="8" fill="#00b0ca" />
                    
                    <rect x="66" y="10" width="24" height="24" fill="#00b0ca" rx="2" />
                    <rect x="70" y="14" width="16" height="16" fill="white" rx="1" />
                    <rect x="74" y="18" width="8" height="8" fill="#00b0ca" />

                    <rect x="10" y="66" width="24" height="24" fill="#00b0ca" rx="2" />
                    <rect x="14" y="70" width="16" height="16" fill="white" rx="1" />
                    <rect x="18" y="74" width="8" height="8" fill="#00b0ca" />

                    <circle cx="48" cy="18" r="2.5" fill="#00b0ca" />
                    <circle cx="55" cy="28" r="2.5" fill="#00b0ca" />
                    <circle cx="45" cy="38" r="3" fill="#00b0ca" />
                    <circle cx="58" cy="48" r="2.5" fill="#00b0ca" />
                    <circle cx="38" cy="55" r="2.5" fill="#00b0ca" />
                    <circle cx="78" cy="50" r="3" fill="#00b0ca" />
                    <circle cx="75" cy="75" r="2.5" fill="#00b0ca" />

                    {/* Center Brand Badge */}
                    <circle cx="50" cy="50" r="10" fill="#00b0ca" />
                    <text x="50" y="54" fill="#091b2c" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">P</text>
                  </svg>
                </div>

                <div className="space-y-1">
                  <div className="text-white font-bold text-sm">Plin Comercial VORTEKSA</div>
                  <div className="text-xs text-slate-400">Bancos asociados: BBVA · Interbank · Scotiabank · BanBif</div>
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <span className="font-mono text-base font-bold text-cyan-300 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                      931978990
                    </span>
                    <button
                      onClick={() => handleCopy('931978990', 'plin-num')}
                      className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-lg transition-colors border border-slate-700"
                    >
                      {copiedAccount === 'plin-num' ? '¡Copiado!' : 'Copiar'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CARDS */}
          {activeTab === 'cards' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xl shadow-lg">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider block">
                      Pasarela Oficial Niubiz / Izipay / Culqi
                    </span>
                    <h3 className="text-2xl font-display font-bold text-white">
                      Tarjetas de Crédito y Débito
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Aceptamos todas las tarjetas emitidas por bancos peruanos e internacionales: <strong>Visa, Mastercard, American Express y Diners Club</strong>. Tus datos viajan encriptados de extremo a extremo mediante el protocolo PCI-DSS Nivel 1 con autenticación 3D Secure / OTP.
                </p>

                {/* Steps */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Cómo pagar de forma segura con tu tarjeta:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center font-mono">1</span>
                      <strong className="text-white block pt-1">Ingresa los datos</strong>
                      <span className="text-slate-400">16 dígitos, fecha de vencimiento y código de seguridad CVV.</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center font-mono">2</span>
                      <strong className="text-white block pt-1">Autenticación 3DS</strong>
                      <span className="text-slate-400">Valida la compra con la clave SMS / Token digital de tu banco.</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center font-mono">3</span>
                      <strong className="text-white block pt-1">Comprobante y Factura</strong>
                      <span className="text-slate-400">Recibe al instante tu boleta/factura electrónica SUNAT descargable.</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Cifrado SSL 256 bits</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Lock className="w-4 h-4 text-amber-500" />
                    <span>Tokenización Segura (No almacenamos tu CVV)</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handlePayWith('credit_card')}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Proceder al Pago con Tarjeta</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card visual mockup */}
              <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="p-5 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 border border-slate-700 shadow-xl space-y-4 text-white">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-amber-400">VORTEKSA TITANIUM</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold bg-blue-600 px-1.5 py-0.5 rounded text-white">VISA</span>
                      <span className="text-[10px] font-bold bg-red-600 px-1.5 py-0.5 rounded text-white">MC</span>
                    </div>
                  </div>

                  <div className="py-2">
                    <span className="text-[10px] text-slate-400 block font-mono">CHIP EMV / CONTACTLESS</span>
                    <div className="text-lg font-mono font-bold tracking-widest text-slate-100">
                      •••• •••• •••• 9201
                    </div>
                  </div>

                  <div className="flex justify-between items-end text-xs font-mono">
                    <div>
                      <span className="text-[9px] text-slate-400 block">TITULAR DE LA TARJETA</span>
                      <span className="text-white font-semibold">CLIENTE VERIFICADO</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block">VENCE</span>
                      <span className="text-white font-semibold">12/28</span>
                    </div>
                  </div>
                </div>

                <div className="text-center text-xs text-slate-400 space-y-1">
                  <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Conexión cifrada a la red de tarjetas de Perú</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Soporta pago en cuotas (según las condiciones de tu banco emisor).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TRANSFERENCIAS & BANCOS */}
          {activeTab === 'transfer' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-wider block">
                      Cuentas Corrientes & Interbancarias
                    </span>
                    <h3 className="text-2xl font-display font-bold text-white">
                      Transferencia Bancaria Directa
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Ideal para talleres mecánicos, empresas y pedidos corporativos de gran volumen. Puedes transferir desde la banca móvil o por ventanilla/agente a cualquiera de nuestras cuentas corrientes en soles o dólares.
                </p>

                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold shrink-0">1.</span>
                    <span>Realiza la transferencia desde la app o portal web de tu banco por el monto exacto de la orden.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold shrink-0">2.</span>
                    <span>Coloca tu <strong>Número de Orden</strong> (ej. VOR-98214) o tu nombre completo como concepto o referencia.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold shrink-0">3.</span>
                    <span>Envía la constancia por WhatsApp al <strong>+51 931 978 990</strong> o al correo <strong>contacto@vorteksa.com</strong> para despacho exprés.</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handlePayWith('bank_transfer')}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Proceder con Transferencia Bancaria</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Accounts details box */}
              <div className="lg:col-span-6 bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-mono text-slate-400 uppercase">Datos de Facturación:</span>
                  <span className="text-xs text-amber-400 font-bold font-mono">VORTEKSA PERU S.A.C.</span>
                </div>

                {/* BCP Account */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-orange-400 flex items-center gap-1.5">
                      <span>🏦 Banco de Crédito del Perú (BCP) - Soles</span>
                    </span>
                    <button
                      onClick={() => handleCopy('191-9482104-0-32', 'bcp-soles')}
                      className="text-[10px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700"
                    >
                      {copiedAccount === 'bcp-soles' ? '¡Copiado!' : 'Copiar'}
                    </button>
                  </div>
                  <div className="font-mono text-xs text-white">Cta. Corriente: 191-9482104-0-32</div>
                  <div className="font-mono text-[11px] text-slate-400">CCI: 002-191-009482104032-58</div>
                </div>

                {/* BBVA Account */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                      <span>🏦 BBVA Perú - Soles</span>
                    </span>
                    <button
                      onClick={() => handleCopy('0011-0182-0100084920', 'bbva-soles')}
                      className="text-[10px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700"
                    >
                      {copiedAccount === 'bbva-soles' ? '¡Copiado!' : 'Copiar'}
                    </button>
                  </div>
                  <div className="font-mono text-xs text-white">Cta: 0011-0182-0100084920</div>
                  <div className="font-mono text-[11px] text-slate-400">CCI: 011-182-000100084920-14</div>
                </div>

                {/* Interbank / USD Account */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <span>🏦 Interbank - Dólares ($ USD)</span>
                    </span>
                    <button
                      onClick={() => handleCopy('200-3001894201', 'interbank-usd')}
                      className="text-[10px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700"
                    >
                      {copiedAccount === 'interbank-usd' ? '¡Copiado!' : 'Copiar'}
                    </button>
                  </div>
                  <div className="font-mono text-xs text-white">Cta. Dólares: 200-3001894201</div>
                  <div className="font-mono text-[11px] text-slate-400">CCI: 003-200-003001894201-39</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Security & Customer Protection Guarantees */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                Certificación PCI-DSS Nivel 1
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tus datos financieros nunca se almacenan en nuestros servidores. Toda la comunicación está protegida por encriptación bancaria de grado militar.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                Boleta o Factura Electrónica
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Emitimos comprobantes válidos para SUNAT para clientes particulares (Boleta) o talleres mecánicos y empresas (Factura con RUC).
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                Garantía y Devolución 100%
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Todos nuestros repuestos cuentan con 12 meses de garantía oficial y 15 días para cambios sin costo si no calza en tu vehículo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
