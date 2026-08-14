import React from 'react';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Lock, CreditCard, Zap, ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

// Mock bumps for Phase 1
const MOCK_BUMPS = [
  {
    id: 'nr10',
    name: 'NR-10 Comentada',
    price: 27.00,
    compare_at_price: 37.00,
    description: 'A norma explicada em linguagem de campo para você trabalhar protegido.',
    benefit: 'Trabalhe com segurança',
  },
  {
    id: 'videoaulas',
    name: 'Videoaulas de Diagramas',
    price: 37.00,
    compare_at_price: 47.00,
    description: 'Videoaulas onde destrinchamos contato por contato as chaves de partida.',
    benefit: 'Aprenda na prática',
  },
  {
    id: 'simuladores',
    name: 'Simuladores de Circuitos',
    price: 37.00,
    compare_at_price: 47.00,
    description: 'Programas para testar circuitos no computador antes de ir para o painel.',
    benefit: 'Evite erros na montagem',
  },
];

export function CheckoutPage() {
  const { mainProduct, selectedBumps, toggleBump, getTotal, isLoading } = useCheckoutStore();

  const handleContinue = () => {
    toast.info('Finalizando pedido...', {
      description: 'Você será redirecionado para o pagamento em breve (Fase 3).',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight text-slate-800">
            GUIA <span className="text-blue-600">PRÁTICO</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            <span>Ambiente Seguro</span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Finalize seu pedido</h1>
          <p className="text-slate-600 max-w-xl mx-auto">
            Escolha os materiais extras que deseja adicionar antes de continuar para o pagamento.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Main Product Section */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                Seu pedido
              </h2>
              <Card className="p-5 border-blue-100 bg-blue-50/30">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{mainProduct?.name}</h3>
                    <p className="text-sm text-slate-500">Produto principal (não pode ser removido)</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-lg">R$ {mainProduct?.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </Card>
            </section>

            {/* Order Bumps Section */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                OFERTAS ESPECIAIS
              </h2>
              <p className="text-sm text-slate-500 mb-6 italic">
                Você escolhe quais extras deseja adicionar. Só paga pelos itens selecionados.
              </p>
              
              <div className="space-y-4">
                {MOCK_BUMPS.map((bump) => {
                  const isSelected = selectedBumps.find(b => b.id === bump.id);
                  return (
                    <div 
                      key={bump.id}
                      onClick={() => toggleBump(bump)}
                      className={`relative cursor-pointer transition-all duration-200 border-2 rounded-xl overflow-hidden ${
                        isSelected 
                          ? 'border-orange-500 bg-orange-50/20 shadow-md ring-1 ring-orange-500/20' 
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="p-4 md:p-5 flex items-start gap-4">
                        <div className="pt-1">
                          <Checkbox 
                            id={bump.id} 
                            checked={!!isSelected}
                            onCheckedChange={() => toggleBump(bump)}
                            className="h-6 w-6 border-slate-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-bold text-base md:text-lg">{bump.name}</h3>
                                {isSelected && (
                                  <Badge className="bg-orange-500 hover:bg-orange-600 text-[10px] uppercase font-bold py-0 h-4">
                                    Adicionado
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-slate-600 mt-1 line-clamp-2">{bump.description}</p>
                            </div>
                            <div className="text-right ml-4">
                              <span className="block text-xs text-slate-400 line-through">
                                R$ {bump.compare_at_price?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </span>
                              <span className="block font-bold text-orange-600">
                                R$ {bump.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-green-600 bg-green-50 w-fit px-2 py-1 rounded">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            {bump.benefit}
                          </div>
                        </div>
                      </div>
                      
                      {/* Selection Highlight Bar */}
                      {isSelected && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Sidebar / Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <Card className="p-6 md:p-8 border-slate-200 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div>
                
                <h2 className="text-xl font-bold mb-6">Resumo do pedido</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">{mainProduct?.name}</span>
                    <span className="font-medium">R$ {mainProduct?.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  
                  {selectedBumps.map(bump => (
                    <div key={bump.id} className="flex justify-between text-sm animate-in fade-in slide-in-from-top-2 duration-300">
                      <span className="text-slate-600 flex items-center gap-2">
                        <span className="text-orange-500 font-bold">+</span> {bump.name}
                      </span>
                      <span className="font-medium">R$ {bump.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t border-dashed border-slate-200 flex justify-between items-baseline">
                    <span className="text-lg font-bold">Total</span>
                    <div className="text-right">
                      <span className="block text-3xl font-black text-blue-700">
                        R$ {getTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-bold">
                        Em até 12x no cartão
                      </p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleContinue}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  CONTINUAR PARA PAGAMENTO
                  <ArrowRight className="w-5 h-5" />
                </button>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <CreditCard className="w-5 h-5 text-slate-400" />
                    <Zap className="w-5 h-5 text-slate-400" />
                    <Lock className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-center text-[11px] text-slate-400 leading-relaxed uppercase tracking-tighter font-medium">
                    Pagamento 100% seguro processado pelo <span className="font-bold text-slate-500">Pagar.me</span><br />
                    Seus dados estão protegidos por criptografia de ponta.
                  </p>
                </div>
              </Card>

              {/* Trust Badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>Satisfação garantida ou seu dinheiro de volta</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
