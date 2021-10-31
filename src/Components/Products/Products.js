import styled from "styled-components";
import Product from "../Product/Product";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isloading, setloading] = useState(false)

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `https://ecommerce-api-bookstore.herokuapp.com/api/products?category=${cat}`
            : "https://ecommerce-api-bookstore.herokuapp.com/api/products"
        );
        setProducts(res.data);
        setloading(false)
      } catch (err) {
        setloading(false)
      }
    };
    setloading(true)
    getProducts();
  }, [cat]);

  const calculatesort = () => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products
      );
  }, [products, cat]);

  useEffect(() => {
    calculatesort()
  }, [sort]);

  useEffect(()=>{
      if (filters == "All"){
        setFilteredProducts(products)
      }else if (filters == "100"){
        setFilteredProducts(products.filter((item)=> item.price <= 100))
      }else{
        setFilteredProducts(products.filter((item)=> item.price <= 500))
      }

      calculatesort()
  }, [filters])

  return isloading ? (<Loader />) : (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;