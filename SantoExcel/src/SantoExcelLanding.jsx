import React, { useState, useEffect } from 'react';
import { Play, ShoppingBag, Youtube, Instagram, Mail, Menu, X, Check, Star, ArrowRight, ExternalLink, Sparkles, Brain, Copy, Terminal } from 'lucide-react';

const SantoExcelLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // --- Estados da IA ---
  const [aiMode, setAiMode] = useState('formula'); // 'formula' ou 'explain'
  const [aiInput, setAiInput] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Efeito para mudar a cor do header ao rolar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // --- IntegraÃ§Ã£o com Gemini API ---
  const handleGenerate = async () => {
    if (!aiInput.trim()) return;

    setIsLoading(true);
    setError('');
    setAiResult('');

    const apiKey = ""; // A chave Ã© injetada automaticamente pelo ambiente
    const systemPrompt = aiMode === 'formula' 
      ? "VocÃª Ã© um especialista em Excel do canal Santo Excel. O usuÃ¡rio descreverÃ¡ um problema. Responda APENAS com a fÃ³rmula do Excel para resolver, seguida de uma explicaÃ§Ã£o muito breve (1-2 frases) em portuguÃªs. Se for complexo, sugira uma funÃ§Ã£o. Exemplo: '=SOMA(A:A)' - Soma toda a coluna A."
      : "VocÃª Ã© um especialista em Excel. O usuÃ¡rio vai colar uma fÃ³rmula com erro ou descrever um erro (como #N/A). Explique o motivo do erro e forneÃ§a a correÃ§Ã£o, de forma amigÃ¡vel e didÃ¡tica.";

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: aiInput }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro na conexÃ£o com a IA");
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (text) {
        setAiResult(text);
      } else {
        setError("NÃ£o foi possÃ­vel gerar uma resposta. Tente novamente.");
      }
    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao consultar o orÃ¡culo do Excel. Tente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const videos = [
    {
      id: "XVfYp7BTE9U",
      title: "Bingo Automatizado 5 PrÃªmios",
      description: "Veja como funciona o sistema completo para gerenciar bingos com mÃºltiplos prÃªmios."
    },
    {
      id: "Tw0TUAqG7zU",
      title: "Bingo TemÃ¡tico de SÃ£o JoÃ£o",
      description: "A soluÃ§Ã£o perfeita para sua festa junina. Cartelas personalizadas e sorteio automÃ¡tico."
    },
    {
      id: "81Ipk7TVgx4",
      title: "Gerador de Cartelas de Bingo",
      description: "Gere e imprima cartelas de bingo de forma rÃ¡pida e prÃ¡tica no Excel."
    }
  ];

  const products = [
    {
      title: "Cartelas de Bingo BÃ¡sicas",
      price: "Ver Oferta",
      link: "https://hotm.art/CartelinhasBasicas",
      features: ["GeraÃ§Ã£o AutomÃ¡tica", "ImpressÃ£o RÃ¡pida", "ConferÃªncia Simples"],
      color: "bg-blue-600",
      popular: false
    },
    {
      title: "Bingo 5 PrÃªmios (Completo)",
      price: "Ver Oferta",
      link: "https://hotm.art/CartelonaAutomatizada",
      features: ["5 Rodadas de PrÃªmios", "Painel de Sorteio", "ValidaÃ§Ã£o AutomÃ¡tica"],
      color: "bg-emerald-600",
      popular: true
    },
    {
      title: "Bingo de SÃ£o JoÃ£o",
      price: "Ver Oferta",
      link: "https://hotm.art/CartelinhasArraia",
      features: ["Tema Junino Exclusivo", "Cartelas Personalizadas", "Pronto para Imprimir"],
      color: "bg-orange-600",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter text-emerald-700">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
              <span className="text-xl">S</span>
            </div>
            Santo Excel
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <a href="#inicio" className="hover:text-emerald-600 transition-colors">InÃ­cio</a>
            <a href="#ia-tools" className="hover:text-emerald-600 transition-colors flex items-center gap-1"><Sparkles size={14} className="text-amber-500"/> Ferramentas IA</a>
            <a href="#videos" className="hover:text-emerald-600 transition-colors">Tutoriais</a>
            <a href="#loja" className="hover:text-emerald-600 transition-colors">Planilhas</a>
            <a href="https://www.youtube.com/@santoexcel?sub_confirmation=1" target="_blank" rel="noreferrer" 
               className="bg-red-600 text-white px-5 py-2 rounded-full flex items-center gap-2 hover:bg-red-700 transition-transform hover:scale-105 shadow-lg">
              <Youtube size={18} />
              Inscrever-se
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-slate-700" onClick={toggleMenu}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 flex flex-col p-6 gap-4 animate-in slide-in-from-top-5">
            <a href="#inicio" onClick={toggleMenu} className="text-lg font-medium text-slate-700">InÃ­cio</a>
            <a href="#ia-tools" onClick={toggleMenu} className="text-lg font-medium text-slate-700 flex items-center gap-2"><Sparkles size={16} className="text-amber-500"/>Ferramentas IA</a>
            <a href="#videos" onClick={toggleMenu} className="text-lg font-medium text-slate-700">Tutoriais</a>
            <a href="#loja" onClick={toggleMenu} className="text-lg font-medium text-slate-700">Planilhas</a>
            <a href="https://www.youtube.com/@santoexcel" target="_blank" rel="noreferrer" className="text-red-600 font-bold flex items-center gap-2">
              <Youtube size={20} /> Canal no YouTube
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1543286386-713df548e9cc?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10 text-center lg:text-left lg:flex lg:items-center lg:gap-12">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-300 text-sm font-semibold mb-6">
              <Star size={14} className="fill-emerald-300" />
              O Canal para quem quer dominar o Excel
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight mb-6">
              Transforme suas Planilhas em <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">Ferramentas Poderosas</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Tutoriais passo a passo, dicas de produtividade e planilhas prontas para vocÃª economizar tempo e impressionar no trabalho. Junte-se Ã  nossa comunidade no YouTube.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#ia-tools" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-900/30 flex items-center justify-center gap-2 animate-pulse-slow">
                <Sparkles size={20} />
                Testar IA GrÃ¡tis
              </a>
              <a href="#loja" className="bg-emerald-600/30 backdrop-blur-sm border border-emerald-500/50 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-600/50 transition-all flex items-center justify-center gap-2">
                <ShoppingBag size={20} />
                Ver Planilhas
              </a>
            </div>
          </div>
          
          {/* Hero Visual */}
          <div className="lg:w-1/2 relative">
             <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-emerald-500/20 group">
                <div className="absolute inset-0 bg-emerald-500/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" 
                  alt="Excel Dashboard" 
                  className="w-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 z-20">
                    <p className="font-bold text-xl">Aprenda a criar Dashboards</p>
                    <p className="text-emerald-300 text-sm">DisponÃ­vel no canal Santo Excel</p>
                </div>
             </div>
             {/* Floating Badge */}
             <div className="absolute -top-6 -right-6 bg-white text-slate-900 p-4 rounded-xl shadow-xl hidden md:block animate-bounce duration-1000">
                <div className="flex items-center gap-3">
                   <div className="bg-red-100 p-2 rounded-full text-red-600">
                      <Youtube size={24} fill="currentColor" />
                   </div>
                   <div>
                      <p className="font-bold text-sm">Novos VÃ­deos</p>
                      <p className="text-xs text-slate-500">Toda semana</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* AI Tools Section - NEW! */}
      <section id="ia-tools" className="py-20 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full font-bold text-sm mb-4 border border-amber-200">
              <Sparkles size={16} /> NOVIDADE
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Assistente IA Santo Excel</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Use nossa Inteligência Artificial para criar fÃ³rmulas complexas ou entender erros nas suas planilhas instantaneamente.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100">
            {/* AI Tabs */}
            <div className="flex border-b border-slate-200">
              <button 
                onClick={() => { setAiMode('formula'); setAiResult(''); setError(''); }}
                className={`flex-1 py-4 text-center font-bold flex items-center justify-center gap-2 transition-colors ${aiMode === 'formula' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-50 text-slate-600'}`}
              >
                <Terminal size={18} />
                Gerador de FÃ³rmulas
              </button>
              <button 
                onClick={() => { setAiMode('explain'); setAiResult(''); setError(''); }}
                className={`flex-1 py-4 text-center font-bold flex items-center justify-center gap-2 transition-colors ${aiMode === 'explain' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-50 text-slate-600'}`}
              >
                <Brain size={18} />
                Tira-DÃºvidas & Erros
              </button>
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-6">
                <label className="block text-slate-700 font-semibold mb-2">
                  {aiMode === 'formula' ? 'O que vocÃª quer calcular?' : 'Qual o erro ou dÃºvida?'}
                </label>
                <textarea 
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder={aiMode === 'formula' 
                    ? "Ex: Quero somar os valores da coluna A apenas se a coluna B tiver a palavra 'Pago'..." 
                    : "Ex: Minha fÃ³rmula PROCV estÃ¡ dando erro #N/D, o que isso significa?"}
                  className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none min-h-[120px] text-slate-700 resize-none"
                />
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={handleGenerate}
                  disabled={isLoading || !aiInput.trim()}
                  className={`bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${isLoading ? 'opacity-70 cursor-wait' : 'hover:shadow-lg hover:scale-105'}`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processando...
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      {aiMode === 'formula' ? 'Gerar FÃ³rmula MÃ¡gica âœ¨' : 'Explicar Erro âœ¨'}
                    </>
                  )}
                </button>
              </div>

              {/* Result Area */}
              {aiResult && (
                <div className="mt-8 animate-in slide-in-from-bottom-2">
                  <div className="bg-slate-800 rounded-xl p-1 shadow-inner">
                    <div className="bg-slate-900 rounded-t-lg px-4 py-2 flex justify-between items-center">
                      <span className="text-slate-400 text-xs font-mono">Resultado da IA</span>
                      <button 
                        onClick={() => copyToClipboard(aiResult)}
                        className="text-slate-400 hover:text-white text-xs flex items-center gap-1 transition-colors"
                      >
                        <Copy size={12} /> Copiar
                      </button>
                    </div>
                    <div className="p-6 text-emerald-300 font-mono text-lg leading-relaxed whitespace-pre-wrap">
                      {aiResult}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 text-center">
                    *A IA pode cometer erros. Sempre verifique a fÃ³rmula antes de usar em dados importantes.
                  </p>
                </div>
              )}

              {error && (
                <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-10 border-b border-slate-200">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-20 text-center">
            <div>
                <p className="text-3xl font-bold text-slate-800">+50</p>
                <p className="text-sm text-slate-500 uppercase tracking-wide">VÃ­deos Gratuitos</p>
            </div>
            <div>
                <p className="text-3xl font-bold text-slate-800">100%</p>
                <p className="text-sm text-slate-500 uppercase tracking-wide">PrÃ¡tico</p>
            </div>
            <div>
                <p className="text-3xl font-bold text-slate-800">Pro</p>
                <p className="text-sm text-slate-500 uppercase tracking-wide">ConteÃºdo AvanÃ§ado</p>
            </div>
        </div>
      </section>

      {/* Videos Section */}
      <section id="videos" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Aulas em Destaque</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Confira os vÃ­deos demonstrativos das nossas planilhas de Bingo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div key={video.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100 group">
                <div className="aspect-video bg-slate-200 relative">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${video.id}`} 
                    title={video.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="absolute inset-0"
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2">{video.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{video.description}</p>
                  <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer" className="inline-flex items-center text-emerald-600 font-semibold text-sm hover:underline">
                    Assistir no YouTube <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a href="https://www.youtube.com/@santoexcel/videos" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border-2 border-slate-300 px-6 py-3 rounded-full text-slate-700 font-semibold hover:border-emerald-500 hover:text-emerald-600 transition-colors">
              Ver todos os vÃ­deos
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Store Section */}
      <section id="loja" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Loja Santo Excel</h2>
                <p className="text-slate-600 text-lg">
                Adquira nossas planilhas de Bingo AutomÃ¡ticas e transforme seus eventos.
                </p>
            </div>
            <div className="hidden md:block">
                <div className="flex items-center gap-2 text-emerald-600 font-medium bg-emerald-50 px-4 py-2 rounded-lg">
                    <Check size={18} /> Compra Segura e Download Imediato
                </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={index} className={`relative rounded-2xl p-1 bg-gradient-to-b ${product.popular ? 'from-emerald-400 to-emerald-600 shadow-2xl scale-105 z-10' : 'from-slate-200 to-slate-100 hover:shadow-lg transition-all'}`}>
                {product.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-amber-400 text-amber-950 text-xs font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wide">
                    Mais Vendido
                  </div>
                )}
                <div className="bg-white h-full rounded-xl p-6 flex flex-col">
                  <div className={`w-12 h-12 ${product.color} rounded-lg mb-4 flex items-center justify-center text-white shadow-md`}>
                     <ShoppingBag size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">{product.title}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-xl font-bold text-slate-900">{product.price}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8 flex-1">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-600 text-sm">
                        <div className="min-w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                            <Check size={12} className="text-emerald-600" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a 
                    href={product.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`block w-full text-center py-3 rounded-lg font-bold transition-all ${product.popular ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
                  >
                    Comprar Agora
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-slate-50 rounded-2xl p-8 border border-slate-200 text-center">
            <h3 className="text-xl font-bold mb-2">Precisa de uma planilha personalizada?</h3>
            <p className="text-slate-600 mb-6">Desenvolvo soluÃ§Ãµes sob medida para o seu negÃ³cio.</p>
            <a href="mailto:contato@santoexcel.com.br" className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700">
              <Mail size={20} />
              Solicitar OrÃ§amento
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 bg-emerald-900 text-white">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-emerald-500/20 rounded-full blur-2xl"></div>
                        <img 
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                            alt="Sobre o Canal" 
                            className="relative rounded-2xl shadow-2xl border-4 border-emerald-500/30"
                        />
                    </div>
                </div>
                <div className="md:w-1/2">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Sobre o Santo Excel</h2>
                    <p className="text-emerald-100 text-lg mb-6 leading-relaxed">
                        Seja bem-vindo ao canal! Aqui vocÃª encontra tutoriais passo a passo, dicas e truques para melhorar suas habilidades no uso deste poderoso software de planilhas.
                    </p>
                    <p className="text-emerald-200/80 mb-8">
                        Seja vocÃª um iniciante aprendendo o bÃ¡sico ou um usuÃ¡rio avanÃ§ado procurando aprimorar suas habilidades, nosso objetivo Ã© tornar o Excel acessÃ­vel e Ãºtil para sua carreira e negÃ³cios.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <div className="bg-emerald-800/50 p-4 rounded-lg border border-emerald-700">
                            <p className="font-bold text-2xl text-emerald-300">VBA</p>
                            <p className="text-xs text-emerald-200">AutomaÃ§Ã£o</p>
                        </div>
                        <div className="bg-emerald-800/50 p-4 rounded-lg border border-emerald-700">
                            <p className="font-bold text-2xl text-emerald-300">Dashboards</p>
                            <p className="text-xs text-emerald-200">Visuais IncrÃ­veis</p>
                        </div>
                        <div className="bg-emerald-800/50 p-4 rounded-lg border border-emerald-700">
                            <p className="font-bold text-2xl text-emerald-300">FÃ³rmulas</p>
                            <p className="text-xs text-emerald-200">LÃ³gica AvanÃ§ada</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 font-bold text-2xl text-white mb-4">
                        <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center text-white text-sm">S</div>
                        Santo Excel
                    </div>
                    <p className="max-w-sm mb-6">
                        Levando seu conhecimento em planilhas para o prÃ³ximo nÃ­vel. ConteÃºdo prÃ¡tico e direto ao ponto.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://www.youtube.com/@santoexcel" className="bg-slate-800 p-2 rounded-full hover:bg-red-600 hover:text-white transition-colors">
                            <Youtube size={20} />
                        </a>
                        <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-pink-600 hover:text-white transition-colors">
                            <Instagram size={20} />
                        </a>
                        <a href="mailto:contato@santoexcel.com.br" className="bg-slate-800 p-2 rounded-full hover:bg-emerald-600 hover:text-white transition-colors">
                            <Mail size={20} />
                        </a>
                    </div>
                </div>
                
                <div>
                    <h4 className="text-white font-bold mb-4">Links RÃ¡pidos</h4>
                    <ul className="space-y-2">
                        <li><a href="#inicio" className="hover:text-emerald-400 transition-colors">InÃ­cio</a></li>
                        <li><a href="#ia-tools" className="hover:text-emerald-400 transition-colors">Ferramentas IA</a></li>
                        <li><a href="#videos" className="hover:text-emerald-400 transition-colors">Tutoriais</a></li>
                        <li><a href="#loja" className="hover:text-emerald-400 transition-colors">Loja de Planilhas</a></li>
                        <li><a href="#sobre" className="hover:text-emerald-400 transition-colors">Sobre o Canal</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4">Contato</h4>
                    <p className="mb-2">DÃºvidas sobre as planilhas?</p>
                    <a href="mailto:contato@santoexcel.com.br" className="text-emerald-400 hover:underline block mb-4">contato@santoexcel.com.br</a>
                    <p className="text-xs text-slate-600">
                        *Este site nÃ£o Ã© afiliado Ã  Microsoft. Excel Ã© uma marca registrada da Microsoft Corporation.
                    </p>
                </div>
            </div>
            
            <div className="border-t border-slate-800 pt-8 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} Santo Excel. Todos os direitos reservados.</p>
            </div>
        </div>
      </footer>
    </div>
  );
};


export default SantoExcelLanding;
