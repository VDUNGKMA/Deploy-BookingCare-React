import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'
import _ from 'lodash'
class ModalEditUser extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id:'',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: ''
    }
  
  };


  componentDidMount() {
    console.log('test did mount:', this.props.userCurrent);
    let user = this.props.userCurrent
    if(user && !_.isEmpty(user)){
        this.setState({
            id:user.id,
            email: user.email,
            password: 'pwd',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address
        })
    }
    

  }

  toggle = () => {
    this.props.toogleEditUserFromParent()
  }

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state } //tạo ra bản copy
    copyState[id] = event.target.value // thay đổi giá trị id trong bản sao đó 
    this.setState({ // cập nhập state
      ...copyState
    })
  }
  checkValidInput = () => {
    let valid = true
    let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state.[arrInput[i]]) {
        valid = false

        alert('Missing input: ' + arrInput[i])
        break;

      }
    }
    return valid
  }
  handleSaveUser = () => {
    let isValid = this.checkValidInput()
    if (isValid) {
      // call api edit user
      this.props.editUser(this.state)
    }

  }
  

  render() {
   // console.log('check props from parent ',this.props);
    return (
      <Modal isOpen={this.props. isOpenModalEditUser}
        toggle={() => { this.toggle() }}
        className='modal-user-container'
        size='lg' >
        <ModalHeader toggle={() => { this.toggle() }}>Update User</ModalHeader>
        <ModalBody>
          <div className='modal-user-body'>
            <div className='input-container'>
              <label>Email</label>
              <input type='text'
                onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                value={this.state.email} disabled
              ></input>
            </div>
            <div className='input-container'>
              <label>Password</label>
              <input type='password'
                onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                value={this.state.password} disabled
              ></input>
            </div>
            <div className='input-container'>
              <label>FirstName</label>
              <input type='text'
                onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }}
                value={this.state.firstName}
              ></input>
            </div>
            <div className='input-container'>
              <label>LastName</label>
              <input type='text'
                onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }}
                value={this.state.lastName}
              ></input>
            </div>
            <div className='input-container max-width-input'>
              <label>Address</label>
              <input type='text'
                onChange={(event) => { this.handleOnChangeInput(event, 'address') }}
                value={this.state.address}
              ></input>
            </div>

          </div>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" className='px-3' onClick={() => { this.handleSaveUser() }}>
            Update user
          </Button>
          <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
            Close
          </Button>
          
        </ModalFooter>
      </Modal>

    )
  }

}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
