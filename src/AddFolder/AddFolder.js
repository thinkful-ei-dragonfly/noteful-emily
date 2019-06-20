
import React from 'react';
import ApiContext from '../ApiContext';
import './AddFolder.css'

export default class AddFolder extends React.Component {

  static contextType = ApiContext;


  


  render() {
    return (
      <div className='add-folder'>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.context.addFolder(e.target.folderInput.value)
        }}>
          <label htmlFor='folderInput'>Folder Name: </label>
          <input name='folderInput' type="text" />
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }

}