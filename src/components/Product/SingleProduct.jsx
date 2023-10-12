import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery } from "../../features/api/apiSlice";
import { ROUTES } from "../../utils/routes";
import Product from "./Product";
import Products from "./Products";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedProducts } from "../../features/products/productsSlice";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list, related } = useSelector((store) => store.products);

  const { data, isError, isSuccess } = useGetProductQuery({ id });

  useEffect(() => {
    if (isError) navigate(ROUTES.HOME);
  }, [isError, navigate]);

  useEffect(() => {
    if (!isSuccess || !list.length) return;
    dispatch(getRelatedProducts(data.category.id));
  }, [isSuccess, list.length]);

  return !data ? (
    <section className="preloader">Loading...</section>
  ) : (
    <>
      <Product {...data} />
      <Products products={related} amount={5} title="Related products" />
    </>
  );
};

export default SingleProduct;
