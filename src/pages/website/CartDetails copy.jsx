import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Timelogo from "../../common/icon/time 1.svg";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Whitestarbtn from "../../component/Whitestarbtn";
import { apiurl, app_url, isEmail, organizer_url } from '../../common/Helpers';
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
const Page = ({ title }) => {
    const Beartoken = localStorage.getItem('userauth');
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [isFirstRender, setIsFirstRender] = useState(false);
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
            const maxLimit = userwalletbal; // You can replace this with your dynamic maximum value
            if (numericValue <= maxLimit) {
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
        }else{
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
            if (!Beartoken) {
                toast.error("Login to your account");
                navigate(app_url + 'auth/customer/signup');
                return;
            }
            setApiLoader(true);
            const requestData = {
                totalamount: Subtotal,
                cartitem: cartItems,
                gatway_name: "Stripe",
                location: "India",
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
                        localStorage.removeItem('cart')
                        localStorage.setItem("paymentid_token", data.payment_id)
                        window.location.href = data.url;
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
    return (
        <div className="content-data">
            <Container>
                <Row className="mt-5">
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
                                                            {Iswallet ? (
                                                                <>
                                                                    <Col md={12}>
                                                                        <div class="widget-stat card bg-success">
                                                                            <div class="card-body p-2">
                                                                                <div class="media">
                                                                                    <span class="me-3">
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
                                                            ) : ''}
                                                            {WantRedeem ? (
                                                                <Col md={12} className="mb-3">
                                                                    <h3 className="cart-amount-small-title theme-color font-600">Reward Points</h3>
                                                                    <input type="text" class="form-control" placeholder="Enter Reward Points"
                                                                        value={rewardPoints}
                                                                        onChange={handleInputChange}
                                                                    />
                                                                </Col>

                                                            ) : ''}
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

                                                            <Col md={12}>
                                                                {ApiLoader ? (
                                                                    <Button className='signup-page-btn'>Please wait...</Button>
                                                                ) : (
                                                                    <div className="mt-3 paynow-btn-box">
                                                                        <span onClick={() => saveCartToLocalStorage()}>
                                                                            <Whitestarbtn title={'Pay now'} />
                                                                        </span>
                                                                    </div>
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
                                    <Card>
                                        <Card.Body>
                                            <div class="alert alert-danger solid alert-dismissible fade show">
                                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="me-2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                                                Your cart is empty !
                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="btn-close">
                                                </button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Page;