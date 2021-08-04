import React,{useState,useEffect} from 'react'
import {useParams,useHistory} from 'react-router-dom';
import axios from "axios";
const ProductForm = () => {
  const [category, setCategory] = useState([]);

  async function fetchData() {
    const categoryAPI = "/category/";

    await axios.get(categoryAPI).then((res) => {
      setCategory(res.data);
    });
  }
  // useEffect(() => {
  //   fetchData();
  // }, []);
  const [data,setData]=useState({
    id:'',
    name: '', 
    owner: '',
    price:'',
    productImage:'',
    category:'',
 });
 var history = useHistory();
 const { id } = useParams();
  async function fetchDataProduct() {
    const dataProduct={...data};
       await axios.get("/product/" + id).then(
         res=> {
          dataProduct.name=res.data.name;
          dataProduct.owner=res.data.owner;
          dataProduct.price=res.data.price;
          dataProduct.productImage=res.data.productImage;
          dataProduct.category=res.data.category;
          dataProduct.id=res.data._id;
          setData(dataProduct);
                  }
      );
  }
useEffect(()=>{
  fetchData();
  if (id !== "new") {
      fetchDataProduct();
      // console.log(getdata);     
  }
},[]);
const handleSubmit = async (e) => {
  e.preventDefault();
  //add
  if (id === "new") {
    const obj = { ...data};
    await axios.post("/product", obj);
    console.log("saved");
    
  } //Edit
  else{
      const obj = { ...data};
      //delete id
      delete obj.id;
      await axios.patch("/product/"+data.id,obj)
  }
 
  history.replace("/");
};

const handelChange = (e) => {
  if(e.target.name==='category'){
    category.map((p) =>
    {
      if(p.category===e.target.value){
        e.target.value=p._id;
      
      }
      return 0;
    }
    );
    // console.log(newProduct._id);
  }
  const { name, value } = e.target;

setData({
...data,
[name]: value
});
};   
  return (  
    <>
         <h1>
          {id === "new"
            ? "Add Product"
            : "Edit Product"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              value={data.name}
              onChange={handelChange}
              name="name"
              id="name"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">owner</label>
            <input
              value={data.owner}
              onChange={handelChange}
              name="owner"
              id="owner"
              type="text"
              className="form-control"
            />
          </div>
          
          
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              value={data.price}
              onChange={handelChange}
              name="price"
              id="price"
              type="number"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Product Image</label>
            <input
              value={data.productImage}
              onChange={handelChange}
              name="productImage"
              id="productImage"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Category</label>
            <input
              value={data.category.category}
              onChange={handelChange}
              name="category"
              id="category"
              type="text"
              className="form-control"
            />
            <label htmlFor="name">quantity</label>
            <input
              value={data.quantity}
              onChange={handelChange}
              name="quantity"
              id="quantity"
              type="number"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {id === "new" ? "Add" : "Edit"}
          </button>
        </form>
      </>
    
  );
}
 
export default ProductForm;
