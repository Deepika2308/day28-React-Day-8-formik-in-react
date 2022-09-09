import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EditProduct } from "./EditProduct";
import {API} from "./global.js";

export function GetMovieForEdit() {
  const { id } = useParams();
  let [editProduct, setEditProduct] = useState(undefined);
  useEffect(() => {
    fetch(`${API}/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEditProduct(data);
      });
  }, []);
  return editProduct ? <EditProduct editProduct={editProduct} /> : "";
}
