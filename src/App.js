import React from 'react';

export default class App extends React.Component{

  state = {
    binaryValue: "",
    decimalValue: "",
    isValidated: 2,
    darkmode: false,
  }

  componentDidMount(){
    if(localStorage.getItem("theme")){
      const val = localStorage.getItem("theme")
      if(val === "dark"){
        document.body.classList.add("dark-theme")
        this.setState({ darkmode: true })
      }
    }
  }

  handleChange = (e) => {
    if(e.target.type === "checkbox"){
      const val = e.target.checked;
      this.setState({ darkmode: val }, () => {
        document.body.classList.toggle("dark-theme")
        localStorage.setItem("theme", val ? "dark" : "light")
      })
    } else {
      this.setState({ binaryValue: e.target.value }, () => this.convert())
    }
  }

  convert = () => {
    const bin = this.state.binaryValue;
    const checkForOneAndZero = /^[0-1]{1,8}$/;
    if(bin !== ""){
      if(checkForOneAndZero.test(bin)){
        const decimalValue = bin.split("").reverse().map((num, i) => num*Math.pow(2, i)).reduce((acc, curr) => acc + curr, 0)
        this.setState({ isValidated: 1, decimalValue })
      } else {
        this.setState({ isValidated: 0, decimalValue: "" })
      }
    } else {
      this.setState({ isValidated: 2, decimalValue: "" })
    }
  }

  validate = () => {
    if(this.state.isValidated === 0){
      return "is-invalid"
    } else if(this.state.isValidated === 1) {
      return "is-valid"
    } else {
      return ""
    }
  }

  render(){
    return (
    <>
      <div className="section vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex flex-column">
          <h3>Binary to Decimal Converter</h3>
          <form>
            <div className="form-group">
              <label>Binary Input <small className="text-muted">(You can only enter 8 digits.)</small></label>
              <input
                className={`form-control ${this.validate()}`}
                maxLength={8}
                value={this.state.binaryValue}
                onChange={this.handleChange}
              />
              {!this.state.isValidated && <small className="form-text text-danger">Enter only 1's and 0's.</small>}
            </div>
            <div className="form-group">
              <label>Decimal Output</label>
              <input
                className="form-control"
                value={this.state.decimalValue}
                readOnly
              />
            </div>
          </form>
        </div>
      </div>
      <div className="custom-control custom-switch toggle">
        <input type="checkbox" className="custom-control-input" name="darkmode" checked={this.state.darkmode} onChange={this.handleChange} id="dark-mode" />
        <label className="custom-control-label" htmlFor="dark-mode"><small>{`${this.state.darkmode ? "Light" : "Dark"} Mode`}</small></label>
      </div>
    </>
    );
  }
}
