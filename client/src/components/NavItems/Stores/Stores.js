import { React, useState} from 'react'
import ItemTable from './ItemTable/ItemTable';
import StockTable from './StockTable/StockTable';



function Stores() {

  const [isLoading, setIsLoading] = useState(true);

  
  
  return (
    <>
    <div
        className={` gap-6 justify-center  duration-300 `}
      >
        <ItemTable/>
        <StockTable/>
        <br/>
      </div>
    </>

   

  )
}

export default Stores