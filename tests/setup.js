import Adapter from 'enzyme-adapter-react-16'
import {configure} from 'enzyme'

global.fetch = jest.fn().mockResolvedValue({status: 200})
global.document = {addEventListener: () => {}}
global.localStorage = {getItem: () => '{}'}

configure({adapter: new Adapter()})
