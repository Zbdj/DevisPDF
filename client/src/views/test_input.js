import React, { Component } from 'react';
import Service from './test.js';
import { Input, Switch, notification } from 'antd';
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest"

const API_KEY = "AIzaSyAQU3x2PDxhLZEYFk4Af4HBPYDpy40aHEs"

var title = ''
var message = ''
var type = '';

const openNotificationWithIcon = (type) => {
    notification[type]({
        message: title,
        description: message,
        durarion: null
    });
};

export default class Test extends Component {
    constructor() {
        super();
        this.state = {
            client: [],
            service: [],

            search: "",
            value: "",

            name: '',
            tel: '',
            mail: '',

            ipWan: "",
            ipLan: "",
            MasqueReseau1: '',
            MasqueReseau2: '',
            nameSite: '',

            data_final: [],
            switchBool: false,


        }
    }

    componentDidMount() {
        // console.log(this.state.service);
        // console.log(this.state.client);

        // obj.service = this.state.service
        // obj.value = this.state.value
        // obj.name = this.state.name
        // obj.tel = this.state.tel
        // obj.mail = this.state.mail
        // obj.service.ipWan = this.state.ipWan
        // obj.service.ipLan = this.state.ipLan
        // obj.service.MasqueReseau1 = this.state.MasqueReseau1
        // obj.service.MasqueReseau2 = this.state.MasqueReseau2


        // console.log(this.state.service);





    }

    Submit(e) {

        var obj = {}

        // var dataArray = [];

        // dataArray.push(this.state.value,this.state.name,this.state.tel,this.state.mail,this.state.ipWan,this.state.ipLan,this.state.MasqueReseau1,this.state.MasqueReseau2,this.state.nameSite)

        // obj.client = this.state.client
        obj.service = this.state.service
        obj.service.livraisonAdresse = this.state.value
        obj.service.name = this.state.name
        obj.service.tel = this.state.tel
        obj.service.mail = this.state.mail
        obj.service.ipWan = this.state.ipWan
        obj.service.ipLan = this.state.ipLan
        obj.service.MasqueReseau1 = this.state.MasqueReseau1
        obj.service.MasqueReseau2 = this.state.MasqueReseau2
        obj.service.nameSite = this.state.nameSite

        // console.log(obj);
        


        // console.log(this.state.service.length);
        // console.log(this.state.value);
        // console.log(this.state.tel);
        // console.log(this.state.mail);
        // console.log(this.state.ipWan);
        // console.log(this.state.ipLan);
        // console.log(this.state.MasqueReseau1);
        // console.log(this.state.MasqueReseau2);

        // console.log(this.state.client);
        // console.log(this.state.service);
        // console.log(this.state.search);
        // console.log(this.state.value);
        // console.log(this.state.name);
        // console.log(this.state.tel);
        // console.log(this.state.mail);
        if(this.state.switchBool === true) {
            type = "warning"
            title = "Attention !"
            message = "Vos modifications ont déja été enregistrées"
            openNotificationWithIcon(type);
      
          }

        else if (obj.service.length !== 0 && obj.service.livraisonAdresse.length !== 0 && obj.service.name.length !== 0 && obj.service.tel.length !== 0 && obj.service.mail.length !== 0 && obj.service.ipWan.length !== 0 && obj.service.ipLan.length !== 0 && obj.service.MasqueReseau1.length !== 0 && obj.service.MasqueReseau2.length !== 0 && obj.service.nameSite.length !== 0) {
            type = "success"
            title = "Bravo !"
            message = "Les informations des champs ont été enregistrées avec succès"
            openNotificationWithIcon(type);

            this.setState({
                data_final: obj,
                switchBool: true,
            }
                , () => {
                    this.props.getDataForPdf(this.state.data_final)
                })
        }
        else{
        type = "error"
        title = "Erreur !"
        message = "Veuillez remplir tout les champs avant de les valider"
        openNotificationWithIcon(type);
        }
    

        e.preventDefault();

    }


    getData(e) {
        this.setState({ client: [...this.state.client, e] })
    }

    getAllService(e) {
        this.setState({ service: [...this.state.service, e] })
        // console.log(this.state.service);
    }


    handleInputChange(e) {
        this.setState({ search: e.target.value, value: e.target.value })
    }

    handleSelectSuggest(suggest) {
        // console.log(suggest)
        this.setState({ search: "", value: suggest.formatted_address })
    }


    NameChange(e) {
        this.setState({ name: e.target.value })
    }


    TelChange(e) {
        this.setState({ tel: e.target.value })
    }

    MailChange(e) {
        this.setState({ mail: e.target.value })
    }


    ipWanChange(e) {
        this.setState({ ipWan: e.target.value })
    }

    ipLanChange(e) {
        this.setState({ ipLan: e.target.value })
    }

    MasqueReseau1(e) {
        this.setState({ MasqueReseau1: e.target.value })
    }

    MasqueReseau2(e) {
        this.setState({ MasqueReseau2: e.target.value })
    }

    allDataComplete() {
        var obj = {}

        obj.service = this.state.service
        obj.value = this.state.value
        obj.name = this.state.name
        obj.tel = this.state.tel
        obj.mail = this.state.mail
        obj.service.ipWan = this.state.ipWan
        obj.service.ipLan = this.state.ipLan
        obj.service.MasqueReseau1 = this.state.MasqueReseau1
        obj.service.MasqueReseau2 = this.state.MasqueReseau2


        // this.setState({
        //     data_final: obj
        // }
        //     , () => {
        //         this.props.getDataForPdf(obj)
        //     })
    }

