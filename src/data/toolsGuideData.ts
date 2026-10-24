export type ToolAudience = 'all' | 'customer' | 'workshop' | 'admin';

export interface ToolStep {
  stepNumber: number;
  title: string;
  instruction: string;
  actionTip: string;
  uiFocus: string;
  badge?: string;
}

export interface ToolCommonError {
  error: string;
  cause: string;
  solution: string;
}

export interface RelevantButton {
  label: string;
  iconName: string;
  location: string;
  purpose: string;
}

export interface ToolGuideItem {
  id: string;
  title: string;
  shortName: string;
  category: 'Comprador' | 'Taller Mecánico' | 'Administración ERP';
  audience: ToolAudience;
  badge: string;
  iconName: string;
  oneLiner: string;
  
  // 1. Qué es y para qué sirve
  purpose: string;
  features: string[];
  problemsSolved: string[];
  benefits: string[];
  
  // 2. Información requerida y resultados
  requiredInfo: string[];
  expectedResults: string[];
  
  // 3. Ejemplos, recomendaciones y limitaciones
  practicalExample: {
    scenario: string;
    actionTaken: string;
    outcome: string;
  };
  recommendations: string[];
  limitations: string[];
  
  // 4. Guía de uso paso a paso
  stepByStepGuide: {
    howToAccess: string;
    optionsToSelect: string;
    dataToInput: string;
    howToExecute: string;
    howToInterpretResults: string;
    howToExportOrSave: string;
  };
  
  // 5. Botones y apartados relevantes
  relevantButtons: RelevantButton[];
  
  // 6. Errores frecuentes y soluciones
  commonErrors: ToolCommonError[];
  
  // 7. Consejos útiles y buenas prácticas
  bestPractices: string[];
  
  // 8. Pasos del tutorial interactivo
  tutorialSteps: ToolStep[];
  
  // Acción directa para probar la herramienta
  liveActionType: 'scroll_vehicle' | 'scroll_catalog' | 'open_product' | 'open_cart' | 'open_checkout' | 'open_chat' | 'open_admin_inventory' | 'open_admin_alerts' | 'open_admin_analytics' | 'open_admin_orders' | 'scroll_tracking';
}

