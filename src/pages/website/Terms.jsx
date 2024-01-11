import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BannerComponent from '../../component/BannerTop';
const Page = ({ title }) => {
    return (
        <div className="content-data">
            <Container>
                <Row>
                <BannerComponent title={title}/>
                    <Col md={12} className="p-5 mt-5 mb-5">
                        <div>
                            <div class="summernote-content">
                                <p >Welcome to Tixme. These terms and conditions outline the rules and regulations for the use of our website.</p>
                                <h5>1. Acceptance of Terms</h5>
                                <p >By accessing and using our website, you agree to be bound by these terms and conditions. If you do not agree to these terms and conditions, you should not use our website.</p>
                                <h5>2. Intellectual Property</h5>
                                <p >All intellectual property rights in the website and the content published on it, including but not limited to copyright and trademarks, are owned by us or our licensors. You may not use any of our intellectual property without our prior written consent.</p>
                                <h5>3. User Content</h5>
                                <p >By submitting any content to our website, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, distribute, and display such content in any media formats and through any media channels.</p>
                                <h5>4. Disclaimer of Warranties</h5>
                                <p >Our website and the content published on it are provided on an "as is" and "as available" basis. We do not make any warranties, express or implied, regarding the website, including but not limited to the accuracy, reliability, or suitability of the content for any particular purpose.</p>
                                <h5>5. Limitation of Liability</h5>
                                <p >We shall not be liable for any damages, including but not limited to direct, indirect, incidental, punitive, and consequential damages, arising from the use or inability to use our website or the content published on it.</p>
                                <h5>6. Modifications to Terms and Conditions</h5>
                                <p >We reserve the right to modify these terms and conditions at any time without prior notice. Your continued use of our website after any such modifications indicates your acceptance of the modified terms and conditions.</p>
                                <h5>7. Governing Law and Jurisdiction</h5>
                                <p >These terms and conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which we operate, without giving effect to any principles of conflicts of law. Any legal proceedings arising out of or in connection with these terms and conditions shall be brought solely in the courts located in the jurisdiction in which we operate.</p>
                                <h5>8. Termination</h5>
                                <p >We may terminate or suspend your access to our website immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these terms and conditions.</p>
                                <h5>9. Contact Information</h5>
                                <p >If you have any questions or comments about these terms and conditions, please contact us at info@tixme.co</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Page;