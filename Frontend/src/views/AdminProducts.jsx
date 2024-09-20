import React, { useEffect, useState } from 'react'
import AdminNavigtion from './AdminNavigtion'
import axios from 'axios'
import ProductComponent from './ProductComponent'
import PaginationPageBox from './PaginationBox'

import AdminProductComponent from './AdminProductComponent'
function Products() {
  const [products, setProducts] = useState([])
  const [searchMessage, setSearchMessage] = useState([])
  const [page, setPage] = useState(1);
  const [pageArray, setPageArray] = useState([]);
  const [filteredArray, setFilteredArray] = useState([])
  const PAGE_SIZE = 20;
  const paginate = (array, page_size, page_number) => {
    if (!array || array.length === 0) return [];
    const start = (page_number - 1) * page_size;
    const end = start + page_size;
    console.log('Paginate Start:', start, 'End:', end);
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  };

  const get_max_page = (item_len, page_len) => {
    return Math.ceil(item_len / page_len);
  };

  const generateArray = (input) => {
    return Array.from({ length: input }, (_, index) => index + 1);
  };

  const handlePagination = (e) => {
    setPage(parseInt(e.target.value));
  }
  useEffect(() => {
    axios.post('http://127.0.0.1:8000/api/all-products')
      .then(res => {
        setProducts(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // Update pagination and filteredArray when products change
  useEffect(() => {
    if (products.length > 0) {
      const maxPages = get_max_page(products.length, PAGE_SIZE);
      setPageArray(generateArray(maxPages));
      // Ensure filteredArray reflects the correct page
      // setFilteredArray(paginate(products, PAGE_SIZE, page));
    }
  }, [products, page]);


  useEffect(() => {
    console.log('Current Page:', page);
    console.log('Products Length:', products.length);
    console.log('Filtered Array:', filteredArray);
  }, [page, filteredArray]);
  const handleSearch = (e) => {
    const value = e.target.value;
    console.log('Search value:', value);

    if (value === '') {
      // Show all products if the search input is empty
      setFilteredArray(products);
      setSearchMessage(''); // Clear the search message
    } else {
      // Filter products based on the search value
      const filtered = products.filter((item) =>
        ['name', 'color', 'gpu', 'description', 'processor', 'ssd', 'ram'].some((key) =>
          item[key] && item[key].toString().toLowerCase().includes(value.toLowerCase())
        )
      );
      setPage(1)
      console.log('Filtered results:', filtered);

      if (filtered.length === 0) {
        setSearchMessage('No Data Found');
      } else {
        setSearchMessage('');
      }
      setFilteredArray(filtered);
    }
  };

  return (
    <div>
      <AdminNavigtion />
      <div class="container" id="container3">
        <div className="row my-1">
          <div className="col-auto m-2">
            <div className="d-flex">
              <input
                className="form-control me-2"
                id="searchInput"
                type="search"
                placeholder="Enter Search"
                onChange={handleSearch}
              />
            </div>

          </div>
        </div>
        <div class="row">
          {paginate((filteredArray.length > 0 ? filteredArray : products), PAGE_SIZE, page).map(product => (
            <AdminProductComponent
              key={product.pid}
              pid={product.pid}
              name={product.name}
              image={product.main_image}
              mrp={product.mrp}
              price={product.price}
              stock={product.stock}
            />
          ))}
        </div>
        <div>
          <ul className='pagination'> 
            {pageArray.map(item => (
              <PaginationPageBox
                key={item} // Using item as key
                pageNo={item}
                handler={handlePagination}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Products