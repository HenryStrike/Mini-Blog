import React, { Component } from 'react';
import ACTIONS from '../../../redux/actions';
import { connect } from 'react-redux';

class EditPost extends Component {
    state = {  } 

    handleSubmit = () =>{
        this.props.submit(this.input.value);
        this.input.value = "";
    }

    render() { 
        return (
            <div className="card mt-2">
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Edit Post</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" ref={input => this.input = input} rows="3"></textarea>
                    </div>
                    <button onClick={this.handleSubmit} type="button" className="btn btn-primary btn-sm">Submit</button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    submit: (content)=>({
        type: ACTIONS.SUBMIT_A_POST,
        content,
    }),
}
 
export default connect(null, mapDispatchToProps)(EditPost);