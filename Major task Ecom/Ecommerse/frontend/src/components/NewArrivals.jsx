import { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
//import LATEST from '../assets/latest.js'
import Item from './Item'

const NewArrivals = () => {

  const [new_collection, setNew_collection] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/newcollections').then((response) => response.json()).then((data) => setNew_collection(data))
  }, []);

  return (
    <section className='max-padd-container bg-primary p-12 xl:py-28'>
      {/* title */}
      <div className='text-center max-w-lg mx-auto'>
        <h3 className='h3'>New Arrivals</h3>
        <p>
          Odit quisquam mollitia nisi. Vel voluptate nisi maxime
          modi aut voluptatum ad. Qui totam est dolorum qui et eaque
        </p>
      </div>
      {/* container */}
      <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-28 mt-32  '>
        {new_collection.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            old_price={item.old_price}
            new_price={item.new_price}
          />
        ))}
      </div>
    </section>
    
  )
}

export default NewArrivals