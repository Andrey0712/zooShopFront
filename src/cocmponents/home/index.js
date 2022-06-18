import {useState,useEffect} from "react";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import EclipseWidget from '../common/louding';
import http from "../../http_common";
import { getProduct } from '../../actions/products';



const HomePage = () => {
        const dispatch = useDispatch();
     const { list } = useSelector(state => state.prod);
         useEffect(()=>
    {
        dispatch(getProduct());
        console.log("Request to server");
    },[]);
    console.log("Render component users")
        return(
            
            <div className="offset-2 col-md-6 ">
              <h1 className="text-center">Список продуктів</h1>    
                <table className="table table-success table-striped">
                <thead className="thead-dark">
                    <tr>
                    
                        <th scope="col">Фото</th>
                        <th scope="col">Назва</th>
                        <th scope="col">Ціна</th>
                        
                        
                    </tr>
                </thead>
                <tbody>
                {                    
                  list && list.map((item, index) => 
                  <tr id={item.id} key={index}>
                                <td>
                                {/* <img width="60" height="60" src={'/images/' + item.image} alt="no image"/> `/edit/${item.email}` */  }
                                    <img src={'/uploads/'+item.photo} alt="no foto" width="60" height="60"/>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                
                                
                            </tr>)}
                </tbody>
            </table>
        </div>
    )
}
 export default HomePage

// const HomePage = () => {

//     const dispatch = useDispatch();
//     const { list } = useSelector(state => state.prod);

//     const[visible,setVisible]=useState(false);
//     const [layout, setLayout] = useState('grid');
//     const [sortKey, setSortKey] = useState(null);
//     const [sortOrder, setSortOrder] = useState(null);
//     const [sortField, setSortField] = useState(null);
//     const sortOptions = [
//         {label: 'Price High to Low', value: '!price'},
//         {label: 'Price Low to High', value: 'price'},
//     ];
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         try {
//             dispatch(getProduct())
//                 .then(() => {
//                     setLoading(false);
//                 })
//                 .catch(ex => {
//                     setLoading(false);
//                 });
//         }
//         catch (error) {
//             setLoading(false);
//             console.log("Server is bad register from", error);
//         } 
//     }, []);

//     const onClickAddToCart =(e, id) => {
//         e.preventDefault();
//         try {            
//             var data = {
//                 productId: id,
//                 quantity: 1
//             }
//             dispatch(AddCartProduct(data))
//                 .then(() => {
//                     setVisible(true);
//                     console.log("Add to cart competed!");
//                 })
//                 .catch(ex => {
//                 });
//         }
//         catch (error) {
//             console.log("Server is bad register from", error);
//         }

//     }


//     const onSortChange = (event) => {
//         const value = event.value;

//         if (value.indexOf('!') === 0) {
//             setSortOrder(-1);
//             setSortField(value.substring(1, value.length));
//             setSortKey(value);
//         }
//         else {
//             setSortOrder(1);
//             setSortField(value);
//             setSortKey(value);
//         }
//     }

//     const renderListItem = (data) => {
//         return (
//             <div className="p-col-12">
//                 <div className="product-list-item">
//                     <img src={`${data.image}`}  height="200" onError={(e) => 
//                         e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
//                     <div className="product-list-detail">
//                         <div className="product-name">{data.name}</div>
//                         <div className="product-description">{data.description}</div>
//                         <Rating value={data.rating} readOnly cancel={false}></Rating>
//                         <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.category}</span>
//                     </div>
//                     <div className="product-list-action">
//                         <span className="product-price">{data.price} грн.</span>
//                         <Button icon="pi pi-shopping-cart" label="Add to Cart" onClick={(e)=>onClickAddToCart(e, data.id)} 
//                         disabled={data.inventoryStatus === 'OUTOFSTOCK'}></Button>
//                         <span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     const renderGridItem = (data) => {
//         return (
//             <div className="p-col-12 p-md-4">
//                 <div className="product-grid-item card">
//                     <div className="product-grid-item-top">
//                         <div>
//                             <i className="pi pi-tag product-category-icon"></i>
//                             <span className="product-category">{data.category}</span>
//                         </div>
//                         <span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span>
//                     </div>
//                     <div className="product-grid-item-content">
//                     <img src={`${data.image}`}  height="200" 
//                     onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
//                         <div className="product-name">{data.name}</div>
//                         <div className="product-description">{data.description}</div>
//                         <Rating value={data.rating} readOnly cancel={false}></Rating>
//                     </div>
//                     <div className="product-grid-item-bottom">
//                         <span className="product-price">{data.price} грн.</span>
//                         <Button icon="pi pi-shopping-cart" label="Add to Cart" onClick={(e)=>onClickAddToCart(e, data.id)} 
//                         disabled={data.inventoryStatus === 'OUTOFSTOCK'}></Button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     const itemTemplate = (product, layout) => {
//         if (!product) {
//             return;
//         }

//         if (layout === 'list')
//             return renderListItem(product);
//         else if (layout === 'grid')
//             return renderGridItem(product);
//     }

//     const renderHeader = () => {
//         return (
//             <div className="p-grid p-nogutter">
//                 <div className="p-col-6" style={{textAlign: 'left'}}>
//                     <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange}/>
//                 </div>
//                 <div className="p-col-6" style={{textAlign: 'right'}}>
//                     <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
//                 </div>
//             </div>
//         );
//     }
//     const header = renderHeader();

//     return (
//         <>
//         <Dialog
//                 // header='Dialog'
//                 visible={visible}
//                 style={{ width: '50vw' }}
//                 modal={true}
//                 onHide={() => setVisible(false)}
//                 maximizable={false}>
//                 <CartDialog />
//             </Dialog>

//             <div className="dataview-demo">
//                 <div className="card">
//                     <DataView value={list} layout={layout} header={header}
//                         itemTemplate={itemTemplate} paginator rows={9}
//                         sortOrder={sortOrder} sortField={sortField} />
//                 </div>
//             </div>

//             {loading && <EclipseWidget/>}
//         </>
//     )
// }

//export default HomePage