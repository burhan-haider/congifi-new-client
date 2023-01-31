import React, { useState, useEffect } from 'react';
import Formsy from 'formsy-react';
import { SelectFormsy } from 'components/common/formsyComponents';
import {
    Box,
    Grid,
    MenuItem
} from '@mui/material'
import { GenericButton } from '@application';
import httpService from 'services/httpservice/httpService';

const UserActionsComponent = (props) => {

    const [userData, setUserData] = useState({});
    const [tempUserData, setTempUserData] = useState({});
    const [userRoles, setUserRoles] = useState([]);
    const [tempUserRoles, setTempUserRoles] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [showTable, setShowTable] = useState(false);

    const tableData = [
        {
            header: "User Name",
            current: userData.username&&userData.username!=null?userData.username:"-",
            temp: tempUserData.username&&tempUserData.username!=null?tempUserData.username:"-",
        },
        {
            header: "Email Id",
            current: userData.emailId&&userData.emailId!=null?userData.emailId:"-",
            temp: tempUserData.emailId&&tempUserData.emailId!=null?tempUserData.emailId:"-",
        },
        {
            header: "Mobile Number",
            current: userData.mobileNo&&userData.mobileNo!=null?userData.mobileNo:"-",
            temp: tempUserData.mobileNo&&tempUserData.mobileNo!=null?tempUserData.mobileNo:"-",
        },
        {
            header: "Designation",
            current: userData.designation&&userData.designation!=null?userData.designation:"-",
            temp: tempUserData.designation&&tempUserData.designation!=null?tempUserData.designation:"-",
        },
        {
            header: "Employee Code",
            current: userData.employeeCode&&userData.employeeCode!=null?userData.employeeCode:"-",
            temp: tempUserData.employeeCode&&tempUserData.employeeCode!=null?tempUserData.employeeCode:"-",
        },
        {
            header: "Branch Code",
            current: userData.branchCode&&userData.branchCode!=null?userData.branchCode:"-",
            temp: tempUserData.branchCode&&tempUserData.branchCode!=null?tempUserData.branchCode:"-",
        }
    ]



    const dropDownData = props.indexPageData?props.indexPageData:[];
    const user = "";

    const token = window.localStorage.getItem("cognifi_token");
    let config = {
        headers: {
            Authorization: "Bearer " + token,
            'Content-Type': `multipart/form-data`,
        }
    };

    useEffect(() => {
        console.log("Props:-", props.indexPageData)
        console.log("UserActionsComponent props :", props);
    })

    const handleSubmit = async(data) => {
        console.log("Form Data:-", data)
        setShowTable(false);
        
        httpService.get(`/api/user/userDto/${data.username}`, config).then(res => {

            console.log("User Data:-", res.data);
            setUserData(res.data);

            httpService.get(`/api/user/userRole/${data.username}`, config).then(res2 => {

                console.log("User Role Data:-", res2.data);
                setUserRoles(res2.data);

                httpService.get(`/api/checker/getTempUser/${data.username}`, config).then(res3 => {
                    
                    console.log("Temp User Data:-", res3.data);
                    setTempUserData(res3.data);
                    
                    httpService.get(`/api/user/tempUserRoleDto/${data.username}`, config).then(res4 => {
 
                        console.log("Temp User Role Data:-", res4.data);
                        setTempUserRoles(res4.data);
                        setSelectedUser(data.username);
                        setShowTable(true);

                    }).catch(err => {
                        console.log("Temp User Role Data:-", err);
                    })

                }).catch(err => {
                    console.log("Temp User Data:-", err);
                })

            }).catch(err => {
                console.log("User Role Data:-", err);
            })
        }).catch(err => {
            console.log("Error:-", err);
        })
    }

    const handleApprove = async() => {
        await httpService.post(`/api/user/verify?username=${selectedUser}`, config)
            .then(res=>{
                console.log("Verify User:-", res);
                alert("User Verified Successfully");
                setShowTable(false);
            })
    }
    
    const handleReject = async() => {

        await httpService.post(`/api/user/rejectUser?username=${selectedUser}`, config)
            .then(res=>{
                console.log("Reject User:-", res);
                alert("User Rejected Successfully");
                setShowTable(false);
            })
    }

    return(
        <div>
            <Formsy onValidSubmit={data=>handleSubmit(data)} >
                <Grid container className="container py-5" >
                    <Grid item xs={4}>
                        <SelectFormsy 
                            variant="outlined"
                            name="username"
                            label="Select User"
                            className={"w-5/6 text-left"}
                            required={true}
                            value={user}
                        >
                            {dropDownData.map((item, index) => {
                                return (
                                <MenuItem key={index} value={item?item:''}>
                                    {item?item:''}
                                </MenuItem>
                                );
                            })}
                        </SelectFormsy>
                    </Grid>
                    <Grid item xs={2}>
                        <GenericButton
                            color="primary"
                            type="submit"
                            className="px-10"
                        >
                            Search
                        </GenericButton>
                    </Grid>
                </Grid>
                
                
            </Formsy>

            {showTable &&(
                <div >
                    <table className="w-[98%] m-5 p-0 rounded border-gray-200 border-2 border-solid" >
                        <thead className="border-b-2 border-solid border-gray-200" >
                            <tr className="" >
                                <th className="py-3 border-solid border-gray-300 border-0 border-b-2" ></th>
                                <th className="py-3 border-solid border-gray-300 border-0 border-b-2">Current Data</th>
                                <th className="py-3 border-solid border-gray-300 border-0 border-b-2" >Updated Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((item, index) => (
                                <tr key={index} className="border-solid border-gray-300 border-0 border-r-2" >
                                    <td className="py-2 flex items-start justify-start pl-5">{item.header}</td>
                                    <td className="bg-emerald-200 border-solid border-gray-300 border-0 border-r-2 border-l-2">{item.current}</td>
                                    <td className="bg-yellow-200">{item.temp}</td>
                                </tr>
                            ))}
                            <tr>
                                <td className="py-2 flex items-start justify-start pl-5 ">Roles</td>
                                <td className="bg-emerald-200 border-solid border-gray-300 border-0 border-l-2 border-r-2">
                                    {userRoles.map((item, index) => (
                                            <p className="p-0 m-0 mb-1" key={index}>{item.roleName}</p>
                                    ))}
                                </td>
                                <td className="bg-yellow-200">
                                    {tempUserRoles.map((item, index) => (
                                            <p className="p-0 m-0 mb-1" key={index}>{item.roleName}</p>
                                    ))}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <GenericButton
                                color="primary"
                                type="button"
                                onClick={()=>handleApprove()}
                                className="px-10"
                            >
                                Approve
                        </GenericButton>
                        <GenericButton
                                color="primary"
                                type="button"
                                onClick={()=>handleReject()}
                                className="px-10"
                            >
                                Reject
                        </GenericButton>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserActionsComponent;