import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Timelogo from "../../common/icon/time 1.svg";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Whitestarbtn from "../../component/Whitestarbtn";
import toast from "react-hot-toast";
import Button from 'react-bootstrap/Button';
import Footer from '../../components/footer';
import HeaderMenu from '../../components/headermenu';
import MobileMenu from '../../components/mobilemenu';
import { apiurl, onlyDayMonth, shortPer, app_url, isEmail } from "../../common/Helpers";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
    const Beartoken = localStorage.getItem('userauth');
    const country_name = localStorage.getItem("countryname");
    const pgatway_name = localStorage.getItem("payment_gatway");
    
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
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
        setSubtotal(allItemsTotalPrice);
    }
    const HandelCouponCheck = async () => {
        try {
            if (allItemsTotalPrice && allItemsTotalPrice <= 0) {
                return toast.error("Coupon not applied for free tickets");
            }
            if (!Beartoken) {
                toast.error("Login to your account");
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
                        const checkCartamount = parseInt(allItemsTotalPrice, 10);
                        const checkCouponamount = parseInt(data.data.discount, 10);
                        if (checkCartamount > checkCouponamount) {
                            setDiscountAmount(checkCouponamount);
                            const CountSubtotal = checkCartamount - checkCouponamount;
                            setSubtotal(CountSubtotal);
                        } else if (checkCartamount <= checkCouponamount) {
                            setDiscountAmount(checkCartamount);
                            setSubtotal(0);
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
    const [LoginEmail, setLoginEmail] = useState('');
    const [LoginFname, setLoginFname] = useState('');
    const [LoginLname, setLoginLname] = useState('');
    const [LoginLoader, setLoginLoader] = useState(false);
    const HandelLoginasguest = async () => {
        try {
            if (!LoginEmail || !isEmail(LoginEmail)) {
                return toast.error("Enter valid email");
            }
            if (!LoginFname || !LoginLname) {
                return toast.error("Name is required");
            }
            setLoginLoader(true);
            const requestData = {
                email: LoginEmail,
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
                        localStorage.setItem('userauth', data.token);
                        localStorage.setItem('username', data.username);
                        localStorage.setItem('user_role', 1);
                        setshowLoginasGuest(false);
                        window.location.reload();
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

    useEffect(() => {
        if (moneyLoader) {
            calculateTotalPrice();
        }
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
    console.log("pp", PaymentGatwayname);
    useEffect(() => {
        getUserdata()
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
        const existingItem = cartItems.find((cartItem) => cartItem.name === item.name);

        if (existingItem) {
            // If item already exists in cart, update quantity
            const updatedCart = cartItems.map((cartItem) =>
                cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            );
            setCartItems(updatedCart);
        } else {

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
        if (!cartItems || cartItems.length === 0) {
            setAllItemsTotalPrice(0);
            setEventTotalPrice(0);
            return;
        }
        const total = cartItems.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.price * currentItem.quantity;
        }, 0);
        if (rewardPoints) {
            // Calculate discount amount
            // const discountAmount = (total * DiscountPer) / 100;
            const discountAmount = rewardPoints;

            // Calculate subtotal after discount
            const subtotal = total - discountAmount;

            // Round the subtotal to the nearest whole number
            const roundedSubtotal = Math.round(subtotal);

            // Set the total price with the rounded subtotal
            setAllItemsTotalPrice(total);

            // You may want to set the discount amount and subtotal in state as well if needed
            setDiscountAmount(discountAmount);
            setSubtotal(roundedSubtotal);
        } else {
            // If no discount, set the total directly
            setAllItemsTotalPrice(total);

            // Reset discount amount and subtotal if needed
            setDiscountAmount(0);
            setSubtotal(total);
        }
    };

    const saveCartToLocalStorage = async () => {
        try {
            if(!pgatway_name){
                toast.error("Server issue try again");
                localStorage.removeItem('cart')
                navigate(app_url);
            }
            if (!Beartoken) {
                toast.error("Login to your account");
                // navigate(app_url + 'auth/customer/login');
                setshowLoginasGuest(true);
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
                    'Authorization': `Bearer ${Beartoken}`, // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        if(data.payment_type && data.payment_type == "Free"){
                            localStorage.removeItem('payment_gatway');
                            localStorage.removeItem('cart')
                            localStorage.setItem("paymentid_token", data.payment_id);
                            navigate(app_url + 'order-successful-page');
                        }else{
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
                toast.error("Login to your account");
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

    return (
        <>
            {" "}
            <HeaderMenu />
            <div className="mx-lg-4 my-lg-3 bg-primary-color rounded-8 position-relative" style={{ height: '150px' }}>
                <MobileMenu />
            </div>
            <div>
                <Row className="mt-5 mx-lg-4 my-lg-3 ">
                    <Col md={12}>
                        <h2 className="Your-cart-text font-weight-bold">Your cart</h2>
                    </Col>
                    <Col md={12}>
                        {cartItems.length > 0 ? (
                            <>
                                <Row>
                                    <Col md={8}>
                                        {cartItems.map((item, index) => (
                                            <div>
                                                <Card>
                                                    <Card.Body>
                                                        <div className="cart-details-box">
                                                            <div className="right-box-con in-event-page-cart-sec">
                                                                <Row>
                                                                    <Col md={12}>
                                                                        <p className="Ticket-title">{item.event.display_name} | <span><img height={20} width={20} src={Timelogo} alt="" /></span>Event Time - {item.event.start_time}</p>
                                                                    </Col>
                                                                    <Col md={4}>
                                                                        <p className="mb-0 cart-ticket-name">{item.name}</p>
                                                                    </Col>
                                                                    <Col md={4}>
                                                                        <span className="cart-price">Price : ${item.price}</span>
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
                                            </div>
                                        ))}
                                    </Col>
                                    <Col md={4}>
                                        {amountLoader ? (
                                            <div className="linear-background w-100"> </div>
                                        ) : (
                                            <div className="cart-amount-box">
                                                <Card>
                                                    <Card.Body>
                                                        <Row>
                                                            <Col md={6} className="my-2">
                                                                <h5 className="cart-amount-small-title">Subtotal</h5>
                                                            </Col>
                                                            <Col md={6} className="my-2 text-end">
                                                                <h5 className="cart-amount-small-amount">Rs. {allItemsTotalPrice}</h5>
                                                            </Col>
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
                                                            {DiscountAmount ? (
                                                                <>
                                                                    <Col md={6} className="my-2">
                                                                        <h5 className="cart-amount-small-title">Discount</h5>
                                                                    </Col>
                                                                    <Col md={6} className="my-2 text-end">
                                                                        <h5 className="cart-amount-small-amount">{DiscountAmount}</h5>
                                                                    </Col>
                                                                </>
                                                            ) : ''}
                                                            <Col md={12} className="py-3">
                                                                <div className="border-bottom"></div>
                                                            </Col>
                                                            <Col md={6}>
                                                                <h3 className="cart-amount-small-title theme-color font-600">Total</h3>
                                                            </Col>
                                                            <Col md={6} className="text-end">
                                                                <h3 className="cart-amount-small-amount theme-color font-600">Rs. {Subtotal}</h3>
                                                            </Col>
                                                            <Col md={12} style={{ borderTop: '1px solid #eee' }} className="pt-3">
                                                                <Row>
                                                                    <Col md={8}>
                                                                        <input className="form-control" readOnly={Iscoupon} type="text" placeholder="Enter coupon code" onChange={(e) => setCouponId(e.target.value)} value={CouponId}></input>
                                                                    </Col>
                                                                    <Col md={4}>
                                                                        {CouponCheckLoader ? (
                                                                            <button className="btn btn-primary w-100" type="button">Wait..</button>
                                                                        ) : (
                                                                            <>
                                                                                {Iscoupon ? (
                                                                                    <button onClick={() => HandelRemoveToken()} type="button" className="btn btn-danger w-100" >Remove</button>
                                                                                ) : (
                                                                                    <button onClick={() => HandelCouponCheck()} type="button" className="btn btn-primary w-100" >Apply</button>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col md={12}>
                                                                {ApiLoader ? (
                                                                    <Button className='signup-page-btn'>Please wait...</Button>
                                                                ) : (
                                                                    <>
                                                                        {IsCountryName ? (
                                                                            <div className="mt-3 paynow-btn-box">
                                                                                <span onClick={() => saveCartToLocalStorage()}>
                                                                                    <Whitestarbtn title={'Pay now'} />
                                                                                </span>
                                                                            </div>
                                                                        ) : (
                                                                            <button type="button" className="btn btn-dark w-100">Select country</button>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </Col>
                                                            {showLoginasGuest ? (
                                                                <Col md={12} style={{ borderTop: '1px solid #eee' }} className="mt-3 pt-4">
                                                                    <Row>
                                                                        <Col md={12}>
                                                                            <div className="form-group">
                                                                                <p>Email Address</p>
                                                                                <input className="form-control" type="text" placeholder="Email Address" onChange={(e) => setLoginEmail(e.target.value)} value={LoginEmail}></input>
                                                                            </div>
                                                                        </Col>
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
                                                                        <Col md={12}>
                                                                            {LoginLoader ? (
                                                                                <button className="btn btn-primary w-100" type="button">Please wait...</button>
                                                                            ) : (
                                                                                <button className="btn btn-primary w-100" type="button" onClick={() => HandelLoginasguest()}>Login as guest</button>
                                                                            )}
                                                                        </Col>
                                                                        <Col md={12} className="mt-2">
                                                                            <p className="forgot-password-text">Already have an account? <Link to={app_url + 'auth/login-signup'} className='reset-password-link'>Log In/Sign Up</Link></p>
                                                                        </Col>
                                                                    </Row>
                                                                    {/* /customer/login-as-guest */}
                                                                </Col>
                                                            ) : ''}
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
                                    <Card>
                                        <Card.Body>
                                            <h2 className="text-danger " style={{ fontWeight: '600' }}>Your cart is empty !</h2>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        )}
                    </Col>
                </Row>
            </div>
            <Footer />
        </>
    );
};

export default Home;