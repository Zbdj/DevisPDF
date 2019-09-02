import React, { Component } from 'react';
import './devis.css'
import { Input } from 'antd';
import obj from '../../assets/data.json'
//2 eme input et FAS_HT auto Tx_Abo TX_FAS

export default class InputService extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            list: undefined,
            text: "",
            price_abo: '',
            marge: '',
            scroll: { overflowY: 'scroll', height: '250px' },
            price_fas: '',
            taxe: '',
            marge_fas: '',
            taxe_fas: '',
            quantité: 1,
        }
    }

    componentDidMount() {
        this.setState({ data: obj }, () => {

        })

    }




    searchData(e) {
        //indexOf(e.target.value) !== -1
        var queryData = [];


        if (e.target.value !== '') {
            this.setState({ scroll: { overflowY: 'scroll', height: '300px', width: '510px' } })

            // this.state.data.forEach(function (person) {
            for (let i = 0; i < this.state.data.length; i++) {

                if (this.state.data[i].Designation_solution !== null) {
  

                    // queryData.push(filterByValue(this.state.data, e.target.value))
                    if (this.state.data[i].Designation_solution.trim().toLowerCase().match(e.target.value)) {

                        if (this.state.data[i].Designation_solution.trim().toLowerCase().indexOf(e.target.value) !== -1) {
                        // if (queryData.length < 15) {
                        queryData.push(this.state.data[i]);

                        }
                        // }
                    }

                }
            }

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

    validate(e) {


    }

    onChangeQuant(e) {

        this.setState({
            quantité: e.target.value
        })

        // console.log(e.target.value);
        // e.preventDefault();


    }

    select(value, e) {
        var array = { [this.state.quantité]: value }
        // value.quantité = this.state.quantité;                              

        // console.log(value);

        this.setState({
            text: value.Designation_solution,
            price_abo: value.Abo_mois_ht,
            price_fas: value.FAS_HT,
            marge: value.MGE_ABO,
            taxe: value.Tx_Abo,
            marge_fas: value.MGE_FAS,
            taxe_fas: value.TX_FAS,
            list: [],
            scroll: { overflowY: 'scroll' },
            // text: [... this.state.text, value.Designation_solution],
            // price_abo: [... this.state.price_abo, value.Abo_mois_ht],
            // price_fas: [... this.state.price_fas, value.FAS_HT],
            // marge: [... this.state.marge, value.MGE_ABO],
            // taxe: [... this.state.taxe, value.Tx_Abo],
            // marge_fas: [... this.state.marge_fas, value.MGE_FAS],
            // taxe_fas: [... this.state.taxe_fas, value.TX_FAS],
        }
            , () => {
                // array.push(value)
                this.props.getSer(array)
            }
        )

        // e.preventDefault();

        // return (
        //     false
        // );

        e.stopPropagation()

    }


    searchPrice(e) {
        this.setState({
            price_abo: e.target.value
        })
    }

    PriceFas(e) {
        this.setState({
            price_fas: e.target.value
        })
    }




    render() {
        // console.log(this.state.quantité)
        const { text } = this.state
        const { price_abo } = this.state
        const { marge } = this.state
        const { taxe } = this.state
        const { price_fas } = this.state

        const { marge_fas } = this.state
        const { taxe_fas } = this.state


        return (
            
            <div className="AutocompleteText" >

                <div className="row">

                    <div className="col-2"><p className="label" style={{ margin: 0, fontSize: "13px" }}>Quantité</p></div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <input className="form-control" type="number" min={1} max={50} value={this.state.quantité} onChange={this.onChangeQuant.bind(this)}  style={{ width: "50%" }} />
                    </div>
                </div>
                {/* </div> */}
                <div className="row">
                    {/* <label
                            htmlFor="service" > Service </label> */}

                    <div className="col-6">
                        <Input name="service"
                            onChange={
                                this.searchData.bind(this)
                            }
                            placeholder="Rechercher un service"
                            value={
                                text
                            }
                            className="form-control" />

                        {
                            (this.state.list) ?

                                <div className="" >
                                    <ul id="scroll" style={this.state.scroll}>
                                        {
                                            this.state.list.map((value, i) => {
                                                return (
                                                    <li key={i} onClick={
                                                        (e) => this.select(value, e)}> {value.Designation_solution}  </li>
                                                )

                                            })
                                        } </ul> </div> : null}<br></br></div>
                    {/* <label htmlFor="prix_abo" > Prix </label> */}
                    <div className="col-3">
                        <Input name="prix_abo"
                            placeholder="Prix ABO"
                            value={
                                price_abo
                            }
                            onChange={
                                this.searchPrice.bind(this)
                            }
                            className="form-control" />
                        <p className="text-danger p ml-1" style={{ margin: 0, padding: 0, fontSize: "13px", }}>Marge abo : {marge}</p>
                        <p className="text-danger p ml-1" style={{ margin: 0, padding: 0, fontSize: "13px", }}>Taxe abo : {taxe}</p>

                    </div>
                    <div className="col-3">
                        <Input name="prix fas"
                            placeholder="Prix FAS"
                            value={
                                price_fas
                            }
                            onChange={
                                this.PriceFas.bind(this)
                            }
                            className="form-control" />
                        <p className="text-danger p ml-1" style={{ margin: 0, padding: 0, fontSize: "13px", }}>Marge Fas : {marge_fas}</p>
                        <p className="text-danger p ml-1" style={{ margin: 0, padding: 0, fontSize: "13px", }}>Taxe Fas : {taxe_fas}</p>
                    </div>
                </div>
            </div>
        )
    }
}