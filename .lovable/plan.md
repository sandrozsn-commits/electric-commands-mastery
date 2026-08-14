# Plano de Implementação: Checkout com Order Bumps

Este plano detalha a criação de um sistema de checkout próprio integrado ao Pagar.me, permitindo a oferta de produtos complementares (order bumps) para aumentar o ticket médio.

## Objetivos
- Criar uma página de checkout (`/checkout`) de alta conversão.
- Permitir a seleção dinâmica de order bumps.
- Integrar com Pagar.me via Supabase Edge Functions.
- Garantir segurança total dos preços e dados no backend.

## Arquitetura Técnica
- **Frontend**: React + TypeScript + Tailwind CSS + Zustand.
- **Backend**: Supabase (Database, Auth, Edge Functions).
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
- [ ] Criar tabelas no Supabase: `products`, `order_bumps`, `orders`, `order_items`, `checkout_sessions`.
- [ ] Configurar RLS (Row Level Security) e permissões.
- [ ] Popular banco com produtos iniciais (Livro + 3 Bumps).
- [ ] Criar índices para performance em consultas de checkout.

### Fase 3: Integração Pagar.me (Backend)
- [ ] Criar Edge Function `create-pagarme-checkout`.
- [ ] Implementar validação de preços e estoque no servidor.
- [ ] Gerar link de pagamento/checkout seguro.
- [ ] Configurar Secrets (`PAGARME_SECRET_KEY`).

### Fase 4: Webhook e Atualização de Pedidos
- [ ] Criar Edge Function `pagarme-webhook`.
- [ ] Implementar lógica de atualização de status (Pendente -> Aprovado).
- [ ] Garantir idempotência para evitar duplicação de pedidos.

### Fase 5: Testes e Finalização
- [ ] Testar fluxo completo em dispositivos móveis e desktop.
- [ ] Validar segurança contra manipulação de preços no frontend.
- [ ] Revisar copy e selos de segurança.

## Detalhes Técnicos
- O frontend envia apenas `product_ids` para a Edge Function.
- Todo o cálculo monetário é feito pela Edge Function consultando o banco.
- O checkout utiliza `shadcn/ui` para componentes consistentes.

A FASE 1 foi iniciada com a criação da estrutura de rotas, store e interface básica.
