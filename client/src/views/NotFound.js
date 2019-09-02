import React, { Component } from 'react';
import FinalForm from './test_input';
import Client from '../components/Devis/inputClient';
import { Form, Button, notification,Icon,Input  } from 'antd';
import { log } from 'util';


var type = ''
var title = ''
var message = ''
var duration = null
let id = 0;
var prixAbo = 0;
class NotFound extends Component {
    constructor() {
        super();
        this.state = {
            res: [],
            client: [],
            nameSite: '',
            sub: false,
            final: [],
            remise: '',
            showRemise: false,
        }
    }

    componentDidMount() {

        
    }

    add = (e) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });

        e.preventDefault();
    };



    getData(e) {
        this.setState({ client: [...this.state.client, e] })
    }


    handleSubmit(event) {
        const {getFieldValue } = this.props.form;
        const keys = getFieldValue('keys');


        
            if(this.state.sub !== true && this.state.res[keys.length -1] !== undefined){
                this.Final();
            }
        


        event.preventDefault();
    }

    getDataForPdf(e) {
        console.log(e);
        
        // var array = [];

        // array.push(e)
        
        // var obj = {};

        // //Delete .service
        // obj.site = e.service;
        // obj.info = e.info;

        this.setState({ res: [...this.state.res, e] })
        
    }




    Final() {
        var finalData = {}
        
        finalData.service = this.state.res
        finalData.client = this.state.client
        finalData.remise = this.state.remise

        this.setState({
            sub: true,
            // final : finalData
        }
        )

        // console.log(this.props.text);

        this.props.text(finalData)
        // console.log(this.props.text);
        this.props.history.push('/PDF')

    }

    remise(e) {
        this.setState({ remise: e.target.value })

    }

    addRemise(){
        if(this.state.showRemise === false){

            for (let i = 0; i < this.state.res.length; i++) {
                for (let y = 0; y < this.state.res[i].service.length; y++) {
                    var key = Object.keys(this.state.res[i].service[y]);
                    // console.log(parseInt(key.next().value));
                    var dataprix = this.state.res[i].service[y][parseInt(key[0])].Abo_mois_ht.slice(0, -2)
                    var datakey = key[0];
                    var price = parseInt(dataprix) * datakey;                                                                                                                                                                                                      // get value of array objectkeys
                    prixAbo += price;
                }
            }

            this.setState({
                showRemise: true
            })    
        }
        else{
            this.setState({
                showRemise: false
            })
            prixAbo = 0;
        }

}

    render() {
        // console.log(this.state.res);

        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { remise,showRemise } = this.state;

        console.log(prixAbo);
        console.log(showRemise);


        
        
        // const formItemLayout = {
        //     labelCol: {
        //         xs: { span: 24 },
        //         sm: { span: 4 },
        //     },
        //     wrapperCol: {
        //         xs: { span: 24 },
        //         sm: { span: 20 },
        //     },
        // };
        // const formItemLayoutWithOutLabel = {
        //     wrapperCol: {
        //         xs: { span: 24, offset: 0 },
        //         sm: { span: 20, offset: 4 },
        //     },
        // };


        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (

            <div key={k}>
                <Form.Item className="row" style={{ marginTop: '1%' }}
                    // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    // label={index === 0 ? '' : ''}
                    required={false}
                    key={k}
                >
                    {/* {getFieldDecorator(`names[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                message: "Veuillez remplir tout les champs avant de pouvoir créer le devis",
                            },
                        ],
                    })
                        ( */}

                    <div>
                        <hr></hr>
                        <div className="">
                            {/* <label className="label ml-3 mt-0">Formulaire n° {k + 1}</label> */}
                            <FinalForm getDataForPdf={this.getDataForPdf.bind(this)} />
                        </div>
                    </div>
                    {/* )} */}
                    {/* {keys.length > 1 ? (
                        <div className="text-center">
                            <p className="p delete">Supprimer le service n° {k + 1} &nbsp;
                  <Icon
                      className="dynamic-delete-button"
                      type="minus-circle-o"
                      onClick={() => this.remove(k)}
                    />
                  </p>
                        </div>
                    ) : null} */}
                </Form.Item>
            </div>
                
        ));
            

        if (this.state.res[keys.length - 1 ] !== undefined && this.state.client.length !== 0) {

            if (this.state.sub === true) {
                type = "warning"
                title = "Attention !"
                message = "Votre devis est deja prêt"
                
            } else {
                type = 'success'
                title = "Visualisation de votre devis"
                message = "Si le devis vous convient vous pouvez le télécharger en cliquant sur le bouton en bas de page"
                duration = 4
            }

        }
        else {
            type = 'info'
            title = "Oups ..."
            message = "Vous devez remplir toute les informations sur la page avant de convertir les données en PDF.."
        }

        const openNotificationWithIcon = (type) => {
            notification[type]({
                message: title,
                description: message,
                duration: duration,
            });
        };


        return (
            <div className="bgForm p-5" style={{ height: '100vh', padding:"50vh"}}>
            <div className="blur "></div>
            <div className="divForm "   style={{height:'90vh',overflowY: "scroll",scrollbarWidth: 'none', borderRadius: "15px", boxShadow: '5px 10px 5px rgba(0,0,0,0.25)' }}>
            <div className=" contenu" style={{ marginTop:"5%",   zIndex: 1}}   >
            <h2 className="text-center" style={{ marginBottom: "5vh" }}>Création de devis</h2>
                <form onSubmit={this.handleSubmit.bind(this)} >
                    <Client getData={this.getData.bind(this)} />
                    {/* <FinalForm getDataForPdf={this.getDataForPdf.bind(this)} /> */}

                    <div className="">
                        <div className="">
                            {formItems}
                            {/* <button onClick={this.getKey.bind(this)}>getKey</button> */}
                        </div>
                        <div className="text-center container">
                            <Button  className="btn_add" onClick={this.add} style={{ width: '20%', marginBottom: '2vh', marginTop: '2vh' }}>
                                <Icon type="plus-circle" className="iconPlus" style={{ fontSize:'15px', color:"#4283C6", position:"relative", bottom:"2.5px"}}/>
                                Ajouter un nouveau site
                        </Button>
                        <div className="row">
                        <div className="col-3"></div>

                            <div className="col-6">

                            {
                                this.state.showRemise === true ?
                                <div>
                                <Input 
                                placeholder="Remise en %"
                                type="text"
                                value={remise}
                                onChange={this.remise.bind(this)}
                                ></Input>
                                <p>Prix Abo : { prixAbo } € </p>
                                {/*  Valeur initiale x (1 – Pourcentage de réduction  / 100) */}
                                    {
                                        isNaN(prixAbo * ( 1 -parseInt(remise)  / 100)) === true ?
                                        <p>Prix total avec remise  0 </p> :
                                        // Math.round(ton_chiffre*100)/100;
                                        <p>Prix total avec remise { Math.round(prixAbo * ( 1 -parseInt(remise)  / 100)*100)/100} </p>
                                    }
                                
                                <div>
                                    Annuler la remise &nbsp; <Icon type="close" style={{ color:'red', fontSize:"20px"}}onClick={this.addRemise.bind(this)} />
                                </div>
                                </div>
                                :
                                <button className="btn btn-success" onClick={ this.addRemise.bind(this) }>Ajouter une remise</button>
                            }

                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <input onClick={() => openNotificationWithIcon(type)} className="btn btn-light btn_pdf " type="submit" value="Convertir en PDF" style={{ marginTop: '5%', marginBottom: '5%' ,color:'#4283C6', backgroundColor: 'white', width:'30%', height:"15%" }} />
                    </div>
                </form>
            </div>
            </div>
            </div>
        )
    }
}
const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(NotFound);
export default WrappedDynamicFieldSet;