import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

const FileImport = ({ onChange }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onChange });

  return (
    <div
      {...getRootProps()}
      style={{
        margin: "2rem",
        padding: "2rem 3rem",
        background: "rgba(60,60,255,0.1)",
        border: "1px solid rgba(60,60,255,0.2)",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default FileImport;
