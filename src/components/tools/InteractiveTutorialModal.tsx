import React, { useState } from 'react';
import { ToolGuideItem, ToolStep } from '../../data/toolsGuideData';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Sparkles, 
  Wrench, 
  Car, 
  Boxes, 
  ShoppingBag, 
  CreditCard, 
  MessageSquare,
  Play,
  ArrowRight,
  HelpCircle,
  Lightbulb
} from 'lucide-react';

interface InteractiveTutorialModalProps {
  tool: ToolGuideItem | null;
  onClose: () => void;
  onExecuteLiveAction: (tool: ToolGuideItem) => void;
}

export const InteractiveTutorialModal: React.FC<InteractiveTutorialModalProps> = ({
  tool,
  onClose,
  onExecuteLiveAction
}) => {
  if (!tool) return null;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const steps = tool.tutorialSteps;
  const currentStep = steps[currentStepIndex] || steps[0];
  const progressPercent = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Completed tutorial!
      onClose();
      onExecuteLiveAction(tool);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  // Render visual mock representation tailored to the tool
  const renderVisualMock = () => {
    switch (tool.id) {
      case 'garaje-virtual':
        return (
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 font-sans">
            <div className="flex items-center justify-between text-xs text-amber-500 font-mono">
              <span className="flex items-center gap-1.5"><Car className="w-3.5 h-3.5" /> Garaje Virtual</span>
              <span className="text-[10px] bg-amber-500/15 px-2 py-0.5 rounded text-amber-400">Paso {currentStep.stepNumber}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className={`p-2 rounded-lg border text-xs ${currentStepIndex >= 1 ? 'border-amber-500 bg-amber-500/10' : 'border-slate-800 bg-slate-900'}`}>
                <span className="text-[10px] text-slate-400 block">Marca</span>
                <span className="text-white font-semibold">{currentStepIndex >= 1 ? 'Honda / Toyota' : 'Todas las Marcas'}</span>
              </div>
              <div className={`p-2 rounded-lg border text-xs ${currentStepIndex >= 1 ? 'border-amber-500 bg-amber-500/10' : 'border-slate-800 bg-slate-900'}`}>
                <span className="text-[10px] text-slate-400 block">Modelo</span>
                <span className="text-white font-semibold">{currentStepIndex >= 1 ? 'Civic / Supra' : 'Escribe modelo...'}</span>
              </div>
              <div className={`p-2 rounded-lg border text-xs ${currentStepIndex >= 1 ? 'border-amber-500 bg-amber-500/10' : 'border-slate-800 bg-slate-900'}`}>
                <span className="text-[10px] text-slate-400 block">Año</span>
                <span className="text-white font-semibold">{currentStepIndex >= 1 ? '2022' : 'Año...'}</span>
              </div>
            </div>
            <div className="flex justify-end">
              <div className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${currentStepIndex >= 2 ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300' : 'bg-amber-500 text-slate-950'}`}>
                {currentStepIndex >= 2 ? '✓ Filtro Aplicado' : 'Filtrar'}
              </div>
            </div>
            {currentStepIndex >= 2 && (
              <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/50 text-[11px] text-emerald-300 flex items-center justify-between">
                <span>✓ 8 repuestos 100% compatibles encontrados</span>
                <span className="font-mono text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded">Calce Garantizado</span>
              </div>
            )}
          </div>
        );

      case 'catalogo-inteligente':
        return (
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 font-sans">
            <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-900 rounded-lg text-[11px]">
              <span className={`px-2.5 py-1 rounded ${currentStepIndex === 0 ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}>Todos</span>
              <span className={`px-2.5 py-1 rounded ${currentStepIndex >= 1 ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}>Frenos</span>
              <span className="px-2.5 py-1 text-slate-400">Suspensión</span>
              <span className="px-2.5 py-1 text-slate-400">Motor & Turbo</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-mono">Brembo</span>
                <div className="font-bold text-white text-[11px]">Pastillas Cerámicas X-Line</div>
                <div className="text-amber-400 font-mono font-bold">$89.00 USD</div>
                <div className="text-[10px] text-emerald-400">● 14 unidades en bodega</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-mono">VORTEKSA Apex</span>
                <div className="font-bold text-white text-[11px]">Discos Ventilados 330mm</div>
                <div className="text-amber-400 font-mono font-bold">$220.00 USD</div>
                <div className="text-[10px] text-emerald-400">● 8 unidades en bodega</div>
              </div>
            </div>
          </div>
        );

      case 'carrito-descuento':
        return (
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5 font-sans">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800 text-slate-300">
              <span className="font-bold text-white">Tu Carrito de Compra (2 ítems)</span>
              <span className="text-emerald-400 font-mono text-[11px]">Flete Gratis Activo</span>
            </div>
            <div className="flex justify-between items-center text-xs py-1 border-b border-slate-800/60">
              <span className="text-slate-300">Discos Ventilados 330mm (x1)</span>
              <span className="font-mono text-white">$220.00 USD</span>
            </div>
            <div className="p-2 rounded bg-amber-500/10 border border-amber-500/25 flex items-center justify-between text-xs">
              <span className="text-amber-300 font-semibold flex items-center gap-1">
                <span>Cupón BIENVENIDO10 (10% OFF):</span>
              </span>
              <span className="font-mono font-bold text-emerald-400">-$22.00 USD</span>
            </div>
            <div className="flex justify-between items-center text-sm pt-2 font-bold">
              <span className="text-white">Total a Pagar:</span>
              <span className="text-amber-400 font-mono">$198.00 USD</span>
            </div>
          </div>
        );

      case 'pasarela-checkout':
        return (
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 font-sans">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">Paso {currentStep.stepNumber} de Checkout</span>
              <span className="text-emerald-400 text-[10px] font-mono">Conexión Cifrada SSL</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[9px]">Destinatario</span>
                <span className="text-white font-semibold">Taller Mecánico / Particular</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[9px]">Método</span>
                <span className="text-amber-400 font-semibold">Tarjeta / Transferencia</span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-[11px] text-emerald-300">
              <span className="font-mono font-bold block">Orden Generada: #VOR-98214</span>
              <span className="text-[10px] text-slate-300">Comprobante emitido con opción de descarga instantánea.</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 font-sans">
            <div className="flex items-center justify-between text-xs text-amber-400 font-mono">
              <span>{tool.title}</span>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">Modo Interactivo</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-xs font-bold text-white">{currentStep.title}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentStep.instruction}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wider block">
                TUTORIAL INTERACTIVO PASO A PASO
              </span>
              <h3 className="font-display font-bold text-base text-white">
                {tool.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 transition-colors"
            aria-label="Cerrar tutorial"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5 relative">
          <div 
            className="bg-gradient-to-r from-amber-500 to-amber-400 h-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Step Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center font-mono">
                {currentStep.stepNumber}
              </span>
              <h4 className="font-display font-bold text-base sm:text-lg text-white">
                {currentStep.title}
              </h4>
            </div>

            <span className="text-xs text-slate-400 font-mono">
              Paso {currentStepIndex + 1} de {steps.length}
            </span>
          </div>

          {/* Interactive Visual Mock representation */}
          <div className="relative">
            {renderVisualMock()}
          </div>

          {/* Instruction Box */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {currentStep.instruction}
            </p>
            <div className="flex items-start gap-2 pt-1 text-xs text-amber-300 font-medium">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Consejo práctico:</strong> {currentStep.actionTip}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              currentStepIndex === 0
                ? 'opacity-30 cursor-not-allowed text-slate-500'
                : 'text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onExecuteLiveAction(tool);
              }}
              className="hidden sm:inline-flex px-3 py-2 text-xs text-slate-400 hover:text-amber-400 font-mono transition-colors"
            >
              Saltar y Probar en Vivo
            </button>

            <button
              onClick={handleNext}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all active:scale-95 flex items-center gap-1.5 shadow-lg shadow-amber-500/10"
            >
              <span>{currentStepIndex === steps.length - 1 ? '¡Completar y Probar en Vivo!' : 'Siguiente Paso'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
