import React, {useState} from 'react';
import axios from './http-common';
import './SCSS/index.css';
import ServiceUser from './ServiceUser';

/*
NOTE: THIS CLASS LIKELY CORRESPONDS WITH THE
USERCOMPONENT.JS IN THE EXAMPLE VIDEO
See: 29:20 in the video.
 */
class TakeInput extends React.Component{
    // constructor props permits passing default values to callers
    constructor(props)
    {
        super(props);

        this.state = {
            user: {
                fpath: props.fpath,
                searchStrings: props.searchStrings,
                anonymize:props.anonymize,
                status: props.status,
                users:[]
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
        // need to add state modify var, too?
        //current value of the user
        let user = this.state.user;
        //extract value of input embodied in 'target'
        let modifiedPath = e.target.fpath;
        let modifiedStrings = e.target.searchStrings;
        let modifiedAnonymize = e.target.anonymize;
        user.fpath = modifiedPath;
        user.searchStrings = modifiedStrings;
        user.anonymize = modifiedAnonymize;
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

        axios.post('http://localhost:3000', this.state).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
        alert(': pushed')
        console.log(event);

        ServiceUser.getUsers().then((response)=>
        {
            this.setState({users: response.data})
        });
    };
    render()
    {
        return (
            <div>
                <form className={"grid_layout"} onSubmit={this.handleSubmit}>
                    <p className={"heading"}>Welcome to your web-app log helper tool!</p>
                    <p className={"appDescription"}>LogHelper is designed to assist in the sharing and anonymizing of log data using
                        an automated process for replacing names, IP addresses, Mac addresses, and other
                        sensitive data for the exchange of said data during troubleshooting and case
                        management.</p>
                    <div className={"center"}>
                        {
                            this.state.users.map(
                                user =>
                                    <label key={user.id}>Enter your path and search strings here:<br/><br/>

                                        <input type="text" value={this.state.user.fpath} onChange={
                                            this.handleChange.bind(this)} placeholder="file path"/>{user.fpath}
                                        <input type="text" value={this.state.user.searchStrings} onChange={
                                            this.handleChange.bind(this)}
                                               placeholder="search strings"/>{user.searchStrings}
                                        <button value={this.state.user.status}
                                                onClick={this.handleSubmit.bind(this)}>{'Search'}</button>
                                    </label>
                            )
                        }
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