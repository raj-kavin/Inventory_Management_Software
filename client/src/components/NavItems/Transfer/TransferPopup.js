// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../../../AuthContext";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";

// const TransferPopup = ({ isVisible, onClose, user, setMessage, setError }) => {

//   const [isLoading, setIsLoading] = useState(false);

//   const [data, setData] = useState({
//     itemcode: "",
//     showStock: "",
//     stockReq: "",
//     fromLabId: "",
//   });

//   const [item, setItem] = useState([]);
//   const [stock, setStock] = useState([]);

//   async function fetchItems() {
//     const response = await axios.get("http://localhost:4000/api/getItems");
//     setItem(response.data);
//   }

//   async function fetchStock() {
//     const response = await axios.get("http://localhost:4000/api/getStock");
//     setStock(response.data);
//   }

//   useEffect(() => {
//     fetchItems();
//     fetchStock();
//   }, []);

//   const [itemResult, setItemResult] = useState(item);
//   const [suggestion, setSuggestion] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);

//   const handleItemChange = (e) => {
//     if (e.target.value.trim().length > 0) {
//       setSuggestion(true);
//       setIsTyping(true);
//     } else {
//       setIsTyping(false);
//       setSuggestion(false);
//     }
//     setItemResult(
//       item.filter((f) => f.item_name.toLowerCase().includes(e.target.value))
//     );
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   function resultClick(code) {
//     setData({ ...data, itemcode: code });
//     const result = item.filter((items) => {
//       if (items.item_code == code) {
//         return items;
//       }
//     });

//     setSuggestion(false);
//     setIsTyping(false);
//   }

//   const [result, setResult] = useState([]);
//   //   const [stockResult, setStockResult] = useState({});

//   const handleReqFromChange = (e) => {
//     e.preventDefault();
//     setData({ ...data, [e.target.name]: e.target.value });
//     setResult(
//       stock.filter((f) =>
//         f.dept_id.toLowerCase().includes(e.target.value.toLowerCase())
//       )
//     );
//     result.find(
//       (res) => res.item_code.toLowerCase() == data.itemcode.toLowerCase()
//     );
//   };
  
//   const checkAvailability = (e) => {
//     e.preventDefault();
//     const foundElement = result.find(
//       (res) => res.item_code.toLowerCase() == data.itemcode.toLowerCase()
//     );
//     if (foundElement != null)
//       setData({ ...data, showStock: foundElement.stock_qty });
//     else setData({ ...data, showStock: 0 });
//   };

//   const handleSubmit = async (e) => {
//     try {
//       setIsLoading(true);
//       e.preventDefault();
//       const sendItem = item.find((f) => f.item_code == data.itemcode);
//       const stockApex = stock.find((f)=>f.item_code == data.itemcode && f.dept_id == user.dept_code)
//       console.log("na tha print aren  " ,  stockApex);
//       const response = await axios.post(
//         "http://localhost:4000/api/transferRequestdata",
//         {
//           resData: {
//             ...data,
//             apex_no: stockApex.apex_no,
//             manufacturerId: sendItem.manufacturer_id,
//             supplierId: sendItem.supplier_id,
//             reqLabId: user.dept_code,
//             user_id: user.user_id,
//           },
//         }
//       );
//       if (response.status == 200) {
//         setData({
//           itemcode: "",
//           showStock: "",
//           stockReq: "",
//           fromLabId: "",
//         })
//         console.log(response.data);
//         setMessage(response.data.Data);
//         onClose();
//         setIsLoading(false);
//       }
//     } catch (error) {

//       if (error) {
//         setData({
//           itemcode: "",
//           showStock: "",
//           stockReq: "",
//           fromLabId: "",
//         })
//         console.log(error);
//         setError(error.response.data.Data);
//         onClose();
//         setIsLoading(false);
//       }
//     }
//   };

//   if (!isVisible) return null;

//   return (
//     <>
//       {isLoading ? (
//         <div className="flex justify-center items-center h-full"><label class="loader"></label></div>
//       ) : (
//         <div className=" inset-0  flex justify-center">
//           <div className="flex flex-col">
//           <div
//           style={{ backgroundColor: "#F4F4F4" }}
//           className="popup-responsive popup-responsive-small w-full px-14 py-5 overflow-x-auto overflow-y-auto flex flex-col items-center border-gray-700 rounded-lg"
//         >
//             {/* <button
//               className="text-black rounded-full border-black px-2 border-2 text-3xl place-self-end"
//               onClick={() => onClose()}
//             >
//               X
//             </button> */}
//             <div className="flex flex-col justify-center items-center p-8 rounded-2xl">
//               <div className="py-1 flex  pb-8">
//                 <span className="px-1 text-2xl font-medium text-black">
//                   Transfer Request
//                 </span>
//               </div>

//               <form onSubmit={handleSubmit}>
//                 {/* {message ? <div>{message}</div>: null} */}
//                 <div className="flex flex-wrap">
//                   <label className="text-md pr-5 mb-3 whitespace-nowrap">Item Name</label>
//                   <input
//                     type="text"
//                     name="itemcode"
//                     list="itemcode"
//                     value={data.itemcode}
//                     onChange={handleItemChange}
//                     className="text-md block px-3 py-2 rounded-lg w-full border-b-0
//                 bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
//                     required
//                     autoComplete="off"
//                   />
//                 </div>
//                 <div>
//                   {isTyping && suggestion && (
//                     <div
//                       className="text-md block px-3 py-2 rounded-b-lg w-full border-t-0
//                 bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
//                     >
//                       {itemResult && itemResult.length > 0 ? (
//                         itemResult.slice(0, 2).map((result) => {
//                           return (
//                             <div
//                               key={result.item_code}
//                               value={result.item_code}
//                               className="text-md px-3 py-2 w-full border-none
//                               bg-white border-2 focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none hover:bg-sky-100 rounded-lg"
//                               onClick={() => resultClick(result.item_code)}
//                             >
//                               {result.item_code}-{result.item_name}
//                             </div>
//                           );
//                         }) )
//                         : (
//                           <div>No Match</div>
//                         )}
//                     </div>
//                   )}
//                 </div>
//                 <div class="py-1 flex flex-wrap gap-3 pb-8">
//                   <label class="text-md pr-5 whitespace-nowrap">Request From</label>
//                   <input
//                     type="text"
//                     name="fromLabId"
//                     value={data.fromLabId}
//                     onChange={handleReqFromChange}
//                     className="text-md block px-3 py-2 rounded-lg w-full
//                 bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
//                     required
//                   />
//                   <button
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                     onClick={checkAvailability}
//                   >
//                     Check avail
//                   </button>
//                 </div>
//                 <div class="flex flex-wrap ">
//                   <label class="text-md mb-3 whitespace-nowrap">Stock Available</label>
//                   <input
//                     type="text"
//                     name="cost"
//                     value={data.showStock}
//                     className="text-md block px-3 py-2 rounded-lg w-full
//                 bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
//                     required
//                     disabled
//                   />
//                 </div>
//                 <div className="whitespace-nowrap">
//                   Kindly enter the stock after checking availablity{" "}
//                   <label style={{ color: "red", fontSize: "25px" }}>*</label>
//                 </div>
//                 <div class="py-1 flex flex-wrap  pb-8">
//                   <label class="text-md mb-3 whitespace-nowrap">Stock required</label>
//                   <input
//                     type="text"
//                     name="stockReq"
//                     value={data.stockReq}
//                     onChange={(e) =>
//                       setData({ ...data, [e.target.name]: e.target.value })
//                     }
//                     className="text-md block px-3 py-2 rounded-lg w-full
//                 bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
//                     required
//                   />
//                 </div>
//                 <center>
//                   <button
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded mb-10"
//                     type="submit"
//                   >
//                     Submit
//                   </button>
//                 </center>
//               </form>
//             </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default TransferPopup;

import React from "react";
import { useEffect, useState } from "react";
import TransferEdit from "./TransferEdit";

function TransferRequestTable({isVisible, user, getStock ,getLabDetails,setGetLabDetails, fetchGetStock, setMessage, setError, setIsLoading, isLoading}) {


  //for edit popup
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleOpenEdit = (data) => {
    setOpenEdit(true);
    setEditData(data);
  };

  const handleCloseEdit = (data) => {
    setOpenEdit(false);
    // setEditData(null);
    fetchGetStock();
  };
  const onSubmit = () => {
    fetchGetStock();
    handleCloseEdit();
  };

  // Search functionality

  const [searchQuery, setSearchQuery] = useState("");

  const [filteredData, setFilteredData] = useState([]);
  const [click, setClick] = useState(false);

  useEffect(() => {
    if (click || searchQuery == "") {
      const filteredResults = getStock.filter((item) => {
        const propertiesToSearch = [
          "inventory_value",
          "item_name",
          "item_subname",
          "item_type",
          "item_code",
          "apex_no",
          "item_description",
          "stock_qty",
          "dept_id",
        ];
        return propertiesToSearch.some((property) =>
          typeof item[property] === "string"
            ? item[property].toLowerCase().includes(searchQuery.toLowerCase())
            : typeof item[property] === "number"
            ? item[property].toString().includes(searchQuery)
            : false
        );
      });

      setFilteredData(filteredResults);
    }
  }, [click, getStock, searchQuery]);

  //sort by functionality
  const [sortOrders, setSortOrders] = useState({
    item_code: "asc",
    item_type: "asc",
    item_name: "asc",
    item_subname: "asc",
    item_description: "asc",
    apex_no: "asc",
    stock_qty: "asc",
    dept_id: "asc",
    inventory_value: "asc",
  });
  
  const [sortedColumn, setSortedColumn] = useState("");

  const handleSort = (column) => {
    setSortOrders((prevSortOrders) => ({
      ...prevSortOrders,
      [column]: prevSortOrders[column] === "asc" ? "desc" : "asc",
    }));

    setSortedColumn(column);

    
    filteredData.sort((a, b) => {
      const valueA =
        typeof a[column] === "string" ? a[column].toLowerCase() : a[column];
      const valueB =
        typeof b[column] === "string" ? b[column].toLowerCase() : b[column];

      if (valueA < valueB) {
        return sortOrders[column] === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrders[column] === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredData(filteredData);
  };

  // <-------------------------------search bar enter function---------------------------->

  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      setClick(true);
    }
  };
  if (!isVisible) return null;

  return (
    <div>
      <div
        style={{ width: "90%" }}
        className=" flex ml-20 h-auto mt-5 mb-5 justify-between  font-semibold"
      >
        <div className="sub-titles text-2xl font-semibold">Transfer Request</div>
        <div className="flex input-field">
          <div className="h-auto ">
            <input
              name="inputQuery"
              type="text"
              value={searchQuery}
              onKeyDown={handleKeyEnter}
              onChange={(e) => {
                setClick(false);
                setSearchQuery(e.target.value);
              }}
              placeholder="Search..."
              className="text-black indent-2 font-medium w-80 h-8 rounded-xl border-2 border-black"
            />
          </div>
          <div
            onClick={() => setClick(true)}
            className="focus:ring-4  shadow-lg transform active:scale-75 transition-transform cursor-pointer border-2 border-black rounded-full w-full ml-5 px-2 mr-16"
          >
            <i className="bi bi-search"></i>
          </div>
        </div>
      </div>


      <div className="flex justify-center items-center flex-col ">
        <div
          style={{ width: "90%", height: "30%", maxHeight: "300px" }}
          class="relative rounded-2xl animate overflow-x-auto overflow-y-auto scrollbar-none border-2"
        >
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead style={{backgroundColor:"#0f6af2" , color:"white"}} class="text-sm uppercase">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider"
                >
                  S.No
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex">
                    <div onClick={() => handleSort("apex_no")}>Apex No</div>

                    {sortedColumn === "apex_no" && (
                      <span
                        className={`bi bi-arrow-${
                          sortOrders.apex_no === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex">
                    <div onClick={() => handleSort("item_code")}>
                      Item Code
                    </div>
                    {sortedColumn === "item_code" && (
                      <span
                        className={`bi bi-arrow-${
                          sortOrders.item_code === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex">
                    <div onClick={() => handleSort("item_name")}>
                      Item Name
                    </div>
                    {sortedColumn === "item_name" && (
                      <span
                        className={`bi bi-arrow-${
                          sortOrders.item_name === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex">
                    <div onClick={() => handleSort("item_subname")}>Item Subname</div>
                    {sortedColumn === "item_subname" && (
                      <span
                        className={`bi bi-arrow-${
                          sortOrders.item_subname === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex">
                    <div onClick={() => handleSort("item_type")}>Item Type</div>
                    {sortedColumn === "item_type" && (
                      <span
                        className={`bi bi-arrow-${
                          sortOrders.item_type === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex">
                    <div onClick={() => handleSort("item_description")}>Item Description</div>
                    {sortedColumn === "item_description" && (
                      <span
                        className={`bi bi-arrow-${
                          sortOrders.item_description === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex">
                    <div onClick={() => handleSort("stock_qty")}>
                      Stock Qty
                    </div>
                    {sortedColumn === "stock_qty" && (
                      <span
                        className={`bi bi-arrow-${
                          sortOrders.stock_qty === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex">
                    <div onClick={() => handleSort("inventory_value")}>Inventory Value</div>
                    {sortedColumn === "inventory_value" && (
                      <span
                        className={`bi bi-arrow-${
                          sortOrders.inventory_value === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex">
                    <div onClick={() => handleSort("dept_id")}>Lab Code</div>
                    {sortedColumn === "dept_id" && (
                      <span
                        className={`bi bi-arrow-${
                          sortOrders.dept_id === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    )}
                  </div>
                </th>

              </tr>
            </thead>
            <tbody style={{backgroundColor:"white" , fontWeight:"bold" ,color:"black"}}>
              {filteredData.map((data, index) => {
                return (
                  <tr
                    key={data.id}
                    class="bg-white border-b-2 hover:bg-sky-100 cursor-pointer"
                    onClick={() => handleOpenEdit(data)}
                  >
                    <td scope="row" class="px-6 text-left py-4 ">
                      {index + 1}
                    </td>
                    <td class="px-6 py-4 text-left whitespace-nowrap">
                      {data.apex_no}
                    </td>
                    <td class="px-6 py-4 text-left whitespace-nowrap">
                      {data.item_code}
                    </td>
                    <td class="px-6 py-4 text-left whitespace-nowrap">
                      {data.item_name}
                    </td>
                    <td class="px-6 py-4 text-left whitespace-nowrap">
                      {data.item_subname}
                    </td>
                    <td class="px-6 py-4 text-left whitespace-nowrap">
                      {data.item_type}
                    </td>
                    <td class="px-6 py-4 text-left whitespace-nowrap">
                      {data.item_description}
                    </td>
                    <td class="px-6 py-4 text-left whitespace-nowrap">
                      {data.stock_qty}
                    </td>
                    <td class="px-6 py-4 text-left whitespace-nowrap">
                      {data.inventory_value}
                    </td>
                    <td class="px-6 py-4 text-left whitespace-nowrap">
                      {data.dept_id}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {openEdit && editData && (
        <div className="blur-background">
          <TransferEdit
            data={editData}
            getLabDetails = {getLabDetails}
            setGetLabDetails = {setGetLabDetails}
            onClose={handleCloseEdit}
            onSubmit={onSubmit}
            setMessage={setMessage}
            setError={setError}
            setIsLoading ={setIsLoading}
            isLoading = {isLoading}
            user = {user}
          />
        </div>
      )}
    </div>
  );
}

export default TransferRequestTable;

