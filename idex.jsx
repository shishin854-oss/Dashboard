import React, { useState, useRef } from 'react';
import { 
  Settings, 
  Image as ImageIcon, 
  Heart, 
  MessageCircle, 
  Share2, 
  User, 
  Send, 
  Plus,
  LayoutDashboard,
  Menu,
  X
} from 'lucide-react';

const AbyssDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [instagramHandle, setInstagramHandle] = useState('@abyss_official');
  const [selectedChannel, setSelectedChannel] = useState('Geral');
  const [mediaPreview, setMediaPreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [status, setStatus] = useState('Aguardando...');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const fileInputRef = useRef(null);

  const BOT_URL = "http://SEU_IP_DO_TERMUX:5000/post";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaPreview(URL.createObjectURL(file));
    }
  };

  const sendToBot = async () => {
    if (!mediaPreview) return alert("Selecione uma imagem!");
    
    setStatus('Enviando para o bot...');
    
    const formData = new FormData();
    formData.append('image', fileInputRef.current.files[0]);
    formData.append('caption', caption);
    formData.append('user', instagramHandle);
    formData.append('channel', selectedChannel);

    try {
      const response = await fetch(BOT_URL, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setStatus('Postado com sucesso no Discord!');
        setTimeout(() => setStatus('Aguardando...'), 3000);
      } else {
        setStatus('Erro ao conectar com o bot.');
      }
    } catch (error) {
      setStatus('Bot offline ou URL incorreta.');
    }
  };

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden relative">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0a0a0a] border-b border-white/10 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-white rounded flex items-center justify-center">
            <span className="font-black text-black text-[10px]">A</span>
          </div>
          <span className="font-bold tracking-tighter text-sm">ABYSS <span className="text-gray-500 text-[10px]">BOT</span></span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 bg-white/10 rounded-lg text-white"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0a0a] border-r border-white/10 flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6 flex items-center gap-3 mt-0 md:mt-0">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <span className="font-black text-black text-xs">A</span>
          </div>
          <span className="font-bold tracking-tighter text-lg">ABYSS <span className="text-gray-500 text-xs">BOT</span></span>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden ml-auto p-1 text-gray-400">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <button 
            onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'dashboard' ? 'bg-white text-black' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Painel</span>
          </button>
          <button 
            onClick={() => { setActiveTab('invite'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'invite' ? 'bg-white text-black' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <Share2 size={20} />
            <span className="font-medium">Convidar Bot</span>
          </button>
          <button 
            onClick={() => { setActiveTab('config'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'config' ? 'bg-white text-black' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <Settings size={20} />
            <span className="font-medium">Configurações</span>
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <User size={20} className="text-gray-400" />
            <span className="text-sm font-medium truncate">{instagramHandle}</span>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-black md:ml-64 pt-20 md:pt-0">
        <div className="p-4 md:p-8 max-w-5xl mx-auto">
            {activeTab === 'dashboard' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upload Section */}
                <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl space-y-6">
                  <h3 className="text-xl font-bold mb-4">Publicar Conteúdo</h3>
                  
                  <div 
                    onClick={() => fileInputRef.current.click()}
                    className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-white transition-all"
                  >
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                    {mediaPreview ? (
                      <img src={mediaPreview} className="max-h-64 mx-auto rounded-lg object-contain" alt="Preview" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-gray-500">
                        <Plus size={32} />
                        <p>Adicionar Imagem/Vídeo</p>
                      </div>
                    )}
                  </div>

                  <textarea 
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Legenda do post..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-white h-24 resize-none"
                  />

                  <button 
                    onClick={sendToBot}
                    className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                  >
                    <Send size={18} /> Enviar para o Discord
                  </button>
                  <p className="text-center text-xs text-gray-500">{status}</p>
                </div>

                {/* Preview Section */}
                <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold mb-4">Preview do Post</h3>
                  <div className="border border-white/10 rounded-xl overflow-hidden bg-black max-w-sm mx-auto">
                    <div className="p-3 border-b border-white/10 flex items-center gap-2">
                      <div className="w-6 h-6 bg-white rounded-full" />
                      <span className="text-xs font-bold">{instagramHandle}</span>
                    </div>
                    <div className="aspect-square bg-white/5 flex items-center justify-center">
                      {mediaPreview ? <img src={mediaPreview} className="w-full h-full object-cover" alt="Post Preview" /> : <ImageIcon size={48} className="text-white/10" />}
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex gap-4 text-gray-400">
                        <Heart size={20} /> <MessageCircle size={20} /> <Share2 size={20} />
                      </div>
                      <p className="text-xs text-gray-300">
                        <span className="font-bold mr-2">{instagramHandle}</span>
                        {caption || '...'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : activeTab === 'invite' ? (
              <div className="bg-[#0a0a0a] border border-white/10 p-6 md:p-8 rounded-2xl max-w-xl mx-auto space-y-6">
                <h3 className="text-xl font-bold">Convidar Bot para o Servidor</h3>
                <p className="text-gray-400 text-sm">Para que o dashboard funcione, o bot deve estar rodando no seu Termux e ter permissões de administrador no servidor do Discord.</p>
                
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>Status do Bot: <span className="text-white font-bold">Conectado via Termux</span></span>
                  </div>
                  <a 
                    href="https://discord.com/api/oauth2/authorize?client_id=SEU_CLIENT_ID&permissions=8&scope=bot" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full py-4 bg-white text-black text-center font-bold rounded-lg hover:bg-gray-200 transition-all"
                  >
                    Adicionar ao Discord
                  </a>
                </div>

                <div className="text-xs text-gray-500 space-y-2">
                  <p><strong>Passos para conexão:</strong></p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Inicie o bot no Termux usando <code>python bot.py</code>.</li>
                    <li>Certifique-se de que o IP no arquivo do site coincide com o IP do Termux.</li>
                    <li>Use o link acima para dar as permissões necessárias ao bot.</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-[#0a0a0a] border border-white/10 p-6 md:p-8 rounded-2xl max-w-xl mx-auto space-y-6">
                <h3 className="text-xl font-bold">Configurações</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500 uppercase font-bold">Seu @ do Instagram</label>
                    <input 
                      value={instagramHandle}
                      onChange={(e) => setInstagramHandle(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500 uppercase font-bold">Canal do Discord</label>
                    <select 
                      value={selectedChannel}
                      onChange={(e) => setSelectedChannel(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-white"
                    >
                      <option value="Geral"># Geral</option>
                      <option value="Anuncios"># Anúncios</option>
                      <option value="Membros"># Membros</option>
                    </select>
                  </div>
                  <button className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all">
                    Salvar Configurações
                  </button>
                </div>
              </div>
            )}
          )
        </div>
      </main>
    </div>
  );
};

export default AbyssDashboard;
