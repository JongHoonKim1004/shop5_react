import { Button, Navbar, Container, Nav } from "react-bootstrap";
import data from "./db/shoes";
import { useState } from "react";
import Products from "./components/Products";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./components/Detail";
import Title from "./components/Title";
import Title2 from "./components/Title2";
import inike from "./db/inike";
import Nike from "./components/nike";
import Footer from "./components/Footer";
import axios from "axios";
import Cart from "./components/Cart";

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [nike, setNike] = useState(inike);
  let [count, setCount] = useState(1);

  return (
    <div className="App">
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">슈마커</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/detail/0");
                }}
              >
                Detail
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/Cart");
                }}
              >
                Cart
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/About");
                }}
              >
                About
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="slider"></div>
                <Title />
                <div class="container">
                  <div class="row">
                    <div style={{ textAlign: "center" }}>
                      <Button
                        variant="outline-primary"
                        onClick={() => {
                          let copy3 = [...shoes].sort((a, b) =>
                            a.title > b.title ? 1 : -1
                          );
                          setShoes(copy3);
                        }}
                      >
                        이름순 정렬
                      </Button>{" "}
                      <Button
                        variant="outline-secondary"
                        onClick={() => {
                          let copy4 = [...shoes].sort((a, b) =>
                            a.price > b.price ? 1 : -1
                          );

                          setShoes(copy4);
                        }}
                      >
                        낮은가격순 정렬
                      </Button>{" "}
                      <Button
                        variant="outline-success"
                        onClick={() => {
                          let copy5 = [...shoes].sort((a, b) =>
                            b.price > a.price ? 1 : -1
                          );
                          setShoes(copy5);
                        }}
                      >
                        높은가격순 정렬
                      </Button>{" "}
                    </div>
                  </div>
                </div>
                <div className="container" style={{ marginTop: "30px" }}>
                  <div className="row">
                    {shoes.map((ele, i) => {
                      return (
                        <Products shoes={shoes[i]} i={i} key={data[i].id} />
                      );
                    })}
                  </div>
                </div>
                <div class="container">
                  <div class="row">
                    <div style={{ textAlign: "center" }}>
                      <Title2 />
                      <Button
                        variant="outline-success"
                        count={count}
                        onClick={() => {
                          if (count == 1) {
                            axios
                              .get(
                                "https://dino-21.github.io/react_data/nike2.json"
                              )
                              .then((result) => {
                                let copy10 = [...nike, ...result.data];
                                setNike(copy10);
                                setCount(count + 1);
                              });
                          } else if (count == 2) {
                            axios
                              .get(
                                "https://dino-21.github.io/react_data/nike3.json"
                              )
                              .then((result) => {
                                let copy11 = [...nike, ...result.data];
                                setNike(copy11);
                                setCount(count + 1);
                              });
                          }

                          if (count === 3) {
                            alert("더이상 상품이 없습니다.");
                          }
                        }}
                      >
                        {" "}
                        + 3개 상품 더 보기{" "}
                      </Button>{" "}
                    </div>
                  </div>
                </div>
                <div className="container" style={{ marginTop: "30px" }}>
                  <div className="row">
                    {nike.map((ele, i) => {
                      return <Nike nike={nike[i]} key={nike[i].id} />;
                    })}
                  </div>
                </div>
                <Footer />
              </>
            }
          />
          <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/About" element={<About />}>
            <Route path="member" element={<Member />} />
            <Route path="location" element={<Location />} />
          </Route>
        </Routes>
      </>
    </div>
  );
}

function About() {
  return (
    <>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </>
  );
}

function Member() {
  return (
    <>
      <h4>Member</h4>
    </>
  );
}

function Location() {
  return (
    <>
      <h4>Location</h4>
    </>
  );
}

export default App;
