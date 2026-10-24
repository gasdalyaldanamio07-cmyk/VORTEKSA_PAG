import React, { useState, useEffect, useRef } from 'react';
import { 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  MessageSquare, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  Clock,
  Wrench,
  Bot
} from 'lucide-react';
import { ChatMessage } from '../../types';

interface VoiceCallOverlayProps {
  isOpen: boolean;
  onEndCall: () => void;
  onSendMessage: (text: string) => void;
  lastMessage: ChatMessage | null;
  onSwitchToChat: () => void;
}

export const VoiceCallOverlay: React.FC<VoiceCallOverlayProps> = ({
  isOpen,
  onEndCall,
  onSendMessage,
  lastMessage,
  onSwitchToChat
}) => {
  const [callState, setCallState] = useState<'connecting' | 'listening' | 'speaking' | 'processing'>('connecting');
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [assistantSpokenText, setAssistantSpokenText] = useState('¡Hola! Soy tu asesor virtual VORTEKSA. ¿En qué repuesto o consulta para tu auto puedo ayudarte hoy?');
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [waveHeights, setWaveHeights] = useState<number[]>([15, 25, 40, 60, 45, 30, 20]);

  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);
  const isMountedRef = useRef(true);

  // Initialize Call Duration Timer
  useEffect(() => {
    isMountedRef.current = true;
    if (isOpen) {
      setCallDuration(0);
      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }

    return () => {
      isMountedRef.current = false;
      if (timerRef.current) clearInterval(timerRef.current);
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, [isOpen]);

  // Voice Synthesizer (TTS)
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window) || isSpeakerMuted) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-PE';
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    // Pick Spanish voice if available
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find(v => v.lang.includes('es-PE') || v.lang.includes('es-ES') || v.lang.includes('es-MX') || v.lang.includes('es'));
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }

    utterance.onstart = () => {
      if (isMountedRef.current) {
        setCallState('speaking');
        setAssistantSpokenText(text);
      }
    };

    utterance.onend = () => {
      if (isMountedRef.current) {
        setCallState('listening');
        restartRecognition();
      }
    };

    utterance.onerror = () => {
      if (isMountedRef.current) {
        setCallState('listening');
        restartRecognition();
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  // Animate audio waveform bars when speaking or listening
  useEffect(() => {
    let animInterval: any = null;
    if (callState === 'speaking' || callState === 'listening') {
      animInterval = setInterval(() => {
        setWaveHeights(prev => prev.map(() => Math.floor(Math.random() * (callState === 'speaking' ? 55 : 35)) + 15));
      }, 120);
    } else {
      setWaveHeights([15, 18, 22, 20, 18, 16, 15]);
    }

    return () => {
      if (animInterval) clearInterval(animInterval);
    };
  }, [callState]);

  // Handle incoming assistant responses from main chat state
  useEffect(() => {
    if (!lastMessage) return;
    if (lastMessage.sender === 'bot' || lastMessage.sender === 'agent') {
      speakText(lastMessage.text);
    }
  }, [lastMessage?.id]);

  // Speech Recognition (STT) setup
  const restartRecognition = () => {
    if (isMuted || callState === 'speaking') return;
    try {
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } catch {
      // recognition might already be active
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    // First request microphone permission
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          setPermissionError(null);
          // Initial greeting speech
          setTimeout(() => {
            speakText('¡Hola! Bienvenido a la central de llamadas de VORTEKSA. Te escucho atentamente, ¿qué repuesto o duda técnica tienes?');
          }, 400);

          // Setup Web Speech Recognition
          const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
          if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = 'es-PE';

            recognition.onstart = () => {
              if (isMountedRef.current && callState !== 'speaking') {
                setCallState('listening');
              }
            };

            recognition.onresult = (event: any) => {
              let currentTranscript = '';
              for (let i = event.resultIndex; i < event.results.length; ++i) {
                currentTranscript += event.results[i][0].transcript;
              }
              setTranscript(currentTranscript);

              if (event.results[0].isFinal) {
                const finalQuery = currentTranscript.trim();
                if (finalQuery.length > 1) {
                  setCallState('processing');
                  onSendMessage(finalQuery);
                  setTranscript('');
                }
              }
            };

            recognition.onerror = (event: any) => {
              if (event.error === 'not-allowed') {
                setPermissionError('Permiso de micrófono denegado. Habilita el acceso en tu navegador.');
              }
              if (isMountedRef.current && callState !== 'speaking') {
                setCallState('listening');
              }
            };

            recognition.onend = () => {
              if (isMountedRef.current && callState === 'listening' && !isMuted) {
                // Resume listening if still in listening state
                setTimeout(() => {
                  restartRecognition();
                }, 300);
              }
            };

            recognitionRef.current = recognition;
          } else {
            // SpeechRecognition not supported in this specific browser engine
            setPermissionError('Tu navegador no soporta reconocimiento de voz continuo. Puedes usar las preguntas rápidas o el teclado.');
          }
        })
        .catch((err) => {
          setPermissionError('Se requiere autorización para activar el micrófono. Por favor permite el acceso en tu dispositivo.');
        });
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, [isOpen]);

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      restartRecognition();
    } else {
      setIsMuted(true);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    }
  };

  const toggleSpeaker = () => {
    if (isSpeakerMuted) {
      setIsSpeakerMuted(false);
    } else {
      setIsSpeakerMuted(true);
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    }
  };

  const handleSimulateQuestion = (text: string) => {
    setCallState('processing');
    onSendMessage(text);
  };

  // Format MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-30 bg-slate-950 flex flex-col justify-between p-5 text-white animate-in fade-in duration-200">
      {/* Call Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
            <Wrench className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white">Llamada de Voz VORTEKSA</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <span className="text-[11px] font-mono text-amber-400">
              {callDuration > 0 ? formatTime(callDuration) : 'Conectando...'}
            </span>
          </div>
        </div>

        <button
          onClick={onSwitchToChat}
          className="text-xs text-slate-400 hover:text-white px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg flex items-center gap-1.5 transition-colors"
          title="Ver chat de texto sin colgar"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Ver Texto</span>
        </button>
      </div>

      {/* Center Voice Visualizer */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-6 space-y-5">
        {/* Animated Avatar / Ring */}
        <div className="relative">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
            callState === 'speaking'
              ? 'bg-amber-500 text-slate-950 shadow-2xl shadow-amber-500/40 ring-4 ring-amber-500/30 scale-105'
              : callState === 'listening'
              ? 'bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/60 ring-4 ring-emerald-500/20'
              : 'bg-slate-900 text-slate-400 border border-slate-700'
          }`}>
            <Bot className="w-12 h-12" />
          </div>

          {/* Audio Wave Visualizer Bars */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-1 h-8">
            {waveHeights.map((h, i) => (
              <span
                key={i}
                className={`w-1 rounded-full transition-all duration-150 ${
                  callState === 'speaking' ? 'bg-amber-400' : callState === 'listening' ? 'bg-emerald-400' : 'bg-slate-700'
                }`}
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
        </div>

        {/* Status indicator */}
        <div className="space-y-1 pt-2">
          <h4 className="font-display font-bold text-sm text-white">
            {callState === 'speaking' ? 'El asesor está hablando...' :
             callState === 'listening' ? 'Te escucho... Habla ahora' :
             callState === 'processing' ? 'Consultando catálogo en tiempo real...' : 'Conectando llamada segura...'}
          </h4>
          <p className="text-[11px] text-slate-400 max-w-xs">
            {isMuted ? 'Tu micrófono está silenciado' : 'Habla con naturalidad por tu micrófono'}
          </p>
        </div>

        {/* Live Subtitle / Spoken Transcript Bubble */}
        <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 text-xs text-slate-200 text-left space-y-1.5 shadow-inner min-h-[75px] max-h-[110px] overflow-y-auto">
          {transcript ? (
            <div>
              <span className="text-[10px] font-mono text-emerald-400 block uppercase font-bold">Tu voz:</span>
              <p className="italic text-white font-medium">"{transcript}"</p>
            </div>
          ) : (
            <div>
              <span className="text-[10px] font-mono text-amber-400 block uppercase font-bold">Asesor Virtual:</span>
              <p className="text-slate-300 leading-relaxed text-[11px]">{assistantSpokenText}</p>
            </div>
          )}
        </div>

        {/* Permission Error / Warning */}
        {permissionError && (
          <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-800/60 text-[11px] text-red-300 flex items-start gap-2 text-left">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <span>{permissionError}</span>
            </div>
          </div>
        )}

        {/* Quick Voice Questions Pills (Can be tapped during call) */}
        <div className="w-full">
          <span className="text-[10px] font-mono text-slate-400 block mb-1.5 text-left">Preguntas sugeridas por voz:</span>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 text-[11px]">
            <button
              onClick={() => handleSimulateQuestion('¿Cómo verifico si una pieza es compatible con mi vehículo?')}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-full whitespace-nowrap border border-slate-800 hover:border-amber-500/40 transition-colors shrink-0"
            >
              Compatibilidad
            </button>
            <button
              onClick={() => handleSimulateQuestion('¿Cómo puedo pagar con Yape o Plin al 931978990?')}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-full whitespace-nowrap border border-slate-800 hover:border-amber-500/40 transition-colors shrink-0"
            >
              Pagar con Yape
            </button>
            <button
              onClick={() => handleSimulateQuestion('¿Tienen stock disponible para entrega inmediata hoy?')}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-full whitespace-nowrap border border-slate-800 hover:border-amber-500/40 transition-colors shrink-0"
            >
              Stock Inmediato
            </button>
            <button
              onClick={() => handleSimulateQuestion('¿Cuál es su horario de atención?')}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-full whitespace-nowrap border border-slate-800 hover:border-amber-500/40 transition-colors shrink-0"
            >
              Horarios
            </button>
          </div>
        </div>
      </div>

      {/* Call Controls Footer */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-around gap-4">
        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className={`p-3.5 rounded-full transition-all ${
            isMuted ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
          }`}
          title={isMuted ? 'Activar micrófono' : 'Silenciar micrófono'}
          aria-label={isMuted ? 'Activar micrófono' : 'Silenciar micrófono'}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* End Call Button (Big Red) */}
        <button
          onClick={onEndCall}
          className="p-4 bg-red-600 hover:bg-red-500 active:scale-95 text-white font-bold rounded-full shadow-xl shadow-red-600/30 transition-all flex items-center justify-center cursor-pointer"
          title="Finalizar llamada"
          aria-label="Finalizar llamada"
        >
          <PhoneOff className="w-6 h-6" />
        </button>

        {/* Speaker Volume Button */}
        <button
          onClick={toggleSpeaker}
          className={`p-3.5 rounded-full transition-all ${
            isSpeakerMuted ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
          }`}
          title={isSpeakerMuted ? 'Activar altavoz' : 'Silenciar altavoz'}
          aria-label={isSpeakerMuted ? 'Activar altavoz' : 'Silenciar altavoz'}
        >
          {isSpeakerMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};
