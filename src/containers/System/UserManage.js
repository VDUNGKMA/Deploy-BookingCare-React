import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import './userManage.scss'
import ModalUser from './ModalUser'
import ModalEditUser from './ModalEditUser'
import {emitter} from '../../utils/emitter'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Add this inside your component or at the top-level component (e.g., App.js)
toast.configure();

/** Life Cycle
 *  run constructor (init state)
 *  DidMount (set state)
 *  render

 */
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit:{}
        }
    }


    async componentDidMount() {
        await this.getAllUserFromReact()
       
    }

    getAllUserFromReact= async()=> {
        let response = await getAllUsers('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })

        }
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser:true,
        })
    }
    handleEditUser =(user)=>{
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }
    toogleUserModal= ()=>{
        this.setState({
            isOpenModalUser:!this.state.isOpenModalUser,
        })
    }
    toogleEditUserModal= ()=>{
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }
    createNewUser = async(data, message)=>{
        try {
            let response= await createNewUserService(data)
           if(response && response.errCode !==0){
                alert(response.errMessage)
           }else{
                await this.getAllUserFromReact();
                this.setState({ 
                    isOpenModalUser: false}
                )
                emitter.emit('EVEN_CLEAR_MODAL_DATA') // thực thi even
           }
        } catch (error) {
            console.log(error);
        }
       
    }
    doEditUser = async (user)=>{
        try {
            let  res =await editUserService(user)
            if(res && res.errCode ===0){
                this.setState({
                    isOpenModalEditUser:false
                })
                await this.getAllUserFromReact()
                // Show success toast notification
            }else{
                alert(res.errMessage)
            }
        } catch (error) {
            console.log(error);
        }
      
       
    }
    handleDeleteUser= async (data)=>{
        console.log(' check user data',data.id);
        try {
            let res =await deleteUserService(data.id)
            if(res && res.errCode ===0){
                await this.getAllUserFromReact()
            }else{
                alert(res.errMessage)
            }
        } catch (error) {
            console.log(error);
        }
    }
    render() {

        return (

            <div className="users-container">
                    <ModalUser
                        isOpen={this.state.isOpenModalUser}
                        toogleFromParent={this.toogleUserModal}
                        createNewUser ={this.createNewUser}
                    />
            {
                this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpenModalEditUser={this.state.isOpenModalEditUser}
                        toogleEditUserFromParent={this.toogleEditUserModal}
                        userCurrent ={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
            }
                <div className='title text-center'>Manage User</div>
                <div className='mx-2 '>

                    <button className='btn btn-primary px-3' onClick={() => this.handleAddNewUser()}>

                        <i className="fas fa-plus"></i> Add new User</button>
                </div>
                <div className='users-table mt-3 mx-2'>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>FirstName</th>
                            <th>lastName</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {this.state.arrUsers.map(user => (
                            <tr>
                                <td>{user.email}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.address}</td>
                                <td>
                                    <button className='btn-edit'  onClick={()=>this.handleEditUser(user)}>
                                        <i className="far fa-edit"
                                      
                                        ></i>
                                    </button>
                                    <button className='btn-delete'  onClick={()=>this.handleDeleteUser(user)}>
                                        <i className="fas fa-trash"></i>
                                       
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>

        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
