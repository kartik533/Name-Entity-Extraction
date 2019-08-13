import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import {PacmanLoader} from 'react-spinners';

const override = css`
display: block;
margin: 0 ;
border-color: green;
margin-top:200px;
margin-left:550px;

`;

class OcrtoJson extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            names: '',
            surname: '',
            sex: '',
            date_of_birth: '',
            nationality: '',
            number: '',
            filename: 'sample.jpg',
            loading : false,
            visible : ''
        };
    }

    handleNamesChange(e) {
        const name = e.target.value;
        this.setState({
            names: name
        });
    }

    handleSurnameChange(e) {
        const name = e.target.value;
        this.setState({
           surname: name
        });
    }

    handleGenderChange(e) {
        const gender = e.target.value;
        this.setState({
            gender: gender
        });
    }



    handleDobChange(e) {
        const dob = e.target.value;
        this.setState({ dob: dob })
    }



    handleDobChange(e) {
        const dob = e.target.value;
        this.setState({ dob: dob })
    }



    handlePassportChange(e) {
        const passport = e.target.value;
        this.setState({
            number: passport
        })
    }



    handleFileChange(e) {

        let filePath = e.target.value;
        console.log(filePath);
        e.preventDefault()
        let filename = filePath.slice(12);
        this.setState({ filename: filename });


    }

    handleExtract() {
        this.setState({
            loading: true,
            visible:'none'
        })
        const file = { filename: this.state.filename }
        console.log(file)
        axios.post("http://localhost:8080/getjson", file)
            .then(res => {
                console.log(res.data)
                let doby = res.data.date_of_birth.slice(0,2);
                let dobm = res.data.date_of_birth.slice(2,4);
                let dobd = res.data.date_of_birth.slice(4,6);
                let dob = dobd + '/' + dobm + '/' + '19' + doby;
                let gender = (res.data.sex == 'M') ? 'Male' : 'Female'
                this.setState({
                    names : res.data.names,
                    surname: res.data.surname,
                    sex: gender,
                    date_of_birth: dob,
                    nationality: res.data.nationality,
                    number: res.data.number.slice(0,8),
                    loading : false,
                    visible : ''
                })
            }
            )

    }
    render() {
        return (


        
            <div style={{ display: "flex", flexDirection: "row", marginTop: "60px", height: 510, width: "100%", backgroundImage: "url(" +  + ")" }}>
                    <div className='sweet-loading'>
        <PacmanLoader
          css={override}
          sizeUnit={"px"}
          size={50}
          color={'#78ADD2'}
          loading={this.state.loading}

        />
      </div> 
                <div style={{ width: "50%", height: "100%",display:this.state.visible }} >
                
                    <img src={"http://localhost:1234/Desktop/Passports/" + this.state.filename} style={{ height: "70%", width: "80%", marginTop: "65px", marginLeft: "80px" }} />
                </div>

           

                <div style={{ backgroundImage: "url(" + + ")", backgroundSize: "cover", width: "60%", marginTop: 20,display:this.state.visible }}>

                    <div className="row" style={{ background: "transparent", paddingTop: 30, width: "100%" }}>

                        <div className="col-sm-9 col-sm-offset-2">
                            <div className="panel panel-default">

                                <div className="panel-body">

                                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <label className="control-label col-sm-4">First Name:</label>
                                            <div className="col-sm-6">
                                                <input type="text" className="form-control" placeholder="Enter name"
                                                    value={this.state.names} onChange={(e) => this.handleNamesChange(e)}
                                                    required style={{fontWeight:500}}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-sm-4"> Last Name:</label>
                                            <div className="col-sm-6">
                                                <input type="text" className="form-control" placeholder="Enter name"
                                                    value={this.state.surname} onChange={(e) => this.handleSurnameChange(e)}
                                                    required style={{fontWeight:500}} />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label col-sm-4">Gender:</label>
                                            <div className="col-sm-6">
                                                <input type="text" className="form-control" placeholder="Enter Gender"
                                                    value={this.state.sex} onChange={(e) => this.handleGenderChange(e)}
                                                    required style={{fontWeight:500}}/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label col-sm-4">Date of Birth:</label>
                                            <div className="col-sm-6">
                                                <input type="text" className="form-control" placeholder="Enter Date of Birth"
                                                    value={this.state.date_of_birth} onChange={(e) => this.handleDobChange(e)}
                                                    required style={{fontWeight:500}} />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label col-sm-4">Nationality:</label>
                                            <div className="col-sm-6">
                                                <input type="text" className="form-control" style={{fontWeight:500}} placeholder="Enter Nationality"
                                                    value={this.state.nationality} onChange={(e) => this.handleNationalityChange(e)}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label col-sm-4">Passport No:</label>
                                            <div className="col-sm-6">
                                                <input type="tel" className="form-control" placeholder="Enter Passport number"
                                                    style={{fontWeight:500}} value={this.state.number} onChange={(e) => this.handlePassportChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-sm-4">Attach File:</label>
                                            <div className="col-sm-6">
                                                <input type="file" id="choosefile" style={{ marginTop: 50 }} placeholder="Attachment" name="attach"
                                                    style={{fontWeight:500}} onChange={(e) => this.handleFileChange(e)}
                                                />

                                            </div>
                                        </div>


                                        <div style={{ paddingTop: "2%" }}>
                                            <div style={{ marginRight: "90px" }}>
                                                <div className="form-group" style={{ display: "flex", flexDirection: "row" }}>
                                                    <div className=" col-sm-8 col-sm-offset-5" >

                                                        <button type="button" onClick={() => this.handleExtract()} className="btn btn-success" style={{ position: "center", fontSize: 14 }}>Extract</button>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        )
    }
}

export default OcrtoJson;
