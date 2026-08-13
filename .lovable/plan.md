# Plano de Implementação: Checkout com Order Bumps

Este plano detalha a criação de um sistema de checkout próprio integrado ao Pagar.me, permitindo a oferta de produtos complementares (order bumps) para aumentar o ticket médio.

## Objetivos
- Criar uma página de checkout (`/checkout`) de alta conversão.
- Permitir a seleção dinâmica de order bumps.
- Integrar com Pagar.me via TanStack Server Routes (substituindo Edge Functions).
- Garantir segurança total dos preços e dados no backend.

## Arquitetura Técnica
- **Frontend**: React + TypeScript + Tailwind CSS + Zustand.
- **Backend**: Supabase (Database, Auth) + TanStack Server Routes.
- **Pagamento**: Pagar.me (via API de Checkout Transparente ou Link de Pagamento).

## Etapas de Implementação

### Fase 1: Interface e Experiência do Usuário (UI/UX)
- [x] Criar rota `/checkout` no TanStack Router.
- [x] Desenvolver `CheckoutPage` com layout responsivo.
- [x] Implementar `useCheckoutStore` com Zustand para gerenciar estado local.
- [x] Criar componentes de exibição: `MainProductCard`, `OrderBumpCard`, `OrderSummary`.
- [x] Adicionar feedback visual de seleção e cálculo de total em tempo real.
- [x] Integrar CTAs da Landing Page para a nova rota.

### Fase 2: Banco de Dados e Supabase
- [x] Criar tabelas no Supabase: `products`, `order_bumps`, `orders`, `order_items`, `checkout_sessions`, `checkout_events`.
- [x] Configurar RLS (Row Level Security) e permissões.
- [x] Popular banco com produtos iniciais (Livro + 3 Bumps).
- [x] Criar índices para performance em consultas de checkout.
- [x] Implementar `productService` e `checkoutService` integrados ao banco.
- [x] Atualizar `useCheckoutStore` para consumir dados reais e registrar eventos.
- [x] Implementar estados de Loading/Error e Skeletons reais.

### Fase 3: Integração Pagar.me (Backend)
- [x] Criar TanStack Server Route `/api/checkout/create`.
- [x] Implementar validação de preços e estoque no servidor.
- [x] Gerar link de pagamento/checkout seguro (Simulado/Mock para fase de desenvolvimento).
- [ ] Configurar Secrets Reais (`PAGARME_SECRET_KEY`) - *Pendente configuração pelo usuário*.

### Fase 4: Webhook e Atualização de Pedidos
- [x] Criar TanStack Server Route `/api/public/pagarme-webhook`.
- [x] Implementar lógica de atualização de status (Pendente -> Aprovado).
- [x] Garantir idempotência para evitar duplicação de pedidos.

### Fase 5: Testes e Finalização
- [ ] Testar fluxo completo em dispositivos móveis e desktop.
- [x] Validar segurança contra manipulação de preços no frontend (Recalculado no Servidor).
- [x] Revisar copy e selos de segurança.

## Detalhes Técnicos
- O frontend envia apenas `product_ids` para a Server Route.
- Todo o cálculo monetário é feito pela Server Route consultando o banco.
- O checkout utiliza `shadcn/ui` para componentes consistentes.
- Integração utiliza TanStack Server Routes para máxima compatibilidade com a stack do projeto.
