import React, { Component } from 'react';
import { Form, Button,Icon } from 'antd';
import Service from '../components/Devis/inputService'
let id = 0;

class DynamicFieldSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_service: [],
      list_service: undefined,
      text_service: "",
      price_abo: '',
      marge: '',
      scroll_service: { overflowY: 'scroll' },

      service: []
    }
  }

  componentDidMount() {
    // this.setState({ data_service: obj }, () => {

    // })

  }

  remove = k => {
    const { form } = this.props;

    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });

    console.log(this.state.service);
    // console.log(keys);
    
    
  };

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

  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       const { keys, names } = values;
  //       console.log('Received values of form: ', values);
  //       console.log('Merged values:', keys.map(key => names[key]));
  //     }
  //   });
  // };

  //----------------------------------------------------------------------------------------------------------------------------------------------------------
  // searchDataService(e) {
  //   //indexOf(e.target.value) !== -1
  //   var queryData = [];


  //   if (e.target.value !== '') {
  //     this.setState({ scroll_service: { overflowY: 'scroll', height: '250px', width: '265px' } })

  //     // this.state.data.forEach(function (person) {
  //     for (let i = 0; i < this.state.data_service.length; i++) {

  //       if (this.state.data_service[i].Designation_solution !== null) {
  //         if (this.state.data_service[i].Designation_solution.trim().toLowerCase().match(e.target.value)) {

  //           // if (this.state.data[i].Designation_solution.trim().toLowerCase().indexOf(e.target.value) !== -1) {
  //           // if (queryData.length < 15) {
  //           queryData.push(this.state.data_service[i]);

  //           // }
  //           // }
  //         }

  //       }
  //     }

  //   }
  //   else {
  //     this.setState({ scroll_service: { overflowY: 'scroll' } })
  //   }

  //   this.setState({
  //     list_service: queryData
  //   });
  //   this.setState({
  //     text_service: e.target.value
  //   })


  // }

  // selectService(value, e) {

  //   this.setState({
  //     text_service: value.Designation_solution,
  //     price_abo: value.Abo_mois_ht,
  //     marge: value.FAS_HT,
  //     list_service: [],
  //     scroll_service: { overflowY: 'scroll' }
  //   },() => {
  //     this.props.getService(value)
  //   }
  //   )

  //   return (
  //     null
  //   );
  // }


  // searchPrice(e) {
  //   this.setState({
  //     price_abo: e.target.value
  //   })
  // }
  //----------------------------------------------------------------------------------------------------------------------------------------------------------
  getService(e) {
    
        this.setState({ service: [...this.state.service, e] }
      , () => {
        this.props.getService(e)
    })

  }

  render() {

    // console.log(this.state.service);

    const { getFieldDecorator, getFieldValue } = this.props.form;
    // const formItemLayout = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 4 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 20 },
    //   },
    // };
    // const formItemLayoutWithOutLabel = {
    //   wrapperCol: {
    //     xs: { span: 24, offset: 0 },
    //     sm: { span: 20, offset: 4 },
    //   },
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
          {getFieldDecorator(`names[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Veuillez remplir tout les champs",
              },
            ],
          })(
            <div >
              <hr></hr>
              <div className="">
              <label className="label" style={{ fontSize:"13px !important" }}>Service n° {k + 1}</label>
              </div>
              <Service key={k} getSer={this.getService.bind(this)}/>
              </div>
            )}
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

    return (
      // <Form onSubmit={this.handleSubmit}>
      //   {formItems}
      //   <Form.Item {...formItemLayoutWithOutLabel}>
      // <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
      //   <Icon type="plus"/> 
      //   Ajouter un service
      // </Button>
      //   </Form.Item>
      //   <Form.Item {...formItemLayoutWithOutLabel}>
      //     <Button type="primary" htmlType="submit" >
      //       Ajouter
      //     </Button>
      //   </Form.Item>
      // </Form>
      <div className="">
        <div className="">
            {formItems}
            {/* <button onClick={this.getKey.bind(this)}>getKey</button> */}
        </div>
        <hr></hr>
        <div className="row">
        <div className="col-12 text-center" style={{ marginTop: '2vh',  marginBottom: '2vh'}}>
          {/* <Button type="dashed" className="btn_add"  style={{  width:"6%" }}> */}
            {/* <Icon type="plus" /> */}
            <Icon type="plus-circle" className="iconPlus" style={{ fontSize:'35px', color:"#4283C6" }} onClick={this.add}/>
        {/* </Button> */}
        </div>
        </div>
      </div>
    );
  }
}

const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(DynamicFieldSet);
export default WrappedDynamicFieldSet;
// ReactDOM.render(<WrappedDynamicFieldSet />, mountNode);