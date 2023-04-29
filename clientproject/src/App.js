import React, { useState, useEffect } from "react";
import "./App.css";
import FileUploadScreen from "./screens/FileUploadScreen";
import { getSingleFiles, getMultipleFiles } from "./data/api";

function App() {
  const [singleFiles, setSingleFiles] = useState([]);
  const [multipleFiles, setMultipleFiles] = useState([]);

  const getSingleFileslist = async () => {
    try {
      const fileslist = await getSingleFiles();
      console.log("fileslist", fileslist);
      setSingleFiles(fileslist.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getMultipleFilesList = async () => {
    try {
      const fileslist = await getMultipleFiles();
      setMultipleFiles(fileslist.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleFileslist();
    getMultipleFilesList();
  }, []);
  return (
    <>
      <div className="container">
        <h3 className="text-danger font-weight-bolder border-bottom text-center">
          Single & Multiple File Upload Using MERN Stack{" "}
        </h3>
        <FileUploadScreen
          getsingle={() => getSingleFileslist()}
          getMultiple={() => getMultipleFilesList()}
        />
      </div>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-6">
            <h4 className="text-success font-weight-bold">Single Files List</h4>
            <div className="row">
              {singleFiles &&
                singleFiles.map((item) => (
                  <div className="col-6">
                    <div className="card mb-2 border-0 p-0">
                      <img
                        src={`http://localhost:8080/${item.filePath}`}
                        height="200"
                        className="card-img-top img-responsive"
                        alt="img"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="col-6">
            <h4 className="text-success font-weight-bold">
              Multiple Files List
            </h4>
            {multipleFiles &&
              multipleFiles.map((element, index) => (
                <div key={element._id}>
                  <h6 className="text-danger font-weight-bold">
                    {element.title}
                  </h6>
                  <div className="row">
                    {element.files.map((file, index) => (
                      <div className="col-6">
                        <div className="card mb-2 border-0 p-0">
                          <img
                            src={`http://localhost:8080/${file.filePath}`}
                            height="200"
                            className="card-img-top img-responsive"
                            alt="img"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
