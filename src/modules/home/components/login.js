import React, { useState, useEffect } from "react";
import { Grid, Icon, Modal, Button, Dimmer, Loader } from "semantic-ui-react";
import imgage from "../../../images/loginpageImg.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLinkedinKeys, sendLinkedInCode, userReactLogin } from "../data/actions";
import {
    getIsAuthFetched,
    getIsCodeSendResponse,
    getIsKeysFetched,
    getIsLikedinKeysResponse,
    getIsReactLoginResponse,
} from "../data/selectors";
import "./login.css";

const Login = ({ setSessionUserId }) => {
    const [clientId, setClientId] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [redirectUri, setRedirectUri] = useState("");
    const [authCallOnce, setAuthCallOnce] = useState(false);
    const [scope, setScope] = useState("r_emailaddress,r_liteprofile");
    const [loader, setLoader] = useState({ open: false, msg: "" });

    const getLinkedInKeys = useSelector((state) =>
        getIsLikedinKeysResponse(state)
    );
    const getLoginAuthRes = useSelector((state) => getIsCodeSendResponse(state));
    const getAuthResFetched = useSelector((state) => getIsAuthFetched(state));
    const getKeysFetched = useSelector((state) => getIsKeysFetched(state));
    const reactLoginRes = useSelector((state) => getIsReactLoginResponse(state));

    const navigate = useNavigate();
    const dispatch = useDispatch();



    const getUrl = window.location.href;



    useEffect(() => {

        let code = getUrl
            ? getUrl.split("var=")[1]
                ? getUrl.split("var=")[1]
                : ""
            : "";
        if (code) {
            const decodedString = atob(code)
            if (decodedString) {
                dispatch(userReactLogin(decodedString))
                setLoader({ open: true, msg: "Loging in..." })
            }
            // if (getUrl && getUrl.includes("var=")) {
            //     if (code) {
            //         let obj = {};
            //         obj.code = code;
            //         if (!authCallOnce) {
            //             dispatch(sendLinkedInCode(obj));
            //             setAuthCallOnce(true)
            //             setLoader({ open: true, msg: "Loging in..." })
            //         }
            //     }
            // }

        }


    }, [getUrl]);


    useEffect(() => {
        if (
            reactLoginRes
        ) {
            if (reactLoginRes.status === "success") {
                if (reactLoginRes.id) {
                    setSessionUserId(reactLoginRes.id)
                    localStorage.setItem("userid", reactLoginRes.id)
                }
                if (reactLoginRes.fname) {
                    localStorage.setItem("username", reactLoginRes.fname)
                }
                setLoader({ open: false, msg: "" })
                setTimeout(() => {
                    navigate("/welcome");
                }, 500)

            }
            if (reactLoginRes.status === "failed") {
                setLoader({ open: false, msg: "" })
            }
        }
    }, [reactLoginRes]);

    // useEffect(() => {
    //     if (getLinkedInKeys && getLinkedInKeys !== undefined && getLinkedInKeys !== null) {
    //         if (getLinkedInKeys.status === "success") {
    //             if (getLinkedInKeys.data && getLinkedInKeys.data !== undefined) {
    //                 setClientId(getLinkedInKeys.data.client_id)
    //                 setClientSecret(getLinkedInKeys.data.client_secret)
    //                 setRedirectUri(getLinkedInKeys.data.redirecturi)
    //             }
    //         }
    //     }

    // }, [getLinkedInKeys])

    const signUpWithLinkedFunction = () => {
        window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(
            scope
        )}`;
    };

    return (
        <div>
            {/* <div className="get-started">
                <div className="getlista-wrapper">
                    <span className="getlist-login">getlist</span>
                    <span className="a-bracket">{`{a}`}</span>
                </div>
                <div className="get-started-divider" />
                <b className="is-gateway-to">is gateway to #openweb</b>
                <b className="finds-anyone-from"> finds anyone, from anywhere</b>
                <Grid>
                    <Grid.Row style={{ marginTop: "-60px" }}>
                        <Grid.Column width={9}>
                            <img className="left-grid" alt="" src={imgage} />
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <div className="right-grid">
                                <div className="get-started-parent">
                                    <div className="sign-up-with">Get Started</div>

                                    <button
                                        className="linkedin-btn"
                                        onClick={() => signUpWithLinkedFunction()}
                                    >
                                        <Icon name="linkedin" size="large" />
                                        <div className="sign-up-with">Sign up with Linkedin</div>
                                    </button>
                                </div>
                                <div className="login-ul-container">
                                    <ul className="login-page-ul">
                                        <li>Touch base with 500 Million people across globe</li>
                                        <li>Find the perfect person for your company</li>
                                        <li>Pay as go</li>
                                        <li>Find their contact details</li>
                                        <li>{`Engage with them on the fly `}</li>
                                    </ul>
                                </div>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row></Grid.Row>
                </Grid>
            </div>
            <footer className="getlista-2023-">{`© getlist{a} 2023 - All rights reserved.`}</footer> */}
            <div className="dimmer-loader-container">
                {loader.open && (
                    <Dimmer inverted active>
                        <Loader active>{loader.msg}</Loader>
                    </Dimmer>
                )}
            </div>
        </div>
    );
};

export default Login;
