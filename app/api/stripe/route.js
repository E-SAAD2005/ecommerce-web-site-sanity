import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request) {
  console.log('🔵 POST request received');
  
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('❌ STRIPE_SECRET_KEY missing');
      return NextResponse.json(
        { error: 'Configuration manquante' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const cartItems = await request.json();

    console.log('✅ Cart items:', cartItems.length);

    const params = {
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: 'mad',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${request.headers.get('origin')}/success`,
      cancel_url: `${request.headers.get('origin')}/`,
    };

    const session = await stripe.checkout.sessions.create(params);
    console.log('✅ Session ID:', session.id);

    return NextResponse.json({ id: session.id });

  } catch (error) {
    console.error('❌ Error:', error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}