import React from "react";
import { useSelector } from "react-redux";
import Products from "../Product/Products";
import Poster from "../Poster/Poster";
import Categories from "../Categories/Categories";
import Banner from "../Banner/Banner";

const Home = () => {
  const products = useSelector((store) => store.products);
  const categories = useSelector((store) => store.categories);
  console.log(products);

  return (
    <>
      <Poster />
      <Products products={products.list} amount={5} title="Trending" />
      <Categories products={categories.list} amount={5} title="Best Categories" />
      <Banner />
    </>
  );
};

export default Home;