export const TOOLS_GUIDE_DATA: ToolGuideItem[] = [
  {
    id: 'garaje-virtual',
    title: 'Garaje Virtual & Buscador por Vehículo',
    shortName: 'Garaje Virtual',
    category: 'Comprador',
    audience: 'all',
    badge: 'Compatibilidad 100% Precisa',
    iconName: 'Car',
    oneLiner: 'Filtra repuestos mecánicos exactos seleccionando la marca, modelo y año de tu automóvil.',
    purpose: 'Esta herramienta permite a clientes particulares y talleres mecánicos filtrar de inmediato todo el catálogo de repuestos de VORTEKSA para mostrar únicamente los componentes mecánicos, eléctricos y estéticos que son 100% compatibles con su coche específico.',
    features: [
      'Selector desplegable de marcas automotrices líderes (Toyota, Honda, Nissan, Mazda, Volkswagen, Ford, BMW, Chevrolet, Hyundai, Subaru, etc.).',
      'Campo predictivo de modelo de auto (ej. Corolla, Civic, Golf, RX-7, Supra, F-150).',
      'Filtro por año de fabricación del vehículo para contemplar cambios de generación o motorización.',
      'Sincronización automática con la etiqueta de compatibilidad visible en cada tarjeta de producto.',
      'Botón de restablecimiento rápido para volver al catálogo universal en un clic.'
    ],
    problemsSolved: [
      'Elimina el riesgo de comprar piezas incorrectas que no encajen en el chasis, motor o sistema de frenado.',
      'Ahorra horas buscando números de parte en catálogos impresos o foros técnicos.',
      'Previene devoluciones costosas y retrasos en las reparaciones del taller.'
    ],
    benefits: [
      'Cero dudas de compatibilidad al comprar.',
      'Visualización prioritaria de piezas de ajuste directo (OEM y Aftermarket de alta gama).',
      'Filtro persistente durante toda la sesión de navegación del usuario.'
    ],
    requiredInfo: [
      'Marca del vehículo (selección en lista).',
      'Modelo exacto del coche (ej. "Civic", "Golf", "Supra").',
      'Año de fabricación del auto (opcional pero muy recomendado para años de cambio de línea, ej. "2021").'
    ],
    expectedResults: [
      'El catálogo muestra exclusivamente repuestos certificados para tu vehículo.',
      'En cada ficha de producto se ilumina el sello verde "Compatible con tu auto".',
      'Contador en tiempo real de repuestos coincidentes disponibles en almacén.'
    ],
    practicalExample: {
      scenario: 'Un dueño de un Toyota Corolla 2020 necesita cambiar las pastillas de freno y amortiguadores delanteros.',
      actionTaken: 'Selecciona "Toyota" en Marca, escribe "Corolla" en Modelo y "2020" en Año; luego pulsa «Filtrar».',
      outcome: 'El catálogo descarta piezas incompatibles y destaca el kit de pastillas cerámicas Brembo X-Line y coilovers que encajan a la perfección.'
    },
    recommendations: [
      'Si tienes una versión deportiva o importada (ej. Civic Si, Type R o Golf GTI), especifícalo en el modelo.',
      'Si no encuentras tu modelo específico, usa el Asistente Virtual en el chat para que un técnico consulte equivalencias OEM.'
    ],
    limitations: [
      'No distingue modificaciones estructurales o swaps de motor no estándar realizados previamente en el vehículo.',
      'Las piezas catalogadas como "Universales" (como filtros de cono o líquidos) se mostrarán siempre que no contradigan la especificación del motor.'
    ],
    stepByStepGuide: {
      howToAccess: 'Se encuentra en la parte superior del catálogo de la tienda o mediante el acceso directo en el Hero.',
      optionsToSelect: 'Despliega el menú de "Marca del Vehículo" y elige tu fabricante.',
      dataToInput: 'Ingresa en las cajas de texto tu "Modelo" y tu "Año" de fabricación.',
      howToExecute: 'Haz clic en el botón amarillo con icono de embudo «Filtrar».',
      howToInterpretResults: 'Observa la cantidad de piezas filtradas en la barra de resultados. Si alguna pieza es universal o de aplicación exacta, tendrá un indicador verde de compatibilidad.',
      howToExportOrSave: 'La configuración queda guardada en tu sesión activa. Si te registraste en la tienda, tu vehículo queda enlazado permanentemente a tu perfil.'
    },
    relevantButtons: [
      {
        label: 'Filtrar',
        iconName: 'Filter',
        location: 'Barra del Garaje Virtual',
        purpose: 'Ejecuta la validación cruzada y actualiza la cuadrícula de repuestos.'
      },
      {
        label: 'Restablecer Filtro (Icono recargar)',
        iconName: 'RefreshCw',
        location: 'Costado del botón Filtrar',
        purpose: 'Limpia los campos y devuelve la vista a todas las marcas del inventario.'
      }
    ],
    commonErrors: [
      {
        error: 'El catálogo aparece vacío tras pulsar Filtrar',
        cause: 'Se escribió un modelo con errores ortográficos o un año que no coincide con la base actual.',
        solution: 'Prueba escribiendo únicamente el nombre base del modelo (ej. "Civic" en vez de "Civic EX Sedan 1.5T Turbo") o deja el año vacío.'
      },
      {
        error: 'No encuentro la marca de mi automóvil',
        cause: 'La marca seleccionada no está entre las 15 marcas principales precargadas.',
        solution: 'Elige "Todas las Marcas" y usa el buscador general por palabra clave o consulta por el chat técnico.'
      }
    ],
    bestPractices: [
      'Aplica el Garaje Virtual antes de agregar artículos al carrito para evitar agregar piezas equivocadas.',
      'Revisa la pestaña "Vehículos Compatibles" dentro de la Ficha Técnica para verificar motorizaciones soportadas.'
    ],
    tutorialSteps: [
      {
        stepNumber: 1,
        title: 'Localiza el Garaje Virtual',
        instruction: 'En la sección del catálogo principal, ubica el módulo con el icono de coche "Buscador por Vehículo / Garaje Virtual".',
        actionTip: 'Está justo debajo del banner principal de bienvenida.',
        uiFocus: 'Módulo Garaje Virtual'
      },
      {
        stepNumber: 2,
        title: 'Selecciona tu Fabricante y Modelo',
        instruction: 'Elige tu marca (ej. Honda, Toyota, Volkswagen) y escribe el modelo de tu auto en la casilla correspondiente.',
        actionTip: 'Puedes incluir el año para una precisión quirúrgica.',
        uiFocus: 'Campos Marca, Modelo y Año'
      },
      {
        stepNumber: 3,
        title: 'Haz clic en «Filtrar»',
        instruction: 'Presiona el botón ámbar «Filtrar». La lista de repuestos se actualizará en milisegundos con las piezas compatibles.',
        actionTip: 'Notarás la etiqueta verde de verificación en cada producto.',
        uiFocus: 'Botón Filtrar'
      },
      {
        stepNumber: 4,
        title: 'Explora y Compra con Confianza',
        instruction: 'Abre cualquier pieza resultante; todas están garantizadas para calzar en tu vehículo sin adaptaciones complejas.',
        actionTip: 'Si deseas ver todo el inventario de nuevo, pulsa el botón de recarga.',
        uiFocus: 'Resultados del Catálogo'
      }
    ],
    liveActionType: 'scroll_vehicle'
  },
  {
    id: 'catalogo-inteligente',
    title: 'Catálogo Inteligente & Filtros Multicriterio',
    shortName: 'Catálogo de Repuestos',
    category: 'Comprador',
    audience: 'all',
    badge: 'Inventario en Tiempo Real',
    iconName: 'Boxes',
    oneLiner: 'Explora por categorías técnicas, ordena por precio o stock y busca por número de parte o SKU.',
    purpose: 'Permite buscar, explorar y comparar repuestos de alta gama organizados en 6 categorías automotrices fundamentales, con control de ordenamiento y visualización del stock real disponible en bodegas.',
    features: [
      'Búsqueda en tiempo real por nombre de producto, marca comercial, código SKU y especificación técnica.',
      '6 categorías técnicas: Frenos, Suspensión, Motor & Turbo, Iluminación, Filtros & Aceites, Accesorios.',
      'Selector de ordenamiento por Destacados, Menor Precio, Mayor Precio o Mayor Stock disponible.',
      'Contador reactivo de piezas encontradas según los filtros activos.',
      'Integración con precios con descuento del 10% automático.'
    ],
    problemsSolved: [
      'Evita perderse entre cientos de repuestos no relacionados.',
      'Permite ubicar una pieza en menos de 3 segundos conociendo solo su código SKU o marca.',
      'Muestra de antemano si hay existencias reales antes de cotizar.'
    ],
    benefits: [
      'Navegación ultra veloz sin recargas de página.',
      'Transparencia total en precios unitarios y disponibilidad.',
      'Diseño visual limpio con fotografías de alta resolución tomadas en estudio técnico.'
    ],
    requiredInfo: [
      'Criterio de búsqueda (palabra clave, SKU como "BRK-4091", marca como "Brembo", o categoría).'
    ],
    expectedResults: [
      'Cuadrícula limpia de tarjetas de producto con foto, marca, categoría, precio oficial y stock disponible.',
      'Acceso con un clic a la ficha técnica completa o adición inmediata al carrito.'
    ],
    practicalExample: {
      scenario: 'Un preparador de autos deportivos busca aceite sintético de competición.',
      actionTaken: 'Presiona la pestaña "Filtros & Aceites" o escribe "Motul 300V" en el buscador del Hero.',
      outcome: 'Aparece el bidón de aceite sintético Motul 300V 5W-40 con precio unitario, stock en bodega y botón para añadir.'
    },
    recommendations: [
      'Usa el código SKU si tienes la caja o el manual de parte del fabricante para una coincidencia exacta.',
      'Combina el filtro de categoría con el Garaje Virtual para encontrar, por ejemplo, solo "Frenos" para tu modelo.'
    ],
    limitations: [
      'Los precios mostrados son en moneda local y se actualizan según las promociones activas.'
    ],
    stepByStepGuide: {
      howToAccess: 'Haz clic en "Catálogo" en el menú superior o desplázate a la sección central.',
      optionsToSelect: 'Selecciona una de las pestañas superiores: Todos, Frenos, Suspensión, Motor & Turbo, etc.',
      dataToInput: 'Escribe en el campo de búsqueda si deseas afinar por marca o palabra clave.',
      howToExecute: 'La búsqueda es instantánea al escribir o al presionar cada pestaña.',
      howToInterpretResults: 'Cada tarjeta indica la marca en texto sutil, el nombre comercial, el precio destacado y la disponibilidad en almacén.',
      howToExportOrSave: 'Puedes agregar las piezas deseadas al carrito para guardarlas durante tu visita.'
    },
    relevantButtons: [
      {
        label: 'Pestañas de Categoría (Frenos, Suspensión, etc.)',
        iconName: 'SlidersHorizontal',
        location: 'Barra superior del catálogo',
        purpose: 'Filtra el listado según el subsistema mecánico del auto.'
      },
      {
        label: 'Selector de Orden',
        iconName: 'ArrowUpDown',
        location: 'Extremo derecho de la barra',
        purpose: 'Reordena por precio ascendente/descendente o volumen de stock.'
      },
      {
        label: 'Ver Detalles',
        iconName: 'Eye',
        location: 'En cada tarjeta de producto',
        purpose: 'Despliega la ficha técnica con medidas e ingeniería del repuesto.'
      }
    ],
    commonErrors: [
      {
        error: 'No se visualizan productos en la categoría',
        cause: 'Puede haber una búsqueda de texto residual en el buscador del Hero o un filtro de vehículo muy restrictivo.',
        solution: 'Borra el texto de la caja de búsqueda o pulsa «Restablecer Filtros» para recuperar todo el inventario.'
      }
    ],
    bestPractices: [
      'Revisa siempre el número de reseñas y calificación de otros mecánicos en cada tarjeta de producto.',
      'Aprovecha el ordenamiento por "Mayor Stock" si necesitas pedidos al por mayor para tu taller.'
    ],
    tutorialSteps: [
      {
        stepNumber: 1,
        title: 'Explora las Categorías Técnicas',
        instruction: 'Haz clic en las pestañas como "Frenos", "Suspensión" o "Motor & Turbo" para concentrarte en el sistema que necesitas.',
        actionTip: 'La pestaña "Todos" muestra la totalidad de repuestos.',
        uiFocus: 'Barra de pestañas de categorías'
      },
      {
        stepNumber: 2,
        title: 'Ordena según tu Presupuesto o Urgencia',
        instruction: 'Despliega el selector de orden y elige "Menor Precio" o "Mayor Stock Disponible".',
        actionTip: 'Te ayudará a encontrar repuestos de entrega inmediata.',
        uiFocus: 'Menú desplegable de ordenamiento'
      },
      {
        stepNumber: 3,
        title: 'Abre la Ficha o Añade al Carrito',
        instruction: 'Pasa el cursor sobre el producto; puedes pulsar "Añadir" para compra directa o "Ver Detalles" para consultar especificaciones.',
        actionTip: 'El contador del carrito en el navbar se actualizará de inmediato.',
        uiFocus: 'Tarjetas de producto'
      }
    ],
    liveActionType: 'scroll_catalog'
  },
  {
    id: 'ficha-tecnica',
    title: 'Ficha Técnica & Verificador de Especificaciones',
    shortName: 'Ficha Técnica',
    category: 'Taller Mecánico',
    audience: 'all',
    badge: 'Ingeniería & Medidas',
    iconName: 'FileText',
    oneLiner: 'Consulta medidas milimétricas, materiales de fabricación, torque y compatibilidad de chasis.',
    purpose: 'Ofrece al mecánico y al conductor exigente una radiografía técnica completa del repuesto: materiales, rangos de temperatura, certificaciones de calidad, ubicación física en bodega y listado de autos compatibles.',
    features: [
      'Visor fotográfico de ultra alta definición con ampliación.',
      'Tabla de especificaciones de ingeniería (material, dureza, paso de rosca, peso, norma de homologación).',
      'Listado exhaustivo de marcas, modelos y años homologados.',
      'Indicador de stock en tiempo real con pasillo y bodega de almacenamiento (ej. Bodega Central A1).',
      'Selector de cantidad con verificación de stock máximo para prevenir pedidos sin existencia.'
    ],
    problemsSolved: [
      'Elimina la incertidumbre sobre dimensiones, roscas o tolerancias térmicas.',
      'Permite verificar si una pieza aftermarket sustituye sin problemas a la original de agencia.',
      'Informa la ubicación física en almacén para despachos urgentes de taller.'
    ],
    benefits: [
      'Decisión de compra informada y profesional.',
      'Soporte técnico documentado con datos del fabricante.',
      'Cálculo instantáneo de precio con el 10% de descuento VIP aplicado.'
    ],
    requiredInfo: [
      'Ninguna previa; se accede haciendo clic sobre cualquier tarjeta o botón "Ver Detalles" en la tienda.'
    ],
    expectedResults: [
      'Modal interactivo con ficha técnica descargable en la mente del usuario, galería fotográfica y botón de compra directa.'
    ],
    practicalExample: {
      scenario: 'Un taller mecánico debe confirmar el diámetro exterior de un disco de freno y si es de aleación ventilada.',
      actionTaken: 'Abre la ficha del "Kit de Discos Ventilados Ranurados VORTEKSA Apex-6".',
      outcome: 'Verifica en la tabla de especificaciones: Diámetro 330mm, Espesor 28mm, Aleación de Alto Carbono G3000, 5 birlos PCD 5x114.3.'
    },
    recommendations: [
      'Verifica siempre el par de apriete (torque) sugerido en las especificaciones antes de instalar la pieza.',
      'Comprueba que el stock mostrado sea suficiente si necesitas reemplazar piezas por par (ej. ambos amortiguadores).'
    ],
    limitations: [
      'Si un modelo de vehículo no figura en la lista pero comparte plataforma (chasis hermano), consulta al chat de soporte.'
    ],
    stepByStepGuide: {
      howToAccess: 'Haz clic en la imagen o en el botón "Ver Detalles" de cualquier producto del catálogo o promociones.',
      optionsToSelect: 'Navega entre la descripción técnica, la tabla de especificaciones y la lista de autos compatibles.',
      dataToInput: 'Ajusta la cantidad deseada usando los botones (+) y (-) del selector de unidades.',
      howToExecute: 'Haz clic en «Añadir al Carrito» para cargar las unidades seleccionadas.',
      howToInterpretResults: 'Si la cantidad seleccionada supera el stock disponible, el sistema lo alertará automáticamente.',
      howToExportOrSave: 'La pieza pasa a tu carrito de compras donde queda retenida durante tu proceso de cotización.'
    },
    relevantButtons: [
      {
        label: 'Añadir al Carrito',
        iconName: 'ShoppingBag',
        location: 'Pie de la ficha técnica',
        purpose: 'Agrega las unidades deseadas a tu cesta de compra activa.'
      },
      {
        label: 'Selector de Cantidad (+ / -)',
        iconName: 'PlusMinus',
        location: 'Costado del botón Añadir',
        purpose: 'Permite seleccionar 1 o más unidades respetando el stock disponible.'
      },
      {
        label: 'Cerrar (X)',
        iconName: 'X',
        location: 'Esquina superior derecha',
        purpose: 'Cierra el modal y regresa a la navegación del catálogo.'
      }
    ],
    commonErrors: [
      {
        error: 'El botón "Añadir al Carrito" aparece deshabilitado',
        cause: 'El repuesto se encuentra actualmente con stock 0 (Agotado).',
        solution: 'Comunícate por el chat para solicitar una orden de pedido urgente o restock prioritario al administrador.'
      }
    ],
    bestPractices: [
      'Compara el número de parte OEM de tu repuesto original con la descripción de la ficha para máxima tranquilidad.',
      'Guarda el código SKU para cualquier consulta telefónica con la línea directa 931978990.'
    ],
    tutorialSteps: [
      {
        stepNumber: 1,
        title: 'Abre la Ficha de Cualquier Pieza',
        instruction: 'Haz clic en la tarjeta del repuesto que te interese en el catálogo.',
        actionTip: 'Se abrirá una ventana modal con todos los detalles.',
        uiFocus: 'Modal de Ficha Técnica'
      },
      {
        stepNumber: 2,
        title: 'Revisa las Especificaciones y Materiales',
        instruction: 'Inspecciona la tabla: material, acabado, medidas y tolerancia técnica.',
        actionTip: 'Garantiza que la pieza cumplirá con el estándar de tu taller.',
        uiFocus: 'Tabla de Especificaciones'
      },
      {
        stepNumber: 3,
        title: 'Verifica la Compatibilidad de tu Modelo',
        instruction: 'Desplázate al bloque "Vehículos Compatibles" para asegurar que tu año y motorización están listados.',
        actionTip: 'Si está en la lista, el calce es 100% garantizado.',
        uiFocus: 'Bloque de Vehículos Compatibles'
      },
      {
        stepNumber: 4,
        title: 'Elige Cantidad y Agrega a tu Orden',
        instruction: 'Usa los botones (+) o (-) y pulsa «Añadir al Carrito». Verás un mensaje de confirmación inmediato.',
        actionTip: 'Podrás continuar comprando o pasar directo al pago.',
        uiFocus: 'Botón Añadir al Carrito'
      }
    ],
    liveActionType: 'open_product'
  },
  {
    id: 'carrito-descuento',
    title: 'Carrito de Compras & Gestor de Cupón 10% OFF',
    shortName: 'Carrito & Cupones',
    category: 'Comprador',
    audience: 'all',
    badge: 'Cupón BIENVENIDO10',
    iconName: 'ShoppingBag',
    oneLiner: 'Administra tus repuestos, aplica descuentos automáticos y revisa el desglose fiscal transparente.',
    purpose: 'Concentra los artículos seleccionados, permite ajustar unidades, ingresar cupones promocionales (incluyendo el 10% de bienvenida para clientes registrados) y calcula en tiempo real subtotal, impuestos y flete gratuito.',
    features: [
      'Cajón lateral deslizante accesible desde cualquier punto de la página.',
      'Control de cantidades en vivo con actualización automática de importes.',
      'Validador de cupones de descuento (ej. "BIENVENIDO10" otorga 10% de rebaja en el total).',
      'Desglose transparente: Subtotal, Descuento otorgado, IVA 16% y Flete (Gratis a partir de $150).',
      'Acceso rápido a registrar vehículo para desbloquear beneficios VIP adicionales.'
    ],
    problemsSolved: [
      'Elimina cargos sorpresa al momento de pagar; todos los impuestos y envíos están claros desde el primer paso.',
      'Permite corregir cantidades o eliminar piezas con un solo clic.',
      'Garantiza que los clientes obtengan el mejor precio posible mediante códigos oficiales.'
    ],
    benefits: [
      'Ahorro instantáneo del 10% en el importe de la compra.',
      'Flete gratuito garantizado si el pedido supera los $150 USD.',
      'Persistencia en memoria local para no perder tus productos si recargas la página.'
    ],
    requiredInfo: [
      'Al menos 1 producto añadido.',
      'Código de cupón (opcional, aunque BIENVENIDO10 ya viene precargado para tu comodidad).'
    ],
    expectedResults: [
      'Resumen financiero exacto y botón directo para proceder a la Pasarela de Pago Seguro.'
    ],
    practicalExample: {
      scenario: 'Un cliente compra un kit de suspensión de $450 USD.',
      actionTaken: 'Abre el carrito y verifica que el cupón BIENVENIDO10 está activo.',
      outcome: 'Recibe un descuento de -$45.00 USD, envío gratis ($0.00) y el total se recalcula al instante con total transparencia.'
    },
    recommendations: [
      'Si tu subtotal está cerca de los $150 USD, añade un líquido de frenos o filtro para aprovechar el flete gratis.',
      'Verifica que la cantidad coincida con la necesidad de tu vehículo (ej. 4 bujías en motores de 4 cilindros).'
    ],
    limitations: [
      'No se pueden combinar múltiples cupones de descuento simultáneos en una sola transacción.'
    ],
    stepByStepGuide: {
      howToAccess: 'Haz clic en el icono de la bolsa de compras en la esquina superior derecha del navbar.',
      optionsToSelect: 'Usa los botones (+) o (-) para cambiar unidades, o el icono de papelera para eliminar un ítem.',
      dataToInput: 'Si tienes un cupón adicional, escríbelo en la casilla "Código de Cupón" y pulsa "Aplicar".',
      howToExecute: 'Haz clic en el botón ámbar «Proceder al Pago Seguro».',
      howToInterpretResults: 'Revisa las líneas de Subtotal, Descuento, IVA y Total para asegurar que todo cuadre.',
      howToExportOrSave: 'Tu cesta se conserva automáticamente en el navegador gracias a la sincronización con almacenamiento local.'
    },
    relevantButtons: [
      {
        label: 'Proceder al Pago Seguro',
        iconName: 'CreditCard',
        location: 'Pie del Cajón del Carrito',
        purpose: 'Abre la pasarela de checkout para ingresar datos de entrega y pago.'
      },
      {
        label: 'Aplicar Cupón',
        iconName: 'Tag',
        location: 'Módulo de cupón promocional',
        purpose: 'Valida el código y aplica la deducción porcentual al total.'
      },
      {
        label: 'Vaciar Carrito',
        iconName: 'Trash2',
        location: 'Encabezado del cajón',
        purpose: 'Elimina todos los productos de la cesta de una sola vez.'
      }
    ],
    commonErrors: [
      {
        error: 'El cupón no aplica el descuento',
        cause: 'El código se ingresó con espacios adicionales o en minúsculas no reconocidas.',
        solution: 'Ingresa "BIENVENIDO10" en mayúsculas sin espacios o pulsa el banner superior para activarlo.'
      }
    ],
    bestPractices: [
      'Regístrate en la tienda antes del pago para recibir seguimiento por correo y WhatsApp de tu pedido.',
      'Revisa que las cantidades de piezas simétricas (izq/der) sean correctas.'
    ],
    tutorialSteps: [
      {
        stepNumber: 1,
        title: 'Abre tu Carrito de Compras',
        instruction: 'Pulsa el icono de bolsa en la esquina superior derecha. Verás el indicador numérico de ítems.',
        actionTip: 'Se desplegará el panel lateral sin salir de la página.',
        uiFocus: 'Icono del Carrito en Navbar'
      },
      {
        stepNumber: 2,
        title: 'Verifica tus Productos y Cantidades',
        instruction: 'Comprueba el nombre del repuesto, marca y costo unitario. Modifica las unidades si es necesario.',
        actionTip: 'El subtotal se recalculará automáticamente.',
        uiFocus: 'Lista de ítems en el carrito'
      },
      {
        stepNumber: 3,
        title: 'Confirma tu Cupón de Descuento',
        instruction: 'Asegúrate de que la línea verde "Descuento VIP (10%)" esté activa restando dinero a tu favor.',
        actionTip: 'Si no está activo, escribe BIENVENIDO10 y pulsa Aplicar.',
        uiFocus: 'Línea de Descuento Promocional'
      },
      {
        stepNumber: 4,
        title: 'Haz clic en «Proceder al Pago Seguro»',
        instruction: 'Presiona el botón para ir a la pantalla final de despacho y selección de método de pago.',
        actionTip: 'Tus productos quedan reservados temporalmente.',
        uiFocus: 'Botón Proceder al Pago'
      }
    ],
    liveActionType: 'open_cart'
  },
  {
    id: 'pasarela-checkout',
    title: 'Pasarela de Checkout & Comprobante Digital',
    shortName: 'Checkout & Pagos',
    category: 'Comprador',
    audience: 'all',
    badge: 'Pago Seguro en Perú',
    iconName: 'CreditCard',
    oneLiner: 'Completa tu compra con Yape, Plin, tarjetas Visa/Mastercard o transferencia bancaria en Perú con comprobante oficial.',
    purpose: 'Facilita la formalización segura del pedido con recopilación de datos de entrega, selección entre los principales métodos de pago en Perú (Yape, Plin, Tarjetas y Transferencias BCP/BBVA), generación de orden única y emisión de comprobante digital válido para garantía.',
    features: [
      'Formulario de envío completo: Nombre, Correo, Teléfono, Dirección, Ciudad y Código Postal.',
      'Soporte oficial para Yape BCP (al número 931978990 y código QR) con acreditación al segundo.',
      'Soporte oficial para Plin (Interbank, BBVA, Scotiabank, BanBif) sin comisión interbancaria.',
      'Pasarela para Tarjetas de Crédito y Débito (Visa, Mastercard, Amex, Diners) con cifrado SSL 256 bits y 3D Secure.',
      'Cuentas bancarias directas en Soles y Dólares (BCP, BBVA, Interbank) con CCI para transferencias.',
      'Generación automática de número de orden oficial (ej. VOR-74921) con fecha y hora exacta.',
      'Actualización inmediata y automática del stock en el ERP para evitar sobreventas.',
      'Comprobante digital con botón de copia de tracking, descarga e impresión oficial.'
    ],
    problemsSolved: [
      'Evita procesos de compra engorrosos o lentos.',
      'Garantiza que el almacén sepa a qué auto va destinada la pieza antes de embalar.',
      'Proporciona un recibo digital inmediato con respaldo legal y de garantía.'
    ],
    benefits: [
      'Transacción 100% segura con validación de datos en tiempo real.',
      'Comprobante listo para imprimir o enviar por mensaje a tu mecánico o chofer.',
      'Integración con la línea de atención para seguimiento telefónico al 931978990.'
    ],
    requiredInfo: [
      'Nombre y apellido del receptor.',
      'Correo electrónico para el envío del recibo.',
      'Teléfono de contacto para el transportista.',
      'Dirección física completa de despacho y ciudad.'
    ],
    expectedResults: [
      'Orden formalizada en estado "Procesando".',
      'Pantalla de éxito con número de rastreo VOR-XXXXX, desglose pagado y botón de descarga.'
    ],
    practicalExample: {
      scenario: 'Un cliente particular paga con Tarjeta de Débito un kit de faros Bi-LED.',
      actionTaken: 'Rellena sus datos de envío en el Checkout, elige "Tarjeta de Débito" y presiona «Confirmar y Pagar».',
      outcome: 'Aparece la pantalla verde de orden confirmada #VOR-89102 con opción de descargar su comprobante en PDF/texto y enviarlo por WhatsApp.'
    },
    recommendations: [
      'Verifica dos veces el código postal y número telefónico para evitar retrasos con la paquetería.',
      'Si pagas por Transferencia Bancaria, anota el número de orden generado en el concepto de la transferencia.'
    ],
    limitations: [
      'Las transferencias bancarias requieren verificación del área de finanzas (1-2 horas hábiles).'
    ],
    stepByStepGuide: {
      howToAccess: 'Desde el Carrito de Compras, pulsa el botón «Proceder al Pago Seguro».',
      optionsToSelect: 'Elige tu método de pago preferido: Tarjeta de Crédito, Débito, PayPal o Transferencia.',
      dataToInput: 'Ingresa tu información de contacto y domicilio de entrega en los campos requeridos.',
      howToExecute: 'Haz clic en el botón ámbar «Confirmar Pedido y Pagar».',
      howToInterpretResults: 'La pantalla cambiará al Comprobante de Confirmación con el número de orden asignado.',
      howToExportOrSave: 'Utiliza el botón «Copiar Número de Orden» o «Descargar Comprobante» para guardarlo en tu dispositivo.'
    },
    relevantButtons: [
      {
        label: 'Confirmar Pedido y Pagar',
        iconName: 'ShieldCheck',
        location: 'Final del formulario de Checkout',
        purpose: 'Procesa el pago, descuenta el stock de almacén y crea la orden en el ERP.'
      },
      {
        label: 'Selector de Método de Pago',
        iconName: 'DollarSign',
        location: 'Sección media del formulario',
        purpose: 'Permite alternar entre Tarjeta, PayPal o Transferencia Bancaria.'
      },
      {
        label: 'Copiar Orden / Descargar Resumen',
        iconName: 'Download',
        location: 'Pantalla de confirmación de pedido',
        purpose: 'Guarda o comparte el recibo digital con tu mecánico o administración.'
      }
    ],
    commonErrors: [
      {
        error: 'El formulario no me deja avanzar al pago',
        cause: 'Falta completar algún campo obligatorio marcado con asterisco (ej. Teléfono o Dirección).',
        solution: 'Revisa los campos resaltados y complétalos con información válida.'
      }
    ],
    bestPractices: [
      'Guarda tu número de orden VOR-XXXXX para rastrear el envío por el chat o por WhatsApp al 931978990.',
      'Indica referencias claras de tu domicilio (ej. "Taller frente a la estación de servicio").'
    ],
    tutorialSteps: [
      {
        stepNumber: 1,
        title: 'Ingresa tus Datos de Despacho',
        instruction: 'Escribe tu nombre completo, correo, teléfono y dirección exacta donde recibirás los repuestos.',
        actionTip: 'Si deseas, incluye los datos de tu auto para una última revisión.',
        uiFocus: 'Formulario de Envío'
      },
      {
        stepNumber: 2,
        title: 'Selecciona la Forma de Pago',
        instruction: 'Haz clic sobre el método deseado: Tarjeta de Crédito, Débito, PayPal o Transferencia SPEI.',
        actionTip: 'Todas las opciones cuentan con cifrado de seguridad SSL.',
        uiFocus: 'Pestañas de Método de Pago'
      },
      {
        stepNumber: 3,
        title: 'Presiona «Confirmar Pedido»',
        instruction: 'Revisa el total con tu descuento del 10% aplicado y haz clic en el botón de pago.',
        actionTip: 'El sistema descontará las unidades del inventario en tiempo real.',
        uiFocus: 'Botón de Confirmación'
      },
      {
        stepNumber: 4,
        title: 'Conserva tu Comprobante de Compra',
        instruction: 'Copia tu número de orden generado (VOR-XXXXX) o descárgalo para cualquier seguimiento posterior.',
        actionTip: 'Puedes consultar el estado de tu despacho en cualquier momento.',
        uiFocus: 'Pantalla de Recibo'
      }
    ],
    liveActionType: 'open_checkout'
  },
  {
    id: 'asistente-chat',
    title: 'Asistente Virtual con Llamadas de Voz & Chat en Tiempo Real',
    shortName: 'Asistente & Llamadas de Voz',
    category: 'Comprador',
    audience: 'all',
    badge: 'Voz & Texto en Vivo',
    iconName: 'MessageSquareText',
    oneLiner: 'Comunícate por mensajes de texto o mediante llamadas de voz en tiempo real con respuestas naturales audibles.',
    purpose: 'Canal de comunicación omnicanal que permite interactuar mediante chat de texto tradicional o activar una llamada de voz interactiva en tiempo real. Utiliza el micrófono con tu autorización para transcribir tus consultas y responde mediante síntesis de voz natural para una experiencia rápida y manos libres.',
    features: [
      'Llamadas de voz en tiempo real con botón directo «Llamar» y «Finalizar Llamada».',
      'Activación de micrófono con autorización segura del usuario en el navegador.',
      'Respuestas habladas con voz natural en español y subtítulos automáticos en pantalla.',
      'Visualizador interactivo de ondas de audio y temporizador de duración de llamada.',
      'Controles de llamada: silenciar micrófono (Mute), silenciar altavoz y alternar a vista de chat de texto.',
      'Widget flotante visible en todas las pantallas con indicador de mensajes no leídos.',
      'Historial sincronizado entre voz y texto para no perder ninguna recomendación técnica.'
    ],
    problemsSolved: [
      'Permite consultar compatibilidades mientras el mecánico o usuario tiene las manos ocupadas en el taller.',
      'Elimina la lentitud de escribir textos largos desde teléfonos móviles.',
      'Resuelve dudas inmediatas sobre repuestos, métodos de pago en Perú (Yape/Plin) y garantías.'
    ],
    benefits: [
      'Atención personalizada disponible los 7 días de la semana.',
      'Respuestas certeras con datos oficiales de inventario y bodega.',
      'Posibilidad de solicitar un contacto telefónico inmediato con un asesor.'
    ],
    requiredInfo: [
      'Tu consulta, pregunta o número de orden que deseas rastrear.'
    ],
    expectedResults: [
      'Respuesta técnica clara y recomendaciones de productos con enlaces directos en el chat.'
    ],
    practicalExample: {
      scenario: 'Un usuario tiene dudas sobre si las bujías de iridio que eligió vienen pre-calibradas de fábrica.',
      actionTaken: 'Abre el chat y escribe: "¿Las bujías vienen calibradas para motor 2.0 turbo?".',
      outcome: 'El asesor le confirma que vienen con luz de 0.8mm calibrada de origen y listas para instalación inmediata.'
    },
    recommendations: [
      'Indica la marca, modelo, año y motor de tu vehículo en tu primer mensaje para recibir una respuesta más rápida.',
      'Si tienes una urgencia de taller, menciona tu código postal para cotizar envío express en el mismo día.'
    ],
    limitations: [
      'El chat en vivo atiende consultas de catálogo; para diagnósticos mecánicos profundos se recomienda acudir al taller técnico.'
    ],
    stepByStepGuide: {
      howToAccess: 'Haz clic en el botón flotante ámbar con icono de mensaje en la esquina inferior derecha.',
      optionsToSelect: 'Pulsa uno de los botones de consulta rápida (Descuento, Compatibilidad, Envíos) o escribe tu mensaje.',
      dataToInput: 'Escribe tu consulta en el campo de texto inferior.',
      howToExecute: 'Presiona la tecla Enter o pulsa el botón con icono de avión de papel «Enviar».',
      howToInterpretResults: 'Lee las respuestas del asesor; los mensajes del equipo técnico aparecen con el avatar oficial VORTEKSA.',
      howToExportOrSave: 'Tu historial se guarda automáticamente para que no pierdas la conversación si cierras el navegador.'
    },
    relevantButtons: [
      {
        label: 'Botón Flotante de Chat',
        iconName: 'MessageSquare',
        location: 'Esquina inferior derecha de la pantalla',
        purpose: 'Abre y minimiza la ventana de conversación.'
      },
      {
        label: 'Enviar Mensaje',
        iconName: 'Send',
        location: 'Interior de la caja de chat',
        purpose: 'Transmite tu mensaje al bot y al panel de agentes de VORTEKSA.'
      },
      {
        label: 'Consultas Rápidas',
        iconName: 'Sparkles',
        location: 'Barra superior del chat',
        purpose: 'Dispara preguntas frecuentes con un solo toque.'
      }
    ],
    commonErrors: [
      {
        error: 'El mensaje no se envía al presionar el botón',
        cause: 'El campo de texto está completamente vacío o contiene únicamente espacios.',
        solution: 'Escribe al menos una palabra o pregunta y vuelve a pulsar Enviar.'
      }
    ],
    bestPractices: [
      'Consulta las políticas de garantía de 12 meses directamente a través del chat.',
      'Ten a mano tu número de chasis (VIN) si tu vehículo fue importado de otro mercado.'
    ],
    tutorialSteps: [
      {
        stepNumber: 1,
        title: 'Abre el Asistente Técnico',
        instruction: 'Pulsa el círculo ámbar con el icono de chat en la parte inferior derecha.',
        actionTip: 'Se abrirá la ventana de soporte técnico.',
        uiFocus: 'Botón flotante de chat'
      },
      {
        stepNumber: 2,
        title: 'Usa una Pregunta Rápida o Escribe',
        instruction: 'Prueba haciendo clic en "10% de Descuento" o "Compatibilidad" para ver cómo responde el sistema.',
        actionTip: 'Obtendrás una respuesta explicativa en segundos.',
        uiFocus: 'Sugerencias de consulta rápida'
      },
      {
        stepNumber: 3,
        title: 'Formula tu Pregunta Personalizada',
        instruction: 'Escribe tu duda en el campo inferior (ej. "¿Tienen stock para enviar hoy a mi ciudad?").',
        actionTip: 'Presiona Enter para enviar.',
        uiFocus: 'Campo de texto de entrada'
      },
      {
        stepNumber: 4,
        title: 'Recibe Orientación Técnica',
        instruction: 'El especialista te indicará las piezas idóneas y te orientará para completar tu pedido.',
        actionTip: 'Puedes minimizar el chat sin perder el hilo de la charla.',
        uiFocus: 'Hilo de mensajes'
      }
    ],
    liveActionType: 'open_chat'
  },
  {
    id: 'erp-inventario',
    title: 'Gestor de Inventario & Reabastecimiento ERP',
    shortName: 'Gestión de Inventario ERP',
    category: 'Administración ERP',
    audience: 'admin',
    badge: 'Módulo Administrativo Pro',
    iconName: 'Wrench',
    oneLiner: 'Edita stock en tiempo real, registra entradas de almacén con cálculo de costo promedio y exporta a CSV.',
    purpose: 'Herramienta integral para jefes de almacén y dueños de negocio. Permite auditar el inventario físico, editar cantidades de stock en caliente, dar de alta nuevos repuestos con fotos comprimidas, registrar compras a proveedores y exportar la base de datos a Excel/CSV.',
    features: [
      'Tabla completa de inventario con búsqueda por SKU, nombre, marca o pasillo de bodega.',
      'Filtros por estado de stock: Todos, Stock Normal, Stock Bajo y Agotados.',
      'Edición rápida de stock en un clic con botones directos (+1 / -1) o edición numérica.',
      'Modal de Reabastecimiento Profesional con cálculo de nuevo costo promedio ponderado, registro de factura y notas.',
      'Modal de creación y edición de repuestos con especificaciones técnicas personalizables y validación de vehículos.',
      'Exportación completa a formato CSV descargable para auditorías fiscales o sistemas contables externos.'
    ],
    problemsSolved: [
      'Termina con los descuadres entre el inventario físico y la tienda virtual.',
      'Evita vender productos sin existencia real en bodega.',
      'Simplifica las compras a distribuidores con control de costo unitario.'
    ],
    benefits: [
      'Control total de los activos de la empresa.',
      'Actualización inmediata que impacta la tienda virtual al instante.',
      'Historial de ubicación física de cada pieza en bodega (ej. Bodega Norte C3).'
    ],
    requiredInfo: [
      'SKU o nombre del producto a auditar.',
      'Cantidad de unidades a reabastecer o nuevo stock.',
      'Costo unitario de compra (para el cálculo de costo ponderado).'
    ],
    expectedResults: [
      'Inventario actualizado en el acto en tienda y administración.',
      'Resolución de alertas críticas de stock bajo si se superó el umbral mínimo.'
    ],
    practicalExample: {
      scenario: 'Llega un lote de 20 unidades del Turbocharger Garrett GT2860R al almacén.',
      actionTaken: 'El administrador busca "TUR-1082" en la tabla, pulsa «Reabastecer», ingresa 20 unidades, el costo de factura y guarda.',
      outcome: 'El stock aumenta a 24 unidades, el costo promedio se recalcula y en la tienda virtual los clientes ya pueden comprar las nuevas unidades.'
    },
    recommendations: [
      'Realiza una exportación a CSV al final de cada jornada como respaldo de auditoría.',
      'Mantén siempre actualizado el campo "Ubicación en Bodega" para que el personal de empaque localice las piezas velozmente.'
    ],
    limitations: [
      'Requiere permisos de administrador (activo por defecto para la sesión de Ursula Fernandez).'
    ],
    stepByStepGuide: {
      howToAccess: 'Haz clic en el botón "Panel Admin" en la barra superior de navegación.',
      optionsToSelect: 'Selecciona la pestaña "Inventario" en el menú de navegación del ERP.',
      dataToInput: 'Usa la barra de búsqueda para ubicar el producto por SKU o nombre.',
      howToExecute: 'Haz clic en «Reabastecer» para sumar unidades con costo, o en «Editar» para cambiar datos generales.',
      howToInterpretResults: 'Observa el color del indicador de stock: Verde (Normal), Amarillo (Bajo) o Rojo (Agotado).',
      howToExportOrSave: 'Haz clic en el botón superior «Exportar CSV» para descargar la planilla en formato compatible con Excel.'
    },
    relevantButtons: [
      {
        label: 'Reabastecer (+)',
        iconName: 'PackagePlus',
        location: 'Columna de acciones en la tabla',
        purpose: 'Abre el modal para ingresar nuevas unidades de proveedor con costo unitario.'
      },
      {
        label: 'Nuevo Producto',
        iconName: 'Plus',
        location: 'Barra superior de acciones',
        purpose: 'Despliega el formulario para crear un nuevo repuesto en el catálogo.'
      },
      {
        label: 'Exportar CSV',
        iconName: 'Download',
        location: 'Cabecera del panel administrativo',
        purpose: 'Genera y descarga un archivo .csv con la totalidad de productos, precios y stocks.'
      }
    ],
    commonErrors: [
      {
        error: 'No se guardan los cambios de stock',
        cause: 'Se ingresó un valor negativo o no numérico en el campo de existencias.',
        solution: 'Ingresa números enteros positivos (0 o mayores).'
      }
    ],
    bestPractices: [
      'Establece umbrales mínimos realistas (por ejemplo, mínimo 3 unidades para piezas de alta rotación como pastillas).',
      'Verifica el estado de las alertas tras cada reabastecimiento.'
    ],
    tutorialSteps: [
      {
        stepNumber: 1,
        title: 'Entra al Panel Administrativo',
        instruction: 'Haz clic en el botón "Panel Admin" ubicado en el extremo derecho del Navbar.',
        actionTip: 'Se abrirá la consola ERP de VORTEKSA.',
        uiFocus: 'Botón Panel Admin'
      },
      {
        stepNumber: 2,
        title: 'Filtra por Piezas con Stock Bajo',
        instruction: 'En la pestaña "Inventario", pulsa el filtro "Stock Bajo" para identificar productos que requieren compra urgente.',
        actionTip: 'Verás las piezas marcadas en color ámbar o rojo.',
        uiFocus: 'Filtros de estado de stock'
      },
      {
        stepNumber: 3,
        title: 'Ejecuta un Reabastecimiento',
        instruction: 'Haz clic en el botón "Reabastecer" de cualquier repuesto, escribe las nuevas unidades y confirma.',
        actionTip: 'El stock aumentará de inmediato y la alerta se resolverá.',
        uiFocus: 'Modal de Reabastecimiento'
      },
      {
        stepNumber: 4,
        title: 'Descarga tu Reporte en CSV',
        instruction: 'Pulsa «Exportar CSV» en la cabecera superior para guardar el inventario en tu computadora.',
        actionTip: 'Compatible con Microsoft Excel y Google Sheets.',
        uiFocus: 'Botón Exportar CSV'
      }
    ],
    liveActionType: 'open_admin_inventory'
  },
  {
    id: 'alertas-stock',
    title: 'Monitor de Alertas Automáticas de Stock Bajo',
    shortName: 'Alertas de Stock',
    category: 'Administración ERP',
    audience: 'admin',
    badge: 'Prevención de Quiebres',
    iconName: 'AlertTriangle',
    oneLiner: 'Detección automática de repuestos críticos y advertencias antes de que se agoten en bodega.',
    purpose: 'Monitorea de forma continua los niveles de inventario de cada SKU contra su umbral mínimo configurado. Cuando las existencias descienden peligrosamente, genera alertas clasificadas en Críticas (stock en cero o 1 unidad) y Advertencias (por debajo del mínimo).',
    features: [
      'Clasificación automática por severidad: Crítica (Rojo) y Advertencia (Ámbar).',
      'Contador de alertas pendientes visible en el Navbar mediante insignia numérica roja.',
      'Botón de reorden o reposición con 1 solo clic que abre el modal de reabastecimiento precargado.',
      'Opción de descartar o marcar como resuelta la alerta una vez gestionada la compra.',
      'Filtros por categoría para atender primero los repuestos de mayor demanda.'
    ],
    problemsSolved: [
      'Elimina las ventas perdidas por quiebre de stock inesperado.',
      'Avisa con anticipación antes de que un producto quede en cero.',
      'Permite programar pedidos a proveedores con base en datos reales.'
    ],
    benefits: [
      'Tranquilidad operativa y continuidad de servicio para talleres clientes.',
      'Priorización clara de compras urgentes según el nivel de severidad.',
      'Reducción drástica del tiempo de respuesta ante alta demanda.'
    ],
    requiredInfo: [
      'Ninguna previa; el sistema audita de forma automática el inventario cada vez que se vende una pieza.'
    ],
    expectedResults: [
      'Panel depurado con alertas resueltas y bodegas provistas con stock óptimo.'
    ],
    practicalExample: {
      scenario: 'Queda solo 1 unidad del filtro de aire cónico de alto flujo en bodega.',
      actionTaken: 'El monitor genera una alerta "Crítica". El administrador la visualiza en el panel y pulsa «Reordenar».',
      outcome: 'Añade 15 unidades de reposición y la alerta desaparece automáticamente de la bandeja de pendientes.'
    },
    recommendations: [
      'Revisa la pestaña de alertas a primera hora de la mañana para coordinar pedidos con proveedores.',
      'Ajusta el umbral mínimo de piezas importadas a un número mayor debido a tiempos de flete internacional más largos.'
    ],
    limitations: [
      'Las alertas se generan con base en el stock físico registrado en el sistema.'
    ],
    stepByStepGuide: {
      howToAccess: 'Ingresa al Panel Admin y pulsa en la pestaña "Alertas de Stock" (o haz clic en el badge rojo del Navbar).',
      optionsToSelect: 'Revisa las alertas agrupadas por severidad (Crítica / Advertencia).',
      dataToInput: 'Al pulsar «Reordenar», ingresa las unidades solicitadas a tu distribuidor.',
      howToExecute: 'Haz clic en «Guardar Reabastecimiento» para liquidar la alerta o en «Descartar» si no deseas comprar más de esa pieza.',
      howToInterpretResults: 'Una alerta en estado "Reordenado" o descartada disminuye el contador del Navbar.',
      howToExportOrSave: 'Las alertas quedan sincronizadas en la base de datos local del sistema.'
    },
    relevantButtons: [
      {
        label: 'Reordenar / Reponer',
        iconName: 'PackageCheck',
        location: 'Costado de cada tarjeta de alerta',
        purpose: 'Abre el modal de compra con el SKU y nombre del repuesto preseleccionados.'
      },
      {
        label: 'Descartar Alerta',
        iconName: 'CheckCircle',
        location: 'En cada alerta pendiente',
        purpose: 'Archiva la alerta temporalmente si el producto está en discontinuación voluntaria.'
      }
    ],
    commonErrors: [
      {
        error: 'Aparecen demasiadas alertas de advertencia',
        cause: 'El umbral mínimo de stock se configuró demasiado alto en relación con el ritmo de venta.',
        solution: 'Edita el producto y reduce el umbral mínimo a un número acorde a la demanda semanal.'
      }
    ],
    bestPractices: [
      'Mantén en cero las alertas críticas para garantizar despacho en 24 horas a tus clientes.',
      'Utiliza la información de alertas para negociar mejores precios por volumen con mayoristas.'
    ],
    tutorialSteps: [
      {
        stepNumber: 1,
        title: 'Accede a la Pestaña de Alertas',
        instruction: 'En el Panel Admin, selecciona la pestaña "Alertas de Stock".',
        actionTip: 'Verás las piezas con stock inferior al umbral mínimo.',
        uiFocus: 'Pestaña Alertas de Stock'
      },
      {
        stepNumber: 2,
        title: 'Identifica las Alertas Críticas',
        instruction: 'Las piezas en rojo tienen 0 o 1 unidad disponible. Son de máxima prioridad.',
        actionTip: 'Evita perder ventas de repuestos clave.',
        uiFocus: 'Tarjetas de Alerta Crítica'
      },
      {
        stepNumber: 3,
        title: 'Pulsa «Reordenar»',
        instruction: 'Haz clic en el botón de reorden de la pieza afectada.',
        actionTip: 'Se abrirá el modal para ingresar las nuevas unidades.',
        uiFocus: 'Botón Reordenar'
      },
      {
        stepNumber: 4,
        title: 'Confirma la Entrada al Almacén',
        instruction: 'Guarda la entrada. El inventario se actualizará y la alerta pasará a estar resuelta.',
        actionTip: 'Tu catálogo volverá a mostrar existencias plenas.',
        uiFocus: 'Resolución de Alerta'
      }
    ],
    liveActionType: 'open_admin_alerts'
  },
  {
    id: 'analitica-finanzas',
    title: 'Módulo de Analítica & Finanzas de Bodega',
    shortName: 'Analítica & Finanzas',
    category: 'Administración ERP',
    audience: 'admin',
    badge: 'KPIs & Rentabilidad',
    iconName: 'TrendingUp',
    oneLiner: 'Visualiza la valuación de tu inventario al costo y precio de venta, margen bruto y rotación por categoría.',
    purpose: 'Entrega una radiografía financiera en tiempo real del valor del inventario almacenado en bodega. Calcula la valuación total a precio de venta y al costo de adquisición, el margen bruto proyectado, total de unidades físicas y distribución de capital por categoría automotriz.',
    features: [
      'Tarjeta KPI: Valuación del Inventario a precio de venta (Retail Value).',
      'Tarjeta KPI: Costo Total de adquisición en bodega (Inventory Cost).',
      'Tarjeta KPI: Margen Bruto estimado en porcentaje y en dinero.',
      'Tarjeta KPI: Total de unidades físicas custodiadas en bodega.',
      'Gráfico de barras de distribución de capital por categoría técnica.',
      'Cálculo de ingresos brutos generados por órdenes confirmadas.'
    ],
    problemsSolved: [
      'Elimina la incertidumbre sobre cuánto dinero hay inmovilizado en partes automotrices.',
      'Permite saber con precisión qué categoría genera mayor margen de ganancia.',
      'Facilita la toma de decisiones para inversiones de capital y compras de temporada.'
    ],
    benefits: [
      'Visión financiera ejecutiva instantánea sin necesidad de software contable adicional.',
      'Métricas en números tabulares limpios y precisos.',
      'Monitoreo del retorno de inversión en tiempo real conforme se registran ventas.'
    ],
    requiredInfo: [
      'Ninguna; se calcula de manera automática a partir de los datos de stock, costo unitario y precio de venta de cada SKU.'
    ],
    expectedResults: [
      'Gráficas y tarjetas de rendimiento listas para presentación directiva o toma de decisiones.'
    ],
    practicalExample: {
      scenario: 'La gerencia necesita conocer el capital total invertido en suspensión y frenos para cierre de mes.',
      actionTaken: 'Abre la pestaña "Métricas & Analítica" del Panel Admin.',
      outcome: 'Consulta que el costo total de bodega es de $28,450 USD con un valor de venta de $49,800 USD y un margen bruto del 42.8%.'
    },
    recommendations: [
      'Compara el margen bruto entre categorías; si una tiene margen menor al 30%, considera renegociar con el proveedor.',
      'Monitorea periódicamente las categorías con mayor capital retenido para evitar sobrestock.'
    ],
    limitations: [
      'El margen proyectado asume la venta del 100% del stock a los precios de lista vigentes.'
    ],
    stepByStepGuide: {
      howToAccess: 'Ingresa al Panel Admin y selecciona la pestaña "Métricas & Analítica".',
      optionsToSelect: 'Examina las 4 tarjetas principales de KPIs en la fila superior.',
      dataToInput: 'No requiere ingreso de datos.',
      howToExecute: 'Las métricas se recalculan automáticamente cada vez que se crea, edita o vende un producto.',
      howToInterpretResults: 'Verde indica margen saludable (>35%); revisa la barra de distribución para identificar categorías líderes.',
      howToExportOrSave: 'Usa la función de exportar CSV de la pestaña Inventario para profundizar en hojas de cálculo externas.'
    },
    relevantButtons: [
      {
        label: 'Pestaña Métricas & Analítica',
        iconName: 'TrendingUp',
        location: 'Barra de pestañas del Panel Admin',
        purpose: 'Cambia a la vista de análisis financiero e indicadores clave.'
      }
    ],
    commonErrors: [
      {
        error: 'El margen bruto aparece negativo o muy bajo',
        cause: 'Algún producto fue registrado con un costo de compra superior a su precio de venta.',
        solution: 'Revisa la tabla de inventario y corrige el precio de venta o el costo unitario del SKU correspondiente.'
      }
    ],
    bestPractices: [
      'Registra fielmente el costo de compra en cada reabastecimiento para mantener métricas fidedignas.',
      'Usa los datos de analítica para definir qué piezas incluir en las promociones con descuento.'
    ],
    tutorialSteps: [
      {
        stepNumber: 1,
        title: 'Dirígete a la Pestaña de Analítica',
        instruction: 'En el Panel Admin, pulsa en "Métricas & Analítica".',
        actionTip: 'Se cargarán los indicadores económicos del negocio.',
        uiFocus: 'Pestaña Analítica'
      },
      {
        stepNumber: 2,
        title: 'Analiza la Valuación y el Margen',
        instruction: 'Revisa las cifras de "Valuación Total", "Costo en Bodega" y "Margen Bruto Proyectado".',
        actionTip: 'Los números se presentan en formato tabular alineado.',
        uiFocus: 'Tarjetas KPI de finanzas'
      },
      {
        stepNumber: 3,
        title: 'Examina la Distribución por Categoría',
        instruction: 'Observa la gráfica de barras para identificar qué línea de repuestos concentra el mayor valor.',
        actionTip: 'Te indicará dónde está tu mayor potencial de negocio.',
        uiFocus: 'Gráficos de barras por categoría'
      }
    ],
    liveActionType: 'open_admin_analytics'
  },
  {
    id: 'gestor-pedidos',
    title: 'Gestor de Pedidos & Estados de Envío ERP',
    shortName: 'Gestión de Pedidos',
    category: 'Administración ERP',
    audience: 'admin',
    badge: 'Logística & Despacho',
    iconName: 'Truck',
    oneLiner: 'Supervisa órdenes de compra, actualiza estados logísticos en tiempo real e inspecciona recibos de clientes.',
    purpose: 'Permite al personal de operaciones gestionar los pedidos entrantes desde su recepción hasta su entrega física. Facilita la transición de estados (Procesando $\\to$ En Camino $\\to$ Entregado $\\to$ Cancelado), la inspección del desglose de productos y la consulta de datos del cliente.',
    features: [
      'Tabla de órdenes con número oficial (VOR-XXXXX), fecha y hora, nombre del cliente y total pagado.',
      'Selector de cambio de estado en un clic: "Procesando", "En Camino", "Entregado" y "Cancelado".',
      'Modal de inspección con desglose de ítems, precio, descuento aplicado, método de pago y dirección de despacho.',
      'Indicador de método de pago utilizado (Tarjeta, PayPal o Transferencia).',
      'Integración con datos del vehículo del cliente para verificar compatibilidad antes del despacho.'
    ],
    problemsSolved: [
      'Elimina extravíos de pedidos y confusiones en las etapas de preparación.',
      'Permite responder a clientes al instante sobre el estatus exacto de su encomienda.',
      'Organiza la logística de empaque con la lista de piezas exacta de cada compra.'
    ],
    benefits: [
      'Trazabilidad completa de cada venta realizada.',
      'Información de contacto directa para coordinar entregas complejas o envíos foráneos.',
      'Control de cancelaciones con devolución lógica de piezas al inventario.'
    ],
    requiredInfo: [
      'Número de orden o nombre del comprador para realizar búsquedas o modificaciones.'
    ],
    expectedResults: [
      'Órdenes despachadas puntualmente con clientes satisfechos y registro histórico auditable.'
    ],
    practicalExample: {
      scenario: 'La paquetería recoge un pedido con amortiguadores y discos.',
      actionTaken: 'El encargado entra a "Gestión de Pedidos", busca la orden #VOR-98214 y cambia el estado de "Procesando" a "En Camino".',
      outcome: 'El registro se actualiza y el cliente puede consultar que su paquete ya está en tránsito.'
    },
    recommendations: [
      'Verifica el estado del pago antes de cambiar la orden a "En Camino", especialmente en transferencias bancarias.',
      'Añade notas en el pedido si el cliente solicitó entrega en un horario específico.'
    ],
    limitations: [
      'Una orden marcada como "Cancelado" no puede revertirse a "Entregado" sin una nueva confirmación.'
    ],
    stepByStepGuide: {
      howToAccess: 'Ingresa al Panel Admin y selecciona la pestaña "Pedidos".',
      optionsToSelect: 'Localiza la orden en la tabla y usa el menú desplegable de "Estado" para actualizar su avance.',
      dataToInput: 'Ninguno obligatorio; puedes pulsar "Ver Detalle" para ver los productos ordenados.',
      howToExecute: 'Selecciona "En Camino" cuando la paquetería tenga el paquete o "Entregado" al confirmarse la recepción.',
      howToInterpretResults: 'El color de la insignia cambia: Azul (Procesando), Ámbar (En Camino), Verde (Entregado) o Rojo (Cancelado).',
      howToExportOrSave: 'El estado se guarda inmediatamente en la base de datos local del sistema.'
    },
    relevantButtons: [
      {
        label: 'Selector de Estado (Procesando / En Camino / Entregado)',
        iconName: 'RefreshCw',
        location: 'Columna de estado en la tabla de pedidos',
        purpose: 'Actualiza el progreso logístico de la orden.'
      },
      {
        label: 'Ver Detalle de Orden',
        iconName: 'Eye',
        location: 'Columna de acciones',
        purpose: 'Muestra los repuestos individuales comprados y la dirección del cliente.'
      }
    ],
    commonErrors: [
      {
        error: 'No se encuentra la orden de un cliente',
        cause: 'El cliente realizó la compra con un correo o nombre diferente al que proporciona para la consulta.',
        solution: 'Pide al cliente su número de orden con formato VOR-XXXXX para buscarlo directamente.'
      }
    ],
    bestPractices: [
      'Cambia a "En Camino" tan pronto como se genere la guía de mensajería.',
      'Revisa los datos del vehículo incluidos por el cliente para certificar que el pedido sea congruente.'
    ],
    tutorialSteps: [
      {
        stepNumber: 1,
        title: 'Accede a la Pestaña Pedidos',
        instruction: 'En el Panel Admin, abre la pestaña "Pedidos". Verás el listado cronológico de compras.',
        actionTip: 'Se muestran las más recientes primero.',
        uiFocus: 'Pestaña de Pedidos'
      },
      {
        stepNumber: 2,
        title: 'Inspecciona los Artículos de la Orden',
        instruction: 'Haz clic en el botón de ver detalle para verificar qué piezas deben empacarse.',
        actionTip: 'Incluye fotos, SKUs y cantidades solicitadas.',
        uiFocus: 'Detalle de Orden'
      },
      {
        stepNumber: 3,
        title: 'Actualiza el Estado a «En Camino»',
        instruction: 'Una vez embalado el paquete, cambia el selector a "En Camino".',
        actionTip: 'Queda registrado el avance logístico.',
        uiFocus: 'Selector de Estado Logístico'
      }
    ],
    liveActionType: 'open_admin_orders'
  }
];
