import Swal from "sweetalert2"
import { signIn } from "next-auth/react"

export const onSignIn = () => {

  (async () => {

    const { value: formValues } = await Swal.fire({
      title: 'Sign in',
      background: `${localStorage.getItem('theme') === 'dark' ? '#1E2C5A' : '#FFFFFF'}`,
      color: `${localStorage.getItem('theme') === 'dark' ? '#FFFFFF' : '#000000'}`,
      html:
        '<input type="email" id="swal-input1" class="swal2-input">' +
        '<input type="password" id="swal-input2" class="swal2-input">',
      focusConfirm: false,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const receivedUsername = (document.getElementById('swal-input1') as HTMLInputElement).value
        const receivedPassword = (document.getElementById('swal-input2') as HTMLInputElement).value

        if(receivedUsername.trim() === '' || receivedPassword.trim() === '') {
          Swal.fire({
            title: 'Please fill the blank!',
            text: 'You can\'t submit without the blank!',
            icon: 'error'
          })
        }

        Swal.showLoading()

        const result = await signIn('credentials', {
          username: receivedUsername,
          password: receivedPassword,
          redirect: false
        })

        if(result?.status === 401) {
          switch(result.error) {
            case 'No user found!':
              Swal.fire({
                title: 'No user found!',
                text: 'The username you entered doesn\'t belong to an account. Please check your username and try again.',
                icon: 'error',
                background: `${localStorage.getItem('theme') === 'dark' ? '#1E2C5A' : '#FFFFFF'}`,
                color: `${localStorage.getItem('theme') === 'dark' ? '#FFFFFF' : '#000000'}`,
              })

              break
            case 'Could not log you in!':
              Swal.fire({
                title: 'Could not log you in!',
                text: 'Sorry, your password was incorrect. Please double-check your password.',
                icon: 'error',
                background: `${localStorage.getItem('theme') === 'dark' ? '#1E2C5A' : '#FFFFFF'}`,
                color: `${localStorage.getItem('theme') === 'dark' ? '#FFFFFF' : '#000000'}`,
              })

              break
          }
        } else {
          Swal.fire({
            title: 'Successful!',
            icon: 'success',
            background: `${localStorage.getItem('theme') === 'dark' ? '#1E2C5A' : '#FFFFFF'}`,
            color: `${localStorage.getItem('theme') === 'dark' ? '#FFFFFF' : '#000000'}`,
          })

          
        }
      }
    })

  
    })()
}