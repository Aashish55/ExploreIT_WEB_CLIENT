import React, { Component } from 'react';
import { connect } from 'react-redux';


class Home extends Component {
    state = {}
    render() { 
        return (
            <div>
                This is home after login
                {this.props.currentUser}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Home);