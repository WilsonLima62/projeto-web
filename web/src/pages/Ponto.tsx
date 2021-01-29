import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import api from "../services/api";


import '../styles/pages/ponto.css';
import Sidebar from "../components/Sidebar";
import mapIcon from '../utils/mapIcon'

interface Ponto {
  id: number
  name: string
  latitude: number
  longitude: number
  about: string
  instruction: string
  opening_hours: string
  open_on_weekends: boolean
  images: Array<{
    id: number
    url: string
  }>
}

interface PontoParams {
  id: string
}

export default function Ponto() {

  const params = useParams<PontoParams>()
  const [ ponto, setPontos ] = useState<Ponto>()
  const [activeImageIndex, setActiveImageIndex] = useState(0)

    useEffect(() => {
        api.get(`/pontos/${params.id}`).then(response => {
            setPontos(response.data)
        })
    }, [params.id])

    if (!ponto) {
      return <p>Carregando...</p>
    }

  return (
    <div id="page-ponto">
      
    <Sidebar />

      <main>
        <div className="ponto-details">
          <img src={ponto.images[activeImageIndex].url} alt={ponto.name} />

          <div className="images">
            {ponto.images.map((image, index) => {
              return (
                <button 
                key={image.id} 
                className={activeImageIndex === index ? 'active' : ''}
                onClick={() => {
                    setActiveImageIndex(index)
                  }
                } 
                type="button">
                  <img src={image.url} alt={ponto.name} />
                </button>
              )
            })}
          </div>
          
          <div className="ponto-details-content">
            <h1>{ponto.name}</h1>
            <p>{ponto.about}</p>

            <div className="map-container">
              <MapContainer
                center={[ponto.latitude, ponto.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[ponto.latitude, ponto.longitude]} />
              </MapContainer>

              <footer>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${ponto.latitude}, ${ponto.longitude}`} target="_blank" rel="noopener noreferrer">Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{ponto.instruction}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Dias de funcionamento:<br />
                {ponto.opening_hours}
              </div>
              { ponto.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Agendamento <br />
                  é necessário
                </div>
                ) : (
                  <div className="open-on-weekends dont-open">
                    <FiInfo size={32} color="#ff6690" />
                    Agendamento <br />
                    não é necessário
                  </div>
                ) 
              }
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}