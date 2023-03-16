import React, { useEffect } from "react";
import {useMap, Marker, Popup } from 'react-leaflet'
import icon from './icon'

export default function Markerposition({address}){
    const map = useMap()

    const position = [address.location.lat , address.location.lng]
    useEffect(()=> {
        map.flyTo(position, 13, {
            animate: true,
        } )

     },   [map, position])
    return(
        <>
     <Marker 
    icon={icon}
    position={position}>
    <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
    </Marker>
        </>
    )

}
