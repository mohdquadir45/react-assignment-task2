import React,{useState,useRef,useEffect} from "react";
import axios from 'axios'

const Posts = ({ posts, loading, setPosts,files,totalPosts }) => {
  const [fileName, setFileName] = useState("");
  // const [fileName, setFileName] = useState(Array(totalPosts).fill(null));

  const inputRef = useRef();

  console.log(posts);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  const handleDownload = (url) => {
    //   // Download file from URL
      window.open(url, '_blank');
    };

  function handleUpload(){
    const formData = new FormData();
    formData.append("image", inputRef.current.files[0]);
    fetch("http://localhost:5000/table", 
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formData
    }).then(res=> res.json()).then(res=> {console.log(res); alert("uploaded successfully")})
  }

  
  

  const handleSort = (column) => {
    // Sort table data based on selected column
    const sortedTableData = [...posts].sort((a, b) => {
      const columnA = a[column];
      const columnB = b[column];
      if (columnA < columnB) {
        return -1;
      } else if (columnA > columnB) {
        return 1;
      } else {
        return 0;
      }
    });
    setPosts(sortedTableData);
  };

  
  return (
    <div className="table__component">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>
              {/* <input type="checkbox"  checked={selectAll} onChange={handleSelectAll} /> */}
              <th>
                <input type="checkbox" />
                {/* <Checkbox checked={selectAll} onChange={handleSelectAll} /> */}
              </th>
              {/* <Checkbox checked={selectAll} onChange={handleSelectAll} /> */}
            </th>
            <th onClick={() => handleSort("id")}>ID</th>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("email")}>Email</th>
            <th className=".file-column">File Upload</th>
            <th>File</th>

          </tr>
        </thead>
        <tbody>
          {posts?.map((item, index) => {
            console.log("files==>",files);
            return (
              <tr>
                <td>
                  <th>
                    <input type="checkbox" />
                    {/* <Checkbox checked={selectAll} onChange={handleSelectAll} /> */}
                  </th>
                </td>
                <td>{item?.id}</td>
                <td>{item?.name}</td>
                <td>{item?.email}</td>
                <td className=".file-column">
                  {/* <input
                    type="file"
                    // onChange={(event) => handleFileUpload(event, row.id)}
                  />
                  {/* {row.file && ( */}
                    {/* <button */}
                      {/* variant="link" */}
                      {/* // onClick={() => handleDownload(row.file)} */}
                    {/* > */}
                      {/* Download */}
                    {/* </button> */}
                  {/* )} */} 
                  <div>
              <button
                onClick={() => {
                  inputRef.current.click();
                }}
                disabled={files[index]?.file ? true:false}
              >
                Upload File
              </button>
              <button onClick={handleUpload}                
               disabled={files[index]?.file ? true:false}
              >upload</button>
              <div>{fileName}</div>
              <input
                ref={inputRef}
                type="file"
                hidden
                onChange={(e) => {
                    setFileName(e.target.files[0].name)
                }}
              />
            </div>
               
                </td>
                <td>{files[index]?.file ? <button onClick={()=> handleDownload(files[index]?.file)}>Download</button> : "Please Upload"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

     
    </div>
  );
};

export default Posts;
