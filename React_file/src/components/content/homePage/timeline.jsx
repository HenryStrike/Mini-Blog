import React, { Component } from 'react';
import PostView from './postView';
import { connect } from 'react-redux';

class TimeLine extends Component {
    state = {  } 

    render() { 
        return (
            <div className="card">
                <div className="card-body">
                    {this.props.posts.length===0 && <p className="fs-1 text-center">No Posts</p>}
                    {this.props.posts.map(post=>(
                        <PostView
                            content = {post.content}
                            id = {post.id}
                            key = {post.id}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) =>{
    return{
        posts: state.homePage.posts,
    }
};

export default connect(mapStateToProps)(TimeLine);