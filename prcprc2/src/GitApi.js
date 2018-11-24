import React, { Component } from 'react';
import './GitApi.css';
import { FormControl,FormGroup,ControlLabel } from 'react-bootstrap';
class data extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search:'',
      data:[], //gets the response from github
      star:[],  //store stars reting for all repositories

      
    };
    this.handleSubmit=this.handleSubmit.bind(this);
    this.Parse=this.Parse.bind(this)
  }

  handleSubmit(){
      
    console.log(this.state.search)
    fetch('https://api.github.com/orgs/'+this.state.search+'/repos')

       .then((response) => response.json())
       .then((json) => this.setState({data:json}));
  }
    Parse(){
      if(this.state.data.length<1){
        console.log("no repository found for user: "+this.state.search)
      }
      else{
        this.state.data.map(user =>{
            this.state.star.push(parseInt(user.stargazers_count))
        })  
        var str1 = Math.max(...this.state.star)
        console.log("star count = " +str1)
        console.log("Repo Name = "+this.state.data[this.state.star.indexOf(str1)].full_name) //Repo Name
        this.state.star.splice(this.state.star.indexOf(str1),1)
        this.state.data.splice(this.state.star.indexOf(str1),1)

        var str2 = Math.max(...this.state.star)
        console.log("star count = " +str2)
        console.log("Repo Name = "+this.state.data[this.state.star.indexOf(str2)].full_name) //Repo Name
        this.state.star.splice(this.state.star.indexOf(str2),1)
        this.state.data.splice(this.state.star.indexOf(str2),1)
        
        var str3 = Math.max(...this.state.star)
        console.log("star count = " +str3)
        console.log("Repo Name = "+this.state.data[this.state.star.indexOf(str3)].full_name) //Repo Name
       
      }
    }

  
  render(){   
    
    return(
      <div><p>Please open console</p><br/>
            <FormGroup >
            <ControlLabel>Enter Github Username  &nbsp;&nbsp;&nbsp;</ControlLabel>
                <FormControl
                    type='text'
                    alignItems='center'
                    placeholder=''
                    onChange = {(event) => this.setState({search: event.target.value })} />
             </FormGroup><br/>
                <button onClick={this.handleSubmit}>
                Get</button> &nbsp;&nbsp;&nbsp;<br/>
                <p>After clicking get please wait for 3 seconds to get the response</p><br/>
                <p>now click on result</p>
                <button onClick={this.Parse} style={{borderBottomLeftRadius:0,borderTopLeftRadius:0}}>
                See Result</button>                
      </div>
    );
  }}
export default data;
  