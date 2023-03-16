import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import Banner from '@/component/banner/banner'
import ProductSlide from '@/component/productSlide/productSlide'
import Products from '@/component/product/products'
import SocailBar from '@/component/Header/socialBar/socialBar'
import SearchBar from '@/component/Header/serchBar/SearchBar'
import Navbar from '@/component/Header/navbar/Navbar'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })
import axios from 'axios'


export default function Home({ posts, products, categories }) {

  const url = process.env.NEXT_PUBLIC_STRAPI_URL

  return (
    <>
      <Head>
        <title>Phone Store</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SocailBar />
      <SearchBar />
      <Navbar />
      <Banner posts={posts} />
      <ProductSlide products={products} heading={'New Products'} />
      <div className={styles.productSection}>
        <div className={styles.left}>
          <h3>CATEGORY</h3>
          <ul>
            {
              categories?.map((item) => (
                <li key={item.attributes.createdAt}><Link className={styles.cat} href={`/category/${item.id}`}>{item.attributes.title}</Link></li>
              ))
            }
          </ul>
        </div>
        <div className={styles.right}>
          <Products products={products} section={'All Product'} />
        </div>
      </div>
      <ProductSlide products={products} heading={'Most Sell'} />
    </>
  )
}


export async function getStaticProps() {

  const url = process.env.NEXT_PUBLIC_STRAPI_URL


  const params = {
    Headers: {
      Authorization: "bearer" + process.env.STRAPI_PUB_TOKEN,
    }
  }

  const banner = await axios.get(`${url}/api/banners?populate=*`, params)
  const product = await axios.get(`${url}/api/products?populate=*`, params)
  const category = await axios.get(`${url}/api/categories?populate=*`, params)
  const posts = await banner.data.data
  const products = await product.data.data
  const categories = await category.data.data
  return {
    props: {
      posts,
      products,
      categories,
    },
  }

}