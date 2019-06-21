
import React from 'react';
import ApiContext from '../ApiContext';
import './AddFolder.css'

export default class AddFolder extends React.Component {

  static contextType = ApiContext;

  state = {
    message: ''
  }
  


  render() {
    return (
      <div className='add-folder'>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.context.addFolder(e.target.folderInput.value)
          this.setState (
            {message: 'Folder added!'}
          )
          
        }}>
          <label htmlFor='folderInput'>Folder Name: </label>
          <input name='folderInput' type="text" />
          <div>{this.state.message}</div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }

}