import React from 'react';
import './SCSS/index.css';
import ServiceUser from "./ServiceUser";

// shouldn't need react hook since classes are supposed to do the same thing
export class TakeInput extends React.Component{

    // constructor properties or "props" permits passing default values to callers
    constructor(props)
    {
        super(props);

        this.state = {
            user: {
                fpath: props.fpath,
                searchStrings: props.searchStrings,
                anonymize:props.anonymize
            }
        }
    }
    state = {
        fpath: "",
        searchStrings: "",
        anonymize:""
    };

    handleChange=(e)=>{

        //current value of the user
        const user = this.state.user;

        //extract value of input embodied in 'target'
        const modifiedPath = e.target.fpath;
        const modifiedStrings = e.target.searchStrings;
        const modifiedAnonymize = e.target.anonymize;

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

    handleSubmit = (event) => {
        event.preventDefault();

        const response = ServiceUser.createUsers().then(response =>
        {
            console.log(response)
        }).catch(error=> {
            console.log(error)
        })

        function setUser(data) {

        }

        setUser(response.data)
        localStorage.setItem('user', response.data)
        console.log(response.data)

        const xhr = new XMLHttpRequest();
        const url = 'http://127.0.0.1:8080';
        xhr.open('POST', url);
        xhr.onreadystatechange = function()
        {
            if(xhr.readyState === XMLHttpRequest.DONE)
            {
                const status = xhr.status;
                if(status === 0 || (status >= 200 && status < 400))
                {
                    console.log(xhr.responseText);
                } else
                {
                    console.log("Request error");
                }
            }
        };
        xhr.send();
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