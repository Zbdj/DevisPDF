import React, { Component } from 'react';
import InputClient from '../components/Devis/inputClient.js';
import InputService from '../components/Devis/inputService.js';

import { DatePicker, Select, Input } from 'antd';
import moment from 'moment';

const dateFormat = 'YYYY/MM/DD';


export default class Devis extends Component {


    componentDidMount() {

    }

    render() {

        return (
            <div className="body">
                <div className="content container" style={{padding:'10vh'}}>
                <div className="form-container ">
                <h5 className="text-center p">Formulaire</h5><br></br>
                    <div className='row'>
                        <div className="col-3">
                            <label htmlFor="date_end">Date de fin</label>

                            <DatePicker name="date_end" defaultValue={moment('2019/01/01', dateFormat)} format={dateFormat} />
                        </div>

                        <div className="col-3">
                            <label htmlFor="devise">Devise</label><br></br>
                            <Select
                                style={{ width: 200 }}
                                placeholder="Choisir une devise">

                                <option value="euros">Euros</option>
                                <option value="dollar">Dollar</option>
                                <option value="livre_sterling">Livre Sterling</option>
                                <option value="yen">Yen</option>
                            </Select>
                        </div>
                        <div className="col-3">
                            <label htmlFor="date_start">Date de debut</label>
                            <DatePicker name="date_start" defaultValue={moment('2019/01/01', dateFormat)} format={dateFormat} />
                        </div>
                        <div className="col-3">
                            <label htmlFor="TVA">Motif d'exoneration de TVA</label>
                            <Input name="TVA" type="text" placeholder="IDK..." />
                        </div>
                    </div>
                    <div className='row' style={{ marginTop: '2%' }}>
                        <div className="col-3"><label htmlFor="objet">Objet</label><Input name="objet" type="text" placeholder="Objet" /> </div>
                        <div className="col-3">
                            <label htmlFor="categorie">Categorie</label><br></br>
                            <Select
                                style={{ width: 200 }}
                                placeholder="Choisir une Categorie">

                                <Select.Option value="Categorie_1">Categorie 1</Select.Option>
                                <Select.Option value="Categorie_2">Categorie 2</Select.Option>
                                <Select.Option value="Categorie_3">Categorie 3</Select.Option>
                                <Select.Option value="Categorie_4">Categorie 4</Select.Option>
                            </Select>
                        </div>
                        <div ><InputClient /></div>
                        <div className="container"><InputService /></div>
                    </div>
                    <div className="text-center" style={{marginTop:'80px'}}> <button className="button">Exporter</button></div>

                    </div>
                </div>
                </div>
        )
    }
}