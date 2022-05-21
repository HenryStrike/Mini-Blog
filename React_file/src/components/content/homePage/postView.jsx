import React, { Component } from 'react';
import { connect } from 'react-redux';
import ACTIONS from '../../../redux/actions';

class PostView extends Component {
    state = {  } 

    handleDelete = (postId) =>{
        this.props.delete(postId);
    }

    render() { 
        return (
            <div className="card m-2">
                <div className="card-body">
                    <div className="row">
                        <pre className="col-9 fs-5">
                            {this.props.content}
                        </pre>
                        <div className="col-3 position-relative">
                            <button onClick={()=>this.handleDelete(this.props.id)} type="button" className="btn btn-outline-danger btn-sm position-absolute start-50">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
const mapDispatchToProps = {
    delete: (postId)=>({
        type: ACTIONS.DELETE_A_POST,
        id: postId,
    })
}

export default connect(null, mapDispatchToProps)(PostView);