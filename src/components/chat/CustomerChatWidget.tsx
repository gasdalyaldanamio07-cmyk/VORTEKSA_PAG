import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Wrench, 
  Sparkles, 
  BookOpen, 
  PhoneCall, 
  PhoneOff, 
  Mic, 
  Volume2 
} from 'lucide-react';
import { VoiceCallOverlay } from './VoiceCallOverlay';

interface CustomerChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const CustomerChatWidget: React.FC<CustomerChatWidgetProps> = ({ isOpen, onToggle }) => {
  const { chatMessages, sendCustomerMessage, markChatRead, openToolGuide } = useApp();
  const [inputText, setInputText] = useState('');
  const [isVoiceCallActive, setIsVoiceCallActive] = useState(false);
  const [showCallOverlay, setShowCallOverlay] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const unreadMessagesCount = chatMessages.filter(m => !m.read && m.sender !== 'customer').length;
  const lastMessage = chatMessages[chatMessages.length - 1] || null;

  useEffect(() => {
    if (isOpen) {
      markChatRead();
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, chatMessages.length]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendCustomerMessage(inputText);
    setInputText('');
  };

  const handleQuickQuestion = (question: string) => {
    sendCustomerMessage(question);
  };

  const handleStartCall = () => {
    setIsVoiceCallActive(true);
    setShowCallOverlay(true);
  };

  const handleEndCall = () => {
    setIsVoiceCallActive(false);
    setShowCallOverlay(false);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-40 p-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-full shadow-2xl transition-all duration-200 hover:scale-105 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-amber-400"
          title="Chat y llamadas de voz con el asesor técnico"
          aria-label="Abrir asistente de soporte"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
          </div>
          {unreadMessagesCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white font-mono text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {unreadMessagesCount}
            </span>
          )}
        </button>
      )}

      {/* Floating Chat & Voice Call Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm sm:max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col h-[540px] max-h-[85vh] overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200 relative">
          
          {/* Full Screen Voice Call Overlay */}
          {isVoiceCallActive && showCallOverlay && (
            <VoiceCallOverlay
              isOpen={isVoiceCallActive && showCallOverlay}
              onEndCall={handleEndCall}
              onSendMessage={(text) => sendCustomerMessage(text)}
              lastMessage={lastMessage}
              onSwitchToChat={() => setShowCallOverlay(false)}
            />
          )}

          {/* Header */}
          <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-sm text-white flex items-center gap-1.5">
                  <span>Asesoría VORTEKSA</span>
                </h3>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  Voz & Texto en vivo
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Voice Call Trigger Button */}
              {!isVoiceCallActive ? (
                <button
                  onClick={handleStartCall}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer"
                  title="Iniciar llamada de voz en tiempo real con el asesor"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Llamar</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowCallOverlay(true)}
                  className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all animate-pulse"
                  title="Volver a la pantalla de llamada"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>En Llamada</span>
                </button>
              )}

              {/* Guide shortcut */}
              <button
                onClick={() => openToolGuide('asistente-chat')}
                className="p-1.5 text-slate-400 hover:text-amber-400 rounded-lg bg-slate-800/80 hover:bg-slate-800 transition-colors"
                title="Ver guía y funciones de esta herramienta de chat"
              >
                <BookOpen className="w-3.5 h-3.5" />
              </button>

              {/* Close Widget */}
              <button
                onClick={onToggle}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 hover:bg-slate-800 transition-colors"
                aria-label="Cerrar chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Call Ongoing Sticky Banner */}
          {isVoiceCallActive && !showCallOverlay && (
            <div className="bg-emerald-950/90 border-b border-emerald-800/80 px-3.5 py-1.5 flex items-center justify-between text-xs text-emerald-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-[11px]">Llamada activa (Voz y audio habilitados)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setShowCallOverlay(true)}
                  className="text-[11px] underline text-white font-medium hover:text-emerald-200"
                >
                  Ver llamada
                </button>
                <button
                  onClick={handleEndCall}
                  className="px-2 py-0.5 rounded bg-red-600 hover:bg-red-500 text-white font-bold text-[10px]"
                >
                  Colgar
                </button>
              </div>
            </div>
          )}

          {/* Quick Consultation Suggestions */}
          <div className="px-4 py-2 bg-slate-950/60 border-b border-slate-800/60 flex gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
            <button
              onClick={() => handleQuickQuestion('¿Cómo aplico mi cupón de 10% de descuento en la compra?')}
              className="px-2.5 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 rounded-full whitespace-nowrap transition-colors shrink-0"
            >
              10% de Descuento
            </button>
            <button
              onClick={() => handleQuickQuestion('¿Cómo puedo verificar si una pieza es compatible con mi auto?')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full whitespace-nowrap transition-colors shrink-0"
            >
              Compatibilidad
            </button>
            <button
              onClick={() => handleQuickQuestion('¿Cómo pago con Yape o Plin al 931978990?')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full whitespace-nowrap transition-colors shrink-0"
            >
              Yape / Plin
            </button>
            <button
              onClick={() => handleQuickQuestion('¿Cuál es el tiempo y costo de envío de mi pedido?')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full whitespace-nowrap transition-colors shrink-0"
            >
              Envíos & Entrega
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-slate-900 to-slate-950">
            {chatMessages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender !== 'customer' && (
                  <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-500 shrink-0 text-xs">
                    {msg.sender === 'bot' ? <Bot className="w-3.5 h-3.5" /> : <Wrench className="w-3.5 h-3.5" />}
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.sender === 'customer'
                      ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-sm shadow-md'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-tl-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span
                    className={`text-[9px] block text-right mt-1 font-mono ${
                      msg.sender === 'customer' ? 'text-slate-800' : 'text-slate-500'
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {msg.sender === 'customer' && (
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 text-xs">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Hotline Callout */}
          <div className="px-3 py-1.5 bg-slate-950/90 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400">Atención Telefónica Oficial:</span>
            <div className="flex items-center gap-2">
              <a
                href="tel:931978990"
                className="text-amber-400 hover:text-white font-bold flex items-center gap-1"
                title="Llamar al 931978990"
              >
                <span>📞 931978990</span>
              </a>
              <span className="text-slate-600">·</span>
              <a
                href="https://wa.me/51931978990?text=Hola%20VORTEKSA,%20deseo%20consultar%20sobre%20un%20repuesto"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-white font-bold"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            {/* Quick Mic Call Button */}
            <button
              type="button"
              onClick={handleStartCall}
              className="p-2 text-slate-400 hover:text-amber-400 bg-slate-900 border border-slate-750 hover:border-amber-500/40 rounded-xl transition-colors cursor-pointer shrink-0"
              title="Iniciar llamada de voz por micrófono"
              aria-label="Llamar por voz"
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              type="text"
              placeholder="Escribe tu consulta o habla por voz..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3.5 py-2 bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold rounded-xl transition-colors cursor-pointer shrink-0"
              aria-label="Enviar mensaje"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
