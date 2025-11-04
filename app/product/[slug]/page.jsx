import React from 'react';
import { client } from '../../../lib/client';
import ProductClient from './ProductDetailsClient';

export async function generateStaticParams() {
  try {
    const query = `*[_type == "product"]{ slug { current } }`;
    const products = await client.fetch(query);
    
    return products.map((product) => ({ 
      slug: product.slug.current 
    }));
  } catch (error) {
    console.error('❌ Error in generateStaticParams:', error);
    return [];
  }
}

const ProductDetails = async ({ params }) => {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  
  if (!slug) {
    return (
      <div className='product-detail-container' style={{ padding: '40px' }}>
        <h1>Erreur : Slug manquant</h1>
      </div>
    );
  }
  
  try {
    const query = `*[_type == "product" && slug.current == $slug][0]`;
    const productsQuery = '*[_type == "product"]';

    const product = await client.fetch(query, { slug });
    const products = await client.fetch(productsQuery);

    console.log('✅ Produit:', product); // Debug
    console.log('✅ Products:', products); // Debug

    if (!product) {
      return (
        <div className='product-detail-container' style={{ padding: '40px' }}>
          <h1>Produit non trouvé 😢</h1>
        </div>
      );
    }

    return <ProductClient product={product} products={products} />;

  } catch (error) {
    console.error('❌ Erreur:', error);
    return (
      <div className='product-detail-container' style={{ padding: '40px' }}>
        <h1>Erreur de chargement</h1>
        <pre>{error.message}</pre>
      </div>
    );
  }
};

export default ProductDetails;