import React, { Component } from 'react';

class Content extends Component {
    state = {  } 
    render() { 
        return (
            <div className="card m-5">
                <div className="card-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
 
export default Content;