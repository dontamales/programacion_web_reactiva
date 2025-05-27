import React, { useState } from "react";
function FileUploader() {
    const [fileContent, setFileContent] = useState("");
    const handleFileRead = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (e) {
            setFileContent(e.target.result);
        };
        reader.readAsText(file);
    };
    return (
        <div>
            <input type="file" accept=".txt" onChange={handleFileRead} />
            <pre style={{
                background: "#f0f0f0", padding: "10px", marginTop: "10px", color: "black"
            }}>
                {fileContent}
            </pre>
        </div>
    );
}
export default FileUploader;
