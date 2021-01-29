import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

import '../styles/pages/landing.css'
import logoImg from '../images/logo.svg'


function Landing() {
    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <img src={logoImg} alt="Happy" />

                <main>
                    <h1>Viva a História da sua cidade!</h1>
                    <p>Embarque numa viagem rumo a um rico passado através dos pontos históricos de Campinas</p>
                </main>

                <div className="location">
                    <strong>Campinas</strong>
                    <span>São Paulo</span>
                </div>

                <Link to="/app" className="enter-app">
                    <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
                </Link>
            </div>
        </div>
    )
}

export default Landing