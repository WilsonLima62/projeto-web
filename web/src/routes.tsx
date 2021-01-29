import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import PontosMap from './pages/PontosMap'
import Ponto from './pages/Ponto'
import CreatePonto from './pages/CreatePonto'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={PontosMap} />
                <Route path="/ponto/create" component={CreatePonto} />
                <Route path="/ponto/:id" component={Ponto} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes