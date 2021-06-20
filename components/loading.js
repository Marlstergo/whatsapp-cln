import {Circle} from 'better-react-spinkit'
import styled from 'styled-components'
import FingerprintOutlinedIcon from '@material-ui/icons/FingerprintOutlined';

import Image from 'next/image'

function Loading() {
  return (
    <center>
      <div className='h-screen flex flex-col justify-center items-center'>
        <img
          src='https://th.bing.com/th/id/OIP.dD3KjCmsUWT72iB1LQmgfAHaHa?w=174&h=180&c=7&o=5&pid=1.7'
          height={200}
          alt=''
          style={{ marginBottom: '10px' }}
        />
        <Circle color='#3CBC28'/>    
        <div>
          <p className='text-2xl'>
            Whatsapp mode by <span  className='text-green-700' >Marlstergo</span> 
          </p>
        </div>    
      </div>
    </center>
  )
}

export default Loading

const Maliq = styled.p`

`
