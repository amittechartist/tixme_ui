import React, { useState } from "react";
import JoinStartButton from "../../../common/elements/JoinStartButton";
import whitestar from '../../../common/icon/whitestar.svg';
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import toast from 'react-hot-toast';
import { apiurl,admin_url } from '../../../common/Helpers';
import { Link } from "react-router-dom";
const Dashboard = ({ title }) => {
    const [Categoryname, setCategoryname] = useState();
    const [Loader, setLoader] = useState(false);
    const HandelForm = async () => {
        try {
            if (!Categoryname) {
                return toast.error('Category is required');
            }
            setLoader(true);
            const requestData = {
                name: Categoryname,
                isdelete: 0
            };
            fetch(apiurl + 'category/create-category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    setLoader(false);
                    if (data.success == true) {
                        toast.success('Created successful', {
                            duration: 3000,
                        });
                        setCategoryname('');
                    } else {
                        toast.error(data.message);
                    }
                })
                .catch(error => {
                    setLoader(false);
                    toast.error('Insert error: ' + error.message);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Api error:', error);
        }
    };
    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <div className="page-titles">
                        <Link className="page-theme-btn position-right" to={admin_url+'all-category'}>Show category</Link>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">{title}</li>
                        </ol>
                    </div>
                    <Row className="justify-content-center">
                        <Col md={12}>
                            <Card className="py-4">
                                <Card.Body>
                                    <Row className="justify-content-center">
                                        <Col md={4}>
                                            <div>
                                                <label htmlFor="" className="text-black">Category name</label>
                                                <input type="text" class="form-control input-default" placeholder="Category name" value={Categoryname} onChange={(e) => setCategoryname(e.target.value)} />
                                            </div>
                                            <div>
                                                {Loader ? (
                                                    <Button variant="link" className="button-join" type="button">
                                                        <span>
                                                            <span className="bg-style"><img height={30} width={30} src={whitestar} /></span><span className="bg-style bg-title-style">Please wait...</span>
                                                        </span>
                                                    </Button>
                                                ) : (
                                                    <Button variant="link" onClick={HandelForm} className="button-join" type="button">
                                                        <span>
                                                            <span className="bg-style"><img height={30} width={30} src={whitestar} /></span><span className="bg-style bg-title-style">Add category</span>
                                                        </span>
                                                    </Button>
                                                )}

                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>

        </>
    )
}
export default Dashboard;