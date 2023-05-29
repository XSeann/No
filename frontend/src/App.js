import { BrowserRouter, Route, Routes, Link } from "react-router-dom"

import MyPdfViewer from "./pdfV";
import PdfView from "./pdfView";
import Home from "./home";

function App() {

  return (
    <div className="App">
      
      <BrowserRouter>
        <Link to='/pdfUpload'>Pdf Upload</Link><br/>
        <Link to='/home'>Home</Link>

        <Routes>
          <Route path="/pdfUpload" element={<MyPdfViewer/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path='/pdfView/:id' element={<PdfView/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App;
