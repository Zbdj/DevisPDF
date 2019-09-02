import React, { Component } from 'react';
import axios from 'axios';
import { Input } from 'antd';
import obj from '../assets/data.json'
import { Link } from 'react-router-dom'

export default class Form extends Component {
    constructor() {
        super();
        this.state = {
            data: {},
            list: undefined,
            text: "",
            i: 0,
            finish: false,
            address: "",
            scroll: { overflowY: 'scroll' },

            data_service: [],
            list_service: undefined,
            text_service: "",
            price_abo: '',
            marge: '',
            scroll_service: { overflowY: 'scroll' }
        }
    }

    componentDidMount() {
        this.setState({ data_service: obj }, () => {

        })

        this.mountClient();

    }
    // ----------------------------------------- FONCTION INPUT CLIENT ET ADRESSE -----------------------------------------
    mountClient() {
        var data = [];

        var start = 0;
        var { i } = this.state
        for (i = 0; i < 10; i++) {
            axios.get(`https://sayse.pipedrive.com/v1/deals?api_token=d168467b213a71acdc4ba5cb5b2cfe96529ac061&start=` + start + `&limit=500`)
                .then(res => {
                    // console.log(`https://sayse.pipedrive.com/v1/deals?api_token=d168467b213a71acdc4ba5cb5b2cfe96529ac061&start=` + start + `&limit=500`)

                    if (res.data.data !== null) {

                        res.data.data.forEach(element => {
                            if (element.org_id === null) {
                                return false;
                            }
                            else {

                                // data.push(element.org_id)
                                data.push({ name: element.org_id.name, adresse: element.org_id.address });

                                // console.log(element.org_id)
                                //   this.setState(() => ({
                                //     data: {
                                //         ...this.state.data,
                                //         org_name: element.org_id,
                                //     },
                                // }))

                            }
                        });

                    }
                    if (i === 10) {
                        // console.log(this.getUnique(data,'name'))
                        this.setState({ data: this.getUnique(data, 'name') })
                        // console.log(this.state.data)
                        return;
                    }


                })
            start += 500;
        }
    }


    getUnique(arr, comp) {

        const unique = arr
            .map(e => e[comp])

            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)

            // eliminate the dead keys & store unique objects
            .filter(e => arr[e]).map(e => arr[e]);

