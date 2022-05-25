import React, {useEffect, useState} from "react";
import {Button, ButtonGroup, Dropdown, Modal, Table} from "react-bootstrap";
import {getCookie, getPickUpDisplay, updateResource} from "../scripts/utils";
import Select from "react-dropdown-select";
import {EditableField} from "./Shared";
import {SubmissionRow} from "./SubmissionRow";

export const shortCols = ["people_to_accommodate"];

const MatchModal = ({showModal, handleClose, matchHandle, resource, activeSub}) => {

    const [dateSet, setDateSet] = useState(null);
    const [success, setSuccess] = useState(false);

    const match = (transport) => {
        const payload = {transport: transport, newDate: dateSet};
        matchHandle(resource, payload);
        handleClose();
    };

    const toIgnore = () => {
        updateResource(resource, {status: "ignore", owner: null}, () => handleClose());
    };

    const noAnswer = () => {
        updateResource(resource, {status: "new", owner: null}, () => handleClose());
    };

    const notToday = () => {
        // TODO: update note with last contact info?
        const payload = {status: "new", availability: dateSet, owner: null};
        updateResource(resource, payload, () => handleClose());
    };

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setDateSet(newDate);
    };


    return (<Modal show={showModal} onHide={noAnswer} className="" dialogClassName="" backdrop="static"
                   keyboard={false} fullscreen={true}
    >
        <Modal.Body className={"text-center"}>
            <SubmissionRow sub={activeSub} isActive={true} readOnly={true} user={resource.owner || {}}/>
            <ResourceRow resource={resource} isExpanded={true} isCoordinator={false} compact={true}/>
            <h5 className={"mt-4"}>Od Kiedy host będzie znów dostępny?</h5>
            <div style={{margin: "30px"}}>
                <input required type="date" min={new Date().toJSON().slice(0, 10)} value={dateSet}
                       onChange={handleDateChange}/>
            </div>
            {success ?
                <><h5>Co z transportem?</h5>
                    <div className="transport-btns">
                        <Button variant="info" disabled={!dateSet} onClick={() => match(true)}>
                            Host zorganizuje transport
                        </Button>
                        <Button variant="warning" className={"mb-0"} disabled={!dateSet} onClick={() => match(false)}>
                            My musimy ogarnąć transport
                        </Button>
                    </div>
                </>
                :
                <div className={"host-call-buttons"}>
                    <Button variant="success" disabled={!dateSet} onClick={() => setSuccess(true)}>
                        Zgodził się wziąć!
                    </Button>
                    <Button variant="warning" disabled={!dateSet} onClick={notToday}>
                        Nie weźmie
                    </Button>
                </div>
            }
        </Modal.Body>
        <Modal.Footer className={"justify-content-around"}>
            <Button variant="danger" onClick={() => setSuccess(toIgnore)}>
                Do wywalenia
            </Button>
            {success && <Button className={"mx-auto"} variant="secondary" onClick={() => setSuccess(false)}>
                wróć
            </Button>}
            <Button variant="secondary" onClick={noAnswer}>
                Nie odbiera / Cancel
            </Button>
        </Modal.Footer>
    </Modal>);
};

const VISIBLE = ["availability", "accommodation_length", 'city', 'people_to_accommodate', 'food', 'transport'];

const STATUS_OPTIONS = [
    {label: "Nowy", value: "new"},
    // {label: "Zajęta", value: "taken"},
    {label: "Zignoruj", value: "ignore"},
];

export const RESOURCE_MAP = {
    "home": "Dom", "flat": "Mieszkanie", "room": "Pokój", "couch": "Kanapa", "mattress": "Materac"
};

const getResourceDisplay = (r) => {
    if (r === true) {
        return 'TAK';
    } else if (r === false) {
        return 'NIE';
    }

    return RESOURCE_MAP[r] || r;
};

const getReadyDisplay = (resource) => {
    if (resource.is_dropped) {
        return "Zniknięty";
    }
    if (resource.is_ready) {
        return "Gotowy do wzięcia kogoś teraz!";
    }
    if (resource.cherry) {
        return "Wisienka 🍒";
    }
    if (resource.verified) {
        return "Zweryfikowany";
    }
};

