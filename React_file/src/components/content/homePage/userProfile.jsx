import React, { Component } from 'react';

class UserProfile extends Component {
    state = {  } 
    render() { 
        return (
            <div className="card">
                <img src="http://175.178.193.39:8080/images/logo512.png" className="card-img-top" alt="UserIcon"/>
                <div className="card-body">
                    <h5 className="card-title">Timeline Space</h5>
                    <p className="card-text">This is the area you can post your own thoughts freely!</p>
                    <a href="#" className="btn btn-primary">Share the website</a>
                </div>
            </div>
        );
    }
}
 
export default UserProfile;