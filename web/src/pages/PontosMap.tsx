import React, {  useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
//import { Map as LeafletMap } from 'react-leaflet'


import mapMarkerImg from '../images/map-marker.svg'

import '../styles/pages/pontos-map.css'
import mapIcon from '../utils/mapIcon'
import api from '../services/api'

interface Ponto {
    id: number
    name: string
    latitude: number
    longitude: number
}

function PontosMap() {
    const [ pontos, setPontos ] = useState<Ponto[]>([])

    useEffect(() => {
        api.get('/pontos').then(response => {
            setPontos(response.data)
        })
    }, [])

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Icon"/>

                    <h2>Escolha um ponto histórico no mapa</h2>
                    <p>E conheça um pouco mais da história de sua cidade</p>
                </header>

                <footer>
                    <strong>Campinas</strong>
                    <span>São Paulo</span>
                </footer>
            </aside>

            <MapContainer 
                center={[-22.9006421,-47.0972342]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                {pontos.map(ponto => {
                    return (
                        <Marker 
                            position={[ ponto.latitude, ponto.longitude ]}
                            icon={mapIcon}
                            key={ponto.id}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {ponto.name}
                                <Link to={`/ponto/${ponto.id}`}>
                                    <FiArrowRight size={32} color="#fff" />
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}
            </MapContainer>

            

            <Link to="/ponto/create" className="create-ponto">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    )
}

export default PontosMap