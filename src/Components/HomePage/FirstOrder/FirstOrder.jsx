import React from 'react';
import './FirstOrder.css';
import { useForm } from 'react-hook-form';
import firstOrder from './image.svg';

const FirstOrder = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  return (
    <section className="first__order">
      <div className="container">
        <div className="firstOrder__content">
          <div className="firstOrder__text">5% off on the first order</div>
          <div className="input__section">
            <form action="">
              {/* <label htmlFor="">Validate form </label> */}
              <input
                type="text"
                className="name"
                placeholder="Name"
                {...register('name', {
                  required: 'required input',
                  pattern: {value:(/^[a-zA-Z]+$/i), message:'only letters are allowed'},
                  minLength: { value: 3, message: 'min length for title is 3' },
                  maxLength: { value: 10, message: 'max length for title is 10' },
                })}
              />
              <div>
                {errors.name && (
                  <h4 style={{ color: 'yellow' }}>{errors.name.message}</h4>
                )}
              </div>

              <input
                type="text"
                className="phone__number"
                placeholder="Phone number"
                {...register('phone_number',{
                  pattern: {value:(/^[0-9]+$/i), message:'please enter digits only'}
                })} />

<div>
                {errors.phone_number && (
                  <h4 style={{ color: 'yellow' }}>{errors.phone_number.message}</h4>
                )}
              </div>

              <input type="text" className="email" placeholder="Email"
              {...register('email',{
                pattern:{value:/[a-zA-Z0-9_%+-]+@[[a-zA-Z0-9.-]+[a-zA-Z]{2,}$/, message:'invalid email address'}
              }
              )} />
              <div>
                              {errors.email && (
                  <h4 style={{ color: 'yellow' }}>{errors.email.message}</h4>
                )}
              </div>
              <button className="getADiscount__btn">Get a discount</button>
            </form>
          </div>
          <img
            src={firstOrder}
            alt="First Order Discount"
            className="firstOrder__image"
          />
        </div>
      </div>
    </section>
  );
};

export default FirstOrder;
