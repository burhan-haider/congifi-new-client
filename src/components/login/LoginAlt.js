import React, { useState, useRef } from "react";
// import { makeStyles } from "@mui/styles";
import Formsy from "formsy-react";
import { 
  Button, 
  FormControl, 
  Typography,
  CircularProgress 
} from "@mui/material";
import { useDispatch} from "react-redux";
// import commonService from "services/common/commonService";
// import COGNIFI_LOGO_FULL from "assets/icons/cognifi_logo_full.png";
import QDE_LOGO from "assets/icons/QDE-Logo-Full.png";
import Cognifi_Logo_Animated from "assets/header/cognifi-logo.png";
// import Cognifi_Logo_Animated from "assets/icons/Cognifi_Logo_Animated.gif";
import LoginImage from 'assets/LoginImage.png';

import { TextFieldFormsy } from "../common/formsyComponents";
import { submitLogin } from "redux/auth/login/login.actions.js";
import { useClasses, GenericButton } from '@application';
const crypto = require("crypto");
// submitLogin;
const styles = theme => ({

  buttonRoot: {
    left: '5px',
    borderRadius: "25px",
    marginRight: "1%",
    color: "#052a4f",
    backgroundColor: "#fff",
    border: "1px solid #052a4f",
    fontFamily: "inherit",
    "&:hover, &:focus": {
      color: "#fff",
      backgroundColor: "#052a4f"
    },
    textTransform: "none"
  },
  buttonLabel: {
    textTransform: "initial",
  },

  root: {
    width: "40%",
    margin: "4% auto ",
    textAlign: "center",
    display: "flex",
    "& .MuiOutlinedInput-root": {
      height: "46px",
      borderRadius: "50px",
      fontSize: "14px",
      "& fieldset": {
        borderColor: "default",
      },
    },
    "& .MuiOutlinedInput-input": {
      padding: "14px 14px",
      fontFamily: "GoogleSans-Regular",
    },
    "& .MuiInputLabel-outlined": {
      // transform: "translate(14px, 16px) scale(1)",
      lineHeight: '1'
    },
    "& .MuiInputLabel-shrink": {
      transform: " translate(14px, -6px) scale(0.75)",
    },

    "& .MuiSelect-select": {
      "&:focus": {
        borderRadius: "50px",
      },
    },
  },

  option: {
    backgroundColor: "red",
  },

  form: {
    textAlign: "center",
  },
  formDiv: {
    width: "50%",
    float: "right",
  },

  cognifiHead: {
    fontFamily: "GoogleSans-Medium",
  },
  LoginImage: {
    position: "absolute",
    width: "50%",
    height: "100%",
  },
});

const customStyles = {
  root: {
    width: "80%",
    margin: "4% auto ",
    textAlign: "center",
    display: "flex",
    "& .MuiOutlinedInput-root": {
      height: 'auto',
      borderRadius: "70px",
      backgroundColor: '#fff',
      fontSize: "14px",
      "& fieldset": {
        borderColor: "default",
      },
    },
    "& .MuiOutlinedInput-input": {
      padding: "12px",
      fontFamily: "GoogleSans-Regular",
      // "& fieldset": {
      //   borderColor: "default"
      // }
    },
    "& .MuiInputLabel-outlined": {
      transform: "translate(14px, 16px) scale(1)",
      lineHeight: '1'
    },
    "& .MuiInputLabel-shrink": {
      transform: " translate(14px, -6px) scale(0.75)",
    },

    "& .MuiSelect-select": {
      "&:focus": {
        borderRadius: "50px",
      },
    },
  },
  // buttonRoot: {
  //   borderRadius: "25px",
  //   padding: "0.25% 5% 0.25% 5%",
  //   marginRight: "11%",
  //   marginTop: "1%",
  //   marginBottom: '0px',
  //   fontSize: "14px",
  //   fontFamily: "GoogleSans-Regular",
  //   float: "right",
  //   outline: "none",
  //   "&:hover": {
  //     backgroundColor: "#e4e4e4",
  //   },
  // },
  // buttonLabel: {
  //   textTransform: "initial",
  // },
  option: {
    backgroundColor: "red",
  },
  form: {
    textAlign: "center",
  },
  formDiv: {
    width: "35%",
    float: "right",
  },
  cognifiHead: {
    fontFamily: "GoogleSans-Regular",
  },
  LoginImage: {
    position: "absolute",
    // maxHeight: "85%",
    // maxWidth: "85%"
    width: "68%",
    height: "100%",
  },
}

