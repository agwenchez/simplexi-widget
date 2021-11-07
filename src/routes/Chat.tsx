import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
// import style from './contactForm.css';
// import { ConfigContext, ServiceContext } from '../AppContext';
// import Field from '../components/Field';
// import { useIsMounted } from '../hooks';
// import { RouteLink, RouterContext } from '../layout/Router';

const Chat = () => {
    const [user, setUser] = useState({})


    // useEffect(() =>{
    //     const user_data = localStorage.getItem('user_data')
    //     setUser(user_data)
    //     console.log("Local storage data",user);
    // },[]) 
    // const config = useContext(ConfigContext);
    // const service = useContext(ServiceContext);
    // const router = useContext(RouterContext);
    // const mounted = useIsMounted();

    // const [submitting, setSubmitting] = useState(false);
    // const [serverError, setServerError] = useState('');

    // const [emailValue, setEmailValue] = useState('');
    // const emailError = useMemo(
    //     () =>
    //         mounted.current && (!emailValue || !/^\S+@\S+$/.test(emailValue))
    //             ? 'Email is required and must be valid'
    //             : '',
    //     [emailValue, submitting, mounted]
    // );

    // const [passwordValue, setPasswordValue] = useState('');
    // const messageError = useMemo(
    //     () =>
    //         mounted.current && (!passwordValue || passwordValue.length < 5)
    //             ? 'Name is required and must contain at least 5 characters'
    //             : '',
    //     [passwordValue, submitting, mounted]
    // );

    // const formValid = useMemo(
    //     () => ![emailError, messageError].reduce((m, n) => m + n),
    //     [emailError, messageError]
    // );

    // useEffect(() => {
    //     if (!submitting) {
    //         return;
    //     }
    //     setServerError(''); // reset previous server error
    //     if (!formValid) {
    //         setSubmitting(false);
    //         return;
    //     }

    //     console.log('Form values', { emailValue, passwordValue });
    //     const values = { email: emailValue, password: passwordValue };
    //     localStorage.setItem('user_data', JSON.stringify(values));

    //     console.log('Local storage data', localStorage.getItem('user_data'));
    //     // setSubmitting(false)

    //     service
    //         ?.sendForm({ email: emailValue, message: passwordValue })
    //         .then(() => {
    //             router.setRoute('/thankyou');
    //         })
    //         .catch(() => {
    //             setServerError(
    //                 `Something went wrong and we couldn't send your form. Please try again later.`
    //             );
    //         })
    //         .then(() => setSubmitting(false));
    // }, [formValid, submitting, emailValue, passwordValue, service]);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', }}> 
            <p>
                <Fragment>Welcome, let's chat</Fragment>
            </p>

            <div style={{position:'absolute', bottom: '10px', width:'94%',alignSelf: 'center'}}>
                <input type="text" name="chat_message" id="chat_message" />
            </div>
        </div>
    );
};

export default Chat;
