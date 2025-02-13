import React, {useForm} from 'react'
import hands from './image.svg'

function SaleForm() {

  const {
      handleSubmit,
      register,
      reset,
      formState: { errors, isValid },
  } = useForm();

  const onSubmit = (data) => {
      console.log(data);
      reset();
  }


return (
  <div className='sale-on-the-first-order'>
      <h1 className='h-sale-on-the-first-order'>5% off on the first order</h1>
      
      <form className='sale-form' onSubmit={handleSubmit(onSubmit)}>

          
          <input type="text" placeholder='Name' {...register('name', {
              
              pattern: {
                  value: /^[A-Za-z]+$/,
                  message: 'The name cannot contain numbers and another symbols!'
              }
          })}/>
          <div>
           {errors.name && <p className='p-error'>{errors.name.message}</p>}
          </div>

          <input type="number" placeholder='Phone number' {...register('phoneNumber', {
                
                minLength: {value: 10, message: 'The minimal number length is 10'},
                maxLength: {value: 15, message: 'The maximal number length is 15'}
            })}/>
            <div>
             {errors.phoneNumber && <p className='p-error'>{errors.phoneNumber.message}</p>}
            </div>

           
            <input type="text" placeholder='Email' {...register('email', {
                
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Email should be in the format: example@telran.com'
                }
            })}/>
            <div>
            {errors.email && <p className='p-error'>{errors.email.message}</p>}
            </div>
            <button disabled={!isValid} type='submit' className='get-a-discount-button'>Get a discount</button>
        </form>

        <img src={hands} alt="hands" width={'748px'} height={'360px'}/>
    </div>
  )
}

export default SaleForm