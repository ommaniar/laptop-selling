import { useState, useEffect } from "react"
import axios from 'axios'
import ProductComponent from "./ProductComponent"
import PaginationPageBox from "./PaginationBox"
import Header from "./header"
function Shop() {
    const [productArray, setProductArray] = useState([])
    const [searchMessage, setSearchMessage] = useState([])
    const [filteredArray, setFilteredArray] = useState([])
    const [checkBoxArray, setCheckBoxArray] = useState([])
    const [page, setPage] = useState(1);
    const [pageArray, setPageArray] = useState([]);
    const [selectedBudget, setSelectedBudget] = useState([]);
    const [selectedProcessor, setSelectedProcessor] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);

    const PAGE_SIZE = 20;
    const paginate = (array, page_size, page_number) => {
        if (!array || array.length === 0) return [];
        const start = (page_number - 1) * page_size;
        const end = start + page_size;
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
    const applyFilters = () => {
       
    };  
   
    const handleCheckboxChange = (e, setState) => {
        const value = e.target.value;
        const isChecked = e.target.checked;

        setState(prevState => {
            if (isChecked) {
                return [...prevState, value];
            } else {
                return prevState.filter(item => item !== value);
            }
        });

        
        applyFilters();
    }
    useEffect(()=>{
        let updatedArray = filteredArray;

        console.log("Initial productArray:", productArray);

        if (selectedBudget.length > 0) {
            updatedArray = updatedArray.filter(product => {
                console.log("Product price:", product.price);

                const result = selectedBudget.some(budget => {
                    console.log("Applying budget filter:", budget);
                    switch (budget) {
                        case 'lt-40000':
                            return product.price < 40000;
                        case 'gt-40000-lt-70000':
                            return product.price >= 40001 && product.price <= 70000;
                        case 'gt-70000-lt-100000':
                            return product.price >= 70001 && product.price <= 100000;
                        case 'gt-100000':
                            return product.price > 100000;
                        default:
                            return true;
                    }
                });
                console.log("Filter result for product:", result);
                return result;
            });
        }

        console.log("Array after budget filter:", updatedArray);

        if (selectedCategory.length > 0) {
            updatedArray = updatedArray.filter(product => {
                console.log('category',selectedCategory)
                console.log("Checking category filter for product:", product.category);
                return selectedCategory.includes(product.category);
            });
        }

        console.log("Array after category filter:", updatedArray);

        const processorMap = {
            "i3": "Intel Core i3",
            "i5": "Intel Core i5",
            "i7": "Intel Core i7",
            "i9": "Intel Core i9",
            "r3": "AMD Ryzen 3",
            "r5": "AMD Ryzen 5",
            "r7": "AMD Ryzen 7",
            "r9": "AMD Ryzen 9"
        };
        
        if (selectedProcessor.length > 0) {
            updatedArray = updatedArray.filter(product => {
                console.log('selectedProcessor:', selectedProcessor);
                console.log("Checking processor filter for product:", product.processor);
                return selectedProcessor.some(processor => { // Use 'some' instead of 'filter'
                    const mappedProcessor = processorMap[processor];
                    console.log(product);
                    console.log('processor:', product.processor);
                    console.log(product.processor.includes(mappedProcessor)); // Get full processor name
                    return product.processor.includes(mappedProcessor);
                });
            });
        }
        console.log(updatedArray)
        
        if((selectedBudget.length === 0) && (selectedCategory.length === 0) && (selectedProcessor.length === 0)){
            updatedArray = productArray;
        }

        console.log("Final filtered array:", updatedArray);

        setCheckBoxArray(updatedArray);
    },[selectedBudget,selectedCategory,selectedProcessor])
    useEffect(()=>{
        setFilteredArray(checkBoxArray)
    },[checkBoxArray])
    useEffect(() => {
        console.log('Selected Category:', selectedCategory);
        console.log('Selected Budget:', selectedBudget);
        console.log('Selected Processor:', selectedProcessor);

    }, [selectedCategory, selectedBudget, selectedProcessor]);  // This will trigger when any of these states change


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get-available-products')
            .then(res => {
                setProductArray(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    // Update pagination and filteredArray when products change
    useEffect(() => {
        if (productArray.length > 0) {
            const maxPages = get_max_page(productArray.length, PAGE_SIZE);
            setPageArray(generateArray(maxPages));
            // Ensure filteredArray reflects the correct page
            // setFilteredArray(paginate(products, PAGE_SIZE, page));
        }
    }, [productArray, page]);


    useEffect(() => {
        console.log('Current Page:', page);
        console.log('Products Length:', productArray.length);
        console.log('Filtered Array:', filteredArray);
    }, [page, filteredArray]);
    const handleSearch = (e) => {
        const value = e.target.value;
        // console.log('Search value:', value);

        if (value === '') {
            // Show all products if the search input is empty
            setFilteredArray(productArray);
            setSearchMessage(''); // Clear the search message
        } else {
            // Filter products based on the search value
            const filtered = productArray.filter((item) =>
                ['name', 'color', 'gpu', 'description', 'processor', 'ssd', 'ram'].some((key) =>
                    item[key] && item[key].toString().toLowerCase().includes(value.toLowerCase())
                )
            );
            setPage(1)
            // console.log('Filtered results:', filtered);

            if (filtered.length === 0) {
                setSearchMessage('No Data Found');
            } else {
                setSearchMessage('');
            }
            setFilteredArray(filtered);
        }
    };


    const handleFilter = (e) => { }

    return (
        <section id="main">
            <Header />
            <div className="container-fluid">


                <div className="row min-vh-100">
                    <div className="col-md-3 mt-3">
                        <div className="accordion" id="accordian-filter">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#budget-accordian" aria-expanded="true" aria-controls="collapseOne">
                                        Budget
                                    </button>
                                </h2>
                                <div id="budget-accordian" className="accordion-collapse collapse show"
                                    data-bs-parent="#accordian-filter">
                                    <div className="accordion-body">
                                        <form>
                                            <div className="form-check">
                                                <input type="checkbox" name="budget" id="lt-40000" value="lt-40000"
                                                    className="form-check-input" onChange={(e) => handleCheckboxChange(e, setSelectedBudget, selectedBudget)} /> <label for="lt-40000" className="form-check-label">Under
                                                        &#8377;40,000</label>
                                            </div>
                                            <div className="form-check"><input type="checkbox" name="budget" id="gt-40000-lt-70000"
                                                value="gt-40000-lt-70000" className="form-check-input" onChange={(e) => handleCheckboxChange(e, setSelectedBudget, selectedBudget)} /> <label for="gt-40000-lt-70000"
                                                    className="form-check-label"  > &#8377;40,001 -
                                                    &#8377;70,000</label></div>
                                            <div className="form-check"><input type="checkbox" name="budget" id="gt-70000-lt-100000"
                                                value="gt-70000-lt-100000" className="form-check-input" onChange={(e) => handleCheckboxChange(e, setSelectedBudget, selectedBudget)} /> <label for="gt-70000-lt-100000"
                                                    className="form-check-label" > &#8377;70,001 -
                                                    &#8377;1,00,000</label></div>
                                            <div className="form-check"><input type="checkbox" name="budget" id="gt-100000"
                                                value="gt-100000" className="form-check-input" onChange={(e) => handleCheckboxChange(e, setSelectedBudget, selectedBudget)} /> <label for="gt-100000"
                                                    className="form-check-label">Above &#8377;1,00,000</label></div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">

                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#processor-accordian" aria-expanded="false" aria-controls="collapseTwo">
                                        Processor
                                    </button>
                                </h2>
                                <div id="processor-accordian" className="accordion-collapse collapse"
                                    data-bs-parent="#accordian-filter">
                                    <div className="accordion-body">
                                        <form>
                                            <div className="form-check">
                                                <input type="checkbox" name="processor" id="i3" value="i3"
                                                    className="form-check-input" onChange={(e) => handleCheckboxChange(e, setSelectedProcessor, selectedProcessor)} /> <label for="i3"
                                                        className="form-check-label">Intel Core I3</label>
                                            </div>
                                            <div className="form-check"><input type="checkbox" name="processor" id="i5"
                                                value="i5" className="form-check-input" onChange={(e) => handleCheckboxChange(e, setSelectedProcessor, selectedProcessor)} /> <label for="i5"
                                                    className="form-check-label">Intel Core I5</label></div>
                                            <div className="form-check"><input type="checkbox" name="processor" id="i7"
                                                value="i7" className="form-check-input" onChange={(e) => handleCheckboxChange(e, setSelectedProcessor, selectedProcessor)} /> <label for="i7"
                                                    className="form-check-label">Intel Core I7</label></div>
                                            <div className="form-check"><input type="checkbox" name="processor" id="i9"
                                                value="i9" className="form-check-input" onChange={(e) => handleCheckboxChange(e, setSelectedProcessor, selectedProcessor)} /> <label for="i9"
                                                    className="form-check-label">Intel Core I9</label></div>
                                            <div className="form-check"><input type="checkbox" name="processor" id="r3"
                                                value="r3" className="form-check-input" onChange={(e) => handleCheckboxChange(e, setSelectedProcessor, selectedProcessor)} /> <label for="r3"
                                                    className="form-check-label">AMD Ryzen 3</label></div>
                                            <div className="form-check"><input type="checkbox" name="processor" id="r5"
                                                value="r5" className="form-check-input" onChange={(e) => handleCheckboxChange(e, setSelectedProcessor, selectedProcessor)} /> <label for="r5"
                                                    className="form-check-label">AMD Ryzen 5</label></div>
                                            <div className="form-check"><input type="checkbox" name="processor" id="r7"
                                                value="r7" className="form-check-input" onChange={(e) => handleCheckboxChange(e, setSelectedProcessor, selectedProcessor)} /> <label for="r7"
                                                    className="form-check-label">AMD Ryzen 7</label></div>
                                            <div className="form-check"><input type="checkbox" name="processor" id="r9"
                                                value="r9" className="form-check-input" onChange={(e) => handleCheckboxChange(e, setSelectedProcessor, selectedProcessor)} /> <label for="r9"
                                                    className="form-check-label">AMD Ryzen 9</label></div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">

                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#category-accordian" aria-expanded="false"
                                        aria-controls="collapseThree">
                                        Category
                                    </button>
                                </h2>
                                <div id="category-accordian" className="accordion-collapse collapse"
                                    data-bs-parent="#accordian-filter">
                                    <div className="accordion-body">
                                        <form>
                                            <div className="form-check">
                                                <input type="checkbox" name="category" id="Everyday-laptop" value="Everyday"
                                                    className="form-check-input" onChange={(e) => handleCheckboxChange(e, setSelectedCategory, selectedCategory)} /> <label for="Everyday-laptop"
                                                        className="form-check-label">Everyday Laptop</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" name="category" id="Gaming-laptop" value="Gaming"
                                                    className="form-check-input" onChange={(e) => handleCheckboxChange(e, setSelectedCategory, selectedCategory)} /> <label for="Gaming-laptop"
                                                        className="form-check-label">Gaming Laptop</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" name="category" id="Thin-and-light"
                                                    value="Thin_Light" className="form-check-input" onChange={(e) => handleCheckboxChange(e, setSelectedCategory, selectedCategory)} /> <label
                                                        for="Thin-and-light-laptop" className="form-check-label">Thin and Light Laptop</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" name="category" id="Multitasking-laptop" value="Multitasking"
                                                    className="form-check-input" onChange={(e) => handleCheckboxChange(e, setSelectedCategory, selectedCategory)} /> <label for="Multitasking-laptop"
                                                        className="form-check-label">Multitasking Laptop</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" name="category" id="Developer-laptop" value="Developer"
                                                    className="form-check-input" onChange={(e) => handleCheckboxChange(e, setSelectedCategory, selectedCategory)} /> <label for="Developer-laptop"
                                                        className="form-check-label">Developer Laptop</label>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">

                        <div className="container" id="container3">
                            <div className="row my-1 ">
                                <div className="col-auto m-2 w-100">
                                    <div className="d-flex">
                                        <input
                                            className="form-control me-2 w-100"
                                            id="searchInput"
                                            type="search"
                                            placeholder="Enter Search"
                                            onChange={handleSearch}
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className="row">
                                {paginate((filteredArray.length > 0 ? filteredArray : productArray), PAGE_SIZE, page).map(product => (

                                    <>
                                        <ProductComponent pid={product.pid} name={product.name} image={product.main_image} mrp={product.mrp} price={product.price} />
                                    </>)
                                )
                                }
                            </div>
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
            </div>

        </section>
    )

}

export default Shop