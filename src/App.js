import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: [],
            thumbnail: []
        }
    }
    onChangeHandler = (event) => {
        const originFiles = Array.from(event.target.files);
        this.setState({
            selectedFile: originFiles,
            thumbnail: new Array(originFiles.length).fill(0)
        }, () => {
            originFiles.map((file, index) => {
                this.readFile(file, index);
            })
            event.target.value = "";
        })
    }

    readFile = (file, index) => {
        var reader = new FileReader();
        reader.onload = (e) => {
            const { thumbnail } = this.state;
            thumbnail[index] = e.target.result;
            this.setState({
                thumbnail
            })
        }
        reader.readAsDataURL(file);
    }

    remove = (index) => {
        const { selectedFile, thumbnail } = this.state;
        this.setState({
            selectedFile: selectedFile.filter((item, indexItem) => indexItem !== index),
            thumbnail: thumbnail.filter((item, indexItem) => indexItem !== index)
        })
    }

    removeAll = () => {
        this.setState({
            selectedFile: [],
            thumbnail: []
        })
    }



    render() {
        return (
            <div className="container">
                <h1 id="title">File Upload Demo</h1>

                <div className="row fileupload-buttonbar">
                    <div className="col-lg-7">
                        <button type="submit" className="btn btn-primary start">
                            <i className="glyphicon glyphicon-upload" />&nbsp;&nbsp;
                            <span>Start upload</span>
                        </button>&nbsp;&nbsp;
                        {/* <button type="reset" className="btn btn-warning cancel">
                            <i className="glyphicon glyphicon-ban-circle" />&nbsp;&nbsp;
                            <span>Cancel upload</span>
                        </button>&nbsp;&nbsp; */}
                        <button type="button" className="btn btn-danger delete" onClick={this.removeAll}>
                            <i className="glyphicon glyphicon-trash" />&nbsp;&nbsp;
                            <span>Delete selected</span>
                        </button>&nbsp;&nbsp;

                        <span className="fileupload-process" />
                    </div>

                    <div className="col-lg-5 fileupload-progress fade">
                        <div className="progress progress-striped active" role="progressbar" aria-valuemin={0} aria-valuemax={100}>
                            <div className="progress-bar progress-bar-success" style={{ width: '0%' }} />
                        </div>

                        <div className="progress-extended">&nbsp;</div>
                    </div>
                </div>
                {/* The table listing the files available for upload/download */}
                <div className="image-upload-wrap" style={{ maxHeight: "300px", overflowY: "auto" }}>
                    <input className="file-upload-input" style={{ display: "none" }} id="inputFile" type="file" onChange={this.onChangeHandler} accept="image/*" multiple name="files[]" />
                    {this.state.selectedFile.length ?
                        <table role="presentation" className="table table-striped" >
                            <tbody className="files" >
                                {this.state.selectedFile.map((file, index) => {
                                    const url = this.state.thumbnail[index];
                                    return (
                                        <tr className="template-upload fade image in" key={index}>
                                            <td>

                                                <img src={url} width="80" height="22"></img>

                                            </td>
                                            <td>
                                                <p className="name">{file.name}</p>
                                                <strong className="error text-danger"></strong>
                                            </td>
                                            {/* <td>
                                        <p className="size">Processing...</p>
                                        <div className="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div className="progress-bar progress-bar-success" style="width:0%;"></div></div>
                                    </td> */}
                                            <td>

                                                <button className="btn btn-primary start" disabled>
                                                    <i className="glyphicon glyphicon-upload"></i>&nbsp;&nbsp;
                                                    <span>Start</span>
                                                </button>&nbsp;&nbsp;

                                                <button className="btn btn-warning cancel" onClick={() => this.remove(index)}>
                                                    <i className="glyphicon glyphicon-ban-circle"></i>&nbsp;&nbsp;
                                                    <span>Cancel</span>
                                                </button>

                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>

                        </table>
                        :
                        <label htmlFor="inputFile" style={{ width: "100%" }}>
                            <div className="drag-text">
                                <h3>Drag and drop a file or select add Image</h3>
                            </div>
                        </label>
                    }
                </div>
            </div>

        );
    }
}

export default App;
