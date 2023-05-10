// import {useState,useEffect} from "react";
// import {useDispatch} from "react-redux";
// import {useSelector} from "react-redux";
// import EclipseWidget from '../common/louding';
// import http from "../../http_common";
// import { getProduct } from '../../actions/products';

// const HomePage = () => {
//         const dispatch = useDispatch();

//      const { list } = useSelector(state => state.prod);

//          useEffect(()=>
//     {
//         dispatch(getProduct());
//         console.log("Request to server");
//     },[]);

//     console.log("Render component users")
//         return(

//             <div className="offset-2 col-md-6 ">
//               <h1 className="text-center">Список продуктів</h1>
//                 <table className="table table-success table-striped">
//                 <thead className="thead-dark">
//                     <tr>

//                         <th scope="col">Фото</th>
//                         <th scope="col">Назва</th>
//                         <th scope="col">Ціна</th>

//                     </tr>
//                 </thead>
//                 <tbody>
//                 {
//                   list && list.map((item, index) =>
//                   <tr id={item.id} key={index}>
//                                 <td>
//                                 {/* <img width="60" height="60" src={'/images/' + item.image} alt="no image"/> `/edit/${item.email}` */  }
//                                     <img src={http.defaults.baseURL+item.photo} alt="no foto" width="60" height="60"/>
//                                 </td>
//                                 <td>{item.name}</td>
//                                 <td>{item.price}</td>

