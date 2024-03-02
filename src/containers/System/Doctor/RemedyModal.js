import React, { Component } from 'react';
import { connect } from "react-redux";
import *  as actions from '../../../store/actions'
import { LANGUAGE } from '../../../utils'
import {  CommonUtils  } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import './RemedyModal.scss'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class RemedyModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email:'',
            imgBase64: ''
        }
    }
    async componentDidMount() {



    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if(prevProps.dataModal !== this.props.dataModal){
            this.setState({
                email: this.props.dataModal.email
            })
        }


    }
    handleOnchangeEmail = (event)=>{
        this.setState({
            email: event.target.value
        })
    }
    handleOnchangeImage = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
          
            this.setState({
                imgBase64: base64
            })
        }
    }
    handleSendRemedy = ()=>{
        this.props.sendRemedy(this.state)
    }
    render() {
        let { isOpenModal, dataModal, closeRemedyModal, sendRemedy } = this.props
        
        return (
            <Modal isOpen={isOpenModal} className={'booking-modal-container'}
                size='lg'
                centered
            >

                <div class="modal-header">
                    <h5 class="modal-title">Gửi hóa đơn khám bệnh thành công</h5>
                    <button type="button" class="Close" aria-label="Close" onClick={closeRemedyModal} >
                        <span aria-hidden="true"> x</span>
                    </button>
                </div>
                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Email bệnh nhân</label>
                            <input className='form-control' type='email' value={this.state.email}
                                onChange={(event)=> this.handleOnchangeEmail(event)}
                            ></input>

                        </div>
                        <div className='col-6 form-group'>
                            <label>Chọn file đơn thuốc</label>
                            <input className='form-control-file' type='file' 
                            onChange={(event)=> this.handleOnchangeImage(event)}></input>

                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=>this.handleSendRemedy()}>
                        Send
                    </Button>{' '}
                    <Button color="secondary" onClick={closeRemedyModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
