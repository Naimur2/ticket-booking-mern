import React from "react";
import { LocationContext } from "../../../../context/contexts";
import { IAddLocationState } from "../../../../interfaces/index";
import { Container, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AllCoaches() {
    const locationCtx = React.useContext<IAddLocationState>(LocationContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        let clean = false;
        (async () => {
            await locationCtx?.getAllLocations?.();
        })();

        return () => {
            clean = true;
            locationCtx?.clean?.();
        };
    }, []);

    console.log(locationCtx.locations);

    const tableHeaders = [
        "Coach Name",
        "Start",
        "Destination",
        "Time",
        "Description",
        "Bus Id",
    ];

    return (
        <Container>
            <h1 className="mb-5">Buses</h1>
            <Button
                onClick={() => navigate("/admin/add-coach")}
                className="mb-4"
            >
                Add Coach{" "}
            </Button>{" "}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        {tableHeaders.map((header, index) => {
                            return <th key={index}>{header}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {locationCtx?.locations?.map((location, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{location.name}</td>

                                <td>{location.phone}</td>
                                <td>{location.address}</td>

                                <td>{location.description}</td>
                                <td>hgjhg</td>
                                <td>{100}</td>
                                <td>
                                    <Button
                                        onClick={() =>
                                            navigate(
                                                `/admin/edit-bus/${location._id}`
                                            )
                                        }
                                    >
                                        Edit
                                    </Button>{" "}
                                </td>
                                <td>
                                    <Button
                                        onClick={() =>
                                            locationCtx.deleteLocation(
                                                location._id
                                            )
                                        }
                                        variant="danger"
                                    >
                                        Delete
                                    </Button>{" "}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Container>
    );
}