//                             </tr>)}
//                 </tbody>
//             </table>
//         </div>
//     )
// }
//  export default HomePage

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Rating } from "primereact/rating";
import "./home.css";
import {
  getProduct,
  getProductByCategory,
  getProductSearch,
} from "../../actions/products";
import { AddCartProduct } from "../../actions/cart";
import EclipseWidget from "../common/eclipse";
import CartDialog from "./cartDialog";
import { Dialog } from "primereact/dialog";
import { urlBackend } from "../../http_common";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.prod);
  const { auth } = useSelector((redux) => redux);
  const [value3, setValue3] = useState("");
  const [visible, setVisible] = useState(false);
  const [layout, setLayout] = useState("grid");

  const history = useHistory();

  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDropdoun, setSelectedDropdoun] = useState(null);

  const category = ["Корм", "Вітаміни", "Іграшки", "Ветеринарні препарати"];

  const categorys = [
    { name: "Корм", code: "Корм" },
    { name: "Вітаміни", code: "Вітаміни" },
    { name: "Іграшки", code: "Іграшки" },
    { name: "Ветеринарні препарати", code: "Ветеринарні препарати" },
    { name: "Всі категорії", code: null },
  ];

  useEffect(() => {
    try {
      dispatch(getProduct())
        .then(() => {
          setLoading(false);
        })
        .catch((ex) => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.log("Server is bad register from", error);
    }
  }, []);

  const onClickAddToCart = (e, id) => {
    e.preventDefault();

    if (auth.isAuth) {
      try {
        var data = {
          productId: id,
          quantity: 1,
        };
        dispatch(AddCartProduct(data))
          .then(() => {
            setVisible(true);
            console.log("Add to cart competed!");
          })
          .catch((ex) => {});
      } catch (error) {
        console.log("Server is bad register from", error);
      }
    } else {
      toast.error("Ви не авторизовані", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });

      history.push("/login");
    }
  };

  const onSearchChange = (e) => {
    e.preventDefault();
    setValue3(e.target.value);
    try {
      var data = {
        product: e.target.value,
      };
      //console.log({data},"fffff")
      dispatch(getProductSearch(data))
        .then(() => {
          setLoading(false);
          //console.log("Add to cart competed!");
        })
        .catch((ex) => {
          setLoading(false);
        });
    } catch (error) {
      console.log("Server is bad register from", error);
    }
  };

  const onChangeCategory = (e) => {
    e.preventDefault();
    setSelected(e.value);
    try {
      // var rez= e.target.value[0].name;
      // console.log({rez})
      var data = {
        product: e.value,
      };
      console.log({ data }, "ffff");
      dispatch(getProductByCategory(data))
        .then(() => {
          setLoading(false);
          //console.log("Add to cart competed!");
        })
        .catch((ex) => {
          setLoading(false);
        });
    } catch (error) {
      console.log("Server is bad register from", error);
    }
  };

  const onChangeCategoryDropdoun = (e) => {
    e.preventDefault();
    setSelectedDropdoun(e.value.name);
    try {
      // var rez= e.target.value[0].name;
      // console.log({rez})
      var data = {
        product: e.value.code,
      };
      console.log({ data }, "ffff");
      dispatch(getProductByCategory(data))
        .then(() => {
          setLoading(false);
          //console.log("Add to cart competed!");
        })
        .catch((ex) => {
          setLoading(false);
        });
    } catch (error) {
      console.log("Server is bad register from", error);
    }
  };

  //console.log("Auth user info ", auth.isAuth);
  const renderListItem = (data) => {
    return (
      <div className="p-col-12">
        <div className="product-list-item">
          <img
            src={`${urlBackend}` + data.image}
            //<img src={`${data.image}`}
            //height="200"
            onError={(e) =>
              (e.target.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            }
            alt={data.name}
          />
          <div className="product-list-detail">
            <div className="product-name">{data.name}</div>
            <div className="product-description">{data.description}</div>
            <Rating value={data.rating} readOnly cancel={false}></Rating>
            <i className="pi pi-tag product-category-icon"></i>
            <span className="product-category">{data.category}</span>
          </div>
          <div className="product-list-action">
            <span className="product-price">{data.price} грн.</span>

            <Button
              icon="pi pi-shopping-cart"
              label="Додати в кошик"
              onClick={(e) => onClickAddToCart(e, data.id)}
              // onClick={() => fff()}
              disabled={data.inventoryStatus === "Очікуєм"}
            ></Button>
            <span
              className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}
            >
              {data.inventoryStatus}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderGridItem = (data) => {
    return (
      <div className="p-col-12 p-md-4">
        <div className="product-grid-item card">
          <div className="product-grid-item-top">
            <div>
              <i className="pi pi-tag product-category-icon"></i>
              <span className="product-category">{data.category}</span>
            </div>
            <span
              className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}
            >
              {data.inventoryStatus}
            </span>
          </div>
          <div className="product-grid-item-content">
            <img
              src={`${urlBackend}` + data.image}
              //height="200"
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              alt={data.name}
            />
            <div className="product-name">{data.name}</div>
            <div className="product-description">{data.description}</div>
            <Rating value={data.rating} readOnly cancel={false}></Rating>
          </div>
          <div className="product-grid-item-bottom">
            <span className="product-price">{data.price} грн.</span>
            <Button
              icon="pi pi-shopping-cart"
              className="p-button-rounded npm-icon-container npm-icon is_animating"
              onClick={(e) => onClickAddToCart(e, data.id)}
              disabled={data.inventoryStatus === "Очікуєм"}
            ></Button>

            {/* <Button
              icon="pi pi-shopping-cart"
              label="Додати в кошик"
              onClick={(e) => onClickAddToCart(e, data.id)}
              disabled={data.inventoryStatus === "Очікуєм"}
            ></Button> */}
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (product, layout) => {
    if (!product) {
      return;
    }

    if (layout === "list") return renderListItem(product);
    else if (layout === "grid") return renderGridItem(product);
  };

  const renderHeader = () => {
    return (
      <div className="p-grid p-nogutter">
        <div
          className="d-none d-sm-block p-col-3"
          style={{ textAlign: "left" }}
        >
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            {/* <InputText value={value3} onChange={(e) => setValue3(e.target.value)} placeholder="Search" /> */}
            <InputText
              type="search"
              value={value3}
              onChange={onSearchChange}
              placeholder="Пошук"
            />
          </span>
        </div>

        <div
          className="d-sm-none d-none  d-lg-block p-col-7"
          style={{ textAlign: "center" }}
        >
          <SelectButton
            value={selected}
            options={category}
            onChange={(e) => onChangeCategory(e)}
          />
        </div>

        <div
          className="d-block d-lg-none p-col-7"
          style={{ textAlign: "right" }}
        >
          <Dropdown
            value={selectedDropdoun}
            options={categorys}
            onChange={(e) => onChangeCategoryDropdoun(e)}
            optionLabel="name"
            placeholder="Категорія"
            editable
          />
        </div>

        <div
          className="d-none d-sm-block p-col-2"
          style={{ textAlign: "right" }}
        >
          <DataViewLayoutOptions
            layout={layout}
            onChange={(e) => setLayout(e.value)}
          />
        </div>
      </div>
    );
  };
  const header = renderHeader();

  return (
    <>
      <Dialog
        // header='Dialog'
        visible={visible}
        style={{ width: "50vw" }}
        modal={true}
        onHide={() => setVisible(false)}
        maximizable={false}
      >
        <CartDialog />
      </Dialog>

      <div className="dataview-demo">
        <div className="card">
          <DataView
            value={list}
            layout={layout}
            header={header}
            itemTemplate={itemTemplate}
            paginator
            rows={6}
          />
        </div>
      </div>

      {loading && <EclipseWidget />}
    </>
  );
};

export default HomePage;
