import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

export function StyledModal({ title, description, open, setOpen}) {
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #1A2027",
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
        overflowY: "scroll",
        "& a": {
            textDecoration: "none",
            color: "white"
        },
        ".ml-manual-widget-container": {
            display: "none",
            visibility: "hidden"
        },
        ".thelocal-here-be-magic": {
            display: "none",
            visibility: "hidden"
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ ...style, width: "90%", height: "90%" }}>
                    <h2>{title}</h2>
                    {description}
                </Box>
            </Modal>
        </div>
    );
}