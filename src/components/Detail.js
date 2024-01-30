import React from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { addItem } from "../store.js";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

let Box = styled.div`
  padding: 20px;
  color: gray;
`;

let YellowBtn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg == "blue" ? "white" : "black")};
  padding: 10px;
`;

function Detail(props) {
  let [tap, setTap] = useState(0);
  let { id } = useParams();
  let [fade2, setFade2] = useState("");
  let selproduct = props.shoes.find((x) => x.id == id);
  let dispatch = useDispatch();
  useEffect(() => {
    setFade2("end");
    return () => {
      setFade2("");
    };
  }, []);

  return (
    <div className={"container start " + fade2}>
      <Box>
        <YellowBtn bg="orange">오렌지색 버튼임</YellowBtn>
        <YellowBtn bg="blue">파란색 버튼임</YellowBtn>
      </Box>
      <div className="row">
        <div className="col-md-6">
          <img src={'/shop5/'+selproduct.imgUrl} width="80%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{selproduct.title}</h4>
          <p>{selproduct.content}</p>
          <p>{selproduct.price}</p>
          <Button
            variant="primary"
            onClick={() => {
              //  dispatch(addItem(  {id : 2,  imgurl : 'shoes1.jpg', name : 'Grey Yordan', count : 1}))

              dispatch(
                addItem({
                  id: selproduct.id,
                  imgurl: selproduct.imgUrl.replace("img/", ""),
                  name: selproduct.title,
                  count: 1,
                })
              );
            }}
            style={{ marginRight: "10px" }}
          >
            주문하기
          </Button>

          <Link to="/cart">
            <Button variant="outline-success"> 주문상품 확인하기 </Button>
          </Link>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTap(0);
            }}
            eventKey="link0"
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTap(1);
            }}
            eventKey="link1"
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTap(2);
            }}
            eventKey="link2"
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <TabContent tap={tap} />
    </div>
  );
}

function TabContent({ tap }) {
  let [fade, setFade] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 10);
    return () => {
      setFade("");
    };
  }, [tap]);

  return (
    <div className={"start " + fade}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tap]}
    </div>
  );
}

export default Detail;
