import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import styles from "../../styles/Category.module.css";
import Products from "../Product/Products";
import { useSelector } from "react-redux";

const Category = () => {
  const { id } = useParams();
  const currentCat = useSelector((state) => state.categories.list[id - 1]);

  const defaultParams = {
    title: "",
    price_min: "",
    price_max: "",
    categoryId: id,
    offset: 0,
    limit: 7,
  };

  const defaultValues = {
    title: "",
    price_min: "",
    price_max: "",
  };

  const [params, setParams] = useState(defaultParams);
  const [values, setValues] = useState(defaultValues);
  const [items, setItems] = useState([]);
  const [isEnd, setIsEnd] = useState(false);

  const { data, isLoading, isSuccess } = useGetProductsQuery(params);

  ///получение всех продуктов
  //   const { data: allData = [], isLoading: allDataIsLoading } = useGetProductsQuery({
  //     ...params,
  //     limit: 1000,
  //   });

  useEffect(() => {
    if (!id) return;
    setValues(defaultValues);
    setItems([]);
    setIsEnd(false);
    setParams({ ...defaultParams, categoryId: id });
  }, [id]);

  //   useEffect(() => {
  //     if (allDataIsLoading) return;
  //     const totalDataCount = allData.length;
  //     const loadedDataCount = items?.length + data.length;
  //     const remainingCount = totalDataCount - loadedDataCount;
  //     setRemainingCount(remainingCount);
  //     console.log("remainingCounts:" + remainingCount);
  //   }, [isLoading, data]);

  useEffect(() => {
    if (isLoading) return;
    console.log(data);
    if (!data.length) {
      return setIsEnd(true);
    } else {
      setItems((prevItems) => [...prevItems, ...data]);
    }
  }, [isLoading, data]);

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setParams({ ...defaultParams, ...values });

    console.log(params);
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title} style={{ textTransform: "capitalize" }}>
        {currentCat?.name}
      </h2>

      <form className={styles.filters} onSubmit={handleSubmit}>
        <div className={styles.filter}>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Product name"
            value={values.title}
          />
        </div>

        <div className={styles.filter}>
          <input
            type="number"
            name="price_min"
            onChange={handleChange}
            placeholder="Price from"
            value={values.price_min}
            onFocus={() => setValues({ ...values, price_min: "" })}
          />
        </div>

        <div className={styles.filter}>
          <input
            type="number"
            name="price_max"
            onChange={handleChange}
            placeholder="Price to"
            value={values.price_max}
            onFocus={() => setValues({ ...values, price_max: "" })}
          />
        </div>

        <button type="submit">Apply filters</button>
      </form>

      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : !isSuccess || !items.length ? (
        <div className={styles.back}>
          <span>No results</span>
          <button>Reset</button>
        </div>
      ) : (
        <Products products={items} style={{ padding: 0 }} />
      )}

      <div className={styles.more}>
        {!isEnd && (
          <button onClick={() => setParams({ ...params, offset: params.offset + params.limit })}>
            See more
          </button>
        )}
      </div>
    </section>
  );
};

export default Category;
