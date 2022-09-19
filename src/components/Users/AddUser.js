import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import classes from './AddUser.module.css'
import Button from '../UI/Button'
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {

    const nameInputRef = useRef()
    const ageInputRef = useRef()
    const [error, setError] = useState('')

    const addUserHandler = (event) => {
        event.preventDefault();
        const enteredUsername = nameInputRef.current.value
        const enteredAge = ageInputRef.current.value
        if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid Input',
                message: 'Please Enter a Valid name and age(non empty values)'
            })
            return;
        }
        if (+enteredAge < 1) {
            setError({
                title: 'Invalid Age',
                message: 'Please Enter a Valid age(>0)'
            })
            return;
        }
        props.onAddUser(enteredUsername, enteredAge)
        nameInputRef.current.value = '';
        ageInputRef.current.value = '';
    }

    const closeErrorModal = () => {
        setError(null)
    }

    return (
        <React.Fragment>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={closeErrorModal} />}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" ref={nameInputRef} />
                    <label htmlFor="age">Age(Years)</label>
                    <input id="username" type="text" ref={ageInputRef} />
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </React.Fragment>
    );
}

export default AddUser;