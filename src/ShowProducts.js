import { useEffect, useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { useNavigate } from "react-router-dom";
import { AiFillExclamationCircle } from "react-icons/ai";
import { API } from "./global.js";
import { Header, ShowBufferImg } from "./App";

export function ShowProducts() {
  let [formProducts, setProducts] = useState([]);
  let [bufferImg, setBufferImg] = useState(true);
  let navigate = useNavigate();

  let fetchProducts = () => {
    fetch(`${API}/products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setBufferImg(false);
      });
  };

  useEffect(fetchProducts, []);

  return (
    <div className="container-fluid d-flex flex-column mt-3">
      <Header />
      <h3 className="mt-4 mb-4">Products</h3>
      {bufferImg ? <ShowBufferImg /> : ""}
      <div className="d-flex flex-wrap justify-content-evenly gap-3">
        {formProducts.map((obj, index) => {
          return (
            <div className="card bg-white d-flex flex-column" key={index}>
              <img src={obj.thumbnail} alt={`${obj.title}`}></img>
              <div className="card-body">
                <div className="card-title fw-bold">
                  <div>{`${obj.title}`}</div>
                </div>
                <div className="card-title d-flex justify-content-center gap-3">
                  <div>{`₹ ${obj.price}`}</div>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="right"
                    overlay={<Popover id="popover-basic">
                      <Popover.Body>{`${obj.description}`}</Popover.Body>
                    </Popover>}
                  >
                    <div className="desc-button">
                      <AiFillExclamationCircle size={20} />
                    </div>
                  </OverlayTrigger>
                </div>
                <div className="card-text">
                  <p className="fw-bold">{`${obj.brand}`}</p>
                  {/* <p className="text-wrap">{`${obj.description}`}</p> */}
                  <p>{`⭐ ${obj.rating}`}</p>
                  <p>{`Discount - ${obj.discountPercentage}%`}</p>
                  <p>{`Stock -${obj.stock}`}</p>
                </div>
                <div className="footer-buttons d-flex justify-content-center gap-4">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => navigate(`/edit-product/${obj.title}/${obj.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => {
                      fetch(
                        `${API}/products/${obj.id}`,
                        {
                          method: "DELETE",
                        }
                      ).then((response) => fetchProducts());
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
