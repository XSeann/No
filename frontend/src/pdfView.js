import React, {useState, useRef, useEffect} from "react"
import { useParams } from "react-router-dom"
import { usePdf } from '@mikecousins/react-pdf';


const PdfView = () => {
    const [page, setPage] = useState(1);
    const [oneFile, setOneFile] = useState('')
    const canvasRef = useRef(null);
    const id = useParams()

    useEffect(() => {
        const getOneData = async () => {
            const response = await fetch(`http://localhost:6500/api/file/${id.id}`)
            const json = await response.json()
            setOneFile(json)
        }
        getOneData()
    }, [id.id])

    const { pdfDocument, pdfPage } = usePdf({
        file: oneFile.file || 'test.pdf',
        page,
        canvasRef,
      });

    const canvasStyle = {border: '1px solid #000'}
      console.log(oneFile)
    return(
        <div>
            {oneFile === '' && <span>Loading...</span>}
            {oneFile !== '' && 
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
    )
}

export default PdfView