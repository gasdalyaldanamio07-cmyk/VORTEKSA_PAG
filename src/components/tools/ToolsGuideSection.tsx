import React, { useState } from 'react';
import { TOOLS_GUIDE_DATA, ToolGuideItem, ToolAudience } from '../../data/toolsGuideData';
import { 
  Search, 
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
  BookOpen,
  PlayCircle,
  ExternalLink,
  ChevronRight,
  Filter,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface ToolsGuideSectionProps {
  onOpenDetailModal: (tool: ToolGuideItem) => void;
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

export const ToolsGuideSection: React.FC<ToolsGuideSectionProps> = ({
  onOpenDetailModal,
  onStartTutorial,
  onExecuteLiveAction
}) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedAudience, setSelectedAudience] = useState<ToolAudience>('all');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Filter tools by search query and target audience
  const filteredTools = TOOLS_GUIDE_DATA.filter(tool => {
    const query = searchFilter.toLowerCase().trim();
    const matchesSearch = !query ||
      tool.title.toLowerCase().includes(query) ||
      tool.shortName.toLowerCase().includes(query) ||
      tool.purpose.toLowerCase().includes(query) ||
      tool.oneLiner.toLowerCase().includes(query) ||
      tool.problemsSolved.some(p => p.toLowerCase().includes(query)) ||
      tool.features.some(f => f.toLowerCase().includes(query));

    const matchesAudience = 
      selectedAudience === 'all' ||
      (selectedAudience === 'customer' && (tool.audience === 'customer' || tool.audience === 'all')) ||
      (selectedAudience === 'workshop' && (tool.audience === 'workshop' || tool.audience === 'all')) ||
      (selectedAudience === 'admin' && tool.audience === 'admin');

    return matchesSearch && matchesAudience;
  });

  return (
    <section id="guia-herramientas" className="py-16 bg-slate-950 border-t border-slate-800 relative z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>CENTRO DE HERRAMIENTAS & GUÍA PRÁCTICA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight mb-3">
            Aprende a dominar cada herramienta de VORTEKSA
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Conoce para qué sirve cada función, qué problemas resuelve, los datos que requieres ingresar y cómo completar tus compras o gestionar tu taller paso a paso con nuestros tutoriales interactivos.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-slate-900/80 p-3 sm:p-4 rounded-2xl border border-slate-800">
          {/* Audience Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSelectedAudience('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 ${
                selectedAudience === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-950/60'
              }`}
            >
              Todas las Herramientas ({TOOLS_GUIDE_DATA.length})
            </button>
            <button
              onClick={() => setSelectedAudience('customer')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 ${
                selectedAudience === 'customer'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-950/60'
              }`}
            >
              Compradores & Particulares
            </button>
            <button
              onClick={() => setSelectedAudience('workshop')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 ${
                selectedAudience === 'workshop'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-950/60'
              }`}
            >
              Talleres Mecánicos
            </button>
            <button
              onClick={() => setSelectedAudience('admin')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 ${
                selectedAudience === 'admin'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-950/60'
              }`}
            >
              Administración ERP & Bodega
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar herramienta, problema o función..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Tools Cards Grid */}
        {filteredTools.length === 0 ? (
          <div className="py-12 text-center bg-slate-900/40 rounded-2xl border border-slate-800">
            <p className="text-sm text-slate-400 mb-2">No se encontraron herramientas con ese término de búsqueda.</p>
            <button
              onClick={() => {
                setSearchFilter('');
                setSelectedAudience('all');
              }}
              className="text-xs text-amber-400 font-semibold hover:underline"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                className="group relative bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-lg"
              >
                <div>
                  {/* Card Header: Category & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3 text-xs">
                    <span className="font-mono text-amber-400 text-[11px] font-semibold">
                      {tool.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                      {tool.badge}
                    </span>
                  </div>

                  {/* Title & Icon */}
                  <div className="flex items-start gap-3 mb-2.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-amber-500/40 transition-colors">
                      {getToolIcon(tool.iconName)}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">
                        {tool.oneLiner}
                      </p>
                    </div>
                  </div>

                  {/* Key Problem Solved & Benefit */}
                  <div className="my-3.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs space-y-1.5">
                    <div className="text-slate-300">
                      <strong className="text-amber-400">¿Para qué sirve? </strong>
                      <span className="line-clamp-2">{tool.purpose}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1 border-t border-slate-800/60">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{tool.benefits[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons (3 Direct Actions) */}
                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onOpenDetailModal(tool)}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-1.5 text-center"
                      title="Ver explicación completa y para qué sirve"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                      <span>Ver Explicación</span>
                    </button>

                    <button
                      onClick={() => onStartTutorial(tool)}
                      className="px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 text-xs font-semibold rounded-xl border border-amber-500/30 transition-colors flex items-center justify-center gap-1.5 text-center"
                      title="Aprender a utilizar mediante tutorial interactivo"
                    >
                      <PlayCircle className="w-3.5 h-3.5 text-amber-400" />
                      <span>Iniciar Tutorial</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onExecuteLiveAction(tool)}
                    className="w-full px-3 py-1.5 bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-[11px] font-mono font-bold rounded-xl border border-slate-800 transition-all flex items-center justify-center gap-1.5 group-hover:border-slate-700"
                    title="Ir directamente a probar esta herramienta en vivo"
                  >
                    <span>Probar herramienta en vivo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Informative Guidance Summary / FAQ Accordion */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2.5 mb-4">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-display font-bold text-white">
              Preguntas Frecuentes sobre el uso de la Plataforma VORTEKSA
            </h3>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            {[
              {
                q: '¿Cómo garantizo que una pieza sea 100% compatible con mi auto antes de comprar?',
                a: 'Utiliza el "Garaje Virtual" seleccionando la Marca, Modelo y Año de tu auto. Todas las piezas compatibles se marcarán con el sello verde en su ficha técnica y en el catálogo.'
              },
              {
                q: '¿Cómo se aplica el 10% de descuento de bienvenida?',
                a: 'El cupón BIENVENIDO10 se activa automáticamente al registrar tu auto en la tienda. También puedes ingresarlo manualmente en el campo correspondiente dentro del Carrito de Compras.'
              },
              {
                q: '¿Cómo puedo descargar el comprobante o compartir mi orden de compra?',
                a: 'Al finalizar el checkout, la pantalla de confirmación te muestra tu número de orden (VOR-XXXXX) y un botón de "Descargar Comprobante", así como la opción de compartirlo por WhatsApp o correo a tu mecánico.'
              },
              {
                q: '¿Cómo ingresa un administrador al módulo de reabastecimiento y control de inventario?',
                a: 'Haz clic en el botón "Panel Admin" en el menú superior. En la pestaña "Inventario" podrás editar stock en caliente, reabastecer unidades con costo promedio y exportar la base completa en formato CSV para Excel.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-4 py-3 text-left font-semibold text-white flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-amber-400 font-mono">{activeFaq === idx ? '−' : '+'}</span>
                </button>
                {activeFaq === idx && (
                  <div className="px-4 pb-3.5 pt-1 text-slate-300 text-xs leading-relaxed border-t border-slate-800/60 bg-slate-950/60">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
