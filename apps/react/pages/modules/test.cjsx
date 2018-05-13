/*
class HelloMessage extends React.Component {
  render() {
    return (

      <div>
        Hello {this.props.name}
      </div>


    );
  }
}
*/

class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Hello {this.props.name}
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="Taylor" />,
  mountNode
);


	function F__ID(){
        class HelloMessage extends React.Component {
          render() {
            return React.createElement(
              "div",
              null,
              "Hello ",
              this.props.name
            );
          }
        }

        ReactDOM.render(React.createElement(HelloMessage, { name: "Taylor" }), document.getElementById("react"));


        $('#D__ID').on('load',function(){
        })

	}
