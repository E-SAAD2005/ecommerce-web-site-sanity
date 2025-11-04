import React from 'react';
import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../componenet';

const Home = async () => {
  const productsQuery = '*[_type == "product"]';
  const bannerQuery = '*[_type == "banner"]';

  const products = await client.fetch(productsQuery);
  const bannerData = await client.fetch(bannerQuery);

  return (
    <div>
      <HeroBanner heroBanner={bannerData?.length && bannerData[0]} />

      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <p>Speakers — There are many variations of passages</p>
      </div>

      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  );
};

export default Home;
