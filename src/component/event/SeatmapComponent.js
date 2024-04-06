import React, { useEffect, useRef, useState } from "react";
import { apiurl, laravel_asset, laravelapi } from '../../common/Helpers';
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, CardHeader, CardBody, Tooltip } from 'reactstrap';
import Draggable from 'react-draggable';
import InputColor from 'react-input-color';
import toast from "react-hot-toast";

const Type = () => {
    const navigate = useNavigate();
    const EventId = localStorage.getItem('event_edit_id');
    const [EditApiloader, setEditApiloader] = useState(false);
    const [SaveBtnLoader, setSaveBtnLoader] = useState(false);
    const [EventData, setEventData] = useState();
    const [TicketData, setTicketData] = useState([]);
    const [Uploadedimage, setUploadedimage] = useState();

    const [modal, setModal] = useState(false);
    const [addRowModal, setAddRowModal] = useState(false);
    const [image, setImage] = useState(null);
    const [NewImage, setNewImage] = useState(false);
    const [oldimage, setoldimage] = useState(null);
    const [StoreImage, setStoreImage] = useState(null);
    const [seatmapHeight, setSeatmapHeight] = useState();
    const [seatmapWidth, setSeatmapWidth] = useState();
    const [sections, setSections] = useState([]);
    const [tooltipOpen, setTooltipOpen] = useState(null);
    const [rotationAngles, setRotationAngles] = useState({});
    const [borderColors, setBorderColors] = useState({});
    const [selectedSection, setSelectedSection] = useState(null);
    const [editingSection, setEditingSection] = useState(null);
    const [seatColor, setSeatColor] = useState('#005aff');
    const [zoomLevel, setZoomLevel] = useState(1);
    console.log(sections);
    const getEventData = async () => {
        try {
            setEditApiloader(true);
            const requestData = {
                id: EventId
            };
            fetch(apiurl + 'event/get-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        const filteredData = data.data.allprice.filter(item => item.isdelete === 0);
                        setTicketData(filteredData);

                        setEventData(data.data);
                        setSeatmapHeight(data.data.pageheight ? data.data.pageheight : null);
                        setSeatmapWidth(data.data.pageweight ? data.data.pageweight : null);
                        if (data.data.seatmapimage) {
                            setImage(data.data.seatmapimage && laravel_asset + data.data.seatmapimage);
                        }
                    }
                    setEditApiloader(false);
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setEditApiloader(false);
                });

        } catch (error) {
            console.error('Api error:', error);
        }
    }
    const getSeatmapData = async () => {
        try {
            setEditApiloader(true);
            const requestData = {
                id: EventId
            };
            fetch(apiurl + 'event/getseatmap', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        if (data.data) {
                            const newSections = data.data.map(seat => ({
                                name: seat.sectionname,
                                rows: seat.rows,
                                seatsPerRow: seat.seatsPerRow,
                                ticketPrice: seat.ticketid, // Assuming ticketPrice should be set to ticketid
                                position: seat.position,
                                seatColor: seat.seatColor,
                                rotationAngle: seat.rotationAngle,
                                ticketName: seat.ticketdetails ? seat.ticketdetails.name : '',
                                ticketCurrentValue: seat.ticketdetails ? seat.ticketdetails.price : 0
                            }));
                            setSections(newSections);
                        }
                    }
                    setEditApiloader(false);
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setEditApiloader(false);
                });

        } catch (error) {
            console.error('Api error:', error);
        }
    }
    const HandelInsert = () => {
        if (NewImage) {
            uploadBannerToServer();
        } else {
            storeSeatmapData();
        }
    }
    const storeSeatmapData = async (imagename) => {
        try {
            setSaveBtnLoader(true);
            const requestData = {
                id: EventId,
                seatdata: sections,
                pageheight: seatmapHeight,
                pageweight: seatmapWidth,
                organizerid: EventData.organizer_id,
                seatmapimage: imagename ? imagename : null,
            };
            fetch(apiurl + 'event/seatmap-create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        console.log("data", data.data);
                        toast.success("Updated");
                    }
                    setSaveBtnLoader(false);
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setSaveBtnLoader(false);
                });

        } catch (error) {
            console.error('Api error:', error);
        }
    }
    const uploadBannerToServer = async () => {
        if (!NewImage) {
            return;
        }
        const formData = new FormData();
        formData.append('image', StoreImage); // 'image' is the parameter name expected by your API
        setSaveBtnLoader(true);
        try {
            const response = await fetch(laravelapi + 'upload-image', {
                method: 'POST',
                body: formData, // No headers needed, as FormData sets the Content-Type to multipart/form-data
            });

            if (!response.ok) {

                toast.error('Image not uploaded try again');
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Image uploaded successfully:', result);
            if (result) {
                setUploadedimage(result.image_name);
                setoldimage(image);
                storeSeatmapData(result.image_name);
                setNewImage(false);
            } else {
                return toast.error('Image not uploaded try again');
            }
            setSaveBtnLoader(false);
        } catch (error) {
            toast.error('Image not uploaded try again');
            console.error('Error uploading the image:', error);
            setSaveBtnLoader(false);
        }
    };
    useEffect(() => {
        if (EventId) {
            getEventData();
            getSeatmapData();
        }
    }, [EventId]);

    const toggleModal = () => {
        setModal(!modal);
    };

    const toggleAddRowModal = () => {
        setAddRowModal(!addRowModal);
        if (addRowModal) {
            setEditingSection(null); // Reset the editing section when closing the modal
        }
    };

    const handleImageChange = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]));
        setStoreImage(event.target.files[0]);
        setNewImage(true);
    };

    const handleCreateSeatmap = () => {
        setModal(false);
    };

    const addSection = (event) => {
        event.preventDefault();
        const sectionData = {
            name: event.target.sectionName.value,
            rows: parseInt(event.target.rows.value),
            seatsPerRow: parseInt(event.target.seatsPerRow.value),
            ticketPrice: event.target.ticketPrice.value,
            position: editingSection ? editingSection.position : { x: 0, y: 0 },
            seatColor: seatColor,
            rotationAngle: editingSection ? editingSection.rotationAngle : 0, // Add this line
            ticketName: TicketData.find(item => item.id === event.target.ticketPrice.value)?.name || '',
            ticketCurrentValue: TicketData.find(item => item.id === event.target.ticketPrice.value)?.price || 0
        };


        if (editingSection) {
            const updatedSections = sections.map(section => {
                if (section.name === editingSection.name) {
                    return { ...section, ...sectionData };
                }
                return section;
            });
            setSections(updatedSections);
        } else {
            setSections([...sections, sectionData]);
        }


        setAddRowModal(false);
        setEditingSection(null);
    };


    // const rotateSection = (sectionName) => {
    //   setRotationAngles({
    //     ...rotationAngles,
    //     [sectionName]: (rotationAngles[sectionName] || 0) + 2
    //   });
    // };
    const rotateSection = (sectionName, direction) => {
        const angleIncrement = direction === 'clockwise' ? 10 : -10;
        const updatedSections = sections.map(section => {
            if (section.name === sectionName) {
                return { ...section, rotationAngle: (section.rotationAngle || 0) + angleIncrement };
            }
            return section;
        });
        setSections(updatedSections);
    };
    const rotateSectionD = (sectionName, direction) => {
        const angleIncrement = 45;
        const updatedSections = sections.map(section => {
            if (section.name === sectionName) {
                return { ...section, rotationAngle: (section.rotationAngle || 0) + angleIncrement };
            }
            return section;
        });
        setSections(updatedSections);
    };
    const handleStop = (sectionName, position) => {
        const updatedSections = sections.map((section) => {
            if (section.name === sectionName) {
                return { ...section, position: { x: position.x, y: position.y } };
            }
            return section;
        });
        setSections(updatedSections);
    };

    const deleteSection = (sectionName) => {
        setSections(sections.filter(section => section.name !== sectionName));
        setSelectedSection(null);
    };

    const editSection = (sectionName) => {
        const sectionToEdit = sections.find(section => section.name === sectionName);
        const ticketData = TicketData.find(item => item.id === sectionToEdit.ticketPrice);
        setEditingSection({
            ...sectionToEdit,
            ticketName: ticketData?.name || '',
            ticketCurrentValue: ticketData?.currentValue || 0
        });
        setSeatColor(sectionToEdit.seatColor);
        setAddRowModal(true);
    };


    const copySection = (sectionName) => {
        const sectionToCopy = sections.find(section => section.name === sectionName);
        const randomNumber = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
        const copiedSection = {
            ...sectionToCopy,
            name: `${sectionToCopy.name}-${randomNumber}`, // Append the random number to the section name
            position: { x: sectionToCopy.position.x + 20, y: sectionToCopy.position.y + 20 } // Adjust the position for the copied section
        };
        setSections([...sections, copiedSection]);
    };


    const zoomIn = () => {
        setZoomLevel((prevZoomLevel) => prevZoomLevel + 0.1);
    };

    const zoomOut = () => {
        setZoomLevel((prevZoomLevel) => Math.max(1, prevZoomLevel - 0.1));
    };

    return (
        <>
            <Row className="pb-2">
                <Col md={12}>
                    <div>
                        <Card>
                            <CardHeader>
                                <Button color="primary" onClick={toggleModal}>Seating</Button>
                                <Button color="secondary" onClick={toggleAddRowModal}>Add Row</Button>
                                {selectedSection && (
                                    <>
                                        {/* <Button className='m-1' color="info" onClick={() => rotateSection(selectedSection)}>Rotate</Button> */}
                                        <Button color="info" onClick={() => rotateSection(selectedSection, 'clockwise')}>Clockwise</Button>
                                        <Button color="info" onClick={() => rotateSection(selectedSection, 'counterclockwise')}>Counterclockwise</Button>
                                        <Button color="info" onClick={() => rotateSectionD(selectedSection)}>45°</Button>
                                        <Button className='m-1' color="danger" onClick={() => deleteSection(selectedSection)}>Delete</Button>
                                        <Button className='m-1' color="warning" onClick={() => editSection(selectedSection)}>Edit</Button>
                                        <Button className='m-1' color="success" onClick={() => copySection(selectedSection)}>Copy</Button>
                                    </>
                                )}
                                {SaveBtnLoader ? (
                                    <Button className='m-1' type="button" color="success">Wait...</Button>
                                ) : (
                                    <Button className='m-1' type="button" color="success" onClick={() => HandelInsert()}>save</Button>
                                )}

                            </CardHeader>
                            <CardBody>
                                <div style={{ overflow: 'auto', width: '100%', height: '100%' }}>
                                    <div
                                        style={{
                                            width: `${seatmapWidth}px`, // Update this line
                                            height: `${seatmapHeight}px`, // Update this line
                                            // width: `${seatmapWidth * zoomLevel}px`, // Update this line
                                            // height: `${seatmapHeight * zoomLevel}px`, // Update this line
                                            backgroundImage: `url(${image})`,
                                            backgroundSize: '100% 100%',
                                            backgroundRepeat: 'no-repeat',
                                            position: 'relative',
                                            // transform: `scale(${zoomLevel})`,
                                            transformOrigin: 'top left', // Add this line
                                        }}
                                    >
                                        {sections.map((section, index) => (
                                            <Draggable
                                                key={section.name}
                                                position={section.position}
                                                onStop={(e, data) => handleStop(section.name, data)}
                                                bounds="parent"
                                                disabled={selectedSection !== null && selectedSection !== section.name}
                                            >
                                                <div
                                                    onClick={() => setSelectedSection(section.name)}
                                                    style={{
                                                        cursor: 'move',
                                                        width: `${section.seatsPerRow * 20}px`,
                                                        height: `${section.rows * 20}px`,
                                                        transformOrigin: 'center',

                                                    }}
                                                    id={`tooltip-${index}`}
                                                >
                                                    <div
                                                        className={`seatmap_box ${selectedSection === section.name && 'seatmap_box_shadow'}`}
                                                        style={{
                                                            backgroundColor: selectedSection === section.name ? 'lightblue' : '#eee',
                                                            transform: `rotate(${section.rotationAngle || 0}deg)`,
                                                        }}
                                                    >
                                                        {Array.from({ length: section.rows }).map((_, rowIndex) => (
                                                            <div key={rowIndex} style={{ display: 'flex' }}>
                                                                {Array.from({ length: section.seatsPerRow }).map((_, seatIndex) => (
                                                                    <div className='seatmap_seat' key={seatIndex} style={{ backgroundColor: section.seatColor }}></div>
                                                                ))}
                                                            </div>
                                                        ))}
                                                        <Tooltip
                                                            placement="top"
                                                            isOpen={tooltipOpen === section.name}
                                                            target={`tooltip-${index}`}
                                                            toggle={() => setTooltipOpen(tooltipOpen === section.name ? null : section.name)}
                                                        >
                                                            {`Section: ${section.name}, Rows: ${section.rows}, Seats/Row: ${section.seatsPerRow}, Ticket: ${section.ticketName}, Price:  ${EventData && EventData.countrysymbol} ${section.ticketCurrentValue}`}
                                                        </Tooltip>

                                                    </div>
                                                </div>
                                            </Draggable>
                                        ))}
                                    </div>
                                </div>

                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Select Image and Dimensions</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="imageFile">Image</Label>
                        <Input type="file" name="image" id="imageFile" onChange={handleImageChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="height">Height</Label>
                        <Input type="number" name="height" id="height" placeholder="Enter height" value={seatmapHeight} onChange={(e) => setSeatmapHeight(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="width">Width</Label>
                        <Input type="number" name="width" id="width" placeholder="Enter width" value={seatmapWidth} onChange={(e) => setSeatmapWidth(e.target.value)} />
                    </FormGroup>
                    <Button color="primary" onClick={handleCreateSeatmap}>Create Seatmap</Button>
                </ModalBody>
            </Modal>

            <Modal isOpen={addRowModal} toggle={toggleAddRowModal}>
                <ModalHeader toggle={toggleAddRowModal}>Add Row</ModalHeader>
                <ModalBody>
                    <form onSubmit={addSection}>
                        <FormGroup>
                            <Label for="sectionName">Section Name</Label>
                            <Input type="text" name="sectionName" id="sectionName" placeholder="Enter section name" defaultValue={editingSection ? editingSection.name : ''} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="rows">Number of Rows</Label>
                            <Input type="number" name="rows" id="rows" placeholder="Enter number of rows" defaultValue={editingSection ? editingSection.rows : ''} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="seatsPerRow">Seats per Row</Label>
                            <Input type="number" name="seatsPerRow" id="seatsPerRow" placeholder="Enter seats per row" defaultValue={editingSection ? editingSection.seatsPerRow : ''} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="ticketPrice">Select Ticket</Label>
                            <Input type="select" name="ticketPrice" id="ticketPrice" required defaultValue={editingSection ? editingSection.ticketPrice : ''}>
                                {TicketData && TicketData.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>
                        {/* <FormGroup>
              <Label for="borderColor">Border Color</Label>
              <Input type="text" name="borderColor" id="borderColor" placeholder="Enter border color (hex)" defaultValue={editingSection ? editingSection.borderColor : ''} />
            </FormGroup> */}
                        <FormGroup>
                            <FormGroup>
                                <Label for="seatColor">Seat Color</Label>
                                <div>
                                    <InputColor
                                        initialValue={seatColor}
                                        onChange={(color) => setSeatColor(color.hex)}
                                        placement="right"
                                    />
                                </div>
                            </FormGroup>

                        </FormGroup>

                        <Button type="submit" color="primary">{editingSection ? 'Update Section' : 'Add Section'}</Button>
                    </form>

                </ModalBody>
            </Modal>
        </>
    )
}
export default Type;