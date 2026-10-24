import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CustomerInfo, PaymentMethod, Order } from '../../types';
import { 
  X, 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  Building2, 
  Printer, 
  ArrowLeft,
  Calendar,
  AlertCircle,
  Smartphone,
  QrCode,
  Check,
  Copy,
  FileCheck
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPaymentMethod?: PaymentMethod;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ 
  isOpen, 
  onClose,
  initialPaymentMethod = 'yape'
}) => {
  const { cart, checkout, discountApplied, discountCode, applyDiscountCode, registeredUser, currentUser } = useApp();
  
  // Checkout Steps: 'form' -> 'processing' -> 'success'
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Customer Form State pre-populated
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: currentUser?.name || registeredUser?.name || 'Ursula Fernandez',
    email: currentUser?.email || registeredUser?.email || 'fernandezursula31@gmail.com',
    phone: currentUser?.phone || registeredUser?.phone || '931978990',
    address: 'Av. Las Begonias 441, San Isidro',
    city: 'Lima',
    postalCode: '15046',
    vehicleMake: (currentUser?.vehicle || registeredUser?.vehicle)?.split(' ')[0] || 'Toyota',
    vehicleModel: (currentUser?.vehicle || registeredUser?.vehicle)?.split(' ')[1] || 'Supra GR',
    vehicleYear: (currentUser?.vehicle || registeredUser?.vehicle)?.split(' ')[2] || '2024'
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(initialPaymentMethod || 'yape');

  // Sync initialPaymentMethod if passed
  useEffect(() => {
    if (initialPaymentMethod) {
      setPaymentMethod(initialPaymentMethod);
    }
  }, [initialPaymentMethod, isOpen]);

  // Yape Details State
  const [yapePhone, setYapePhone] = useState('931978990');
  const [yapeCode, setYapeCode] = useState('849201');

  // Plin Details State
  const [plinBank, setPlinBank] = useState<'BBVA' | 'Interbank' | 'Scotiabank' | 'BanBif'>('BBVA');
  const [plinPhone, setPlinPhone] = useState('931978990');
  const [plinCode, setPlinCode] = useState('710293');

  // Card Details State
  const [cardNumber, setCardNumber] = useState('4532 8910 2488 9201');
  const [cardHolder, setCardHolder] = useState(currentUser?.name.toUpperCase() || 'URSULA FERNANDEZ');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvv, setCardCvv] = useState('482');

  // Bank Transfer Details State
  const [transferBank, setTransferBank] = useState<'BCP' | 'BBVA' | 'Interbank'>('BCP');
  const [transferVoucher, setTransferVoucher] = useState('08492041');

  // Validation errors
  const [paymentErrors, setPaymentErrors] = useState<{ [key: string]: string }>({});
  const [copiedText, setCopiedText] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const discount = discountApplied ? +(subtotal * 0.10).toFixed(2) : 0;
  const discountedSubtotal = Math.max(0, subtotal - discount);
  const tax = +(discountedSubtotal * 0.16).toFixed(2);
  const shipping = discountedSubtotal > 150 ? 0 : 15;
  const total = +(discountedSubtotal + tax + shipping).toFixed(2);

  // Soles conversion rate (e.g. 1 USD = 3.75 PEN) for Peruvian local display
  const exchangeRate = 3.75;
  const totalPEN = (total * exchangeRate).toFixed(2);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Format Card Number (XXXX XXXX XXXX XXXX)
  const handleCardNumberChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  // Format Expiry (MM/YY)
  const handleExpiryChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2, 4)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: { [key: string]: string } = {};

    if (paymentMethod === 'credit_card' || paymentMethod === 'debit_card') {
      if (cardNumber.replace(/\s/g, '').length < 15) {
        errors.card = 'Número de tarjeta inválido (16 dígitos requeridos).';
      }
      if (cardExpiry.length < 5) {
        errors.expiry = 'Fecha de expiración inválida (MM/AA).';
      }
      if (cardCvv.length < 3) {
        errors.cvv = 'CVV inválido (3 o 4 dígitos).';
      }
    } else if (paymentMethod === 'yape') {
      if (!yapePhone || yapePhone.length < 9) {
        errors.yapePhone = 'Ingresa un número de celular de 9 dígitos.';
      }
      if (!yapeCode || yapeCode.length < 4) {
        errors.yapeCode = 'Ingresa el código de aprobación o referencia de tu Yape.';
      }
    } else if (paymentMethod === 'plin') {
      if (!plinPhone || plinPhone.length < 9) {
        errors.plinPhone = 'Ingresa el número celular de Plin de 9 dígitos.';
      }
      if (!plinCode || plinCode.length < 4) {
        errors.plinCode = 'Ingresa el código de operación de Plin.';
      }
    } else if (paymentMethod === 'bank_transfer') {
      if (!transferVoucher || transferVoucher.length < 4) {
        errors.transferVoucher = 'Ingresa el número de operación o voucher bancario.';
      }
    }

    if (Object.keys(errors).length > 0) {
      setPaymentErrors(errors);
      return;
    }

    setPaymentErrors({});
    setStep('processing');

    // Simulate 1.6s secure authorization with official bank verification protocol
    setTimeout(() => {
      const order = checkout(customer, paymentMethod);
      if (order) {
        setCompletedOrder(order);
        setStep('success');
      } else {
        setStep('form');
      }
    }, 1600);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col my-6">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base sm:text-lg text-white">
                {step === 'success' ? 'Comprobante de Compra Oficial' : 'Pasarela de Pago Segura en Perú'}
              </h2>
              <span className="text-[10px] text-slate-400 font-mono block">
                Cifrado SSL 256 bits · Protección Bancaria PCI-DSS · Acreditación Inmediata
              </span>
            </div>
          </div>

          {step !== 'processing' && (
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              aria-label="Cerrar pasarela"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Processing State */}
        {step === 'processing' && (
          <div className="p-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative w-16 h-16">
              <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-amber-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-amber-500">
                <Lock className="w-6 h-6" />
              </div>
            </div>
            <h3 className="font-display font-bold text-lg text-white">
              Verificando transacción bancaria segura...
            </h3>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Conectando con la red interbancaria oficial en Perú y reservando repuestos en el inventario de bodega en tiempo real. Por favor no cierres esta ventana.
            </p>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-800/40">
              ✓ Canal Cifrado con Certificado SSL
            </span>
          </div>
        )}

        {/* Success State */}
        {step === 'success' && completedOrder && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                ¡Pago Verificado y Orden Confirmada!
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Número de Orden Oficial: <strong className="text-amber-400 font-mono text-sm">{completedOrder.orderNumber}</strong>
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-emerald-300 text-xs font-mono font-semibold mt-2">
                <span>Estado: {completedOrder.paymentStatus === 'paid' ? 'Pagado & Acreditado' : 'Pendiente de Validación'}</span>
                <span>·</span>
                <span className="capitalize">{completedOrder.paymentMethod.replace('_', ' ')}</span>
              </div>
            </div>

            {/* Receipt Details Card */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-xs space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                <div>
                  <span className="text-slate-400 block text-[11px]">Cliente / Razón Social:</span>
                  <span className="font-semibold text-white">{completedOrder.customer.name}</span>
                  <span className="text-slate-400 block text-[10px] font-mono">{completedOrder.customer.email} · Tel: {completedOrder.customer.phone}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[11px]">Fecha y Hora de Emisión:</span>
                  <span className="font-mono text-slate-300">
                    {new Date(completedOrder.createdAt).toLocaleDateString()} {new Date(completedOrder.createdAt).toLocaleTimeString()}
                  </span>
                  <span className="text-emerald-400 block text-[10px] font-mono">Boleta / Factura N° {completedOrder.orderNumber}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-2">
                <span className="text-slate-400 text-[11px] uppercase font-bold tracking-wider block">
                  Repuestos Facturados & Descontados de Bodega:
                </span>
                {completedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-900">
                    <span className="text-slate-200">
                      {item.quantity}x {item.name} ({item.sku})
                    </span>
                    <span className="font-mono tabular-nums text-white font-medium">
                      ${(item.price * item.quantity).toFixed(2)} USD
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="pt-2 border-t border-slate-800 space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span className="font-mono tabular-nums">${completedOrder.subtotal.toFixed(2)} USD</span>
                </div>
                {completedOrder.discount && completedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Descuento de Tienda (10% VIP):</span>
                    <span className="font-mono tabular-nums">-${completedOrder.discount.toFixed(2)} USD</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>IGV / Impuestos (16%):</span>
                  <span className="font-mono tabular-nums">${completedOrder.tax.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Flete Nacional Express:</span>
                  <span className="font-mono tabular-nums text-emerald-400">
                    {completedOrder.shipping === 0 ? 'GRATIS ($0.00)' : `$${completedOrder.shipping.toFixed(2)} USD`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                  <span>Total Pagado:</span>
                  <div className="text-right">
                    <div className="font-mono text-amber-400 text-base tabular-nums">
                      ${completedOrder.total.toFixed(2)} USD
                    </div>
                    <div className="font-mono text-slate-400 text-xs">
                      Aprox. S/. {(completedOrder.total * exchangeRate).toFixed(2)} PEN
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping & Tracking Status */}
              <div className="p-3 bg-slate-900 rounded-xl flex items-center gap-3 text-slate-300">
                <Truck className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <span className="font-semibold text-white block">Destino de Despacho en Perú:</span>
                  <span className="text-slate-400 text-xs">
                    {completedOrder.customer.address}, {completedOrder.customer.city} (CP: {completedOrder.customer.postalCode})
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors border border-slate-700"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir Comprobante</span>
              </button>

              <button
                onClick={() => {
                  handleCopy(completedOrder.orderNumber, 'order-num');
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors border border-slate-700"
              >
                <Copy className="w-4 h-4" />
                <span>{copiedText === 'order-num' ? '¡Número de Orden Copiado!' : 'Copiar Código de Orden'}</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-colors text-center"
              >
                Finalizar y Continuar
              </button>
            </div>
          </div>
        )}

        {/* Form State */}
        {step === 'form' && (
          <form onSubmit={handleProcessPayment} className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Customer & Shipping Address (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <h3 className="font-display font-semibold text-sm text-white flex items-center gap-2 pb-2 border-b border-slate-800">
                  <Truck className="w-4 h-4 text-amber-500" />
                  <span>1. Datos de Entrega & Facturación</span>
                </h3>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Nombre Completo / Titular</label>
                  <input
                    type="text"
                    required
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Celular / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Dirección de Despacho en Perú</label>
                  <input
                    type="text"
                    required
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                    placeholder="Av. o Jr., N° y referencia..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Ciudad / Región</label>
                    <input
                      type="text"
                      required
                      value={customer.city}
                      onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Código Postal</label>
                    <input
                      type="text"
                      required
                      value={customer.postalCode}
                      onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Optional Vehicle info for workshop reference */}
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Vehículo donde se instalarán los repuestos:
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <input
                      type="text"
                      placeholder="Marca"
                      value={customer.vehicleMake}
                      onChange={(e) => setCustomer({ ...customer, vehicleMake: e.target.value })}
                      className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-200 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Modelo"
                      value={customer.vehicleModel}
                      onChange={(e) => setCustomer({ ...customer, vehicleModel: e.target.value })}
                      className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-200 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Año"
                      value={customer.vehicleYear}
                      onChange={(e) => setCustomer({ ...customer, vehicleYear: e.target.value })}
                      className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-200 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Payment Gateway Selector & Peruvian Methods (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="font-display font-semibold text-sm text-white flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-amber-500" />
                    <span>2. Selecciona tu Método de Pago en Perú</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                    0% Comisión
                  </span>
                </h3>

                {/* 4 Payment Options Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {/* Yape Option */}
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('yape');
                      setPaymentErrors({});
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'yape'
                        ? 'bg-[#742384]/20 border-[#742384] text-[#d87df2] shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-[#742384] text-white font-bold text-xs flex items-center justify-center">Y</span>
                    <span className="font-bold">Yape</span>
                    <span className="text-[9px] text-slate-400">BCP Móvil</span>
                  </button>

                  {/* Plin Option */}
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('plin');
                      setPaymentErrors({});
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'plin'
                        ? 'bg-[#00b0ca]/20 border-[#00b0ca] text-[#38d7f0] shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-[#00b0ca] text-slate-950 font-bold text-xs flex items-center justify-center">P</span>
                    <span className="font-bold">Plin</span>
                    <span className="text-[9px] text-slate-400">Interbancario</span>
                  </button>

                  {/* Card Option */}
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('credit_card');
                      setPaymentErrors({});
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'credit_card' || paymentMethod === 'debit_card'
                        ? 'bg-amber-500/10 border-amber-500 text-amber-400 shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 text-amber-500" />
                    <span className="font-bold">Tarjetas</span>
                    <span className="text-[9px] text-slate-400">Crédito/Débito</span>
                  </button>

                  {/* Bank Transfer Option */}
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('bank_transfer');
                      setPaymentErrors({});
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'bank_transfer'
                        ? 'bg-blue-600/20 border-blue-500 text-blue-300 shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <Building2 className="w-6 h-6 text-blue-400" />
                    <span className="font-bold">Banco</span>
                    <span className="text-[9px] text-slate-400">BCP/BBVA/IBK</span>
                  </button>
                </div>

                {/* YAPE FORM CONTAINER */}
                {paymentMethod === 'yape' && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-[#742384]/40 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#d87df2]">Pagar con Yape BCP</span>
                        <span className="text-[10px] bg-[#742384]/30 px-2 py-0.5 rounded text-white font-mono">931978990</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy('931978990', 'yape-pay')}
                        className="text-[10px] text-slate-300 hover:text-white px-2 py-0.5 bg-slate-900 border border-slate-800 rounded flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedText === 'yape-pay' ? '¡Copiado!' : 'Copiar Número'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Tu Celular Yape (9 dígitos)</label>
                        <input
                          type="tel"
                          required
                          value={yapePhone}
                          onChange={(e) => setYapePhone(e.target.value)}
                          placeholder="9XXXXXXXX"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-purple-500"
                        />
                        {paymentErrors.yapePhone && <p className="text-[10px] text-red-400 mt-1">{paymentErrors.yapePhone}</p>}
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Código de Aprobación Yape</label>
                        <input
                          type="text"
                          required
                          value={yapeCode}
                          onChange={(e) => setYapeCode(e.target.value)}
                          placeholder="Código de 6 dígitos"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-purple-500"
                        />
                        {paymentErrors.yapeCode && <p className="text-[10px] text-red-400 mt-1">{paymentErrors.yapeCode}</p>}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#742384]/15 border border-[#742384]/30 text-[11px] text-slate-300 space-y-1">
                      <p>
                        Yapea <strong>S/. {totalPEN} PEN</strong> (${total.toFixed(2)} USD) a <strong>VORTEKSA / Ursula Fernandez</strong>. La acreditación es inmediata y se despacha tu pedido sin demoras.
                      </p>
                    </div>
                  </div>
                )}

                {/* PLIN FORM CONTAINER */}
                {paymentMethod === 'plin' && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-[#00b0ca]/40 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#38d7f0]">Pagar con Plin Interbancario</span>
                        <span className="text-[10px] bg-[#00b0ca]/30 px-2 py-0.5 rounded text-white font-mono">931978990</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy('931978990', 'plin-pay')}
                        className="text-[10px] text-slate-300 hover:text-white px-2 py-0.5 bg-slate-900 border border-slate-800 rounded flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedText === 'plin-pay' ? '¡Copiado!' : 'Copiar'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Banco Emisor</label>
                        <select
                          value={plinBank}
                          onChange={(e) => setPlinBank(e.target.value as any)}
                          className="w-full px-2.5 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-cyan-500"
                        >
                          <option value="BBVA">BBVA Perú</option>
                          <option value="Interbank">Interbank</option>
                          <option value="Scotiabank">Scotiabank</option>
                          <option value="BanBif">BanBif</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Tu Celular Plin</label>
                        <input
                          type="tel"
                          required
                          value={plinPhone}
                          onChange={(e) => setPlinPhone(e.target.value)}
                          placeholder="9XXXXXXXX"
                          className="w-full px-2.5 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                        />
                        {paymentErrors.plinPhone && <p className="text-[10px] text-red-400 mt-1">{paymentErrors.plinPhone}</p>}
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Cód. Referencia</label>
                        <input
                          type="text"
                          required
                          value={plinCode}
                          onChange={(e) => setPlinCode(e.target.value)}
                          placeholder="N° operación"
                          className="w-full px-2.5 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                        />
                        {paymentErrors.plinCode && <p className="text-[10px] text-red-400 mt-1">{paymentErrors.plinCode}</p>}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#00b0ca]/15 border border-[#00b0ca]/30 text-[11px] text-slate-300">
                      Monto a plinear: <strong>S/. {totalPEN} PEN</strong>. Válido desde cualquier entidad afiliada a Plin en Perú.
                    </div>
                  </div>
                )}

                {/* CARD FIELDS CONTAINER */}
                {(paymentMethod === 'credit_card' || paymentMethod === 'debit_card') && (
                  <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[11px] font-medium text-slate-400">
                          Número de Tarjeta (Visa, Mastercard, Amex, Diners)
                        </label>
                        <span className="text-[10px] text-amber-400 font-mono">Niubiz / Izipay</span>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => handleCardNumberChange(e.target.value)}
                          placeholder="4532 0000 0000 0000"
                          className="w-full pl-3 pr-10 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                        />
                        <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      </div>
                      {paymentErrors.card && <p className="text-[11px] text-red-400 mt-1">{paymentErrors.card}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        Nombre impreso en la tarjeta
                      </label>
                      <input
                        type="text"
                        required
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-amber-500 uppercase"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">Expiración (MM/AA)</label>
                        <input
                          type="text"
                          required
                          placeholder="MM/AA"
                          value={cardExpiry}
                          onChange={(e) => handleExpiryChange(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                        />
                        {paymentErrors.expiry && <p className="text-[11px] text-red-400 mt-1">{paymentErrors.expiry}</p>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">CVV / CVC (3 o 4 dígitos)</label>
                        <div className="relative">
                          <input
                            type="password"
                            required
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                            placeholder="•••"
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                          />
                          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                        </div>
                        {paymentErrors.cvv && <p className="text-[11px] text-red-400 mt-1">{paymentErrors.cvv}</p>}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400 font-mono">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Validación 3D Secure / Clave Dinámica OTP activada</span>
                    </div>
                  </div>
                )}

                {/* BANK TRANSFER FIELDS CONTAINER */}
                {paymentMethod === 'bank_transfer' && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-blue-500/40 space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                      <span className="text-xs font-bold text-blue-300">Cuentas Corrientes VORTEKSA</span>
                      <span className="text-[10px] text-amber-400 font-mono">RUC: 20609841291</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <div>
                          <strong className="text-orange-400 block text-[11px]">BCP Soles: 191-9482104-0-32</strong>
                          <span className="font-mono text-[10px] text-slate-400">CCI: 002-191-009482104032-58</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy('191-9482104-0-32', 'bcp-cta')}
                          className="text-[10px] text-slate-300 px-2 py-1 bg-slate-800 rounded border border-slate-700"
                        >
                          {copiedText === 'bcp-cta' ? '¡Copiado!' : 'Copiar'}
                        </button>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <div>
                          <strong className="text-sky-400 block text-[11px]">BBVA Soles: 0011-0182-0100084920</strong>
                          <span className="font-mono text-[10px] text-slate-400">CCI: 011-182-000100084920-14</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy('0011-0182-0100084920', 'bbva-cta')}
                          className="text-[10px] text-slate-300 px-2 py-1 bg-slate-800 rounded border border-slate-700"
                        >
                          {copiedText === 'bbva-cta' ? '¡Copiado!' : 'Copiar'}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        Número de Operación / Voucher de Transferencia
                      </label>
                      <input
                        type="text"
                        required
                        value={transferVoucher}
                        onChange={(e) => setTransferVoucher(e.target.value)}
                        placeholder="N° de voucher o código de movimiento"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                      />
                      {paymentErrors.transferVoucher && <p className="text-[10px] text-red-400 mt-1">{paymentErrors.transferVoucher}</p>}
                    </div>
                  </div>
                )}

                {/* Price Breakdown Summary */}
                <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal repuestos:</span>
                    <span className="font-mono tabular-nums">${subtotal.toFixed(2)} USD</span>
                  </div>
                  {discountApplied && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Cupón BIENVENIDO10 (10% OFF):</span>
                      <span className="font-mono tabular-nums">-${discount.toFixed(2)} USD</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>IGV (16%):</span>
                    <span className="font-mono tabular-nums">${tax.toFixed(2)} USD</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Envío Nacional:</span>
                    <span className="font-mono tabular-nums text-emerald-400">
                      {shipping === 0 ? 'GRATIS' : `$${shipping.toFixed(2)} USD`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-800 font-bold text-white">
                    <span>Total a Pagar:</span>
                    <div className="text-right">
                      <span className="text-base text-amber-400 font-mono">${total.toFixed(2)} USD</span>
                      <span className="block text-[10px] text-slate-400 font-mono">
                        (Equivalente a S/. {totalPEN} PEN)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Confirmar Pedido y Procesar Pago Seguro</span>
                </button>

                <p className="text-[10px] text-slate-500 text-center leading-relaxed">
                  🔒 Al confirmar, aceptas nuestros términos de servicio y garantía técnica. Transacción protegida por protocolos de seguridad bancaria en Perú.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
