import React, { useEffect, useRef, useState } from "react"
import ProductCard from "./ProductCard"

const ProductList = () => {
  const [productList, setProductList] = useState([])
  const [page, setPage] = useState(0)
  const [hasProducts, setHasProducts] = useState(true)
  const loaderRef = useRef(null)

  const productLimit = 10
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `https://dummyjson.com/products?limit=${productLimit}&skip=${
          page * productLimit
        }`
      )
      const data = await res.json()

      console.log(data)

      if (data.products.length === 0) {
        setHasProducts(false)
      } else {
        setProductList([...productList, ...data.products])
        setPage((prevPage) => prevPage + 1)
      }
    }

    const onIntersection = (items) => {
      const loaderItem = items[0]

      if (loaderItem.isIntersecting && hasProducts) {
        fetchProducts()
      }
    }

    const observer = new IntersectionObserver(onIntersection)

    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (observer) observer.disconnect()
    }
  }, [page, hasProducts, productList])

  return (
    <>
      <h1 className="text-3xl font-bold">Product List</h1>
      <div className="flex flex-col justify-items-center items-center">
        {productList.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            thumbnail={product.thumbnail}
            rating={product.rating}
          />
        ))}
      </div>

      <div>{hasProducts && <p ref={loaderRef}>product is loading...</p>}</div>
    </>
  )
}

export default ProductList
