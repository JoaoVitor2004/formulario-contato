import './App.css'
import { useState, useRef } from 'react'
import Img from '../contact-form-main/assets/images/icon-success-check.svg'

function App() {

  const [modal, setModal] = useState(false)
  const [sucesso, setSucesso] = useState(false)
  const [text, settext] = useState('')

  const formref = useRef(null)
  const firstName = useRef(null)
  const lastName = useRef(null)
  const emailRef = useRef(null)
  const messageRef = useRef(null)

  function validarEmail(email) {
    const regex = new RegExp(
      /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/
    )

    if (regex.test(email)) {
      return true
    }

    return false
  }

  function handleClick(e) {

    e.preventDefault()

    if (firstName.current.value === '') {
      setModal(true)
      settext('Digite o seu nome')
      return
    }

    if (lastName.current.value === '') {
      setModal(true)
      settext('Digite o seu sobrenome')
      return
    }

    if (!validarEmail(emailRef.current.value)) {
      setModal(true)
      settext('Digite um email valido!')
      return
    }
    
    if (messageRef.current.value === '' || messageRef.current.value.length < 10) {
      setModal(true)
      settext('Digite uma mensagem por favor')
      return
    }

    setSucesso(true)
    formref.current.reset()
    setTimeout(() => {
      setSucesso(false)
    }, 3000)
  }

  return (
    <main className='container-principal'>
      {
        sucesso && (
          <div className='mensagem-sucesso'>
              <div className='d-flex align-items-center gap-3 mb-3'>
                <img src={Img} alt="icone de sucesso"/>
                <h4>Message Sent!</h4>
              </div>
              <p>Thanks for completing the form. We'll be in touch soon!</p>
          </div>
        )
      }
      {
        modal && (
          <>
            <div className="background"></div>
            <div className="modal">
              <button className='btn-fechar' onClick={() => setModal(false)}>X</button>
              <h2 id='text-error'>{text}</h2>
            </div>
          </>
        )
      }
      <h2 className='title'>Contact us</h2>
      <form ref={formref} onSubmit={handleClick} action="#" method='post' id='form'>
        <div className='row mb-3'>
          <div className="col-12 col-md-6 col-lg-6 mb-3 mb-md-0 mb-lg-0">
            <label htmlFor='name' className="form-label mb-2">First name</label>
            <input ref={firstName} type="text" name="name" id="name" className='form-control border-3'/>
          </div>
          <div className="col-12 col-md-6 col-lg-6">
            <label className="form-label mb-2" htmlFor='sobrename'>Last name</label>
            <input ref={lastName} type="text" name="sobrename" id="sobrename" className='form-control border-3' />
          </div>
        </div>
        <div className='d-flex flex-direction mb-3'>
          <label className="form-label mb-3" htmlFor='email'>Email adress</label>
          <input ref={emailRef} type="email" name="email" id="email" className='form-control border-3' />
        </div>
        <div className="row mb-3 d-flex">
          <label className="form-label mb-3">Query type</label>
          <div className="col-12 col-md-6 col-lg-6 d-flex gap-3">
            <input type="radio" name="type" id="general" className='form-check-input' checked/>
            <label className="form-label" htmlFor='general'>General Enquiry</label>
          </div>
          <div className="col-12 col-md-6 col-lg-6 d-flex gap-3 border-3">
            <input type="radio" name="type" id="support" className='form-check-input' />
            <label className="form-label" htmlFor='support'>Support Request</label>
          </div>
        </div>
        <div className='d-flex flex-direction mb-3'>
          <label className="form-label mb-3" htmlFor='message'>Message</label>
          <textarea ref={messageRef} name="message" id="message" class="form-control w-100 aparencia border-3" aria-label="With textarea"></textarea>
        </div>
        <div className='w-100 d-flex gap-3 mb-3'>
          <input type="checkbox" name="accept" id="accept" className='form-check-input' />
          <label className="form-label" htmlFor='accept'>I consent to being contacted by the team</label>
        </div>
        <input type="submit" value="Submit" className='btn btn-success p-2 rounded-2 w-100 text-white' />
      </form>
    </main>
  )
}

export default App