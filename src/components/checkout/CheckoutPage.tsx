import React, { useEffect } from 'react';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import { checkoutService } from '@/services/checkout';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, Lock, CreditCard, Zap, ArrowRight, AlertCircle, Loader2, User, Mail, Phone } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

function CheckoutSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 animate-pulse">
      <div className="h-10 w-64 bg-slate-200 mx-auto mb-4 rounded"></div>
      <div className="h-4 w-96 bg-slate-200 mx-auto mb-10 rounded"></div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
          <Skeleton className="h-32 w-full rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </div>
        </div>
        <div className="lg:col-span-5">
          <Skeleton className="h-96 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function CheckoutPage() {
  const [customer, setCustomer] = React.useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { 
    mainProduct, 
    orderBumps, 
    selectedBumpIds, 
    toggleBump, 
    getTotal, 
    isLoading, 
    error,
    sessionId,
    initCheckout 
  } = useCheckoutStore();

  useEffect(() => {
    initCheckout();
  }, [initCheckout]);

  const handleContinue = async () => {
    if (!customer.name || !customer.email || !customer.phone) {
      toast.error('Preencha seus dados', {
        description: 'Precisamos do seu nome, e-mail e telefone para processar o pedido.',
      });
      return;
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      toast.error('E-mail inválido', {
        description: 'Por favor, insira um e-mail válido.',
      });
      return;
    }

    if (!sessionId || !mainProduct) return;

    setIsSubmitting(true);
    try {
      const selectedIds = [mainProduct.id, ...selectedBumpIds.map(id => {
        const bump = orderBumps.find(b => b.id === id);
        return bump?.product_id;
      }).filter(Boolean) as string[]];

      const { checkout_url } = await checkoutService.createPagarmeCheckout({
        session_token: sessionId,
        selected_product_ids: selectedIds,
        customer,
      });

      toast.success('Pedido criado com sucesso!', {
        description: 'Redirecionando para o pagamento...',
      });

      // In development, show a toast instead of actual redirect if it's a mock URL
      if (checkout_url.includes('mock-url')) {
        setTimeout(() => {
          toast.success('Ambiente de teste!', {
            description: 'Em produção você seria redirecionado agora.',
          });
          setIsSubmitting(false);
        }, 2000);
      } else {
        window.location.href = checkout_url;
      }
    } catch (err: any) {
      toast.error('Erro ao processar checkout', {
        description: err.message,
      });
      setIsSubmitting(false);
    }
  };

  if (isLoading && !mainProduct) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b h-16 flex items-center px-4">
          <div className="max-w-5xl mx-auto w-full font-bold text-xl tracking-tight text-slate-800">
            GUIA <span className="text-blue-600">PRÁTICO</span>
          </div>
        </header>
        <CheckoutSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Ops! Algo deu errado</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg"
          >
            Tentar novamente
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
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
            {/* Customer Data Form */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                Seus dados
              </h2>
              <Card className="p-6 border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400" /> Nome Completo
                    </Label>
                    <Input 
                      id="name" 
                      placeholder="Ex: João Silva" 
                      value={customer.name}
                      onChange={(e) => setCustomer({...customer, name: e.target.value})}
                      className="border-slate-200 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" /> E-mail para entrega
                    </Label>
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="seu@email.com" 
                      value={customer.email}
                      onChange={(e) => setCustomer({...customer, email: e.target.value})}
                      className="border-slate-200 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400" /> WhatsApp
                    </Label>
                    <Input 
                      id="phone" 
                      placeholder="(00) 00000-0000" 
                      value={customer.phone}
                      onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                      className="border-slate-200 focus:border-blue-500"
                    />
                  </div>
                </div>
              </Card>
            </section>

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
                {orderBumps.map((bump) => {
                  const isSelected = selectedBumpIds.includes(bump.id);
                  return (
                    <div 
                      key={bump.id}
                      onClick={() => toggleBump(bump.id)}
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
                            checked={isSelected}
                            onCheckedChange={() => toggleBump(bump.id)}
                            className="h-6 w-6 border-slate-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-bold text-base md:text-lg">{bump.product?.name}</h3>
                                {isSelected && (
                                  <Badge className="bg-orange-500 hover:bg-orange-600 text-[10px] uppercase font-bold py-0 h-4">
                                    Adicionado
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-slate-600 mt-1 line-clamp-2">{bump.short_description}</p>
                            </div>
                            <div className="text-right ml-4">
                              {bump.product?.compare_at_price && (
                                <span className="block text-xs text-slate-400 line-through">
                                  R$ {bump.product.compare_at_price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </span>
                              )}
                              <span className="block font-bold text-orange-600">
                                R$ {bump.bump_price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                          </div>
                          
                          {bump.headline && (
                            <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-green-600 bg-green-50 w-fit px-2 py-1 rounded">
                              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                              {bump.headline}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Selection Highlight Bar */}
                      {isSelected && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"></div>
                      )}
                    </div>
                  );
                })}

                {orderBumps.length === 0 && !isLoading && (
                  <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl bg-white/50 text-slate-400">
                    Nenhuma oferta especial disponível no momento.
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar / Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <Card className="p-6 md:p-8 border-slate-200 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div>
                
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  Resumo do pedido
                </h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">{mainProduct?.name}</span>
                    <span className="font-medium">R$ {mainProduct?.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  
                  {selectedBumpIds.map(bumpId => {
                    const bump = orderBumps.find(b => b.id === bumpId);
                    if (!bump) return null;
                    return (
                      <div key={bump.id} className="flex justify-between text-sm animate-in fade-in slide-in-from-top-2 duration-300">
                        <span className="text-slate-600 flex items-center gap-2">
                          <span className="text-orange-500 font-bold">+</span> {bump.product?.name}
                        </span>
                        <span className="font-medium">R$ {bump.bump_price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      </div>
                    );
                  })}
                  
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
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      PROCESSANDO...
                    </>
                  ) : (
                    <>
                      CONTINUAR PARA PAGAMENTO
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
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
