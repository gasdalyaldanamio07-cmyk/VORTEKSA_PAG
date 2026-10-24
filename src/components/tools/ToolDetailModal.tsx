import React, { useState } from 'react';
import { ToolGuideItem } from '../../data/toolsGuideData';
import { 
  X, 
  Car, 
  Boxes, 
  FileText, 
  ShoppingBag, 
  CreditCard, 
  MessageSquareText, 
  Wrench, 
  AlertTriangle, 
  TrendingUp, 
  Truck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  PlayCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Info,
  ShieldCheck,
  Download,
  ListOrdered
} from 'lucide-react';

interface ToolDetailModalProps {
  tool: ToolGuideItem | null;
  onClose: () => void;
  onStartTutorial: (tool: ToolGuideItem) => void;
  onExecuteLiveAction: (tool: ToolGuideItem) => void;
}

const getToolIcon = (iconName: string) => {
  switch (iconName) {
    case 'Car': return <Car className="w-5 h-5 text-amber-500" />;
    case 'Boxes': return <Boxes className="w-5 h-5 text-amber-500" />;
    case 'FileText': return <FileText className="w-5 h-5 text-amber-500" />;
    case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-amber-500" />;
    case 'CreditCard': return <CreditCard className="w-5 h-5 text-amber-500" />;
    case 'MessageSquareText': return <MessageSquareText className="w-5 h-5 text-amber-500" />;
    case 'Wrench': return <Wrench className="w-5 h-5 text-amber-500" />;
    case 'AlertTriangle': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-amber-500" />;
    case 'Truck': return <Truck className="w-5 h-5 text-amber-500" />;
    default: return <Wrench className="w-5 h-5 text-amber-500" />;
  }
};

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({
  tool,
  onClose,
  onStartTutorial,
  onExecuteLiveAction
}) => {
  if (!tool) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'stepByStep' | 'troubleshooting'>('overview');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 bg-slate-950 border-b border-slate-800 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center shrink-0 mt-0.5">
              {getToolIcon(tool.iconName)}
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                <span className="text-amber-400 font-semibold">{tool.category}</span>
                <span>·</span>
                <span className="text-slate-300 font-medium">{tool.badge}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                {tool.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
                {tool.oneLiner}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors shrink-0"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-6 pt-3 bg-slate-950/60 border-b border-slate-800/80 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-amber-500 text-amber-400 bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>1. Funciones & Beneficios</span>
          </button>

          <button
            onClick={() => setActiveTab('stepByStep')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'stepByStep'
                ? 'border-amber-500 text-amber-400 bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span>2. Guía Paso a Paso & Botones</span>
          </button>

          <button
            onClick={() => setActiveTab('troubleshooting')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'troubleshooting'
                ? 'border-amber-500 text-amber-400 bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>3. Errores Frecuentes & Buenas Prácticas</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Purpose */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-amber-500 rounded-sm" />
                  ¿Para qué sirve esta herramienta?
                </h3>
                <p className="text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800">
                  {tool.purpose}
                </p>
              </div>

              {/* Grid: Problems Solved & Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800">
                  <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    Problemas que permite resolver
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {tool.problemsSolved.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800">
                  <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    Beneficios directos
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {tool.benefits.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold shrink-0">★</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Required Info & Expected Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
                  <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
                    Información que necesita el usuario
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {tool.requiredInfo.map((info, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-slate-400 font-mono">0{idx + 1}.</span>
                        <span>{info}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
                  <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
                    Resultados que puedes obtener
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {tool.expectedResults.map((res, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-slate-400 font-mono">→</span>
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Practical Example */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25">
                <h4 className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-mono">
                  <span>EJEMPLO PRÁCTICO EN EL MUNDO REAL</span>
                </h4>
                <div className="space-y-1.5 text-xs">
                  <div>
                    <span className="font-semibold text-white">Situación: </span>
                    <span className="text-slate-200">{tool.practicalExample.scenario}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-amber-400">Acción ejecutada: </span>
                    <span className="text-slate-200">{tool.practicalExample.actionTaken}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-emerald-400">Resultado obtenido: </span>
                    <span className="text-slate-200">{tool.practicalExample.outcome}</span>
                  </div>
                </div>
              </div>

              {/* Recommendations & Limitations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800">
                  <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
                    Recomendaciones de uso
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {tool.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800">
                  <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
                    Alcance y limitaciones
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {tool.limitations.map((lim, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-400 font-bold">!</span>
                        <span>{lim}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STEP BY STEP GUIDE */}
          {activeTab === 'stepByStep' && (
            <div className="space-y-6">
              {/* Step By Step Breakdown Cards */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-amber-500 rounded-sm" />
                  Procedimiento de uso paso a paso
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  Sigue esta secuencia para aprovechar al máximo las capacidades de la herramienta.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800">
                    <span className="text-[10px] font-mono text-amber-500 uppercase font-bold block mb-1">
                      Paso 1: ¿Cómo acceder?
                    </span>
                    <p className="text-xs text-slate-200">{tool.stepByStepGuide.howToAccess}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800">
                    <span className="text-[10px] font-mono text-amber-500 uppercase font-bold block mb-1">
                      Paso 2: Opciones a seleccionar
                    </span>
                    <p className="text-xs text-slate-200">{tool.stepByStepGuide.optionsToSelect}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800">
                    <span className="text-[10px] font-mono text-amber-500 uppercase font-bold block mb-1">
                      Paso 3: Datos a ingresar
                    </span>
                    <p className="text-xs text-slate-200">{tool.stepByStepGuide.dataToInput}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800">
                    <span className="text-[10px] font-mono text-amber-500 uppercase font-bold block mb-1">
                      Paso 4: ¿Cómo ejecutar las funciones?
                    </span>
                    <p className="text-xs text-slate-200">{tool.stepByStepGuide.howToExecute}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block mb-1">
                      Paso 5: ¿Cómo interpretar los resultados?
                    </span>
                    <p className="text-xs text-slate-200">{tool.stepByStepGuide.howToInterpretResults}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block mb-1">
                      Paso 6: Guardar, Descargar o Exportar
                    </span>
                    <p className="text-xs text-slate-200">{tool.stepByStepGuide.howToExportOrSave}</p>
                  </div>
                </div>
              </div>

              {/* Relevant Buttons Glossary */}
              <div className="pt-2">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-amber-500 rounded-sm" />
                  Botones y apartados clave de la interfaz
                </h3>
                <div className="divide-y divide-slate-800 rounded-xl bg-slate-950/40 border border-slate-800 overflow-hidden">
                  {tool.relevantButtons.map((btn, idx) => (
                    <div key={idx} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700 shrink-0">
                          {btn.label}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Ubicación: <strong className="text-slate-300">{btn.location}</strong>
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 sm:text-right">
                        {btn.purpose}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TROUBLESHOOTING & BEST PRACTICES */}
          {activeTab === 'troubleshooting' && (
            <div className="space-y-6">
              {/* Common Errors Table */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-amber-500 rounded-sm" />
                  Errores frecuentes y cómo solucionarlos
                </h3>
                <p className="text-xs text-slate-400 mb-3">
                  Si experimentas alguna dificultad con esta herramienta, consulta estas soluciones inmediatas:
                </p>

                <div className="space-y-3">
                  {tool.commonErrors.map((err, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <h4 className="text-xs font-bold text-red-300">{err.error}</h4>
                      </div>
                      <div className="pl-6 space-y-1 text-xs">
                        <p className="text-slate-400">
                          <strong className="text-slate-300">Causa común:</strong> {err.cause}
                        </p>
                        <p className="text-emerald-300 bg-emerald-950/30 p-2 rounded-lg border border-emerald-900/40">
                          <strong className="text-emerald-200">Solución recomendada:</strong> {err.solution}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Practices & Pro Tips */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-amber-500 rounded-sm" />
                  Consejos útiles y buenas prácticas de ingeniería
                </h3>
                <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800">
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    {tool.bestPractices.map((bp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="pt-0.5">{bp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Direct Actions */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 font-mono">
            ¿Deseas practicar paso a paso o probarla directamente?
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => onStartTutorial(tool)}
              className="flex-1 sm:flex-none px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 border border-slate-700 hover:border-amber-500/40"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Iniciar Tutorial Interactivo</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onExecuteLiveAction(tool);
              }}
              className="flex-1 sm:flex-none px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10"
            >
              <span>Probar Herramienta en Vivo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
