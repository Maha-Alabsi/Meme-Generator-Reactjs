import React, { Component } from "react";
import "./../css/App.css";
class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "",
      allMemeImg: [],
    };
  }
  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const { memes } = res.data;
        console.log(memes[0]);
        this.setState({ allMemeImg: memes });
      });
  }

  handleChange = (event)=>{
      const {name , value}=event.target
      this.setState(
          {
            [name]:value
          }
      )
  }
  handleSubmit = (event)=>{
      event.preventDefault();
      const randomIndex=Math.floor(Math.random() * this.state.allMemeImg.length);
      const randomMemeImg =this.state.allMemeImg[randomIndex].url;
      this.setState({
          randomImg: randomMemeImg
      })
    
    }

  render() {
    return (
      <div>
        <h2>Meme Section</h2>
        <form className="meme-form"  onSubmit={this.handleSubmit}>
          <input
            name="topText"
            value={this.state.topText}
            placeholder="Top Text"
            onChange={this.handleChange}
          />
          <br />
          <input
            name="bottomText"
            value={this.state.bottomText}
            placeholder=" Buttom Text"
            onChange={this.handleChange}
          />
          <br />
          <button>Gen</button>
        </form>
        <hr/>
        <div className="meme-render">
            <h2>{this.state.topText}</h2>
            <img src={this.state.randomImg}/>
            <h2>{this.state.bottomText}</h2>
        </div>

      </div>
    );
  }
}

export default MemeGenerator;
