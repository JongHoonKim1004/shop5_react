import React from "react";
import { useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap'

const Products = (props) => {
  let navigate = useNavigate();
  console.log(props);
  const { title, price, imgUrl, content, id } = props.shoes;
  console.log('id :', id);
  return (
    <div className="col-md-4">
      <Nav.Link onClick={() => {navigate('/detail/'+ id) }} className="c1" >
        <img src={imgUrl} width="80%" />
        <h4>{title}</h4>
        <p>{price}</p>
      </Nav.Link>
    </div>
  );
};

export default Products;
