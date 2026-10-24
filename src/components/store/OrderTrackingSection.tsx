import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus } from '../../types';
import { 
  PackageSearch, 
  Search, 
  Truck, 
  CheckCircle2, 
  Package, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  Share2, 
  Phone,
  AlertCircle,
  Copy
} from 'lucide-react';

interface OrderTrackingSectionProps {
  onOpenChatWithOrder?: (orderNumber: string) => void;
}

export const OrderTrackingSection: React.FC<OrderTrackingSectionProps> = ({ onOpenChatWithOrder }) => {
  const { orders } = useApp();
  const [searchCode, setSearchCode] = useState('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [copiedTracking, setCopiedTracking] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchCode.trim().toLowerCase().replace('#', '');
    if (!query) return;

    setHasSearched(true);
    // Find in context orders by orderNumber, id, email or phone
    const match = orders.find(o => 
      o.orderNumber.toLowerCase().replace('#', '').includes(query) ||
      o.id.toLowerCase().includes(query) ||
      o.customer.email.toLowerCase().includes(query) ||
      o.customer.phone.replace(/\D/g, '').includes(query.replace(/\D/g, ''))
    );

    setFoundOrder(match || null);
  };

  const handleQuickDemo = (code: string) => {
    setSearchCode(code);
    const query = code.toLowerCase().replace('#', '');
    setHasSearched(true);
    const match = orders.find(o => 
      o.orderNumber.toLowerCase().replace('#', '').includes(query) ||
      o.id.toLowerCase().includes(query)
    );
    setFoundOrder(match || null);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  // Timeline Step Resolver
  const getTimelineStage = (status: OrderStatus) => {
    switch (status) {
      case 'procesando': return 1;
      case 'en_camino': return 2;
      case 'entregado': return 3;
      case 'cancelado': return -1;
      default: return 1;
    }
  };

  const activeStage = foundOrder ? getTimelineStage(foundOrder.status) : 0;

  return (
    <section id="rastreo-pedidos" className="py-16 bg-slate-950 border-t border-slate-800 relative z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold mb-3">
            <PackageSearch className="w-3.5 h-3.5" />
            <span>SEGUIMIENTO DE PEDIDOS EN TIEMPO REAL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight mb-3">
            Consulta el Estado de tu Compra
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Ingresa tu número de orden (ej. <strong>VOR-84920</strong> o <strong>#ARP-1046</strong>) o tu correo para rastrear cada etapa de tu pedido, desde la validación del pago hasta el despacho y entrega con garantía.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="max-w-2xl mx-auto mb-10">
          <form onSubmit={handleSearch} className="relative flex items-center shadow-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Ingresa tu código de pedido (ej. VOR-84920, #ARP-1046) o correo..."
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-700/80 rounded-l-2xl text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-all font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-r-2xl transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-lg"
            >
              <span>Consultar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Order Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-400">
            <span>Órdenes de demostración:</span>
            {orders.slice(0, 3).map(o => (
              <button
                key={o.id}
                type="button"
                onClick={() => handleQuickDemo(o.orderNumber)}
                className="font-mono text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-amber-400 transition-colors"
              >
                {o.orderNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Results Container */}
        {hasSearched && !foundOrder && (
          <div className="max-w-xl mx-auto p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-500 mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">No encontramos el pedido con ese código</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Verifica haber ingresado el número completo que recibiste al completar el pago (ej. VOR-XXXXX) o comunícate con un asesor para localizar tu compra.
            </p>
            <div className="pt-2">
              <a
                href="tel:931978990"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Central de Pedidos: 931978990</span>
              </a>
            </div>
          </div>
        )}

        {foundOrder && (
          <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8 animate-in fade-in duration-300">
            {/* Top Order Summary Card */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    PEDIDO CONFIRMADO VORTEKSA
                  </span>
                  <span className="text-slate-500">·</span>
                  <span className="text-xs font-mono text-slate-400">
                    {new Date(foundOrder.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-2xl font-display font-extrabold text-white flex items-center gap-2.5">
                  <span>{foundOrder.orderNumber}</span>
                  <button
                    onClick={() => handleCopyCode(foundOrder.orderNumber)}
                    className="p-1 text-slate-400 hover:text-white rounded bg-slate-800 transition-colors"
                    title="Copiar código de pedido"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  {copiedTracking && (
                    <span className="text-[10px] text-emerald-400 font-mono">¡Copiado!</span>
                  )}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Destinatario: <strong className="text-slate-200">{foundOrder.customer.name}</strong> · {foundOrder.customer.city}, Perú
                </p>
              </div>

              <div className="flex flex-col items-start md:items-end gap-1.5">
                <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 ${
                  foundOrder.status === 'entregado'
                    ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300'
                    : foundOrder.status === 'en_camino'
                    ? 'bg-amber-950/80 border border-amber-500/40 text-amber-300'
                    : 'bg-blue-950/80 border border-blue-500/40 text-blue-300'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                  <span className="uppercase">
                    {foundOrder.status === 'en_camino' ? 'En Camino / En Tránsito' : foundOrder.status}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  Método: <strong className="capitalize text-slate-300">{foundOrder.paymentMethod.replace('_', ' ')}</strong> ({foundOrder.paymentStatus === 'paid' ? 'Pagado ✓' : 'Pendiente'})
                </span>
              </div>
            </div>

            {/* Visual 4-Step Tracking Timeline */}
            <div>
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-6">
                Progreso del Envío en Tiempo Real:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                {/* Step 1: Pago y Confirmación */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  activeStage >= 1
                    ? 'bg-slate-950/90 border-emerald-500/40 text-white'
                    : 'bg-slate-950/40 border-slate-800 text-slate-500'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                      activeStage >= 1 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      1
                    </span>
                    <CheckCircle2 className={`w-4 h-4 ${activeStage >= 1 ? 'text-emerald-400' : 'text-slate-600'}`} />
                  </div>
                  <strong className="block text-xs font-bold text-white mb-0.5">Pago Confirmado</strong>
                  <span className="text-[11px] text-slate-400 block leading-tight">
                    Validación bancaria inmediata y reserva de stock en almacén.
                  </span>
                </div>

                {/* Step 2: Preparación en Almacén */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  activeStage >= 1
                    ? 'bg-slate-950/90 border-emerald-500/40 text-white'
                    : 'bg-slate-950/40 border-slate-800 text-slate-500'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                      activeStage >= 1 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      2
                    </span>
                    <Package className={`w-4 h-4 ${activeStage >= 1 ? 'text-emerald-400' : 'text-slate-600'}`} />
                  </div>
                  <strong className="block text-xs font-bold text-white mb-0.5">Embalaje Técnico</strong>
                  <span className="text-[11px] text-slate-400 block leading-tight">
                    Inspección de calidad OEM y protección antigolpes para envío.
                  </span>
                </div>

                {/* Step 3: En Camino */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  activeStage >= 2
                    ? 'bg-slate-950/90 border-amber-500/40 text-white'
                    : 'bg-slate-950/40 border-slate-800 text-slate-500'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                      activeStage >= 2 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      3
                    </span>
                    <Truck className={`w-4 h-4 ${activeStage >= 2 ? 'text-amber-400' : 'text-slate-600'}`} />
                  </div>
                  <strong className="block text-xs font-bold text-white mb-0.5">En Tránsito Nacional</strong>
                  <span className="text-[11px] text-slate-400 block leading-tight">
                    Courier express en ruta (Olva / Shalom) hacia {foundOrder.customer.city}.
                  </span>
                </div>

                {/* Step 4: Entregado */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  activeStage >= 3
                    ? 'bg-slate-950/90 border-emerald-500/40 text-white'
                    : 'bg-slate-950/40 border-slate-800 text-slate-500'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                      activeStage >= 3 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      4
                    </span>
                    <MapPin className={`w-4 h-4 ${activeStage >= 3 ? 'text-emerald-400' : 'text-slate-600'}`} />
                  </div>
                  <strong className="block text-xs font-bold text-white mb-0.5">Entregado con Garantía</strong>
                  <span className="text-[11px] text-slate-400 block leading-tight">
                    Recibido en destino. Póliza oficial de 12 meses activada.
                  </span>
                </div>
              </div>
            </div>

            {/* Order Items & Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-slate-800">
              {/* Items List (7 cols) */}
              <div className="md:col-span-7 space-y-3">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Repuestos incluidos en el paquete:
                </span>
                <div className="space-y-2">
                  {foundOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                      <div>
                        <span className="text-xs font-semibold text-white block">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">SKU: {item.sku} · Marca: {item.brand}</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-amber-400">
                        ${(item.price * item.quantity).toFixed(2)} USD
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial & Delivery Details (5 cols) */}
              <div className="md:col-span-5 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs">
                <span className="font-mono font-bold text-slate-300 block uppercase text-[11px]">
                  Resumen de Facturación
                </span>
                <div className="space-y-1.5 text-slate-400">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-mono text-white">${foundOrder.subtotal.toFixed(2)} USD</span>
                  </div>
                  {foundOrder.discount && foundOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Descuento VIP (10%):</span>
                      <span className="font-mono">-${foundOrder.discount.toFixed(2)} USD</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>IGV (16%):</span>
                    <span className="font-mono text-white">${foundOrder.tax.toFixed(2)} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío Nacional:</span>
                    <span className="font-mono text-emerald-400">
                      {foundOrder.shipping === 0 ? 'GRATIS' : `$${foundOrder.shipping.toFixed(2)} USD`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-white font-bold">
                    <span>Total Pagado:</span>
                    <div className="text-right">
                      <div className="font-mono text-amber-400 text-sm">
                        ${foundOrder.total.toFixed(2)} USD
                      </div>
                      <div className="font-mono text-[10px] text-emerald-400 font-semibold">
                        (Aprox. S/ {(foundOrder.total * 3.75).toFixed(2)})
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <div>
                    <strong className="text-slate-300">Dirección:</strong> {foundOrder.customer.address}
                  </div>
                  <div>
                    <strong className="text-slate-300">Vehículo:</strong> {foundOrder.customer.vehicleMake} {foundOrder.customer.vehicleModel} ({foundOrder.customer.vehicleYear || '2024'})
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-400">
                  Garantía y soporte cubiertos por VORTEKSA Perú.
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {onOpenChatWithOrder && (
                  <button
                    onClick={() => onOpenChatWithOrder(foundOrder.orderNumber)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Consultar por Chat o Voz</span>
                  </button>
                )}

                <a
                  href={`https://wa.me/51931978990?text=Hola%20VORTEKSA,%20deseo%20consultar%20sobre%20mi%20pedido%20${foundOrder.orderNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>WhatsApp de Despacho</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
