import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxilary from '../Auxilary';

const withErrorHandler = (WrapperComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        
        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req
            })
            axios.interceptors.response.use(res=>res , error => {
                this.setState(
                    { error: error }
                )
            })
        }

        erroeConfirmHandler = () => {
            this.setState({error: null})
        }

        render() {
            return (
                <Auxilary>
                    <Modal show={this.state.error}
                        modalClosed={this.erroeConfirmHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrapperComponent {...this.props} />
                </Auxilary>
            )
        }
    }
}
export default withErrorHandler;