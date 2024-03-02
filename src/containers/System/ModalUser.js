import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'
class ModalUser extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: ''
    }
    this.listenToEmitter() // hàm này được gọi trước khi bắt đầu render ra tree dom(cây html)
  };
  listenToEmitter() {
    emitter.on('EVEN_CLEAR_MODAL_DATA', () => {
      // reset state
        this.setState  ({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        })
    })
  }

  componentDidMount() {


  }

  toggle = () => {
    this.props.toogleFromParent()
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
  handleAddNewUser = () => {
    let isValid = this.checkValidInput()
    if (isValid) {
      this.props.createNewUser(this.state, 'abc')
    }

  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen}
        toggle={() => { this.toggle() }}
        className='modal-user-container'
        size='lg' >
        <ModalHeader toggle={() => { this.toggle() }}>Create a new user</ModalHeader>
        <ModalBody>
          <div className='modal-user-body'>
            <div className='input-container'>
              <label>Email</label>
              <input type='text'
                onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                value={this.state.email}
              ></input>
            </div>
            <div className='input-container'>
              <label>Password</label>
              <input type='password'
                onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                value={this.state.password}
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
          <Button color="primary" className='px-3' onClick={() => { this.handleAddNewUser() }}>
            Add new User
          </Button>
          <Button color="secondary" className='px-3' onClick={() => { emitter.emit('EVEN_CLEAR_MODAL_DATA')}}>
            Reset
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
