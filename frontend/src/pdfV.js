import React, { useState, useRef } from 'react';
import { usePdf } from '@mikecousins/react-pdf';

const MyPdfViewer = () => {
  const [page, setPage] = useState(1);
  const canvasRef = useRef(null);

  const [file, setFile] = useState('')
  const [error, setError] = useState('')

  const submitPdf = (e) => {
    const reader = new FileReader()
    try {
      reader.readAsDataURL(e.target.files[0])
      setPage(1)
    }catch(error) {
      setFile('')
      setError('error')
      setPage(1)
    }
      
    reader.onload = () => {
      setFile(reader.result) //base64encoded 
      setPage(1)
    }
    reader.onerror = error => {
      setError('error')
      setPage(1)
    }
  }

  const uploadFile = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:6500/api/file', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({pdf: file})
    }) 
    
    const json = await response.json()

    if (!response.ok) {
        setError(json.error)
    }

    if (response.ok) {
        setFile('')
        setError('')
    }
  }

  const { pdfDocument, pdfPage } = usePdf({
    file: file || 'test.pdf',
    page,
    canvasRef,
  });

  const canvasStyle = {border: '1px solid #000'}

  return (
    <div>
      <label>File of Thesis:</label><br/><br/>
      <input type='file' accept='.pdf' onChange={submitPdf}/><br/><br/>
      <button onClick={uploadFile}>Submit</button><br/><br/>
      {error && <div>{error}</div>}<br/><br/>
      {file === '' && <span>Loading...</span>}
      {file !== '' && 
      <div>
        {(pdfDocument && pdfDocument.numPages) && (
        <div>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <span>
            {page}
          </span>
          <button
            disabled={page === pdfDocument.numPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
        )}
        <br/>
        <div>PREVIEW:</div>
        <br/>
        <canvas ref={canvasRef} style={canvasStyle}/>
      </div>
      }
    </div>
  );
};

export default MyPdfViewer