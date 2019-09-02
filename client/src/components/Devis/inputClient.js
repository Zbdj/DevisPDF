import React, {
  Component
} from 'react';
import axios from 'axios';
import loader from '../../assets/loader.gif';
import './devis.css'
import {
  Input, Switch, notification, DatePicker, Select, Button, Radio, Icon, Form
} from 'antd';

import JustList from '../Test/JustListSer';

import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest"

import obj from '../../assets/data.json'


const API_KEY = "AIzaSyAQU3x2PDxhLZEYFk4Af4HBPYDpy40aHEs"

const { Option } = Select;



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

let id = 0;
var utc = new Date().toJSON().slice(0,16).replace(/-/g,'_').replace(/T/g,'_').replace(/:/g,'_');

class InputClient extends Component {
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

      nameSignataire: '',
      refTech: '',
      contactFact: '',

      data_final: [],
      switchBool: false,

      dateCommande: '',
      dureSous: '',
      idPipe: '',


      value: "",
      search: "",

      typeService: "",

      file: [],
      mailContact: "",
      proprio: "",
      radio: 1,
      service: [],
      textSer: '',
      listSer: [],

      dataSer: [],
    }


    this.FileChange = this.FileChange.bind(this);

  }

  componentDidMount() {

    console.log(utc);
    
    
    this.setState({ dataSer: obj }, () => {

    })

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
    }
    )

    return (
      null
    );
  }

  searchData(e) {
    // console.log(this.state.data.length)

    // var err = [{
    //   name: "La recherche n'a retourner aucun resultat",
    //   adresse: '',
    // }]

    var queryData = [];
    if (e.target.value !== '') {
      this.setState({ scroll: { overflowY: 'scroll', height: '300px', width: '540px' } })

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

  nameSignataire(e) {
    this.setState({
      nameSignataire: e.target.value
    })

  }

  refTech(e) {
    this.setState({
      refTech: e.target.value
    })
  }

  contactFact(e) {
    this.setState({
      contactFact: e.target.value
    })
  }



  onChangeDate(date, dateString) {
    this.setState({
      dateCommande: dateString
    })
  }

  dureSous(e) {
    this.setState({
      dureSous: e
    })
  }

  iDPipe(e) {
    this.setState({
      idPipe: e.target.value
    })
  }


  typeService(e) {
    this.setState({
      typeService: e
    })
  }


  proprio(e) {
    this.setState({
      proprio: e
    })
  }

  SwitchClick(e) {
    // console.log(e);



    var data = {};

    data.client = this.state.text
    data.adresse = this.state.address
    data.dateCom = this.state.dateCommande
    data.dureSous = this.state.dureSous
    data.nameSignataire = this.state.nameSignataire
    data.refTech = this.state.refTech
    data.contactFact = this.state.contactFact
    data.idPipe = this.state.idPipe
    data.typeService = this.state.typeService
    data.mailContact = this.state.mailContact
    data.proprio = this.state.proprio
    data.createur = this.state.proprio



    // if (checked === true) {
    if (this.state.switchBool === true) {
      type = "warning"
      title = "Attention !"
      message = "Vos modifications ont déja été enregistrées"
      openNotificationWithIcon(type);

    }

    else if (data.client.length !== 0 && data.adresse.length !== 0 && data.nameSignataire.length !== 0 && data.refTech.length !== 0 && data.contactFact.length !== 0 && data.dateCom.length !== 0 && data.dureSous.length !== 0 && data.idPipe.length !== 0 && data.typeService.length !== 0 && data.mailContact.length !== 0 && data.proprio.length !== 0 && data.createur.length !== 0) {
      this.setState({
        bdcAuto: utc + '_' + this.state.proprio
      }, () => {
        data.bdc = this.state.bdcAuto
      })

      type = "success"
      title = "Bravo !"
      message = "Les informations des champs ont été enregistrées avec succès"
      openNotificationWithIcon(type);

      this.setState({
        data_final: data,
        switchBool: true,

      }
        , () => {
          this.props.getData(this.state.data_final)
        }
      )
    }
    else {

      type = "error"
      title = "Erreur !"
      message = "Veuillez remplir tout les champs avant de les valider"
      openNotificationWithIcon(type);

      this.setState({
        switchBool: false,
      })


    }
    // }



    // console.log(this.state.switchBool);

    // e.preventDefault();
    // e.stopPropagation();
  }




  handleInputChange(e) {
    this.setState({ search: e.target.value, address: e.target.value })
  }

  handleSelectSuggest(suggest) {
    // console.log(suggest)
    this.setState({ search: "", address: suggest.formatted_address })
  }

  mailContact(e) {
    this.setState({
      mailContact: e.target.value
    })
  }

  FileChange(selectorFiles) {
    console.log(selectorFiles);

    this.setState({
      file: selectorFiles
    })
  }


  onChangeRadio = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      radio: e.target.value
    })

  };

  oldID(e) {
    this.setState({
      oldID: e.target.value,

    })
  }


  getAllService(e) {
    this.setState({ service: [...this.state.service, e] })
    // console.log(this.state.service);
  }


  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };




  render() {
    const { text } = this.state
    const { address } = this.state

    var { data } = this.state
    // console.log(data)
    const { nameSignataire, refTech, contactFact, switchBool, idPipe, value, search, mailContact, oldID, textSer, bdcAuto } = this.state;

    const { getFieldDecorator, getFieldValue } = this.props.form;



    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (

      <div key={k}>
        <Form.Item className="row" style={{ marginTop: '1%' }}

          required={false}
          key={k}
        >
        <JustList/>
        </Form.Item>
      </div>

    ));



    if (this.state.file.length !== 0) {
      // console.log(this.state.file[0].name);
      var obj_url = window.URL.createObjectURL(this.state.file[0]);


    }

    if (data.length < 1000 || data.length === undefined) {
      return (
        <div className="container text-center" style={{ marginTop: '5%' }}>
          <img src={loader} alt='Chargement' width='20%'></img>
        </div>
      )
    }

    else {

      return (
        <div className="" style={{ marginTop: "2%" }}>
          <div className="AutocompleteText  " >
            <div className="row" style={{ marginBottom: '3%' }} className="text-center">
              <Radio.Group onChange={this.onChangeRadio} value={this.state.radio}>
                <Radio value={1}>Nouveau Devis</Radio>
                <Radio value={2}>AnnuléRemplace</Radio>
              </Radio.Group>
            </div>

            {
              this.state.radio === 2 ?

                <div>
                  <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                      <Input name="oldId"
                        onChange={
                          this.oldID.bind(this)
                        }
                        placeholder="Ancien ID PipeDrive"
                        value={
                          oldID
                        }
                        className="form-control" />
                    </div>
                    <div className="col-4">
                    </div>

                  </div>
                  <div className="row">
                    <div className="col-12">
                      {/* <Service getSer={this.getAllService.bind(this)}/> */}
                      <div className="">
                        {formItems}
                      </div>
                      <div className="text-center" style={{ marginTop: "2%", marginBottom: "2%" }}>
                        <Icon type="plus-circle" className="iconPlus" style={{ fontSize: '35px', color: "#4283C6" }} onClick={this.add} />

                      </div>
                    </div>
                  </div>

                </div>
                : <div></div>

            }
            <hr></hr>
            <div className="row">
              <div className="col-2">
                <Select
                  showSearch
                  placeholder="Service"
                  optionFilterProp="children"
                  value={
                    this.state.typeService ? this.state.typeService : undefined
                  }
                  onChange={
                    this.typeService.bind(this)
                  }
                >
                  <Option value="SD-WAN / ACCES INTERNET">SD-WAN / ACCES INTERNET</Option>
                  <Option value="SD-WAN">SD-WAN</Option>
                  <Option value="ACCES INTERNET">ACCES INTERNET</Option>
                  <Option value="Téléphonie sur IP">Téléphonie sur IP</Option>
                  <Option value="R-FIBER/ Wifi Nouvelle génération">R-FIBER/ Wifi Nouvelle génération</Option>
                  <Option value="Mobilité">Mobilité</Option>
                  <Option value="Cablage">Cablage</Option>
                  <Option value="Matériels">Matériels</Option>

                </Select>
              </div>
              <div className="col-2">
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

                    <div >
                      <ul style={this.state.scroll}>
                        {
                          this.state.list.map((value, i) => {
                            return (
                              <li key={i} onClick={
                                () => this.select(value)}> {value.name} : {value.adresse}  </li>
                            )

                          })
                        } </ul> </div> : null}</div>
              <div className="col-2">

                {/* <Input name="address"

                placeholder="Rechercher une addresse"
                value={
                  address
                }
                onChange={
                  this.searchAddress.bind(this)
                }
                className="form-control" /> */}
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
                            value={address}
                            placeholder="Adresse de facturation"
                            onChange={this.handleInputChange.bind(this)}
                          />
                        </ReactGooglePlacesSuggest>
                      </div>
                    )
                  }
                /><br></br>



              </div>
              <div className="col-2">
                <Select
                  showSearch
                  placeholder="Créateur du devis"
                  optionFilterProp="children"
                  value={
                    this.state.proprio ? this.state.proprio : undefined
                  }
                  onChange={
                    this.proprio.bind(this)
                  }
                >
                  <Option value="Sebastien">Sebastien</Option>
                  <Option value="Yoann">Yoann</Option>
                  <Option value="Benoit">Benoit</Option>
                  <Option value="Jean-Philippe">Jean-Philippe</Option>
                  <Option value="Rodolphe">Rodolphe</Option>

                </Select>

              </div>


              <div className="col-2">
                {/* <label
                htmlFor="date_start" className="label" > Date de commande :</label><br></br> */}
                <DatePicker onChange={this.onChangeDate.bind(this)} style={{ width: "100%" }} placeholder="Date du début du devis" />
              </div>
              <div className="col-2">
                {/* <label
                htmlFor="dureSous" className="label" > Durée de souscription (en mois):</label>*/}
                <Select
                  showSearch
                  placeholder="Selectionner une durée"
                  optionFilterProp="children"
                  value={
                    this.state.dureSous ? this.state.dureSous : undefined
                  }
                  onChange={
                    this.dureSous.bind(this)
                  }
                >
                  <Option value="12">12</Option>
                  <Option value="24">24</Option>
                  <Option value="36">36</Option>
                  <Option value="0">0</Option>
                </Select>
              </div>
            </div>
          </div>
          <div className="row" style={{ marginTop: "2vh", marginBottom: "2vh" }}>

            <div className="col-2">
              <Input name="IDPipe"
                placeholder="Identifiant PipeDrive"
                value={
                  idPipe
                }
                onChange={
                  this.iDPipe.bind(this)
                }
                className="form-control" />
            </div>
            {/* </div> */}

            {/* <div className="row" style={{ marginTop: "2vh", marginBottom: "2vh" }}> */}
            <div className="col-2">
              {/* <label className="label">Nom du Signataire : </label> */}
              <Input name="nameSignataire"
                placeholder="Nom du Signataire"
                value={
                  nameSignataire
                }
                onChange={
                  this.nameSignataire.bind(this)
                }
                className="form-control" />
            </div>
            <div className="col-2">
              {/* <label className="label">Nom du Référent technique : </label> */}
              <Input name="refTech"
                placeholder="Référent technique"
                value={
                  refTech
                }
                onChange={
                  this.refTech.bind(this)
                }
                className="form-control" />
            </div>
            <div className="col-2">
              {/* <label className="label">Nom du Contact pour la facturation : </label> */}
              <Input name="contactFact"
                placeholder="Contact facturation"
                value={
                  contactFact
                }
                onChange={
                  this.contactFact.bind(this)
                }
                className="form-control" />
            </div>
            <div className="col-2">
              <Input name="mailContact"
                placeholder="E-Mail du contact"
                value={
                  mailContact
                }
                onChange={
                  this.mailContact.bind(this)
                }
                className="form-control" />
            </div>
            <div className="col-2">
              <Input name="BDC"
                placeholder="Numéro bon de commande"
                value={
                  bdcAuto
                }
                className="form-control" />
            </div>
          </div>
          {/* <div className="row">
                <div className="col-6">
                <input type="file" onChange={ (e) => this.FileChange(e.target.files) } />

                <a href={`/ ${this.state.file.length !==0 && this.state.file[0].name}`} download={`${this.state.file.length !==0 && this.state.file[0].name}`} >
                  <p>click</p>
                </a>
            </div>
            </div> */}
          <div className="row">
            <div className="col-3">
            </div>
            <div className="col-6 text-center" style={{ marginTop: "2%" }}>
              <hr></hr>
              <p className="label">Valider les informations pour le client {this.state.text}</p>
              {/* <Switch onClick={() => openNotificationWithIcon(type)}  checked={switchBool} onChange={this.SwitchClick.bind(this)} style={ switchBool ? {backgroundColor: '#d6ae7b'} : {backgroundColor: ''} }/> */}
              <button className="btn btn_add" onClick={this.SwitchClick.bind(this)} >Valider</button>
            </div>
            <div className="col-3">
            </div>
          </div>


        </div>

      )
    }
  }
}

const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(InputClient);
export default WrappedDynamicFieldSet;