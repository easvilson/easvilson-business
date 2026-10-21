export const company = {
  name: "Easvilson Business",
  slogan: "Tecnologia que simplifica a gestão e impulsiona resultados reais.",
  phoneDisplay: "+244 929 064 398",
  phoneTel: "+244929064398",
  whatsapp: "244929064398",
  email: "easvilsonbusiness@gmail.com",
  website: "www.easvilsonbusiness.com",
  websiteUrl: "https://www.easvilsonbusiness.com",
} as const;

export type ValueItem = { title: string; text: string };

export type Photo = {
  id: string;
  src: string;
  alt: string;
  caption: string;
};

export type AboutContent = {
  lead: string;
  body: string;
  storyTitle: string;
  story: string;
  mission: string;
  vision: string;
  values: ValueItem[];
  photos: Photo[];
};

export type SiteContent = {
  heroTitle: string;
  heroSubtitle: string;
  about: AboutContent;
};

export const defaultSite: SiteContent = {
  heroTitle: "Tecnologia inteligente para a gestão da sua empresa.",
  heroSubtitle:
    "Soluções completas para controlo de presença, gestão de colaboradores, instalação de equipamentos e integração com leitores RFID e biométricos.",
  about: {
    lead: "Empresa angolana de tecnologia para presença, acesso e integração de equipamentos.",
    body: "A Easvilson Business desenvolve software e acompanha a instalação de leitores biométricos e RFID. O trabalho é tornar o controlo de assiduidade simples de operar e claro para a gestão — na cloud ou na rede local da organização. Também fazemos sites, software e aplicações Android à medida, e disponibilizamos produtos de skincare.",
    storyTitle: "A nossa história",
    story:
      "A Easvilson Business nasce de uma necessidade concreta: muitas organizações ainda controlam a presença com folhas de ponto, chamadas e registos dispersos.\n\nA resposta junta software e equipamento. O AssiduPro organiza colaboradores, registos e relatórios. O AssiduLocal serve quem prefere operar dentro da própria rede. Os leitores biométricos e RFID fecham o circuito, da entrada até ao painel.\n\nO serviço não termina na entrega. Montamos, configuramos, formamos quem vai usar o sistema e ficamos disponíveis para suporte.",
    mission:
      "Simplificar a gestão de pessoas com tecnologia prática, segura e adaptada à realidade das organizações angolanas.",
    vision:
      "Ser uma referência nacional em assiduidade e controlo de acesso, reconhecida pela clareza das soluções e pela proximidade do suporte.",
    values: [
      {
        title: "Confiança",
        text: "Dizemos o que o sistema faz e acompanhamos depois da instalação.",
      },
      {
        title: "Rigor",
        text: "Registos, relatórios e montagem tratados com o mesmo cuidado.",
      },
      {
        title: "Proximidade",
        text: "Formação e suporte em português, no terreno e à distância.",
      },
      {
        title: "Segurança",
        text: "Dados de presença tratados como informação da organização, não como vitrine.",
      },
    ],
    photos: [
      {
        id: "fundador",
        src: "/media/fundador.jpg",
        alt: "Responsável da Easvilson Business",
        caption: "Easvilson Business",
      },
    ],
  },
};

export const services = [
  {
    title: "AssiduPro Cloud",
    text: "Sistema online para gestão de presença, colaboradores e relatórios, acessível a partir do escritório.",
    points: ["Multiempresa", "Tempo real", "PDF e Excel"],
  },
  {
    title: "AssiduLocal",
    text: "Sistema desktop para empresas que preferem manter a operação na própria rede.",
    points: ["Rede local", "Leitor USB", "Operação contínua"],
  },
  {
    title: "Venda de equipamentos",
    text: "Leitores biométricos, leitores RFID e controladores de acesso escolhidos para o fluxo da organização.",
    points: ["Biometria", "Cartão RFID", "TCP/IP"],
  },
  {
    title: "Instalação e formação",
    text: "Montagem, configuração, treinamento da equipa e suporte técnico depois da entrada em funcionamento.",
    points: ["Montagem", "Configuração", "Suporte"],
  },
  {
    title: "Criação de sites",
    text: "Sites institucionais feitos à medida, para apresentar a empresa e receber pedidos de contacto.",
    points: ["Institucional", "Telemóvel", "Contacto direto"],
  },
  {
    title: "Software personalizado",
    text: "Programas desenhados para o processo da organização, com integração ao que já está em uso.",
    points: ["À medida", "Gestão", "Integração"],
  },
  {
    title: "Aplicações APK",
    text: "Aplicações Android personalizadas, entregues em APK para a equipa instalar no telemóvel.",
    points: ["Android", "APK", "Uso interno"],
  },
] as const;

export const products = [
  {
    name: "ZKTeco K40",
    image: "/media/k40.jpg",
    alt: "Terminal biométrico ZKTeco K40",
    summary: "Leitor de impressão digital com cartão RFID, pensado para o registo diário de presença.",
    specs: ["Leitor biométrico", "Cartão RFID", "TCP/IP", "USB Host"],
  },
  {
    name: "Hikvision DS-K1A8503MF",
    image: "/media/hikvision.jpg",
    alt: "Terminal Hikvision DS-K1A8503MF",
    summary: "Terminal de impressão digital e cartão RFID para controlo de acesso e de presença.",
    specs: ["Cartão RFID", "Impressão digital", "TCP/IP", "USB"],
  },
  {
    name: "Leitor RFID USB",
    image: "/media/leitor-usb.jpg",
    alt: "Leitor RFID USB de secretária",
    summary: "Leitor de secretária para registo por cartão, ligado ao posto de trabalho.",
    specs: ["Compatível com AssiduLocal", "Compatível com AssiduPro"],
  },
] as const;

