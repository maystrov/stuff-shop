import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery } from "../../features/api/apiSlice";
import { ROUTES } from "../../utils/routes";
import Product from "./Product";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isError } = useGetProductQuery({ id });
  console.log();

  useEffect(() => {
    if (isError) navigate(ROUTES.HOME);
  }, [isError, navigate]);

  return !data ? (
    <section className={StyleSheet.preloader}>Loading...</section>
  ) : (
    <Product {...data} />
  );
};

export default SingleProduct;
