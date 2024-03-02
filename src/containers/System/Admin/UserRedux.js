import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGE, CRUD_ACTIONS, CommonUtils  } from '../../../utils'
import *  as actions from '../../../store/actions'
import './UserRedux.scss'
import TableManageUser from './TableManageUser';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import { forEach, forIn } from 'lodash';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionsArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avartar: '',

            action: '',
            userEditId: ''
        }
    }

    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap: ''

            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux
            this.setState({
                positionsArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap: ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap: ''
            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            let arrRoles = this.props.roleRedux
            let arrPositions = this.props.positionRedux
            let arrGenders = this.props.genderRedux
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap: '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap: '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap: '',
                avartar: '',
                previewImgURL:'',

                action: CRUD_ACTIONS.CREATE
            })
        }
    }
    handleOnchangeImage = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            console.log('check base64: ',base64);
            const objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl,
                avartar: base64
            })
        }
    }
    handleOnClickImage = () => {
        if (!this.state.previewImgURL)
            return
        this.setState({
            isOpen: true
        })
    }
    OnchangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                alert('This input is required: ' + arrCheck[i])
                break
            }
        }
        return isValid
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) return
        //    console.log("check before submit", this.state);
        let { action } = this.state
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                phoneNumber: this.state.phoneNumber,
                avartar: this.state.avartar,
                roleId: this.state.role,
                positionId: this.state.position
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            //fire redux edit user
            this.props.editUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                phoneNumber: this.state.phoneNumber,
                roleId: this.state.role,
                positionId: this.state.position,
                avartar: this.state.avartar

            },)
        }



    }
    handleEditUserFromParent = (user) => {
        let imageBase64 =''
        if(user.image){
            imageBase64 = new Buffer(user.image,'base64').toString('binary')
        }
        this.setState({
            email: user.email,
            password: 'pwd',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avartar: '',
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
            previewImgURL: imageBase64
        })

    }

    render() {

        let genders = this.state.genderArr
        let positions = this.state.positionsArr
        let roles = this.state.roleArr
        let language = this.props.language
        let isLodingGender = this.props.isLodingGender
        let { email, password, firstName, lastName,
            phoneNumber, address, gender, position, role, avartar } = this.state
        return (

            <div className='user-redux-container'>
                <div className='title'>
                    Learn React
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='col-12'>{isLodingGender === true ? 'Loading...' : ''}</div>
                        <div className='row'>
                            <div className='col-12 my-3'>
                                <button type="button" className="btn btn-primary"><FormattedMessage id="manage-user.add" /></button>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input className='form-control' type='text' value={email}
                                    onChange={(event) => { this.OnchangeInput(event, 'email') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className='form-control' type='password' value={password}
                                    onChange={(event) => { this.OnchangeInput(event, 'password') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.firstname" /></label>
                                <input className='form-control' type='text' value={firstName} onChange={(event) => { this.OnchangeInput(event, 'firstName') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.lastname" /></label>
                                <input className='form-control' type='text' value={lastName} onChange={(event) => { this.OnchangeInput(event, 'lastName') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.mobilephone" /></label>
                                <input className='form-control' type='text' value={phoneNumber} onChange={(event) => { this.OnchangeInput(event, 'phoneNumber') }} />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className='form-control' type='text' value={address} onChange={(event) => { this.OnchangeInput(event, 'address') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-select" aria-label="Default select example"
                                    onChange={(event) => { this.OnchangeInput(event, 'gender') }}
                                    value={gender}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((items, index) => {
                                            return (
                                                <option value={items.keyMap}>
                                                    {language === LANGUAGE.EN ? items.valueEn : items.valueVi}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select className="form-select" aria-label="Default select example"
                                    onChange={(event) => { this.OnchangeInput(event, 'position') }}
                                    value={position}
                                >
                                    {positions && positions.length > 0 &&
                                        positions.map((items, index) => {
                                            return (
                                                <option value={items.keyMap}>
                                                    {language === LANGUAGE.EN ? items.valueEn : items.valueVi}
                                                </option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.role" /></label>
                                <select className="form-select" aria-label="Default select example"
                                    onChange={(event) => { this.OnchangeInput(event, 'role') }}
                                    value={role}
                                >
                                    {roles && roles.length > 0 &&
                                        roles.map((items, key) => {
                                            return (
                                                <option value={items.keyMap}>
                                                    {language === LANGUAGE.EN ? items.valueEn : items.valueVi}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.avatar" /></label>
                                <div className='preview-img-container'>
                                    <input id="previewImg" type='file' hidden
                                        onChange={(event) => this.handleOnchangeImage(event)}
                                    />
                                    <label className='label-upload' htmlFor='previewImg' >
                                        <i className="fa fa-upload" aria-hidden="true">Tải ảnh</i>
                                    </label>
                                    <div className='preview-image' style={{
                                        backgroundImage: `url(${this.state.previewImgURL})`
                                    }}
                                        onClick={() => this.handleOnClickImage()}
                                    >
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 my-3'>
                                <button type="button" className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}

                                    onClick={() => this.handleSaveUser()}>
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-user.edit" />
                                        :
                                        <FormattedMessage id="manage-user.save" />
                                    }
                                </button>
                                <div className='col-12 mt-3 mb-5'>
                                    <TableManageUser
                                        handleEditUserFromParent={this.handleEditUserFromParent}
                                        action={this.state.action}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}

                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => { // lấy state(reducers) từ trong redux -->lưu vào prop(react)
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLodingGender: state.admin.isLodingGender,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchUserManageStart()),
        editUserRedux: (data) => dispatch(actions.editAUser(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
