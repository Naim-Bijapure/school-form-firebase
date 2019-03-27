import React,{Component} from "react";
import {withRouter} from "react-router-dom";
import firebase from '../Firebase'

const SignUpView = ({ onSubmit }) => {
  return (
    <div>
      <form onSubmit={onSubmit}  className="mx-auto " style={{padding:'6%'}}>

<div className="card text-center  shadow-lg p-3 mb-5 bg-white rounded " >
<div className="card-title">Sign Up</div>
  <div className="card-body">
   <input name="email" type="email" className="form-control" placeholder=" EnterEmail"/>
   <input name="password" type="password" className="form-control mt-4" placeholder="Enter Password"/>
   <input type="submit" className="btn btn-primary mt-4" value="Sign Up"/>
 
  </div>

</div>

      </form>
    </div>
  );
};


class SignUpContainer extends Component {
   handleSignUp = async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
 
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      this.props.history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return <SignUpView onSubmit={this.handleSignUp} />;
  }
}

export default withRouter(SignUpContainer);