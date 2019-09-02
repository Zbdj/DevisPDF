import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './views/home';
import NotFound from './views/NotFound';
import Test from './views/test';
import Devis from './views/devis';
import GetData from './views/getdata';
import test_input from './views/test_input';
import test_form from './views/test_form';



export default class App extends Component {
    constructor() {
        super()
        this.state = {
            dataFinal: [],
        }
    }

    setData(e) {
        this.setState({
            dataFinal: e
        })
        // this.setState({ dataFinal: [...this.state.dataFinal, e] })
        
    }


    render() {
        // console.log(this.state.dataFinal);

        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        {/* <Route path="/" exact component={Home} /> */}
                        <Route path="/test" component={Test} />
                        <Route path="/devis" component={Devis} />
                        <Route path="/PDF" render={(props) => <GetData text={this.state.dataFinal} {...props} />}/>
                        <Route path="/test_input" component={test_input} />
                        <Route path="/test_form" component={test_form} />
                        <Route path="/" render={(props) => <NotFound text={this.setData.bind(this)} {...props} />}/>



                        {/* <Route component={NotFound} /> */}
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}


////changer switch
// ajouter  #input id


// select pour service
// SD-WAN / ACCES INTERNET
// SD-WAN
// ACCES INTERNET
// Telephonie sur IP
// R-FIBER/ WIfi Nouvelle generation
// Mobilité
//Cablage
// Materiels