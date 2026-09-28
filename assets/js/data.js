/* =========================================================
   CONTENIDO EDITABLE DE LA PRESENTACIÓN
   Todo lo que dicen los juegos, la línea de tiempo y la pirámide está aquí.
   Fuentes principales: El Tiempo, El País Cali, Portafolio, La República,
   El Colombiano, Blu Radio, S&P Global / blog Colombina (ver "src" en cada ficha).
   ========================================================= */
window.DATA = {


/* Ruleta (sin uso por ahora: no hay escenas con juego) */
PICKER: [{ e: '🎲', t: 'quien quiera participar' }],

/* Línea de tiempo: checks bajo cada año + ficha al tocar */
TIMELINE: [
  { y: '1918', t: 'Todo empieza con caña', i: '🌾', c: '#FFC72C',
    checks: ['Hernando Caicedo muele caña en el Valle', 'Nace el Ingenio Riopaila', 'Azúcar propia: la materia prima del dulce'],
    m: { lead: 'Antes de los dulces hubo azúcar. Hernando Caicedo empezó a moler caña en el predio que se convertiría en el <b>Ingenio Riopaila</b>, en el Valle del Cauca.',
      tiles: [{ i: '🌾', b: 'Caña de azúcar', s: 'El Valle del Cauca es la gran región azucarera de Colombia.' },
        { i: '🏭', b: 'Ingenio Riopaila', s: 'La base industrial de la familia Caicedo.' },
        { i: '💡', b: 'La idea', s: '¿Y si en vez de vender solo azúcar, la convertimos en dulces?' }],
      why: 'Tener el azúcar “en casa” le dio a Colombina una ventaja de costo y de calidad desde el primer día.',
      src: 'El Tiempo; El País Cali.' } },

  { y: '1927', t: 'Nace Colombina', i: '🍬', c: '#E4002B',
    checks: ['Fundada por Hernando Caicedo', 'Dulces con azúcar del Valle y frutas tropicales', 'Del azúcar a una marca con nombre propio'],
    m: { lead: 'Hernando Caicedo funda Colombina para darle <b>valor agregado</b> al azúcar: en vez de venderla como materia prima, la convierte en dulces.',
      tiles: [{ i: '📅', b: '1927', s: 'Hace 99 años. En 2027 cumple 100.' },
        { i: '📍', b: 'Valle del Cauca', s: 'Junto al Ingenio Riopaila.' },
        { i: '🌙', b: 'Nombre y logo', s: 'La niña sobre la media luna, inspirada en una opereta italiana.' }],
      gloss: [{ t: 'Valor agregado', d: 'Transformar algo básico (azúcar) en un producto que vale más (un dulce con marca).' }],
      why: 'Es el paso de materia prima a MARCA: ya no vendían azúcar, vendían “Colombina”.',
      src: 'El Tiempo; El País Cali.' } },

  { y: '1946', t: 'La 2.ª generación', i: '👔', c: '#2E48B8',
    checks: ['Jaime H. Caicedo, hijo del fundador, toma el mando', 'La dirige cerca de 40 años', 'Industrializa y mira al exterior'],
    m: { lead: '<b>Jaime Hernando Caicedo</b>, hijo de don Hernando, asume la empresa y la dirige cerca de 40 años. Murió en 1987.',
      people: [{ i: '👴', n: 'Hernando Caicedo', r: 'Fundador · 1927' }, { i: '👨', n: 'Jaime H. Caicedo', r: 'Hijo · desde 1946', hl: true }, { i: '🧑', n: 'César A. Caicedo', r: 'Nieto · desde 2002' }],
      tiles: [{ i: '⚙️', b: 'Industrialización', s: 'Maquinaria moderna y producción en serie.' },
        { i: '✈️', b: 'Visión internacional', s: 'Con él llegan la primera exportación (1965) y el Bon Bon Bum (1970).' }],
      why: 'Pasa de negocio familiar a empresa industrial: más producción = más presencia = más reconocimiento.',
      src: 'El Tiempo; El País Cali.' } },

  { y: '1965', t: 'Primera exportación', i: '✈️', c: '#00A6D6',
    checks: ['Primer destino: Estados Unidos', 'La marca sale de Colombia', 'Hoy ~40% de sus ventas son exportaciones'],
    m: { lead: 'Colombina vende por primera vez fuera del país, en <b>Estados Unidos</b>. Hoy casi la mitad de su negocio viene de afuera.',
      tiles: [{ i: '🗽', b: 'EE. UU.', s: 'Su primer mercado internacional.' },
        { i: '📦', b: '~40%', s: 'De sus ventas de 2024 fueron exportaciones (US$335 millones).' },
        { i: '🌎', b: '70 a 90 países', s: 'Según la fuente, hoy llega a entre 70 y 90 países.' }],
      why: 'Si una marca compite afuera, adentro se confía más en ella: alimenta los JUICIOS (credibilidad).',
      src: 'El Tiempo (resultados 2024, publicado en 2025).' } },

  { y: '1970', t: 'Nace Bon Bon Bum', prod: 'bonbonbum', c: '#E4002B',
    checks: ['Se fabrica en la nueva planta de La Paila (1968)', 'Bombón por fuera, chicle por dentro', 'Colombina lo presenta como pionero'],
    m: { lead: 'Jaime H. Caicedo lanza el Bon Bon Bum con maquinaria traída de Holanda, en la planta de <b>La Paila</b> (Zarzal, Valle), abierta en 1968.',
      tiles: [{ i: '🏭', b: '1968 · La Paila', s: 'Su gran planta de dulces, en Zarzal, Valle del Cauca.' },
        { i: '🍭', b: 'La novedad', s: 'El chicle y las chupetas ya existían. La idea fue unirlos: chupeta por fuera, chicle por dentro.' },
        { i: '⚖️', b: '¿El primero del mundo?', s: 'Colombina lo afirma y la prensa lo repite, pero no hay una certificación independiente. Su rival gringo, el Blow Pop, salió en 1973.' }],
      why: 'Un producto estrella hace famosa a la marca que lo respalda: el éxito del Bon Bon Bum reforzó el nombre Colombina.',
      src: 'El Tiempo; El País Cali; historia de Charms Blow Pop (lanzado en 1973).' } },

  { y: '1975–79', t: 'Coffee Delight y Nucita', prod: 'coffee_delight', c: '#8A5230',
    checks: ['1975: Coffee Delight, caramelo de café', '1979: Nucita, crema de chocolate', 'La marca ya no depende de un solo producto'],
    m: { lead: 'Llegan dos íconos que siguen vigentes, y Colombina deja de depender de un solo producto.',
      tiles: [{ i: '☕', b: '1975 · Coffee Delight', s: 'Caramelo duro de café: la identidad cafetera en un dulce.' },
        { i: '🍫', b: '1979 · Nucita', s: 'Crema de chocolate de dos sabores.' },
        { i: '🧩', b: 'Portafolio', s: 'Más productos = más momentos para consumir la marca.' }],
      why: 'Varias marcas fuertes con el mismo respaldo multiplican la presencia de Colombina.',
      src: 'El Tiempo; El País Cali.' } },

  { y: '80s–1991', t: 'Más allá del dulce', i: '🥫', c: '#1FBF75',
    checks: ['Fines de los 80: compra Splendid (galletas)', '1991: compra La Constancia (salsas)', 'Distribuye Van Camp’s, aunque no es suya'],
    m: { lead: '<b>Diversificar</b> = no poner todos los huevos en la misma canasta. Colombina entra a categorías nuevas usando la misma red que ya llegaba a las tiendas.',
      tiles: [{ i: '🍪', b: 'Splendid', s: 'Fines de los 80: su primera entrada a las galletas.' },
        { i: '🥫', b: 'La Constancia', s: '1991: salsas y conservas (mayonesa, salsa de tomate, mostaza).' },
        { i: '🐟', b: 'Van Camp’s', s: 'No es de Colombina: es de Seatech. Colombina es su distribuidor exclusivo desde hace décadas.' },
        { i: '🚚', b: 'La clave', s: 'El camión que ya visita la tienda puede llevar dulces, galletas, salsas… y atún.' }],
      gloss: [{ t: '“Representados”', d: 'Marcas de otras empresas (Van Camp’s, Café Buendía, Hershey’s) que Colombina vende y distribuye con su red, sin ser dueña de ellas.' }],
      why: 'Así pasó de “marca de dulces” a “compañía de alimentos”: la encuentras en más momentos del día.',
      src: 'Portafolio; Blu Radio (Van Camp’s); Las2orillas (La Constancia).' } },

  { y: '2001–02', t: 'La 3.ª generación', i: '🌎', c: '#7B3FE4',
    checks: ['2001: primera planta fuera de Colombia (Guatemala)', '2002: César A. Caicedo, nieto del fundador, presidente', 'Sigue al frente de la empresa hoy'],
    m: { lead: '<b>César A. Caicedo Jaramillo</b>, hijo de Jaime H. y nieto de don Hernando, asume la presidencia a los 33 años. Sigue al frente en 2026.',
      people: [{ i: '👴', n: 'Hernando', r: 'Fundador · 1927' }, { i: '👨', n: 'Jaime H.', r: 'Hijo · 1946' }, { i: '🧑', n: 'César A.', r: 'Nieto · 2002 → hoy', hl: true }],
      tiles: [{ i: '🏭', b: 'Guatemala · 2001', s: 'Su primera planta fuera de Colombia.' },
        { i: '🚀', b: 'Expansión', s: 'Con él llegan helados, Europa y salsas picantes (Amazon, 2013).' }],
      why: 'Tres generaciones = continuidad. Es parte de la imagen de la marca: familiar, estable y colombiana.',
      src: 'El Tiempo; El País Cali; La República.' } },

  { y: '2004–06', t: 'Llegan los helados', i: '🍦', c: '#00A6D6',
    checks: ['2004: compra Inalac (Helados LIS, Medellín)', '2006: compra Helados Robin Hood (Bogotá)', 'Helados con sabor a sus dulces'],
    m: { lead: 'Colombina entra a helados comprando dos marcas y aprovecha lo que ya era famoso: helados con el sabor de sus dulces.',
      tiles: [{ i: '🍦', b: '2004 · LIS', s: 'Inalac, Medellín.' },
        { i: '🍨', b: '2006 · Robin Hood', s: 'Bogotá.' },
        { i: '🔁', b: 'Sinergia', s: 'Sabores de Bon Bon Bum, Nucita o Chocobreak convertidos en helado.' }],
      why: 'Extiende la marca a una categoría nueva sin empezar de cero: el cliente ya confía en esos sabores.',
      src: 'Portafolio.' } },

  { y: '~2010', t: 'Copa Bon Bon Bum', i: '⚽', c: '#1FBF75',
    checks: ['Torneo de fútbol infantil y juvenil', 'Niñas y niños de Sub-8 a Sub-16', '+22.000 participantes por edición, sigue vigente'],
    m: { lead: 'Es el torneo de fútbol infantil más grande de Colombia. En 2025 jugó su edición 15 y sigue vigente.',
      tiles: [{ i: '👧', b: 'Niñas y niños', s: 'Categorías Sub-8 a Sub-16, con rama femenina.' },
        { i: '👕', b: '+1.300 equipos', s: 'Más de 22.000 participantes por edición.' },
        { i: '⭐', b: 'Semillero', s: 'La prensa menciona a Linda Caicedo (Real Madrid y Selección Colombia) entre quienes jugaron la Copa.' }],
      why: 'No vende dulces directamente: crea COMUNIDAD alrededor de la marca y la mete en la vida de las familias. Eso es Resonancia.',
      src: 'El Tiempo; El País Cali (2024–2025). La primera edición fue hacia 2010–2011.' } },

  { y: '2016', t: 'Colombina en Europa', i: '🏰', c: '#FF4F9A',
    checks: ['Compra Fiesta S.A. en España (~17 millones de euros)', 'Marcas Kojak, Piruleta y Fresquito', 'Su filial europea se llama Pierrot'],
    m: { lead: 'Colombina compra <b>Fiesta S.A.</b>, fabricante español de caramelos con planta en Alcalá de Henares (cerca de Madrid), por unos 17 millones de euros.',
      tiles: [{ i: '🍭', b: 'Kojak · Piruleta · Fresquito', s: 'Marcas muy conocidas en España que conservan su propio nombre.' },
        { i: '🏭', b: 'Alcalá de Henares', s: 'Su planta de fabricación en Europa.' },
        { i: '🎭', b: 'Pierrot', s: 'Así se llama su filial en España: el enamorado de Colombina en la Commedia dell’arte.' },
        { i: '🌍', b: '¿Solo España?', s: 'En Europa fabrica en España. Además tiene filiales comerciales en EE. UU., Centroamérica, Ecuador, Perú y Chile.' }],
      why: 'Comprar una marca con clientes fieles es entrar a un mercado nuevo con la confianza ya ganada.',
      src: 'La República; El Tiempo.' } },

  { y: '2019–21', t: 'Sol y cero basura', i: '☀️', c: '#FFC72C',
    checks: ['2019: su planta de galletas, 1.ª del sector en Basura Cero Oro', '2021: granja solar de 29.000 paneles', 'El sol cubre ~34% de la energía de la planta de dulces'],
    m: { lead: 'Dos proyectos que cambian la imagen de la marca: fábricas que casi no mandan basura al relleno y energía que sale del sol.',
      tiles: [{ i: '♻️', b: 'Basura Cero Oro', s: 'Certificación de ICONTEC: casi toda la basura de la fábrica se recicla o reaprovecha (la de galletas, ~98%).' },
        { i: '☀️', b: '29.000 paneles', s: 'Granja solar de Celsia en La Paila (9,9 MW), inaugurada en 2021.' },
        { i: '⚡', b: '34%', s: 'De la energía que usa la planta de dulces sale del sol.' }],
      gloss: [{ t: 'ICONTEC', d: 'La entidad colombiana que certifica normas de calidad (la del sello en muchos productos).' },
        { t: 'Relleno sanitario', d: 'El lugar donde termina la basura de una ciudad.' },
        { t: 'Granja solar', d: 'Un terreno lleno de paneles que convierten la luz del sol en electricidad.' }],
      why: 'Hoy la gente también elige marcas por sus valores: esto alimenta la IMAGEN (valores) y los JUICIOS (credibilidad).',
      src: 'El Colombiano; El Tiempo (2021); Colombina.' } },

  { y: 'Hoy', t: '4.ª del mundo en sostenibilidad', i: '🏆', c: '#FF85BC',
    checks: ['S&P Global: 4.ª de 241 empresas de alimentos', 'La mejor de Latinoamérica en su sector', '2024: $3,3 billones en ventas'],
    m: { lead: 'En el anuario de sostenibilidad 2026 de <b>S&amp;P Global</b>, Colombina quedó <b>4.ª entre 241</b> empresas de alimentos evaluadas en el mundo (83/100), la mejor de Latinoamérica en su sector.',
      tiles: [{ i: '🏆', b: '4.ª de 241', s: 'Anuario S&P Global 2026. En la edición 2024 había sido 7.ª de 395.' },
        { i: '💵', b: '$3,3 billones', s: 'Ventas de 2024 (COP). ~40% vienen de exportaciones.' },
        { i: '👥', b: '+8.000 empleados', s: '7 plantas en Colombia, Guatemala y España.' },
        { i: '♾️', b: '“El sabor es infinito”', s: 'Su promesa de marca hoy.' }],
      gloss: [{ t: '¿Qué es S&P Global?', d: 'Una firma internacional que analiza y califica empresas. Su anuario de sostenibilidad es como un “cuadro de honor” de las que mejor cuidan el ambiente, a su gente y se manejan con transparencia.' },
        { t: 'Top 10%', d: 'Estar entre las 10 mejores de cada 100 empresas de su industria.' }],
      why: 'Un reconocimiento serio = credibilidad. Es evidencia de JUICIOS positivos hacia la marca.',
      src: 'Colombina (blog, 2026); El Tiempo (2025).' } }
],

/* Fichas que abren botones */
MODALS: {
  nombre: { c: '#FF4F9A', k: 'El origen del nombre', t: 'La Commedia dell’arte en un minuto',
    lead: 'Teatro popular italiano (siglos XVI al XVIII). Compañías que improvisaban comedias en plazas, con personajes fijos que todo el público reconocía.',
    tiles: [{ i: '💃', b: 'Colombina', s: 'La criada astuta, alegre y coqueta. No usa máscara y es la más lista del escenario.' },
      { i: '🃏', b: 'Arlequín', s: 'El sirviente pícaro y acróbata, de traje de rombos. Es su gran amor.' },
      { i: '🌙', b: 'Pierrot', s: 'El enamorado triste y pálido que suspira por Colombina… y ella lo rechaza.' }],
    body: '<b>¿Y la opereta?</b> Según la historia que cuenta la empresa, Hernando Caicedo vio una opereta italiana en la que Colombina se balanceaba sobre una media luna mientras dos personajes le cantaban. Esa imagen inspiró el nombre y la “muñequita” del logo. El título exacto de la obra no está confirmado (algunos blogs dicen <i>Pagliacci</i>, pero ninguna fuente seria lo asegura).<br><br><b>¿Qué afinidad tenía el fundador?</b> No hay registro de una relación especial con el teatro más allá de esa escena: le gustó la imagen y la convirtió en marca.',
    why: 'Un nombre con historia, fácil de decir y con una imagen poderosa (la niña sobre la luna) se vuelve inolvidable. Y la marca fue coherente: 89 años después llamó “Pierrot” a su filial en España.',
    src: 'El Tiempo; El País Cali; La República.' }
},

/* Textos dentro de la pirámide */
PYR_SUB: {
  gen: { rel: ['Identificación de la categoría', 'Satisfacción de necesidades'], des: ['Características · Función', 'Precio · Servicio · Diseño'],
    img: ['Historia · Experiencia', 'Personalidad · Valores'], jui: ['Calidad', 'Credibilidad', 'Consideración'],
    sen: ['Diversión', 'Seguridad', 'Estatus'], res: ['Lealtad', 'Comunidad', 'Compromiso'] },
  col: { rel: ['Su nombre se volvió palabra', 'Logo inconfundible · en todas partes'], des: ['Sabor que no cambia', 'Precios para todos', '6 negocios · 50+ marcas'],
    img: ['Familia vallecaucana', 'Alegre y cercana', 'Muy colombiana'], jui: ['Calidad', 'Credibilidad', 'Sostenible'],
    sen: ['Calidez', 'Nostalgia', 'Orgullo'], res: ['Lealtad', 'Comunidad', 'Embajadores'] }
},

/* Etiquetas alineadas a cada nivel (1 = base … 4 = cima) */
ALIGN: {
  phases: ['<i>1</i><div><b>Identidad</b><span>¿Quién eres?</span></div>', '<i>2</i><div><b>Significado</b><span>¿Qué eres?</span></div>',
    '<i>3</i><div><b>Respuesta</b><span>¿Qué haces?</span></div>', '<i>4</i><div><b>Relaciones</b><span>¿Qué hacemos juntos?</span></div>'],
  clase: ['<div><b>Relevancia</b><span>Lo que cumple la marca en necesidades básicas y no básicas.</span></div>',
    '<div><b>Desempeño · Imágenes</b><span>Razón: lo funcional. Emoción: lo que me transmite.</span></div>',
    '<div><b>Juicios · Sentimientos</b><span>Razón: mi opinión. Emoción: lo que me despierta.</span></div>',
    '<div><b>Resonancia</b><span>Una comunidad tan fuerte que genera lealtad, de generación en generación.</span></div>'],
  answers: ['<div><b>La marca que todos reconocen</b><span>Tanto que “colombina” ya es sinónimo de chupeta.</span></div>',
    '<div><b>Calidad constante con alma colombiana</b><span>Lo que ofrece + lo que significa.</span></div>',
    '<div><b>Confianza y cariño</b><span>Se cree en ella y se siente cercana.</span></div>',
    '<div><b>De cliente a embajador</b><span>Lealtad, comunidad y compromiso.</span></div>']
},

/* Contenido de cada bloque: láminas de respuesta y fichas de la pirámide completa.
   tag = dimensión del modelo de Keller que justifica cada punto. */
BLOCKS: {
  rel: { h: '🎯 Relevancia · ¿qué tan presente está?', items: [
    { i: '🗣️', t: 'Su nombre se volvió palabra', s: 'En Colombia a una chupeta se le dice “una colombina”.', tag: 'Profundidad' },
    { i: '🌙', t: 'Un logo que se reconoce solo', s: 'La niña sobre la media luna, desde sus orígenes.', tag: 'Reconocimiento' },
    { i: '🏪', t: 'Está donde tú estás', s: '+750.000 clientes: tiendas de barrio, supermercados y comercios.', tag: 'Disponibilidad' },
    { i: '🧩', t: 'La recuerdas en muchos momentos', s: 'Dulces, chocolates, galletas, salsas y helados.', tag: 'Amplitud' },
    { i: '📅', t: 'Casi 100 años en la mente', s: 'Desde 1927, varias generaciones crecieron con ella.', tag: 'Profundidad' },
    { i: '🌎', t: 'También afuera', s: 'Llega a +70 países; ~40% de sus ventas son exportaciones.', tag: 'Amplitud' },
    { i: '🥫', t: 'Necesidades básicas', s: 'Despensa del hogar: galletas, salsas La Constancia, conservas.', tag: 'Necesidad' },
    { i: '🎁', t: 'Necesidades no básicas', s: 'Un antojo, un detalle, un premio, una celebración.', tag: 'Necesidad' }
  ] },
  des: { h: '🧠 Desempeño · lo que ofrece', items: [
    { i: '✅', t: 'Sabor que no cambia', s: '“El sabor es infinito” funciona como garantía.', tag: 'Confiabilidad' },
    { i: '💰', t: 'Precios para todos', s: 'Pensada para el bolsillo de la tienda de barrio.', tag: 'Precio' },
    { i: '🧩', t: 'Portafolio enorme', s: '6 negocios y entre 50 y 60 marcas.', tag: 'Características' },
    { i: '🌱', t: 'Opciones más sanas', s: 'Colombina 100%: +50 productos sin colorantes artificiales.', tag: 'Características' },
    { i: '🍦', t: 'Innova con sus sabores', s: 'Helados con sabor a Bon Bon Bum, Nucita o Chocobreak.', tag: 'Diseño' },
    { i: '🏭', t: 'Capacidad industrial', s: '7 plantas en Colombia, Guatemala y España.', tag: 'Eficiencia' },
    { i: '🚚', t: 'Siempre disponible', s: 'Su red de distribución hasta vende marcas de otros.', tag: 'Servicio' }
  ] },
  img: { h: '❤️ Imágenes · lo que transmite', items: [
    { i: '👴', t: 'Herencia familiar', s: '3 generaciones Caicedo: Hernando, Jaime H. y César A.', tag: 'Historia' },
    { i: '🎭', t: 'Un origen con encanto', s: 'Una opereta: la niña que se mece sobre la luna.', tag: 'Historia' },
    { i: '😄', t: 'Personalidad', s: 'Alegre, cercana, familiar y muy colombiana.', tag: 'Personalidad' },
    { i: '🎉', t: 'Momentos muy nuestros', s: 'Piñatas, novenas, loncheras, visitas y cumpleaños.', tag: 'Experiencias' },
    { i: '👵', t: 'Para todas las edades', s: 'Del niño en el recreo al abuelo con su Coffee Delight.', tag: 'Usuarios' },
    { i: '💛', t: 'Orgullo vallecaucano', s: 'Nació en el Valle y compite con multinacionales.', tag: 'Valores' },
    { i: '☀️', t: 'Responsable', s: 'Granja solar de 29.000 paneles y fábricas Basura Cero Oro.', tag: 'Valores' }
  ] },
  jui: { h: '⚖️ Juicios · lo que piensan', items: [
    { i: '🏅', t: 'Calidad percibida', s: 'Casi 100 años en el mercado sin perder el sabor.', tag: 'Calidad' },
    { i: '🌍', t: 'Experta y seria', s: '4.ª empresa de alimentos más sostenible del mundo (S&P Global 2026).', tag: 'Credibilidad' },
    { i: '🏷️', t: 'Su sello da confianza', s: 'Si el empaque dice Colombina, el cliente confía.', tag: 'Credibilidad' },
    { i: '💵', t: 'Una empresa sólida', s: '$3,3 billones en ventas (2024) y +8.000 empleados.', tag: 'Credibilidad' },
    { i: '🛒', t: 'La primera opción', s: 'Está en la lista del mercado y en el mostrador de la tienda.', tag: 'Consideración' },
    { i: '⚔️', t: 'A la altura de gigantes', s: 'Exporta ~40% de lo que vende y compite con multinacionales.', tag: 'Superioridad' }
  ] },
  sen: { h: '💛 Sentimientos · lo que sienten', items: [
    { i: '🏡', t: 'Calidez', s: 'Las visitas, la novena, la lonchera que empacaba mamá.', tag: 'Calidez' },
    { i: '🤩', t: 'Diversión', s: 'La sorpresa del chicle, la piñata, el recreo.', tag: 'Diversión' },
    { i: '⚡', t: 'Emoción', s: 'El antojo que se cumple: “¡me gané el dulce!”.', tag: 'Emoción' },
    { i: '🛡️', t: 'Seguridad', s: 'Tranquilidad de dar a los hijos una marca conocida.', tag: 'Seguridad' },
    { i: '🤝', t: 'Aprobación social', s: 'Compartir dulces o regalar un detalle queda bien.', tag: 'Aprobación social' },
    { i: '💪', t: 'Orgullo', s: 'Una marca colombiana que triunfa en otros países.', tag: 'Autoestima' },
    { i: '💭', t: 'Nostalgia', s: 'Con un dulce, el adulto vuelve a ser niño.', tag: 'Calidez' }
  ] },
  res: { h: '💖 Resonancia · la relación', items: [
    { i: '🔁', t: 'Lealtad', s: '“La de siempre” en la lista del mercado de la familia.', tag: 'Lealtad' },
    { i: '💞', t: 'Apego', s: '“Ese no sabe igual”: el cliente rechaza las imitaciones.', tag: 'Apego' },
    { i: '👵', t: 'Se hereda', s: 'La compraban los abuelos, los papás… y ahora los nietos.', tag: 'Apego' },
    { i: '⚽', t: 'Comunidad', s: 'Copa Bon Bon Bum: +22.000 niñas y niños por edición, 15 ediciones.', tag: 'Comunidad' },
    { i: '⭐', t: 'Semillero de talento', s: 'La prensa menciona a Linda Caicedo entre quienes jugaron la Copa.', tag: 'Comunidad' },
    { i: '📱', t: 'Compromiso activo', s: '+40.000 tenderos hacen sus pedidos en la app Rall-e Ventas.', tag: 'Compromiso' },
    { i: '🗣️', t: 'Embajadores', s: 'El cliente la recomienda y la defiende sin que se lo pidan.', tag: 'Compromiso' },
    { i: '🎄', t: 'Tradición compartida', s: 'Novenas, piñatas y recreos: la marca une a la gente.', tag: 'Comunidad' }
  ] }
},

/* Ficha de cada bloque (pirámide completa). Los puntos salen de BLOCKS. */
PYR_INFO: {
  rel: { k: 'Fase 1 · Identidad · ¿Quién eres?', lead: '<b>En simple:</b> qué tan fácil reconoces y recuerdas la marca (profundidad), en cuántos momentos piensas en ella (amplitud) y qué necesidades te resuelve.',
    why: 'Sin reconocimiento no hay pirámide: es la base. Que el nombre de una marca reemplace el de la categoría es la prueba máxima de relevancia.',
    src: 'Uso de “colombina” = chupeta en Colombia; El Tiempo 2025 (clientes, exportaciones).' },
  des: { k: 'Fase 2 · Significado · ¿Qué eres? — lógica racional', lead: '<b>En simple:</b> lo que la marca hace bien y se puede comprobar: calidad, precio, variedad, diseño, servicio y eficiencia.',
    why: 'Es la razón práctica para elegirla: cumple lo que promete, siempre igual.', src: 'Portafolio; El Tiempo 2025; Colombina.' },
  img: { k: 'Fase 2 · Significado · ¿Qué eres? — lógica emocional', lead: '<b>En simple:</b> lo que la marca transmite: su historia, su personalidad, quién la usa, en qué momentos y qué valores tiene.',
    why: 'Le da alma a la marca: no es “un dulce más”, es una marca con historia y valores.', src: 'El Tiempo; El País Cali; El Colombiano.' },
  jui: { k: 'Fase 3 · Respuesta · ¿Qué haces? — lo que pienso', lead: '<b>En simple:</b> la opinión racional que el cliente se forma: ¿es de calidad?, ¿es creíble?, ¿la tengo en cuenta?, ¿es mejor que otras?',
    gloss: [{ t: '¿Qué es S&P Global?', d: 'Una firma internacional que analiza y califica empresas. Su anuario de sostenibilidad es como un “cuadro de honor” de las que mejor cuidan el ambiente y a su gente.' }],
    why: 'Si el cliente cree en la marca, la elige con tranquilidad y la recomienda.', src: 'S&P Global / Colombina (2026); El Tiempo 2025.' },
  sen: { k: 'Fase 3 · Respuesta · ¿Qué haces? — lo que siento', lead: '<b>En simple:</b> la emoción que despierta la marca. Keller propone seis: calidez, diversión, emoción, seguridad, aprobación social y autoestima.',
    why: 'Las emociones hacen que la marca se quede en la memoria… y en el corazón.' },
  res: { k: 'Fase 4 · Relaciones · ¿Qué hacemos juntos?', lead: '<b>En simple:</b> la cima. El cliente ya no solo compra: es fiel, siente apego, se siente parte de una comunidad y participa. La marca pasa de generación en generación.',
    why: 'Es lo máximo que una marca puede llegar a ser: los clientes se vuelven promotores.',
    src: 'El Tiempo / El País Cali (Copa 2024–2025); ralleventas.com.' }
}
};
