function Registration() {
    return(
        <section className="Registration">
            <div className="form-section">
                <h2>Register</h2>
                <form className="register-form">
                    <fieldset>
                        <legend for='email'>Email: </legend>
                        <input type='text' id='email' name='email'/>
                    </fieldset>
                    <fieldset>
                        <legend for='username'>Username: </legend>
                        <input type='text' id='username' name='username'/>
                    </fieldset>
                    <fieldset>
                        <legend for='password'>Password: </legend>
                        <input type='text' id='password' name='password'/>
                    </fieldset>
                    <fieldset>
                        <legend for='password2'>Confirm Password: </legend>
                        <input type='text' id='password2' name='email'/>
                    </fieldset>
                    <div className="button-section">
                        <button className="button" type='submit'>Register</button>
                        <p>Already have an account? </p>
                        <p><a href='/login'>Log in here</a></p>
                    </div>
                </form>
            </div>
        </section>
    )
}


export default Registration