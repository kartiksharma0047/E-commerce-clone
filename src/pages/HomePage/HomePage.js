import React, { useEffect } from 'react';
import "./HomePage.scss";
import HeaderSlider from "../../components/Slider/HeaderSlider";
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories } from '../../store/categorySlice';
import ProductList from "../../components/ProductList/ProductList";
import { fetchAsyncProducts, getAllProducts, getAllProductsStatus } from '../../store/productSlice';
import Loader from "../../components/Loader/Loader";
import { STATUS } from '../../utils/status';

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);

  useEffect(() => {
    dispatch(fetchAsyncProducts(50));
  }, [dispatch]);

  const products = useSelector(getAllProducts);
  const productStatus = useSelector(getAllProductsStatus);

  // randomizing the products in the list
  const tempProducts = [...products].sort(() => Math.random() - 0.5);

  let catProductsOne = [];
  let catProductsTwo = [];
  let catProductsThree = [];
  let catProductsFour = [];

  if (categories.length >= 4) {
    catProductsOne = products.filter(product => product.category === categories[0].name); // Access appropriate property
    catProductsTwo = products.filter(product => product.category === categories[1].name); // Access appropriate property
    catProductsThree = products.filter(product => product.category === categories[2].name); // Access appropriate property
    catProductsFour = products.filter(product => product.category === categories[3].name); // Access appropriate property
  }

  return (
    <main>
      <div className='slider-wrapper'>
        <HeaderSlider />
      </div>
      <div className='main-content bg-whitesmoke'>
        <div className='container'>
          <div className='categories py-5'>
            <div className='categories-item'>
              <div className='title-md'>
                <h3>See our products</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={tempProducts} />}
            </div>

            {categories.length >= 4 && (
              <>
                <div className='categories-item'>
                  <div className='title-md'>
                    <h3>{categories[0].name}</h3> {/* Access appropriate property */}
                  </div>
                  {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsOne} />}
                </div>

                <div className='categories-item'>
                  <div className='title-md'>
                    <h3>{categories[1].name}</h3> {/* Access appropriate property */}
                  </div>
                  {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsTwo} />}
                </div>

                <div className='categories-item'>
                  <div className='title-md'>
                    <h3>{categories[2].name}</h3> {/* Access appropriate property */}
                  </div>
                  {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsThree} />}
                </div>

                <div className='categories-item'>
                  <div className='title-md'>
                    <h3>{categories[3].name}</h3> {/* Access appropriate property */}
                  </div>
                  {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsFour} />}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
