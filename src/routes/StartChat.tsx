import { h, Fragment } from 'preact';
import { useContext, useState, useMemo, useEffect } from 'preact/hooks';
import style from './contactForm.css';
import { ConfigContext, ServiceContext } from '../AppContext';
import Field from '../components/Field';
import { useIsMounted } from '../hooks';
import { RouteLink, RouterContext } from '../layout/Router';

const StartChat = () => {
    const config = useContext(ConfigContext);
    const service = useContext(ServiceContext);
    const router = useContext(RouterContext);
    const mounted = useIsMounted();

    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState('');

    const [emailValue, setEmailValue] = useState('');
    const emailError = useMemo(
        () =>
            mounted.current && (!emailValue || !/^\S+@\S+$/.test(emailValue))
                ? 'Email is required and must be valid'
                : '',
        [emailValue, submitting, mounted]
    );

    const [passwordValue, setPasswordValue] = useState('');
    const messageError = useMemo(
        () =>
            mounted.current && (!passwordValue || passwordValue.length < 5)
                ? 'Name is required and must contain at least 5 characters'
                : '',
        [passwordValue, submitting, mounted]
    );

    const formValid = useMemo(
        () => ![emailError, messageError].reduce((m, n) => m + n),
        [emailError, messageError]
    );

    useEffect(() => {
        if (!submitting) {
            return;
        }
        setServerError(''); // reset previous server error
        if (!formValid) {
            setSubmitting(false);
            return;
        }

        console.log('Form values', { emailValue, passwordValue });
        const values = {email:emailValue, password:passwordValue};
        localStorage.setItem('user_data', JSON.stringify(values))

        // console.log("Local storage data", localStorage.getItem('user_data'));
        // setSubmitting(false)

        service
            ?.sendForm({ email: emailValue, message: passwordValue })
            .then(() => {
                router.setRoute('/thankyou');
            })
            .catch(() => {
                setServerError(
                    `Something went wrong and we couldn't send your form. Please try again later.`
                );
            })
            .then(() => setSubmitting(false));
    }, [formValid, submitting, emailValue, passwordValue, service]);

    return (
        <div>
            <p style={{ marginBottom:'50px'}}>
                {config.text.formSubTitle ?? (
                    <Fragment>
                        Start a conversation with one of our agents or<RouteLink href="/"> send us a message </RouteLink>.
                    </Fragment>
                )}
            </p>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitting(true);
                }}
            >
                {serverError && (
                    <div className={style.error}>{serverError}</div>
                )}
                <Field
                    name="name"
                    title="Name"
                    error={messageError}
                    render={(inputProps) => (
                        <input
                            type="text"
                            inputMode="text"
                            placeholder="John Doe"
                            disabled={submitting}
                            autoFocus
                            autoComplete="disable"
                            onInput={(e) =>
                                setPasswordValue(e.currentTarget.value)
                            }
                            {...inputProps}
                        />
                    )}
                />
                <Field
                    name="email"
                    title="Email"
                    error={emailError}
                    render={(inputProps) => (
                        <input
                            type="text"
                            inputMode="email"
                            disabled={submitting}
                            placeholder="me@home.com"
                            onInput={(e) =>
                                setEmailValue(e.currentTarget.value)
                            }
                            {...inputProps}
                        />
                    )}
                />

                <div className={style.button}>
                    <button
                        style={{ paddingLeft: 74, paddingRight: 74 }}
                        type="submit"
                        disabled={submitting || !formValid}
                    >
                        {submitting ? 'Sending...' : 'Start conversation'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StartChat;
