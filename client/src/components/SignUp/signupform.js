import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './signup';
import"../css/Form.css";
class signupForm extends Component {
    state = {  }
    render() { 
        return ( 
            <>
            <div className='form-container mb-3'>
              <div className='form-content-left'>
              <img className='form-img' src='img/shopping.png' alt='spaceship' />
              </div>
              <SignUp  {...this.props} />
            </div>
            
          </>
         );
    }
}
 
export default signupForm;