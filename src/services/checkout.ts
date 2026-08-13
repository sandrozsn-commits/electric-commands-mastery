import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

export type Product = Database["public"]["Tables"]["products"]["Row"];
export type OrderBump = Database["public"]["Tables"]["order_bumps"]["Row"] & {
  product?: Product;
};

export const productService = {
  async getMainProduct() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_main_product", true)
      .eq("is_active", true)
      .single();
    if (error) throw error;
    return data;
  },

  async getOrderBumps() {
    const { data, error } = await supabase
      .from("order_bumps")
      .select(`
        *,
        product:products(*)
      `)
      .eq("is_active", true)
      .order("display_order", { ascending: true });
    if (error) throw error;
    return data as any as OrderBump[];
  },
};

export const checkoutService = {
  async createSession(params: {
    selected_product_ids: string[];
    source?: string | null;
    utm_source?: string | null;
    utm_medium?: string | null;
    utm_campaign?: string | null;
  }) {
    const sessionToken = crypto.randomUUID();
    const { data, error } = await supabase
      .from("checkout_sessions")
      .insert({
        session_token: sessionToken,
        selected_product_ids: params.selected_product_ids,
        source: params.source ?? null,
        utm_source: params.utm_source ?? null,
        utm_medium: params.utm_medium ?? null,
        utm_campaign: params.utm_campaign ?? null,
        status: "started",
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async logEvent(sessionId: string, eventType: string, productId?: string | null, metadata: any = {}) {
    const { error } = await supabase.from("checkout_events").insert({
      session_id: sessionId,
      event_type: eventType,
      product_id: productId ?? null,
      metadata,
    });
    if (error) console.error("Error logging event:", error);
  },

  async createPagarmeCheckout(params: {
    session_token: string;
    selected_product_ids: string[];
    customer: {
      name: string;
      email: string;
      phone: string;
    };
  }) {
    const response = await fetch('/api/checkout/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Falha ao criar checkout');
    return data as { checkout_url: string };
  },
};
