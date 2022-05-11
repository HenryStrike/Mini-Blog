import React, { Component } from 'react';
import Content from './base';

class NotFound extends Component {
    state = {  } 
    render() { 
        return (
            <Content>
                <h5 className="card-title">Not Found</h5>
            </Content>
        );
    }
}
 
export default NotFound;