import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Products from "../Product/Products";
import Poster from "../Poster/Poster";
import Categories from "../Categories/Categories";
import Banner from "../Banner/Banner";
import { filterByPrice } from "../../features/products/productsSlice";

const Home = () => {
  const products = useSelector((store) => store.products);
  const categories = useSelector((store) => store.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!products.list.length) return;
    dispatch(filterByPrice(100));
  }, [dispatch, products.list.length]);

  return (
    <>
      <Poster />
      <Products products={products.list} amount={5} title="Trending" />
      <Categories products={categories.list} amount={5} title="Best Categories" />
      <Banner />
      <Products products={products.filtered} amount={5} title="Less than 100$" />
    </>
  );
};

export default Home;
