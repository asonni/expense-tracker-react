import React from 'react';
import clsx from 'clsx';
import * as yup from 'yup';
// import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';

// import { GlobalContext } from '../context/GlobalState';

const schema = yup.object().shape({
  text: yup.string().required(),
  amount: yup.string().required()
});

export const AddTransaction = () => {
  // const [text, setText] = useState('');
  // const [amount, setAmount] = useState(0);
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    validationSchema: schema
  });

  // const { addTransaction } = useContext(GlobalContext);

  const onSubmit = data => {
    console.log(data);
    // const newTransaction = {
    //   id: Math.floor(Math.random() * 100000000),
    //   text,
    //   amount: +amount
    // };
    // addTransaction(newTransaction);
    // setText('');
    // setAmount(0);
  };

  console.log(errors);

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div
          className={clsx({
            'form-control': true,
            error: errors.text
            // success: !errors.text && !errors.text.message
          })}
        >
          <label htmlFor="text">Text</label>
          <input
            name="text"
            ref={register}
            type="text"
            placeholder="Enter text..."
          />
          {errors.text && <small>{errors.text.message}</small>}
        </div>
        <div
          className={clsx({
            'form-control': true,
            error: errors.amount
            // success: errors && !errors.text
          })}
        >
          <label htmlFor="amount">
            Amount <i>(negative - expense, positive - income)</i>
          </label>
          <input
            name="amount"
            ref={register}
            type="number"
            placeholder="Enter amount..."
          />
          {errors.amount && <small>{errors.amount.message}</small>}
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};
