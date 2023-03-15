import Navbar from "@/component/Header/navbar/Navbar"
import Products from "@/component/product/products"
import style from '../../styles/category/category.module.scss'
import axios from 'axios'
import { useRouter } from 'next/router'



const Category = ({ products }) => {
    if (!products) return
    return (

        <>
            <Navbar />
            <div className={style.categoryMainContent}>
                <div className={style.layout}>
                    <div className={style.productContainer}>
                        <Products products={products} />
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const params = {
        Headers: {
            Authorization: "bearer" + process.env.STRAPI_PUB_TOKEN,
        }
    }
    const product = await axios.get(`http://localhost:1337/api/categories`, params)
    const products = await product.data
    return {
        paths: [

            { params: { slug: '1' } }
        ],
        fallback: true,
    }
}

export async function getStaticProps({ params }) {
    const { slug } = params
    const param = {
        Headers: {
            Authorization: "bearer" + process.env.STRAPI_PUB_TOKEN,
        }
    }
    const product = await axios.get(`http://localhost:1337/api/products?populate=*&[filters][categories][id]=${slug}`, param)
    const products = await product.data.data
    return {
        props: {

            products,

        },
    }

}

export default Category