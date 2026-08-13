import { createFileRoute } from '@tanstack/react-router'
import { supabase } from '@/integrations/supabase/client'
// In a real server environment, we would use supabaseAdmin for privileged tasks
// but since we're in TanStack Start, we can import it inside the handler.

export const Route = createFileRoute('/api/checkout/create')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { session_token, selected_product_ids, customer } = await request.json()

          // Import supabaseAdmin dynamically inside the handler
          const { supabaseAdmin } = await import('@/integrations/supabase/client.server')

          // 1. Validate Session
          const { data: session, error: sessionError } = await supabaseAdmin
            .from('checkout_sessions')
            .select('*')
            .eq('session_token', session_token)
            .single()

          if (sessionError || !session) {
            return new Response(JSON.stringify({ error: 'Sessão de checkout inválida' }), { 
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            })
          }

          // 2. Fetch and Validate Products
          const { data: products, error: productsError } = await supabaseAdmin
            .from('products')
            .select('*')
            .in('id', selected_product_ids)
            .eq('is_active', true)

          if (productsError || !products || products.length === 0) {
            return new Response(JSON.stringify({ error: 'Produtos inválidos ou inativos' }), { 
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            })
          }

          // 3. Fetch Order Bumps prices
          const { data: bumps, error: bumpsError } = await supabaseAdmin
            .from('order_bumps')
            .select('product_id, bump_price')
            .in('product_id', selected_product_ids)
            .eq('is_active', true)

          // 4. Calculate Totals
          let subtotal = 0
          const items = products.map(p => {
            const bump = bumps?.find(b => b.product_id === p.id)
            const price = bump ? Number(bump.bump_price) : Number(p.price)
            subtotal += price
            return {
              product_id: p.id,
              name: p.name,
              price,
              is_bump: !!bump
            }
          })

          // 5. Create Order
          const { data: order, error: orderError } = await supabaseAdmin
            .from('orders')
            .insert({
              customer_name: customer?.name || 'Cliente',
              customer_email: customer?.email,
              customer_phone: customer?.phone,
              subtotal: subtotal,
              total: subtotal,
              status: 'pending',
              metadata: { session_token, source: session.source }
            })
            .select()
            .single()

          if (orderError) throw orderError

          // Create Order Items
          const orderItems = items.map(item => ({
            order_id: order.id,
            product_id: item.product_id,
            product_name: item.name,
            unit_price: item.price,
            is_order_bump: item.is_bump
          }))

          await supabaseAdmin.from('order_items').insert(orderItems)

          // 6. Pagar.me Integration (Mock for now as per Phase 3 requirements)
          const pagarmeKey = process.env['PAGARME_SECRET_KEY']
          
          // Simulation of Pagar.me response
          const mockPagarmeResponse = {
            id: "ord_" + Math.random().toString(36).substring(2, 11),
            checkouts: [{
              id: "chk_" + Math.random().toString(36).substring(2, 11),
              payment_url: "https://pagar.me/checkout/mock-url-" + order.id
            }]
          }

          // Update order with external IDs
          await supabaseAdmin
            .from('orders')
            .update({
              pagarme_order_id: mockPagarmeResponse.id,
              pagarme_checkout_id: mockPagarmeResponse.checkouts[0].id,
              pagarme_checkout_url: mockPagarmeResponse.checkouts[0].payment_url
            })
            .eq('id', order.id)

          return new Response(JSON.stringify({ checkout_url: mockPagarmeResponse.checkouts[0].payment_url }), {
            headers: { 'Content-Type': 'application/json' }
          })

        } catch (error: any) {
          console.error('Error creating checkout:', error)
          return new Response(JSON.stringify({ error: error.message }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          })
        }
      }
    }
  }
})