        return unique;

    }

    select(value) {

        this.setState({
            text: value.name,
            address: value.adresse,
            list: [],
            scroll: { overflowY: 'scroll' }
        })

        return (
            null
        );
    }

    searchData(e) {
        // console.log(this.state.data.length)

        var queryData = [];
        if (e.target.value !== '') {
            this.setState({ scroll: { overflowY: 'scroll', height: '250px', width: '265px' } })

            // this.state.data.forEach(function (person) {
            for (let i = 0; i < this.state.data.length; i++) {
                // console.log(this.state.data[i].name);

                if (this.state.data[i].name !== null) {
                    if (this.state.data[i].name.trim().toLowerCase().indexOf(e.target.value) !== -1) {


                        // if (queryData.length < 10) {
                        queryData.push(this.state.data[i]);
                        // }

                    }

                }
            }
            // });

        }
        else {
            this.setState({ scroll: { overflowY: 'scroll' } })
        }

        this.setState({
            list: queryData
        });
        this.setState({
            text: e.target.value
        })

    }
    
    searchAddress(e) {
        this.setState({
            address: e.target.value
        })
    }
    // -----------------------------------------FIN DES FONCTIONS INPUT CLIENT ET ADRESSE -----------------------------------------


    // ----------------------------------------- FONCTIONS INPUT SERVICE ET MARGE -------------------------------------------------

    searchDataService(e) {
        //indexOf(e.target.value) !== -1
        var queryData = [];


        if (e.target.value !== '') {
            this.setState({ scroll_service: { overflowY: 'scroll', height: '250px', width: '265px' } })

            // this.state.data.forEach(function (person) {
            for (let i = 0; i < this.state.data_service.length; i++) {

                if (this.state.data_service[i].Designation_solution !== null) {
                    if (this.state.data_service[i].Designation_solution.trim().toLowerCase().match(e.target.value)) {

                        // if (this.state.data[i].Designation_solution.trim().toLowerCase().indexOf(e.target.value) !== -1) {
                        // if (queryData.length < 15) {
                        queryData.push(this.state.data_service[i]);

                        // }
                        // }
                    }

                }
            }

        }
        else {
            this.setState({ scroll_service: { overflowY: 'scroll' } })
        }

        this.setState({
            list_service: queryData
        });
        this.setState({
            text_service: e.target.value
        })


    }

    selectService(value, e) {

        this.setState({
            text_service: value.Designation_solution,
            price_abo: value.Abo_mois_ht,
            marge: value.FAS_HT,
            list_service: [],
            scroll_service: { overflowY: 'scroll' }
        })

        return (
            null
        );
    }


    searchPrice(e) {
        this.setState({
            price_abo: e.target.value
        })
    }



    // -----------------------------------------FIN DES FONCTIONS SERVICE ET MARGE -----------------------------------------
    Click() {
        alert('Client: ' + this.state.text + 'Adresse: ' + this.state.address + '<br>Service: ' + this.state.text_service + '<br>Prix: ' + this.state.price_abo + '<br>Marge : ' + this.state.marge);
        // console.log('Client : ' + this.state.text);
    }


    render() {
        const { text } = this.state
        const { address } = this.state

        const { text_service } = this.state
        const { price_abo } = this.state
        const { marge } = this.state
        console.log(this.state.text)
        return (
            <div className="body">
                <div className=" container content" ><br></br>
                    <p className="p"><Link to='/' style={{ color: '#333' }}> Retour a l'accueil</Link></p>
                    <h2 className="text-center">Devis</h2>
                    <div className="form-devis AutocompleteText">
                        <div className="row" style={{ marginTop: '3%' }}>

                            <div className="col-5">
                                <label
                                    htmlFor="client" > Client : </label>
                                <Input name="client"
                                    onChange={
                                        this.searchData.bind(this)
                                    }
                                    placeholder="Rechercher un client"
                                    value={
                                        text
                                    }
                                    className="form-control" />
                                {
                                    (this.state.list) ?

                                        <ul style={this.state.scroll}>
                                            {
                                                this.state.list.map((value, i) => {
                                                    return (
                                                        <li key={i} onClick={
                                                            () => this.select(value)}> {value.name} : {value.adresse}  </li>
                                                    )

                                                })
                                            } </ul> : null}<br></br></div>
                            <div className="col-5">
                                <label
                                    htmlFor="address" > Adresse :</label>
                                <Input name="address"

                                    placeholder="Rechercher une addresse"
                                    value={
                                        address
                                    }
                                    onChange={
                                        this.searchAddress.bind(this)
                                    }
                                    className="form-control" />

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5">
                                <label
                                    htmlFor="service" > Service :</label>
                                <Input name="service"
                                    onChange={
                                        this.searchDataService.bind(this)
                                    }
                                    placeholder="Rechercher un service"
                                    value={
                                        text_service
                                    }
                                    className="form-control" />

                                {
                                    (this.state.list_service) ?

                                        <div className="" >
                                            <ul id="scroll" style={this.state.scroll_service}>
                                                {
                                                    this.state.list_service.map((value, i) => {
                                                        return (
                                                            <li key={i} onClick={
                                                                (e) => this.selectService(value, e)}> {value.Designation_solution}  </li>
                                                        )

                                                    })
                                                } </ul> </div> : null}<br></br></div>
                            <div className="col-5">
                                <label htmlFor="prix_abo" > Prix :</label>
                                <Input name="prix_abo"
                                    placeholder="prix_abo"
                                    value={
                                        price_abo
                                    }
                                    onChange={
                                        this.searchPrice.bind(this)
                                    }
                                    className="form-control" />
                                <p className="text-danger" style={{ marginTop: '2%' }}>Marge abo : {marge}</p>
                            </div>


                        </div>
                        <div className="row">
                        <div className="text-center">
                            <input type="submit" className="btn btn-light" value="Submit" onClick={(e) => this.Click()} />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}