export const assiduFeatures = [
  "Gestão de funcionários",
  "Controlo de presença",
  "Relatórios",
  "Dashboard",
  "Exportação PDF",
  "Exportação Excel",
  "Cloud",
  "Multiempresa",
  "Tempo real",
] as const;

export const flow = [
  { title: "Funcionário", text: "Chega ao ponto de registo." },
  { title: "Cartão RFID ou impressão digital", text: "Identifica-se no equipamento." },
  { title: "Leitor", text: "O terminal valida o acesso." },
  { title: "AssiduPro", text: "O software recebe o evento." },
  { title: "Servidor", text: "Cloud ou rede local." },
  { title: "Dashboard", text: "A gestão acompanha o dia." },
  { title: "Relatórios", text: "PDF e Excel quando precisa." },
] as const;

export const benefits = [
  { title: "Maior produtividade", text: "Menos tempo a reunir folhas de ponto." },
  { title: "Redução de faltas", text: "O registo passa a ser visível no próprio dia." },
  { title: "Maior controlo", text: "Entradas, saídas e excepções num só painel." },
  { title: "Relatórios automáticos", text: "Exportação pronta para a gestão e para a contabilidade." },
  { title: "Integração com hardware", text: "Biometria e RFID dos fabricantes que já instalamos." },
  { title: "Cloud e local", text: "AssiduPro online ou AssiduLocal na rede da empresa." },
] as const;

export const reasons = [
  { title: "Equipa especializada", text: "Software, equipamentos e instalação na mesma equipa." },
  { title: "Suporte técnico", text: "Acompanhamento depois da montagem, não só na entrega." },
  { title: "Treinamento", text: "Quem opera o sistema aprende no próprio fluxo de trabalho." },
  { title: "Instalação profissional", text: "Montagem e configuração na rede do cliente." },
  { title: "Atualizações constantes", text: "O software evolui sem trocar a forma de trabalhar." },
  { title: "Segurança dos dados", text: "Informação de presença tratada com acesso reservado." },
  { title: "Vários fabricantes", text: "Integração com equipamentos de marcas diferentes." },
] as const;

export const sectors = [
  { title: "Empresas", image: "/media/escritorio.jpg", alt: "Recepção de uma empresa" },
  { title: "Escolas", image: "/media/escola.jpg", alt: "Secretaria de uma escola" },
  { title: "Indústria", image: "/media/industria.jpg", alt: "Entrada de uma unidade industrial" },
] as const;

export const skincare = [
  {
    title: "Cuidado do rosto",
    text: "Produtos de skincare para o rosto. A disponibilidade confirma-se no pedido.",
  },
  {
    title: "Cuidado do corpo",
    text: "Linha de corpo, encomendada directamente à Easvilson Business.",
  },
  {
    title: "Proteção diária",
    text: "Proteção para o dia a dia. Peça a lista actualizada antes de encomendar.",
  },
] as const;

export const banners = [
  {
    image: "/media/banner-easvilson.jpg",
    alt: "Easvilson Business: tecnologia que conecta pessoas, processos e resultados",
    title: "Easvilson Business",
    text: "Tecnologia que conecta pessoas, processos e resultados.",
    fit: "contain",
  },
  {
    image: "/media/banner-assidupro.jpg",
    alt: "AssiduPro, sistema de gestão de presença e assiduidade",
    title: "AssiduPro",
    text: "Mais controlo. Menos tempo perdido.",
    fit: "contain",
  },
  {
    image: "/media/fundador.jpg",
    alt: "Responsável da Easvilson Business com o colete da empresa",
    title: "Easvilson Business",
    text: "Tecnologia no terreno, em Angola.",
    fit: "cover",
  },
  {
    image: "/media/escritorio.jpg",
    alt: "Recepção de uma empresa com leitor de cartão na entrada",
    title: "Empresas",
    text: "Presença e acesso no mesmo fluxo, do cartão ao relatório.",
    fit: "cover",
  },
  {
    image: "/media/escola.jpg",
    alt: "Secretaria de uma escola com terminal biométrico",
    title: "Escolas",
    text: "Registo de pessoal com leitura biométrica ou cartão RFID.",
    fit: "cover",
  },
  {
    image: "/media/industria.jpg",
    alt: "Entrada de uma unidade industrial com controlo de acesso",
    title: "Indústria",
    text: "Turnos visíveis no próprio dia, na cloud ou na rede local.",
    fit: "cover",
  },
  {
    image: "/media/acesso.jpg",
    alt: "Porta de escritório com leitor de cartão RFID",
    title: "Controlo de acesso",
    text: "Leitores biométricos e RFID integrados ao AssiduPro.",
    fit: "cover",
  },
] as const;

export const nav = [
  { id: "inicio", label: "Início", href: "/#inicio" },
  { id: "produtos", label: "Produtos", href: "/#produtos" },
  { id: "assidupro", label: "AssiduPro", href: "/#assidupro" },
  { id: "servicos", label: "Serviços", href: "/#servicos" },
  { id: "quem-somos", label: "Quem somos", href: "/quem-somos" },
  { id: "historia", label: "História", href: "/historia" },
  { id: "contacto", label: "Contacto", href: "/#contacto" },
] as const;
