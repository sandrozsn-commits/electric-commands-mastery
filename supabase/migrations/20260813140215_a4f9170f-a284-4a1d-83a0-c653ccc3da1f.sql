-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 1. Products Table
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    compare_at_price NUMERIC(10,2) CHECK (compare_at_price >= 0),
    product_type TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    is_main_product BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Order Bumps Table
CREATE TABLE public.order_bumps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    bump_price NUMERIC(10,2) NOT NULL CHECK (bump_price >= 0),
    display_order INTEGER DEFAULT 0,
    headline TEXT,
    short_description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Orders Table
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    external_reference TEXT UNIQUE,
    customer_name TEXT,
    customer_email TEXT,
    customer_phone TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'canceled', 'refunded')),
    subtotal NUMERIC(10,2) NOT NULL CHECK (subtotal >= 0),
    discount NUMERIC(10,2) DEFAULT 0 CHECK (discount >= 0),
    total NUMERIC(10,2) NOT NULL CHECK (total >= 0),
    payment_method TEXT,
    pagarme_order_id TEXT,
    pagarme_checkout_id TEXT,
    pagarme_checkout_url TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Order Items Table
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id),
    product_name TEXT NOT NULL,
    unit_price NUMERIC(10,2) NOT NULL CHECK (unit_price >= 0),
    quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
    is_order_bump BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Checkout Sessions Table
CREATE TABLE public.checkout_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_token TEXT UNIQUE NOT NULL,
    order_id UUID REFERENCES public.orders(id),
    selected_product_ids UUID[],
    subtotal NUMERIC(10,2) CHECK (subtotal >= 0),
    total NUMERIC(10,2) CHECK (total >= 0),
    status TEXT DEFAULT 'started' CHECK (status IN ('started', 'completed', 'abandoned')),
    source TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Checkout Events Table
CREATE TABLE public.checkout_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.checkout_sessions(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    product_id UUID REFERENCES public.products(id),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Webhook Events Table (for idempotency)
CREATE TABLE public.webhook_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    external_event_id TEXT UNIQUE NOT NULL,
    event_type TEXT,
    payload JSONB,
    processed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    processed_at TIMESTAMPTZ
);

-- Create Triggers
CREATE TRIGGER set_updated_at_products BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_order_bumps BEFORE UPDATE ON public.order_bumps FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_orders BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_checkout_sessions BEFORE UPDATE ON public.checkout_sessions FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Indices
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_active ON public.products(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_order_bumps_product_id ON public.order_bumps(product_id);
CREATE INDEX idx_orders_external_ref ON public.orders(external_reference);
CREATE INDEX idx_orders_pagarme_id ON public.orders(pagarme_order_id);
CREATE INDEX idx_orders_created_at ON public.orders(created_at);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_checkout_sessions_token ON public.checkout_sessions(session_token);
CREATE INDEX idx_checkout_events_session_id ON public.checkout_events(session_id);
CREATE INDEX idx_checkout_events_created_at ON public.checkout_events(created_at);

-- RLS and Grants
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_bumps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checkout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checkout_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;

-- Grants
GRANT SELECT ON public.products TO anon, authenticated;
GRANT SELECT ON public.order_bumps TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.orders TO authenticated;
GRANT SELECT, INSERT ON public.order_items TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.checkout_sessions TO anon, authenticated;
GRANT SELECT, INSERT ON public.checkout_events TO anon, authenticated;

GRANT ALL ON public.products TO service_role;
GRANT ALL ON public.order_bumps TO service_role;
GRANT ALL ON public.orders TO service_role;
GRANT ALL ON public.order_items TO service_role;
GRANT ALL ON public.checkout_sessions TO service_role;
GRANT ALL ON public.checkout_events TO service_role;
GRANT ALL ON public.webhook_events TO service_role;

-- Policies
CREATE POLICY "Public products are readable by everyone" ON public.products FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public order bumps are readable by everyone" ON public.order_bumps FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Checkout sessions are manageable by everyone" ON public.checkout_sessions FOR ALL USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "Checkout events are insertable by everyone" ON public.checkout_events FOR INSERT WITH CHECK (TRUE);

-- Seeding
INSERT INTO public.products (name, slug, description, price, compare_at_price, is_main_product)
VALUES ('Livro Comandos Elétricos', 'livro-comandos-eletricos', 'O Guia Completo e Definitivo de Comandos Elétricos.', 119.90, 169.90, TRUE);

DO $$
DECLARE
    main_id UUID;
    nr10_id UUID;
    video_id UUID;
    sim_id UUID;
BEGIN
    SELECT id INTO main_id FROM public.products WHERE slug = 'livro-comandos-eletricos';

    INSERT INTO public.products (name, slug, description, price, compare_at_price)
    VALUES ('NR-10 Comentada', 'nr-10-comentada', 'A norma explicada em linguagem de campo.', 27.00, 37.00)
    RETURNING id INTO nr10_id;

    INSERT INTO public.products (name, slug, description, price, compare_at_price)
    VALUES ('Videoaulas de Diagramas', 'videoaulas-diagramas', 'Videoaulas destrinchando as chaves de partida.', 37.00, 47.00)
    RETURNING id INTO video_id;

    INSERT INTO public.products (name, slug, description, price, compare_at_price)
    VALUES ('Simuladores de Circuitos', 'simuladores-circuitos', 'Programas para testar circuitos no computador.', 37.00, 47.00)
    RETURNING id INTO sim_id;

    INSERT INTO public.order_bumps (product_id, bump_price, display_order, headline, short_description)
    VALUES 
    (nr10_id, 27.00, 1, 'ADICIONAR AO MEU PEDIDO', 'Adicione este material complementar ao seu pedido.'),
    (video_id, 37.00, 2, 'ADICIONAR AO MEU PEDIDO', 'Videoaulas exclusivas para acelerar seu aprendizado.'),
    (sim_id, 37.00, 3, 'ADICIONAR AO MEU PEDIDO', 'Simule seus circuitos antes da montagem.');
END $$;
