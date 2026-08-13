import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/public/pagarme-webhook')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const payload = await request.json()
          const signature = request.headers.get('x-pagarme-signature')

          // Import supabaseAdmin dynamically inside the handler
          const { supabaseAdmin } = await import('@/integrations/supabase/client.server')

          const eventId = payload.id
          const orderId = payload.data?.id
          const status = payload.type

          // Idempotency check
          const { data: existingEvent } = await supabaseAdmin
            .from('webhook_events')
            .select('id')
            .eq('external_event_id', eventId)
            .single()

          if (existingEvent) {
            return new Response('Already processed', { status: 200 })
          }

          // Register Event
          await supabaseAdmin.from('webhook_events').insert({
            external_event_id: eventId,
            event_type: status,
            payload
          })

          // Update Order Status
          let internalStatus = 'pending'
          if (status === 'order.paid') internalStatus = 'paid'
          if (status === 'order.canceled') internalStatus = 'canceled'
          if (status === 'order.failed') internalStatus = 'failed'

          if (orderId) {
            await supabaseAdmin
              .from('orders')
              .update({ status: internalStatus, updated_at: new Date().toISOString() })
              .eq('pagarme_order_id', orderId)
          }

          return new Response('ok', { status: 200 })
        } catch (error) {
          console.error('Webhook error:', error)
          return new Response('Error', { status: 400 })
        }
      }
    }
  }
})
