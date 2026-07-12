import crypto from "crypto";

const generateApiKey = () => {
    return (
        "pn_live_" + 
        crypto.randomBytes(24).toString("hex")
    );
};

export default generateApiKey;
