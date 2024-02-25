import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Row from 'react-bootstrap/Row';
import Timelogo from "../../common/icon/time 1.svg";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Nocart from '../../component/Nocart';
import toast from "react-hot-toast";
import Button from 'react-bootstrap/Button';
import Footer from '../../components/footer';
import HeaderMenu from '../../components/headermenu';
import MobileMenu from '../../components/mobilemenu';
import CartBG from '../../common/image/Cart BG.svg'
import calendar from "../../assets/calendar.svg";
import TopIcon from "../../assets/new/top.png"
import arrow from "../../assets/arrow.svg";
import { apiurl, app_url, isEmail, get_percentage } from "../../common/Helpers";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
    const Beartoken = localStorage.getItem('userauth');
    const country_name = localStorage.getItem("countryname");
    const EventCartId = localStorage.getItem("cart_insert_id");

    const pgatway_name = localStorage.getItem("payment_gatway");
    const currency_symble = localStorage.getItem("currency_symble");
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const navigate = useNavigate();
    const [Loginmodal, setLoginmodal] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [GuestToken, setGuestToken] = useState();
    const [LoginToken, setLoginToken] = useState();
    const [isFirstRender, setIsFirstRender] = useState(false);
    const [showLoginasGuest, setshowLoginasGuest] = useState(false);
    const [IsCountryName, setIsCountryName] = useState(false);
    const [ApiLoader, setApiLoader] = useState(false);
    const [amountLoader, setamountLoader] = useState(false);
    const [moneyLoader, setmoneyLoader] = useState(false);
    const [allItemsTotalPrice, setAllItemsTotalPrice] = useState(0);
    const [DiscountPer, setDiscountPer] = useState(0);
    const [DiscountAmount, setDiscountAmount] = useState(0);
    const [Subtotal, setSubtotal] = useState(0);
    const [userwalletbal, setuserwalletbal] = useState();
    const [Iswallet, setIswallet] = useState(false);
    const [WantRedeem, setWantRedeem] = useState(false);
    const [eventTotalPrice, setEventTotalPrice] = useState(0);
    const [localQuantities, setLocalQuantities] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [rewardPoints, setRewardPoints] = useState('');
    const [PaymentGatwayname, setPaymentGatwayname] = useState('');
    const [TicketsSelledList, setTicketsSelledList] = useState([]);
    const [Loader, setLoader] = useState(false);
    //coupon check
    const [CouponId, setCouponId] = useState('');
    const [CouponData, setCouponData] = useState('');
    const [CustomerCouponData, setCustomerCouponData] = useState('');
    const [Iscoupon, setIscoupon] = useState(false);
    const [CouponCheckLoader, setCouponCheckLoader] = useState(false);
    const HandelRemoveToken = () => {
        setIscoupon(false);
        setCouponId('');
        setCouponData('')
        setDiscountAmount('');
        setSubtotal(Subtotal);
    }
    const HandelCouponCheck = async () => {
        try {
            if (allItemsTotalPrice && allItemsTotalPrice <= 0) {
                return toast.error("Coupon not applied for free tickets");
            }
            if (!Beartoken) {
                console.log("ss");
                // toast.error("Login to your account");
                // navigate(app_url + 'auth/customer/login');
                setshowLoginasGuest(true);
                return;
            }

            if (!CouponId) {
                return toast.error("Enter valid coupon code");
            }
            setCouponCheckLoader(true);
            const requestData = {
                couponno: CouponId,
                total: allItemsTotalPrice
            };
            fetch(apiurl + 'website/check-coupon-valid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Beartoken}`,
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        toast.success("Coupon applied");
                        setCouponData(data.data);
                        setCustomerCouponData(data.customer_coupon);
                        const checkCartamount = Subtotal;
                        const checkCouponamount = parseInt(data.data.discount).toFixed(2);
                        if (checkCartamount > checkCouponamount) {
                            setDiscountAmount(checkCouponamount);
                            const CountSubtotal = checkCartamount - checkCouponamount;
                            setSubtotal(CountSubtotal.toFixed(2));
                        } else if (checkCartamount <= checkCouponamount) {
                            setDiscountAmount(checkCartamount);
                            setSubtotal(0.00);
                        }
                        setIscoupon(true);
                    } else {
                        toast.error(data.message);
                    }
                    setCouponCheckLoader(false);
                })
                .catch(error => {
                    console.error('error:', error);
                    setCouponCheckLoader(false);
                });
        } catch (error) {
            console.error('error:', error);
            setCouponCheckLoader(false);
        }
    }
    //coupon check
    // login as guest
    const [Phonenumber, setPhonenumber] = useState('');
    const [GLoginEmail, setGLoginEmail] = useState('');
    const [GConfirmLoginEmail, setGConfirmLoginEmail] = useState('');
    const [LoginFname, setLoginFname] = useState('');
    const [LoginLname, setLoginLname] = useState('');
    const [LoginLoader, setLoginLoader] = useState(false);
    const [OneTimegettax, setOneTimegettax] = useState(true);
    const HandelLoginasguest = async (e) => {
        e.preventDefault();
        try {
            if (!LoginFname || !LoginLname) {
                return toast.error("Name is required");
            }
            if (!GLoginEmail || !isEmail(GLoginEmail)) {
                return toast.error("Enter valid email");
            }
            if (!GConfirmLoginEmail || !isEmail(GConfirmLoginEmail)) {
                return toast.error("Enter valid confirm email");
            }
            if (GLoginEmail.trim() !== GConfirmLoginEmail.trim()) {
                return toast.error("Email and confirm email must me same");
            }
            if (!Phonenumber || Phonenumber.length < 10) {
                return toast.error("Enter valid phone number");
            }
            setLoginLoader(true);
            const requestData = {
                email: GLoginEmail,
                phonenumber: Phonenumber,
                fname: LoginFname,
                lname: LoginLname,
            };
            fetch(apiurl + 'auth/customer/login-as-guest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        // localStorage.setItem('userauth', data.token);
                        // localStorage.setItem('username', data.username);
                        // localStorage.setItem('user_role', 1);
                        setGuestToken(data.token);
                        setshowLoginasGuest(false);
                        setLoginmodal(!Loginmodal);
                        setApiLoader(true);
                        // window.location.reload();
                    } else {
                        toast.error(data.message);
                    }
                    setLoginLoader(false);
                })
                .catch(error => {
                    console.error('error:', error);
                    setLoginLoader(false);
                });
        } catch (error) {
            console.error('error:', error);
            setLoginLoader(false);
        }
    }
    // login as guest
    // get-taxes
    const [taxlist, setTaxlist] = useState([]);
    const [TaxlistLoader, setTaxlistLoader] = useState(true);
    const [totaltaxamount, setTotaltaxamount] = useState();
    const getTaxes = async () => {
        try {
            const requestData = {
                eventid: EventCartId,
            };
            setTaxlistLoader(true);
            fetch(apiurl + 'order/get-taxes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setTaxlist(data.data);
                        if (data.data) {
                            const totalTax = data.data.reduce((accumulator, item) => {
                                return accumulator + (item.taxamount || 0);
                            }, 0);
                            setTotaltaxamount(totalTax);
                        }
                    }
                    setTaxlistLoader(false);
                    setOneTimegettax(false)
                })
                .catch(error => {
                    console.error('error:', error);
                    setTaxlistLoader(false);
                    setOneTimegettax(false)
                });
        } catch (error) {
            console.error('error:', error);
            setTaxlistLoader(false);
            setOneTimegettax(false)
        }
    }
    const fetchData = async (id) => {
        try {
            const requestData = {
                id: id
            };
            setLoader(true);
            fetch(apiurl + 'event/view-event-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setTicketsSelledList(data.orderqtylist)
                    }
                    setLoader(false);
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setLoader(false);
                });
        } catch (error) {
            console.error('Api error:', error);
            setLoader(false);
        }
    }
    useEffect(() => {
        if (GuestToken || LoginToken) {
            saveCartToLocalStorage();
        }
    }, [GuestToken, LoginToken]); // Added taxlist as a dependency
    useEffect(() => {
        if (OneTimegettax) {

        }

        // Function to calculate and update taxlist with percentage_amount
        const updateTaxListWithPercentage = () => {
            if (taxlist.length > 0 && totaltaxamount > 0) {
                const updatedTaxList = taxlist.map(item => ({
                    ...item,
                    percentage_amount: (item.taxamount / totaltaxamount) * 100
                }));
                setTaxlist(updatedTaxList);
            }
        }

        if (totaltaxamount > 0 && !OneTimegettax) {
            updateTaxListWithPercentage();
            console.log("1");
        }

        calculateTotalPrice();
    }, [totaltaxamount, OneTimegettax]); // Added taxlist as a dependency

    useEffect(() => {
        if (moneyLoader) {
        }
        calculateTotalPrice();
    }, [cartItems, moneyLoader, rewardPoints]);
    useEffect(() => {
        if (isFirstRender) {
            localStorage.setItem('cart', JSON.stringify({ items: cartItems, quantities: localQuantities }));
        }
    }, [cartItems]);

    useEffect(() => {
        if (!country_name) {
            setIsCountryName(false);
        } else {
            setIsCountryName(true);
            if (country_name == "India") {
                setPaymentGatwayname('rezorpay');
            }
            if (country_name == "Singapore") {
                setPaymentGatwayname('hitpay');
            }
            if (country_name == "United states") {
                setPaymentGatwayname('Stripe');
            }
        }
    }, [country_name]);
    useEffect(() => {
        // getUserdata()
        if (localStorage.getItem('inside_cart_id')) {
            fetchData(localStorage.getItem('inside_cart_id'));
        }
        loadCartFromLocalStorage();
        window.scrollTo(0, 0);
    }, []);

    const handleInputChange = (event) => {
        const inputValue = event.target.value;

        // Check if the input is a number
        if (/^\d*$/.test(inputValue)) {
            // Convert inputValue to a number and check if it's less than or equal to the dynamic maximum value
            const numericValue = inputValue === '' ? 0 : parseInt(inputValue, 10);
            const maxLimit = userwalletbal;
            const MinLimit = allItemsTotalPrice;
            if (numericValue <= maxLimit && numericValue <= MinLimit) {
                setRewardPoints(inputValue);
            }
        }
    };


    const handelRedeem = async () => {
        setWantRedeem(true);
    }
    const getUserdata = async () => {
        if (Beartoken) {
            try {
                fetch(apiurl + 'website/get-user-package', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Beartoken}`, // Set the Content-Type header to JSON
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success == true) {
                            setuserwalletbal(data.data)
                            if (data.data > 0) {
                                setIswallet(true);
                            }
                            // setDiscountPer(data.data.discount_amount)
                            setamountLoader(false)
                            setmoneyLoader(true)
                        } else {
                            setmoneyLoader(true)
                        }
                    })
                    .catch(error => {
                        console.error('Insert error:', error);
                        setamountLoader(false)
                        setmoneyLoader(true)
                    });
            } catch (error) {
                console.error('Error:', error);
                setamountLoader(false)
                setmoneyLoader(true)
            }
        } else {
            setmoneyLoader(true)
        }
    }

    const addToCart = (item) => {
        // Initialize cartItems as an empty array if it's undefined
        const totalQuantity = TicketsSelledList.filter((i) => i.ticket_id == item.id)
            .reduce((acc, item) => acc + item.quantity, 0);
        const qty_avl = Number(item.quantity) - Number(totalQuantity);
        console.log(qty_avl, "fuct");
        const existingItem = cartItems.find((cartItem) => cartItem.name === item.name);

        if (existingItem.quantity + 1 <= qty_avl) {
            // If item already exists in cart, update quantity
            const updatedCart = cartItems.map((cartItem) =>
                cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            );
            setCartItems(updatedCart);
        } else {
            toast.error("Cannot add more than the available quantity");
        }
        // Update local quantity state
        setLocalQuantities({
            ...localQuantities,
            [item.name]: (localQuantities[item.name] || 0) + 1,
        });
        setIsFirstRender(true);
    };
    const removeFromCart = (itemName, quantity) => {
        const updatedCart = cartItems.map((cartItem) =>
            cartItem.name === itemName ? { ...cartItem, quantity: cartItem.quantity > 0 ? cartItem.quantity - 1 : 0 } : cartItem
        );

        const filteredCart = updatedCart.filter((cartItem) => cartItem.quantity > 0);
        setCartItems(filteredCart);

        // Update local quantity state
        setLocalQuantities({
            ...localQuantities,
            [itemName]: quantity > 0 ? quantity - 1 : 0,
        });
        setIsFirstRender(true);
    };
    const calculateTotalPrice = () => {
        if (EventCartId) {
            getTaxes();
        }
        if (!cartItems || cartItems.length === 0) {
            setAllItemsTotalPrice(0.00);
            setEventTotalPrice(0.00);
            return;
        }
        let total = cartItems.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.price * currentItem.quantity;
        }, 0);

        total = total.toFixed(2);
        let TotalTax = 0;
        if (totaltaxamount > 0) {
            TotalTax = ((Number(total) * Number(totaltaxamount)) / 100).toFixed(2);
        }
        if (rewardPoints) {
            const discountAmount = rewardPoints;
            const subtotal = parseFloat(total + TotalTax - discountAmount).toFixed(2);
            const roundedSubtotal = parseFloat(subtotal.toFixed(2));
            setAllItemsTotalPrice(total);
            setDiscountAmount(discountAmount);
            setSubtotal(roundedSubtotal);
        } else {
            setAllItemsTotalPrice(total);
            setDiscountAmount(0);
            setSubtotal(parseFloat(Number(total) + Number(TotalTax)).toFixed(2));
        }
        console.log("sss");
    };

    const saveCartToLocalStorage = async () => {
        try {
            if (!pgatway_name) {
                toast.error("Server issue try again");
                localStorage.removeItem('cart')
                navigate(app_url);
            }
            if (!Beartoken && !GuestToken && !LoginToken) {
                // toast.error("Login to your account");
                // navigate(app_url + 'auth/customer/login');
                // setshowLoginasGuest(true);
                setLoginmodal(true);
                setshowLoginasGuest(false);
                return;
            }
            setApiLoader(true);
            const requestData = {
                totalamount: Subtotal > 0 ? Subtotal : 0,
                carttotalamount: allItemsTotalPrice > 0 ? allItemsTotalPrice : 0,
                cartitem: cartItems,
                gatway_name: Subtotal > 0 ? pgatway_name : "Free",
                location: country_name,
                discountamount: DiscountAmount > 0 ? DiscountAmount : 0,
                couponid: CustomerCouponData ? CustomerCouponData._id : null,
                rewardpoints: rewardPoints ? rewardPoints : null
            }
            fetch(apiurl + 'order/stripe/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GuestToken || LoginToken ? GuestToken ? GuestToken : LoginToken : Beartoken}`, // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        if (data.payment_type && data.payment_type == "Free") {
                            localStorage.removeItem('payment_gatway');
                            localStorage.removeItem('cart')
                            localStorage.setItem("paymentid_token", data.payment_id);
                            navigate(app_url + 'order-successful-page');
                        } else {
                            localStorage.removeItem('cart')
                            localStorage.removeItem('payment_gatway');
                            localStorage.setItem("paymentid_token", data.payment_id)
                            window.location.href = data.url;
                        }
                    } else {
                        toast.error(data.data);
                        console.warn(data);
                        setApiLoader(false);
                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setApiLoader(false);
                });
        } catch (error) {
            console.error('Api error:', error);
            setApiLoader(false);
        }

    };
    const loadCartFromLocalStorage = () => {
        // Load cart items, local quantities, and eventId from localStorage
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const { items, quantities } = JSON.parse(storedCart);
            // Check if items and quantities exist in the stored data
            if (items && quantities) {
                setCartItems(items);
                setLocalQuantities(quantities);
            }
        }
    };


    const HandelSavecart = async () => {
        try {
            if (!Beartoken) {
                // toast.error("Login to your account");
                navigate(app_url + 'auth/customer/login');
                return;
            }
            setApiLoader(true);
            const requestData = {
                totalamount: Subtotal,
                cartitem: cartItems
            }
            fetch(apiurl + 'order/cartdata/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Beartoken}`, // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        navigate(`${app_url}cart-details-fill/${data.data}`);
                    } else {
                        toast.error(data.data);
                        setApiLoader(false);
                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setApiLoader(false);
                });
        } catch (error) {
            console.error('Api error:', error);
            setApiLoader(false);
        }

    };
    const handlePhoneChange = (newPhone) => {
        setPhonenumber(newPhone);
    };
    return (
        <>
            {" "}
            <Modal isOpen={Loginmodal} className='modal-dialog-centered modal-xs' toggle={() => setLoginmodal(!Loginmodal)} centered size={showLoginasGuest ? 'md' : 'xl'}>
                <ModalHeader toggle={() => setLoginmodal(!Loginmodal)}>Log In As Guest</ModalHeader>
                <ModalBody>
                    {showLoginasGuest ? (
                        <form onSubmit={HandelLoginasguest}>
                            <div className="row">
                                <Col md={12} style={{ borderTop: '1px solid #eee' }} className="mt-3 pt-4">
                                    <Row>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <p>First Name</p>
                                                <input className="form-control" type="text" placeholder="First Name" onChange={(e) => setLoginFname(e.target.value)} value={LoginFname}></input>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <p>Last Name</p>
                                                <input className="form-control" type="text" placeholder="Last Name" onChange={(e) => setLoginLname(e.target.value)} value={LoginLname}></input>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <p>Email Address</p>
                                                <input className="form-control" type="text" placeholder="Email Address" onChange={(e) => setGLoginEmail(e.target.value)} value={GLoginEmail}></input>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <p>Confirm Email Address</p>
                                                <input className="form-control" type="text" placeholder="Confirm Email Address" onChange={(e) => setGConfirmLoginEmail(e.target.value)} value={GConfirmLoginEmail}></input>
                                            </div>
                                        </Col>

                                        <Col md={12}>
                                            <div className="form-group">
                                                <p>Phone number</p>
                                                <PhoneInput
                                                    country={"us"}
                                                    className="phone-number-with-code"
                                                    enableSearch={true}
                                                    placeholder={"Phone number"}
                                                    autoFormat={true}
                                                    value={Phonenumber}
                                                    onChange={handlePhoneChange}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            HandelLoginasguest(e);
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                        <Col md={12}>
                                            {LoginLoader ? (
                                                <button className="btn btn-primary w-100 my-2" type="button">Please wait...</button>
                                            ) : (
                                                <button className="btn btn-primary w-100 theme-bg  my-2" type="submit">Login as guest</button>
                                            )}
                                        </Col>
                                    </Row>
                                </Col>
                            </div>
                        </form>
                    ) : (
                        <div className="row">
                            <div className='row p-5 py-5 d-flex justify-content-center'>
                                <div className="col-12 col-md-12 col-lg-4 mt-5">
                                    <div className="GetCustomerButtonBox">
                                        <img src={TopIcon} alt="" className="TopLeftImg" />
                                        <h4 class="title-in-cart-view">Login As Guest</h4>
                                        <Link onClick={() => setshowLoginasGuest(true)}><button class="GetLatestUpdateButton CustomerButton  login-pg-btn-cs">
                                            <div class="left text-center">
                                                <small class="ms-2">Log In</small>
                                            </div>
                                            <div class="right">
                                                <img src={arrow} alt="" style={{ width: "15px" }} />
                                            </div>
                                        </button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-12 col-md-12 col-lg-4 mt-5">
                                    <div className="GetCustomerButtonBox">
                                        <img src={TopIcon} alt="" className="TopLeftImg" />
                                        <h4 class="title-in-cart-view">Returning Customer</h4>
                                        <Link to={app_url + 'auth/customer/login'}><button class="GetLatestUpdateButton CustomerButton login-pg-btn-cs" >
                                            <div class="left text-center">
                                                <small class="ms-2">Log In</small>
                                            </div>
                                            <div class="right">
                                                <img src={arrow} alt="" style={{ width: "15px" }} />
                                            </div>
                                        </button></Link>
                                    </div>
                                </div>
                                <div className="col-12 col-md-12 col-lg-4 mt-5">
                                    <div className="GetCustomerButtonBox">
                                        <img src={TopIcon} alt="" className="TopLeftImg" />
                                        <h4 class="title-in-cart-view">New Customer</h4>
                                        <Link to={app_url + 'auth/customer/signup'}><button class="GetLatestUpdateButton CustomerButton login-pg-btn-cs" >
                                            <div class="left text-center">
                                                <small class="ms-2">Sign Up</small>
                                            </div>
                                            <div class="right">
                                                <img src={arrow} alt="" style={{ width: "15px" }} />
                                            </div>
                                        </button></Link>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="form-group col-md-12">
                                <p>Email address</p>
                                <input className="form-control" type="text" placeholder="Email Address" onChange={(e) => setLoginEmail(e.target.value)}></input>
                            </div>
                            <div className="form-group  col-md-12">
                                <p>Password</p>
                                <input className="form-control" type="password" placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)}></input>
                            </div>
                            <div className="col-md-12">
                                {LoginbtnLoader ? (
                                    <button type='button' className="btn theme-bg w-100 text-white">Please wait...</button>
                                ) : (
                                    <button type='button' className="btn theme-bg w-100 text-white" onClick={() => HandelCustomerLogin()}>Login</button>
                                )}
                            </div>
                            <div className="border-bottom py-2"></div>
                            <div className="text-center">OR</div>
                            <div className="text-center">
                                <button type="button" className="btn theme-bg w-100 text-white mt-3" onClick={() => setshowLoginasGuest(true)}>continue as guest</button>
                            </div> */}
                        </div>
                    )}



                </ModalBody>
            </Modal>
            <div className="content-area">
                <HeaderMenu />
                <div className="mx-lg-4 my-lg-3 bg-primary-color rounded-8 position-relative mob-d-none" style={{ height: '150px' }}>
                    <MobileMenu />
                </div>
                <div className="event-view-body">
                    <Row className="mt-5 mx-lg-4 my-lg-3 ">
                        <Col md={12}>
                            <h2 className="Your-cart-text font-weight-bold">Your cart</h2>
                        </Col>
                        <Col md={12}>
                            {Loader ? (
                                <div className="linear-background w-100"> </div>
                            ) : (
                                <>
                                    {cartItems.length > 0 ? (
                                        <>
                                            <Row>
                                                <Col md={8}>
                                                    {screenWidth > 900 ? (
                                                        <>
                                                            {cartItems.map((item, index) => (
                                                                <div className="cart-new-bg mb-3" style={{ position: 'relative' }}>
                                                                    <div className="row cart-new-div">
                                                                        <div className="col-md-12">
                                                                            <div>
                                                                                <Link to={`${app_url}event/${item.event._id}/${item.event.name}`}><p className="Ticket-title col-md-9 mb-0">{item.event.display_name}</p></Link>
                                                                                <div className="row d-flex align-items-center">
                                                                                    <div className="col-3">
                                                                                        <div className="d-flex align-items-center justify-content-center">
                                                                                            <div >
                                                                                                <img height={20} width={20} src={calendar} alt="" />
                                                                                            </div>
                                                                                            <div>
                                                                                                <p className="mb-0 aaa">{item.event.event_subtype_id == 2 ? item.startdate : item.event.start_date}</p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-3">
                                                                                        <div className="d-flex align-items-center  justify-content-center">
                                                                                            <div >
                                                                                                <img height={20} width={20} src={Timelogo} alt="" />
                                                                                            </div>
                                                                                            <div>
                                                                                                {/* <p className="mb-0 aaa">Event Time</p> */}
                                                                                                <p className="mb-0 bbb">{item.event.event_subtype_id == 2 ? item.starttime : item.event.start_time}</p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-3">
                                                                                        <div className="mx-2">
                                                                                            <div className="py-2 eventpage-box-style-event-view text-center d-flex align-items-center justify-content-center">
                                                                                                <p className="mb-0 tc">{item.name}</p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-3 d-md-flex">
                                                                                        <div className="ml-3 text-center">
                                                                                            <p className="mb-0 price-in-cart-page">Price: {item.price > 0 ? currency_symble + ' ' + item.price + '.00' : 'Free'}</p>
                                                                                            <div className="">
                                                                                                <div className="row grediant-border d-flex align-items-center mx-xl-3 mx-0">
                                                                                                    <div className="col-4"><span className="new_cart_btn" onClick={() => removeFromCart(item.name, localQuantities[item.name] || 0)}>-</span></div>
                                                                                                    <div className="col-4"><span>{item.quantity}</span></div>
                                                                                                    <div className="col-4"><span className="new_cart_btn" onClick={() => addToCart(item.ticket)}>+</span></div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <img src={CartBG} style={{ height: '100%', width: '100%', objectFit: 'contain' }} alt="" />
                                                                </div>
                                                            ))}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {cartItems.map((item, index) => (
                                                                <Card>
                                                                    <Card.Body>
                                                                        <div className="cart-details-box">
                                                                            <div className="right-box-con in-event-page-cart-sec">
                                                                                <Row>
                                                                                    <Col md={12}>
                                                                                        <Link to={`${app_url}event/${item.event._id}/${item.event.name}`}><p className="Ticket-title col-md-9 mb-0">{item.event.display_name}</p></Link>
                                                                                        <p className="mb-0">
                                                                                            <span><img height={20} width={20} src={Timelogo} alt="" /></span>Event Time - {item.event.start_time}
                                                                                        </p>
                                                                                    </Col>
                                                                                    <Col md={4}>
                                                                                        {item.price > 0 ? (
                                                                                            <span className="cart-price">{item.name} | Price : {currency_symble} {item.price}.00 </span>
                                                                                        ) : (
                                                                                            <span className="cart-price">{item.name} | Price : Free</span>
                                                                                        )}
                                                                                    </Col>
                                                                                    <Col md={4}>
                                                                                        <div className="d-inline-block">
                                                                                            <span>
                                                                                                <span className="cart-minus cart-btn" onClick={() => removeFromCart(item.name, localQuantities[item.name] || 0)}>-</span>
                                                                                                <span className="cart-number">{item.quantity}</span>
                                                                                                <span className="cart-plus cart-btn" onClick={() => addToCart(item.ticket)}>+</span>
                                                                                            </span>
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </div>
                                                                        </div>
                                                                    </Card.Body>
                                                                </Card>
                                                            ))}
                                                        </>
                                                    )}

                                                </Col>
                                                <Col md={4}>
                                                    {amountLoader ? (
                                                        <div className="linear-background w-100"> </div>
                                                    ) : (
                                                        <div className="cart-amount-box ">
                                                            <Card className="eventpage-box-style-event-view calculation-box">
                                                                <Card.Body >
                                                                    <Row>
                                                                        <div className="my-2 col-6">
                                                                            <h5 className="cart-amount-small-title">Subtotal</h5>
                                                                        </div>
                                                                        <div className="my-2 text-end  col-6">
                                                                            <h5 className="cart-amount-small-amount">{currency_symble} {allItemsTotalPrice}</h5>
                                                                        </div>
                                                                        {/* {Iswallet ? (
                                                                <>
                                                                    <Col md={12}>
                                                                        <div class="widget-stat card" style={{background: '#003b8f'}}>
                                                                            <div class="card-body p-2">
                                                                                <div class="media">
                                                                                    <span class="me-3 text-white">
                                                                                        <i class="flaticon-381-diamond"></i>
                                                                                    </span>
                                                                                    <div class="media-body text-white text-end">
                                                                                        <p class="mb-1">Reward Points</p>
                                                                                        <h3 class="text-white">{userwalletbal}</h3>
                                                                                    </div>
                                                                                </div>
                                                                                <button type="button" onClick={handelRedeem} class="w-100 btn btn-light btn-xs mt-2">Redeem Points</button>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col md={12} className="mb-2">

                                                                    </Col>
                                                                </>
                                                            ) : ''} */}
                                                                        {/* {WantRedeem ? (
                                                                <Col md={12} className="mb-3">
                                                                    <h3 className="cart-amount-small-title theme-color font-600">Reward Points</h3>
                                                                    <input type="text" class="form-control" placeholder="Enter Reward Points"
                                                                        value={rewardPoints}
                                                                        onChange={handleInputChange}
                                                                    />
                                                                </Col>

                                                            ) : ''} */}
                                                                        {allItemsTotalPrice > 0 ? (
                                                                            <>
                                                                                {TaxlistLoader ? (
                                                                                    <div className="linear-background w-100" style={{ height: '100px' }}> </div>
                                                                                ) : (
                                                                                    <>
                                                                                        {taxlist.map((item, index) => (
                                                                                            <>
                                                                                                <div className="my-2 col-md-6 col-6">
                                                                                                    <h5 className="cart-amount-small-title">{item.name}</h5>
                                                                                                </div>
                                                                                                <div className="col-md-6 col-6 my-2 text-end">
                                                                                                    <h5 className="cart-amount-small-amount">{currency_symble} {get_percentage(item.taxamount, allItemsTotalPrice)} </h5>
                                                                                                </div>
                                                                                            </>
                                                                                        ))}

                                                                                    </>
                                                                                )}
                                                                            </>
                                                                        ) : ''}
                                                                        {DiscountAmount ? (
                                                                            <>
                                                                                <div className="my-2 col-6">
                                                                                    <h5 className="cart-amount-small-title">Discount</h5>
                                                                                </div>
                                                                                <div className="my-2 text-end  col-6">
                                                                                    <h5 className="cart-amount-small-amount">{currency_symble} {DiscountAmount}</h5>
                                                                                </div>
                                                                            </>
                                                                        ) : ''}
                                                                        <Col md={12} className="py-3">
                                                                            <div className="border-bottom"></div>
                                                                        </Col>
                                                                        <div className="col-6">
                                                                            <h3 className="cart-amount-small-title theme-color font-600">Total</h3>
                                                                        </div>
                                                                        <div className="col-6 text-end">
                                                                            <h3 className="cart-amount-small-amount theme-color font-600">{currency_symble} {Subtotal}</h3>
                                                                        </div>
                                                                        <Col md={12} style={{ borderTop: '1px solid #eee' }} className="pt-3">
                                                                            <Row>
                                                                                <Col md={12} xl={7}>
                                                                                    <input className="form-control" readOnly={Iscoupon} type="text" placeholder="Enter coupon code" onChange={(e) => setCouponId(e.target.value)} value={CouponId}></input>
                                                                                </Col>
                                                                                <Col md={12} xl={5}>
                                                                                    {CouponCheckLoader ? (
                                                                                        <button className="btn btn-primary w-100" type="button">Wait..</button>
                                                                                    ) : (
                                                                                        <>
                                                                                            {Iscoupon ? (
                                                                                                <button onClick={() => HandelRemoveToken()} type="button" className="btn btn-danger w-100 mt-xl-0 mt-2 theme-bg" >Remove</button>
                                                                                            ) : (
                                                                                                <button onClick={() => HandelCouponCheck()} type="button" className="btn btn-primary w-100 mt-xl-0 mt-2 theme-bg" >Apply</button>
                                                                                            )}
                                                                                        </>
                                                                                    )}
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                        <Col md={12}>
                                                                            {ApiLoader ? (
                                                                                <Button className='w-100 mt-3 btn theme-bg text-white'>Please wait...</Button>
                                                                            ) : (
                                                                                <button onClick={() => saveCartToLocalStorage()} type="button" className="w-100 mt-3 btn theme-bg text-white" >Pay now</button>
                                                                            )}
                                                                        </Col>
                                                                    </Row>
                                                                </Card.Body>
                                                            </Card>
                                                        </div>
                                                    )}
                                                </Col>
                                            </Row>
                                        </>
                                    ) : (
                                        <Row>
                                            <Col md={12}>
                                                <Nocart />
                                            </Col>
                                        </Row>
                                    )}
                                </>
                            )}
                        </Col>
                    </Row>
                </div >
            </div >
            <Footer />
        </>
    );
};

export default Home;