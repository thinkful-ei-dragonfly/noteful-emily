import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus, faChevronLeft, faTrashAlt, faCheckDouble
} from '@fortawesome/free-solid-svg-icons'
import App from './App'
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

library.add(faPlus, faChevronLeft, faTrashAlt, faCheckDouble)

describe("App", () => {

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      div
    )
    ReactDOM.unmountComponentAtNode(div)


  })
  it('Renders UI as expected', () => {
    const wrapper = shallow(<App />)
    expect(toJson(wrapper)).toMatchSnapshot();
  })
})