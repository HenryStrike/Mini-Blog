import React, { Component } from 'react';
import Content from './base';
import TimeLine from './homePage/timeline';
import UserProfile from './homePage/userProfile';
import EditPost from './homePage/editPost';

class Home extends Component {
    state = {  } 
    render() { 
        return (
            <Content>
                <div className="row">
                    <div className="col-3">
                        <UserProfile/>
                        <EditPost/>
                    </div>
                    <div className="col-9">
                        <TimeLine/>
                    </div>
                </div>
            </Content>
        );
    }
}
 
export default Home;