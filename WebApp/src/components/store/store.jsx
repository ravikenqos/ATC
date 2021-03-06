import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as Icon from 'react-feather';
import {withRouter} from "react-router-dom";

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

let psthours = true;
class Store extends Component {
    componentWillMount(){
        this.props.getCategories();
        let loggedUser = JSON.parse(localStorage.getItem('acc'));
       if(loggedUser.userid){
            this.props.getStore(loggedUser.userid);
       }

       if(!loggedUser.storeid){
        this.state = {
            monday:true,
            tuesday:true,
            wednesday:true,
            thursday:true,
            friday:true,
            saturday:true,
            sunday:true,
        }            
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
            neighbourhood:null,
            zonefield:null,
            workinghours:null,
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
                storefileerror: "Please upload logo",
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
                namefieldmsg:"Please enter a business name",
                isError: true
            });     
        }else {
            if(this.state.namefield.length < 6 ){
                this.setState({
                    namefielderror:true,
                    namefieldmsg:"Please enter name more than six character",
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
            if(this.state.tagline.length < 10 ){
                this.setState({
                    taglineerror:true,
                    taglinemsg:"Please add 10 or more characters",
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
                business_typefieldmsg:"Please select a business category",
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
                phonefieldmsg:"Please enter phone number",
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
                postalcodefieldmsg:"Please enter zip code",
                isError: true
            });         
        } else {
            this.setState({
                postalcodefielderror:false,
                postalcodefieldmsg:'',
                isError: false
            }); 
        }  

        if(!this.state.neighbourhood){
            this.setState({
                neighbourhooderror:true,
                neighbourhoodmsg:"Please select any neighbourhood",
                isError: true
            });         
        } else {
            this.setState({
                neighbourhooderror:false,
                neighbourhoodmsg:"",
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
    
            if(hours.monday === null && hours.tuesday === null && hours.wednesday === null && hours.thursday === null
                && hours.friday === null && hours.saturday === null && hours.sunday === null){
                    this.setState({
                        workinghourserr:"Please select any working hour",
                    })
                    psthours = false;
            } else {
                this.setState({
                    workinghourserr:"",
                })
                psthours = true;                
            }           


        if(this.state.file && this.state.namefield && this.state.tagline && this.state.storedescription && this.state.storeurl
           && this.state.business_type && this.state.addressone && this.state.state && this.state.city && this.state.phonenumber 
           && this.state.postalcode && psthours  && this.state.neighbourhood){
   
            const formData = new FormData();
             let loggedUser = JSON.parse(localStorage.getItem('acc'));
             let action = (!loggedUser.storeid) ? "add" : "edit"
            formData.append('user_id', loggedUser.userid);
            formData.append('name',this.state.namefield);
            formData.append('tagline',this.state.tagline);
            formData.append('description',this.state.storedescription);
            formData.append('storeurl', this.state.storeurl);
            formData.append('addressone',this.state.addressone);
            let addressstwo = (!this.state.addresstwo) ? null : this.state.addresstwo;
            formData.append('addresstwo',addressstwo);
            formData.append('state',this.state.state);
            formData.append('city',this.state.city);
            formData.append('phonenumber',this.state.phonenumber);
            formData.append('postalcode',this.state.postalcode);
            formData.append('neighbourhood',this.state.neighbourhood);        
            formData.append('timezone',"pacific state zone");
            // formData.append('timezone',this.state.zonefield);
            formData.append('workinghours',JSON.stringify(hours));
            console.log(action);
            if(action === 'add'){
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

        } else {
            toastr.error("Error", 'Please correct errors');
        }
    } 

    handleChange(e) {
        let target = e.target;
        if(target.name === 'storeimagefield'){
            let fileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if(fileTypes.indexOf(target.files[0].type) < 0)  {
                this.setState({
                    storefileerror: "Please upload logo",
                    storeimagename:target.files[0].name,
                    file: null,
                    isError: false
                });             
            } else if(target.files[0]){
                let reader = new FileReader();
                reader.onload = (e) => {
                    document.querySelector('.storeImgSrc').src = e.target.result;
                }
                reader.readAsDataURL(target.files[0]);
                document.querySelector('.addlogotxt').style.opacity = 0;
                document.querySelector('.choose_file').style.opacity = 0;
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
                        namefieldmsg:"Please enter name more than six character",
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
                if(target.value.length < 10 ){
                    this.setState({
                        taglineerror:true,
                        taglinemsg:"Please add 10 or more characters",
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
                        postalcodefieldmsg:"Please enter zip code",
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
        if(target.name === "neighbourhoodfield"){
            if(target.value != '' || target.value != null ){
                this.setState({
                    neighbourhooderror:false,
                    neighbourhoodmsg:'',
                    neighbourhood: target.value,
                    isError: false
                }); 

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
            console.log("addresstwo:", target.value)
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

        var x = 60;
        var times = [];
        var tt = 0; 
        var ap = ['AM', 'PM']; 
        
        for (var i=0;tt<24*60; i++) {
          var hh = Math.floor(tt/60);
          var mm = (tt%60); 
          let instime = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)]
          if(instime === '00:00AM'){
              instime = '12:00AM';
          }
          if(instime === '00:00PM'){
            instime = '12:00PM';
          }          
          times.push(<option selected = { time == instime ? true : false } value={instime}>{instime}</option> ) 
          tt = tt + x;
        }
        
        return times;
        
    }
    
    renTimes = () =>{
        var x = 60; //minutes interval
        var times = []; // time array
        var tt = 0; // start time
        var ap = ['AM', 'PM']; // AM-PM
        
        //loop to increment the time and push results in array
        for (var i=0;tt<24*60; i++) {
          var hh = Math.floor(tt/60); // getting hours of day in 0-24 format
          var mm = (tt%60); // getting minutes of the hour in 0-55 format
          times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]

          tt = tt + x;
        }
         console.log("renderTimes", times);
       
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
            return false;
        } else {
            return true;
        }         
    }
    renderNeighbourhood = (neighbour = null) => {
        let neighbourhood = [];
        let data = ["Ballard", "Belltown", "Capitol Hill", "Downtown", "Fremont", "Magnolia", "Phinney Ridge",  "Queen Anne",  "Wallingford", "West Seattle" ]
        data.forEach((item) =>{
                neighbourhood.push(<option  selected = { neighbour == item ? true : false } value={item}>{item}</option>)
        });
        return neighbourhood;
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
            neighbourhood:data.neighbourhood || null,
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
                    } else {
                        this.setState({
                            monday:false, 
                        });                       
                    }
                    if(wrkhour.tuesday){
                        document.querySelector('.tuesdaycheckfield').checked = true;
                        this.setState({
                            tuesday:true, 
                            tustarttime: wrkhour.tuesday.startTime,
                            tuendttime: wrkhour.tuesday.endTime
                        }); 
                    } else {
                        this.setState({
                            tuesday:false, 
                        });                       
                    }
                    if(wrkhour.wednesday){
                        document.querySelector('.wednesdaycheckfield').checked = true;
                        this.setState({
                            wednesday:true,
                            wedstarttime: wrkhour.wednesday.startTime,
                            wedendttime: wrkhour.wednesday.endTime
                        }); 
                    } else {
                        this.setState({
                            wednesday:false, 
                        });                       
                    }
                    if(wrkhour.thursday){
                        document.querySelector('.thursdaycheckfield').checked = true;
                        this.setState({
                            thursday:true,
                            thstarttime: wrkhour.thursday.startTime,
                            thendttime: wrkhour.thursday.endTime
                        }); 
                    } else {
                        this.setState({
                            thursday:false, 
                        });                       
                    }
                    if(wrkhour.friday){
                        document.querySelector('.fridaycheckfield').checked = true;
                        this.setState({
                            friday:true,
                            fstarttime: wrkhour.friday.startTime,
                            fendttime: wrkhour.friday.endTime
                        }); 
                    } else {
                        this.setState({
                            friday:false, 
                        });                       
                    }
                    if(wrkhour.saturday){
                        document.querySelector('.saturdaycheckfield').checked = true;
                        this.setState({
                            saturday:true,
                            sastarttime: wrkhour.saturday.startTime,
                            saendtime: wrkhour.saturday.endTime
                        }); 
                    } else {
                        this.setState({
                            saturday:false, 
                        });                       
                    }
                    if(wrkhour.sunday){
                        document.querySelector('.sundaycheckfield').checked = true;
                        this.setState({
                            sunday:true,
                            sustarttime: wrkhour.sunday.startTime,
                            suendttime: wrkhour.sunday.endTime
                        }); 
                    } else {
                        this.setState({
                            sunday:false, 
                        });                       
                    }                                                            
                    
            }
        }     
    
    }
 
    componentDidUpdate = () => {
        let loggedUser = JSON.parse(localStorage.getItem('acc'));
        if(!loggedUser.storeid) {
            if(this.state.monday){
                document.querySelector('.mondaycheckfield').checked = true;
            }
            if(this.state.tuesday){
                document.querySelector('.tuesdaycheckfield').checked = true;
            }
            if(this.state.wednesday){
                document.querySelector('.wednesdaycheckfield').checked = true;
            }
            if(this.state.thursday){
                document.querySelector('.thursdaycheckfield').checked = true;
            }
            if(this.state.friday){
                document.querySelector('.fridaycheckfield').checked = true;
            }
            if(this.state.saturday){
                document.querySelector('.saturdaycheckfield').checked = true;
            }
            if(this.state.sunday){
                document.querySelector('.sundaycheckfield').checked = true;

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
               // window.location.reload();
               //this.props.history.push("/dashboard");
               window.location.href = "/dashboard";
            },
        } 
         if(this.props.storeadd){
            this.props.changeStoreStatus('addStore'); 
            let loggedUser = JSON.parse(localStorage.getItem('acc'));
            this.props.getStore(loggedUser.userid);              
            toastr.success('Business profile successfully added', 'Success', toastrOptions)
         }
  
        if(this.props.storeedit){
          this.props.changeStoreStatus('editStore');   
          let loggedUser = JSON.parse(localStorage.getItem('acc'));
          this.props.getStore(loggedUser.userid);            
          toastr.success('Business profile successfully updated', 'Success', toastrOptions)
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
        
                <div className="bulkuploadform storeform">
                
                <div className="bulkuploadtitle">
                    Business information
                </div>
              
                <form onSubmit={this.onFormSubmit}>
                <div className="bulkinput storeinput">
                    <div className="bulkuploadfield">
                    {this.state.uploadImage ?
                       <Fragment>
                        <div className="uploadimage">
                                   
                            <div class="choose_file">
                               <p className="addlogotxt">Add Logo</p> 
                                <span><Icon.Upload  color="blue" size={100} /></span>
                            </div>   
                            <input type="file" name="storeimagefield"  onChange={(e)=>{this.handleChange(e)}}/>
                            <div className="previewThumbnail" style={{position: "absolute"}}>
                                <img src="" className="storeImgSrc" style={{maxWidth: "100%", height: "auto"}} /> 
                            </div> 

                        </div>
                       
                            <p className="uploadFilename">{this.state.storeimagename ? this.state.storeimagename : ''}</p>
                            <div  className="errmsg">{this.state.storefileerror ? this.state.storefileerror : ''}</div> 
                            </Fragment>
                        : '' }
                        <div className="imageThumbnail" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} style={{ display: this.state.image ? '' : 'none'}}>
                            {this.state.isMouseInside ? <p className="closeImage"  onClick={this.deleteImage}><i class="fa fa-times fa-2x" style={{color:"black"}}aria-hidden="true"></i></p> : '' }
                            <img src={this.state.image} className="storeImgSrc" style={{maxWidth: "100%", height: "auto"}}/> 
                        </div>                         
                    </div>
        
                <div className="productformctrl">
                    <div className="addproductfieldinfo">
                        <div className="productnamegroup inputgroup">
                            <input type="text" name="namefield" className="namefield producttxtfield" onChange={(e)=>{this.setValue(e)}} onBlur={(e)=>{this.handleChange(e)}} placeholder="Business Name" value={this.state.namefield ? this.state.namefield : ''} />
                            <div className="errmsg">{this.state.namefielderror ? this.state.namefieldmsg : ''}</div> 
                        </div>
                        <div className="productnamegroup inputgroup">
                            <input type="text" name="tagline" className="tagline producttxtfield" onChange={(e)=>{this.setValue(e)}} onBlur={(e)=>{this.handleChange(e)}} placeholder="Tagline (10-60 characters)" value = {this.state.tagline ? this.state.tagline : ''}/>
                            <div className="errmsg">{this.state.taglineerror ? this.state.taglinemsg : ''}</div> 
                        </div>                        
                        <div className="producttextgroup inputgroup">
                            {/* <input type="text" name="producttextfield" onChange={(e)=>{this.handleChange(e)}}  onBlur={(e)=>{this.handleChange(e)}} className="producttextfield producttxtfield" placeholder="Describe your product" /> */}
                            <textarea name="storetextfield"  className="storetextfield producttxtfield" onChange={(e)=>{this.setValue(e)}} onBlur={(e)=>{this.handleChange(e)}} placeholder="Enter a description (100-500 characters)" ></textarea>
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
                    <p className="storetitle">Business category</p>
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
                    <p  className="storetitle">Location: </p>
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
                            <input type="text" name="adresstwofield" className="adresstwofield" onChange={(e)=>{this.setValue(e)}} onBlur={(e)=>{this.handleChange(e)}} placeholder="Address line 2 (optional)" value = {(this.state.addresstwo != "null" && this.state.addresstwo) ? this.state.addresstwo : ''}/>
                            <div className="errmsg"></div> 
                        </div>
                        <div className="stategrp inputgroup">
                            <select name="statefield" className="statefield"  onChange={(e)=>{this.handleChange(e)}} >
                            <option value="">State</option>
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
                <div className="neighbourhoodcell">
                   
                    <div className="neighbourhoodfieldgrp inputgroup">
                            <select name="neighbourhoodfield" className="neighbourhood producttxtfield" onChange={(e)=>{this.handleChange(e)}} >
                                <option value="">Select a neighborhood</option>
                                { this.state.neighbourhood ? this.renderNeighbourhood(this.state.neighbourhood) : this.renderNeighbourhood() }                            
                            </select> 
                            
                        <div className="errmsg">{this.state.neighbourhooderror ? this.state.neighbourhoodmsg : ''}</div> 
                    </div>
                </div>                 
                <div className="clearboth"></div>
                <div className="regioncell">
                    <p  className="storetitle" >Store hours:</p>
                    <div className="zonefieldgrp inputgroup">
                            {/* <select name="zonefield" className="zonefield" onChange={(e)=>{this.handleChange(e)}} >
                            <option value="pacific state zone">Pacific Time Zone</option>
                           { this.renderTimeZone() }
                            </select> */}
                            {/* <p  className="storetitle" >Time in PST</p>
                        <div className="errmsg">{this.state.zonefielderror ? this.state.zonefieldmsg : ''}</div>  */}
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
                            { this.state.mstarttime ? this.renderTimes(this.state.mstarttime) : this.renderTimes("09:00AM") }
                            </select>
                            <select name="mtofield"  ref="mtofield" onChange={(e)=>{this.handleHours(e)}}  style={ !this.state.monday ? { color: '#d5d5d5'}: { color: '#626262'} } disabled = { !this.state.monday ? true: false }  className="mtofield daytofield ">
                            { this.state.mendttime ? this.renderTimes(this.state.mendttime) : this.renderTimes("05:00PM") }
                            </select>                            
                        <div className="errmsg"></div> 
                    </div>
                    <div className="tuesdayrow ">
                            <span className="tuesday day">
                            <input type="checkbox" className="tuesdaycheckfield" onChange={(e)=>{this.handleCheckbox(e)}} name="tuesdaycheckfield"  />
                            <label for="tuesdaycheckfield"  style={ !this.state.tuesday ? { color: '#d5d5d5'}: { color: '#626262'} } >Tuesday</label>
                            </span>
                            <select name="tufromfield" onChange={(e)=>{this.handleHours(e)}} style={ !this.state.tuesday ? { color: '#d5d5d5'}: { color: '#626262'} } disabled = { !this.state.tuesday ? true: false }  className="tufromfield dayfromfield">
                            { this.state.tustarttime ? this.renderTimes(this.state.tustarttime) : this.renderTimes("09:00AM") }
                            </select>
                            <select name="tutofield"  onChange={(e)=>{this.handleHours(e)}} style={ !this.state.tuesday ? { color: '#d5d5d5'}: { color: '#626262'} } disabled = { !this.state.tuesday ? true: false }  className="tutofield daytofield">
                            { this.state.tuendttime ? this.renderTimes(this.state.tuendttime) : this.renderTimes("05:00PM") }
                            </select>                            
                        <div className="errmsg"></div> 
                    </div>
                    <div className="wednesdayrow ">
                            <span className="wednesday day">
                            <input type="checkbox" className="wednesdaycheckfield" onChange={(e)=>{this.handleCheckbox(e)}} name="wednesdaycheckfield"  />
                            <label for="wednesdaycheckfield" style={ !this.state.wednesday ? { color: '#d5d5d5'}: { color: '#626262'} }>Wednesday</label>
                            </span>
                            <select name="wedfromfield" onChange={(e)=>{this.handleHours(e)}} style={ !this.state.wednesday ? { color: '#d5d5d5'}: { color: '#626262'} } disabled = { !this.state.wednesday ? true: false } className="wedfromfield dayfromfield">
                            { this.state.wedstarttime ? this.renderTimes(this.state.wedstarttime) : this.renderTimes("09:00AM") }
                            </select>
                            <select name="wedtofield" onChange={(e)=>{this.handleHours(e)}} style={ !this.state.wednesday ? { color: '#d5d5d5'}: { color: '#626262'} } disabled = { !this.state.wednesday ? true: false } className="wedtofield daytofield">
                            { this.state.wedendttime ? this.renderTimes(this.state.wedendttime) : this.renderTimes("05:00PM") }
                            </select>                            
                        <div className="errmsg"></div> 
                    </div> 
                    <div className="thursdayrow ">
                            <span className="thursday day">
                            <input type="checkbox" className="thursdaycheckfield" onChange={(e)=>{this.handleCheckbox(e)}} name="thursdaycheckfield"  />
                            <label for="thursdaycheckfield" style={ !this.state.thursday ? { color: '#d5d5d5'}: { color: '#626262'} }>Thursday</label>
                            </span>
                            <select name="thfromfield" onChange={(e)=>{this.handleHours(e)}} style={ !this.state.thursday ? { color: '#d5d5d5'}: { color: '#626262'} } disabled = { !this.state.thursday ? true: false }  className="thfromfield dayfromfield">
                            { this.state.thstarttime ? this.renderTimes(this.state.thstarttime) : this.renderTimes("09:00AM") }
                            </select>
                            <select name="thtofield" onChange={(e)=>{this.handleHours(e)}} style={ !this.state.thursday ? { color: '#d5d5d5'}: { color: '#626262'} } disabled = { !this.state.thursday ? true: false }  className="thtofield daytofield">
                            { this.state.thendttime ? this.renderTimes(this.state.thendttime) : this.renderTimes("05:00PM") }
                            </select>                            
                        <div className="errmsg"></div> 
                    </div>
                    <div className="fridayrow ">
                            <span className="friday day">
                            <input type="checkbox" className="fridaycheckfield" onChange={(e)=>{this.handleCheckbox(e)}} name="fridaycheckfield"  />
                            <label for="fridaycheckfield"  style={ !this.state.friday ? { color: '#d5d5d5'}: { color: '#626262'} }>Friday</label>
                            </span>
                            <select name="ffromfield" onChange={(e)=>{this.handleHours(e)}} style={ !this.state.friday ? { color: '#d5d5d5'}: { color: '#626262'} } disabled = { !this.state.friday ? true: false } className="ffromfield dayfromfield">
                            { this.state.fstarttime ? this.renderTimes(this.state.fstarttime) : this.renderTimes("09:00AM") }
                            </select>
                            <select name="ftofield" onChange={(e)=>{this.handleHours(e)}} style={ !this.state.friday ? { color: '#d5d5d5'}: { color: '#626262'} } disabled = { !this.state.friday ? true: false } className="ftofield daytofield">
                            { this.state.fendttime ? this.renderTimes(this.state.fendttime) : this.renderTimes("05:00PM") }
                            </select>                            
                        <div className="errmsg"></div> 
                    </div>                                                                                 
 
                <div className="saturdayrow ">
                            <span className="saturday day">
                            <input type="checkbox" className="saturdaycheckfield" onChange={(e)=>{this.handleCheckbox(e)}} name="saturdaycheckfield"  />
                            <label for="saturdaycheckfield" style={ !this.state.saturday ? { color: '#d5d5d5'}: { color: '#626262'} } >Saturday</label>
                            </span>
                            <select name="safromfield" onChange={(e)=>{this.handleHours(e)}} style={ !this.state.saturday ? { color: '#d5d5d5'}: { color: '#626262'} } disabled = { !this.state.saturday ? true: false } className="safromfield dayfromfield">
                            { this.state.sastarttime ? this.renderTimes(this.state.sastarttime) : this.renderTimes("09:00AM") }
                            </select>
                            <select name="satofield" onChange={(e)=>{this.handleHours(e)}} style={ !this.state.saturday ? { color: '#d5d5d5'}: { color: '#626262'} } disabled = { !this.state.saturday ? true: false } className="satofield daytofield">
                            { this.state.saendtime ? this.renderTimes(this.state.saendtime) : this.renderTimes("05:00PM") }
                            </select>                            
                        <div className="errmsg"></div> 
                </div> 

                <div className="sundayrow ">
                            <span className="sunday day">
                            <input type="checkbox" className="sundaycheckfield" onChange={(e)=>{this.handleCheckbox(e)}} name="sundaycheckfield"  />
                            <label for="sundaycheckfield" style={ !this.state.sunday ? { color: '#d5d5d5'}: { color: '#626262'} } >Sunday</label>
                            </span>
                            <select name="sufromfield" onChange={(e)=>{this.handleHours(e)}} style={ !this.state.sunday ? { color: '#d5d5d5'}: { color: '#626262'} } disabled = { !this.state.sunday ? true: false } className="sufromfield dayfromfield">
                            { this.state.sustarttime ? this.renderTimes(this.state.sustarttime) : this.renderTimes("09:00AM") }
                            </select>
                            <select name="sutofield" onChange={(e)=>{this.handleHours(e)}} style={ !this.state.sunday ? { color: '#d5d5d5'}: { color: '#626262'} } disabled = { !this.state.sunday ? true: false } className="sutofield daytofield">
                            { this.state.suendttime ? this.renderTimes(this.state.suendttime) : this.renderTimes("05:00PM") }
                            </select>                            
                        <div className="errmsg"></div> 
                </div> 
                    <div className="hourerr errmsg">
                                { this.state.workinghourserr ? this.state.workinghourserr : ''}
                    </div>                  
                </div>
                <div className="clearboth" ></div>
                <div className="storesubmitField">
                    <button type="submit" className="storesubmit" >Save</button>
                    <div className="processmsg"></div>
                    <div className="submiterr errmsg">
                    
                    </div> 
                </div> 
                <div className="clearboth" ></div>
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


export default connect(mapStateToProps, { getCategories, addStore, getStore, editStore, changeStoreStatus})(withRouter(Store));