    SwitchClick(e) {

        // console.log(`switch to ${checked}`);
        // console.log(checked);
        // if (checked === true) {

            this.Submit(e);
        
        // else{
        //     type = "warning"
        //     title = "Attention !"
        //     message = "Vos modifications ont déja été enregistrées"
        // }

    }

    NameSiteChange(e) {
        this.setState({ nameSite: e.target.value })
    }

    render() {
        const { search, value, name, tel, mail, ipWan, ipLan, MasqueReseau1, MasqueReseau2, switchBool } = this.state

        
        return (
            <div className="">
                <div className="">
                    {/* <form onSubmit={this.Submit.bind(this)}> */}
                    {/* <Client getData={this.getData.bind(this)} /> */}

                    {/* <hr></hr> */}
                    <div className="row"  style={{ marginBottom: "2%" }}>
                    {/* <div className="col-4"></div> */}
                        <div className="col">
                            {/* <p className="label">Nom du site :</p> */}
                            <Input
                                className="form-control"
                                type="text"
                                value={this.state.nameSite}
                                placeholder="Nom du site"
                                onChange={this.NameSiteChange.bind(this)}
                            />
                        </div>
                        {/* <div className="col-6"></div> */}
                    </div>
                    {/* <hr></hr> */}

                    <div className="row">
                        <div className="col-12">
                            {/* <p className="text-center p text-danger oblg">OBLIGATOIRE !</p> */}

                            <div className="row">
                                <div className="col-6">
                                    {/* <label className="label">Adresse de livraison : </label> */}
                                    <ReactGoogleMapLoader
                                        params={{
                                            key: API_KEY,
                                            libraries: "places,geocode",
                                        }}
                                        render={googleMaps =>
                                            googleMaps && (
                                                <div>
                                                    <ReactGooglePlacesSuggest
                                                        autocompletionRequest={{ input: search }}
                                                        googleMaps={googleMaps}
                                                        onSelectSuggest={this.handleSelectSuggest.bind(this)}
                                                    >
                                                        <Input
                                                            type="text"
                                                            value={value}
                                                            placeholder="Adresse de livraison"
                                                            onChange={this.handleInputChange.bind(this)}
                                                        />
                                                    </ReactGooglePlacesSuggest>
                                                </div>
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-2">
                                    {/* <label className="label">Nom du contact : </label> */}
                                    <Input
                                        type="text"
                                        value={name}
                                        placeholder="Nom du contact"
                                        onChange={this.NameChange.bind(this)}
                                    />
                                </div>
                                <div className="col-2">
                                    {/* <label className="label">Telephone du contact : </label> */}
                                    <Input
                                        type="tel"
                                        value={tel}
                                        placeholder="Tel du contact"
                                        onChange={this.TelChange.bind(this)}
                                    />
                                </div>
                                <div className="col-2">
                                    {/* <label className="label">Mail du contact : </label> */}
                                    <Input
                                        type="text"
                                        value={mail}
                                        placeholder="Mail du contact"
                                        onChange={this.MailChange.bind(this)}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* <hr></hr> */}

                    <div className="row" style={{ marginTop: '1%' }}>
                        <div className="col-3">
                            {/* <label className="label">Adresse IP WAN</label> */}
                            <Input
                                type="text"
                                value={ipWan}
                                placeholder="Adresse IP WAN"
                                onChange={this.ipWanChange.bind(this)}
                            />
                        </div>
                        <div className="col-3">
                            {/* <label className="label">Adresse IP LAN</label> */}
                            <Input
                                type="text"
                                value={ipLan}
                                placeholder="Adresse IP LAN"
                                onChange={this.ipLanChange.bind(this)}
                            />
                        </div>
                    {/* </div> */}
                    {/* <div className="row" style={{ marginTop: '1%', marginBottom: '5%' }}> */}
                        <div className="col-3">
                            {/* <label className="label">Masque sous réseau</label> */}
                            <Input
                                type="text"
                                value={MasqueReseau1}
                                placeholder="Masque sous réseau WAN"
                                onChange={this.MasqueReseau1.bind(this)}
                            />
                        </div>
                        <div className="col-3">
                            {/* <label className="label">Masque sous réseau</label> */}
                            <Input
                                type="text"
                                value={MasqueReseau2}
                                placeholder="Masque sous réseau LAN"
                                onChange={this.MasqueReseau2.bind(this)}
                            />
                        </div>
                    </div>
                    <Service getService={this.getAllService.bind(this)} />

                    <hr></hr>

                    <div className="row">
                        <div className="col-4"></div>
                        {/* <div className="col-3">
                            <p className="label" style={{ marginTop: "3%" }}>Valider les informations</p>
                        </div> */}
                        <div className="col-4 text-center">
                        {/* <Switch onClick={() => openNotificationWithIcon(type)} checked={switchBool} onChange={this.SwitchClick.bind(this)} style={ switchBool ? {backgroundColor: '#d6ae7b'} : {backgroundColor: ''} } /> */}
                        <button className="btn btn_add" onClick={this.SwitchClick.bind(this)} >Valider</button>
                        </div>
                        <div className="col-4"></div>
                    </div>

                    {/* </form> */}
                </div>
            </div>
        );
    }
}

//onClick={this.Submit.bind(this)}