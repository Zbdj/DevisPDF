import React, { Component } from 'react';
import obj from '../../assets/data.json'

import { Input } from 'antd';

export default class JustListSer extends Component {
    constructor() {
        super();
        this.state = {
            textSer: "",
            dataSer: [],
            quantité: 1,
            oldABO: "",
        }
    }



    componentDidMount() {
        this.setState({ dataSer: obj }, () => {

        })
    }

    searchService(e) {
        //indexOf(e.target.value) !== -1
        var queryData = [];


        if (e.target.value !== '') {
            this.setState({ scroll: { overflowY: 'scroll', height: '300px', width: '510px' } })

            // this.state.data.forEach(function (person) {
            for (let i = 0; i < this.state.dataSer.length; i++) {

                if (this.state.dataSer[i].Designation_solution !== null) {
                    if (this.state.dataSer[i].Designation_solution.trim().toLowerCase().match(e.target.value)) {

                        // if (this.state.data[i].Designation_solution.trim().toLowerCase().indexOf(e.target.value) !== -1) {
                        // if (queryData.length < 15) {
                        queryData.push(this.state.dataSer[i]);

                        // }
                        // }
                    }

                }
            }

        }
        else {
            this.setState({ scroll: { overflowY: 'scroll' } })
        }

        this.setState({
            listSer: queryData
        });
        this.setState({
            textSer: e.target.value
        })
    }


    selectSer(value, e) {
        var array = { [this.state.quantité]: value }
        // value.quantité = this.state.quantité;                              

        // console.log(value);

        this.setState({
            textSer: value.Designation_solution,
            listSer: [],
            scroll: { overflowY: 'scroll' },
        })

        // e.preventDefault();

        // return (
        //     false
        // );
    }


    onChangeQuant(e) {

        this.setState({
            quantité: e.target.value
        })
    }


    oldABO(e){
        this.setState({
            oldABO: e.target.value
        })
    }


    render() {
        const { textSer, oldABO } = this.state;

        return (
            <div>

                <div className="row">
                
                <div className="col-2">
                        <input className="form-control" type="number" min={1} max={50} value={this.state.quantité} onChange={this.onChangeQuant.bind(this)} style={{ width:"35%" }}/>
                </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <Input name="service"
                            onChange={
                                this.searchService.bind(this)
                            }
                            placeholder="Rechercher un service"
                            value={
                                textSer
                            }
                            className="form-control" />

                        {
                            (this.state.listSer) ?

                                <div className="" >
                                    <ul id="scroll" style={this.state.scroll}>
                                        {
                                            this.state.listSer.map((value, i) => {
                                                return (
                                                    <li key={i} onClick={
                                                        (e) => this.selectSer(value, e)}> {value.Designation_solution}  </li>
                                                )

                                            })
                                        } </ul> </div> : null}<br></br>
                    </div>
                    <div className="col-6">
                    <Input name="service"
                            onChange={
                                this.oldABO.bind(this)
                            }
                            placeholder="Prix ABO"
                            value={
                                oldABO
                            }
                            className="form-control" />
                    </div>
                    <div className="col-3">
                    
                    </div>

                </div>
            </div>
        );
    }



}