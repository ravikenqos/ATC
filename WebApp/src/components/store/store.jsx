import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as Icon from 'react-feather';


import { getCategories  }  from './../../actions/category';
import { addStore, getStore, editStore, changeStoreStatus }  from './../../actions/store_action';
import axios, { post } from 'axios';
import Select from './select';
import {toastr} from 'react-redux-toastr';

import './../product/product.css';
import './store.css';
import stateData from '../../assets/data/states.json';
let hours = {
    monday:null,
    tuesday:null,
    wednesday:null,
    thursday:null,
    friday:null,
    saturday:null,
    sunday:null
};

let monday = { startTime:null, endTime:null};
let tuesday = { startTime:null, endTime:null};
let wednesday = { startTime:null, endTime:null};
let thursday = { startTime:null, endTime:null};
let friday = { startTime:null, endTime:null};
let saturday = { startTime:null, endTime:null};
let sunday = { startTime:null, endTime:null};

class Store extends Component {
    componentWillMount(){
        this.props.getCategories();
        let loggedUser = JSON.parse(localStorage.getItem('acc'));
       if(loggedUser.userid){
            this.props.getStore(loggedUser.userid);
       }
        
    }
    constructor(props) {
        super(props);
        this.state = {
            file:null,
            namefield:null,
            storename:null,
            tagline:null,
            storedescription:null,
            storeurl:null,
            business_type:null,
            addressone:null,
            addresstwo:null,
            state:null,
            city:null,
            phonenumber:null,
            postalcode:null,
            zonefield:null,
            workinghours:null,
            monday:null,
            tuesday:null,
            wednesday:null,
            thursday:null,
            friday:null,
            saturday:null,
            sunday:null,
            mstarttime:null,
            mendttime:null,
            tustarttime:null,
            tuendttime:null,
            wedstarttime:null,
            wedendttime:null,
            thstarttime:null,
            thendttime:null,
            fstarttime:null,
            fendttime:null,
            sastarttime:null,
            saendtime:null,
            sustarttime:null,
            suendttime:null,
            category:null,
            selectbusinesstype:null,
            uploadImage:null,
            isMouseInside: false,
            action: 'add',
            store_id: null,

        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    
    onFormSubmit(e){
        e.preventDefault();

        if(!this.state.file){
            this.setState({
                storefileerror: "Please select .jpg or .png or .jpeg file",
                isError: true
            });     
        }else {
            this.setState({
                storefileerror: null,
                isError: false
            }); 
        }  

        if(!this.state.namefield){
            this.setState({
                namefielderror:true,
                namefieldmsg:"Please enter business name",
                isError: true
            });     
        }else {
            if(this.state.namefield.length < 6 ){
                this.setState({
                    namefielderror:true,
                    namefieldmsg:"Please enter name greater than six character",
                    isError: true
                });        
            } else {
                this.setState({
                    namefieldmsg:'',
                    isError: false
                });
            }       
        }
        if(!this.state.tagline){
            this.setState({
                taglineerror:true,
                taglinemsg:"Please enter tagline",
                isError: true
            });     
        }else {
            if(this.state.tagline.length < 6 ){
                this.setState({
                    taglineerror:true,
                    taglinemsg:"Please enter tagline greater than six character",
                    isError: true
                });        
            } else {
                this.setState({
                    taglineerror:false,
                    taglinemsg:'',
                    isError: false
                });
            }       
        }         
        if(!this.state.storedescription){
            this.setState({
                storetextfielderror:true,
                storetextfieldmsg:"Please enter store description",
                isError: true
            });         
        } else {
            if(this.state.storedescription.length > 500  ){ 
                this.setState({
                    storetextfielderror:true,
                    storetextfieldmsg:"Description not more than 500 character",
                    isError: true
               });
           } else {
            this.setState({
                storetextfielderror:false,
                storetextfieldmsg:'',
                isError: false
            }); 
           }
        }
        if(!this.state.storeurl){
            this.setState({
                storeurlfielderror:true,
                storeurlfieldmsg:"Please enter store url",
                isError: true
            });         
        } else {
            if(this.isValidUrl(this.state.storeurl) ){ 
                this.setState({
                    storeurlfielderror:true,
                    storeurlfieldmsg:"Please enter valid store url",
                    isError: true
                });
            } else {
            this.setState({
                storeurlfielderror:false,
                storeurlfieldmsg:'',
                isError: false
            }); 
           }
        } 

        if(!this.state.business_type){
            this.setState({
                business_typefielderror:true,
                business_typefieldmsg:"Please select any businesstype",
                isError: true
            });         
        } else {
            this.setState({
                business_typefieldmsg:'',
                isError: false
            }); 
           
        }           

        if(!this.state.addressone){
            this.setState({
                addressonefielderror:true,
                addressonefieldmsg:"Please enter your address",
                isError: true
            });         
        } else {
            this.setState({
                addressonefielderror:false,
                addressonefieldmsg:'',
                isError: false
            }); 
        }

        if(!this.state.state){
            this.setState({
                statefielderror:true,
                statefieldmsg:"Please select your state",
                isError: true
            });         
        } else {
            this.setState({
                statefielderror:false,
                statefieldmsg:'',
                isError: false
            }); 
        }

        if(!this.state.city){
            this.setState({
                cityfielderror:true,
                cityfieldmsg:"Please enter your city",
                isError: true
            });         
        } else {
            this.setState({
                cityfielderror:false,
                cityfieldmsg:'',
                isError: false
            }); 
        }

        if(!this.state.phonenumber){
            this.setState({
                phonefielderror:true,
                phonefieldmsg:"Please enter phone Number",
                isError: true
            });         
        } else {
            this.setState({
                phonefielderror:false,
                phonefieldmsg:'',
                isError: false
            }); 
        } 
        
        if(!this.state.postalcode){
            this.setState({
                postalcodefielderror:true,
                postalcodefieldmsg:"Please enter postalcode",
                isError: true
            });         
        } else {
            this.setState({
                postalcodefielderror:false,
                postalcodefieldmsg:'',
                isError: false
            }); 
        }  
 
        if(!this.state.zonefield){
            this.setState({
                zonefielderror:true,
                zonefieldmsg:"Select any time zone",
                isError: true
            });         
        } else {
            this.setState({
                zonefielderror:false,
                zonefieldmsg:"",
                isError: false
            }); 
        }          
   
            if(!this.state.monday){
                hours.monday = null;
            } else {
                
                    monday.startTime = document.querySelector(".mfromfield").value;
                    hours['monday'] = monday;
                    monday.endTime = document.querySelector(".mtofield").value;
                    hours['monday'] = monday;                                                
            
            }
            if(!this.state.tuesday){
                hours.tuesday = null;
            } else {
                
                    tuesday.startTime = document.querySelector(".tufromfield").value;
                    hours['tuesday'] = tuesday;
                    tuesday.endTime = document.querySelector(".tutofield").value;
                    hours['tuesday'] = tuesday;                                                
            
            }
            if(!this.state.wednesday){
                hours.wednesday = null;
            } else {
                
                wednesday.startTime = document.querySelector(".wedfromfield").value;
                    hours['wednesday'] = wednesday;
                    wednesday.endTime = document.querySelector(".wedtofield").value;
                    hours['wednesday'] = wednesday;                                                
            
            }
            if(!this.state.thursday){
                hours.thursday = null;
            } else {
                
                thursday.startTime = document.querySelector(".thfromfield").value;
                    hours['thursday'] = thursday;
                    thursday.endTime = document.querySelector(".thtofield").value;
                    hours['thursday'] = thursday;                                                
            
            }
            if(!this.state.friday){
                hours.friday = null;
            } else {
                
                friday.startTime = document.querySelector(".ffromfield").value;
                    hours['friday'] = friday;
                    friday.endTime = document.querySelector(".ftofield").value;
                    hours['friday'] = friday;                                                
            
            }
            if(!this.state.saturday){
                hours.saturday = null;
            } else {
                
                saturday.startTime = document.querySelector(".safromfield").value;
                    hours['saturday'] = saturday;
                    saturday.endTime = document.querySelector(".satofield").value;
                    hours['saturday'] = saturday;                                                
            
            }
            if(!this.state.sunday){
                hours.sunday = null;
            } else {
                
                    sunday.startTime = document.querySelector(".sufromfield").value;
                    hours['sunday'] = sunday;
                    sunday.endTime = document.querySelector(".sutofield").value;
                    hours['sunday'] = sunday;                                                
            
            }                                                            



        if(this.state.file && this.state.namefield && this.state.tagline && this.state.storedescription && this.state.storeurl
           && this.state.business_type && this.state.addressone && this.state.state && this.state.city && this.state.phonenumber 
           && this.state.postalcode && this.state.zonefield && this.state.workinghours){
   
            const formData = new FormData();
            let loggedUser = JSON.parse(localStorage.getItem('acc'));
            formData.append('user_id', loggedUser.userid);
            formData.append('name',this.state.namefield);
            formData.append('tagline',this.state.tagline);
            formData.append('description',this.state.storedescription);
            formData.append('storeurl', this.state.storeurl);
            formData.append('addressone',this.state.addressone);
            formData.append('addresstwo',this.state.addresstwo);
            formData.append('state',this.state.state);
            formData.append('city',this.state.city);
            formData.append('phonenumber',this.state.phonenumber);
            formData.append('postalcode',this.state.postalcode);
            formData.append('timezone',this.state.zonefield);
            formData.append('workinghours',JSON.stringify(hours));

            if(this.state.action === 'add'){
                formData.append('store',this.state.file);
                this.props.addStore(formData, this.props.history);
                formData.append('business_type',this.state.business_type);
            } else {
                formData.append('store_id',this.state.store_id);
                formData.append('store', this.state.file);
                formData.append('image',this.state.image);
                formData.append('business_type',this.state.business_type);
                this.props.editStore(formData, this.props.history);
            }    

        } 
    } 

    handleChange(e) {
        let target = e.target;
        if(target.name === 'storeimagefield'){
            let fileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if(fileTypes.indexOf(target.files[0].type) < 0)  {
                this.setState({
                    storefileerror: "Please select .jpg or .png or .jpeg file",
                    storeimagename:target.files[0].name,
                    file: null,
                    isError: false
                });             
            } else if(target.files[0]){
                this.setState({
                    storefileerror: "",
                    storeimagename:target.files[0].name,
                    file: target.files[0],
                }); 
            }  
            
        } //End of file

        if(target.name === 'namefield'){
            if(target.value.length > 0){
                if(target.value.length < 6 ){
                    this.setState({
                        namefielderror:true,
                        namefieldmsg:"Please enter name greater than six character",
                        isError: true
                    });        
                } else {
                    this.setState({
                        namefielderror:false,
                        namefieldmsg:'',
                        namefield: target.value,
                        isError: false
                    });
                }            
            }      
        }

        if(target.name === 'tagline'){
            if(target.value.length > 0){
                if(target.value.length < 6 ){
                    this.setState({
                        taglineerror:true,
                        taglinemsg:"Please enter tagline more than two character",
                        isError: true
                    });        
                } else {
                    this.setState({
                        taglineerror:false,
                        taglinemsg:'',
                        tagline: target.value,
                        isError: false
                    });
                }            
            }      
        }
        if(target.name === 'storetextfield'){
            if(target.value.length > 0){
                if(target.value.length > 500 ){ 
                    this.setState({
                        storetextfielderror:true,
                        storetextfieldmsg:"Description not more than 500 character",
                        isError: true
                    });
                } else {
                    this.setState({
                        storetextfielderror:false,
                        storetextfieldmsg:'',
                        storedescription: target.value,
                        isError: false
                    }); 
                }
            }      
        }
        if(target.name === 'storeurlfield'){
            if(target.value.length > 0){
                if(this.isValidUrl(target.value) ){ 
                    this.setState({
                        storeurlfielderror:true,
                        storeurlfieldmsg:"Invalid store url",
                        isError: true
                    });
                } else {
                    this.setState({
                        storeurlfielderror:false,
                        storeurlfieldmsg:'',
                        storeurl: target.value,
                        isError: false
                    }); 
                }
            }      
        }
        
        if(target.name === "adressonefield"){
            if(target.value.length > 0 ){
                this.setState({
                    addressone: target.value,
                    isError: false
                }); 
            }             
        }
        if(target.name === "adresstwofield"){
            if(target.value.length > 0 ){
                this.setState({
                    addresstwo: target.value,
                    isError: false
                }); 
            }             
        }
        if(target.name === "statefield"){
            if(target.value.length > 0){
                this.setState({
                    state:target.value,
                    isError: false
                }); 
            }
        }   

        if(target.name === "cityfield"){
            if(target.value.length > 0 ){
                if(!this.isChar(target.value) ){ 
                    this.setState({
                        cityfielderror:true,
                        cityfieldmsg:"Numbers are not allowed",
                        isError: true
                    });
                } else {
                this.setState({
                    cityfielderror:false,
                    cityfieldmsg:'',
                    city:target.value,
                    isError: false
                }); 
               }      
            }
        } 

        if(target.name === "phonenofield"){
            if(target.value != '' || target.value != null ){
                if(!this.isValidPhoneNumber(target.value) ){ 
                    this.setState({
                        phonefielderror:true,
                        phonefieldmsg:"Invalid Phone number",
                        isError: true
                    });
                } else {
                this.setState({
                    phonefielderror:false,
                    phonefieldmsg:'',
                    phonenumber:target.value,
                    isError: false
                }); 
              }      
           }
        } 


        if(target.name === "postalcodefield"){
            if(target.value != '' || target.value != null ){
                if(this.isNumber(target.value) ){ 
                    this.setState({
                        postalcodefielderror:true,
                        postalcodefieldmsg:"character are not allowed",
                        isError: true
                    });
                } else {
                this.setState({
                    postalcodefielderror:false,
                    postalcodefieldmsg:'',
                    postalcode: target.value,
                    isError: false
                }); 
               }      
            }
        }
        if(target.name === "zonefield"){
            if(target.value != '' || target.value != null ){
                // if(this.isNumber(target.value) ){ 
                //     this.setState({
                //         zonefielderror:true,
                //         zonefieldmsg:"Select any time zone",
                //         isError: true
                //     });
                // } else {
                this.setState({
                    zonefielderror:false,
                    zonefieldmsg:'',
                    zonefield: target.value,
                    isError: false
                }); 
            //    }      
            }
        }                
    }   
    
    setValue = (e) => {
        let target = e.target;
        if(target.name === 'namefield'){
            this.setState({ namefield: target.value});
        }

        if(target.name === 'tagline'){
            this.setState({tagline: target.value});
        }
        if(target.name === 'storetextfield'){
            this.setState({storedescription: target.value}); 
        }
        if(target.name === 'storeurlfield'){
                    this.setState({ storeurl: target.value}); 
        }

        if(target.name === "adressonefield"){
                this.setState({ addressone: target.value}); 
        }
        if(target.name === "adresstwofield"){
            this.setState({ addresstwo: target.value}); 
    }        

        if(target.name === "statefield"){
                this.setState({ state:target.value}); 
        }   
        if(target.name === "cityfield"){
                this.setState({city:target.value}); 
        } 

        if(target.name === "phonenofield"){
                this.setState({phonenumber:target.value}); 
        } 
        if(target.name === "postalcodefield"){
                this.setState({postalcode: target.value}); 
        }
        if(target.name === "zonefield"){
                this.setState({
                    zonefield: target.value,
                });
            }         
    }      

    renderTimes = (time) =>{
        // let date, time = [];
        // date = new Date();
        // while (date.getMinutes() % 15 !== 0) {
        //     date.setMinutes ( date.getMinutes() + 1 );
        // }
        // for (var i = 0; i < 24 * 4; i++) {
        //    // time.push(date.getHours() + ':' + date.getMinutes());
        //    let ti = date.getHours() + ':' + date.getMinutes();
        //    time.push(<option value={ti}>{ti}</option>)
        //     date.setMinutes ( date.getMinutes() + 30);
        // }
        // return time; 
        var timeArray = [];
        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();
        
        for(var i=0; i< 24; i++){
            for(m = (m + 15 - m%15)%60; m < 60; m = m + 15){
                timeArray.push(h + ':' + m);
            }
            h = (h+1) % 24;
            let instime = h + ':' + '00';
            timeArray.push(<option selected = { time == instime ? true : false } value={instime}>{instime}</option> );
        }
        return timeArray;
    }
    renTimes = (e) => {
        // let tr = []
        // let time = this.listTimes();
        // time.forEach((item) => {
        //     tr.push(<option value={item}>{item}</option>)
        // })
        // return tr;
    }

    isValidUrl = (url) => {
        let regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        let res = url.match(regexp);
        if (!res){
            return true;
        } else {
            return false;
        }
    }

    isChar = (word) =>{
        let regexp =  /^[a-zA-Z]+$/;
        let res = word.match(regexp);
        console.log(word);
        if (!res){
            return false;
        } else {
            return true;
        }        
    }

    isNumber = (n) => {
        let regexp =  /^[0-9]+$/;
        let res = n.match(regexp);
        if (!res){
            return true;
        } else {
            return false;
        }          
    }

    isValidPhoneNumber = (n) =>{
        let regexp =  /^[0-9]+$/;
        let res = n.match(regexp);
        if (!res){
            console.log("false");
            return false;
        } else {
            console.log("true");
            return true;
        }         
    }

    renderState = () => {
        let states = [];
        if(stateData){
            let data = stateData.states;
            data.forEach((item) =>{
                if(item.country_id == 231){
                    states.push(<option selected = { this.state.state == item.name ? true : false } value={item.name}>{item.name}</option>)
                }    
            });
        }
        return states;
    }
    renderTimeZone(){
        let zonefield = []
        let timezone = [
            "Samoa state zone",
            "Alaska state zone",
            "Pacific state zone"
        ]
        timezone.forEach((item) =>{
            zonefield.push(<option selected = { this.state.zonefield == item ? true : false } value={item}>{item}</option>)
        });

        return zonefield;        
    }

    handleCheckbox = (e) => {
      
        if(e){
            switch(e.target.name){
                case 'mondaycheckfield':
                    e.target.checked ? this.setState({ monday:true })
                    :  this.setState({ monday:false });
   
                    break;
                    case 'tuesdaycheckfield':
                    e.target.checked ? this.setState({ tuesday:true })
                    :  this.setState({ tuesday:false });
                    break;
                    case 'wednesdaycheckfield':
                    e.target.checked ? this.setState({ wednesday:true })
                    :  this.setState({ wednesday:false });
                    break;
                    case 'thursdaycheckfield':
                    e.target.checked ? this.setState({ thursday:true })
                    :  this.setState({ thursday:false });
                    break;
                    case 'fridaycheckfield':
                    e.target.checked ? this.setState({ friday:true })
                    :  this.setState({ friday:false });
                    break;
                    case 'saturdaycheckfield':
                    e.target.checked ? this.setState({ saturday:true })
                    :  this.setState({ saturday:false });
                    break;
                    case 'sundaycheckfield':
                    e.target.checked ? this.setState({ sunday:true })
                    :  this.setState({ sunday:false });
                    break;                                                                                                                        
                default:
                    return '';    
            } 
            this.setState({ workinghours:hours});
        }
    }

    listCategories(btype){
        console.log('listcategories', this.props.categories);
        // let bt = ''; 
        // if(this.state.business_type){
            console.log("select", btype);
          
     //   } 
        return (  
            // <MultipleSelect categories={this.props.categories} getSelectValue={this.getSelectValue}/>
             <Select categories={this.props.categories}  category_id={btype} getSelectValue={this.getSelectValue}/>
        );
       
    }

    getSelectValue = (category_id) =>{
        if(category_id){
            this.setState({
                business_type : category_id,
                business_typefieldmsg:'',
                isError: false 
            });
        }
     
     }

    handleHours = (e) => {
        if( e.target.name === "mfromfield" ){
            if(e.target.value != '' || e.target.value != null ){
                if(this.state.monday){
                    monday.startTime = e.target.value;
                  hours['monday'] = monday;
                }
            }
        }
        if( e.target.name === "mtofield" ){
            if(e.target.value != '' || e.target.value != null ){
                if(this.state.monday){
                    monday.endTime = e.target.value;
                   hours['monday'] = monday; 
                }              
            }
        } //monday
        if( e.target.name === "tufromfield" ){
            if(e.target.value != '' || e.target.value != null ){
                if(this.state.tuesday){
                    tuesday.startTime = e.target.value;
                  //  hours['monday'].push(monday); 
                  hours['tuesday'] = tuesday;
                }
            }
        }
        if( e.target.name === "tutofield" ){
            if(e.target.value != '' || e.target.value != null ){
                if(this.state.tuesday){
                    tuesday.endTime = e.target.value;
                   // hours['monday'].push(monday);
                   hours['tuesday'] = tuesday; 
                }              
            }
        } //tuesday

        if( e.target.name === "wedfromfield" ){
            if(e.target.value != '' || e.target.value != null ){
                if(this.state.wednesday){
                    wednesday.startTime = e.target.value;
                  //  hours['monday'].push(monday); 
                  hours['wednesday'] = wednesday;
                }
            }
        }
        if( e.target.name === "wedtofield" ){
            if(e.target.value != '' || e.target.value != null ){
                if(this.state.wednesday){
                    wednesday.endTime = e.target.value;
                   // hours['monday'].push(monday);
                   hours['wednesday'] = wednesday; 
                }              
            }
        }//wednesday
        if( e.target.name === "thfromfield" ){
            if(e.target.value != '' || e.target.value != null ){
                if(this.state.thursday){
                    thursday.startTime = e.target.value;
                  //  hours['monday'].push(monday); 
                  hours['thursday'] = thursday;
                }
            }
        }
        if( e.target.name === "thtofield" ){
            if(e.target.value != '' || e.target.value != null ){
                if(this.state.thursday){
                    thursday.endTime = e.target.value;
                   // hours['monday'].push(monday);
                   hours['thursday'] = thursday; 
                }              
            }
        }//thursday
        if( e.target.name === "ffromfield" ){
            if(e.target.value != '' || e.target.value != null ){
                if(this.state.friday){
                    friday.startTime = e.target.value;
                  //  hours['monday'].push(monday); 
                  hours['friday'] = friday;
                }
            }
        }
        if( e.target.name === "ftofield" ){
            if(e.target.value != '' || e.target.value != null ){
                if(this.state.friday){
                    friday.endTime = e.target.value;
                   // hours['monday'].push(monday);
                   hours['friday'] = friday; 
                }              
            }
        }//friday
        if( e.target.name === "safromfield" ){
            if(e.target.value != '' || e.target.value != null ){
                if(this.state.saturday){
                    saturday.startTime = e.target.value;
                  //  hours['monday'].push(monday); 
                  hours['saturday'] = saturday;
                }
            }
        }
        if( e.target.name === "satofield" ){
            if(e.target.value != '' || e.target.value != null ){
                if(this.state.saturday){
                    saturday.endTime = e.target.value;
                   // hours['monday'].push(monday);
                   hours['saturday'] = saturday; 
                }              
            }
        }//saturday
        if( e.target.name === "tufromfield" ){
            if(e.target.value != '' || e.target.value != null ){
                if(this.state.sunday){
                    sunday.startTime = e.target.value;
                  //  hours['monday'].push(monday); 
                  hours['sunday'] = sunday;
                }
            }
        }
        if( e.target.name === "tutofield" ){
            if(e.target.value != '' || e.target.value != null ){
                if(this.state.sunday){
                    sunday.endTime = e.target.value;
                   // hours['monday'].push(monday);
                   hours['sunday'] = sunday; 
                }              
            }
        } //sunday                                        
        
    }

    componentWillReceiveProps = (nxtprops) => {
        let hours = [];
        let data = nxtprops.store || {};
        if(Object.keys(data).length == 0){
            this.setState({ uploadImage : true });
        } else {  
            let storeid = data.id || null;
            localStorage.setItem('storeid', storeid);
            this.setState({
            action: 'edit',
            file: data.image,
            uploadImage : false, 
            namefield:data.shop_name || null,
            storename:data.shop_name || null,
            tagline:data.tagline || null,
            storedescription: data.description || null,
            storeurl:data.store_url || null,
            addressone:data.addressone || null,
            addresstwo:data.addresstwo || null,
            state:data.state || null,
            city:data.city || null,
            image:data.image || null,
            phonenumber:data.phonenumber || null,
            postalcode:data.zipcode || null,
            zonefield:data.timezone || null,
            workinghours:data.workinghours || null,
            store_id:data.id || null
            }) 
            if(data && data.category && data.category.length > 0){
                this.setState({business_type: data.category[0].id});
            }    
            if(data.description){
                document.querySelector(".storetextfield").value = data.description;
            }
            if(data.workinghours){
                let wrkhour = JSON.parse(data.workinghours);
                    if(wrkhour.monday){
                        document.querySelector('.mondaycheckfield').checked = true;
                        this.setState({
                            monday:true,
                            mstarttime: wrkhour.monday.startTime,
                            mendttime: wrkhour.monday.endTime
                        }); 
                    }
                    if(wrkhour.tuesday){
                        document.querySelector('.tuesdaycheckfield').checked = true;
                        this.setState({
                            tuesday:true, 
                            tustarttime: wrkhour.tuesday.startTime,
                            tuendttime: wrkhour.tuesday.endTime
                        }); 
                    }
                    if(wrkhour.wednesday){
                        console.log("wed", wrkhour.wednesday)
                        document.querySelector('.wednesdaycheckfield').checked = true;
                        this.setState({
                            wednesday:true,
                            wedstarttime: wrkhour.wednesday.startTime,
                            wedendttime: wrkhour.wednesday.endTime
                        }); 
                    }
                    if(wrkhour.thursday){
                        document.querySelector('.thursdaycheckfield').checked = true;
                        this.setState({
                            thursday:true,
                            thstarttime: wrkhour.thursday.startTime,
                            thendttime: wrkhour.thursday.endTime
                        }); 
                    }
                    if(wrkhour.friday){
                        document.querySelector('.fridaycheckfield').checked = true;
                        this.setState({
                            friday:true,
                            fstarttime: wrkhour.friday.startTime,
                            fendttime: wrkhour.friday.endTime
                        }); 
                    }
                    if(wrkhour.saturday){
                        document.querySelector('.saturdaycheckfield').checked = true;
                        this.setState({
                            saturday:true,
                            sastarttime: wrkhour.saturday.startTime,
                            saendtime: wrkhour.saturday.endTime
                        }); 
                    }
                    if(wrkhour.sunday){
                        document.querySelector('.sundaycheckfield').checked = true;
                        this.setState({
                            sunday:true,
                            sustarttime: wrkhour.sunday.startTime,
                            suendttime: wrkhour.sunday.endTime
                        }); 
                    }                                                            
                    
            }
        }     
    
    }
    mouseEnter = () => {
        this.setState({ isMouseInside: true });
    }

    mouseLeave = () => {
        this.setState({ isMouseInside: false });
    }
    deleteImage = (e) => {
        if(e) 
            this.setState({ image: null, isMouseInside: false, uploadImage: true });
    }

    showSuccess = () => {
        const toastrOptions = {
            timeOut: 2000,
            onHideComplete: () => {
                window.location.reload();
            },
        } 
         if(this.props.storeadd){
            this.props.changeStoreStatus('addStore'); 
            let loggedUser = JSON.parse(localStorage.getItem('acc'));
            this.props.getStore(loggedUser.userid);              
            toastr.success('Save Business Profile', 'Success', toastrOptions)
         }
  
        if(this.props.storeedit){
          this.props.changeStoreStatus('editStore');   
          let loggedUser = JSON.parse(localStorage.getItem('acc'));
          this.props.getStore(loggedUser.userid);            
          toastr.success('Edit Business Profile', 'Success', toastrOptions)
        }
    }

    showFailure = () => {
         if(this.props.addstorerror){
            let loggedUser = JSON.parse(localStorage.getItem('acc'));
            this.props.getStore(loggedUser.userid);            
            this.props.changeStoreStatus('addStoreError');   
           toastr.error('Error');
         }
  
        if(this.props.editstorerror){
            
            this.props.changeStoreStatus('editStoreError');
            toastr.error('Error');
        }
    }   



    render() { 
        this.showSuccess();
        this.showFailure();
        return ( 
                <Fragment>
                <div className="pagetitle">
                    <div className="titleicon">
                         <i class="fa fa-briefcase fa-2x fonticon" aria-hidden="true"></i>
                    </div>
                    <div className="titletext">
                        Business Profile 
                    </div>
                </div>
                <div className="clearboth"></div>
        
                <div className="bulkuploadform">
                
                <div className="bulkuploadtitle">
                    Add your Business name, logo, tagline, description and Website
                </div>
              
                <form onSubmit={this.onFormSubmit}>
                <div className="bulkinput">
                    <div className="bulkuploadfield">
                    {this.state.uploadImage ?
                        <div className="uploadimage">
                            <p>Add Image</p>        
                            <div class="choose_file">
                                <span><Icon.Upload  color="blue" size={100} /></span>
                            </div>   
                            <input type="file" name="storeimagefield"  onChange={(e)=>{this.handleChange(e)}}/>
                            <p className="uploadFilename">{this.state.storeimagename ? this.state.storeimagename : ''}</p> 
                        </div>
                        : '' }
                        <div className="imageThumbnail" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} style={{ display: this.state.image ? '' : 'none'}}>
                            {this.state.isMouseInside ? <p className="closeImage"  onClick={this.deleteImage}><i class="fa fa-times" aria-hidden="true"></i></p> : '' }
                            <img src={this.state.image}/> 
                        </div>                         
                    </div>
        
                <div className="productformctrl">
                    <div className="addproductfieldinfo">
                        <div className="productnamegroup inputgroup">
                            <input type="text" name="namefield" className="namefield producttxtfield" onChange={(e)=>{this.setValue(e)}} onBlur={(e)=>{this.handleChange(e)}} placeholder="Business Name" value={this.state.namefield ? this.state.namefield : ''} />
                            <div className="errmsg">{this.state.namefielderror ? this.state.namefieldmsg : ''}</div> 
                        </div>
                        <div className="productnamegroup inputgroup">
                            <input type="text" name="tagline" className="tagline producttxtfield" onChange={(e)=>{this.setValue(e)}} onBlur={(e)=>{this.handleChange(e)}} placeholder="Tagline" value = {this.state.tagline ? this.state.tagline : ''}/>
                            <div className="errmsg">{this.state.taglineerror ? this.state.taglinemsg : ''}</div> 
                        </div>                        
                        <div className="producttextgroup inputgroup">
                            {/* <input type="text" name="producttextfield" onChange={(e)=>{this.handleChange(e)}}  onBlur={(e)=>{this.handleChange(e)}} className="producttextfield producttxtfield" placeholder="Describe your product" /> */}
                            <textarea name="storetextfield"  className="storetextfield producttxtfield" onChange={(e)=>{this.setValue(e)}} onBlur={(e)=>{this.handleChange(e)}} placeholder="Describe your company in 500 character or less" ></textarea>
                            <div className="errmsg">{this.state.storetextfielderror ? this.state.storetextfieldmsg : ''}</div> 
                        </div>
                    </div>
                </div>
                <div className="clearboth" ></div>
                <div className="bottominputs">
                    <div className="productnamegroup inputgroup">
                        <input type="text" name="storeurlfield" className="storeurlfield producttxtfield"  onChange={(e)=>{this.setValue(e)}} onBlur={(e)=>{this.handleChange(e)}} placeholder="Enter Store URL http://" value = {this.state.storeurl ? this.state.storeurl : ''} />
                        <div className="errmsg">{this.state.storeurlfielderror ? this.state.storeurlfieldmsg : ''}</div> 
                    </div>
                </div>
                <div className="clearboth"></div>
                <div className="groupcell">
                    <p className="storetitle">What You sell?</p>
                    <div className="productnamegroup inputgroup storecategory">
                    { this.state.business_type ? this.listCategories(Number(this.state.business_type)): '' }
                    { !this.state.business_type ? this.listCategories() : '' }
                        {/* <select name="categoryfield" className="categoryfield">
                            <option>Select Your Business Type</option>
                        </select> */}
                        <div className="errmsg">{this.state.business_typefielderror ? this.state.business_typefieldmsg : ''}</div> 
                    </div>
                </div>
                <div className="clearboth"></div>
                <div className="location">
                    <p  className="storetitle">Add Your Location: </p>
                    <div className="locationone">  
                        <div className="adressonegrp inputgroup">
                            <input type="text" name="adressonefield" className="adressonefield"  onChange={(e)=>{this.setValue(e)}} onBlur={(e)=>{this.handleChange(e)}}  placeholder="Address line 1" value = {this.state.addressone ? this.state.addressone : ''} />
                            <div className="errmsg">{this.state.addressonefielderror ? this.state.addressonefieldmsg : ''}</div> 
                        </div>
                        <div className="citygrp inputgroup">
                            <input type="text" name="cityfield" className="cityfield"  onChange={(e)=>{this.setValue(e)}} onBlur={(e)=>{this.handleChange(e)}} placeholder="City" value = {this.state.city ? this.state.city : ''} />                        
                            <div className="errmsg">{this.state.cityfielderror ? this.state.cityfieldmsg : ''}</div> 
                        </div>
                    </div>
                    <div className="clearboth"></div>
                    <div className="locationtwo">  
                        <div className="adresstwogrp inputgroup">
                            <input type="text" name="adresstwofield" className="adresstwofield" onChange={(e)=>{this.setValue(e)}} onBlur={(e)=>{this.handleChange(e)}} placeholder="Address line 2 (optional)" value = {this.state.addresstwo ? this.state.addresstwo : ''}/>
                            <div className="errmsg"></div> 
                        </div>
                        <div className="stategrp inputgroup">
                            <select name="statefield" className="statefield"  onChange={(e)=>{this.handleChange(e)}} >
                            <option value="">Select State</option>
                            { this.renderState() }
                            </select>
                            <div className="errmsg">{this.state.statefielderror ? this.state.statefieldmsg : ''}</div> 
                        </div>
                    </div>
                    <div className="clearboth"></div>
                    <div className="locationthree">  
                        <div className="phonenogrp inputgroup">
                            <input type="text" name="phonenofield" className="phonenofield"   onChange={(e)=>{this.setValue(e)}} onBlur={(e)=>{this.handleChange(e)}}  placeholder="Phone number" value = {this.state.phonenumber ? this.state.phonenumber : ''} />
                            <div className="errmsg">{this.state.phonefielderror ? this.state.phonefieldmsg : ''}</div> 
                        </div>
                        <div className="postalcodegrp inputgroup">
                            <input type="text" name="postalcodefield" maxlength="6" className="postalcodefield"  onChange={(e)=>{this.setValue(e)}}  onBlur={(e)=>{this.handleChange(e)}}  placeholder="Postal Code" value = {this.state.postalcode ? this.state.postalcode : ''} />
                            <div className="errmsg">{this.state.postalcodefielderror ? this.state.postalcodefieldmsg : ''}</div> 
                        </div> 
                    </div>                    
                </div>   
                <div className="clearboth"></div>
                <div className="regioncell">
                    <p  className="storetitle" >Business Hour:</p>
                    <div className="zonefieldgrp inputgroup">
                            <select name="zonefield" className="zonefield" onChange={(e)=>{this.handleChange(e)}} >
                            <option value="">Select Time Zone</option>
                           { this.renderTimeZone() }
                            </select>
                        <div className="errmsg">{this.state.zonefielderror ? this.state.zonefieldmsg : ''}</div> 
                    </div>
                </div>
                <div className="clearboth"></div>
                <div className="hourcell">
                    <div className="mondayrow">
                            <span className="monday day">
                            <input type="checkbox" className="mondaycheckfield" onChange={(e)=>{this.handleCheckbox(e)}} name="mondaycheckfield" value={1}/>
                            <label for="mondaycheckfield" style={ !this.state.monday ? { color: '#d5d5d5'}: { color: '#626262'} }> Monday</label>
                            </span>
                            <select name="mfromfield" ref="mfromfield" onChange={(e)=>{this.handleHours(e)}} style={ !this.state.monday ? { color: '#d5d5d5'}: { color: '#626262'} } disabled = { !this.state.monday ? true: false } className="mfromfield dayfromfield">
                            <option></option>
                            { this.state.mstarttime ? this.renderTimes(this.state.mstarttime) : this.renderTimes(null) }
                            </select>
                            <select name="mtofield"  ref="mtofield" onChange={(e)=>{this.handleHours(e)}}  style={ !this.state.monday ? { color: '#d5d5d5'}: { color: '#626262'} } disabled = { !this.state.monday ? true: false }  className="mtofield daytofield ">
                            <option></option>
                            { this.state.mendttime ? this.renderTimes(this.state.mendttime) : this.renderTimes(null) }
                            </select>                            
                        <div className="errmsg"></div> 
                    </div>
                    <div className="tuesdayrow ">
                            <span className="tuesday day">
                            <input type="checkbox" className="tuesdaycheckfield" onChange={(e)=>{this.handleCheckbox(e)}} name="tuesdaycheckfield"  />
                            <label for="tuesdaycheckfield"  style={ !this.state.tuesday ? { color: '#d5d5d5'}: { color: '#626262'} } >Tuesday</label>
                            </span>
                            <select name="tufromfield" onChange={(e)=>{this.handleHours(e)}} style={ !this.state.tuesday ? { color: '#d5d5d5'}: { color: '#626262'} } disabled = { !this.state.tuesday ? true: false }  className="tufromfield dayfromfield">
                            <option></option>
                            { this.state.tustarttime ? this.renderTimes(this.state.tustarttime) : this.renderTimes(null) }
                            </select>
                            <select name="tutofield"  onChange={(e)=>{this.handleHours(e)}} style={ !this.state.tuesday ? { color: '#d5d5d5'}: { color: '#626262'} } disabled = { !this.state.tuesday ? true: false }  className="tutofield daytofield">
                            <option></option>
                            { this.state.tuendttime ? this.renderTimes(this.state.tuendttime) : this.renderTimes(null) }
                            </select>                            
                        <div className="errmsg"></div> 
                    </div>
                    <div className="wednesdayrow ">
                            <span className="wednesday day">
                            <input type="checkbox" className="wednesdaycheckfield" onChange={(e)=>{this.handleCheckbox(e)}} name="wednesdaycheckfield"  />
                            <label for="wednesdaycheckfield" style={ !this.state.wednesday ? { color: '#d5d5d5'}: { color: '#626262'} }>Wednesday</label>
                            </span>
                            <select name="wedfromfield" onChange={(e)=>{this.handleHours(e)}} style={ !this.state.wednesday ? { color: '#d5d5d5'}: { color: '#626262'} } disabled = { !this.state.wednesday ? true: false } className="wedfromfield dayfromfield">
                            <option></option>
                            { this.state.wedstarttime ? this.renderTimes(this.state.wedstarttime) : this.renderTimes(null) }
                            </select>
                            <select name="wedtofield" onChange={(e)=>{this.handleHours(e)}} style={ !this.state.wednesday ? { color: '#d5d5d5'}: { color: '#626262'} } disabled = { !this.state.wednesday ? true: false } className="wedtofield daytofield">
                            <option></option>
                            { this.state.wedendttime ? this.renderTimes(this.state.wedendttime) : this.renderTimes(null) }
                            </select>                            
                        <div className="errmsg"></div> 
                    </div> 
                    <div className="thursdayrow ">
                            <span className="thursday day">
                            <input type="checkbox" className="thursdaycheckfield" onChange={(e)=>{this.handleCheckbox(e)}} name="thursdaycheckfield"  />
                            <label for="thursdaycheckfield" style={ !this.state.thursday ? { color: '#d5d5d5'}: { color: '#626262'} }>Thursday</label>
                            </span>
                            <select name="thfromfield" onChange={(e)=>{this.handleHours(e)}} style={ !this.state.thursday ? { color: '#d5d5d5'}: { color: '#626262'} } disabled = { !this.state.thursday ? true: false }  className="thfromfield dayfromfield">
                            <option></option>
                            { this.state.thstarttime ? this.renderTimes(this.state.thstarttime) : this.renderTimes(null) }
                            </select>
                            <select name="thtofield" onChange={(e)=>{this.handleHours(e)}} style={ !this.state.thursday ? { color: '#d5d5d5'}: { color: '#626262'} } disabled = { !this.state.thursday ? true: false }  className="thtofield daytofield">
                            <option></option>
                            { this.state.thendttime ? this.renderTimes(this.state.thendttime) : this.renderTimes(null) }
                            </select>                            
                        <div className="errmsg"></div> 
                    </div>
                    <div className="fridayrow ">
                            <span className="friday day">
                            <input type="checkbox" className="fridaycheckfield" onChange={(e)=>{this.handleCheckbox(e)}} name="fridaycheckfield"  />
                            <label for="fridaycheckfield"  style={ !this.state.friday ? { color: '#d5d5d5'}: { color: '#626262'} }>Friday</label>
                            </span>
                            <select name="ffromfield" onChange={(e)=>{this.handleHours(e)}} style={ !this.state.friday ? { color: '#d5d5d5'}: { color: '#626262'} } disabled = { !this.state.friday ? true: false } className="ffromfield dayfromfield">
                            <option></option>
                            { this.state.fstarttime ? this.renderTimes(this.state.fstarttime) : this.renderTimes(null) }
                            </select>
                            <select name="ftofield" onChange={(e)=>{this.handleHours(e)}} style={ !this.state.friday ? { color: '#d5d5d5'}: { color: '#626262'} } disabled = { !this.state.friday ? true: false } className="ftofield daytofield">
                            <option></option>
                            { this.state.fendttime ? this.renderTimes(this.state.fendttime) : this.renderTimes(null) }
                            </select>                            
                        <div className="errmsg"></div> 
                    </div>                                                                                 
 
                <div className="saturdayrow ">
                            <span className="saturday day">
                            <input type="checkbox" className="saturdaycheckfield" onChange={(e)=>{this.handleCheckbox(e)}} name="saturdaycheckfield"  />
                            <label for="saturdaycheckfield" style={ !this.state.saturday ? { color: '#d5d5d5'}: { color: '#626262'} } >Saturday</label>
                            </span>
                            <select name="safromfield" onChange={(e)=>{this.handleHours(e)}} style={ !this.state.saturday ? { color: '#d5d5d5'}: { color: '#626262'} } disabled = { !this.state.saturday ? true: false } className="safromfield dayfromfield">
                            <option></option>
                            { this.state.sastarttime ? this.renderTimes(this.state.sastarttime) : this.renderTimes(null) }
                            </select>
                            <select name="satofield" onChange={(e)=>{this.handleHours(e)}} style={ !this.state.saturday ? { color: '#d5d5d5'}: { color: '#626262'} } disabled = { !this.state.saturday ? true: false } className="satofield daytofield">
                            <option></option>
                            { this.state.saendtime ? this.renderTimes(this.state.saendtime) : this.renderTimes(null) }
                            </select>                            
                        <div className="errmsg"></div> 
                </div> 

                <div className="sundayrow ">
                            <span className="sunday day">
                            <input type="checkbox" className="sundaycheckfield" onChange={(e)=>{this.handleCheckbox(e)}} name="sundaycheckfield"  />
                            <label for="sundaycheckfield" style={ !this.state.sunday ? { color: '#d5d5d5'}: { color: '#626262'} } >Sunday</label>
                            </span>
                            <select name="sufromfield" onChange={(e)=>{this.handleHours(e)}} style={ !this.state.sunday ? { color: '#d5d5d5'}: { color: '#626262'} } disabled = { !this.state.sunday ? true: false } className="sufromfield dayfromfield">
                            <option></option>
                            { this.state.sustarttime ? this.renderTimes(this.state.sustarttime) : this.renderTimes(null) }
                            </select>
                            <select name="sutofield" onChange={(e)=>{this.handleHours(e)}} style={ !this.state.sunday ? { color: '#d5d5d5'}: { color: '#626262'} } disabled = { !this.state.sunday ? true: false } className="sutofield daytofield">
                            <option></option>
                            { this.state.suendttime ? this.renderTimes(this.state.suendttime) : this.renderTimes(null) }
                            </select>                            
                        <div className="errmsg"></div> 
                </div> 
                </div>
                <div className="clearboth" ></div>
                <div className="storesubmitField">
                    <button type="submit" className="storesubmit" >Save</button>
                    <div className="processmsg"></div>
                    <div className="submiterr errmsg">
                    {this.state.storefileerror ? this.state.storefileerror : ''}
                    </div> 
                </div> 

                </div>
              </form>
            </div>
            </Fragment> 

         );
    }
}
 
function mapStateToProps(state) {
    return {
            categories: state.categories.data,
            store: state.store.data,
            getstorerror: state.store.getstorerror,
            storeadd: state.store.add,
            addstorerror: state.store.addstorerror,
            storeedit: state.store.edit,
            editstorerror: state.store.editstorerror            

        };
}


export default connect(mapStateToProps, { getCategories, addStore, getStore, editStore, changeStoreStatus})(Store);