export const ResourceRow = ({
                                resource,
                                isExpanded,
                                onMatch,
                                user,
                                activeSub,
                                compact = false,
                                isCoordinator = false
                            }) => {
    const [expanded, setExpanded] = useState(isExpanded);
    const [showModal, setShowModal] = useState(false);
    const [availableFrom, setAvailableFrom] = useState(resource.availability);
    const [note, setNote] = useState(resource.note);
    const [hide, setHide] = useState(false);

    useEffect(() => {
        setNote(resource.note);
        setAvailableFrom(resource.availability);
    }, [resource]);


    useEffect(() => {
        return () => {
            setExpanded(isExpanded);
        };
    }, [isExpanded]);

    const updateNote = (value) => {

        fetch(`/api/update_note/${resource.id}`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json', 'X-CSRFToken': getCookie('csrftoken')
            }, body: JSON.stringify({"note": value}) // body data type must match "Content-Type" header
        }).then(response => response.json()).then(data => {

            // toast(`${data.message}`, {type: data.status});
            setNote(value);
        }).catch((error) => {
            console.error('Error:', error);
        });
    };

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        updateResource(resource, {"availability": newDate});
        setAvailableFrom(newDate);
    };

    if (hide) {
        return <></>;
    }

    const rowClassName = `base-content row-${resource.status}
      ${resource.verified ? "row-verified" : ""} ${resource.cherry ? "row-cherry" : ""}
      ${resource.is_ready ? "row-ready" : ""}
      ${resource.is_dropped ? "row-dropped" : ""}`;

    return (
        <div className={`resource-row`}>
            <div className={rowClassName}>
                <div className={"col r-id-col"}>{resource.id}</div>
                {
                    VISIBLE.map((a) => {
                        return (
                            <div onClick={() => setExpanded(e => !e)}
                                 className={`col ${shortCols.includes(a) ? "col-short" : ""}`}
                                 key={`${resource.id}-${a}`}>{getResourceDisplay(resource[a])}</div>
                        );
                    })
                }
                <div className={`col no-pointer col-hot-sort`}>
                    {compact ? resource.note :
                        <ButtonGroup aria-label="Basic example">
                            <Button variant={resource.is_hot ? "success" : "outline-success"} size={"sm"}
                                    onClick={() => updateResource(resource, {got_hot: resource.is_hot ? null : new Date().toISOString()})}>
                                🔥
                            </Button>
                            <Button variant={resource.cherry ? "success" : "outline-success"}
                                    onClick={() => updateResource(resource, {"cherry": !resource.cherry})}>
                                🍒
                            </Button>
                            <Button variant={resource.verified ? "success" : "outline-success"}
                                    onClick={() => updateResource(resource, {"verified": !resource.verified})}
                            >👍
                            </Button>
                            <Button variant={resource.turtle ? "success" : "outline-success"}
                                    onClick={() => updateResource(resource, {"turtle": !resource.turtle})}
                            >🐢
                            </Button>
                        </ButtonGroup>
                    }
                </div>
                {compact && isCoordinator && <div className={`col col-short`}>
                    <Button variant={"info"} size={"sm"}
                            onClick={() => updateResource(resource, {is_dropped: false}, () => setHide(true))}
                    >zwolnij</Button>
                </div>}
            </div>
            {expanded && <div className="row-expanded">
                <Table bordered style={{borderColor: 'black'}}>
                    <tbody>
                    <tr>
                        <th>Imię</th>
                        <td>{resource.name}</td>
                        <th>Numer telefonu</th>
                        <td>{resource.phone_number}</td>
                        <th>Kiedy można dzwonić?</th>
                        <td>{resource.when_to_call}</td>
                    </tr>
                    <tr>
                        <th>Kraj</th>
                        <td>{resource.country}</td>
                        <th>Kod pocztowy</th>
                        <td>{resource.postal_code}</td>
                        <th>Adres</th>
                        <td>{resource.address}</td>
                    </tr>
                    <tr>
                        <th>Jakie osoby przyjmuje</th>
                        <td>{resource.people_desc}</td>
                        <th>Transport</th>
                        <td>{resource.transport}</td>
                        <th>Koszty</th>
                        <td>{resource.costs}</td>
                    </tr>
                    <tr>
                        <th>Rodzaj zasobu</th>
                        <td>{
                            [
                                resource.house ? 'Dom' : '',
                                resource.flat ? 'Mieszkanie' : '',
                                resource.room ? 'Pokój' : '',
                                resource.sofa ? 'Kanapa' : ''
                            ].filter(Boolean).join(', ') }</td>
                        <th>Opis miejsca</th>
                        <td>{resource.details}</td>
                        <th>Czy mieszka ze zwierzętami</th>
                        <td>{resource.living_with_pets ? 'TAK' : 'NIE'}</td>
                    </tr>
                    <tr>
                        <th>Czy przyjmuje zwierzęta</th>
                        <td>{resource.can_take_person_with_pets ? 'TAK' : 'NIE'}</td>
                        <th>Udogodnienia osób zniepełnosprawnoscią</th>
                        <td>{resource.disable ? 'TAK' : 'NIE'}</td>
                        <th>Czy mieszka ze zwierzętami</th>
                        <td>{resource.living_with_pets ? 'TAK' : 'NIE'}</td>
                    </tr>
                    <tr>
                        <th>Czy oferuje pracę</th>
                        <td>{resource.job ? 'TAK' : 'NIE'}</td>
                        <th>Opis pracy</th>
                        <td>{resource.job_descr}</td>
                        <th>Dodatkowe uwagi</th>
                        <td>{resource.extra}</td>
                    </tr>
                    <tr>
                        <th>Notatka</th>
                        {compact ? <td><EditableField value={note} onRename={updateNote}/></td> : <>
                            <td><EditableField value={note} onRename={updateNote}/></td>
                            <td className={"text-center"}>{getReadyDisplay(resource)}</td>
                            <td className={"text-center"} colSpan="3">
                                <Button size={"sm"}
                                        disabled={resource.status === "calling" && resource.owner.id !== user.id}
                                        onClick={() => {
                                            updateResource(
                                                resource, {status: "calling", owner: user.id},
                                                () => setShowModal(true));
                                        }}>
                                    {resource.status === "calling" ? `DZWONI ${resource.owner?.display}` : "DZWONIĘ"}
                                </Button>
                            </td>
                        </>}
                    </tr>
                    </tbody>
                </Table>

            </div>}
            {!compact &&
                <MatchModal showModal={showModal} handleClose={() => setShowModal(false)} resource={resource}
                            matchHandle={onMatch} activeSub={activeSub}/>
            }
        </div>
    );
};