function Login(props) {
  // login Component
  const formRef = useRef(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const classes = useClasses(styles);
  const dispatch = useDispatch();
  // VIVEK - BCRYPT
  // var bcrypt = require("bcryptjs");

  function encryptData(plaintext) {
    const iv = crypto.randomBytes(16);
    const key = crypto.pbkdf2Sync("QDEKEY1234543210", iv, 65536, 16, "sha1");
    var cipher = crypto.createCipheriv("aes-128-gcm", key, iv);
    
    var encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
    var tag = cipher.getAuthTag();

    console.group("Cipher Data")
    console.log("Cipher:-", cipher.final())
    console.log("Encrypted Text:-", encrypted);
    console.log("Tag Text:-", tag);
    console.log("Cipher Text:-", Buffer.concat([iv, encrypted, tag]).toString("base64"))
    console.groupEnd()
    return Buffer.concat([iv, encrypted, tag]).toString("base64");
  }

  const handleSubmit = (data, resetForm, invalidateForm) => {
    //console.log("data =", data);
    setIsSubmitting(true);
    const encryptedPassword = encryptData(data.userPassword);
    //console.log("passowrd =", encryptedPassword);
    data.userPassword = encryptedPassword;
    const submit = dispatch(
      submitLogin(data, props.loadingHandler ? props.loadingHandler : null)
    );

    submit.then((response) => {
      if (
        (response !== undefined &&
          response.payload &&
          response.payload.status === 500)
      ) {
        invalidateForm({
          username: "Enter Valid Username",
          password: "Enter Valid Password",
        });

        alert("Username and Password does not match");
        setIsSubmitting(false);

      } else if (response !== undefined) {
        setIsSubmitting(false);
        alert("Something went wrong");
      } else {
        setIsSubmitting(false);
      }
    });
  };

  const onInValidSubmit = () => {
    setIsFormValid(false);
    // console.log("triggerds");
  };

  return (
    <div className="flex h-[100vh] bg-[#f8f8f8]">
      <div className="w-1/2 flex justify-end">
        <div className='login-image bg-[#F5FBFF] items-start flex flex-col h-[95vh] p-0 w-[70%]'>
          <div className="px-[30px] mt-[120px] mb-[20px]">
            <img
              src={Cognifi_Logo_Animated}
              alt="Login page"
              className="w-[75%] h-auto mt-[20px]"
            />
          </div>
          <div className="px-[30px] flex mt-[120px] pt-0 ">
            <Typography className="font-semibold"
              style={{
                fontSize: "16px",
                fontFamily: "GoogleSans-Regular",
              }}
            >
              Version 0.1
            </Typography>
          </div>
          
          <div className="px-[30px] mt-[50px]">
            <div className="flex mb-5">
              <img className="w-[70%] p-0 m-0" src={QDE_LOGO} alt="QDE" />
            </div>  
            <a
              href="https://www.quantumdataengines.com/"
              className="flex no-underline text-gray-900"
            >
              <Typography className="font-semibold"
                style={{ fontSize: "14px", fontFamily: "GoogleSans-Regular"}}
              >
                www.quantumdataengines.com
              </Typography>
            </a>
          </div>
        </div>
        
      </div>
      <div className='w-1/2 items-center flex'>
        {/* <div className="logo-area pt-1 pb-8 text-center">
          <div className="flex justify-center mr-50 mt-12">
            <img src={Cognifi_Logo_Animated} className="w-1/2" alt="Cognifi" />
          </div>
        </div> */}
        <div className={`${classes.root}text-center mb-0 pb-0 w-[61%]`}>
          <Formsy
            onValidSubmit={(data, resetForm, invalidateForm) =>
              handleSubmit(data, resetForm, invalidateForm)
            }
            onValid={() => setIsFormValid(true)}
            onInvalid={() => onInValidSubmit()}
            ref={formRef}
            className="w-full"
          >
            <FormControl variant="outlined" sx={customStyles.root}>
              <TextFieldFormsy
                className='bg-white'
                required
                // onChange={handleChange}
                showError="true"
                errorMessage="lla"
                variant="outlined"
                name="userName"
                label="User Name"
                validations="isAlphanumeric"
                validationError="Invalid input"
                InputProps={{
                  // className: classes.MuiOutlinedInput,
                  shrink: "true",
                  sx: {fontFamily: 'GoogleSans-Regular'}
                }}
              />
            </FormControl>
            <FormControl variant="outlined" sx={customStyles.root}>
              <TextFieldFormsy
                className='bg-white'
                required
                // onChange={handleChange}
                variant="outlined"
                name="userPassword"
                type="password"
                label="Password"
                InputProps={{
                  // className: classes.MuiOutlinedInput,
                  shrink: "true",
                  classes: {
                    root: classes.textFieldRoot,
                    label: classes.textFieldLabel,
                  },
                }}
              />
            </FormControl>
            <FormControl variant="outlined" 
                sx={customStyles.root}
              >
              <TextFieldFormsy
                className='bg-white'
                select
                variant="outlined"
                name="Bank"
                label="Bank"
                SelectProps={{
                  native: true,
                }}
                InputProps={{
                  // className: classes.MuiOutlinedInput,
                  shrink: "true",
                }}
              >
                <option aria-label="None" value="" />
                <option value="BankOne">Bank 1</option>
                <option value="BankTwo">Bank 2</option>
                <option value="BankThree">Bank 3</option>
              </TextFieldFormsy>
            </FormControl>
            <GenericButton
              type="submit"
              variant="outlined"
              // sx={[customStyles.buttonRoot,customStyles.buttonLabel]}
              className="float-right mr-[55px]"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? <CircularProgress className="my-2 mx-3" size={12} color={'inherit'} /> : "Log in"}
            </GenericButton>
            
          </Formsy>
        </div>
        
        {/* <hr className={classes.bottomLine} />
        
        <a href="https://www.quantumdataengines.com/" className="flex justify-center mt-14" >Forgot Password?</a>*/}
        
      </div>
    </div>
  );
}
export default Login;