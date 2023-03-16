import { useState, useEffect } from 'react'
import { MapContainer, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './App.css'
import background from './Images/pattern-bg.png'
import Markerposition from './Markerposition'

function App() {

  const [address, setAddress] = useState(null)
  const [ipAdress, setIpAddress] = useState("")


  const checkIpAddress =
  /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi
const checkDomain =
  /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/


  useEffect(()=> {
    try{
      const getInitialData = async () => {
        const res = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=at_PjsC5by6vJmbufxdqpfxeo0qDShUM&ipAddress=`)
     
        const data = await res.json()
        setAddress(data)
      }
      getInitialData()
    
    } catch(error) {
      console.trace(error)}
  }, [])

  async function getEnteredAddress (){
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_PjsC5by6vJmbufxdqpfxeo0qDShUM&${checkIpAddress.test(ipAdress) ? `ipAddress=${ipAdress}` : checkDomain.test(ipAdress) ? `domain=${ipAdress}` :  ""}`)
 
    const data = await res.json()
    setAddress(data)
  }


  const handleSubmit = (e) =>{
    e.preventDefault()
    getEnteredAddress()

  }



  return (
    <div className=" m-0 box-border pt-10 tracking-wider  ">
        <img src={background} className="-z-20 md:h-96 sm:h-[30rem] absolute h-60 lg:h-80  top-0" alt="" />
      <div className=' box-border ap items-center flex flex-col pb-8 '>

      <h1 className="text-3xl font-bold relative text-white my-2 mb-5 ">
      IP Address Tracker
    </h1>
   
    <form className='content-center mb-12 md:mb-36 sm:mb-[11rem] items-center flex ' onSubmit={handleSubmit} action="">
      <input className='outline-none border-r-0 border-2 md:w-96 h-9 -my-16 sm:w-64 rounded-l p-0.5 px-2.5 text-sm ' value={ipAdress} onChange={(e) => setIpAddress(e.target.value)} placeholder='Search for any IP address or domain'  type="text" name="input" id="input" />
      <button type='submit' className=''><i className="fa-solid rounded-r  bg-black text-white text-base p-1.5 px-2 fa-chevron-right"></i></button>
    </form>
      </div>


      {address &&
      <>
      <div className='absolute grid content-start md:top-[19.6rem] md:w-[55vw] md:pl-[3vw] lg:grid-cols-4 md:grid-cols-2 lg:h-[auto] md:mt-0 sm:mt-[7rem] sm:w-[18rem] sm:justify-center md:justify-start lg:w-[63vw] md:h-2/6 gap-7 bg-white shadow-2xl top-56 z-10 left-1/2 rounded-lg  -translate-y-1/2 -translate-x-1/2 p-10 pb-5 px-4 w-8/12 sm:pb-8 items-start'>
      <div className='px-5 after:absolute sm:after:h-0  xl:after:mx-[13vw]  lg:after:mx-[14.5vw] lg:after:h-2/5 after:-my-8 after:rounded after:w-px after:h-12 after:bg-slate-400'>
        <h5 className='text-xs font-bold text-gray-600'>IP ADDRESS</h5>
        <h1 className='font-bold'>{address.ip}</h1>
      </div>
      <div className='px-5 lg:mx-[1rem] xl:mx-0'>
        <h5 className='text-xs font-bold text-gray-600'>LOCATION</h5>
        <h1 className='font-bold '>{address.location.city}, <br />{address.location.region}</h1>
      </div>
      <div className='px-5 before:h-12 before:absolute lg:before:-mx-7 xl:before:-mx-14 before:-mx-14 before:my-1.5 lg:before:h-2/5 before:w-px lg:before:bg-slate-400 before:rounded'>
        <h5 className='text-xs font-bold text-gray-600'>TIMEZONE</h5>
        <h1 className='font-bold'>UTC {address.location.timezone}</h1>
      </div>
      <div className='px-5 before:h-12 sm:before:h-0 before:absolute before:-mx-14 lg:before:my-1.5 md:before:-mt-[5rem] md:before:h-[7rem] md:before:-ml-[5vw] before:my-1.5 lg:before:h-2/5 before:w-px before:bg-slate-400 before:rounded'>
        <p className='text-xs font-bold text-gray-600'>ISP</p>
        <h1 className='font-bold'>{address.isp}</h1>
      </div>
      </div>
      <MapContainer  center={[address.location.lat, address.location.lng]} zoom={13} scrollWheelZoom={true} className="h-screen  w-full" style={{height: "", width: "", bottom: "0px", margin: "0rem 0 0", zIndex:"1"}}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Markerposition address = {address}/>
  </MapContainer>
  </>}
      </div>
  )
}

export default App
