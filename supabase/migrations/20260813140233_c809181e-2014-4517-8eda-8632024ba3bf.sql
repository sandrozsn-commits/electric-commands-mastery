-- Fix function search_path
ALTER FUNCTION public.handle_updated_at() SET search_path = public;

-- Add policies for tables with RLS enabled but no policies (default deny for public roles)
-- This satisfies the linter while keeping the tables locked to anon/authenticated users
-- Edge Functions (service_role) will still have access via their administrative privileges or explicit GRANTs

-- Orders: Only service_role can do everything. Authenticated users might need to read their own later, 
-- but for Phase 2 we keep it restricted.
CREATE POLICY "Orders are restricted" ON public.orders FOR ALL TO service_role USING (TRUE);

-- Order Items: Restricted to service_role
CREATE POLICY "Order items are restricted" ON public.order_items FOR ALL TO service_role USING (TRUE);

-- Webhook Events: Restricted to service_role
CREATE POLICY "Webhook events are restricted" ON public.webhook_events FOR ALL TO service_role USING (TRUE);
