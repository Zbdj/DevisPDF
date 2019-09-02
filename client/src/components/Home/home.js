import React from 'react';

import { Link } from 'react-router-dom'
import './home.css'
import {
    Input
} from 'antd';
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest"
import geodist from 'geodist'

const API_KEY = "AIzaSyAQU3x2PDxhLZEYFk4Af4HBPYDpy40aHEs"

export default class Home extends React.Component {
    state = {
        search: "",
        value: "",
        value_2: "",
        search_2: "",
        first_adresse: {},
        last_adresse: {},
        result: false,
        click_1: false,
        click_2: false,

    }

    componentDidMount() {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        signUpButton.addEventListener('click', () =>
            container.classList.add('right-panel-active'));

        signInButton.addEventListener('click', () =>
            container.classList.remove('right-panel-active'));

    }




    handleInputChange(e) {
        this.setState({ search: e.target.value, value: e.target.value, result: false })
    }
    handleInputChange_1(e) {
        this.setState({ search_2: e.target.value, value_2: e.target.value, result: false })
    }

    handleSelectSuggest(suggest) {
        // console.log(suggest.formatted_address)
        // console.log(suggest.geometry.viewport.ia.j)
        var first_adresse = {
            name: suggest.formatted_address,
            lat: suggest.geometry.viewport.na.j,
            lon: suggest.geometry.viewport.ia.j,
        }

        this.setState({ search: "", value: suggest.formatted_address, first_adresse: first_adresse, click_1: true, })
    }
    handleSelectSuggest_2(suggest) {
        // console.log(suggest)
        var last_adresse = {
            name: suggest.formatted_address,
            lat: suggest.geometry.viewport.na.j,
            lon: suggest.geometry.viewport.ia.j,
        }
        this.setState({ search_2: "", value_2: suggest.formatted_address, last_adresse: last_adresse, click_2: true, })
    }

    result() {
        this.setState({ result: true })
    }

    delete_1() {
        this.setState({ value: '' })
    }
    delete_2() {
        this.setState({ value_2: '' })
    }

    render() {
        const { search, value, value_2, search_2 } = this.state

        if (this.state.result !== false && this.state.click_1 !== false && this.state.click_2 !== false) {
            var test = geodist(this.state.first_adresse, this.state.last_adresse, { exact: true, unit: 'meters' })     // => 402.09212137829695

            test = Math.round(test);
            test = test / 1000
            test = test.toString();

            if (test.substr(0, 1) === '0') {
                test = test.slice(2);
                alert("Distance : " + test + " metres")

            }
            else {
                alert("Distance : " + test + " km")
            }
        }


        return (
            // <div className="body">
            //     <div className="container ">

            //         <div className="col-sm-offset-1 col-sm-12 text-center">
            //             <img src={logo} alt='logo_byos' width="70%" style={{ marginTop:'8%'}}></img>
            //         </div>

            //     <div className="row">
            //         <div className="col-sm-offset-1 col-sm-4 text-center"></div>
            //             <div className="col-sm-offset-1 col-sm-4 text-center">
            //                 <Link className="btn btn-lg btn-block btn_devis" to='/devis'>Créer un devis</Link>
            //             </div>
            //         </div>
            //     </div>
            // </div>
            // <div>


            <div className="body">
                <div className="content container" id="container">

                    <div className="form-container sign-up-container">
                        <div className="form">
                            {/* <h1 className="h1">Create Account</h1>
                <div class="social-container">
                    <a href="#" class="social a"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="social a"><i class="fab fa-google-plus-g"></i></a>
                    <a href="#" class="social a"><i class="fab fa-linkedin-in"></i></a>
                </div>
                <span>or use your email for registration</span>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" /> */}
                            {/* <h1 className="h1">Deuxieme plan droite</h1>

                            <button className="button">Sign Up</button> */}
                            <ReactGoogleMapLoader 
                                params={{
                                    key: API_KEY,
                                    libraries: "places,geocode",
                                }}
                                render={googleMaps =>
                                    googleMaps && (
                                        <div >
                                            <ReactGooglePlacesSuggest
                                                autocompletionRequest={{ input: search }}
                                                googleMaps={googleMaps}
                                                onSelectSuggest={this.handleSelectSuggest.bind(this)}
                                                textNoResults={"Aucune adresse trouvée.."}
                                            >
                                                <h6>Adresse de départ</h6><br></br>
                                                <Input
                                                    type="text"
                                                    value={value}
                                                    placeholder="Départ"
                                                    onChange={this.handleInputChange.bind(this)}
                                                    style={{ width: '30vh' }}
                                                />
                                                &nbsp;&nbsp;<i class="fas fa-times" onClick={this.delete_1.bind(this)} style={{ color: 'red'}}></i>
                                            </ReactGooglePlacesSuggest>
                                            <ReactGooglePlacesSuggest
                                                autocompletionRequest={{ input: search_2 }}
                                                googleMaps={googleMaps}
                                                onSelectSuggest={this.handleSelectSuggest_2.bind(this)}
                                                textNoResults={"Aucune adresse trouvée.."}

                                            >
                                                <br></br>
                                                <h6 >Adresse d'arrivée</h6><br></br>

                                                <Input
                                                    type="text"
                                                    value={value_2}
                                                    placeholder="Arrivée"
                                                    onChange={this.handleInputChange_1.bind(this)}
                                                    style={{ width: '30vh' }}
                                                />
                                                &nbsp;&nbsp;<i class="fas fa-times" onClick={this.delete_2.bind(this)} style={{ color: 'red'}}></i>

                                            </ReactGooglePlacesSuggest>
                                        </div>
                                    )
                                    

                                }
                            />
                            <button className="button" style={{ marginTop: '5%' }} onClick={this.result.bind(this)}>Calcul</button>

                        </div>
                    </div>

                    <div class="form-container sign-in-container">
                        <div class="form">
                            <h1 className="h1" style={{ marginBottom: '2%' }}>Créer un devis</h1>
                            <p className="p">Exporter des devis en PDF</p>

                            {/* <a href="#" className="a">Forgot your password?</a> */}
                            <Link className="button" to='/test_form'>Commencer</Link>
                            {/* <button className="button">Commencer</button> */}
                        </div>
                    </div>

                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                {/* <h1 className="h1 text-white">Welcome Back!</h1>
                    <p className="p">To keep connected with us please login with your personal info</p> */}
                                {/* <h1 className="h1">Deuxieme plan gauche</h1> */}

                                {/* <button class="ghost button" id="signIn">Retour</button> */}
                                <i className="fas fa-angle-double-left left_img" id="signIn"></i>
                                <p className="text-center p">Retour en arriere</p>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1 className="h1 text-white">Calcul de distance</h1>
                                <p className="p">Calculer la distance entre deux adresses</p>
                                <button className="ghost button" id="signUp">Calculer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
