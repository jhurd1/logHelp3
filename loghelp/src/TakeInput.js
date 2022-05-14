import React, {useState} from 'react';
import axios from './http-common';
import './SCSS/index.css';
//import './LHUserService';

// shouldn't need react hook since classes are supposed to do the same thing
class TakeInput extends React.Component{

    // constructor properties or "props" permits passing default values to callers
    constructor(props)
    {
        super(props);

        this.state = {
            user: {
                fpath: props.fpath,
                searchStrings: props.searchStrings,
                anonymize:props.anonymize,
                status: props.status
            }
        }
    }
    state = {
        fpath: "",
        searchStrings: "",
        anonymize:"",
        status:""
    };

    handleChange=(e)=>{

        //current value of the user
        var user = this.state.user;

        //extract value of input embodied in 'target'
        var modifiedPath = e.target.fpath;
        var modifiedStrings = e.target.searchStrings;
        var modifiedAnonymize = e.target.anonymize;

        //update user
        user.fpath = modifiedPath;
        user.searchStrings = modifiedStrings;
        user.anonymize = modifiedAnonymize;

        // test console.log for debugging
        console.log(e);
        this.setState({
            fpath: e.target.fpath,
            searchStrings: e.target.searchStrings,
            anonymize: e.target.anonymize
        })
    };

    handleInput = event => {
        this.setState({fpath: event.target.value});
        this.setState({searchStrings: event.target.value});
        console.log(event);
    };

    logValue = () => {
        console.log(this.state.fpath);
        console.log(this.state.searchStrings);
    };

    handleSubmit = (event) => {
        event.preventDefault();
        // may not need const user
        // synthesized for post
        // replaced again w/ this.state
        const user = {
            fpath: this.state.fpath,
            searchStrings: this.state.searchStrings,
            anonymize: this.state.anonymize,
            status: this.state.status
        }
        // the key to post, serialization, and working with Java
        // possibly requires a Java API to furnish a URL/URI here
        axios.post('http://localhost:3000', this.state).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
        alert(': search button pushed')
        console.log(event);
    };

    render()
    {
        return (
            <div>
                <form className={"grid_layout"} onSubmit={this.handleSubmit}>
                    <p className={"heading"}>Welcome to your web-app log helper tool!</p>
                    <p className={"appDescription"}>LogHelper is designed to assist in the sharing and anonymization of log data using
                        an automated process for replacing names, IP addresses, Mac addresses, and other
                        sensitive data for the exchange of said data during troubleshooting and case
                        management.</p>
                    <div className={"center"}>
                        <label>Enter your path and search strings here:<br/><br/>
                            <input type="text" value={this.state.user.fpath} onChange={this.handleChange.bind(this)} placeholder="file path"/>
                            <input type="text" value={this.state.user.searchStrings} onChange={this.handleChange.bind(this)} placeholder="search strings" />
                            <button value={this.state.user.status} onClick={this.handleSubmit.bind(this)}>{'Search'}</button>
                        </label>
                        <br/>
                        <p>Anonymize results?</p>
                        <input type="radio" value={this.state.user.anonymize} id="yes"
                               onChange={this.handleChange.bind(this)} name="anonymize?"/> <label htmlFor="yes">Yes</label>

                        <input type="radio" value={this.state.user.anonymize} id="no"
                               onChange={this.handleChange.bind(this)} name="anonymize?"/> <label htmlFor="No">No</label>
                    </div>
                </form>

            </div>
        );
    }
}
export default TakeInput;