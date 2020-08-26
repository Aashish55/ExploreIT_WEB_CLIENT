import React, { Component } from 'react';
import { connect } from 'react-redux';


class Home extends Component {
    state={
        user:this.props.currentUser
    }
    render() {
        return (
            <div>
                This is home after login
            </div>
        )
    }

};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Home);